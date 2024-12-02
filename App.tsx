import { NavigationContainer } from "@react-navigation/native";
import { KeyboardAvoidingView, StyleSheet } from "react-native";
import { PaperProvider } from "react-native-paper";
import { RootNavigator } from "./src/navigation/RootNavigator";
import { registerTranslation } from "react-native-paper-dates";
import { AuthenticationProvider } from "./src/providers/AuthProviders";

export default function App() {
  registerTranslation("es", {
    save: "Aceptar",
    selectSingle: "Fecha",
    selectMultiple: "",
    selectRange: "",
    notAccordingToDateFormat: (inputFormat) =>
      `Date format must be ${inputFormat}`,
    mustBeHigherThan: (date) => `Must be later then ${date}`,
    mustBeLowerThan: (date) => `Must be earlier then ${date}`,
    mustBeBetween: (startDate, endDate) =>
      `Must be between ${startDate} - ${endDate}`,
    dateIsDisabled: "Day is not allowed",
    previous: "Anterior",
    next: "Siguiente",
    typeInDate: "Type in date",
    pickDateFromCalendar: "Pick date from calendar",
    close: "Cerrar",
    hour: "",
    minute: "",
  });

  return (
    <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
      <PaperProvider>
        <NavigationContainer>
          <AuthenticationProvider>
            <RootNavigator />
          </AuthenticationProvider>
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
