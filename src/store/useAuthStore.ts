import { create } from "zustand";
import {
  signInWithEmailAndPassword,
  UserCredential,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { db, firebase } from "../database/firebase";
import { collection, addDoc } from "firebase/firestore";
import { LogService } from "../services/LogService";
import { Alert } from "react-native";

export type Register = {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  telefono: string;
};

export type UserCreate = {
  userId: string;
  nombre: string;
  apellido: string;
  telefono: string;
  rol: string;
};

type AuthActions = {
  login: (email: string, password: string) => Promise<UserCredential | null>;
  register: (data: any, isAnonimous: boolean) => Promise<UserCredential | null>;
};

const logService = LogService.getInstance();

export const useAuthStore = create<AuthActions>()((set, get) => ({
  login: async (email: string, password: string) => {
    try {
      const response = await signInWithEmailAndPassword(
        firebase,
        email,
        password
      );

      return response.user ? response : null;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  register: async (data: any, isAnonimous = false) => {
    let userCredential = null;

    try {
      userCredential = await createUserWithEmailAndPassword(
        firebase,
        data.email,
        data.password
      );

      let user = {};

      if (isAnonimous) {
        user = {
          userId: userCredential.user.uid,
          nombre: data.fullName,
          rol: data.rol,
        };
      } else {
        user = {
          userId: userCredential.user.uid,
          nombre: data.nombre,
          apellido: data.apellido,
          telefono: data.telefono,
          rol: "admin",
        };
      }

      try {
        await addDoc(collection(db, "users"), user);

        return userCredential;
      } catch (error: any) {
        if (userCredential?.user) {
          await userCredential.user.delete();
        }

        logService.addLog({ error: error });
        throw error;
      }
      return userCredential;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
}));
