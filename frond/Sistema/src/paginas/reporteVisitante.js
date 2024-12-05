import React from "react";
import Menu from "../componentes/menu.jsx";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ReporteV from "./reporteV.jsx";
import "../utiles/css/reporteV.css";

const ReporteVisitante = () => {
  return (
    <div>
      <img
        src="https://img.freepik.com/vector-gratis/ilustracion-concepto-oficiales-policia_114360-13667.jpg?w=740&t=st=1725401810~exp=1725402410~hmac=3a4de5a89da4c6ee5427c1d3e07e862ad113372dcfd157711f067f308b2da559"
        className="logo3"
      />
      <div className="Conntainer-REPORTE">
        <Menu />
        <div className="login-containeer">
          <div className="form-bbox login">
            <h1>REPORTE VISITANTES</h1>
            <i className="bx bxs-archive-out" />
            <form action="#" method="post">
              <br />
              <div className="form-row">
                <div className="form-group">
                  <div className="input-box">
                    <label htmlFor="año">Año:</label>
                    <select id="año" name="año">
                      <option value="2024">2024</option>
                      <option value="2013">2013</option>
                      <option value="2009">2009</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                </div>
                <br />
                <div className="form-group">
                  <div className="input-box">
                    <label htmlFor="mes">Mes:</label>
                    <select id="mes" name="mes">
                      <option value="ENERO">ENERO</option>
                      <option value="FEBRERO">FEBRERO</option>
                      <option value="MARZO">MARZO</option>
                      <option value="ABRIL">ABRIL</option>
                      <option value="MAYO">MAYO</option>
                      <option value="JUNIO">JUNIO</option>
                      <option value="JULIO">JULIO</option>
                      <option value="AGOSTO">AGOSTO</option>
                      <option value="SEPTIEMBRE">SEPTIEMBRE</option>
                      <option value="OCTUBRE">OCTUBRE</option>
                      <option value="NOMBIENMBRE">NOMBIENMBRE</option>
                      <option value="DICIEMBRE">DICIEMBRE</option>
                    </select>
                  </div>
                </div>
              </div>
              <br />

              <div className="form-row">
                <div className="form-group">
                  <div className="input-box">
                    <label htmlFor="dia">Día:</label>
                    <select id="dia" name="dia">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                </div>
                <br />
                <div className="form-group">
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
                </div>
              </div>
              <br />
              <div className="form-group">
                <label htmlFor="tipoElemento">Tipo de Elemento:</label>
                <select id="tipoElemento" name="tipoElemento">
                  <option value="Computador">Computador</option>
                  <option value="Raquetas">Raquetas</option>
                  <option value="Tablet">Tablet</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              <br />
              <br />
            </form>
            <PDFDownloadLink
              document={<ReporteV />}
              fileName="Reporte_Visitante.pdf"
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
          <div className="form-booox login">
            <i className="bx bxs-file-pdf" />
          </div>
          <div className="form-bocx login">
            <i className="bx bxs-file-gif" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReporteVisitante;
