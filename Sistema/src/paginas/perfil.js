import React, { useEffect, useState } from "react";
import "../utiles/css/perfil.css";
import { RiUserLine } from "react-icons/ri";
import { FiArrowLeftCircle } from "react-icons/fi";
import Menu from "../componentes/menu";
import { HiPencilSquare } from "react-icons/hi2";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Perfil = () => {
  const url = "http://localhost:3001/Registro_usuarios";
  const [Usuario, setUsuario] = useState(null);

  useEffect(() => {
    getRegistroU();
  }, []);

  const getRegistroU = async () => {
    try {
      const respuesta = await axios.get(url);
      setUsuario(respuesta.data[0]);
    } catch (error) {
      console.error("Error al obtener los datos del usuario: ", error);
    }
  };
  if (!Usuario) {
    return <div>cargandodatpos del usuario... </div>;
  }

  return (
    <form>
      <div className="Container-perfil">
        <Menu />
        <center>
          <div className="titulo">Mi perfil</div>
        </center>
        <RiUserLine
          style={{
            fontSize: "250px",
            position: "absolute",
            top: "25%",
            left: "9%",
          }}
        />
        <div className="user-details">
          <div className="filas">
            <div className="input-filas">
              <label>Nombres</label>
              <td>{Usuario.Nombres}</td>
            </div>
            <div className="input-filas">
              <label>Apellidos</label>
              <td>{Usuario.Apellidos}</td>
            </div>
            <div className="input-filas">
              <label>No Documento</label>
              <td>{Usuario.NumeroDocumento}</td>
            </div>
            <div className="input-filas">
              <label>Telefono</label>
              <td>{Usuario.Telefono}</td>
            </div>
            <div className="input-filas">
              <label>Email</label>
              <td>{Usuario.usuario}</td>
            </div>
            <a href="/Bienvenida">
              <p className="Boton-volver">
                <FiArrowLeftCircle style={{ fontSize: "40px" }} />
              </p>
            </a>
            <NavLink to="/cambiarcontra">
              <button className="Boton-contra">
                Cambiar mi contraseña
                <HiPencilSquare
                  style={{
                    fontSize: "25px",
                    position: "absolute",
                    top: "20%",
                    left: "83%",
                  }}
                />
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Perfil;
