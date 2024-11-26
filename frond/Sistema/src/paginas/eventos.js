import React, { useState } from "react";
import axios from "axios";
import Menu from "../componentes/menu";
import swal from "sweetalert";
import "../utiles/css/eventos.css";

const Eventos = () => {
  const [formData, setFormData] = useState({
    Nombres: "",
    Apellidos: "",
    TipoDocumento: "C.C",
    NumeroDocumento: "",
    Lugar: "",
    Email: "",
    TipoElemento: "",
    TipoVehiculo: "n/a",
    Placa: "",
    fechaIngreso: "",
    fechaLimite: "",
  });

  const baseURL = "http://localhost:8000/eventos/registro";

  const [placaError, setPlacaError] = useState(false);
  const [elementTypeError, setElementTypeError] = useState(false);

  const validateLetters = (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
  };

  const validateNumeric = (e) => {
    e.target.value = e.target.value.replace(/\D/g, "");
  };

  const validateAlphanumeric = (e) => {
    const value = e.target.value;
    if (/[^a-zA-Z0-9]/.test(value)) {
      setPlacaError(true);
    } else {
      setPlacaError(false);
    }
    e.target.value = value.replace(/[^a-zA-Z0-9]/g, "");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Actualizar el error de placa si cambia el valor del campo de placa
    if (name === "Placa") {
      validateAlphanumeric(event);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar tipo de elemento
    const elements = formData.TipoElemento
      ? formData.TipoElemento.split(",")
      : [];
    const isValid = elements.every((element) => {
      const [item, quantity] = element.split("=").map((item) => item.trim());
      return item && quantity && !isNaN(quantity);
    });

    if (!isValid || placaError) {
      setElementTypeError(!isValid);
      return;
    }

    try {
      const response = await axios.post(baseURL, formData);
      if (response.status === 200) {
        swal({
          title: "Registro Exitoso",
          icon: "success",
          timer: 10000,
          button: "OK",
        });

        // Restablecer el formulario
        setFormData({
          Nombres: "",
          Apellidos: "",
          TipoDocumento: "C.C",
          NumeroDocumento: "",
          Lugar: "",
          Email: "",
          TipoElemento: "",
          TipoVehiculo: "n/a",
          Placa: "",
          fechaIngreso: "",
          fechaLimite: "",
        });
      } else {
        alert("Error de registro");
        console.error(response.data);
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión al servidor");
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
            <label htmlFor="Nombres">Nombres:</label>
            <input
              type="text"
              maxLength="25"
              id="Nombres"
              name="Nombres"
              onInput={validateLetters}
              value={formData.Nombres}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="Apellidos">Apellidos:</label>
            <input
              type="text"
              id="Apellidos"
              name="Apellidos"
              maxLength="25"
              onInput={validateLetters}
              value={formData.Apellidos}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        {/* Fila 2: Tipo de Documento y Número de Documento */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="TipoDocumento">Tipo de Documento:</label>
            <select
              id="TipoDocumento"
              name="TipoDocumento"
              value={formData.TipoDocumento}
              onChange={handleChange}
              required
            >
              <option value="C.C">C.C</option>
              <option value="T.I">T.I</option>
              <option value="P.P.T">P.P.T</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="NumeroDocumento">Número de Documento:</label>
            <input
              type="text"
              id="NumeroDocumento"
              name="NumeroDocumento"
              maxLength="10"
              onInput={validateNumeric}
              value={formData.NumeroDocumento}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        {/* Fila 3: Lugar y Email */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="Lugar">Lugar al que se dirige:</label>
            <input
              type="text"
              maxLength="15"
              id="Lugar"
              name="Lugar"
              onInput={validateLetters}
              value={formData.Lugar}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="Email">Email:</label>
            <input
              type="email"
              id="Email"
              name="Email"
              maxLength="50"
              value={formData.Email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        {/* Fila 4: Tipo de Elemento y Tipo de Vehículo */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="TipoElemento">Elementos a ingresar:</label>
            <input
              type="text"
              id="TipoElemento"
              name="TipoElemento"
              value={formData.TipoElemento}
              onChange={handleChange}
              placeholder="Ejemplo: Computador=9,Sillas=25"
              required
            />
            {elementTypeError && (
              <span className="error-message">
                Error: Por favor, ingrese los tipos de elementos separados por
                comas y al lado la cantidad que se ingresarán.
              </span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="TipoVehiculo">Tipo de Vehículo:</label>
            <select
              id="TipoVehiculo"
              name="TipoVehiculo"
              value={formData.TipoVehiculo}
              onChange={handleChange}
            >
              <option value="n/a">Seleccione...</option>
              <option value="oficial">Oficial</option>
              <option value="Carro">Carro</option>
              <option value="N/A">N/A</option>
            </select>
          </div>
        </div>

        {/* Fila 5: Serial y Placa */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="Placa">Placa del Vehículo:</label>
            <input
              type="text"
              id="Placa"
              maxLength="6"
              name="Placa"
              value={formData.Placa}
              onChange={handleChange}
              onInput={validateAlphanumeric}
              disabled={formData.TipoVehiculo !== "oficial" && formData.TipoVehiculo !== "Carro"} 
       
            />
            {placaError && (
              <span className="error-message">
                Error: La placa solo debe contener caracteres alfanuméricos.
              </span>
            )}
          </div>
        </div>

        {/* Fila 6: Fechas de Ingreso y Salida */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="FechaIngreso">Fecha de Ingreso:</label>
            <input
              type="date"
              id="FechaIngreso"
              name="fechaIngreso"
              value={formData.fechaIngreso}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="fechaLimite">Fecha Límite:</label>
            <input
              type="date"
              id="fechaLimite"
              name="fechaLimite"
              value={formData.fechaLimite}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <button className="boton-evento" type="submit">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Eventos;
