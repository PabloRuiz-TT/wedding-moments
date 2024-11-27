import { createContext, useContext, useEffect, useState } from "react";
import { Evento, EventoService } from "../../services/evento";
import { PersonaService } from "../../services/persona";
import { useAuth } from "../auth/AuthContext";

const HomeContext = createContext({});

const eventoService = EventoService.getInstance();
const personaService = PersonaService.getInstance();

export const HomeProvider = ({ children }: any) => {
  const [evento, setEvento] = useState<Evento | undefined>(undefined);
  const [, setPersona] = useState<any | undefined>(undefined);
  const { user }: any = useAuth();

  useEffect(() => {
    (async () => {
      const persona = await personaService.getPersonaByEmail(user.email);

      if (persona) {
        setPersona(persona);
      }
    })();
  }, []);

  const crearBoda = async (evento: Evento) => {
    try {
      await eventoService.crearEvento(evento);

      return true;
    } catch (error: any) {
      throw error;
    }
  };

  const obtenerBoda = async (eventoID: number) => {
    const evento = await eventoService.obtenerEvento(eventoID);
    return evento;
  };

  const obtenerBodaByAdministrador = async (usuarioID: number) => {
    return await eventoService.obtenerEventoByAdministrador(usuarioID);
  };

  return (
    <HomeContext.Provider
      value={{
        obtenerBoda,
        obtenerBodaByAdministrador,
        crearBoda,
        evento,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export const useHome = () => {
  const context: any = useContext(HomeContext);

  if (context === undefined) {
    throw new Error("useHome must be used within a HomeProvider");
  }

  return {
    ...context,
    hasEvento: context.evento !== undefined,
  };
};
