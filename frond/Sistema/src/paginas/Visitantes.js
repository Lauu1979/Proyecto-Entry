import React, { useEffect, useState } from "react";
import "../utiles/css/registroA.css";
import axios from "axios";
import Menu from "../componentes/menu";
import swal from "sweetalert";

const Visitantes = () => {
  const [formData, setFormData] = useState({
    Nombres: "",
    Apellidos: "",
    TipoDocumento: "",
    TipoSangre: "",
    NumeroDocumento: "",
    SerialElemento: "",
    LugarEstablecido: "",
    Estado: "",
    Email: "",
    TipoElemento: "",
    CantidadElemento: "",
    Color: "",
  });

  const urlAprendiz = "http://localhost:8000/visitante/registro";
  const urlElemento = "http://localhost:8000/elementos/registro";
  const [placaError, setSerialError] = useState(false);

  const validateLetters = (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
  };

  const validateNumeric = (e) => {
    e.target.value = e.target.value.replace(/\D/g, "");
  };

  const validateAlphanumeric = (e) => {
    const value = e.target.value;
    if (/[^a-zA-Z0-9]/.test(value)) {
      setSerialError(true);
    } else {
      setSerialError(false);
    }
    e.target.value = value.replace(/[^a-zA-Z0-9]/g, "");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const elements = formData.TipoElemento
    ? formData.TipoElemento.split(",")
    : [];
  const isValid = elements.every((element) => {
    const [item, quantity] = element.split("=").map((item) => item.trim());
    return item && quantity && !isNaN(quantity);
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(urlAprendiz, {
        Nombres: formData.Nombres,
        Apellidos: formData.Apellidos,
        TipoDocumento: formData.TipoDocumento,
        TipoSangre: formData.TipoSangre,
        NumeroDocumento: formData.NumeroDocumento,
        LugarEstablecido: formData.LugarEstablecido,
        Estado: formData.Estado,
        Email: formData.Email,
      });
      const elementoResponse = await axios.post(urlElemento, {
        TipoElemento: formData.TipoElemento,
        CantidadElemento: formData.CantidadElemento,
        Color: formData.Color,
        SerialElemento: formData.SerialElemento,
      });

      if (response.status === 200 && elementoResponse.status === 200) {
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
          TipoDocumento: "",
          TipoSangre: "",
          NumeroDocumento: "",
          SerialElemento: "",
          LugarEstablecido: "",
          Estado: "",
          Email: "",
          TipoElemento: "",
          CantidadElemento: "",
          Color: "",
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
      <h1>VISITANTES</h1>
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
        {/* Fila 3: Tipo de Sangre y Programa de Formación */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="TipoSangre">Tipo de Sangre:</label>
            <select
              id="TipoSangre"
              name="TipoSangre"
              value={formData.TipoSangre}
              onChange={handleChange}
              required
            >
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="LugarEstablecido">Lugar al que se dirije:</label>
            <input
              type="text"
              id="LugarEstablecido"
              name="LugarEstablecido"
              maxLength="50"
              onInput={validateLetters}
              value={formData.LugarEstablecido}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        {/* Fila 4: Ficha y Email */}
        <div className="form-row">
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
        {/* Fila 5: Tipo de Elemento y Estado */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="TipoElemento">Elementos a ingresar:</label>
            <input
              type="text"
              id="TipoElemento"
              name="TipoElemento"
              value={formData.TipoElemento}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="Estado">Estado:</label>
            <select
              id="Estado"
              name="Estado"
              value={formData.Estado}
              onChange={handleChange}
            >
              <option value="n/a">Seleccione...</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>
        </div>
        {/* Fila 6: Serial del Elemento */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="SerialElemento">Serial del Elemento:</label>
            <input
              type="text"
              id="SerialElemento"
              maxLength="6"
              name="SerialElemento"
              value={formData.SerialElemento}
              onChange={handleChange}
              onInput={validateAlphanumeric}
            />
            {placaError && (
              <span className="error-message">
                Error: El serial solo debe contener caracteres alfanuméricos.
              </span>
            )}
          </div>
        </div>
        {/* Fila 7: Cantidad y Color */}
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="CantidadElemento">Cantidad:</label>
            <input
              id="CantidadElemento"
              name="CantidadElemento"
              type="text"
              maxLength="7"
              onInput={validateNumeric}
              value={formData.CantidadElemento}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="Color">Color:</label>
            <input
              type="text"
              name="Color"
              maxLength="10"
              value={formData.Color}
              onInput={validateLetters}
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

export default Visitantes;
