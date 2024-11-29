import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../database/firebase";
import { Region } from "react-native-maps";

export type Boda = {
  bodaId: string;
  titulo: string;
  mensaje: string;
  fechaBoda: string;
  usuarioId: string;
  novio: string;
  novia: string;
};

export class BodaService {
  private constructor() {}

  private static instance: BodaService;

  public static getInstance(): BodaService {
    if (!BodaService.instance) {
      BodaService.instance = new BodaService();
    }
    return BodaService.instance;
  }

  public async crearBoda(boda: Boda) {
    try {
      const docRef = doc(db, "bodas", boda.usuarioId);

      await setDoc(docRef, boda, { merge: true });

      return docRef.id;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async obtenerBodaPorUsuarioId(usuarioId: string) {
    try {
      const docRef = doc(db, "bodas", usuarioId);

      const docSnap = await getDoc(docRef);

      return docSnap.exists() ? (docSnap.data() as Boda) : null;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  public async addUbicacion(region: Region, usuarioId: string) {
    try {
      const docRef = doc(db, "bodas", usuarioId);

      await setDoc(docRef, region, { merge: true });
    } catch (error) {
      throw error;
    }
  }
}
