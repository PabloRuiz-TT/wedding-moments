import {
  createDrawerNavigator,
  DrawerNavigationOptions,
} from "@react-navigation/drawer";
import {
  DrawerParamList,
  RootStackParamList,
  ROUTES,
} from "../types/navigation.types";
import { TabNavigator } from "./TabNavigator";
import { Icon, IconButton, Text, useTheme } from "react-native-paper";
import { useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeCrearBodaScreen } from "../screens/main/home/HomeCrearBodaScreen";
import EventosScreen from "../screens/Eventos/EventosScreen";

const Drawer = createDrawerNavigator<DrawerParamList>();

const ICON_SIZE = 20;

export const DrawerNavigator = () => {
  const { colors } = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const screenOptions = useMemo<DrawerNavigationOptions>(
    () => ({
      drawerLabelStyle: { color: "black" },
      drawerActiveBackgroundColor: colors.primaryContainer,
      drawerType: "front",
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
        name={ROUTES.MAIN.TABS}
        component={TabNavigator}
        options={{
          drawerIcon: () => <Icon source="home" size={ICON_SIZE} />,
          headerRight: () => (
            <IconButton
              icon="account"
              size={20}
              iconColor="black"
              onPress={() =>
                navigation.navigate("Profile", { screen: "Profile" })
              }
            />
          ),
          title: "Inicio",
          headerTitle: "",
        }}
      />

      <Drawer.Screen
        name={ROUTES.MAIN.Invitados}
        component={() => <Text>Invitados</Text>}
        options={{
          title: "Invitados",
          drawerIcon: () => <Icon source="account-multiple" size={ICON_SIZE} />,
          headerRight: () => <Icon source="magnify" size={ICON_SIZE} />,
        }}
      />
      <Drawer.Screen
        name={ROUTES.MAIN.QRCode}
        component={() => <Text>QRCode</Text>}
        options={{
          title: "Invitación QR",
          drawerIcon: () => <Icon source="qrcode" size={ICON_SIZE} />,
          headerRight: () => (
            <Icon source="share-variant-outline" size={ICON_SIZE} />
          ),
        }}
      />
      <Drawer.Screen
        name={ROUTES.MAIN.Eventos}
        component={EventosScreen}
        options={{
          title: "Eventos",
          drawerIcon: () => <Icon source="party-popper" size={ICON_SIZE} />,
          headerRight: () => <Icon source="plus" size={ICON_SIZE} />,
        }}
      />
    </Drawer.Navigator>
  );
};
