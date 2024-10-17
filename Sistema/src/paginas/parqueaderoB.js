import React, { useState } from "react";
import "../utiles/css/parqueaderoB.css";
import Menu from "../componentes/menu";

const Parqueaderobicis = () => {
  const [selectedButtons, setSelectedButtons] = useState(new Set());
  const [formData, setFormData] = useState({}); // Estado para almacenar los datos de cada formulario

  const handleClick = (index) => {
    const newSelectedButtons = new Set(selectedButtons);
    if (newSelectedButtons.has(index)) {
      newSelectedButtons.delete(index);
    } else {
      newSelectedButtons.add(index);
    }
    setSelectedButtons(newSelectedButtons);

    // Enviar mensaje a la segunda aplicación a través del iframe
    const iframe = document.querySelector("iframe");
    if (iframe) {
      console.log(
        "Enviando espacios seleccionados:",
        Array.from(newSelectedButtons)
      );
      iframe.contentWindow.postMessage(
        Array.from(newSelectedButtons),
        "http://localhost:3002"
      );
    }
  };

  const handleInputChange = (index, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [index]: {
        ...prevData[index],
        [field]: value,
      },
    }));
  };

  return (
    <div>
      <Menu />
      <label
        className="cuadro-tojo"
        style={{
          position: "absolute",
          top: "30%",
          left: "8%",
          color: "black",
          textAlign: "center",
        }}
      >
        <strong>Ocupado</strong>

        <button
          style={{
            backgroundColor: "red",
            width: "50px",
            height: "50px",
            position: "absolute",
            top: "20%",
            right: "110%",
            alignContent: "center",
          }}
        />
      </label>
      <label
        className="cuadros"
        style={{
          position: "absolute",
          top: "40%",
          left: "8%",
          color: "black",
          textAlign: "center",
        }}
      >
        <strong>Libre</strong>

        <button
          style={{
            backgroundColor: "green",
            width: "50px",
            height: "50px",
            position: "absolute",
            top: "50%",
            right: "110%",
            alignContent: "center",
          }}
        />
      </label>

      <div className="Contaainer">
        <div>
          <center>
            <h1>Parqueadero Bicicletas</h1>
          </center>
          <br />
          <div className="parking-lot">
            {Array.from({ length: 21 }).map((_, index) => (
              <div key={index} className="parking-spot">
                <button
                  onClick={() => handleClick(index)}
                  className={
                    selectedButtons.has(index) ? "buttonFalse" : "buttonTrue"
                  }
                >
                  {index + 1}
                </button>
                {selectedButtons.has(index) && (
                  <div className="form-container">
                    <input
                      type="text"
                      id="placaVehiculo"
                      placeholder="Placa"
                      required
                      value={formData[index]?.placa || ""}
                      onChange={(e) =>
                        handleInputChange(index, "placa", e.target.value)
                      }
                    />
                    <input
                      type="number"
                      id="numeroDocumento"
                      placeholder="Número de ID"
                      value={formData[index]?.id || ""}
                      onChange={(e) =>
                        handleInputChange(index, "id", e.target.value)
                      }
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <iframe
        src="http://localhost:3000/EstacionamientoC"
        title="Estacionamiento App"
        width="100%"
        height="400px"
        style={{ border: "none" }}
      ></iframe>
    </div>
  );
};

export default Parqueaderobicis;
