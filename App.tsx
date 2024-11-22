import { NavigationContainer } from "@react-navigation/native";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { PaperProvider } from "react-native-paper";
import { RootStack } from "./src/ui/routes/RootStack";

export default function App() {
  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <PaperProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </PaperProvider>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },

  keyboardAvoidingView: {
    flex: 1,
  },
});
