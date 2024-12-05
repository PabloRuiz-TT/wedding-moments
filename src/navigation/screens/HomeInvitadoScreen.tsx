import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Text, Menu, Divider, Button, Card, IconButton } from "react-native-paper";
import { Boda, BodaService } from "../../services/BodaService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoadingScreen } from "../../screens/loading/LoadingScreen";
import { getAuth, signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";

const bodaService = BodaService.getInstance();

export const Hoome = () => {
  const [code, setCode] = useState<string | null>(null);
  const [boda, setBoda] = useState<Boda | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuVisible, setMenuVisible] = useState(false);
  const navigation = useNavigation();

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const handleLogout = async () => {
    try {
      await signOut(getAuth());
      await AsyncStorage.removeItem("code");
      navigation.reset({
        index: 0,
        routes: [{ name: "Auth" }],
      });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  useEffect(() => {
    const fetchCode = async () => {
      try {
        const storedCode = await AsyncStorage.getItem("code");
        if (storedCode) {
          setCode(storedCode);
        }
      } catch (error) {
        console.error("Error al recuperar el código de AsyncStorage:", error);
      }
    };
    fetchCode();
  }, []);

  useEffect(() => {
    const fetchBoda = async () => {
      if (!code) return;

      try {
        const result = await bodaService.obtenerBodaPorCode(code);
        if (result) {
          setBoda(result);
        }
      } catch (error) {
        console.error("Error al obtener información de la boda:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBoda();
  }, [code]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="Bienvenido" style={styles.appbarContent} />
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={
            <Appbar.Action icon="account-circle-outline" onPress={openMenu} />
          }
        >
          <Menu.Item
            onPress={handleLogout}
            title="Cerrar sesión"
            leadingIcon="logout"
          />
        </Menu>
      </Appbar.Header>

      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {boda ? (
            <Card style={styles.card}>
              <Card.Content>
                <Text style={styles.title}>Información de la Boda</Text>
                <Divider style={styles.divider} />
                <Text style={styles.text}>Título: {boda.titulo}</Text>
                <Text style={styles.text}>Mensaje: {boda.mensaje}</Text>
                <Text style={styles.text}>Fecha: {boda.fechaBoda}</Text>
                <Text style={styles.text}>Novio: {boda.novio}</Text>
                <Text style={styles.text}>Novia: {boda.novia}</Text>
                {boda.latitude && boda.longitude && (
                  <>
                    <Text style={styles.text}>
                      Ubicación: {boda.latitude}, {boda.longitude}
                    </Text>

                    {/* Mapa de la ubicación */}
                    <MapView
                      style={styles.map}
                      initialRegion={{
                        latitude: parseFloat(boda.latitude),
                        longitude: parseFloat(boda.longitude),
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                      }}
                    >
                      <Marker
                        coordinate={{
                          latitude: parseFloat(boda.latitude),
                          longitude: parseFloat(boda.longitude),
                        }}
                        title="Ubicación de la Boda"
                        description="Aquí se celebra la boda"
                      />
                    </MapView>
                  </>
                )}
              </Card.Content>
              <Card.Actions style={styles.cardActions}>
                <Button mode="contained" onPress={() => {}} style={styles.actionButton}>
                  Ver Detalles
                </Button>
                <IconButton
                  icon="map-marker"
                  size={24}
                  style={styles.iconButton}
                  onPress={() => {
                    // Acciones para abrir mapa o ver ubicación
                  }}
                />
              </Card.Actions>
            </Card>
          ) : (
            <Text style={styles.errorText}>No se encontró información de la boda.</Text>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#3F51B5", // Azul oscuro
  },
  appbarContent: {
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 16,
  },
  scrollView: {
    flex: 1,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
  errorText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    color: "#D32F2F", // Color de error
  },
  divider: {
    marginVertical: 8,
    backgroundColor: "#ddd",
  },
  map: {
    width: "100%",
    height: 250,
    marginTop: 20,
    borderRadius: 12,
  },
  cardActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  actionButton: {
    backgroundColor: "#3F51B5",
  },
  iconButton: {
    backgroundColor: "#ddd",
    borderRadius: 50,
  },
});
