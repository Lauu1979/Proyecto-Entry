import React from "react"
import Menu from "../componentes/menu";
import { PDFDownloadLink } from "@react-pdf/renderer";
import "../utiles/css/eventos.css"

const Eventos = () => {
  return (
 
        <div>
          <img
            src="https://img.freepik.com/vector-gratis/ilustracion-concepto-oficiales-policia_114360-13667.jpg?w=740&t=st=1725401810~exp=1725402410~hmac=3a4de5a89da4c6ee5427c1d3e07e862ad113372dcfd157711f067f308b2da559"
            className="logooo"
          />
          <div className="containner-manual">
            <Menu />
            <div className="form-bxc login">
              <h1>MANUAL DE USUARIO</h1>
              <br />
              <br />
              <p>
                Este video te ayudara a controlar a la perfeccion este sistema de
                informacion, no dudes en verlo si tienes alguna duda!
                <br />
                <a href="www.youtube.com">www.youtube.com</a>
              </p>
              <br />
            </div>
          </div>
          <br />
        </div>
      );
    };

export default Eventos ;