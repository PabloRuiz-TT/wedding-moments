import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Itinerario, ItinerarioService } from "../services/ItinerarioService";
import { getAuth, onAuthStateChanged } from "firebase/auth";

type ItinerarioProviderContextType = {
  obtenerItinerariosPorUsuario: () => Promise<void>;
  itinerarios: Itinerario[];
  isLoading: boolean;
  error: string | null;
};

const ItinerarioContext = createContext<
  ItinerarioProviderContextType | undefined
>(undefined);

const itinerarioService = ItinerarioService.getInstance();

type HomeProviderProps = {
  children: ReactNode;
};

export const ItinerarioProvider = ({ children }: HomeProviderProps) => {
  const [userId, setUserId] = useState<string>("");
  const [itinerarios, setItinerarios] = useState<Itinerario[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      }
    });

    return unsubscribe;
  }, []);

  const obtenerItinerariosPorUsuario = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const itinerario = await itinerarioService.obtenerItinerariosPorUsuario(
        userId
      );
      setItinerarios(itinerario);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al obtener los itinerarios"
      );
      setItinerarios([]);
    } finally {
      setIsLoading(false);
    }
  }, [itinerarioService, userId]);

  const contextValue = useMemo(
    () => ({
      obtenerItinerariosPorUsuario,
      itinerarios,
      isLoading,
      error,
    }),
    [obtenerItinerariosPorUsuario, itinerarios, isLoading, error]
  );

  return (
    <ItinerarioContext.Provider value={contextValue}>
      {children}
    </ItinerarioContext.Provider>
  );
};

export const useItinerario = () => {
  const context = useContext(ItinerarioContext);

  if (!context) {
    throw new Error("useItinerario must be used within a ItinerarioProvider");
  }

  return context;
};
