import { NavigationProp, RouteProp } from "@react-navigation/native";
import { ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { MotiView, Text } from "moti";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import "react-native-gesture-handler";
import { IconButton } from "react-native-paper";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthStackParamList } from "../../../types/navigation.types";

const sources = [
  require("../../../../assets/images/welcome/src1.jpg"),
  require("../../../../assets/images/welcome/src2.jpg"),
  require("../../../../assets/images/welcome/src3.jpg"),
];

type BoardingScreenProps = {
  navigation: NavigationProp<AuthStackParamList, "Boarding">;
};

export const BoardingScreen = ({ navigation }: BoardingScreenProps) => {
  const [indexImg, setIndexImg] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      indexImg < sources.length - 1
        ? setIndexImg(indexImg + 1)
        : setIndexImg(0);
    }, 8000);

    return () => clearInterval(intervalId);
  }, [indexImg]);

  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <ImageBackground
          source={sources[indexImg]}
          contentFit="cover"
          style={styles.backgroundImage}
        >
          <LinearGradient
            colors={[
              "rgba(0,0,0,0)",
              "rgba(0,0,0,0.4)",
              "rgba(0,0,0,0.8)",
              "rgba(0,0,0,0.95)",
            ]}
            style={styles.gradient}
          >
            <SafeAreaView style={styles.contentContainer}>
              <View style={styles.bottomContent}>
                <Text
                  from={{ opacity: 0, translateY: 50 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ type: "timing", duration: 1000 }}
                  style={styles.appTitle}
                >
                  Wedding Moments
                </Text>

                <Text
                  from={{ opacity: 0, translateY: 50 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ type: "timing", duration: 1000 }}
                  style={styles.description}
                >
                  Captura los mejores momentos de tu boda en una experiencia
                  única y memorable.
                </Text>

                <MotiView
                  from={{ opacity: 0, translateY: 50 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ type: "timing", duration: 1000 }}
                  style={styles.buttonContainer}
                >
                  <IconButton
                    icon="arrow-right"
                    containerColor="white"
                    iconColor="black"
                    size={35}
                    animated
                    style={styles.button}
                    onPress={() => {
                      navigation.reset({
                        index: 0,
                        routes: [{ name: "Login" }],
                      });
                    }}
                    rippleColor="rgba(0, 0, 0, .16)"
                  />
                  <Text style={styles.buttonText}>Comenzar</Text>
                </MotiView>
              </View>
            </SafeAreaView>
          </LinearGradient>
        </ImageBackground>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  gradient: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    justifyContent: "flex-end",
  },

  bottomContent: {
    gap: 20,
    marginBottom: 30,
  },
  appTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 42,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  description: {
    color: "white",
    opacity: 0.9,
    lineHeight: 32,
    fontSize: 24,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginTop: 20,
  },
  button: {
    borderRadius: 35,
    width: 70,
    height: 70,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    opacity: 0.9,
  },
});
