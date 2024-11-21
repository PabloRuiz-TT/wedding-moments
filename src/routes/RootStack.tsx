import { createDrawerNavigator } from "@react-navigation/drawer";
import { MainTabsLayout } from "./layouts/MainTabsLayout";
import { Icon, IconButton, useTheme } from "react-native-paper";
import { DrawerLayout } from "./layouts/DrawerLayout";

const Drawer = createDrawerNavigator();

export const RootStack = () => {
  const { colors } = useTheme();

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerLabelStyle: { color: "black" },
        drawerActiveBackgroundColor: colors.primaryContainer,
        drawerType: "front",
        drawerHideStatusBarOnOpen: true,
        sceneStyle: { backgroundColor: "white" },
        headerShadowVisible: false,
        headerTintColor: "#000",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
      drawerContent={(props) => <DrawerLayout props={props} />}
    >
      <Drawer.Screen
        options={{
          drawerIcon: () => <Icon source="home" size={24} />,
          title: "Inicio",
          headerRight: () => <IconButton icon="qrcode" onPress={() => {}} />,
        }}
        name="MainTabsLayout"
        component={MainTabsLayout}
      />

      <Drawer.Screen
        name="Perfil"
        component={() => null}
        options={{
          drawerIcon: () => <Icon source="account" size={24} />,
          title: "Perfil",
        }}
      />

      <Drawer.Screen
        name="Invitados"
        component={() => null}
        options={{
          drawerIcon: () => <Icon source="account-multiple" size={24} />,

          title: "Invitados",
        }}
      />

      <Drawer.Screen
        name="Eventos"
        component={() => null}
        options={{
          drawerIcon: () => <Icon source="party-popper" size={24} />,
          title: "Mis Eventos",
        }}
      />
    </Drawer.Navigator>
  );
};
