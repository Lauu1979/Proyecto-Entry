import React, { useState } from "react";
import Menu from "../componentes/menu";
import { Button } from "@mui/material";
import "../utiles/css/eventos.css";

const Eventos = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedRol, setSelectedRol] = useState("Aprendiz");
  const [vehicleError, setVehicleError] = useState(false);
  const [selectedVehicleType, setSelectedVehicleType] = useState("n/a");
  const [selectedElementType, setSelectedElementType] = useState("n/a");
  const [elementTypes, setElementTypes] = useState([
    "Computador",
    "Laptop",
    "Raquetas",
  ]);
  const [newElementType, setNewElementType] = useState("");

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
    if (selectedRol === "Aprendiz" && (vehicleType === "oficial" || vehicleType === "Carro")) {
      setVehicleError(true);
    } else {
      setVehicleError(false);
    }
  };

  const handleElementTypeChange = (e) => {
    const elementType = e.target.value;
    setSelectedElementType(elementType);
    if (elementType === "otro") {
      setShowModal(true);
    }
  };

  const handleNewElementTypeChange = (e) => {
    setNewElementType(e.target.value);
  };

  const handleAddNewElementType = () => {
    if (newElementType && !elementTypes.includes(newElementType)) {
      setElementTypes([...elementTypes, newElementType]);
      setSelectedElementType(newElementType);
      setNewElementType("");
      handleModalClose();
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setNewElementType("");
  };

  const validateLetters = (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
  };

  const validateAlphanumeric = (e) => {
    const value = e.target.value;
    e.target.value = value.replace(/[^a-zA-Z0-9]/g, "");
  };

  const validateNumeric = (e) => {
    const value = e.target.value;
    e.target.value = value.replace(/\D/g, "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (selectedRol === "Aprendiz" && (data.vehiculo === "oficial" || data.vehiculo === "Carro")) {
      setVehicleError(true);
      return;
    }

    if (selectedRol === "Funcionario" && data.codigoFicha) {
      alert("El campo 'Número de Ficha' debe estar vacío para Funcionario.");
      return;
    }

    const endpoint =
      selectedRol === "Aprendiz"
        ? "mongodb://localhost:27017"
        : "mongodb://localhost:27017";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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
      <Menu />
      <h1>Eventos</h1>
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
        {/* Fila 3: Lugar y Email */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="lugar">Lugar al que se dirige:</label>
            <input
              type="text"
              maxLength="10"
              id="lugar"
              onInput={validateLetters}
              name="lugar"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              maxLength="50"
              required
            />
          </div>
        </div>
        {/* Fila 4: Tipo de Elemento y Tipo de Vehículo */}
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
              <option value="Otros">Otros</option>
            </select>
            {vehicleError && (
              <span className="error-message">
                Error: Los aprendices no pueden usar vehículos oficiales o carros.
              </span>
            )}
          </div>
          
        
        {/* Fila 5: Color y Serial */}
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
        </div>

        

        <div className="form-row">
          <button className="boton-evento" type="submit">Guardar</button>
        </div>
      </form>

      {showSuccess && (
        <div className="success-message">¡Registro exitoso!</div>
      )}
    </div>
  );
};

export default Eventos;
