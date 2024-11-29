import { RootStackParamList, ROUTES } from "../types/navigation.types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthNavigator } from "./AuthNavigator";
import { LoadingScreen } from "../screens/loading/LoadingScreen";
import { DrawerNavigator } from "./DrawerNavigator";
import { ProfileNavigator } from "./ProfileNavigator";
import { HomeCrearBodaScreen } from "../screens/main/home/HomeCrearBodaScreen";
import { CamaraPermiso } from "../screens/main/album/components/CamaraPermiso";
import { Platform } from "react-native";
import { CameraScreen } from "../screens/main/album/CameraScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        navigationBarHidden: true,
        keyboardHandlingEnabled: true,
        contentStyle: { backgroundColor: "white" },
      }}
      initialRouteName="Loading"
    >
      <Stack.Screen name={ROUTES.ROOT.LOADING} component={LoadingScreen} />

      <Stack.Screen name={ROUTES.ROOT.AUTH} component={AuthNavigator} />

      <Stack.Screen name={ROUTES.ROOT.MAIN} component={DrawerNavigator} />

      <Stack.Screen name={ROUTES.ROOT.PROFILE} component={ProfileNavigator} />

      <Stack.Group
        screenOptions={{
          presentation: "modal",
          freezeOnBlur: true,
          animation: Platform.select({ ios: "default", android: "fade" }),
        }}
      >
        <Stack.Screen
          name={ROUTES.ROOT.HOME_CREAR_BODA}
          component={HomeCrearBodaScreen}
        />

        <Stack.Screen
          name={ROUTES.ROOT.CAMARA_PERMISO}
          component={CamaraPermiso}
        />

        <Stack.Screen
          name={ROUTES.ROOT.CAMARA_SCREEN}
          component={CameraScreen}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
