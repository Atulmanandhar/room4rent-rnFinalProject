import { getApps } from "firebase/app";
import { app } from "./src/config/firebaseConfig";
import Routes from "./src/navigation/Routes";

if (getApps().length < 1) {
  app();
}

export default function App() {
  return <Routes />;
}
