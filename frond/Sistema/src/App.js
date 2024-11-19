import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Inicio from "./componentes/inicio";
import Registro from "./paginas/registro";
import Recuperar from "./paginas/recuperarcontra";
import Codigocontra from "./paginas/codigoContra";
import Nuevacontra from "./paginas/nuevacontra";
import Menu from "./componentes/menu";
import Registroapre from "./paginas/registroAprendiz";
import Registrofuncionari from "./paginas/registroFuncionari";
import Registrovisi from "./paginas/registroVisitante";
import Registroelemen from "./paginas/registroelemento";
import Parqueaderocarros from "./paginas/parqueaderoC";
import Parqueaderomotos from "./paginas/parqueaderoM";
import Parqueaderobicis from "./paginas/parqueaderoB";
import Manual from "./paginas/manual";
import Perfil from "./paginas/perfil";
import Bienvenida from "./paginas/bienvenida";
import Cambiarcontra from "./paginas/cambiarcontra";
import ReporteAprendiz from "./paginas/reporteAprendiz";
import ReporteFuncionario from "./paginas/reporteFuncionario";
import ReporteVisitante from "./paginas/reporteVisitante";
import Eventos from "./paginas/eventos";

function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path="/" exact element={<Inicio />} />
          <Route path="/registro" exact element={<Registro />} />
          <Route path="/recuperarcontraseña" exact element={<Recuperar />} />
          <Route path="/codigocontraseña" exact element={<Codigocontra />} />
          <Route path="/nuevacontraseña" exact element={<Nuevacontra />} />
          <Route path="/Menu" exact element={<Menu />} />
          <Route path="/RegistroAprendiz" exact element={<Registroapre />} />
          <Route  path ="/eventos"exact element ={<Eventos/>}/>
          <Route
            path="/RegistroFuncionario"
            exact
            element={<Registrofuncionari />}
          />
          <Route path="/RegistroVisitante" exact element={<Registrovisi />} />
          <Route path="/RegistroElemento" exact element={<Registroelemen />} />
          <Route
            path="/ParqueaderoCarros"
            exact
            element={<Parqueaderocarros />}
          />
          <Route
            path="/ParqueaderoMotos"
            exact
            element={<Parqueaderomotos />}
          />
          <Route
            path="/ParqueaderoBicis"
            exact
            element={<Parqueaderobicis />}
          />
          <Route path="/ReporteAprendiz" exact element={<ReporteAprendiz />} />
          <Route
            path="/ReporteFuncionario"
            exact
            element={<ReporteFuncionario />}
          />
          <Route
            path="/ReporteVisitante"
            exact
            element={<ReporteVisitante />}
          />
          <Route path="/Manual" exact element={<Manual />} />
          <Route path="/Miperfil" exact element={<Perfil />} />
          <Route path="/cambiarcontra" exact element={<Cambiarcontra />} />
          <Route path="/Bienvenida" exact element={<Bienvenida />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
