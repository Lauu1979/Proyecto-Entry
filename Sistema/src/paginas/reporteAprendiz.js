import React from "react";
import Menu from "../componentes/menu";
import "../utiles/css/reporteA.css";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReporteA from "./reporteA";

const ReporteAprendiz = () => {
  return (
    <div>
      <img
        src="https://img.freepik.com/vector-gratis/ilustracion-concepto-oficiales-policia_114360-13667.jpg?w=740&t=st=1725401810~exp=1725402410~hmac=3a4de5a89da4c6ee5427c1d3e07e862ad113372dcfd157711f067f308b2da559"
        className="logo3"
        alt="Logo"
      />
      <div className="Conntainer-REPORTE">
        <Menu />
        <div className="login-containeer">
          <div className="form-bbox login">
            <h1>REPORTE APRENDICES</h1>
            <i className="bx bxs-archive-out" />
            <form action="#" method="post">
              <br />
              <div className="input-box">
                <label htmlFor="año">Año:</label>
                <select id="año" name="año">
                  <option value="2024">2024</option>
                  <option value="2013">2013</option>
                  <option value="2009">2009</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              <br />
              <div className="input-box">
                <label htmlFor="mes">Mes:</label>
                <select id="mes" name="mes">
                  <option value="JULIO">JULIO</option>
                  <option value="DICIEMBRE">DICIEMBRE</option>
                  <option value="ENERO">ENERO</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
              <br />
              <div className="input-box">
                <label htmlFor="dia">Día:</label>
                <select id="dia" name="dia">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              <br />
              <div className="input-box">
                <label htmlFor="semana">Semana:</label>
                <select id="semana" name="semana">
                  <option value="1">Semana 1</option>
                  <option value="2">Semana 2</option>
                  <option value="3">Semana 3</option>
                  <option value="4">Semana 4</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              <br />
              <label htmlFor="tipoElemento">Tipo de Elemento:</label>
              <select id="tipoElemento" name="tipoElemento">
                <option value="Computador">Computador</option>
                <option value="Raquetas">Raquetas</option>
                <option value="Tablet">Tablet</option>
                <option value="otro">Otro</option>
              </select>
              <br />
              <br />
            </form>
            <PDFDownloadLink
              document={<ReporteA />}
              fileName="Reporte_Aprendiz.pdf"
            >
              {({ loading }) =>
                loading ? (
                  <button>Cargando...</button>
                ) : (
                  <button className="booton-reporte">Generar</button>
                )
              }
            </PDFDownloadLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReporteAprendiz;
