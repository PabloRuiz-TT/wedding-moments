import {
  createDrawerNavigator,
  DrawerNavigationOptions,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMemo, useState } from "react";
import { View, StyleSheet, Alert, TouchableOpacity } from "react-native";
import {
  Icon,
  IconButton,
  Text,
  useTheme,
  Portal,
  Dialog,
  Button,
} from "react-native-paper";
import { getAuth, signOut } from "firebase/auth";
import {
  DrawerParamList,
  RootStackParamList,
  ROUTES,
} from "../types/navigation.types";
import { TabNavigator } from "./TabNavigator";
import { useAuth } from "../providers/AuthProviders";
import { QRCodeScreen } from "../screens/qr/QRCodeScreen";

const Drawer = createDrawerNavigator<DrawerParamList>();
const ICON_SIZE = 24;

// Componente personalizado para cada item del menú
const CustomDrawerItem = ({
  icon,
  label,
  isActive,
  onPress,
}: {
  icon: string;
  label: string;
  isActive: boolean;
  onPress: () => void;
}) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.drawerItem,
        isActive && { backgroundColor: colors.primaryContainer },
      ]}
    >
      <View style={styles.drawerItemContent}>
        <View style={styles.iconContainer}>
          <Icon
            source={icon}
            size={ICON_SIZE}
            color={isActive ? colors.primary : colors.onSurfaceVariant}
          />
        </View>
        <Text
          variant="bodyLarge"
          style={[
            styles.drawerItemLabel,
            { color: isActive ? colors.primary : colors.onSurface },
          ]}
        >
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// Componente personalizado para el contenido del drawer
const CustomDrawerContent = (props: any) => {
  const { colors } = useTheme();
  const [logoutDialogVisible, setLogoutDialogVisible] = useState(false);
  const { userRole } = useAuth();
  const auth = getAuth();
  const navigation = props.navigation;
  const state = props.state;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setLogoutDialogVisible(false);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      Alert.alert(
        "Error",
        "No se pudo cerrar la sesión. Por favor, intenta de nuevo."
      );
    }
  };

  const menuItems = [
    { route: ROUTES.MAIN.TABS, icon: "home", label: "Inicio" },
    {
      route: ROUTES.MAIN.Invitados,
      icon: "account-multiple",
      label: "Invitados",
    },
    { route: ROUTES.MAIN.QRCode, icon: "qrcode", label: "Invitación QR" },
    { route: ROUTES.MAIN.Eventos, icon: "party-popper", label: "Eventos" },
  ];

  return (
    <View style={styles.container}>
      {/* Encabezado del Drawer */}
      <View
        style={[
          styles.drawerHeader,
          { backgroundColor: colors.primaryContainer },
        ]}
      >
        <Icon source="account-circle" size={60} color={colors.primary} />
        <Text variant="titleMedium" style={styles.roleText}>
          {userRole === "admin" ? "Administrador" : "Invitado"}
        </Text>
      </View>

      {/* Lista personalizada de items */}
      <View style={styles.drawerItemsContainer}>
        {menuItems.map((item, index) => (
          <CustomDrawerItem
            key={item.route}
            icon={item.icon}
            label={item.label}
            isActive={state.index === index}
            onPress={() => navigation.navigate(item.route)}
          />
        ))}
      </View>

      {/* Sección inferior con botón de cerrar sesión */}
      <View style={[styles.bottomSection, { borderTopColor: colors.outline }]}>
        <CustomDrawerItem
          icon="logout"
          label="Cerrar sesión"
          isActive={false}
          onPress={() => setLogoutDialogVisible(true)}
        />
      </View>

      {/* Diálogo de confirmación para cerrar sesión */}
      <Portal>
        <Dialog
          visible={logoutDialogVisible}
          onDismiss={() => setLogoutDialogVisible(false)}
        >
          <Dialog.Title>Cerrar sesión</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              ¿Estás seguro que deseas cerrar tu sesión?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setLogoutDialogVisible(false)}>
              Cancelar
            </Button>
            <Button textColor={colors.error} onPress={handleLogout}>
              Cerrar sesión
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export const DrawerNavigator = () => {
  const { colors } = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const screenOptions = useMemo<DrawerNavigationOptions>(
    () => ({
      headerStyle: {
        backgroundColor: colors.surface,
      },
      headerRightContainerStyle: { paddingRight: 12 },
      headerShadowVisible: false,
      headerTintColor: colors.onSurface,
      headerTitleStyle: {
        fontWeight: "bold",
      },
      drawerStyle: {
        width: "80%", // Ancho del drawer
      },
    }),
    [colors]
  );

  return (
    <Drawer.Navigator
      screenOptions={screenOptions}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name={ROUTES.MAIN.TABS}
        component={TabNavigator}
        options={{
          headerRight: () => (
            <IconButton
              icon="account"
              size={20}
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
          headerRight: () => (
            <IconButton icon="magnify" size={ICON_SIZE} onPress={() => {}} />
          ),
        }}
      />

      <Drawer.Screen
        name={ROUTES.MAIN.QRCode}
        component={QRCodeScreen}
        options={{
          title: "Invitación QR",
          headerRight: () => (
            <IconButton
              icon="share-variant-outline"
              size={ICON_SIZE}
              onPress={() => {}}
            />
          ),
        }}
      />

      <Drawer.Screen
        name={ROUTES.MAIN.Eventos}
        component={() => <Text>Eventos</Text>}
        options={{
          title: "Eventos",
          headerRight: () => (
            <IconButton icon="plus" size={ICON_SIZE} onPress={() => {}} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    padding: 16,
    paddingTop: 48,
    alignItems: "center",
  },
  roleText: {
    marginTop: 8,
    fontWeight: "500",
  },
  drawerItemsContainer: {
    flex: 1,
    paddingTop: 8,
  },
  drawerItem: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginHorizontal: 8,
    marginVertical: 4,
    borderRadius: 8,
  },
  drawerItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  drawerItemLabel: {
    fontWeight: "500",
  },
  bottomSection: {
    paddingVertical: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
});
