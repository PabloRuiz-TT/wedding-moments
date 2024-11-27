import * as SQLite from "expo-sqlite";

export const DATABASE_NAME = "weddings.db";

export async function migrateDbIfNeeded(db: SQLite.SQLiteDatabase) {
  const DATABASE_VERSION = 1;

  let { user_version: currentDbVersion } = await db.getFirstAsync<any>(
    "PRAGMA user_version"
  );

  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }

  if (currentDbVersion === 0) {
    await db.execAsync(
      `
      PRAGMA journal_mode = 'wal';
      
      CREATE TABLE IF NOT EXISTS usuarios (
          UsuarioID TEXT PRIMARY KEY,
          Nombre TEXT NOT NULL,
          Correo TEXT UNIQUE NOT NULL,
          Password TEXT NOT NULL,
          TELEFONO TEXT NOT NULL,
          Rol TEXT NOT NULL,
          FechaRegistro TEXT DEFAULT CURRENT_TIMESTAMP
        );
        
        CREATE TABLE IF NOT EXISTS eventos (
          EventoID INTEGER PRIMARY KEY AUTOINCREMENT,
          Titulo TEXT NOT NULL,
          Descripcion TEXT,
          Novio TEXT NOT NULL,
          Novia TEXT NOT NULL,
          FechaEvento TEXT NOT NULL,
          Ubicacion TEXT,
          AdministradorID INTEGER,
          FechaCreacion TEXT DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (AdministradorID) REFERENCES Usuarios(UsuarioID)
        );
        `
    );
  }
}
