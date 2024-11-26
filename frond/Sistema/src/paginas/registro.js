import React, { useState } from "react";
import axios from "axios";
import "../utiles/css/registro.css";
import swal from "sweetalert";

const Registro = () => {
  const [mensaje, setMensaje] = useState("");
  const [formData, setFormData] = useState({
    Nombres: "",
    Apellidos: "",
    NumeroDocumento: "",
    Telefono: "",
    Email: "", 
    Contrasenia: "",
    Confirmar: "",
  });

  const baseURL = "http://localhost:8000/inicio_sesion/registro";

  const validateLetters = (e) => {
    e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
  };

  const validateNumeric = (e) => {
    e.target.value = e.target.value.replace(/\D/g, "");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.Contrasenia !== formData.Confirmar) {
      setMensaje("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await axios.post(baseURL, {
        Nombres: formData.Nombres,
        Apellidos: formData.Apellidos,
        NumeroDocumento: formData.NumeroDocumento,
        Telefono: formData.Telefono,
        Email: formData.Email,
        Contrasenia: formData.Contrasenia,
      });
      if (response.status === 200) {
        estaAlerta();
      } else {
        setMensaje("Error de registro");
        console.error(response.data);
      }
    } catch (error) {
      console.error(error);
      setMensaje("Error de conexión al servidor");
    }
  };

  const estaAlerta = () => {
    swal({
      title: "Registro Exitoso",
      icon: "success",
      timer: 10000,
      button: "OK",
    });
    window.location.href = "/";
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <img
          src="https://lh3.googleusercontent.com/p/AF1QipNjbxKjSgdYd0MjtGLkVOmpq4GtLQx8rnIyP063=s680-w680-h510"
          className="logo1"
          alt="Logo"
        />
      </div>
      <div className="container">
        <center>
          <div className="title">REGISTRO</div>
        </center>
        <div className="user-details">
          <div className="fields">
            <div className="input-field">
              <label>Nombres</label>
              <input
                type="text"
                name="Nombres"
                maxLength="20"
                onInput={validateLetters}
                value={formData.Nombres}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <label>Apellidos</label>
              <input
                type="text"
                name="Apellidos"
                maxLength="20"
                onInput={validateLetters}
                value={formData.Apellidos}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <label>Numero De Documento</label>
              <input
                type="text"
                name="NumeroDocumento"
                maxLength="10"
                onInput={validateNumeric}
                value={formData.NumeroDocumento}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <label>Telefono</label>
              <input
                type="text"
                name="Telefono"
                maxLength="10"
                onInput={validateNumeric}
                value={formData.Telefono}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <label>Email</label>
              <input
                type="email"
                name="Email"
                value={formData.Email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <label>Contraseña</label>
              <input
                type="password"
                name="Contrasenia"
                value={formData.Contrasenia}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <label>Confirmar su Contraseña</label>
              <input
                type="password"
                name="Confirmar"
                value={formData.Confirmar}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="botonn">
              Registrarme
            </button>
          </div>
        </div>
        {mensaje && (
          <div className="mensaje" style={{ color: "red" }}>
            {mensaje}
          </div>
        )}
      </div>
    </form>
  );
};

export default Registro;
