import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { installApiFallback } from "./lib/api-fallback";

installApiFallback();

createRoot(document.getElementById("root")!).render(<App />);
