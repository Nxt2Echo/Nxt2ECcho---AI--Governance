import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Apply dark theme globally
document.documentElement.classList.add("dark");

ReactDOM.createRoot(document.getElementById("root")).render(
  <App />
);