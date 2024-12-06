import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ActivityIndicator, Card } from "react-native-paper";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../database/firebase";

const ItinerarioInvitadoScreen = () => {
  const [itinerarios, setItinerarios] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const user = getAuth().currentUser;

  useEffect(() => {
    if (!user) {
      setError("No hay usuario autenticado");
      setIsLoading(false);
      return;
    }

    const itinerariosRef = collection(db, "itinerarios");
    const q = query(itinerariosRef, where("usuarioId", "==", user.uid));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const itinerariosData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItinerarios(itinerariosData);
        setIsLoading(false);
      },
      (error) => {
        console.error("Error al escuchar cambios en itinerarios:", error);
        setError("Error al cargar los itinerarios");
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.timelineItem}>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>
          {`${item.hora}:${item.minuto.toString().padStart(2, "0")}`}
        </Text>
      </View>

      <View style={styles.lineContainer}>
        <View style={styles.circle} />
        <View style={styles.line} />
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>{item.titulo}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </Card.Content>
      </Card>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size="large" />
        <Text>Cargando itinerarios...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Itinerario</Text>
        <View style={styles.titleUnderline} />
        <Text style={styles.headerDescription}>
          Visualiza todas las actividades planificadas para este evento.
        </Text>
      </View>

      {itinerarios.length > 0 ? (
        <FlatList
          data={itinerarios}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No hay itinerarios disponibles.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 16,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  titleUnderline: {
    width: 80,
    height: 3,
    backgroundColor: "#007BFF",
    marginTop: 4,
    borderRadius: 2,
  },
  headerDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "left",
    marginTop: 8,
  },
  listContainer: {
    paddingBottom: 16,
  },
  timelineItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  timeContainer: {
    width: 50,
    justifyContent: "center",
    alignItems: "flex-end",
    marginRight: 8,
  },
  timeText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  lineContainer: {
    alignItems: "center",
    marginRight: 8,
  },
  circle: {
    width: 10,
    height: 10,
    backgroundColor: "orange",
    borderRadius: 5,
    marginBottom: 4,
  },
  line: {
    width: 2,
    height: "100%",
    backgroundColor: "orange",
    flex: 1,
  },
  card: {
    flex: 1,
    borderRadius: 8,
    elevation: 2, // Sombra para Android
    shadowColor: "#000", // Sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    backgroundColor: "#f8f9fa",
    padding: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    color: "#888",
    marginTop: 8,
  },
});

export default ItinerarioInvitadoScreen;
