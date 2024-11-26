import { NavigationContainer } from "@react-navigation/native";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { PaperProvider, ProgressBar } from "react-native-paper";
import { RootNavigator } from "./src/navigation/RootNavigator";
import { Suspense } from "react";
import { SQLiteProvider } from "expo-sqlite";
import { AuthProvider } from "./src/contexts/auth/AuthContext";
import { DATABASE_NAME, migrateDbIfNeeded } from "./src/database/database";

export default function App() {
  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <AuthProvider>
        <Suspense fallback={<ProgressBar indeterminate />}>
          <SQLiteProvider
            useSuspense={true}
            databaseName={DATABASE_NAME}
            onInit={migrateDbIfNeeded}
          >
            <PaperProvider>
              <NavigationContainer>
                <RootNavigator />
              </NavigationContainer>
            </PaperProvider>
          </SQLiteProvider>
        </Suspense>
      </AuthProvider>
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
