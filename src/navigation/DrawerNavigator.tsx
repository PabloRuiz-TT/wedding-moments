import {
  createDrawerNavigator,
  DrawerNavigationOptions,
} from "@react-navigation/drawer";
import {
  DrawerParamList,
  ProfileStackParamList,
  ROUTES,
} from "../types/navigation.types";
import { TabNavigator } from "./TabNavigator";
import { Icon, IconButton, useTheme } from "react-native-paper";
import { useMemo } from "react";
import ProfileScreen from "../screens/profile/Profile";
import ProfileEditScreen from "../screens/profile/ProfileEdit";
import ProfileInfoScreen from "../screens/profile/ProfileInfo";
import ProfileQuestionsScreen from "../screens/profile/ProfileQuestions";
import { NavigationProp } from "@react-navigation/native";
import { Alert } from "react-native";

const Drawer = createDrawerNavigator<DrawerParamList>();

const ICON_SIZE = 20;

type DrawerNavigatorProps = {
  navigation: NavigationProp<ProfileStackParamList, "Profile">;
};

export const DrawerNavigator = ({ navigation }: DrawerNavigatorProps) => {
  const { colors } = useTheme();

  const screenOptions = useMemo<DrawerNavigationOptions>(
    () => ({
      drawerLabelStyle: { color: "black" },
      drawerActiveBackgroundColor: colors.primaryContainer,
      drawerType: "front",
      drawerHideStatusBarOnOpen: true,
      sceneStyle: { backgroundColor: "white" },
      headerRightContainerStyle: { paddingRight: 12 },
      headerShadowVisible: false,
      headerTintColor: "#000",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }),
    [colors.primaryContainer]
  );

  return (
    <Drawer.Navigator screenOptions={screenOptions}>
      <Drawer.Screen
        name={ROUTES.DRAWER.TABS}
        component={TabNavigator}
        options={{
          drawerIcon: () => <Icon source="home" size={ICON_SIZE} />,
          headerRight: () => (
            <IconButton
              icon="account"
              size={20}
              iconColor="black"
              onPress={() => {
                navigation.navigate("Profile");
              }}
            />
          ),
          title: "Inicio",
        }}
      />

      <Drawer.Screen
        name={ROUTES.DRAWER.GUESTS}
        component={() => null}
        options={{
          title: "Invitados",
          drawerIcon: () => <Icon source="account-multiple" size={ICON_SIZE} />,
          headerRight: () => <Icon source="magnify" size={ICON_SIZE} />,
        }}
      />
      <Drawer.Screen
        name={ROUTES.DRAWER.QRCODE}
        component={() => null}
        options={{
          title: "Invitación QR",
          drawerIcon: () => <Icon source="qrcode" size={ICON_SIZE} />,
          headerRight: () => (
            <Icon source="share-variant-outline" size={ICON_SIZE} />
          ),
        }}
      />
      <Drawer.Screen
        name={ROUTES.DRAWER.EVENTS}
        component={() => null}
        options={{
          title: "Eventos",
          drawerIcon: () => <Icon source="party-popper" size={ICON_SIZE} />,
          headerRight: () => <Icon source="plus" size={ICON_SIZE} />,
        }}
      />
    </Drawer.Navigator>
  );
};
