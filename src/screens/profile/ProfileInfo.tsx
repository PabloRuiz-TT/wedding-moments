import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "react-native-paper";

const ProfileInfoScreen = ({ navigation }: { navigation: any }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Políticas de Privacidad</Text>
      </View>

      <View style={styles.section}>
        <Ionicons
          name="document-text-outline"
          size={30}
          color="#d32f2f"
          style={styles.icon}
        />
        <Text style={styles.sectionTitle}>1. Recopilación de Datos</Text>
        <Text style={styles.sectionText}>
          Recopilamos datos básicos como tu nombre, correo electrónico y
          detalles de tu evento para personalizar tu experiencia y ayudarte a
          planificar tu boda ideal.
        </Text>
      </View>

      <View style={styles.section}>
        <Ionicons
          name="shield-checkmark-outline"
          size={30}
          color="#d32f2f"
          style={styles.icon}
        />
        <Text style={styles.sectionTitle}>2. Protección de tus Datos</Text>
        <Text style={styles.sectionText}>
          Toda tu información se almacena de manera segura y nunca será
          compartida sin tu consentimiento. Utilizamos tecnología avanzada para
          garantizar su protección.
        </Text>
      </View>

      <View style={styles.section}>
        <Ionicons
          name="trash-bin-outline"
          size={30}
          color="#d32f2f"
          style={styles.icon}
        />
        <Text style={styles.sectionTitle}>
          3. Eliminación de tu Información
        </Text>
        <Text style={styles.sectionText}>
          Puedes solicitar la eliminación de tu información personal en
          cualquier momento. Para ello, contáctanos a través del soporte dentro
          de la aplicación.
        </Text>
      </View>

      <View style={styles.section}>
        <Ionicons
          name="cloud-upload-outline"
          size={30}
          color="#d32f2f"
          style={styles.icon}
        />
        <Text style={styles.sectionTitle}>4. Uso de tu Información</Text>
        <Text style={styles.sectionText}>
          Utilizamos tus datos exclusivamente para personalizar tu experiencia,
          enviarte notificaciones importantes y mejorar nuestros servicios
          relacionados con tu boda.
        </Text>
      </View>

      <View style={styles.footer}>
        <Button
          mode="contained"
          onPress={() => navigation.goBack()}
          style={styles.acceptButton}
          labelStyle={styles.acceptButtonText}
        >
          Aceptar Políticas
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    color: "#333",
  },
  section: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  icon: {
    alignSelf: "center",
    marginBottom: 10,
    color: "#e8def8",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#e8def8",
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    textAlign: "justify",
    color: "#666",
    lineHeight: 22,
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
  acceptButton: {
    backgroundColor: "#d32f2f",
    paddingVertical: 10,
    borderRadius: 8,
    width: "100%",
  },
  acceptButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default ProfileInfoScreen;
