import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStackParamList, ROUTES } from "../types/navigation.types";
import { Text } from "react-native-paper";

const Auth = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Auth.Screen
        name={ROUTES.AUTH.LOGIN}
        component={() => <Text>Login</Text>}
      />
      <Auth.Screen
        name={ROUTES.AUTH.REGISTER}
        component={() => <Text>Register</Text>}
      />
    </Auth.Navigator>
  );
};
