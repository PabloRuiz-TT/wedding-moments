import { NavigatorScreenParams } from "@react-navigation/native";

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  Boarding: undefined;
  AuthOptionsAccess: undefined;
};

export type ProfileStackParamList = {
  Profile: undefined;
  ProfileEdit: undefined;
  ProfileInfo: undefined;
  ProfileQuestions: undefined;
};

export type TabsParamList = {
  home: undefined;
  itinerario: undefined;
  regalos: undefined;
  photos: undefined;
};

export type DrawerParamList = {
  Tabs: NavigatorScreenParams<TabsParamList>;
  Invitados: undefined;
  Eventos: undefined;
  QRCode: undefined;
  Profile: undefined;
  ProfileEdit: undefined;
  ProfileInfo: undefined;
  ProfileQuestions: undefined;
};

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<DrawerParamList>;
  Profile: NavigatorScreenParams<ProfileStackParamList>;
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
    OPTIONS_ACCESS: "AuthOptionsAccess",
  },
  DRAWER: {
    TABS: "Tabs",
    PROFILE: "Profile",
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
