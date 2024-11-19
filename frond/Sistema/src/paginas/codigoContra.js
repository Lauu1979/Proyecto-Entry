import React, { useState } from "react";
import axios from "axios";
import "../utiles/css/codigocontra.css";

const Codigocontra = () => {
  const baseURL = "http://localhost:3001/Registro_usuarios";
  const [codigo, setCodigo] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await axios.post(baseURL, { codigo });
      if (respuesta.data.verificado) {
        setMensaje("Código verificado exitosamente");

        window.location.href = "./nuevacontra";
      } else {
        setMensaje("El código no es correcto");
      }
    } catch (error) {
      setMensaje("Error en la verificación del código");
      console.error(error);
    }
  };

  return (
    <div>
      <img src="https://img.freepik.com/vector-gratis/ilustracion-concepto-oficiales-policia_114360-13667.jpg?w=740&t=st=1725401810~exp=1725402410~hmac=3a4de5a89da4c6ee5427c1d3e07e862ad113372dcfd157711f067f308b2da559" className="logo3"/>
    <div className="containerr">
      <center>
        <div className="title">CÓDIGO DE VERIFICACIÓN</div>
      </center>
      <br />
      <form onSubmit={handleSubmit}>
        <div className="user-detailss">
          <div className="fieldss">
            <div className="input-fieldd">
              <label className="label-c">Código</label>
              <input
                type="number"
                className="input-c"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                required
              />
            </div>
            <br/>
            <div>
              <button type="submit" className="botn">Verificar</button>
            </div>
          </div>
        </div>
        {mensaje && <div className="mensaje">{mensaje}</div>}
      </form>
    </div>
    </div>
  );
};

export default Codigocontra;