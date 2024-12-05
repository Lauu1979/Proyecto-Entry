import React, { useEffect, useState } from "react";
import axios from "axios";
import "../utiles/css/registroEventos.css";
import Menu from "../componentes/menu";
import { IoMdSearch } from "react-icons/io";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const RegistroEvento = () => {
  const urlGet = "http://localhost:8000/eventos"; // URL del endpoint para obtener eventos
  const [Eventos, setEventos] = useState([]);
  const [tablaEventos, setTablaEventos] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10; // Ajusta según tus necesidades
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = Eventos.slice(firstIndex, lastIndex);
  const npage = Math.ceil(Eventos.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const peticionGet = async () => {
    try {
      const response = await axios.get(urlGet);
      setEventos(response.data);
      setTablaEventos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const valor = e.target.value;
    setBusqueda(valor);
    filtrar(valor);
  };

  const filtrar = (terminoBusqueda) => {
    const resultadoBusqueda = tablaEventos.filter((elemento) => {
      return (
        elemento.NumeroDocumento.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
        elemento.TipoElemento.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      );
    });
    setEventos(resultadoBusqueda);
    setCurrentPage(1); // Reiniciar a la primera página después de filtrar
  };

  useEffect(() => {
    peticionGet();
  }, []);

  const prePage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage < npage) setCurrentPage(currentPage + 1);
  };

  const changeCPage = (id) => setCurrentPage(id);

  return (
    <div className="Container">
      <Menu />
      <center>
        <div className="containerInput">
          <input
            value={busqueda}
            className="inputBuscar"
            placeholder="Búsqueda por No.Documento o elemento"
            onChange={handleChange}
            style={{
              width: "30%",
              padding: "10px",
              position: "absolute",
              right: "7%",
              borderRadius: "5px",
              marginBottom: "24px",
            }}
          />
          <button className="boton_busqueda">
            <IoMdSearch />
          </button>
        </div>
        <div className="title">REGISTROS DE EVENTOS</div>
      </center>

      <table className="eventos-table">
        <thead>
          <tr>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Número de Documento</th>
            <th>Tipo de Elemento</th>
            <th>Lugar</th>
            <th>Fecha de Ingreso</th>
            <th>Fecha Límite</th>
            <th>Tipo de Vehículo</th>
            <th>Observación</th>
          </tr>
        </thead>
        <tbody>
          {records.map((evento, index) => (
            <tr key={index}>
              <td>{evento.Nombres}</td>
              <td>{evento.Apellidos}</td>
              <td>{evento.NumeroDocumento}</td>
              <td>{evento.TipoElemento}</td>
              <td>{evento.Lugar}</td>
              <td>{evento.fechaIngreso}</td>
              <td>{evento.fechaLimite}</td>
              <td>{evento.TipoVehiculo}</td>
              <td>{evento.observacion}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav>
        <ul className="pagination">
          <li className="page-item">
            <a href="#" className="page-link" onClick={prePage}>
              <HiChevronLeft />
            </a>
          </li>
          {numbers.map((n, i) => (
            <li key={i} className={`page-item ${currentPage === n ? "active" : ""}`}>
              <a href="#" className="page-link" onClick={() => changeCPage(n)}>
                {n}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a href="#" className="page-link" onClick={nextPage}>
              <HiChevronRight />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default RegistroEvento;

