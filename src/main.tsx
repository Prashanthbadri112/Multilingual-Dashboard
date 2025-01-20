import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { StyledEngineProvider } from "@mui/material/styles";
import "./index.css";
import App from "./App.tsx";

import i18n from './LanguageData/i18n.ts'
import { I18nextProvider } from "react-i18next";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
            <I18nextProvider i18n={i18n}>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider></I18nextProvider>
  </StrictMode>
);
