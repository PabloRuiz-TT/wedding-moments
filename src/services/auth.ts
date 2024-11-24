import * as SQLite from "expo-sqlite";
import { DATABASE_NAME } from "../database/database";

export type RegisterDTO = {
  nombre: string;
  telefono: string;
  correo: string;
  password: string;
};

class AuthService {
  private db: SQLite.SQLiteDatabase;

  constructor() {
    this.db = SQLite.openDatabaseSync(DATABASE_NAME);
  }

  async login(email: string, password: string): Promise<boolean> {
    const user = await this.db.getFirstAsync<any>(
      "SELECT * FROM usuarios WHERE Correo = ? AND Password = ?",
      [email, password]
    );

    return !!user;
  }

  async register(dto: RegisterDTO): Promise<number | null> {
    try {
      const result = await this.db.runAsync(
        "INSERT INTO usuarios (Nombre, Correo, Password, Rol, Telefono) VALUES (?, ?, ?, ?, ?)",
        [dto.nombre, dto.correo, dto.password, "admin", dto.telefono]
      );

      return result.lastInsertRowId;
    } catch (e) {
      return null;
    }
  }
}

export const authService = new AuthService();
