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
          UsuarioID INTEGER PRIMARY KEY AUTOINCREMENT,
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
          FechaEvento TEXT NOT NULL,
          Ubicacion TEXT,
          AdministradorID INTEGER,
          FechaCreacion TEXT DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (AdministradorID) REFERENCES Usuarios(UsuarioID)
        );
        
        CREATE TABLE IF NOT EXISTS itinerarios (
          ItinerarioID INTEGER PRIMARY KEY AUTOINCREMENT,
          EventoID INTEGER,
          Titulo TEXT NOT NULL,
          Descripcion TEXT,
          HoraInicio TEXT NOT NULL,
          HoraFin TEXT NOT NULL,
          FOREIGN KEY (EventoID) REFERENCES Eventos(EventoID) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS invitados (
          InvitadoID INTEGER PRIMARY KEY AUTOINCREMENT,
          EventoID INTEGER,
          Nombre TEXT NOT NULL,
          Correo TEXT NOT NULL,
          ConfirmacionAsistencia TEXT,
          Comentarios TEXT,
          FOREIGN KEY (EventoID) REFERENCES Eventos(EventoID) ON DELETE CASCADE
        );


        CREATE TABLE IF NOT EXISTS historialEventos (
          HistorialID INTEGER PRIMARY KEY AUTOINCREMENT,
          EventoID INTEGER,
          Descripcion TEXT NOT NULL,
          Fecha TEXT DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (EventoID) REFERENCES Eventos(EventoID) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS comentarios (
          ComentarioID INTEGER PRIMARY KEY AUTOINCREMENT,
          EventoID INTEGER,
          UsuarioID INTEGER,
          Comentario TEXT NOT NULL,
          FechaComentario TEXT DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (EventoID) REFERENCES Eventos(EventoID) ON DELETE CASCADE,
          FOREIGN KEY (UsuarioID) REFERENCES Usuarios(UsuarioID)
        );

        CREATE TABLE IF NOT EXISTS recuerdos (
          RecuerdoID INTEGER PRIMARY KEY AUTOINCREMENT,
          EventoID INTEGER,
          UsuarioID INTEGER,
          Imagen TEXT NOT NULL,
          Comentario TEXT,
          FechaSubida TEXT DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (EventoID) REFERENCES Eventos(EventoID) ON DELETE CASCADE,
          FOREIGN KEY (UsuarioID) REFERENCES Usuarios(UsuarioID)
        );

        CREATE TABLE IF NOT EXISTS regalos (
          RegaloID INTEGER PRIMARY KEY AUTOINCREMENT,
          EventoID INTEGER,
          NombreRegalo TEXT NOT NULL,
          Descripcion TEXT,
          Precio REAL,
          EnlaceCompra TEXT,
          Estado TEXT DEFAULT 'disponible',
          FOREIGN KEY (EventoID) REFERENCES Eventos(EventoID) ON DELETE CASCADE
        );
        `
    );
  }
}
