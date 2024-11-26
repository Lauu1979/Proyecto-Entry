import React, { Component } from "react";
import Cookies from "universal-cookie";
import "../utiles/css/menu.css";
import { FaRegUser } from "react-icons/fa";
import { GoFileDirectory } from "react-icons/go";
import { MdEvent, MdOutlineDirectionsCarFilled } from "react-icons/md";
import { HiOutlineArchiveBoxArrowDown } from "react-icons/hi2";
import { IoHelpCircleOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const cookies = new Cookies();

class Menu extends Component {
  cerrarSesion = () => {
    cookies.remove("id", { path: "/" });
    cookies.remove("usuario", { path: "/" });
    window.location.href = "./";
  };

  componentDidMount() {
    if (!cookies.get("usuario")) {
      window.location.href = "./";
    }
  }

  render() {
    console.log("id: ", cookies.get("id"));
    console.log("usuario: ", cookies.get("usuario"));

    return (
      <div>
        <NavLink to="/Bienvenida">
          <img src="logoSenaNaranja.png" alt="sena" id="img-sena" />
        </NavLink>
        <div classname="menu">
          <nav id="primary_nav_wrap">
            
            <ul>
              <li className="current-menu-item">
                <NavLink to="#">
                  Registros{" "}
                  <GoFileDirectory
                    style={{
                      position: "absolute",
                      left: "83%",
                      fontSize: "30px",
                      top: "15%",
                    }}
                  />
                </NavLink>
                <ul>
                  <li>
                    <NavLink to="/RegistroAprendiz">Aprendices</NavLink>
                  </li>
                  <li>
                    <NavLink to="/RegistroFuncionario">Funcionarios</NavLink>
                  </li>
                  <li>
                    <NavLink to="/RegistroVisitante">Visitantes</NavLink>
                  </li>
                  <li>
                    <NavLink to="/RegistroEvento">Eventos</NavLink>
                  </li>
                </ul>
              </li>
              <li className="current-menu-item">
                <a href="#">Parqueadero </a>{" "}
                <MdOutlineDirectionsCarFilled
                  style={{
                    position: "absolute",
                    left: "80%",
                    fontSize: "35px",
                    top: "8%",
                  }}
                />
                <ul>
                  <li className="dir">
                    <NavLink to="/ParqueaderoCarros">Carros</NavLink>
                  </li>
                  <li className="dir">
                    <NavLink to="/ParqueaderoMotos">Motos</NavLink>
                  </li>
                  <li className="dir">
                    <NavLink to="/ParqueaderoBicis">Bicicletas</NavLink>
                  </li>
                </ul>
              </li>
              <li className="current-menu-item">
                <a href="#">
                  Reportes{" "}
                  <HiOutlineArchiveBoxArrowDown
                    style={{
                      position: "absolute",
                      left: "80%",
                      fontSize: "35px",
                      top: "10%",
                    }}
                  />{" "}
                </a>
                <ul>
                  <li className="dir">
                    <NavLink to="/ReporteAprendiz">Aprendices</NavLink>
                  </li>
                  <li className="dir">
                    <NavLink to="/ReporteFuncionario">Funcionarios</NavLink>
                  </li>
                  <li className="dir">
                    <NavLink to="/ReporteVisitante">Visitantes</NavLink>
                  </li>
                  
                </ul>
              </li>
              <li className="current-menu-item">
                <NavLink to="/eventos">
                  Eventos{" "}
                  <MdEvent
                    style={{
                      position: "absolute",
                      left: "80%",
                      fontSize: "35px",
                      top: "10%",
                    }}
                  />{" "}
                </NavLink>
              </li>

              <li className="current-menu-item">
                <NavLink to="/Manual">
                  Ayuda{" "}
                  <IoHelpCircleOutline
                    style={{
                      position: "absolute",
                      left: "80%",
                      fontSize: "35px",
                      top: "10%",
                    }}
                  />{" "}
                </NavLink>
              </li>
              <button
                id="button"
                style={{ color: "white" }}
                on
                onClick={() => this.cerrarSesion()}
              >
                Cerrar Sesion
              </button>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}

export default Menu;