import React from "react";
import Menu from "../componentes/menu";
import "../utiles/css/bienvenida.css"

const Bienvenida = () => {
    return(
        <div>
            <Menu />
        <img src="https://static.vecteezy.com/system/resources/previews/007/433/452/non_2x/illustration-of-happy-cute-policeman-with-stop-sign-kawaii-chibi-cartoon-character-design-vector.jpg" id="logo5" />
        <div id="contenido">
        <h1> Bienvenido a Entry Solution </h1>
        <br/>
        <p>Estamos encantados de darte la bienvenida al sistema diseñado 
          para mejorar la eficiencia y seguridad en el registro de elementos y 
          vehículos en nuestro centro de formació CGMLTI. <br/>
          Gracias por formar parte de nuestra comunidad educativa y 
          por usar este sistema.
          Esperamos que disfrutes de sus beneficios!</p>
      </div>
      </div>
    )
}

export default Bienvenida