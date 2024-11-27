import * as SQLite from "expo-sqlite";
import { DATABASE_NAME } from "../database/database";

export type RegisterDTO = {
  usuarioID?: string;
  nombre: string;
  correo: string;
  password: string;
  telefono: string;
};

export class PersonaService {
  private db!: SQLite.SQLiteDatabase;

  private constructor() {
    this.db = SQLite.openDatabaseSync(DATABASE_NAME);
  }

  public static getInstance() {
    return new PersonaService();
  }

  public async createPersona(data: RegisterDTO, isAnonymous = false) {
    const { usuarioID, nombre, correo, password, telefono } = data;

    const result = await this.db.runAsync(
      `INSERT INTO usuarios (UsuarioID, Nombre, Correo, Password, Telefono, Rol) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        usuarioID!,
        nombre,
        correo,
        password,
        telefono,
        isAnonymous ? "Invitado" : "Admin",
      ]
    );

    return result.lastInsertRowId;
  }

  public async getPersonaByEmail(correo: string) {
    try {
      console.log("correo", correo);
      const result = await this.db.getFirstAsync(
        `SELECT * FROM usuarios WHERE Correo = ?`,
        [correo]
      );

      return result;
    } catch (error: any) {
      throw error;
    }
  }

  public async getPersonaById(id: string) {
    return await this.db.getFirstAsync(
      `SELECT * FROM usuarios WHERE UsuarioID = ?`,
      [id]
    );
  }

  public async getPersonas() {
    return await this.db.getAllAsync(`SELECT * FROM usuarios`);
  }
}
