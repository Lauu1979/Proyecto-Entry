import React, { useEffect, useState } from "react";
import axios from "axios";
import "../utiles/css/registroEventos.css";
import Menu from "../componentes/menu";
import { IoMdSearch } from "react-icons/io";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const RegistroFuncionario = () => {
  const urlGet = "http://localhost:8000/funcionario"; // URL del endpoint para obtener aprendices
  const [personaFuncionario, setPersonaFuncionario] = useState([]);
  const [tablaFuncionario, setTablaFuncionario] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10; // Ajusta según tus necesidades
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = personaFuncionario.slice(firstIndex, lastIndex);
  const npage = Math.ceil(personaFuncionario.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const peticionGet = async () => {
    try {
      const response = await axios.get(urlGet);
      if (Array.isArray(response.data)) {
        setPersonaFuncionario(response.data);
        setTablaFuncionario(response.data);
      } else {
        console.error(
          "La respuesta de la API no es un arreglo:",
          response.data
        );
      }
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
    const resultadoBusqueda = tablaFuncionario.filter((elemento) => {
      return (
        elemento.NumeroDocumento.toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.TipoElemento.toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      );
    });
    setPersonaFuncionario(resultadoBusqueda);
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
        <div className="title">REGISTROS DE FUNCIONARIOS</div>
      </center>

      <table className="aprendiz-table">
        <thead>
          <tr>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Número de Documento</th>
            <th>Area</th>
            <th>Tipo Elemento</th>
            <th>Cantidad</th>
            <th>Serial</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(records) && records.length > 0 ? (
            records.map((funcionario, index) => (
              <tr key={index}>
                <td>{funcionario.Nombres}</td>
                <td>{funcionario.Apellidos}</td>
                <td>{funcionario.NumeroDocumento}</td>
                <td>{funcionario.Area}</td>
                <td>{funcionario.TipoElemento}</td>
                <td>{funcionario.CantidadElemento}</td>
                <td>{funcionario.SerialElemento}</td>
                <td>{funcionario.Estado}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No hay registros disponibles</td>
            </tr>
          )}
        </tbody>
      </table>

      <nav>
        <ul className="pagination">
          <li className="page-item">
            <button className="page-link" onClick={prePage}>
              <HiChevronLeft />
            </button>
          </li>
          {numbers.map((n, i) => (
            <li
              key={i}
              className={`page-item ${currentPage === n ? "active" : ""}`}
            >
              <button className="page-link" onClick={() => changeCPage(n)}>
                {n}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button className="page-link" onClick={nextPage}>
              <HiChevronRight />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default RegistroFuncionario;
