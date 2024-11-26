import * as SQLite from "expo-sqlite";
import { DATABASE_NAME } from "../database/database";

export class PersonaService {
  private db!: SQLite.SQLiteDatabase;

  private constructor() {
    this.db = SQLite.openDatabaseSync(DATABASE_NAME);
  }

  public static getInstance() {
    return new PersonaService();
  }

  public async createPersona(
    nombre: string,
    correo: string,
    password: string,
    telefono: string,
    rol: string
  ) {
    const result = await this.db.runAsync(
      `INSERT INTO usuarios (Nombre, Correo, Password, Telefono, Rol) VALUES (?, ?, ?, ?, ?)`,
      [nombre, correo, password, telefono, rol]
    );

    return result.lastInsertRowId;
  }

  public async getPersonaByEmail(correo: string) {
    return await this.db.getFirstAsync(
      `SELECT * FROM usuarios WHERE Correo = ?`,
      [correo]
    );
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
