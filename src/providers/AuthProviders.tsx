import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import {
  collection,
  getDocs,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../database/firebase";
import { RootStackParamList } from "../types/navigation.types";

// Definimos los tipos para nuestro contexto
interface AuthContextType {
  user: User | null;
  userRole: string | null;
  isLoading: boolean;
  error: string | null;
}

// Creamos el contexto de autenticación
const AuthContext = createContext<AuthContextType>({
  user: null,
  userRole: null,
  isLoading: true,
  error: null,
});

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth debe ser usado dentro de un AuthenticationProvider"
    );
  }
  return context;
};

export const AuthenticationProvider = ({ children }: PropsWithChildren) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const auth = getAuth();

  // Estados centralizados para el manejo de la autenticación
  const [state, setState] = useState<AuthContextType>({
    user: null,
    userRole: null,
    isLoading: true,
    error: null,
  });

  // Efecto para manejar la autenticación y roles
  useEffect(() => {
    let unsubscribeAuth: () => void;
    let unsubscribeRole: () => void;

    const setupAuthListeners = async () => {
      // Listener para cambios en la autenticación
      unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
        if (!user) {
          // Si no hay usuario, actualizamos el estado y redirigimos
          setState((prev) => ({
            ...prev,
            user: null,
            userRole: null,
            isLoading: false,
          }));

          navigation.reset({
            index: 0,
            routes: [{ name: "Auth" }],
          });
          return;
        }

        try {
          // Configuramos el listener para los roles del usuario
          const userRef = collection(db, "users");
          const userQuery = query(userRef, where("userId", "==", user.uid));

          unsubscribeRole = onSnapshot(
            userQuery,
            (snapshot) => {
              if (snapshot.empty) {
                setState((prev) => ({
                  ...prev,
                  error: "No se encontró información del usuario",
                  isLoading: false,
                }));
                return;
              }

              const userData = snapshot.docs[0].data();
              const userRole = userData.rol;

              // Actualizamos el estado con la información del usuario
              setState((prev) => ({
                ...prev,
                user,
                userRole,
                isLoading: false,
                error: null,
              }));

              // Navegamos según el rol
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: userRole === "admin" ? "Main" : "MainInvitado",
                  },
                ],
              });
            },
            (error) => {
              console.error("Error al obtener rol del usuario:", error);
              setState((prev) => ({
                ...prev,
                error: "Error al obtener información del usuario",
                isLoading: false,
              }));
            }
          );
        } catch (error) {
          console.error("Error en setup de autenticación:", error);
          setState((prev) => ({
            ...prev,
            error: "Error al configurar la autenticación",
            isLoading: false,
          }));
        }
      });
    };

    setupAuthListeners();

    // Limpieza de listeners al desmontar
    return () => {
      if (unsubscribeAuth) unsubscribeAuth();
      if (unsubscribeRole) unsubscribeRole();
    };
  }, [navigation]);

  // Provider que expone el estado de autenticación a la aplicación
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

// Hook para proteger rutas que requieren autenticación
export const useRequireAuth = (requiredRole?: string) => {
  const { user, userRole, isLoading } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    if (!isLoading && !user) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Auth" }],
      });
    }

    if (!isLoading && requiredRole && userRole !== requiredRole) {
      navigation.goBack();
    }
  }, [user, userRole, isLoading, requiredRole, navigation]);

  return { user, userRole, isLoading };
};
