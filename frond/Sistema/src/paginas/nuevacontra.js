import React, { useState } from "react";
import "../utiles/css/nuevacontra.css";

const Nuevacontra = () => {
  const [mensaje, setMensaje] = useState("");
  const [formData, setFormData] = useState({
    contrasenia: "",
    confirmar: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.contrasenia !== formData.confirmar) {
      setMensaje("Las contraseñas no coinciden");
      return;
    } else {
      alert("Cambio de contraseña exitoso");
      window.location.href = "/";
    }
  };

  return (
    <div>
      <img
        src="https://img.freepik.com/vector-gratis/ilustracion-concepto-oficiales-policia_114360-13667.jpg?w=740&t=st=1725401810~exp=1725402410~hmac=3a4de5a89da4c6ee5427c1d3e07e862ad113372dcfd157711f067f308b2da559"
        className="logo4"
        alt="Logo"
      />
      <div className="containerr">
        <center>
          <div className="title">RECUPERAR CONTRASEÑA</div>
        </center>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="user-detailss">
            <div className="fieldss">
              <div className="input-fieldd">
                <label>Nueva Contraseña</label>
                <input
                  type="password"
                  name="contrasenia"
                  className="input-n"
                  value={formData.contrasenia}
                  onChange={handleChange}
                  required
                />
              </div>
              <br />
              <div className="input-fieldd">
                <label>Confirmar su Contraseña</label>
                <input
                  type="password"
                  name="confirmar"
                  className="input-n"
                  value={formData.confirmar}
                  onChange={handleChange}
                  required
                />
              </div>
              {mensaje && <div className="mensaje">{mensaje}</div>}
              <br />
              <button type="submit" className="bon">Confirmar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Nuevacontra;
