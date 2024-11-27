import { create } from "zustand";
import {
  signInWithEmailAndPassword,
  UserCredential,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { db, firebase } from "../database/firebase";
import { collection, addDoc } from "firebase/firestore";

export type Register = {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  telefono: string;
};

type AuthState = {
  user: any | null;
  token: string | null;
};

type AuthActions = {
  login: (email: string, password: string) => Promise<UserCredential | null>;
  register: (data: Register) => Promise<UserCredential | null>;
};

export const useAuthStore = create<AuthState & AuthActions>()((set, get) => ({
  user: null,
  token: null,
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
  register: async (data: Register) => {
    try {
      const { email, password } = data;

      const response = await createUserWithEmailAndPassword(
        firebase,
        email,
        password
      );

      await addDoc(collection(db, "users"), data);

      return response.user ? response : null;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
}));
