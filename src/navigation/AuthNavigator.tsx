import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthStackParamList, ROUTES } from "../types/navigation.types";
import { BoardingScreen } from "../screens/auth/boarding/BoardingScreen";
import { AuthOptionsScreen } from "../screens/auth/boarding/AuthOptionsScreen";
import LoginScreen from "../screens/auth/login/LoginScreen";
import RegisterScreen from "../screens/auth/register/RegisterScreen";

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

      <Auth.Group
        screenOptions={{
          presentation: "modal",
          contentStyle: { backgroundColor: "white", padding: 20 },
        }}
      >
        <Auth.Screen name="Login" component={LoginScreen} />
        <Auth.Screen name="Register" component={RegisterScreen} />
      </Auth.Group>
    </Auth.Navigator>
  );
};
