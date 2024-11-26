import React, { useEffect, useState } from "react";
import axios from "axios";
import "../utiles/css/registroEventos.css";
import Menu from "../componentes/menu";
import { IoMdSearch } from "react-icons/io";
import {
  Modal,
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { GoPlusCircle } from "react-icons/go";
import swal from "sweetalert";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const RegistroEvento = () => {
  const url = "http://localhost:3001/Personas_funcionario";
  const [personasFuncionario, setPersonasFuncionario] = useState([]);
  const [tablaFuncionario, setTablaFuncionario] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [open, setOpen] = useState(false);
  const [nuevoRegistro, setNuevoRegistro] = useState({
    nombres: "",
    apellidos: "",
    numeroDocumento: "",
    tipoElemento: "",
    cantidad: "",
    color: "",
    estado: "Activo", // Valor inicial del estado
    observacion: "",
  });
  const [mensaje, setMensaje] = useState("");

  const estados = ["Activo", "Inactivo", "Cancelado", "Observación"]; // Lista de opciones de estado

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10; // Ajusta según tus necesidades
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = personasFuncionario.slice(firstIndex, lastIndex);
  const npage = Math.ceil(personasFuncionario.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const peticionGet = async () => {
    try {
      const response = await axios.get(url);
      setPersonasFuncionario(response.data);
      setTablaFuncionario(response.data);
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
        elemento.numeroDocumento
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.tipoElemento
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      );
    });
    setPersonasFuncionario(resultadoBusqueda);
    setCurrentPage(1); // Reiniciar a la primera página después de filtrar
  };

  useEffect(() => {
    peticionGet();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoRegistro((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEstadoChange = (e) => {
    const estado = e.target.value;
    setNuevoRegistro((prevState) => ({
      ...prevState,
      estado: estado,
      observacion: estado === "Observación" ? "" : prevState.observacion, // Limpiar observación si cambia
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      nombres,
      apellidos,
      numeroDocumento,
      email,
      tipoElemento,
      cantidad,
      color,
    } = nuevoRegistro;
    if (
      !nombres ||
      !apellidos ||
      !numeroDocumento ||
      !email ||
      !tipoElemento ||
      !cantidad ||
      !color
    ) {
      setMensaje("Valide que todos los campos estén llenos");
      return;
    }

    try {
      const response = await axios.post(url, nuevoRegistro);
      if (response.status === 201) {
        mostrarAlerta();
        handleClose();
        peticionGet();
      } else {
        console.error(response.data);
        alert("Error de registro");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión al servidor");
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const mostrarAlerta = () => {
    swal({
      title: "Registro exitoso",
      icon: "success",
    });
  };

  const prePage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const nextPage = () => {
    if (currentPage < npage) setCurrentPage(currentPage + 1);
  };

  const changeCPage = (id) => setCurrentPage(id);

  // Estilos del modal
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    width: "895px",
    margin: "7px",
    textAlign: "center",
    padding: "15px 32px",
  };

  return (
    <div className="Container">
      {" "}
      {/* Corregido de "Coontainerr" a "Container" */}
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

        <div className="title">REGISTROS EVENTOS</div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
          style={{
            backgroundColor: "green",
            position: "absolute",
            top: "9%",
            left: "3%",
          }}
        >
          <GoPlusCircle
            style={{ fontSize: "30px", position: "relative", right: "8%" }}
          />
          Agregar
        </Button>
      </center>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2" mb={2}>
            Agregar nuevo funcionario
          </Typography>
          <form onSubmit={handleSubmit}>
            {" "}
            {/* Añadido un formulario para manejar el submit correctamente */}
            <TextField
              label="Nombre"
              name="nombres"
              fullWidth
              margin="normal"
              value={nuevoRegistro.nombres}
              onChange={handleInputChange}
              required
              style={{ width: "400px" }}
            />
            <TextField
              label="Apellidos"
              name="apellidos"
              fullWidth
              margin="normal"
              value={nuevoRegistro.apellidos}
              onChange={handleInputChange}
              required
              style={{ width: "400px", margin: "15px" }}
            />
            <TextField
              label="No.Documento"
              name="numeroDocumento"
              type="number"
              fullWidth
              margin="normal"
              value={nuevoRegistro.numeroDocumento}
              onChange={handleInputChange}
              required
              style={{ width: "400px" }}
            />
            <TextField
              label="Tipo elemento"
              name="tipoElemento"
              fullWidth
              margin="normal"
              value={nuevoRegistro.tipoElemento}
              onChange={handleInputChange}
              required
              style={{ width: "400px", margin: "15px" }}
            />
            <TextField
              label="Color"
              name="color"
              fullWidth
              margin="normal"
              value={nuevoRegistro.color}
              onChange={handleInputChange}
              required
              style={{ width: "400px" }}
            />
            <TextField
              label="Cantidad"
              name="cantidad"
              type="number"
              fullWidth
              margin="normal"
              value={nuevoRegistro.cantidad}
              onChange={handleInputChange}
              required
              style={{ width: "400px", margin: "15px" }}
            />
            <div style={{ marginTop: "20px" }}>
              {" "}
              {/* Añadido un contenedor para los botones */}
              <Button
                variant="contained"
                color="primary"
                onChange={handleClose}
                type="submit" // Cambiado a submit para que el formulario lo maneje
                style={{
                  backgroundColor: "green",
                  position: "absolute",
                  left: "4%",
                }}
              >
                cancelar
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSubmit}
                style={{
                  backgroundColor: "green",
                  position: "relative",
                  left: "42%",
                }}
              >
                Guardar
              </Button>
              {mensaje && (
                <div className="mensaje" style={{ color: "red" }}>
                  {mensaje}
                </div>
              )}
            </div>
          </form>
        </Box>
      </Modal>
      <table id="registros-table" className="tablee">
        <thead>
          <tr>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Número de Documento</th>
            <th>Tipo Elemento</th>
            <th>Cantidad</th>
            <th>Color</th>
            <th>Serial</th>
            <th>Vehículo</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {records.map((persona) => (
            <tr key={persona.id}>
              <td>{persona.nombres}</td>
              <td>{persona.apellidos}</td>
              <td>{persona.numeroDocumento}</td>
              <td>{persona.tipoElemento}</td>
              <td>{persona.cantidad}</td>
              <td>{persona.color}</td>
              <td>{persona.serial}</td>
              <td>{persona.vehiculo}</td>
              <td>{persona.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav>
        <ul className="pagination_f">
          <li className="page-item">
            <a href="#" className="page-link" onClick={prePage}>
              <HiChevronLeft />
            </a>
          </li>
          {numbers.map((n, i) => (
            <li
              key={i}
              className={`page-item ${currentPage === n ? "active" : ""}`}
              style={{ cursor: "pointer", margin: "0 5px" }} // Mejor control de estilos
            >
              <span className="page-link" onClick={() => changeCPage(n)}>
                {n}
              </span>
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
