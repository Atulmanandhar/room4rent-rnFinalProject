import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAS8iVfH37RxiopLBAAie49LM0WJ1TUQic",
  authDomain: "finalprojectadvancedrn.firebaseapp.com",
  projectId: "finalprojectadvancedrn",
  storageBucket: "finalprojectadvancedrn.appspot.com",
  messagingSenderId: "581621820290",
  appId: "1:581621820290:web:0e3a8d6d5ff7ac74033d9b",
};

const app = () => initializeApp(firebaseConfig);
const db = getFirestore(app());

if (getApps().length < 1) {
  app();
}

initializeAuth(app(), {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const FOOD_COLLECTION_TITLE = "FoodData";
const USER_COLLECTION_TITLE = "UserCollection";
const ROOM_COLLECTION_TITLE = "RoomCollection";
const SAVED_ROOM_COLLECTION_TITLE = "SavedRoomCollections";

export {
  db,
  FOOD_COLLECTION_TITLE,
  app,
  USER_COLLECTION_TITLE,
  ROOM_COLLECTION_TITLE,
  SAVED_ROOM_COLLECTION_TITLE,
};
