import { RootStackParamList, ROUTES } from "../types/navigation.types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthNavigator } from "./AuthNavigator";
import { LoadingScreen } from "../screens/loading/LoadingScreen";
import { TabNavigator } from "./TabNavigator";
import { DrawerNavigator } from "./DrawerNavigator";
import { ProfileNavigator } from "./ProfileNavigator";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Loading"
    >
      <Stack.Screen name={ROUTES.ROOT.LOADING} component={LoadingScreen} />

      <Stack.Screen name={ROUTES.ROOT.AUTH} component={AuthNavigator} />

      <Stack.Screen name={ROUTES.ROOT.MAIN} component={DrawerNavigator} />

      <Stack.Screen name={ROUTES.ROOT.PROFILE} component={ProfileNavigator} />
    </Stack.Navigator>
  );
};
