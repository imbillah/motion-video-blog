import { create } from "zustand";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import initilizeFirebase from "../firebase/Config";
const db = getFirestore(initilizeFirebase());
const videoStore = create((set, get) => ({
  videos: [],
  async fetchVideos() {
    const videosQuery = query(collection(db, "videos"), orderBy("id", "desc"));
    const videosSnapshot = await getDocs(videosQuery);
    const videosData = videosSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    set({ videos: videosData });
  },
  // deleting indivisual user video
  deleteVideo: async (videoId) => {
    try {
      const videoRef = doc(collection(db, "videos"), videoId);
      await deleteDoc(videoRef);
      set((state) => ({
        videos: state.videos.filter((video) => video.id !== videoId),
      }));
    } catch (error) {
      console.log("Error deleting video: ", error);
    }
  },
}));
export default videoStore;
