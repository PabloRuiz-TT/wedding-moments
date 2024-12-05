import React, { useEffect, useRef, useState, useCallback } from "react";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import {
  IconButton,
  List,
  Searchbar,
  Text,
  useTheme,
} from "react-native-paper";
import { Alert, StyleSheet, View, Dimensions, Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../../../types/navigation.types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { LogService } from "../../../services/LogService";
import LottieView from "lottie-react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { BodaService } from "../../../services/BodaService";

const { width, height } = Dimensions.get("window");
const SNAP_POINTS = ["25%", "75%"] as const;
const INITIAL_REGION = {
  latitude: 0,
  longitude: 0,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const PRIMARY_COLOR = "#6200ee";
const BACKGROUND_COLOR = "#ffffff";

const logService = LogService.getInstance();
const bodaService = BodaService.getInstance();

interface Place {
  place_id: string;
  display_name: string;
  name: string;
  lat: string;
  lon: string;
}

function useDebounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<NodeJS.Timeout>();

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
}

export const HomeMapScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const mapRef = useRef<MapView>(null);

  const [region, setRegion] = useState<Region>(INITIAL_REGION);
  const [showAlert, setShowAlert] = useState(false);
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState<Place[]>([]);
  const [loadPlaces, setLoadPlaces] = useState(false);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [locationPermission, setLocationPermission] = useState(false);
  const theme = useTheme();

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const animation = useRef<LottieView>(null);

  const searchPlaces = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setLoadPlaces(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          searchQuery
        )}&format=json`
      );
      const data = await response.json();
      setPlaces(data);
    } catch (error) {
      logService.addLog(`Error al obtener resultados: ${error}`);
      Alert.alert(
        "Error",
        "Error al obtener resultados. Por favor, intente de nuevo."
      );
    } finally {
      setLoadPlaces(false);
    }
  };

  const debouncedSearch = useDebounce(searchPlaces, 500);

  const handleLocationPermission = useCallback(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status === "granted");

      if (status !== "granted") {
        setShowAlert(true);
        return false;
      }
      return true;
    } catch (error) {
      logService.addLog(`Error requesting location permission: ${error}`);
      return false;
    }
  }, []);

  const getCurrentLocation = useCallback(async () => {
    try {
      const hasPermission = await handleLocationPermission();
      if (!hasPermission) return;

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const newRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0092,
        longitudeDelta: 0.0092,
      };

      setRegion(newRegion);
      mapRef.current?.animateToRegion(newRegion, 1000);
    } catch (error) {
      logService.addLog(`Error getting current location: ${error}`);
      Alert.alert(
        "Error",
        "Ha ocurrido un error al obtener la ubicación actual. Por favor, intente de nuevo."
      );
    }
  }, []);

  const handleSaveLocation = useCallback(async () => {
    if (!userId || !region) return;

    setLoading(true);
    try {
      await bodaService.addUbicacion(region, userId);
      Alert.alert("Success", "Ubicacion guardada", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Main", { screen: "Tabs" }),
        },
      ]);
      bottomSheetRef.current?.forceClose();
    } catch (error) {
      logService.addLog(`Error saving location: ${error}`);
      Alert.alert(
        "Error",
        "Ha ocurrido un error al guardar la ubicación. Por favor, intente de nuevo."
      );
    } finally {
      setLoading(false);
    }
  }, [region, userId, navigation]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (user) setUserId(user.uid);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    bottomSheetRef.current?.present();
    getCurrentLocation();
  }, [getCurrentLocation]);

  return (
    <>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          ref={mapRef}
          region={region}
          showsUserLocation
          showsMyLocationButton={false}
          onRegionChangeComplete={setRegion}
        >
          {region && region.latitude !== 0 && (
            <Marker
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
              icon="arrow-left"
              containerColor="white"
              size={28}
              onPress={() => navigation.goBack()}
              style={styles.headerButton}
            />
            <View style={styles.headerActions}>
              <IconButton
                icon="crosshairs-gps"
                containerColor="white"
                size={28}
                style={styles.headerButton}
                onPress={getCurrentLocation}
              />
              <IconButton
                icon="check"
                loading={loading}
                disabled={loading}
                containerColor={theme.colors.primary}
                iconColor="white"
                size={28}
                style={[styles.headerButton, styles.saveButton]}
                onPress={handleSaveLocation}
              />
            </View>
          </View>
        </SafeAreaView>
      </View>

      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={SNAP_POINTS}
        enablePanDownToClose={false}
        enableDismissOnClose={false}
        backgroundStyle={styles.bottomSheetBackground}
        handleIndicatorStyle={styles.bottomSheetIndicator}
      >
        <BottomSheetScrollView style={styles.bottomSheetView}>
          <Searchbar
            placeholder="Buscar lugar..."
            value={query}
            onChangeText={(text) => {
              setQuery(text);
              debouncedSearch(text);
            }}
            style={styles.searchbar}
            icon="magnify"
            clearIcon="close-circle"
            onClearIconPress={() => {
              setQuery("");
              setPlaces([]);
            }}
          />

          {loadPlaces ? (
            <View style={styles.loadingContainer}>
              <LottieView
                autoPlay
                ref={animation}
                style={styles.lottieAnimation}
                source={require("../../../../assets/lottie/maps.json")}
              />
              <Text style={styles.loadingText}>Buscando lugares...</Text>
            </View>
          ) : places.length > 0 ? (
            <View style={styles.placesContainer}>
              {places.map((place) => (
                <List.Item
                  key={place.place_id}
                  title={place.display_name}
                  description={place.name}
                  onPress={() => {
                    const newRegion = {
                      latitude: parseFloat(place.lat),
                      longitude: parseFloat(place.lon),
                      latitudeDelta: 0.0092,
                      longitudeDelta: 0.0092,
                    };
                    setRegion(newRegion);
                    mapRef.current?.animateToRegion(newRegion, 1000);
                    bottomSheetRef.current?.snapToIndex(0);
                    Keyboard.dismiss();
                  }}
                  left={(props) => <List.Icon {...props} icon="map-marker" />}
                />
              ))}
            </View>
          ) : null}
        </BottomSheetScrollView>
      </BottomSheetModal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  map: {
    flex: 1,
    width,
    height,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerButton: {
    margin: 4,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  saveButton: {
    marginLeft: 8,
  },
  bottomSheetView: {
    flex: 1,
    padding: 16,
  },
  bottomSheetBackground: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  bottomSheetIndicator: {
    backgroundColor: "#757575",
    width: 40,
  },
  searchbar: {
    elevation: 2,
    backgroundColor: BACKGROUND_COLOR,
    borderRadius: 8,
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  lottieAnimation: {
    width: 200,
    height: 200,
  },
  loadingText: {
    marginTop: 8,
    color: PRIMARY_COLOR,
    fontSize: 16,
  },
  placesContainer: {
    marginTop: 16,
  },
});
