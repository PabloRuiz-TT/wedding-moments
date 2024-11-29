import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { AuthStackParamList, ROUTES } from "../types/navigation.types";
import { BoardingScreen } from "../screens/auth/boarding/BoardingScreen";
import { AuthOptionsScreen } from "../screens/auth/boarding/AuthOptionsScreen";
import { LoginScreen } from "../screens/auth/login/LoginScreen";
import { RegisterScreen } from "../screens/auth/register/RegisterScreen";
import { Platform } from "react-native";

const Auth = createNativeStackNavigator<AuthStackParamList>();

export const AuthNavigator = () => {
  return (
    <Auth.Navigator
      initialRouteName={ROUTES.AUTH.BOARDING}
      screenOptions={{
        headerShown: false,
        animation: Platform.select({ ios: "default", android: "fade" }),
        freezeOnBlur: true,
      }}
    >
      <Auth.Screen
        name={ROUTES.AUTH.BOARDING}
        component={BoardingScreen}
        options={{
          animationTypeForReplace: "pop",
        }}
      />

      <Auth.Screen
        name={ROUTES.AUTH.OPTIONS_ACCESS}
        component={AuthOptionsScreen}
        listeners={({ navigation }) => ({
          beforeRemove: () => {},
        })}
      />

      <Auth.Group
        screenOptions={{
          presentation: "modal",
          contentStyle: { backgroundColor: "white" },
          animation: "slide_from_bottom",
          gestureEnabled: true,
          gestureDirection: "vertical",
        }}
      >
        <Auth.Screen
          name="Login"
          component={LoginScreen}
          options={{
            gestureEnabled: true,
          }}
        />
        <Auth.Screen name="Register" component={RegisterScreen} />
      </Auth.Group>
    </Auth.Navigator>
  );
};
