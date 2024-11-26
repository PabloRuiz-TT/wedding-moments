// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth, browserLocalPersistence } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDBoQqQkInbqwnU-J6z9Bgeu_qY1P9lQY",
  authDomain: "wedding-moments-ab947.firebaseapp.com",
  projectId: "wedding-moments-ab947",
  storageBucket: "wedding-moments-ab947.firebasestorage.app",
  messagingSenderId: "69910165054",
  appId: "1:69910165054:web:3a6f905bda398c82c2436f",
  measurementId: "G-Q2MXKXH22H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const firebase = initializeAuth(app, {
  persistence: browserLocalPersistence,
});

export const getFirebaseAuthError = (errorCode: string) => {
  switch (errorCode) {
    // Errores de registro
    case "auth/email-already-in-use":
      return "Este correo electrónico ya está registrado";
    case "auth/invalid-email":
      return "El formato del correo electrónico no es válido";
    case "auth/operation-not-allowed":
      return "Operación no permitida. Contacta al administrador";
    case "auth/weak-password":
      return "La contraseña debe tener al menos 6 caracteres";

    // Errores de inicio de sesión
    case "auth/user-disabled":
      return "Esta cuenta ha sido deshabilitada";
    case "auth/user-not-found":
      return "No existe una cuenta con este correo electrónico";
    case "auth/wrong-password":
      return "Contraseña incorrecta";
    case "auth/too-many-requests":
      return "Demasiados intentos fallidos. Intenta más tarde";

    // Errores de red
    case "auth/network-request-failed":
      return "Error de conexión. Verifica tu internet";

    // Errores de verificación de email
    case "auth/invalid-verification-code":
      return "El código de verificación no es válido";
    case "auth/invalid-verification-id":
      return "El ID de verificación no es válido";

    // Errores de reautenticación
    case "auth/requires-recent-login":
      return "Por seguridad, debes volver a iniciar sesión";

    // Error por defecto
    default:
      return "Ocurrió un error inesperado. Por favor, intenta de nuevo";
  }
};
