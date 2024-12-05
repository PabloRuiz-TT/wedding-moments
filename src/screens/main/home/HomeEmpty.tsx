import { useNavigation } from "@react-navigation/native";
import { ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Animated, ScrollView, View } from "react-native";
import {
  IconButton,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";
import { RootStackParamList } from "../../../types/navigation.types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { servicesImages } from "../../../_mocks/services";

export const HomeEmpty = () => {
  const { colors } = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [showButton, setShowButton] = useState(false);
  const fadeAnim = new Animated.Value(0);

  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    if (scrollY > 10 && !showButton) {
      setShowButton(true);
    } else if (scrollY <= 10 && showButton) {
      setShowButton(false);
    }
  };

  useEffect(() => {
    if (showButton) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [showButton]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView
        style={{ flex: 1, padding: 16 }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={{ gap: 4 }}>
          <Text
            style={{
              fontSize: 42,
              fontFamily: "Quicksand_400Regular",
            }}
          >
            Empecemos a
            <Text
              style={{
                fontFamily: "Quicksand_500Medium",
                color: colors.primary,
              }}
            >
              {" "}
              planificar{" "}
            </Text>
            tu boda
          </Text>

          <Text style={{ fontSize: 22, opacity: 0.7, marginTop: 20 }}>
            Agrega tus invitados, crea tu lista de regalos y mucho más
          </Text>
        </View>

        <View style={{ marginTop: 48 }}>
          {servicesImages.map((service, index) => (
            <TouchableRipple
              key={index}
              onPress={() => navigation.navigate(service.path)}
            >
              <ImageBackground
                source={service.uri}
                style={{
                  height: 200,
                  width: "100%",
                  borderRadius: 12,
                  overflow: "hidden",
                  marginBottom: 16,
                }}
              >
                <LinearGradient
                  colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]}
                  style={{
                    height: "100%",
                    width: "100%",
                    justifyContent: "flex-end",
                    padding: 16,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 24,
                      fontFamily: "Quicksand_500Medium",
                    }}
                  >
                    {service.text}
                  </Text>
                </LinearGradient>
              </ImageBackground>
            </TouchableRipple>
          ))}
        </View>
      </ScrollView>

      <Animated.View
        style={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: [
            { translateX: -50 },
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
          opacity: fadeAnim,
        }}
      >
        <TouchableRipple
          onPress={() => navigation.navigate("HomeCrearBoda")}
          style={{
            backgroundColor: "white",
            paddingRight: 16,
            paddingLeft: 8,
            paddingVertical: 4,
            borderRadius: 50,
          }}
          rippleColor="rgba(0, 0, 0, .32)"
          borderless
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            <IconButton
              icon="plus"
              size={16}
              containerColor="black"
              iconColor="white"
            />
            <Text variant="titleMedium">Crear evento</Text>
          </View>
        </TouchableRipple>
      </Animated.View>
    </View>
  );
};
