import { addDoc, collection, getDocs } from "firebase/firestore";
import { create } from "zustand";
import { db } from "../database/firebase";

export type BodaState = {
  id?: string; // ID del documento en Firestore
  titulo: string; // Título del evento
  mensaje: string; // Mensaje adicional
  novio: string; // Nombre del novio
  novia: string; // Nombre de la novia
  fechaBoda: Date | undefined; // Fecha del evento
  usuarioID: string; // ID del usuario que creó la boda
};

type BodaActions = {
  crearBoda: (data: BodaState) => Promise<string>; // Función para crear una nueva boda
  obtenerBodaPorUsuario: (usuarioID: string) => Promise<BodaState | null>; // Función para obtener una sola boda
  obtenerBodasPorUsuario: (usuarioID: string) => Promise<BodaState[]>; // Función para obtener todas las bodas del usuario
};

export const useBodaStore = create<BodaState & BodaActions>((set, get) => ({
  titulo: "",
  mensaje: "",
  novio: "",
  novia: "",
  fechaBoda: undefined,
  usuarioID: "",

  // Crear una nueva boda en Firestore
  crearBoda: async (data: BodaState) => {
    try {
      const response = await addDoc(collection(db, "bodas"), data);
      console.log("Boda creada con ID:", response.id);
      return response.id; // Devuelve el ID del documento creado
    } catch (error) {
      console.error("Error al crear la boda:", error);
      throw error;
    }
  },

  // Obtener una sola boda asociada a un usuario
  obtenerBodaPorUsuario: async (usuarioID: string) => {
    try {
      const querySnapshot = await getDocs(collection(db, "bodas"));
      const bodas: BodaState[] = [];
      querySnapshot.forEach((doc) => {
        const boda = doc.data() as BodaState;
        if (boda.usuarioID === usuarioID) {
          bodas.push({ id: doc.id, ...boda }); // Incluye el ID del documento
        }
      });

      // Devuelve la primera boda encontrada (puedes ajustar según necesidades)
      return bodas.length > 0 ? bodas[0] : null;
    } catch (error) {
      console.error("Error al obtener la boda:", error);
      throw error;
    }
  },

  // Obtener todas las bodas asociadas a un usuario
  obtenerBodasPorUsuario: async (usuarioID: string) => {
    try {
      const querySnapshot = await getDocs(collection(db, "bodas"));
      const bodas: BodaState[] = [];
      querySnapshot.forEach((doc) => {
        const boda = doc.data() as BodaState;
        if (boda.usuarioID === usuarioID) {
          bodas.push({ id: doc.id, ...boda }); // Incluye el ID del documento
        }
      });

      console.log("Bodas encontradas para el usuario:", bodas);
      return bodas;
    } catch (error) {
      console.error("Error al obtener las bodas:", error);
      throw error;
    }
  },
}));
