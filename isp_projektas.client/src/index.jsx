import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Administratorius from "./Pages/Administratorius.jsx";
import Apmokejimas from "./Pages/Apmokejimas.jsx";
import Home from "./Pages/Home.jsx";
import Krepselis from "./Pages/Krepselis.jsx";
import KurtiPatiekala from "./Pages/KurtiPatiekala.jsx";
import KurtiRestorana from "./Pages/KurtiRestorana.jsx";
import Naudotojas from "./Pages/Naudotojas.jsx";
import Prisijungimas from "./Pages/Prisijungimas.jsx";
import RedaguotiPatiekala from "./Pages/RedaguotiPatiekala.jsx";
import RedaguotiRestorana from "./Pages/RedaguotiRestorana.jsx";
import Registracija from "./Pages/Registracija.jsx";
import Restoranai from "./Pages/Restoranai.jsx";
import UzsakymuIstorija from "./Pages/UzsakymuIstorija.jsx";
import Theme from "./theme.jsx"
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
          <Route path="/kurtiPatiekala/:restoranasId" element={<KurtiPatiekala />} />
          <Route path="/kurtiRestorana" element={<KurtiRestorana />} />
          <Route path="/naudotojas" element={<Naudotojas />} />
          <Route path="/prisijungimas" element={<Prisijungimas />} />
          <Route path="/redaguotiPatiekala/:id" element={<RedaguotiPatiekala />} />
          <Route path="/redaguotiRestorana/:restoranasId" element={<RedaguotiRestorana />} />
          <Route path="/registracija" element={<Registracija />} />
          <Route path="/restoranas/:restoranasId" element={<Restoranai />} />
          <Route path="/uzsakymuIstorija" element={<UzsakymuIstorija />} />
        </Routes>
      </BrowserRouter>

    </React.StrictMode>
  </ThemeProvider>
);

reportWebVitals();
