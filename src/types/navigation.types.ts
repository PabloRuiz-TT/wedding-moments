import { NavigatorScreenParams } from "@react-navigation/native";

export type AuthStackParamList = {
  Boarding: undefined;
  AuthOptionsAccess: undefined;
  Login: undefined;
  Register: undefined;
  AuthSkip: undefined;
};

export type DrawerParamList = {
  Tabs: undefined;
  Invitados: undefined;
  Eventos: undefined;
  QRCode: undefined;
};

export type ProfileStackParamList = {
  Profile: undefined;
  ProfileEdit: undefined;
  ProfileInfo: undefined;
  ProfileQuestions: undefined;
};

export type RootStackParamList = {
  Loading: undefined;
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<DrawerParamList>;
  Profile: NavigatorScreenParams<ProfileStackParamList>;
  HomeCrearBoda: undefined;
  CamaraPermiso: undefined;
  CameraScreen: undefined;
  HomeMapScreen: undefined;
};

export const ROUTES = {
  ROOT: {
    AUTH: "Auth",
    LOADING: "Loading",
    MAIN: "Main",
    PROFILE: "Profile",
    HOME_CREAR_BODA: "HomeCrearBoda",
    CAMARA_PERMISO: "CamaraPermiso",
    CAMARA_SCREEN: "CameraScreen",
    HOME_MAP_SCREEN: "HomeMapScreen",
  },
  AUTH: {
    BOARDING: "Boarding",
    OPTIONS_ACCESS: "AuthOptionsAccess",
    LOGIN: "Login",
    REGISTER: "Register",
  },
  MAIN: {
    TABS: "Tabs",
    Invitados: "Invitados",
    Eventos: "Eventos",
    QRCode: "QRCode",
  },

  PROFILE: {
    PROFILE: "Profile",
    PROFILE_EDIT: "ProfileEdit",
    PROFILE_INFO: "ProfileInfo",
    PROFILE_QUESTIONS: "ProfileQuestions",
  },
} as const;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
