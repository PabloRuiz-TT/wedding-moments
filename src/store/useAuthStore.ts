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
  register: (data: any, isAnonimous: boolean) => Promise<any | null>;
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
    let user;

    createUserWithEmailAndPassword(firebase, data.email, data.password)
      .then(async (response) => {
        if (!isAnonimous) {
          user = {
            userId: response.user.uid,
            nombre: data.nombre,
            apellido: data.apellido,
            telefono: data.telefono,
            rol: "admin",
          };
        } else {
          user = {
            userId: response.user.uid,
            nombre: data.fullName,
            rol: data.rol,
          };
        }

        await addDoc(collection(db, "users"), user);
      })
      .catch((error) => {
        console.log(error);
        throw error;
      });
    return user;
  },
}));
