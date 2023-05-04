import {
  collection,
  orderBy,
  query,
  getFirestore,
  getDocs,
} from "firebase/firestore";

import initilizeFirebase from "../firebase/Config";

const db = getFirestore(initilizeFirebase());
export const getAllFeeds = async () => {
  const feedsQuery = query(collection(db, "videos"), orderBy("id", "desc"));
  const feedsSnapshot = await getDocs(feedsQuery);
  const feeds = feedsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return feeds;
};
