import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};

// Inicializando o Firebase na aplicação
const app = initializeApp(firebaseConfig);
// Obtendo a instância de autenticação do Firebase
const auth = getAuth(app);
// Obtendo a instância de autenticação através do Google
const provider = new GoogleAuthProvider();
// Obtendo a instância do banco de dados do Firebase
const db = getFirestore(app);

export {auth, provider, db};
