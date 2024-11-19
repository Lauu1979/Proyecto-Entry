import React from "react";
import Menu from "../componentes/menu";
import "../utiles/css/manual.css";

const Manual = () => {
  return (
    <div className="main-container"> {/* Se puede usar para centrar el contenido */}
      <img
        src="https://img.freepik.com/vector-gratis/ilustracion-concepto-oficiales-policia_114360-13667.jpg?w=740&t=st=1725401810~exp=1725402410~hmac=3a4de5a89da4c6ee5427c1d3e07e862ad113372dcfd157711f067f308b2da559"
        className="logooo"
        alt="Logo"
      />
      <div className="containner-manual">
        <Menu />
        <div className="form-bxc login">
          <h1>MANUAL DE USUARIO</h1>
          <br />
          <p>
            Este video te ayudara a controlar a la perfeccion este sistema de
            informacion, no dudes en verlo si tienes alguna duda!
            <br />
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">www.youtube.com</a>
          </p>
          <br />
        </div>
      </div>
      <br />
    </div>
  );
};

export default Manual;
