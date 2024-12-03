import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Itinerario } from "../../../services/ItinerarioService";
import { Text, useTheme, AnimatedFAB } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../types/navigation.types";
import { useItinerario } from "../../../providers/ItinerarioProvider";
import { LoadingScreen } from "../../loading/LoadingScreen";

type ScreenState = "loading" | "error" | "empty" | "data";

export const ItinerarioScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors } = useTheme();
  const [screenState, setScreenState] = useState<ScreenState>("loading");
  const [error, setError] = useState<string>("");

  const { obtenerItinerariosPorUsuario, itinerarios } = useItinerario();

  // Estado para el buscador
  const [searchQuery, setSearchQuery] = useState("");

  // Estado para el FAB extendido
  const [isFabExtended, setIsFabExtended] = useState(true);

  const onScroll = useCallback((event: any) => {
    const currentOffset = event.nativeEvent.contentOffset.y;
    setIsFabExtended(currentOffset <= 0);
  }, []);

  // Definir renderItem aquí, antes de cualquier retorno
  const renderItem = useCallback(
    ({ item }: { item: Itinerario }) => (
      <ItineraryItem itinerario={item} onPress={() => {}} />
    ),
    [navigation]
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        setScreenState("loading");
        await obtenerItinerariosPorUsuario();
        // No establecemos screenState aquí
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
        setScreenState("error");
      }
    };

    loadData();
  }, [obtenerItinerariosPorUsuario]);

  // Actualizar screenState cuando itinerarios cambia
  useEffect(() => {
    if (itinerarios && itinerarios.length > 0) {
      setScreenState("data");
    } else {
      setScreenState("empty");
    }
  }, [itinerarios]);

  // Efecto para cargar datos cuando la pantalla obtiene el foco
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      obtenerItinerariosPorUsuario();
    });

    return unsubscribe;
  }, [navigation]);

  // Filtrar itinerarios utilizando useMemo
  const filteredItinerarios = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return itinerarios.filter((itinerario) => {
      return (
        itinerario.titulo.toLowerCase().includes(query) ||
        itinerario.description.toLowerCase().includes(query)
      );
    });
  }, [itinerarios, searchQuery]);

  // Aseguramos que todos los hooks se han llamado antes de cualquier retorno
  if (screenState === "loading") {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mi Itinerario</Text>
        <TextInput
          placeholder="Buscar..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
      </View>

      {screenState === "error" && (
        <View style={styles.messageContainer}>
          <Text style={styles.errorText}>
            {error || "Ocurrió un error al cargar tu itinerario"}
          </Text>
        </View>
      )}

      {screenState === "empty" && (
        <View style={styles.messageContainer}>
          <Text style={styles.emptyText}>
            Aún no tienes actividades en tu itinerario.
          </Text>
        </View>
      )}

      {screenState === "data" && (
        <FlatList
          data={filteredItinerarios}
          keyExtractor={(item) => item.titulo}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.emptySearchText}>
              No se encontraron actividades que coincidan con tu búsqueda.
            </Text>
          }
          onScroll={onScroll}
        />
      )}

      <AnimatedFAB
        icon="plus"
        label="Agregar actividad"
        extended={isFabExtended}
        onPress={() => navigation.navigate("ItinerarioCrear")}
        visible={true}
        animateFrom="right"
        iconMode="dynamic"
        style={styles.fab}
      />
    </View>
  );
};

interface ItineraryItemProps {
  itinerario: Itinerario;
  onPress: () => void;
}

const ItineraryItem: React.FC<ItineraryItemProps> = React.memo(
  ({ itinerario, onPress }) => {
    const { colors } = useTheme();

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.itemContent}>
          <Text style={styles.itemTitle}>{itinerario.titulo}</Text>
          <Text style={styles.itemDescription}>{itinerario.description}</Text>
        </View>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 16,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333333",
  },
  searchInput: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#F0F0F0",
    fontSize: 16,
    color: "#333333",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 80, // Espacio para el FAB
  },
  itemContainer: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  itemContent: {
    flexDirection: "column",
  },
  itemTitle: {
    fontSize: 18,
    color: "#333333",
    fontWeight: "500",
  },
  itemDescription: {
    fontSize: 14,
    color: "#666666",
    marginTop: 4,
  },
  messageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
  emptyText: {
    fontSize: 18,
    color: "#999999",
  },
  emptySearchText: {
    textAlign: "center",
    marginTop: 20,
    color: "#999999",
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
  },
});
