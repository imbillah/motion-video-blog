import { create } from "zustand";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";
import initilizeFirebase from "../firebase/Config";

const videoStore = create((set, get) => ({
  videos: [],

  async fetchVideos() {
    const db = getFirestore(initilizeFirebase());
    const videosQuery = query(collection(db, "videos"), orderBy("id", "desc"));
    const videosSnapshot = await getDocs(videosQuery);
    const videosData = videosSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    set({ videos: videosData });
  },
}));
export default videoStore;
