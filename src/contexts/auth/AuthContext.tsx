import { createContext, useContext, useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebase } from "../../database/firebase";
import { PersonaService, RegisterDTO } from "../../services/persona";

const AuthContext = createContext({});

const personaService = PersonaService.getInstance();

export const AuthProvider = ({ children }: any) => {
  const [isAuth, setIsAuth] = useState(false);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await signInWithEmailAndPassword(
        firebase,
        email,
        password
      );

      return response;
    } catch (e: any) {
      throw e;
    }
  };

  const signUp = async (data: RegisterDTO) => {
    try {
      const response = await createUserWithEmailAndPassword(
        firebase,
        data.correo,
        data.password
      );

      if (response.user) {
        data.usuarioID = response.user.uid;

        const rows = await personaService.createPersona(data);

        if (rows > 0) {
          const persona = await personaService.getPersonaByEmail(data.correo);

          await AsyncStorage.setItem("user", JSON.stringify(persona));

          return true;
        }
      }
    } catch (e: any) {
      throw e;
    }
  };

  const validateSession = async () => {
    const user = await AsyncStorage.getItem("user");

    return user ? true : false;
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        signIn,
        signUp,
        validateSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
