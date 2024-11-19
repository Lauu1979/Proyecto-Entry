import React, { useState, useEffect } from "react";
import "../utiles/inicio.css";
import Slider from "react-slick";
import swal from "sweetalert";

function Inicio() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    afterChange: (current) => setCurrentSlide(current),
  };

  const showTermsAlert = () => {
    swal({
      title: "Términos y Condiciones",
      text: "Para continuar necesitamos que aceptes nuestros términos y condiciones para poder almacenar tus datos personales para el debido funcionamiento de este sitio.",
      icon: "warning",
      buttons: {
        cancel: {
          text: "Cancelar",
          value: false,
          visible: true,
          className: "btn-danger",
          closeModal: true,
        },
        confirm: {
          text: "Aceptar",
          value: true,
          visible: true,
          className: "btn-success",
          closeModal: true,
        },
      },
      content: {
        element: "a",
        attributes: {
          href: "https://soysena-my.sharepoint.com/:b:/g/personal/ldbohrquez_soy_sena_edu_co/EYAMu9fa61pLrUCidl-zFR8BuRuJDAhN6aCjAYPxZ6CnoA?e=u6gzj4",
          innerHTML: "Leer términos y condiciones",
          target: "_blank",
        },
      },
      dangerMode: true,
    }).then((willAccept) => {
      if (willAccept) {
        sessionStorage.setItem("termsAccepted", "true");
        swal("Muchas gracias, disfruta de nuestro servicio", {
          icon: "success",
        });
      } else {
        swal("Es necesario aceptar los términos y condiciones para continuar.");
        showTermsAlert(); // Recursión para volver a mostrar el diálogo si no acepta
      }
    });
  };

  useEffect(() => {
    // Verifica si el usuario ya aceptó los términos en la sesión actual
    if (!sessionStorage.getItem("termsAccepted")) {
      showTermsAlert();
    }
  }, []);

  const parkingImages = [
    "https://i.pinimg.com/236x/b2/a4/9e/b2a49eb4c099f5b4fe10790024de8ade.jpg",
    "https://i.pinimg.com/564x/81/2b/fb/812bfb13972dfad6a7babe80723631f6.jpg",
    "https://i.pinimg.com/564x/b8/f6/9a/b8f69a918b3bce45de6262c9dc62f6e6.jpg",
    "https://i.pinimg.com/564x/77/43/fd/7743fd2ff4241b58cba01dde9b4b73dc.jpg",
  ];

  const getSlideDescription = () => {
    switch (currentSlide) {
      case 0:
        return "¡Crea tu pre-registro ahora! <br /> y solo confírmalo cuando llegues.";
      case 1:
        return "Visualiza los espacios disponibles para tu AUTO en el estacionamiento y escoge tu lugar.";
      case 2:
        return "Visualiza los espacios disponibles para tu MOTO en el estacionamiento y escoge tu lugar.";
      case 3:
        return "Visualiza los espacios disponibles para tu BICI en el estacionamiento y escoge tu lugar.";
      default:
        return "";
    }
  };

  const getSlideLink = () => {
    switch (currentSlide) {
      case 0:
        return { url: "Registro", text: "¡Crea tu Pre-registro aquí!" };
      case 1:
        return {
          url: "/EstacionamientoC",
          text: "Ver espacios vacíos para tu CARRO",
        };
      case 2:
        return {
          url: "/EstacionamientoM",
          text: "Ver espacios vacíos para tu MOTO",
        };
      case 3:
        return {
          url: "/EstacionamientoB",
          text: "Ver espacios vacíos para tu BICI",
        };
      default:
        return { url: "#", text: "" };
    }
  };

  return (
    <div className="pre-registro-container">
      <header className="pre-registro-header">
        <img
          src="https://th.bing.com/th/id/R.8d7e7d1a91a8e89e14f065612f643ec5?rik=%2fcQmSSSUiZIxbw&riu=http%3a%2f%2f1.bp.blogspot.com%2f_P3MTso1k_5Y%2fS9JSjWuLKXI%2fAAAAAAAAAAM%2fSKLkZbLMIQ8%2fs320%2fSENA.jpg&ehk=NYlhbQXvj2X4SI2C8fxW19avOj95isaJ%2bJF%2fy8bj5n8%3d&risl=&pid=ImgRaw&r=0"
          alt="Logo del SENA"
          className="pre-registro-logo"
        />
        <h1 className="pre-registro-title">Entry Solution</h1>
      </header>

      <main className="pre-registro-main">
        <p
          className="pre-registro-description"
          dangerouslySetInnerHTML={{ __html: getSlideDescription() }}
        />

        <Slider {...settings} className="parking-slider">
          {parkingImages.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`Estacionamiento ${index + 1}`}
                className="parking-image"
              />
            </div>
          ))}
        </Slider>

        <a href={getSlideLink().url} className="pre-registro-link">
          {getSlideLink().text}
        </a>
        <br />
        <a
          href="/Ambiente"
          className="pre-registro-planta-link"
          title="Haz clic aquí "
        >
          <img
            src="https://img.freepik.com/fotos-premium/planta-maceta-dibujos-animados-hojas-verdes-sobre-fondo-blanco-ai-generativo_958124-8168.jpg"
            alt="Ilustración de una planta"
            className="pre-registro-planta"
          />
        </a>
      </main>
    </div>
  );
}

export default Inicio;
