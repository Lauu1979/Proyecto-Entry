import React, { useState } from "react";
import "../utiles/p-registro.css";
import axios from "axios";

function Registro() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [selectedRol, setSelectedRol] = useState("Aprendiz");
  const [vehicleError, setVehicleError] = useState(false);
  const [selectedVehicleType, setSelectedVehicleType] = useState("n/a");
  const [selectedElementType, setSelectedElementType] = useState("n/a");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [elementTypes, setElementTypes] = useState([
    "Computador",
    "Laptop",
    "Raquetas",
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newElementType, setNewElementType] = useState("");

  // Buscar número de documento
  const [numeroDocumento, setNumeroDocumento] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [mensaje, setMensaje] = useState("");

  const buscarUsuario = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/PreRegistro/registro/buscar?documento=${numeroDocumento}`
      );
      const data = response.data;
      if (data.usuarioEncontrado) {
        setNombres(data.nombres);
        setApellidos(data.apellidos);
        setMensaje("Usuario encontrado");
        setShowForm(false);
      } else {
        setNombres("");
        setApellidos("");
        setMensaje("Usuario no encontrado");
        setShowForm(true);
      }
    } catch (error) {
      setMensaje("Error al buscar usuario");
      setShowForm(true);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handleRolChange = (e) => {
    const role = e.target.value;
    setSelectedRol(role);
    if (role === "Aprendiz") {
      setVehicleError(false);
      setSelectedVehicleType("n/a");
    }
  };

  const handleVehicleTypeChange = (e) => {
    const vehicleType = e.target.value;
    setSelectedVehicleType(vehicleType);
    if (
      selectedRol === "Aprendiz" &&
      (vehicleType === "oficial" || vehicleType === "Carro")
    ) {
      setVehicleError(true);
    } else {
      setVehicleError(false);
    }
  };

  const handleElementTypeChange = (e) => {
    const value = e.target.value;
    setSelectedElementType(value);
    if (value === "otro") {
      setShowModal(true);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setNewElementType("");
  };

  const handleNewElementTypeChange = (e) => {
    setNewElementType(e.target.value);
  };

  const handleAddNewElementType = () => {
    if (newElementType && !elementTypes.includes(newElementType)) {
      setElementTypes([...elementTypes, newElementType]);
      setSelectedElementType(newElementType);
      handleModalClose();
    }
  };

  const validateLetters = (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
  };

  const validateBloodType = (e) => {
    const value = e.target.value.toUpperCase();
    const validChars = /^[ABO+-]*$/;
    if (!validChars.test(value)) {
      e.target.value = value.slice(0, -1);
    }
  };

  const validateAlphanumeric = (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
  };

  const validateNumeric = (e) => {
    e.target.value = e.target.value.replace(/\D/g, "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    if (
      selectedRol === "Aprendiz" &&
      (selectedVehicleType === "oficial" || selectedVehicleType === "Carro")
    ) {
      setVehicleError(true);
      return;
    }

    const codigoFicha = e.target.codigoFicha?.value;
    if (selectedRol === "Funcionario" && codigoFicha) {
      alert("El campo 'Número de Ficha' debe estar vacío para Funcionario.");
      return;
    }

    const formData = {
      Nombres: e.target.Nombres.value,
      Apellidos: e.target.Apellidos.value,
      TipoSangre: e.target.TipoSangre.value,
      TipoDocumento: e.target.TipoDocumento.value,
      NumeroDocumento: e.target.NumeroDocumento.value,
      FichaFormacion: codigoFicha || undefined,
      ProgramaFormacion: e.target.ProgramaFormacion.value,
      Email: email,
      tipoElemento: selectedElementType,
      vehiculo: selectedVehicleType,
      cantidadElemento: e.target.cantidadElemento?.value,
      colorElemento:
        selectedElementType !== "n/a"
          ? e.target.colorElemento?.value
          : undefined,
      serialElemento:
        selectedElementType !== "n/a"
          ? e.target.serialElemento?.value
          : undefined,
      placaVehiculo:
        selectedVehicleType !== "n/a"
          ? e.target.placaVehiculo?.value
          : undefined,
      colorVehiculo:
        selectedVehicleType !== "n/a"
          ? e.target.colorVehiculo?.value
          : undefined,
      rol: selectedRol,
    };

    const endpointPreRegistro = "http://localhost:8000/PreRegistro/registro";
    const endpointElemento = "http://localhost:8000/elementos/registro";

    try {
      // Registrar en PreRegistro
      const responsePreRegistro = await axios.post(
        endpointPreRegistro,
        formData
      );

      // Registrar en Elementos
      const responseElemento = await axios.post(endpointElemento, {
        TipoElemento: selectedElementType,
        CantidadElemento: formData.cantidadElemento,
        Color: formData.colorElemento,
        SerialElemento: formData.serialElemento,
      });

      if (
        responsePreRegistro.status === 200 &&
        responseElemento.status === 200
      ) {
        setShowSuccess(true);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        console.error("Error al guardar el registro");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };

  return (
    <div className="contenido2">
      <header className="pre-registro-header">
        <img
          src="https://th.bing.com/th/id/R.8d7e7d1a91a8e89e14f065612f643ec5?rik=%2fcQmSSSUiZIxbw&riu=http%3a%2f%2f1.bp.blogspot.com%2f_P3MTso1k_5Y%2fS9JSjWuLKXI%2fAAAAAAAAAAM%2fSKLkZbLMIQ8%2fs320%2fSENA.jpg&ehk=NYlhbQXvj2X4SI2C8fxW19avOj95isaJ%2bJF%2fy8bj5n8%3d&risl=&pid=ImgRaw&r=0"
          alt="Logo del SENA"
          className="pre-registro-logo"
        />
        <h1 className="pre-registro-title">Entry Solution</h1>
      </header>
      <h1>Pre-Registro</h1>

      {/* Fila 1: Nombres y Apellidos */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="nombres">Numero de documento: </label>
          <input
            type="text"
            maxLength="10"
            id="nombres"
            name="nombres"
            onInput={validateNumeric}
            required
            value={numeroDocumento}
            onChange={(e) => setNumeroDocumento(e.target.value)}
          />
          <button onClick={buscarUsuario}>Buscar</button>
          <p>{mensaje}</p>
        </div>
      </div>

      {showSuccess && <div className="success-message">¡Registro exitoso!</div>}
    </div>
  );
}

export default Registro;
