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
  ROOT: {
    AUTH: "Auth",
    MAIN: "Main",
    MODAL: "Modal",
    PROFILE: "Profile",
  },
  AUTH: {
    LOGIN: "Login",
    REGISTER: "Register",
    BOARDING: "Boarding",
    OPTIONS_ACCESS: "AuthOptionsAccess",
  },
  DRAWER: {
    TABS: "Tabs",
    GUESTS: "Invitados",
    QRCODE: "QRCode",
    EVENTS: "Eventos",
  },
  PROFILE: {
    PROFILE: "Profile",
    PROFILE_EDIT: "ProfileEdit",
    PROFILE_INFO: "ProfileInfo",
    PROFILE_QUESTIONS: "ProfileQuestions",
  },
} as const;
