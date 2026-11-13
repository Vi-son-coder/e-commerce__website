import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./components/ComponentTemplates/Act/ScrollToTop";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {<ScrollToTop />}
    <App />
  </BrowserRouter>,
);
