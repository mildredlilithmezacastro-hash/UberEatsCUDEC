const firebaseConfig = {
  apiKey: "AIzaSyDviwbyRQZS4qdQQy1c3Wrh1hoPOAsYB60",
  authDomain: "ubereatsmildred-df369.firebaseapp.com",
  projectId: "ubereatsmildred-df369",
  storageBucket: "ubereatsmildred-df369.firebasestorage.app",
  messagingSenderId: "62470196385",
  appId: "1:62470196385:web:282c8b8bea5295c59c34e0"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Inicializar Firestore
const db = firebase.firestore();