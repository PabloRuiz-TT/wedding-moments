import { RootStackParamList, ROUTES } from "../types/navigation.types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrawerNavigator } from "./DrawerNavigator";
import { AuthNavigator } from "./AuthNavigator";
import { ProfileNavigator } from "./ProfileNavigator";
import { useAuth } from "../contexts/auth/AuthContext";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const { user }: any = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {user ? (
        <>
          <Stack.Screen name={ROUTES.ROOT.MAIN} component={DrawerNavigator} />
          <Stack.Screen
            name={ROUTES.ROOT.PROFILE}
            component={ProfileNavigator}
          />
        </>
      ) : (
        <Stack.Screen name={ROUTES.ROOT.AUTH} component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};
