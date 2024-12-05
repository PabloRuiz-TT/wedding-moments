import React, { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Text, Button, Card, Title, Paragraph } from "react-native-paper";
import QRCode from "react-native-qrcode-svg";
import { BodaService } from "../../services/BodaService";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const bodaService = BodaService.getInstance();

export const QRCodeScreen = () => {
  const [userId, setUserId] = useState("");
  const [boda, setBoda] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setUserId(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userId) {
      obtenerDatosBoda();
    }
  }, [userId]);

  const obtenerDatosBoda = async () => {
    try {
      setLoading(true);
      const bodaData = await bodaService.obtenerBodaPorUsuario(userId);
      setBoda(bodaData);
    } catch (error) {
      console.error("Error al obtener datos de la boda:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderNoBodaContent = () => (
    <Card style={styles.card} elevation={0}>
      <Card.Content>
        <Title style={styles.title}>¡Aún no tienes una boda registrada!</Title>
        <Paragraph style={styles.paragraph}>
          Para comenzar a gestionar tu boda y generar un código QR para tus
          invitados, necesitas crear una nueva boda primero.
        </Paragraph>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("HomeCrearBoda")}
            style={styles.button}
          >
            Crear Nueva Boda
          </Button>
        </View>
      </Card.Content>
    </Card>
  );

  const renderBodaContent = () => (
    <View style={styles.bodaContainer}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Código QR de tu Boda</Title>
          <View style={styles.qrContainer}>
            <QRCode
              value={JSON.stringify({
                bodaId: boda.id,
                nombreNovios: `${boda.nombreNovio} & ${boda.nombreNovia}`,
                fecha: boda.fecha,
              })}
              size={250}
            />
          </View>
          <Paragraph style={styles.paragraph}>
            Comparte este código QR con tus invitados para que puedan acceder a
            los detalles de tu boda.
          </Paragraph>
        </Card.Content>
      </Card>

      <Card style={[styles.card, styles.infoCard]}>
        <Card.Content>
          <Title style={styles.subtitle}>Detalles de la Boda</Title>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailText}>
              Novios: {boda?.nombreNovio} & {boda?.nombreNovia}
            </Text>
            <Text style={styles.detailText}>
              Fecha: {new Date(boda?.fecha).toLocaleDateString()}
            </Text>
            <Text style={styles.detailText}>Lugar: {boda?.lugar}</Text>
          </View>
        </Card.Content>
      </Card>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando información de la boda...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {boda ? renderBodaContent() : renderNoBodaContent()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 16,
    elevation: 4,
    borderRadius: 12,
  },
  infoCard: {
    marginTop: 8,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 16,
    color: "#1a237e",
  },
  subtitle: {
    fontSize: 20,
    color: "#1a237e",
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 12,
    color: "#424242",
  },
  qrContainer: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 8,
    marginVertical: 16,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 16,
  },
  button: {
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  bodaContainer: {
    padding: 8,
  },
  detailsContainer: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 8,
  },
  detailText: {
    fontSize: 16,
    marginVertical: 4,
    color: "#424242",
  },
});
