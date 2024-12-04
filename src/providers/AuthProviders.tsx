import { useNavigation } from "@react-navigation/native";
import { PropsWithChildren, useEffect, useState } from "react";
import { RootStackParamList } from "../types/navigation.types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Alert } from "react-native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../database/firebase";

const auth = getAuth();

export const AuthenticationProvider = ({ children }: PropsWithChildren) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [userId, setUserId] = useState<string>();
  const [role, setRole] = useState<string>();

  useEffect(() => {
    const getUser = async () => {
      const result = collection(db, "users");
      const data = query(result, where("userId", "==", userId));
      const querySnapshot = await getDocs(data);

      setRole(querySnapshot.docs[0].data().rol);
    };

    if (userId) {
      getUser();
    }
  }, [userId]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      }
    });
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      navigation.reset({
        index: 0,
        routes: user
          ? [
              {
                name: role === "admin" ? "Main" : "MainInvitado",
              },
            ]
          : [{ name: "Auth" }],
      });
    });
  }, [navigation]);
  return <>{children}</>;
};
