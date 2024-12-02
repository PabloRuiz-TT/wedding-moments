import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Boda, BodaService } from "../services/BodaService";
import { getAuth, onAuthStateChanged } from "firebase/auth";

type HomeProviderContextType = {
  obtenerBodaPorUsuario: () => Promise<void>;
  bodaData: Boda | null;
  isLoading: boolean;
  error: string | null;
};

const HomeContext = createContext<HomeProviderContextType | undefined>(
  undefined
);

const bodaService = BodaService.getInstance();

type HomeProviderProps = {
  children: ReactNode;
};

export const HomeProvider = ({ children }: HomeProviderProps) => {
  const [userId, setUserId] = useState<string>("");
  const [bodaData, setBodaData] = useState<Boda | null>(null);
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

  const obtenerBodaPorUsuario = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const boda = await bodaService.obtenerBodaPorUsuario(userId);
      setBodaData(boda);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al obtener la boda");
      setBodaData(null);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  const contextValue = useMemo(
    () => ({
      obtenerBodaPorUsuario,
      bodaData,
      isLoading,
      error,
    }),
    [obtenerBodaPorUsuario, bodaData, isLoading, error]
  );

  return (
    <HomeContext.Provider value={contextValue}>{children}</HomeContext.Provider>
  );
};

export const useHome = () => {
  const context = useContext(HomeContext);

  if (!context) {
    throw new Error("useHome must be used within a HomeProvider");
  }

  return context;
};
