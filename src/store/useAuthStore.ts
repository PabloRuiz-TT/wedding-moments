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

export type Register = {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  telefono: string;
};

type AuthState = {
  user: User | null; // Usuario autenticado
  token: string | null; // Token JWT del usuario
  setUser: (user: User | null) => Promise<void>; // Actualiza el estado del usuario
};

type AuthActions = {
  login: (email: string, password: string) => Promise<UserCredential | null>; // Inicia sesión
  register: (data: Register) => Promise<UserCredential | null>; // Registra un nuevo usuario
};

export const useAuthStore = create<AuthState & AuthActions>()((set, get) => ({
  user: null,
  token: null,

  // Actualiza el estado del usuario y el token
  setUser: async (user) => {
    if (user) {
      const token = await user.getIdToken();
      set({ user, token });
    } else {
      set({ user: null, token: null });
    }
  },

  // Inicia sesión con email y contraseña
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

  // Registra un nuevo usuario y guarda sus datos en Firestore
  register: async (data: Register) => {
    try {
      const auth = getAuth();
      const { email, password } = data;

      const response = await createUserWithEmailAndPassword(auth, email, password);

      // Guarda el usuario en Firestore
      await addDoc(collection(db, "users"), {
        ...data,
        uid: response.user.uid,
      });

      // Actualiza el estado del usuario después del registro
      await get().setUser(response.user);
      return response;
    } catch (error) {
      console.error("Error en register:", error);
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
