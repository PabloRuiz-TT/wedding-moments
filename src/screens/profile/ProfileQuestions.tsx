import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Pregunta = {
  pregunta: string;
  respuesta: string;
};

type Categorias = {
  Ceremonia: Pregunta[];
  Recepción: Pregunta[];
  Fotos: Pregunta[];
  Invitados: Pregunta[];
};

const ProfileQuestionsScreen = ({ navigation }: { navigation: any }) => {
  const [activeTab, setActiveTab] = useState<keyof Categorias>("Ceremonia");
  const [expanded, setExpanded] = useState<number[]>([]);

  const preguntasPorCategoria: Categorias = {
    Ceremonia: [
      {
        pregunta: "¿Cuánto tiempo dura una ceremonia?",
        respuesta:
          "Normalmente dura entre 30 y 60 minutos, dependiendo del tipo de ceremonia.",
      },
      {
        pregunta: "¿Qué documentos se necesitan para casarse?",
        respuesta:
          "Los requisitos varían según el lugar, pero suelen incluir identificación, actas de nacimiento y certificados médicos.",
      },
      {
        pregunta: "¿Puedo personalizar los votos matrimoniales?",
        respuesta:
          "¡Por supuesto! Habla con el oficiante para asegurarte de que puedes incluir tus votos personalizados.",
      },
    ],
    Recepción: [
      {
        pregunta: "¿Qué incluye el servicio de recepción?",
        respuesta:
          "Suele incluir comida, bebida, música, decoración y servicio de meseros.",
      },
      {
        pregunta: "¿Cuánto dura la recepción?",
        respuesta: "Generalmente, la recepción dura entre 4 y 6 horas.",
      },
      {
        pregunta: "¿Puedo llevar mi propia música o banda?",
        respuesta:
          "Depende del lugar, pero la mayoría permite personalizar la música para tu evento.",
      },
    ],
    Fotos: [
      {
        pregunta: "¿Cuánto tiempo lleva una sesión de fotos?",
        respuesta:
          "Depende del tipo de sesión, pero una sesión de pareja puede durar entre 1 y 2 horas.",
      },
      {
        pregunta: "¿Incluye un álbum físico?",
        respuesta:
          "Muchos fotógrafos ofrecen paquetes que incluyen álbumes físicos y fotos digitales.",
      },
      {
        pregunta: "¿Es posible hacer fotos antes de la ceremonia?",
        respuesta:
          'Sí, muchas parejas optan por un "First Look" antes de la ceremonia.',
      },
    ],
    Invitados: [
      {
        pregunta: "¿Cuándo debo enviar las invitaciones?",
        respuesta: "Recomendamos enviarlas al menos 3 meses antes de la boda.",
      },
      {
        pregunta: "¿Cómo puedo gestionar la lista de invitados?",
        respuesta:
          "Utiliza herramientas digitales o aplicaciones para organizar y confirmar asistencia.",
      },
      {
        pregunta: "¿Qué hago si un invitado cancela a última hora?",
        respuesta:
          "Trata de ajustar el número de asistentes con el lugar y proveedores.",
      },
    ],
  };

  const handleTabChange = (tab: keyof Categorias) => {
    setActiveTab(tab);
  };

  const toggleExpand = (index: number) => {
    if (expanded.includes(index)) {
      setExpanded(expanded.filter((i) => i !== index));
    } else {
      setExpanded([...expanded, index]);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Preguntas Frecuentes</Text>
      </View>

      <View style={styles.tabContainer}>
        {Object.keys(preguntasPorCategoria).map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => handleTabChange(tab as keyof Categorias)}
            style={[styles.tabItem, activeTab === tab && styles.activeTab]}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.listContainer}>
        {preguntasPorCategoria[activeTab].map((item, index) => (
          <View key={index} style={styles.accordionContainer}>
            <TouchableOpacity
              style={styles.accordionHeader}
              onPress={() => toggleExpand(index)}
            >
              <Text style={styles.question}>{item.pregunta}</Text>
              <Text style={styles.plusButton}>
                {expanded.includes(index) ? "-" : "+"}
              </Text>
            </TouchableOpacity>
            {expanded.includes(index) && (
              <Text style={styles.answer}>{item.respuesta}</Text>
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#ffffff",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    color: "#333",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tabItem: {
    paddingVertical: 10,
    flex: 1,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: "#333",
  },
  tabText: {
    fontSize: 16,
    color: "#aaa",
  },
  activeTabText: {
    color: "#333",
    fontWeight: "bold",
  },
  listContainer: {
    marginTop: 10,
  },
  accordionContainer: {
    marginBottom: 15,
  },
  accordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  question: {
    fontSize: 16,
    color: "#333",
    flex: 1,
    marginRight: 10,
  },
  plusButton: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#aaa",
  },
  answer: {
    marginTop: 10,
    fontSize: 14,
    color: "#666",
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 8,
  },
});

export default ProfileQuestionsScreen;
