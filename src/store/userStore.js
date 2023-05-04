import { create } from "zustand";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import initializeFirebase from "../firebase/Config";
const auth = getAuth(initializeFirebase());
const db = getFirestore(initializeFirebase());

const userStore = create((set) => ({
  user: null,
  loading: true,
  login: async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const userDocRef = doc(db, "users", result.user.uid);
    const userDocSnapshot = await getDoc(userDocRef);
    const userData = userDocSnapshot.data();
    set(() => ({
      user: {
        uid: result.user.uid,
        email: result.user.email,
        name: result.user.displayName,
        photoURL: result.user.photoURL,
        ...userData,
      },
      loading: false,
    }));
  },
  logout: async () => {
    await signOut(auth);
    set(() => ({
      user: null,
      loading: false,
    }));
  },
}));

onAuthStateChanged(auth, (user) => {
  if (user) {
    userStore.setState({
      user: {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
      },
      loading: false,
    });
  } else {
    userStore.setState({
      user: null,
      loading: false,
    });
  }
});

export default userStore;
