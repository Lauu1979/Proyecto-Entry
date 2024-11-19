import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import "../utiles/p-registro.css";

function Registro() {
  const [showSuccess, setShowSuccess] = useState(false);
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
      email: email,
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

    const endpoint = "http://localhost:8000/Personas";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
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

      <form onSubmit={handleSubmit}>
        {/* Fila 1: Nombres y Apellidos */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="nombres">Nombres:</label>
            <input
              type="text"
              maxLength="25"
              id="nombres"
              name="nombres"
              onInput={validateLetters}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="apellidos">Apellidos:</label>
            <input
              type="text"
              id="apellidos"
              name="apellidos"
              maxLength="25"
              onInput={validateLetters}
              required
            />
          </div>
        </div>
        {/* Fila 2: Tipo de Documento y Número de Documento */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="tipoDocumento">Tipo de Documento:</label>
            <select id="tipoDocumento" name="tipoDocumento" required>
              <option value="C.C">C.C</option>
              <option value="T.I">T.I</option>
              <option value="P.P.T">P.P.T</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="numeroDocumento">Número de Documento:</label>
            <input
              type="text"
              id="numeroDocumento"
              name="numeroDocumento"
              maxLength="10"
              onInput={validateNumeric}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          {error && <p className="error">{error}</p>}
        </div>

        {/* Fila 3: TipoSangre y Programa  */}

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="tipoSangre">Tipo de Sangre:</label>
            <select
              type="text"
              id="tipoSangre"
              name="tipoSangre"
              onChange={handleVehicleTypeChange}
              value={selectedVehicleType}
            >
              <option value="O-">O-</option>
              <option value="O+">O+</option>
              <option value="A+">A+</option>
              <option value="AB+">AB+</option>
              <option value="B+">B+</option>
              <option value="A-">A-</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="nombrePrograma">Nombre del Programa:</label>
            <input
              type="text"
              id="nombrePrograma"
              name="nombrePrograma"
              maxLength="30"
              onInput={validateLetters}
              required
            />
          </div>
        </div>

        {/* Fila 4: Rol y Ficha */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="rol">Rol:</label>
            <select id="rol" value={selectedRol} onChange={handleRolChange}>
              <option value="Aprendiz">Aprendiz</option>
              <option value="Funcionario">Funcionario</option>
            </select>
          </div>
          {selectedRol === "Aprendiz" && (
            <div className="form-group">
              <label htmlFor="codigoFicha">Número de Ficha:</label>
              <input
                type="text"
                id="codigoFicha"
                name="codigoFicha"
                onInput={validateAlphanumeric}
                required
              />
            </div>
          )}
        </div>

        {/* Fila 5: Tipo de Elemento y Tipo de Vehículo */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="tipoElemento">Tipo de Elemento:</label>
            <select
              id="tipoElemento"
              name="tipoElemento"
              onChange={handleElementTypeChange}
              value={selectedElementType}
            >
              <option value="n/a">Seleccione...</option>
              {elementTypes.map((type, index) => (
                <option key={index} value={type}>
                  {type}
                </option>
              ))}
              <option value="otro">Otro...</option>{" "}
              {/* Opción para abrir el modal */}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="vehiculo">Tipo de Vehículo:</label>
            <select
              id="vehiculo"
              name="vehiculo"
              onChange={handleVehicleTypeChange}
              value={selectedVehicleType}
            >
              <option value="n/a">Seleccione...</option>
              <option value="oficial">Oficial</option>
              <option value="Carro">Carro</option>
              <option value="Moto">Moto</option>
              <option value="Bicicleta">Bicicleta</option>
            </select>
            {vehicleError && (
              <span className="error-message">
                Error: Los aprendices no pueden usar vehículos oficiales o
                carros.
              </span>
            )}
          </div>

          {/* Fila 6: Color y Serial */}
          {selectedElementType !== "n/a" && (
            <>
              <div className="form-group">
                <label htmlFor="colorElemento">Color de Elemento:</label>
                <input
                  type="text"
                  id="colorElemento"
                  name="colorElemento"
                  maxLength="10"
                  onInput={validateLetters}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="serialElemento">Serial de Elemento:</label>
                <input
                  type="text"
                  id="serialElemento"
                  name="serialElemento"
                  maxLength="10"
                  onInput={validateAlphanumeric}
                  required
                />
              </div>
            </>
          )}

          {selectedVehicleType !== "n/a" && (
            <>
              <div className="form-group">
                <label htmlFor="colorElemento">Color del Vehiculo:</label>
                <input
                  type="text"
                  id="colorElemento"
                  name="colorElemento"
                  maxLength="10"
                  onInput={validateLetters}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="serialElemento">Placa del Vehiculo:</label>
                <input
                  type="text"
                  id="serialElemento"
                  maxLength="6"
                  name="serialElemento"
                  onInput={validateAlphanumeric}
                  required
                />
              </div>
            </>
          )}
        </div>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{
            backgroundColor: "green",
            right: "-1%",
          }}
        >
          Guardar
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="boton.volver"
          onClick={() => (window.location.href = "/")}
          style={{
            backgroundColor: "green",
            left: "62%",
          }}
        >
          Volver
        </Button>

        {showModal && (
          <div className="form-group">
            <div className="modal">
              <div className="modal-content">
                <h3>Agregar Tipo de Elemento</h3>
                <input
                  type="text"
                  maxLength="20"
                  onInput={validateLetters}
                  value={newElementType}
                  onChange={handleNewElementTypeChange}
                  placeholder="Ingrese el nuevo tipo de elemento"
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddNewElementType}
                  style={{
                    backgroundColor: "green",
                    margin: "10px", // Ajustar espacio entre botones
                  }}
                >
                  Agregar
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleModalClose}
                  style={{
                    backgroundColor: "red",
                    margin: "10px", // Ajustar espacio entre botones
                  }}
                >
                  Cerrar
                </Button>
              </div>
            </div>
          </div>
        )}
      </form>

      {showSuccess && <div className="success-message">¡Registro exitoso!</div>}
    </div>
  );
}

export default Registro;
