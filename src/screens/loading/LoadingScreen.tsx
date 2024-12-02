import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export const LoadingScreen = () => {
  const { colors } = useTheme();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background,
        padding: 16,
      }}
    >
      <StatusBar style="light" />
      <ActivityIndicator color={colors.primary} animating={true} size="small" />
    </SafeAreaView>
  );
};
