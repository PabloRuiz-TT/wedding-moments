import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStackParamList, ROUTES } from "../types/navigation.types";
import { Text } from "react-native-paper";
import { BoardingScreen } from "../screens/auth/boarding/BoardingScreen";
import { AuthOptionsScreen } from "../screens/auth/boarding/AuthOptionsScreen";

const Auth = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Auth.Screen name={ROUTES.AUTH.BOARDING} component={BoardingScreen} />

      <Auth.Screen
        name={ROUTES.AUTH.OPTIONS_ACCESS}
        component={AuthOptionsScreen}
      />

      <Auth.Screen
        name={ROUTES.AUTH.REGISTER}
        component={() => <Text>Register</Text>}
      />
    </Auth.Navigator>
  );
};
