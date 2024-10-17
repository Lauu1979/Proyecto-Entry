import React, { createContext, useContext, useState } from "react";

const ParqueaderoContext = createContext();

export const ParqueaderoProvider = ({ children }) => {
  const [espacios, setEspacios] = useState([
    { id: 1, ocupado: false },
    { id: 2, ocupado: true },
    { id: 3, ocupado: false },
    { id: 4, ocupado: true },
    { id: 5, ocupado: false },
    { id: 6, ocupado: false },
    { id: 7, ocupado: true },
    { id: 8, ocupado: false },
    { id: 9, ocupado: true },
    { id: 10, ocupado: false },
  ]);

  const toggleEspacio = (id) => {
    setEspacios((prevEspacios) =>
      prevEspacios.map((espacio) =>
        espacio.id === id ? { ...espacio, ocupado: !espacio.ocupado } : espacio
      )
    );
  };

  return (
    <ParqueaderoContext.Provider value={{ espacios, toggleEspacio }}>
      {children}
    </ParqueaderoContext.Provider>
  );
};

export const useParqueadero = () => useContext(ParqueaderoContext);
