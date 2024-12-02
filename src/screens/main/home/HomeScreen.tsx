import { useEffect } from "react";
import { useHome } from "../../../providers/HomeProvider";
import { HomeEmpty } from "./HomeEmpty";
import { LoadingScreen } from "../../loading/LoadingScreen";
import { ScrollView, View } from "react-native";
import { Icon, Text, useTheme } from "react-native-paper";
import { recommendations } from "../../../_mocks/services";
import { ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";

export const HomeScreen = () => {
  const { colors } = useTheme();
  const { obtenerBodaPorUsuario, bodaData, isLoading } = useHome();

  useEffect(() => {
    const loadData = async () => {
      await obtenerBodaPorUsuario();
    };

    loadData();
  }, [obtenerBodaPorUsuario]);

  useEffect(() => {
    if (bodaData) {
    }
  }, [bodaData]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!bodaData) {
    return <HomeEmpty />;
  }

  return (
    <ScrollView style={{ flex: 1, padding: 16, backgroundColor: "white" }}>
      <View style={{ display: "flex", gap: 12 }}>
        <Text variant="titleMedium" style={{ color: colors.onSurface }}>
          Hola, bienvenido
        </Text>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Icon source="calendar-outline" size={20} color={colors.backdrop} />
          <Text variant="bodyMedium" style={{ color: colors.backdrop }}>
            {bodaData.fechaBoda}
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Icon
            source="account-heart-outline"
            size={20}
            color={colors.backdrop}
          />
          <Text variant="bodyMedium" style={{ color: colors.backdrop }}>
            {bodaData.novio} y {bodaData.novia}
          </Text>
        </View>
      </View>

      <View
        style={{
          height: 160,
          display: "flex",
          flexDirection: "row",
          marginTop: 48,
          gap: 8,
        }}
      >
        <View
          style={{
            flex: 0.5,
            width: "100%",
            height: "100%",
            backgroundColor: colors.primaryContainer,
            borderRadius: 12,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 16,
          }}
        >
          <Text variant="displayLarge" style={{ color: colors.onPrimary }}>
            19
          </Text>

          <Text variant="titleLarge" style={{ color: colors.onPrimary }}>
            Días faltantes
          </Text>
        </View>
        <View
          style={{
            flex: 0.5,
            width: "100%",
            height: "100%",
            backgroundColor: colors.secondaryContainer,
            borderRadius: 12,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 16,
          }}
        >
          <Text variant="displayLarge" style={{ color: colors.onSecondary }}>
            0
          </Text>

          <Text variant="titleLarge" style={{ color: colors.onSecondary }}>
            Invitados
          </Text>
        </View>
      </View>

      <View>
        <View
          style={{
            marginTop: 48,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text variant="titleMedium" style={{ color: colors.onSurface }}>
            Recomendaciones y tips
          </Text>

          <Text variant="bodyMedium" style={{ color: colors.backdrop }}>
            Ver más
          </Text>
        </View>

        <Text
          variant="bodyMedium"
          style={{ color: colors.backdrop, marginTop: 12 }}
        >
          Encuentra los mejores tips para tu boda y recomendaciones para que tu
          día sea inolvidable y especial.
        </Text>

        <View style={{ marginTop: 16, display: "flex", gap: 16 }}>
          {recommendations.map((recommendation) => {
            return (
              <ImageBackground
                key={recommendation.id}
                source={recommendation.image}
                style={{
                  height: 400,
                  width: "100%",
                  borderRadius: 12,
                  overflow: "hidden",
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
                    {recommendation.title}
                  </Text>
                </LinearGradient>
              </ImageBackground>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};
