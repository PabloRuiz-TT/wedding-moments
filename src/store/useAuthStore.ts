import { create } from "zustand";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  UserCredential,
  User,
} from "firebase/auth";
import { db } from "../database/firebase";
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

type AuthState = {
  user: any | null;
  token: string | null;
};

type AuthActions = {
  login: (email: string, password: string) => Promise<UserCredential | null>;
  register: (data: Register) => Promise<UserCredential | null>;
};

const logService = LogService.getInstance();

export const useAuthStore = create<AuthState & AuthActions>()((set, get) => ({
  user: null,
  token: null,
  login: async (email: string, password: string) => {
    try {
      const auth = getAuth();
      const response = await signInWithEmailAndPassword(auth, email, password);

      // Actualiza el estado del usuario después del login
      await get().setUser(response.user);
      return response;
    } catch (error) {
      console.error("Error en login:", error);
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

// Listener para sincronizar el estado del usuario automáticamente
const auth = getAuth();
onAuthStateChanged(auth, async (user) => {
  console.log("Estado de autenticación cambiado:", user);
  await useAuthStore.getState().setUser(user);
});
