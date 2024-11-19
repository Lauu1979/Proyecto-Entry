import React from "react";
import "../utiles/ambiente.css";

function Ambiente() {
  return (
    <div className="ambiente">
      <header className="header">
        <img
          src="https://th.bing.com/th/id/R.8d7e7d1a91a8e89e14f065612f643ec5?rik=%2fcQmSSSUiZIxbw&riu=http%3a%2f%2f1.bp.blogspot.com%2f_P3MTso1k_5Y%2fS9JSjWuLKXI%2fAAAAAAAAAAM%2fSKLkZbLMIQ8%2fs320%2fSENA.jpg&ehk=NYlhbQXvj2X4SI2C8fxW19avOj95isaJ%2bJF%2fy8bj5n8%3d&risl=&pid=ImgRaw&r=0"
          alt="logo"
          className="logo"
        />
        <h1 className="title">Entry Solution</h1>
      </header>
      <div className="contenido5">
        <h2>Ayuda al medio ambiente :)</h2>
        <div className="tip tip-left">
          <img
            src="https://i.pinimg.com/originals/be/65/b3/be65b319d264fae065117ca3776cbbf3.jpg"
            alt="Agua"
            className="icon"
          />
          <p>
            Cuida el agua, ahorra cada gota y no dejes las llaves del baño
            abiertas!
          </p>
        </div>
        <div className="tip tip-right">
          <img
            src="https://i.pinimg.com/originals/83/e1/85/83e185dc4fa6f9177f03b526f8b46b71.jpg"
            alt="Energía"
            className="icon"
          />
          <p>
            No dejes los cargadores de los computadores enchufados, así
            ahorrarás energía.
          </p>
        </div>
        <div className="tip tip-left">
          <img
            src="https://i.pinimg.com/originals/9b/89/aa/9b89aa4f658a590d97a115aa8421f081.jpg"
            alt="Bici"
            className="icon"
          />
          <p>
            Camina o ven a formación en bici, además de beneficiar tu salud
            ayudas al medio ambiente dejando tu carro o moto en casa.
          </p>
        </div>
        <div className="tip tip-right">
          <img
            src="https://i.pinimg.com/originals/f3/02/0e/f3020e111e8270014239111837229c9f.jpg"
            alt="Árbol"
            className="icon"
          />
          <p>
            Siembra un árbol, recuerda que es importante para purificar el aire
            que respiras!
          </p>
        </div>
        <a href="/">
          <button type="button" className="botun">
            Volver
          </button>
        </a>
      </div>
      <footer className="footer">
        <a
          href="/Ambiente"
          className="ambiente-planta-link"
          title="Haz clic aquí "
        >
          <img
            src="https://img.freepik.com/fotos-premium/planta-maceta-dibujos-animados-hojas-verdes-sobre-fondo-blanco-ai-generativo_958124-8168.jpg"
            alt="Ilustración de una planta"
            className="pre-registro-planta"
          />
        </a>
      </footer>
    </div>
  );
}

export default Ambiente;
