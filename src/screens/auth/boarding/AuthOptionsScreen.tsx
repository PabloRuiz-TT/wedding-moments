import { ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { MotiView, Text } from "moti";
import { StyleSheet, View } from "react-native";
import "react-native-gesture-handler";
import { Button } from "react-native-paper";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthStackParamList } from "../../../types/navigation.types";
import { NavigationProp } from "@react-navigation/native";

type AuthOptionsScreenProps = {
  navigation: NavigationProp<AuthStackParamList, "AuthOptionsAccess">;
};

export const AuthOptionsScreen = ({ navigation }: AuthOptionsScreenProps) => {
  return (
    <>
      <StatusBar hidden />

      <ImageBackground
        style={styles.image}
        source={require("../../../../assets/images/welcome-bg.jpg")}
        contentFit="cover"
      >
        <LinearGradient
          colors={[
            "rgba(0,0,0,0)",
            "rgba(0,0,0,0.4)",
            "rgba(0,0,0,0.8)",
            "rgba(0,0,0,0.95)",
          ]}
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
          }}
        >
          <SafeAreaView
            style={{
              flex: 1,
              padding: 20,
            }}
          >
            <View
              style={{
                flex: 0.4,
                gap: 16,
                justifyContent: "center",
              }}
            >
              <Text
                from={{ opacity: 0, translateY: 100 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: "timing", duration: 1000 }}
                style={{
                  fontSize: 40,
                  fontFamily: "Italiana_400Regular",
                  color: "white",
                }}
              >
                Crea eventos y comparte con tus amigos y familiares de forma
                fácil
              </Text>

              <Text
                from={{ opacity: 0, translateY: 100 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: "timing", duration: 1000, delay: 500 }}
                style={{
                  fontSize: 20,
                  fontFamily: "Raleway_300Light",
                  color: "white",
                  marginTop: 12,
                }}
              >
                Regístrate o inicia sesión para comenzar
              </Text>
            </View>

            <MotiView
              from={{ opacity: 0, translateY: 100 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: "timing", duration: 1000, delay: 500 }}
              style={{
                flex: 0.4,
                justifyContent: "flex-end",
                gap: 24,
                padding: 12,
              }}
            >
              <Button
                mode="contained"
                onPress={() => navigation.navigate("Login")}
              >
                Iniciar Sesion
              </Button>
              <Button
                onPress={() => navigation.navigate("Register")}
                mode="contained-tonal"
              >
                Crear una cuenta
              </Button>
              <Button mode="text" textColor="white">
                Omitir
              </Button>
            </MotiView>
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
