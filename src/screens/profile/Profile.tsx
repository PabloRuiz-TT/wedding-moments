import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, View, Text, StyleSheet, Image } from "react-native";
import { Button, List, Avatar, TouchableRipple } from "react-native-paper";
import { ProfileStackParamList } from "../../types/navigation.types";

const ProfileScreen = () => {
  const navigation = useNavigation<NavigationProp<ProfileStackParamList>>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Avatar.Image
          source={{ uri: "https://via.placeholder.com/150" }}
          size={100}
          style={styles.avatar}
        />
        <Text style={styles.userName}>Osmar Casillas</Text>

        <TouchableRipple onPress={() => navigation.navigate("ProfileEdit")}>
          <Button mode="outlined" style={styles.viewProfileButton}>
            Ver perfil
          </Button>
        </TouchableRipple>
      </View>

      <View style={styles.listContainer}>
        <List.Item
          title="Información"
          left={() => <List.Icon icon="information-outline" />}
          onPress={() => navigation.navigate("ProfileQuestions")}
          style={styles.listItem}
        />
        <List.Item
          title="Favoritos"
          left={() => <List.Icon icon="heart-outline" />}
          style={styles.listItem}
        />
        <List.Item
          title="Ajustes"
          left={() => <List.Icon icon="cog-outline" />}
          style={styles.listItem}
        />
        <List.Item
          title="Ayuda"
          left={() => <List.Icon icon="help-circle-outline" />}
          onPress={() => navigation.navigate("ProfileInfo")}
          style={styles.listItem}
        />
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
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    marginBottom: 10,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  viewProfileButton: {
    borderColor: "#d32f2f",
    color: "#d32f2f",
  },
  listContainer: {
    marginTop: 20,
  },
  listItem: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default ProfileScreen;
