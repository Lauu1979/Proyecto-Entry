import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "./paginas/inicio";
import Registro from "./paginas/p-registro";
import EstacionamientoC from "./paginas/estacionamientoC";
import EstacionamientoM from "./paginas/estacionamientoM";
import EstacionamientoB from "./paginas/estacionamietoB";
import Ambiente from "./paginas/ambiente";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/Registro" element={<Registro />} />
          <Route path="/EstacionamientoC" element={<EstacionamientoC />} />
          <Route path="/EstacionamientoM" element={<EstacionamientoM />} />
          <Route path="/EstacionamientoB" element={<EstacionamientoB />} />
          <Route path="/Ambiente" element={<Ambiente />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
