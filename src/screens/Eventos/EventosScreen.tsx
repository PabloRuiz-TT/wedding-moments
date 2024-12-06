import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { useBodaStore } from "../../store/useBodaStore";
import { useAuthStore } from "../../store/useAuthStore";
import { getAuth } from "firebase/auth";

const EventosScreen = () => {
  const [eventos, setEventos] = useState<any[]>([]);
  const usuarioID = useAuthStore((state) => state.user?.uid);
  const obtenerBodasPorUsuario = useBodaStore(
    (state) => state.obtenerBodasPorUsuario
  );


  useEffect(() => {
    if (!usuarioID) {
      console.error("No se encontró un usuario autenticado.");
      return;
    }
  
    const fetchData = async () => {
      try {
        const bodas = await obtenerBodasPorUsuario(usuarioID);
        setEventos(bodas || []);
      } catch (error) {
        console.error("Error al obtener las bodas:", error);
      }
    };
  
    fetchData();
  }, [usuarioID]);

  const renderItem = ({ item }: { item: any }) => (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.title}>{item.titulo}</Text>
        <Text>{item.mensaje}</Text>
        <Text>Novio: {item.novio}</Text>
        <Text>Novia: {item.novia}</Text>
        <Text>Fecha: {new Date(item.fechaBoda).toLocaleDateString()}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      {eventos.length > 0 ? (
        <FlatList
          data={eventos}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={styles.emptyText}>No hay eventos disponibles.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f9f9f9" },
  card: { marginBottom: 16 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 8 },
  emptyText: { textAlign: "center", marginTop: 20, fontSize: 16 },
});

export default EventosScreen;
