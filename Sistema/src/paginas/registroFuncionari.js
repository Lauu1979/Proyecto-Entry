import React, { useEffect, useState } from "react";
import axios from "axios";
import "../utiles/css/registroF.css";
import Menu from "../componentes/menu";
import { IoMdSearch } from "react-icons/io";
import { Modal, Box, Button, TextField, Typography } from "@mui/material"; // Importar MUI
import { GoPlusCircle } from "react-icons/go";
import swal from "sweetalert";

const Registrofuncionari = () => {
  const url = "http://localhost:3001/Personas_funcionario";
  const [personasFuncionario, setPersonasFuncionario] = useState([]);
  const [tablaFuncionario, setTablaFuncionario] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [open, setOpen] = useState(false); // Estado para controlar el modal
  const [nuevoRegistro, setNuevoRegistro] = useState({
    nombres: "",
    apellidos: "",
    numeroDocumento: "",
    tipoElemento: "",
    cantidad: "",
    color: "",
  });
  const peticionGet = async () => {
    await axios
      .get(url)
      .then((response) => {
        setPersonasFuncionario(response.data);
        setTablaFuncionario(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };

  const filtrar = (terminoBusqueda) => {
    var resultadoBusqueda = tablaFuncionario.filter((elemento) => {
      if (
        elemento.numeroDocumento
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento;
      }
      if (
        elemento.tipoElemento
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setPersonasFuncionario(resultadoBusqueda);
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
    try {
      const response = await axios.post(url, nuevoRegistro);
      if (response.status === 201) {
        alert();
        handleClose();
      } else {
        alert("Error de registro");
        console.error(response.data);
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexion al servidor");
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

  return (
    <div className="Coontainerr">
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
            <IoMdSearch />{" "}
          </button>
        </div>
        <div className="title">REGISTROS FUNCIONARIOS</div>
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
            fullWidth
            margin="normal"
            value={nuevoRegistro.nombres}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Apellidos"
            name="apellidos"
            fullWidth
            margin="normal"
            value={nuevoRegistro.apellidos}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="No.Documento"
            name="numeroDocumento"
            fullWidth
            margin="normal"
            value={nuevoRegistro.numeroDocumento}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="No.Ficha"
            name="codigoFicha"
            fullWidth
            margin="normal"
            value={nuevoRegistro.codigoFicha}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Tipo elemento"
            name="tipoElemento"
            fullWidth
            margin="normal"
            value={nuevoRegistro.tipoElemento}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Color"
            name="color"
            fullWidth
            margin="normal"
            value={nuevoRegistro.color}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Cantidad"
            name="cantidad"
            fullWidth
            margin="normal"
            value={nuevoRegistro.cantidad}
            onChange={handleInputChange}
            required
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            style={{
              backgroundColor: "green",
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
              right: "8%",
            }}
          >
            Cacelar
          </Button>
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
            <th>Vehiculo</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {personasFuncionario.map((persona) => (
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
    </div>
  );
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default Registrofuncionari;
