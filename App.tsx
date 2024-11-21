import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { PaperProvider } from "react-native-paper";
import { RootStack } from "./src/routes/RootStack";

export default function App() {
  const [active, setActive] = useState("");
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
