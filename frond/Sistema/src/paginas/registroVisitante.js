import React, { useEffect, useState } from "react";
import axios from "axios";
import "../utiles/css/registroV.css";
import Menu from "../componentes/menu";
import { IoMdSearch } from "react-icons/io";
import { Modal, Box, Button, TextField, Typography } from "@mui/material";
import { GoPlusCircle } from "react-icons/go";
import swal from "sweetalert";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const Registrovisi = () => {
  const url = "http://localhost:3001/Personas_visitante";
  const [personasVisitante, setPersonasVisitante] = useState([]);
  const [tablaVisitante, setTablaVisitante] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [open, setOpen] = useState(false); // Estado para controlar el modal
  const [nuevoRegistro, setNuevoRegistro] = useState({
    nombres: "",
    apellidos: "",
    numeroDocumento: "",
    email: "",
    tipoElemento: "",
    cantidad: "",
    color: "",
    lugarVisitar: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 8;
  const [mensaje, setMensaje] = useState("");

  // Cálculo de paginación
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = personasVisitante.slice(firstIndex, lastIndex);
  const npage = Math.ceil(personasVisitante.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const peticionGet = async () => {
    try {
      const response = await axios.get(url);
      setPersonasVisitante(response.data);
      setTablaVisitante(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };

  const filtrar = (terminoBusqueda) => {
    const resultadoBusqueda = tablaVisitante.filter((elemento) =>
      elemento.numeroDocumento
        .toString()
        .toLowerCase()
        .includes(terminoBusqueda.toLowerCase()) ||
      elemento.tipoElemento
        .toString()
        .toLowerCase()
        .includes(terminoBusqueda.toLowerCase())
    );
    setPersonasVisitante(resultadoBusqueda);
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
      email,
      tipoElemento,
      cantidad,
      color,
      lugarVisitar,
    } = nuevoRegistro;
    if (
      !nombres ||
      !apellidos ||
      !numeroDocumento ||
      !email ||
      !tipoElemento ||
      !cantidad ||
      !color ||
      !lugarVisitar
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

  const validateLetters = (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
  };

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

  const validateNumeric = (e) => {
    const value = e.target.value;
    const isNumeric = /^[0-9]*$/.test(value);

    if (!isNumeric) {
      e.target.value = value.replace(/\D/g, ""); // Eliminar cualquier carácter que no sea número
    }
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
        right: "8%",
        borderRadius: "5px",
        marginBottom: "24px",
      }}
    />
    <button className="boton_busqueda">
      <IoMdSearch />
    </button>
  </div>
  
        <div className="title">REGISTROS VISITANTES</div>
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
            Agregar nuevo visitante
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
            onInput={validateLetters}
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
            onInput={validateLetters}
          />
          <TextField
            label="No.Documento"
            name="numeroDocumento"
            type="text"
            fullWidth
            margin="normal"
            value={nuevoRegistro.numeroDocumento}
            required
            onInput={validateNumeric}
            style={{ width: "400px" }}
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
            style={{ width: "400px", margin: "15px" }}
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
            style={{ width: "400px" }}
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
            style={{ width: "400px", margin: "15px" }}
          />
          <TextField
            label="Cantidad"
            name="cantidad"
            type="number"
            margin="normal"
            fullWidth
            value={nuevoRegistro.cantidad}
            onChange={handleInputChange}
            required
            style={{ width: "400px" }}
          />
          <TextField
            label="Lugar a visitar"
            name="lugarVisitar"
            type="text"
            margin="normal"
            fullWidth
            value={nuevoRegistro.lugarVisitar}
            onChange={handleInputChange}
            required
            style={{ width: "400px", margin: "15px" }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleClose}
            style={{
              backgroundColor: "green",
              right: "43%",
            }}
          >
            CANCELAR
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{
              backgroundColor: "green",
              position: "absolute",
              right: "5%",
            }}
          >
            GUARDAR
          </Button>
          {mensaje && <div className="mensaje" style={{color: "red"}}>{mensaje}</div>}
        </Box>
      </Modal>

      <table className="table table-hover">
        <thead className="table-primary">
          <tr>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>No.Documento</th>
            <th>Email</th>
            <th>Tipo Elemento</th>
            <th>Cantidad</th>
            <th>Color</th>
            <th>Lugar a Visitar</th>
          </tr>
        </thead>
        <tbody>
          {records.map((person) => (
            <tr key={person.id_persona}>
              <td>{person.nombres}</td>
              <td>{person.apellidos}</td>
              <td>{person.numeroDocumento}</td>
              <td>{person.email}</td>
              <td>{person.tipoElemento}</td>
              <td>{person.cantidad}</td>
              <td>{person.color}</td>
              <td>{person.lugarVisitar}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <center>
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
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
          <li className={`page-item ${currentPage === npage ? "disabled" : ""}`}>
            <button className="page-link" onClick={nextPage}>
              <HiChevronRight />
            </button>
          </li>
        </ul>
      </center>
    </div>
  );
};

export default Registrovisi;
