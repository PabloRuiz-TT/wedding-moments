import { RootStackParamList, ROUTES } from "../types/navigation.types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthNavigator } from "./AuthNavigator";
import { LoadingScreen } from "../screens/loading/LoadingScreen";
import { DrawerNavigator } from "./DrawerNavigator";
import { ProfileNavigator } from "./ProfileNavigator";
import { HomeCrearBodaScreen } from "../screens/main/home/HomeCrearBodaScreen";
import { CamaraPermiso } from "../screens/main/album/components/CamaraPermiso";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Auth"
    >
      <Stack.Screen name={ROUTES.ROOT.LOADING} component={LoadingScreen} />

      <Stack.Screen name={ROUTES.ROOT.AUTH} component={AuthNavigator} />

      <Stack.Screen name={ROUTES.ROOT.MAIN} component={DrawerNavigator} />

      <Stack.Screen name={ROUTES.ROOT.PROFILE} component={ProfileNavigator} />

      <Stack.Screen
        name={ROUTES.ROOT.CamaraPermiso}
        component={HomeCrearBodaScreen}
      />

      <Stack.Group
        screenOptions={{
          presentation: "modal",
        }}
      >
        <Stack.Screen name="HomeCrearBoda" component={CamaraPermiso} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
