import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCRovdeAfGLr2apWcO1KzJkcYU7Y4fU1Qo",
  authDomain: "artevisionsistem.firebaseapp.com",
  projectId: "artevisionsistem",
  storageBucket: "artevisionsistem.firebasestorage.app",
  messagingSenderId: "662532860849",
  appId: "1:662532860849:web:b677906105d531e2b76b90",
  measurementId: "G-J2CQN0QESE"
};

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)

// Analytics removido para evitar problemas em produção estática
