import { NavigatorScreenParams } from "@react-navigation/native";

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  Boarding: undefined;
};

export type TabsParamList = {
  home: undefined;
  itinerario: undefined;
  regalos: undefined;
  photos: undefined;
};

export type DrawerParamList = {
  Tabs: NavigatorScreenParams<TabsParamList>;
  Perfil: undefined;
  Invitados: undefined;
  Eventos: undefined;
  QRCode: undefined;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<DrawerParamList>;
  Modal?: {
    type: "success" | "error" | "warning";
    message: string;
  };
};

export const ROUTES = {
  AUTH: {
    LOGIN: "Login",
    REGISTER: "Register",
    BOARDING: "Boarding",
  },
  DRAWER: {
    TABS: "Tabs",
    PROFILE: "Perfil",
    GUESTS: "Invitados",
    QRCODE: "QRCode",
    EVENTS: "Eventos",
  },
  ROOT: {
    AUTH: "Auth",
    MAIN: "Main",
    MODAL: "Modal",
  },
} as const;
