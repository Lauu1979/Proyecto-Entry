import React, { Component } from "react";
import "../utiles/css/inicio.css";
import axios from "axios";
import Cookies from "universal-cookie";
import { CgMail } from "react-icons/cg";
import { MdOutlineNoEncryptionGmailerrorred } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const baseURL = "http://localhost:8000/inicio_sesion";
const cookies = new Cookies();

class Inicio extends Component {
  state = {
    form: {
      Email: "",
      Contrasenia: "",
    },
    error: false,
    errorMsg: "",
    show: false,
  };

  handleClick = () => {
    this.setState((prevState) => ({
      show: !prevState.show,
    }));
  };

  manejadorSubmit = async (e) => {
    e.preventDefault();
    const { Email, Contrasenia } = this.state.form;
    if (!Email || !Contrasenia) {
      this.setState({
        error: true,
        errorMsg: "Por favor ingrese un usuario y contraseña",
      });
      return;
    }
    this.iniciarSesion();
  };

  manejadorChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
      error: false,
      errorMsg: "",
    });
  };

  componentDidMount() {
    if (cookies.get("usuario")) {
      window.location.href = "./Menu";
    }
  }

  iniciarSesion = async () => {
    try {
      const response = await axios.get(baseURL, {
        params: {
          Email: this.state.form.Email,
          Contrasenia: this.state.form.Contrasenia,
        },
      });

      console.log(response.data);

      if (
        response.data &&
        response.data.mensaje === "Inicio de sesión exitoso"
      ) {
        cookies.set("usuario", this.state.form.Email, { path: "/" });
        window.location.href = "./Bienvenida";
      } else {
        this.setState({
          error: true,
          errorMsg: "Usuario y/o contraseña incorrectos.",
        });
      }
    } catch (error) {
      console.error(error);
      this.setState({
        error: true,
        errorMsg: "Hubo un error al iniciar sesión.",
      });
    }
  };

  render() {
    const { show, error, errorMsg } = this.state;
    return (
      <React.Fragment>
        <img src="logoSenaNaranja.png" alt="Logo" className="Logo" />
        <div className="wrapper fadeInDown">
          <div id="formContent">
            <h1
              style={{
                color: "black",
                textAlign: "center",
                fontSize: "28px",
                fontWeight: "600",
                textTransform: "uppercase",
                display: "inline-block",
                margin: "40px 8px 10px 8px",
              }}
            >
              Entry Solution
            </h1>
            <br />
            <br />
            <form onSubmit={this.manejadorSubmit}>
              <label style={{ position: "absolute", top: "21%" }}>
                Usuario
              </label>
              <input
                type="email"
                className="fadeIn second"
                name="Email"
                onChange={this.manejadorChange}
                required
              />
              <CgMail
                style={{ position: "absolute", top: "30%", fontSize: "30px" }}
              />
              <br />
              <br />
              <label style={{ position: "absolute", top: "42%" }}>
                Contraseña
              </label>
              <input
                type={show ? "text" : "password"}
                className="fadeIn third"
                name="Contrasenia"
                onChange={this.manejadorChange}
                required
              />
              <MdOutlineNoEncryptionGmailerrorred
                style={{ position: "absolute", top: "50%", fontSize: "30px" }}
              />
              <p
                onClick={this.handleClick}
                style={{
                  position: "absolute",
                  right: "12%",
                  top: "50%",
                  fontSize: "152%",
                  cursor: "pointer",
                  transition: "300ms",
                }}
              >
                {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </p>
              <br />
              {error && (
                <p style={{ color: "red", textAlign: "center" }}>{errorMsg}</p>
              )}
              <br />
              <button
                type="submit"
                className="fadeIn fourth"
                style={{ cursor: "pointer" }}
              >
                Iniciar sesión
              </button>
            </form>
            <div id="formFooter">
              <a className="underlineS" href="./registro">
                Registrarme
              </a>
              <br />
              <a className="underline" href="./recuperarcontraseña">
                Olvidé mi Contraseña
              </a>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Inicio;
