import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"

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
// Com a função setCustomParameters, podemos passar parâmetros que ditam o comportamento de nosso provider.
provider.setCustomParameters({
  /*
    O parâmetro prompt é usado para controlar o comportamento da tela de login ao autenticar um usuário. Temos valores como:
    
      select_account: O usuário é forçado a escolher a conta mesmo já estando logado com o Google.
      consent: É solicitado ao usuário permissões de acesso novamente, mesmo ele já tendo autorizado antes.	
  */ 
  prompt: 'select_account',
});
// Obtendo a instância do banco de dados do Firebase
const db = getFirestore(app);
// Obtendo a instância do Firebase Storage
const storage = getStorage(app);

export {auth, provider, db, storage};
