import React, { useEffect, useState } from "react";
import axios from "axios";
import "../utiles/css/registroV.css";
import Menu from "../componentes/menu";
import { IoMdSearch } from "react-icons/io";
import { Modal, Box, Button, TextField, Typography } from "@mui/material";
import { GoPlusCircle } from "react-icons/go";
import swal from "sweetalert";

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
    lugarVisitar: ""
  });
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 8;
  const [mensaje, setMensaje] = useState("")

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
    const { nombres, apellidos, numeroDocumento, email, tipoElemento, cantidad, color, lugarVisitar } = nuevoRegistro;
    if (!nombres || !apellidos || !numeroDocumento || !email || !tipoElemento || !cantidad || !color || !lugarVisitar) {
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
            placeholder="Busqueda por No.Documento o elemento"
            onChange={handleChange}
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
      minLength="10"
      maxLength="25"
      fullWidth
      margin="normal"
      value={nuevoRegistro.nombres}
      onChange={handleInputChange}
      required
      style={{ width: "400px"}}
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
      style={{ width: "400px", margin: "15px"}}
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
      style={{ width: "400px"}}
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
      style={{ width: "400px", margin: "15px"}}
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
      style={{ width: "400px"}}
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
      style={{ width: "400px", margin: "15px"}}
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
      style={{ width: "400px"}}
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
      style={{ width: "400px", margin: "15px"}}
    />
    <Button 
    variant="contained" 
    color="primary" 
    onClick={handleClose}
    style={{
      backgroundColor: "green",
      right: "43%"
    }}>
      CANCELAR
    </Button>
    <Button 
    variant="contained" 
    color="primary" 
    onClick={handleSubmit}
    style={{
      backgroundColor: "green",
      position: "absolute",
      right: "5%"
    }}>
      GUARDAR
    </Button>
    {mensaje && <div className="mensaje" style={{color: "red"}}>{mensaje}</div>}
  </Box>
</Modal>

      <table id="registros-table">
        <thead>
          <tr>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Número de Documento</th>
            <th>Tipo Elemento</th>
            <th>Cantidad</th>
            <th>Serial</th>
            <th>Color</th>
            <th>Lugar a visitar</th>
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
              <td>{persona.serial}</td>
              <td>{persona.color}</td>
              <td>{persona.lugarVisitar}</td>
              <td>{persona.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <nav>
        <ul className="pagination">
          <li className="page-item" type="none">
            <a href="#" className="page-link" onClick={prePage}>
              Prev
            </a>
          </li>
          {numbers.map((n, i) => (
            <li
              className={`page-item ${currentPage === n ? "active" : ""}`}
              key={i}
              type="none"
            >
              <a
                href="#" className="page-link" onClick={() => changeCPage(n)}
              >
                {n}
              </a>
            </li>
          ))}
          <li className="page-item" type="none">
            <a href="#" className="page-link" onClick={nextPage}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Registrovisi;