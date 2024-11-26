import { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebase } from "../../database/firebase";

const AuthContext = createContext({});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const saveSession = async (user: any) => {
    try {
      if (user) {
        const sessionData = {
          uid: user.uid,
          email: user.email,
        };

        await AsyncStorage.setItem("session", JSON.stringify(sessionData));
      } else {
        await AsyncStorage.removeItem("session");
      }
    } catch (error) {
      console.error("Error persisting session:", error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      const response = await signInWithEmailAndPassword(
        firebase,
        email,
        password
      );
      return response;
    } catch (e: any) {
      setError(e.message);
      throw e;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setError(null);
      const response = await createUserWithEmailAndPassword(
        firebase,
        email,
        password
      );
      return response;
    } catch (e: any) {
      setError(e.message);
      throw e;
    }
  };

  const validateSession = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("session");
      if (!storedUser) return false;

      const currentUser = getAuth().currentUser;
      if (!currentUser) {
        await AsyncStorage.removeItem("session");
        return false;
      }

      return true;
    } catch (e) {
      console.error("Error validating session:", e);
      return false;
    }
  };

  useEffect(() => {
    const loadStoredSession = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("session");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        setLoading(false);
      } catch (e) {
        console.error("Error loading stored session:", e);
        setLoading(false);
      }
    };

    loadStoredSession();
  }, []);

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged((user: any) => {
      setUser(user);
      setLoading(false);
      saveSession(user);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        signIn,
        signUp,
        validateSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
