import React, { useState } from "react";
import "../utiles/p-registro.css";

function Registro() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedRol, setSelectedRol] = useState("Aprendiz"); // "Aprendiz" por defecto
  const [vehicleError, setVehicleError] = useState(false);
  const [selectedVehicleType, setSelectedVehicleType] = useState("n/a");
  const [selectedElementType, setSelectedElementType] = useState("n/a");

  const handleRolChange = (e) => {
    const role = e.target.value;
    setSelectedRol(role);

    if (role === "Aprendiz") {
      setVehicleError(false);
      setSelectedVehicleType("n/a"); // Restablecer el tipo de vehículo
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
    setSelectedElementType(e.target.value);
  };

  const validateLetters = (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
  };

  const validateBloodType = (e) => {
    const value = e.target.value.toUpperCase();
    const validChars = /^[ABO+-]*$/;
    if (validChars.test(value)) {
      e.target.value = value;
    } else {
      e.target.value = value.slice(0, -1); // Elimina el último carácter inválido
    }
  };

  const validateAlphanumeric = (e) => {
    const value = e.target.value;
    const isValidFormat = /^[a-zA-Z0-9]*$/.test(value); // Solo letras y números

    if (!isValidFormat) {
      e.target.value = value.replace(/[^a-zA-Z0-9]/g, ""); // Eliminar cualquier carácter que no sea letra o número
    }
  };

  const validateNumeric = (e) => {
    const value = e.target.value;
    const isNumeric = /^[0-9]*$/.test(value);

    if (!isNumeric) {
      e.target.value = value.replace(/\D/g, ""); // Eliminar cualquier carácter que no sea número
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Validar si el aprendiz selecciona "oficial" o "Carro"
    if (
      selectedRol === "Aprendiz" &&
      (data.vehiculo === "oficial" || data.vehiculo === "Carro")
    ) {
      setVehicleError(true);
      return;
    }

    // Validar que el campo "Número de Ficha" esté vacío para funcionarios
    if (selectedRol === "Funcionario" && data.codigoFicha) {
      alert("El campo 'Número de Ficha' debe estar vacío para Funcionario.");
      return;
    }

    const endpoint =
      selectedRol === "Aprendiz"
        ? "http://localhost:3001/Personas_aprendiz"
        : "http://localhost:3001/Personas_funcionario";

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
        // Recargar la página después de un registro exitoso
        setTimeout(() => {
          window.location.reload();
        }, 2000); // Espera 2 segundos para mostrar el mensaje de éxito
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

      {/* Fila 2: Tipo de Sangre y Tipo de Documento */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="tipoSangre">Tipo de Sangre:</label>
          <input
            type="text"
            maxLength="3"
            id="tipoSangre"
            name="tipoSangre"
            onInput={validateBloodType}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="tipoDocumento">Tipo de Documento:</label>
          <select id="tipoDocumento" name="tipoDocumento" required>
            <option value="C.C">C.C</option>
            <option value="T.I">T.I</option>
            <option value="P.P.T">P.P.T</option>
          </select>
        </div>
      </div>

      {/* Fila 3: Número de Documento y Rol */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="numeroDocumento">Número de Documento:</label>
          <input
            type="number"
            id="numeroDocumento"
            name="numeroDocumento"
            maxLength="10"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="Rol">Rol:</label>
          <select
            id="Rol"
            name="Rol"
            required
            onChange={handleRolChange}
            value={selectedRol}
          >
            <option value="Aprendiz">Aprendiz</option>
            <option value="Funcionario">Funcionario</option>
          </select>
        </div>
      </div>

      {/* Fila 4: Número de Ficha y Nombre del Programa */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="codigoFicha">Número de Ficha:</label>
          <input
            type="text" // Mantenerlo como texto para controlar el tipo de entrada
            id="codigoFicha"
            name="codigoFicha"
            maxLength="10"
            disabled={selectedRol === "Funcionario"}
            onInput={validateNumeric}
            required={selectedRol === "Aprendiz"}
          />
        </div>

        <div className="form-group">
          <label htmlFor="nombrePrograma">Nombre del Programa:</label>
          <input
            type="text"
            id="nombrePrograma"
            maxLength="30"
            name="nombrePrograma"
            onInput={validateLetters}
            required
          />
        </div>
      </div>

     {/* Fila 5: Email y Tipo de Elemento */}
<div className="form-row">
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

  <div className="form-group">
    <label htmlFor="tipoElemento">Tipo de Elemento:</label>
    <select
      id="tipoElemento"
      name="tipoElemento"
      onChange={handleElementTypeChange}
      value={selectedElementType}
      required
    >
      <option value="n/a">N/A</option>
      <option value="Elemento1">Elemento 1</option>
      <option value="Elemento2">Elemento 2</option>
      {/* Agrega más opciones según tus necesidades */}
    </select>
  </div>
</div>
     {/* Fila 6: Tipo de Vehículo y Cantidad */}
     <div className="form-row">
          <div className="form-group">
            <label htmlFor="vehiculo">Tipo de Vehículo:</label>
            <select
              id="vehiculo"
              name="vehiculo"
              required
              onChange={handleVehicleTypeChange}
              value={selectedVehicleType}
            >
              <option value="n/a">N/A</option>
              <option value="oficial" disabled={selectedRol === "Aprendiz"}>
                Oficial
              </option>
              <option value="Carro" disabled={selectedRol === "Aprendiz"}>
                Carro
              </option>
              <option value="Moto">Moto</option>
              <option value="Bicicleta">Bicicleta</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="cantidadElemento">Cantidad:</label>
            <input
              type="text"
              id="cantidadElemento"
              name="cantidadElemento"
              maxLength="10"
              onInput={validateNumeric}
              required
            />
          </div>
        </div>

        {/* Elementos Condicionales */}
        {selectedElementType !== "n/a" && (
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="colorElemento">Color del Elemento:</label>
              <input
                type="text"
                maxLength="8"
                id="colorElemento"
                name="colorElemento"
                onInput={validateLetters}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="serialElemento">Serial del Elemento:</label>
              <input
                type="text"
                maxLength="8"
                id="serialElemento"
                name="serialElemento"
                onInput={validateAlphanumeric}
                required
              />
            </div>
          </div>
        )}
      {selectedVehicleType !== "n/a" && (
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="placaVehiculo">Placa del Vehículo:</label>
            <input
              type="text"
              maxLength="6"
              id="placaVehiculo"
              name="placaVehiculo"
              onInput={validateAlphanumeric}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="colorVehiculo">Color del Vehículo:</label>
            <input
              type="text"
              maxLength="10"
              id="colorVehiculo"
              name="colorVehiculo"
              onInput={validateLetters}
              required
            />
          </div>
        </div>
      )}

      {/* Botones */}
      <div className="button-group">
        <a href="/">
          <button type="button">Volver</button>
        </a>
        <button type="submit">Guardar</button>
      </div>
    </form>

    {showSuccess && <div className="success-message">¡Registro exitoso!</div>}
  </div>
);
}

export default Registro;
