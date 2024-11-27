import * as SQLite from "expo-sqlite";
import { DATABASE_NAME } from "../database/database";

export type Evento = {
  usuarioID?: string;
  titulo: string;
  descripcion: string;
  novio: string;
  novia: string;
  ubicacion: string;
  fechaEvento: string;
};

export class EventoService {
  private db!: SQLite.SQLiteDatabase;

  private constructor() {
    this.db = SQLite.openDatabaseSync(DATABASE_NAME);
  }

  public static getInstance() {
    return new EventoService();
  }

  public async crearEvento(evento: Evento) {
    const {
      titulo,
      descripcion,
      fechaEvento,
      usuarioID,
      novia,
      novio,
      ubicacion,
    } = evento;

    try {
      const result = await this.db.runAsync(
        `INSERT INTO eventos (Titulo, Descripcion, Novio, Novia, FechaEvento, Ubicacion, AdministradorID) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [titulo, descripcion, novio, novia, ubicacion, fechaEvento, usuarioID!]
      );

      return result.lastInsertRowId;
    } catch (error: any) {
      throw error;
    }
  }

  public async obtenerEvento(eventoID: number) {
    return await this.db.getFirstAsync(
      `SELECT * FROM eventos WHERE EventoID = ?`,
      [eventoID]
    );
  }

  public async obtenerEventoByAdministrador(usuarioId: number) {
    console.log("usuarioId", usuarioId);
    return await this.db.getFirstAsync(
      `SELECT * FROM eventos WHERE AdministradorID = ?`,
      [usuarioId]
    );
  }
}
