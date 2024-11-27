import { useNavigation } from "@react-navigation/native";
import { PropsWithChildren, useEffect } from "react";
import { RootStackParamList } from "../types/navigation.types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

export const AuthenticationProvider = ({ children }: PropsWithChildren) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.reset({
          index: 0,
          routes: [{ name: "Main" }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: "Auth" }],
        });
      }
    });
  }, []);
  return <>{children}</>;
};
