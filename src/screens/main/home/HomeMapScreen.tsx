import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import {
  IconButton,
  List,
  Searchbar,
  Text,
  useTheme,
} from "react-native-paper";
import { Alert, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../../../types/navigation.types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { LogService } from "../../../services/LogService";
import LottieView from "lottie-react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { BodaService } from "../../../services/BodaService";

const SNAP_POINTS = ["20%", "70%"] as const;

const logService = LogService.getInstance();
const bodaService = BodaService.getInstance();

export const HomeMapScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const animation = useRef<LottieView>(null);
  const mapRef = useRef<MapView>(null);
  const [region, setRegion] = useState<Region>();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [sheetIndex, setSheetIndex] = useState(0);
  const [query, setQuery] = useState<string>("");
  const [places, setPlaces] = useState<any[]>([]);
  const [loadPlaces, setLoadPlaces] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = () => {
    setLoadPlaces(true);
    const url = `https://nominatim.openstreetmap.org/search?q=${query}&format=json`;

    if (places.length > 0) {
      setPlaces([]);
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPlaces(data);
      })
      .catch((error) => {
        logService.addLog(`Error al buscar lugares ${error}`);
        console.error(error);
      })
      .finally(() => {
        setLoadPlaces(false);
      });
  };

  useEffect(() => {
    bottomSheetRef.current?.present();
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setShowAlert(true);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      if (location.coords) {
        const latitude = location.coords.latitude;
        const longitude = location.coords.longitude;

        const newRegion = {
          latitude,
          longitude,
          latitudeDelta: 0.0092,
          longitudeDelta: 0.0092,
        };

        setRegion(newRegion);
        mapRef.current?.animateToRegion(newRegion, 1000);
      }
    })();
  }, []);

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setUserId(user.uid);
      }
    });
  });

  return (
    <>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          ref={mapRef}
          region={region}
          mapType="terrain"
        >
          {region && (
            <Marker
              draggable
              coordinate={{
                latitude: region.latitude,
                longitude: region.longitude,
              }}
            />
          )}
        </MapView>
        <SafeAreaView style={styles.overlay}>
          <View style={styles.header}>
            <IconButton
              icon="close"
              containerColor="white"
              size={32}
              onPress={() => {
                navigation.navigate("Main", { screen: "Tabs" });
                bottomSheetRef.current?.forceClose();
              }}
            />

            <IconButton
              icon="check"
              loading={loading}
              disabled={loading}
              containerColor="white"
              size={32}
              onPress={() => {
                setLoading(true);
                bodaService
                  .addUbicacion(region!, userId)
                  .then(() => {
                    Alert.alert(
                      "Ubicación guardada",
                      "Hemos guardado tu ubicación correctamente",
                      [
                        {
                          onPress: () =>
                            navigation.navigate("Main", { screen: "Tabs" }),
                          text: "Aceptar",
                        },
                      ]
                    );

                    bottomSheetRef.current?.forceClose();
                  })
                  .catch((error) => {
                    logService.addLog(
                      `Error al guardar ubicación ${error.message}`
                    );
                    Alert.alert(
                      "Error",
                      `Ocurrió un error al guardar la ubicación ${error}`
                    );
                  })
                  .finally(() => {
                    setLoading(false);
                    navigation.navigate("Main", { screen: "Tabs" });
                  });
              }}
            />
          </View>
        </SafeAreaView>
      </View>

      <BottomSheetModal
        ref={bottomSheetRef}
        stackBehavior="push"
        enableDismissOnClose={false}
        enablePanDownToClose={false}
        index={sheetIndex}
        snapPoints={SNAP_POINTS}
        onChange={setSheetIndex}
      >
        <BottomSheetScrollView style={styles.bottomSheetView}>
          <Searchbar
            placeholder="Search"
            value={query}
            onChangeText={(text) => setQuery(text)}
            onFocus={() => setSheetIndex(1)}
            onEndEditing={handleSearch}
            onClearIconPress={() => {
              setQuery("");
              setPlaces([]);
            }}
          />

          {loadPlaces && (
            <View
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 12,
              }}
            >
              <LottieView
                autoPlay
                ref={animation}
                style={{
                  marginTop: 36,
                  marginHorizontal: "auto",
                  width: 200,
                  height: 200,
                }}
                source={require("../../../../assets/lottie/maps.json")}
              />

              <Text> Buscando lugares...</Text>
            </View>
          )}

          {places.length > 0 && (
            <View style={{ marginTop: 16 }}>
              {places.map((place) => (
                <List.Item
                  key={place.place_id}
                  title={place.display_name}
                  description={place.name}
                  onPress={() => {
                    setRegion({
                      latitude: parseFloat(place.lat),
                      longitude: parseFloat(place.lon),
                      latitudeDelta: 0.0092,
                      longitudeDelta: 0.0092,
                    });

                    bottomSheetRef.current?.snapToIndex(0);
                  }}
                  left={(props) => <List.Icon {...props} icon="map-marker" />}
                />
              ))}
            </View>
          )}
        </BottomSheetScrollView>
      </BottomSheetModal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  bottomSheetView: {
    flex: 1,
    padding: 16,
  },
  bottomSheetBackground: {
    backgroundColor: "white",
  },
});
