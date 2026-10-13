import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from "./ComponentTemplates/Act/ScrollToTop";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      {<ScrollToTop />}
      <App />
    </BrowserRouter>
  </StrictMode>,
);
