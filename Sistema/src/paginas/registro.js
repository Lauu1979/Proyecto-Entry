import React, { useState } from "react";
import axios from "axios";
import "../utiles/css/registro.css";
import swal from "sweetalert";

const Registro = () => {
  const [mensaje, setMensaje] = useState("");
  const [
    formData,
    setFormData,
    baseURL = "http://localhost:3001/Registro_usuarios",
  ] = useState({
    Nombres: "",
    Apellidos: "",
    NumeroDocumento: "",
    Telefono: "",
    usuario: "",
    Contrasenia: "",
    Confirmar: "",
  });
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
      const response = await axios.post(baseURL, formData);
      if (response.status === 201) {
        estaAlerta();
      } else {
        alert("Error de registro");
        console.error(response.data);
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexion al servidor");
    }
  };

  const estaAlerta = () => {
    swal({
      title: "Registro Exitoso",
      icon: "success",
      time: "10s",
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
          alt="Loogo"
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
                value={formData.Apellidos}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <label>Numero De Documento</label>
              <input
                type="number"
                name="NumeroDocumento"
                value={formData.NumeroDocumento}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <label>Telefono</label>
              <input
                type="number"
                name="Telefono"
                value={formData.Telefono}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <label>Email</label>
              <input
                type="email"
                name="usuario"
                value={formData.usuario}
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
