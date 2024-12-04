import { useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  ImageBackground,
  FlatList,
} from "react-native";
import { Text, useTheme, Surface, Divider } from "react-native-paper";
import MapView, { Marker } from "react-native-maps";
import { LoadingScreen } from "../../loading/LoadingScreen";
import { HomeEmpty } from "./HomeEmpty";
import { useHome } from "../../../providers/HomeProvider";

export const HomeScreen = () => {
  const { colors, fonts } = useTheme();
  const { obtenerBodaPorUsuario, bodaData, isLoading } = useHome();

  useEffect(() => {
    const loadData = async () => {
      await obtenerBodaPorUsuario();
    };

    loadData();
  }, [obtenerBodaPorUsuario]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!bodaData) {
    return <HomeEmpty />;
  }

  const diasRestantes = () => {
    if (!bodaData.fechaBoda) return 0;

    const [dia, mes, año] = bodaData.fechaBoda.split("/");
    const fechaBoda = new Date(`${año}-${mes}-${dia}T00:00:00`);
    const hoy = new Date();
    const diferencia = fechaBoda.getTime() - hoy.getTime();

    if (isNaN(diferencia)) {
      console.error("Fecha de boda inválida:", bodaData.fechaBoda);
      return 0;
    }

    return Math.ceil(diferencia / (1000 * 3600 * 24));
  };

  const initialRegion = {
    latitude: bodaData.latitude || 40.416775,
    longitude: bodaData.longitude || -3.70379,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  const galleryImages = [
    require("../../../../assets/images/welcome/src1.jpg"),
    require("../../../../assets/images/welcome/src2.jpg"),
    require("../../../../assets/images/welcome/src3.jpg"),
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContainer: {
      padding: 16,
    },
    header: {
      gap: 8,
      marginBottom: 24,
      alignItems: "center",
    },
    title: {
      fontSize: 32,
      color: colors.onBackground,
    },
    subtitle: {
      fontSize: 18,
      color: colors.onBackground,
    },
    cardContainer: {
      marginBottom: 24,
    },
    surface: {
      borderRadius: 16,
      overflow: "hidden",
    },
    imageBackground: {
      width: "100%",
      height: 250,
      justifyContent: "center",
      alignItems: "center",
    },
    textOverlay: {
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      padding: 20,
      borderRadius: 12,
    },
    weddingTitle: {
      fontSize: 28,
      color: colors.onSurface,
      textAlign: "center",
    },
    weddingDate: {
      fontSize: 16,
      color: colors.onSurface,
      textAlign: "center",
      marginTop: 4,
    },
    names: {
      fontSize: 20,
      color: colors.onSurface,
      textAlign: "center",
      marginTop: 8,
    },
    messageContainer: {
      marginTop: 24,
      paddingHorizontal: 16,
    },
    messageText: {
      fontSize: 16,
      color: colors.onBackground,
      textAlign: "center",
    },
    statsContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginVertical: 24,
    },
    statCard: {
      alignItems: "center",
    },
    statNumber: {
      fontSize: 32,
      color: colors.onBackground,
    },
    statLabel: {
      fontSize: 14,
      color: colors.onBackground,
      marginTop: 4,
      textAlign: "center",
    },
    mapContainer: {
      height: 200,
      borderRadius: 16,
      overflow: "hidden",
      marginBottom: 24,
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    locationDetails: {
      padding: 16,
      alignItems: "center",
    },
    locationText: {
      fontSize: 16,
      color: colors.onBackground,
      textAlign: "center",
    },
    galleryContainer: {
      marginVertical: 24,
    },
    card: {
      width: 250,
      height: 300,
      marginRight: 16,
      borderRadius: 16,
      overflow: "hidden",
      elevation: 3,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    cardImageBackground: {
      flex: 1,
      justifyContent: "flex-end",
    },
    cardTextOverlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      padding: 12,
      borderBottomLeftRadius: 16,
      borderBottomRightRadius: 16,
    },
    cardTitle: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
    },
    cardDescription: {
      fontSize: 14,
      color: "#fff",
      marginTop: 4,
    },
    buttonContainer: {
      alignItems: "center",
      marginBottom: 32,
    },
    actionButton: {
      width: "90%",
      paddingVertical: 12,
      borderRadius: 30,
      marginVertical: 8,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary,
    },
    actionButtonText: {
      fontSize: 16,
      color: colors.onPrimary,
      marginLeft: 8,
    },
    shareButton: {
      backgroundColor: colors.secondary,
    },
  });

  const compartirBoda = () => {
    console.log("Compartir Boda");
  };

  const editarBoda = () => {
    console.log("Editar Boda");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Tu Boda</Text>
          <Text style={styles.subtitle}>Detalles de tu evento especial</Text>
        </View>

        <View style={styles.cardContainer}>
          <Surface style={styles.surface}>
            <ImageBackground
              source={require("../../../../assets/illustrations/Whimsical Pastel Arrangement.jpeg")}
              style={styles.imageBackground}
              resizeMode="cover"
            >
              <View style={styles.textOverlay}>
                <Text style={styles.weddingTitle}>{bodaData.titulo}</Text>
                <Text style={styles.weddingDate}>
                  {new Date(bodaData.fechaBoda).toLocaleDateString()}
                </Text>
                <Text style={styles.names}>
                  {bodaData.novio} & {bodaData.novia}
                </Text>
              </View>
            </ImageBackground>
          </Surface>
        </View>

        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>{bodaData.mensaje}</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{diasRestantes()}</Text>
            <Text style={styles.statLabel}>Días Restantes</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Invitados Confirmados</Text>
          </View>
        </View>

        <Divider />

        <View style={styles.locationDetails}>
          <Text style={styles.subtitle}>Ubicación</Text>
        </View>

        <View style={styles.mapContainer}>
          <MapView
            initialRegion={initialRegion}
            style={styles.map}
            scrollEnabled={false}
            zoomEnabled={false}
          >
            <Marker coordinate={initialRegion} />
          </MapView>
        </View>

        <Divider />

        <View style={styles.galleryContainer}>
          <Text
            style={[
              styles.subtitle,
              { textAlign: "center", marginVertical: 12 },
            ]}
          >
            Nuestra Historia
          </Text>
          <FlatList
            data={galleryImages}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <ImageBackground
                  source={item}
                  style={styles.cardImageBackground}
                  resizeMode="cover"
                  imageStyle={{ borderRadius: 16 }}
                >
                  <View style={styles.cardTextOverlay}>
                    <Text style={styles.cardTitle}>Un Recuerdo Especial</Text>
                    <Text style={styles.cardDescription}>
                      Revive este momento mágico.
                    </Text>
                  </View>
                </ImageBackground>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};
