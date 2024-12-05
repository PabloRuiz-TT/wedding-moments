import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../database/firebase";

export type Itinerario = {
  titulo: string;
  description: string;
  hora: number;
  minuto: number;
};

export class ItinerarioService {
  private constructor() {}

  private static instance: ItinerarioService;

  public static getInstance(): ItinerarioService {
    if (!ItinerarioService.instance) {
      ItinerarioService.instance = new ItinerarioService();
    }
    return ItinerarioService.instance;
  }

  public async crearItinerario(data: Itinerario, usuarioId: string) {
    try {
      const docRef = await addDoc(collection(db, "itinerarios"), {
        ...data,
        usuarioId,
      });

      return docRef.id;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async obtenerItinerariosPorUsuario(usuarioId: string) {
    try {
      const itinerarios: Itinerario[] = [];

      const querySnapshot = await getDocs(
        query(
          collection(db, "itinerarios"),
          where("usuarioId", "==", usuarioId)
        )
      );

      querySnapshot.forEach((doc) => {
        itinerarios.push({
          titulo: doc.data().titulo,
          description: doc.data().description,
          hora: doc.data().hora,
          minuto: doc.data().minuto,
        });
      });

      return itinerarios;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
