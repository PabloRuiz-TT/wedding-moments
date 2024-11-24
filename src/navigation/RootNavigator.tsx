import { RootStackParamList, ROUTES } from "../types/navigation.types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrawerNavigator } from "./DrawerNavigator";
import { AuthNavigator } from "./AuthNavigator";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* <Stack.Screen
        name={ROUTES.ROOT.MAIN}
        component={DrawerNavigator}
        options={{ headerShown: false }}
      /> */}

      <Stack.Screen
        name={ROUTES.ROOT.AUTH}
        component={AuthNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Group>
        <Stack.Screen name={ROUTES.ROOT.MODAL} component={() => null} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
