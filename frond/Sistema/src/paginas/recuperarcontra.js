import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../utiles/css/olvidemicontra.css";

const Recuperar = () => {
    const baseURL = "http://localhost:8000/Recuperar_contraseña";
    const [usuario, setUsuario] = useState("");
    const [mensaje, setMensaje] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const respuesta = await axios.get(baseURL, {
                params: { usuario }
            });

            if (respuesta.data.exists) {
                setMensaje(respuesta.data.mensaje);
                window.location.href = "/codigocontraseña";
            } else {
                setMensaje("Email no encontrado, verifique y vuelva a intentar");
            }
        } catch (error) {
            setMensaje("Ocurrió un error al verificar el correo");
        }
    }

    return (
        <div>
            <img src="https://img.freepik.com/vector-gratis/ilustracion-concepto-oficiales-policia_114360-13667.jpg?w=740&t=st=1725401810~exp=1725402410~hmac=3a4de5a89da4c6ee5427c1d3e07e862ad113372dcfd157711f067f308b2da559" className="logo2" alt="logo" />
            <div className="containerr">
                <div className="title">RECUPERAR CONTRASEÑA</div>
                <br />
                <form onSubmit={handleSubmit}>
                    <div className="user-detailss">
                        <div className="fieldss">
                            <div className="input-fieldd">
                                <label>Email</label>
                                <input type="email" className="input" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
                            </div>
                            {mensaje && <div className="mensaje">{mensaje}</div>}
                            <br />
                            <div>
                                <center>
                                    <button type="submit" className="botoon">Siguiente</button>
                                </center>
                                <Link to="/">
                                    <center>
                                        <button type="button" className="botoon">Regresar</button>
                                    </center>
                                </Link>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Recuperar;
