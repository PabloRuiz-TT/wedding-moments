import React, { useState } from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import { TextInput, Button, Avatar, Title } from "react-native-paper";
import PhoneInput from "react-native-phone-number-input";

const ProfileEditScreen = () => {
  const [nombre, setNombre] = useState("William");
  const [apellido, setApellido] = useState("Robert");
  const [correo, setCorreo] = useState("williamrobert@gmail.com");
  const [edad, setEdad] = useState("32");
  const [altura, setAltura] = useState("5'4");
  const [fechaNacimiento, setFechaNacimiento] = useState("12/12/1989");
  const [telefono, setTelefono] = useState("");
  const [lada, setLada] = useState("+55");

  const handlePhoneChange = (text: string) => {
    setTelefono(text.slice(0, 10));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar.Image
          source={{ uri: "https://via.placeholder.com/150" }}
          size={100}
          style={styles.avatar}
        />
      </View>

      <View style={styles.formContainer}>
        <Title style={styles.formTitle}>Editar Perfil</Title>

        <View style={styles.rowContainer}>
          <TextInput
            label="Nombre"
            value={nombre}
            onChangeText={setNombre}
            style={styles.halfInput}
            mode="outlined"
          />
          <TextInput
            label="Apellido"
            value={apellido}
            onChangeText={setApellido}
            style={styles.halfInput}
            mode="outlined"
          />
        </View>

        <TextInput
          label="Correo Electrónico"
          value={correo}
          onChangeText={setCorreo}
          style={styles.input}
          mode="outlined"
          keyboardType="email-address"
        />

        <View style={styles.rowContainer}>
          <TextInput
            label="Edad"
            value={edad}
            onChangeText={setEdad}
            style={styles.halfInput}
            mode="outlined"
            keyboardType="numeric"
          />
          <TextInput
            label="Altura"
            value={altura}
            onChangeText={setAltura}
            style={styles.halfInput}
            mode="outlined"
          />
        </View>

        <View style={styles.phoneContainer}>
          <PhoneInput
            defaultCode="US"
            layout="first"
            value={telefono}
            onChangeFormattedText={setLada}
            onChangeText={handlePhoneChange}
            containerStyle={styles.phoneInput}
            textInputStyle={styles.phoneTextInput}
          />
        </View>

        <TextInput
          label="Fecha de Nacimiento"
          value={fechaNacimiento}
          onChangeText={setFechaNacimiento}
          style={styles.input}
          mode="outlined"
        />

        <View style={styles.buttonContainer}>
          <Button mode="contained" style={styles.saveButton}>
            Guardar Cambios
          </Button>
          <Button mode="text" style={styles.discardButton}>
            Cancelar
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#ffffff",
    flexGrow: 1,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    marginBottom: 20,
  },
  formContainer: {
    flex: 1,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    marginBottom: 15,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  halfInput: {
    width: "48%",
  },
  phoneContainer: {
    marginBottom: 15,
  },
  phoneInput: {
    width: "100%",
  },
  phoneTextInput: {
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#d32f2f",
    width: "100%",
    paddingVertical: 10,
    marginBottom: 10,
  },
  discardButton: {
    width: "100%",
    paddingVertical: 10,
    color: "#666",
  },
});

export default ProfileEditScreen;
