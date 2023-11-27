import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Administratorius from "./Pages/Administratorius.js";
import Apmokejimas from "./Pages/Apmokejimas.js";
import Home from "./Pages/Home.js";
import Krepselis from "./Pages/Krepselis.js";
import KurtiPatiekala from "./Pages/KurtiPatiekala.js";
import KurtiRestorana from "./Pages/KurtiRestorana.js";
import Naudotojas from "./Pages/Naudotojas.js";
import Prisijungimas from "./Pages/Prisijungimas.js";
import RedaguotiPatiekala from "./Pages/RedaguotiPatiekala.js";
import RedaguotiRestorana from "./Pages/RedaguotiRestorana.js";
import Registracija from "./Pages/Registracija.js";
import Restoranai from "./Pages/Restoranai.js";
import UzsakymuIstorija from "./Pages/UzsakymuIstorija.js";
import Theme from "./theme.js"
import { ThemeProvider } from '@mui/material/styles';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={Theme}>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Prisijungimas />} />
          <Route path="/administratorius" element={<Administratorius />} />
          <Route path="/apmokejimas" element={<Apmokejimas />} />
          <Route path="/home" element={<Home />} />
          <Route path="/krepselis" element={<Krepselis />} />
          <Route path="/kurtiPatiekala" element={<KurtiPatiekala />} />
          <Route path="/kurtiRestorana" element={<KurtiRestorana />} />
          <Route path="/naudotojas" element={<Naudotojas />} />
          <Route path="/prisijungimas" element={<Prisijungimas />} />
          <Route path="/redaguotiPatiekala" element={<RedaguotiPatiekala />} />
          <Route path="/redaguotiRestorana" element={<RedaguotiRestorana />} />
          <Route path="/registracija" element={<Registracija />} />
          <Route path="/restoranai" element={<Restoranai />} />
          <Route path="/uzsakymuIstorija" element={<UzsakymuIstorija />} />
        </Routes>
      </BrowserRouter>

    </React.StrictMode>
  </ThemeProvider>
);

reportWebVitals();
