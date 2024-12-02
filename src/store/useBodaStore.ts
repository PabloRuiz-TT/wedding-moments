import { addDoc, collection, getDoc, getDocs } from "firebase/firestore";
import { create } from "zustand";
import { db } from "../database/firebase";

export type BodaState = {
  titulo: string;
  mensaje: string;
  novio: string;
  novia: string;
  fechaBoda: Date | undefined;
  usuarioID: string;
};

type BodaActions = {
  crearBoda: (data: BodaState) => Promise<string>;
  obtenerBodaPorUsuario: (usuarioID: string) => Promise<BodaState>;
};

export const useBodaStore = create<BodaState & BodaActions>((set, get) => ({
  titulo: "",
  mensaje: "",
  novio: "",
  novia: "",
  fechaBoda: undefined,
  usuarioID: "",

  crearBoda: async (data: BodaState) => {
    try {
      const response = await addDoc(collection(db, "bodas"), data);

      return response.id;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  obtenerBodaPorUsuario: async (usuarioID: string) => {
    try {
      const querySnapshot = await getDocs(collection(db, "bodas"));

      const bodas: BodaState[] = [];

      querySnapshot.forEach((doc) => {
        bodas.push(doc.data() as BodaState);
      });

      const boda = bodas.find((boda) => boda.usuarioID === usuarioID);

      return boda || ({} as BodaState);
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
}));
