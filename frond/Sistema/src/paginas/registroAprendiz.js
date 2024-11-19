import React, { useEffect, useState } from "react";
import "../utiles/css/registroA.css";
import axios from "axios";
import Menu from "../componentes/menu";
import { IoMdSearch } from "react-icons/io";
import { Modal, Box, Button, TextField, Typography } from "@mui/material";
import { GoPlusCircle } from "react-icons/go";
import swal from "sweetalert";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const Registroapre = () => {
  const url = "http://localhost:3001/Personas_aprendiz";
  const [personasAprendiz, setPersonasAprendiz] = useState([]);
  const [tablaAprendiz, setTablaAprendiz] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [open, setOpen] = useState(false);
  const [nuevoRegistro, setNuevoRegistro] = useState({
    nombres: "",
    apellidos: "",
    numeroDocumento: "",
    fichaFormacion: "",
    estado: "",
    tipoElemento: "",
    cantidad: "",
    color: "",
  });
  const [mensaje, setMensaje] = useState("");

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10; // Ajusta según tus necesidades
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = personasAprendiz.slice(firstIndex, lastIndex);
  const npage = Math.ceil(personasAprendiz.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const peticionGet = async () => {
    try {
      const response = await axios.get(url);
      setPersonasAprendiz(response.data);
      setTablaAprendiz(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };

  const filtrar = (terminoBusqueda) => {
    const resultadoBusqueda = tablaAprendiz.filter(
      (elemento) =>
        elemento.numeroDocumento
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase()) ||
        elemento.tipoElemento
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
    );
    setPersonasAprendiz(resultadoBusqueda);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      nombres,
      apellidos,
      numeroDocumento,
      codigoFicha,
      email,
      tipoElemento,
      cantidad,
      color,
    } = nuevoRegistro;
    if (
      !nombres ||
      !apellidos ||
      !numeroDocumento ||
      !codigoFicha ||
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
        alert();
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
  const alert = () => {
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
        <div className="title">REGISTROS APRENDICES</div>

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
            Agregar nuevo aprendiz
          </Typography>
          <TextField
            label="Nombre"
            name="nombres"
            type="text"
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
            type="text"
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
            label="No.Ficha"
            name="codigoFicha"
            type="number"
            fullWidth
            margin="normal"
            value={nuevoRegistro.codigoFicha}
            onChange={handleInputChange}
            required
            style={{ width: "400px", margin: "15px" }}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            value={nuevoRegistro.email}
            onChange={handleInputChange}
            required
            style={{ width: "400px" }}
          />
          <TextField
            label="Tipo elemento"
            name="tipoElemento"
            type="text"
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
            type="text"
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{
              backgroundColor: "green",
              position: "relative",
              left: "42%",
            }}
          >
            Guardar
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClose}
            style={{
              backgroundColor: "green",
              position: "absolute",
              left: "4%",
            }}
          >
            Cancelar
          </Button>
          {mensaje && (
            <div className="mensaje" style={{ color: "red" }}>
              {mensaje}
            </div>
          )}
        </Box>
      </Modal>

      <table id="registros-table">
        <thead>
          <tr>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Número de Documento</th>
            <th>Ficha</th>
            <th>Tipo Elemento</th>
            <th>Cantidad</th>
            <th>Color</th>
            <th>Serial</th>
            <th>Vehículo</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody id="data">
          {records.map((persona) => (
            <tr key={persona.id}>
              <td>{persona.nombres}</td>
              <td>{persona.apellidos}</td>
              <td>{persona.numeroDocumento}</td>
              <td>{persona.codigoFicha}</td>
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
        <ul className="pagination">
          <li className="page-item">
            <a href="#" className="page-link" onClick={prePage}>
              <HiChevronLeft />
            </a>
          </li>
          {numbers.map((n, i) => (
            <li
              key={i}
              className={`page-item ${currentPage === n ? "active" : ""}`}
            >
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

export default Registroapre;
