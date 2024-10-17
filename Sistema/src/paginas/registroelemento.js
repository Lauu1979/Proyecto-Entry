import React from "react"

const Registroelemen = () => {
  return (
<div>
  <div className="form-boox login">
    <i className="bx bxs-user" />
    <h1>APRENDIZ</h1>
  </div>
  <div className="container">
    <form action="/menu">
      <div className="user-details">
        <div className="fields">
          <div className="input-field">
            <label>Primer Nombre</label>
            <input type="text" placeholder="Digite su nombre" required />
          </div>
          <div className="input-field">
            <label>Segundo Nombre</label>
            <input type="text" placeholder="Digite su Segundo  nombre" required />
          </div>
          <div className="input-field">
            <label>Primer Apellido</label>
            <input type="text" placeholder="Digite su Apellido" required />
          </div>
          <div className="input-field">
            <label>Segundo Apellido</label>
            <input type="text" placeholder="Digite su Segundo  Apellido" required />
          </div>
          <div className="input-field">
            <label htmlFor="tipoDocumento">Tipo de Documento:</label>
            <select id="tipoDocumento" name="tipoDocumento">
              <option value="Cedulade Ciudadania">
                Cedula de Ciudadania
              </option>
              <option value="Tarjeta de Identidad">
                Tarjeta de Identidad
              </option>
              <option value="Extranjero">Extranjero</option>
              <option value="otro">Otro</option>
            </select>
          </div>
          <div className="input-field">
            <label>Numero De Documento</label>
            <input type="number" placeholder="Digite su Numero" required />
          </div>
          <div className="input-field">
            <label htmlFor="tipoSangre">Tipo de Sangre:</label>
            <select id="tipoSangre" name="tipoSangre">
              <option value="   O+">
                O+
              </option>
              <option value="   O-">
                O-
              </option>
              <option value="A+">A+</option>
              <option value="otro">Otro</option>
            </select>
          </div>
          <div className="input-field">
            <label htmlFor="tipoRecepcion">Tipo de Recepcion:</label>
            <select id="tipoRecepcion" name="tipoRecepcion">
              <option value="Cedulade Ciudadania">
                Peatonal
              </option>
              <option value="Tarjeta de Identidad">
                Vehicular
              </option>
            </select>
          </div>
          <div className="input-field">
            <label htmlFor="tipoFormacion">Programa de Formación:</label>
            <select id="tipoFormacion" name="tipoFormacion">
              <option value="ADSO">
                Analisis y Desarrollo de Software
              </option>
              <option value="Logistica">
                Logistica
              </option>
              <option value="Mercadeo">
                Mercadeoo
              </option>
              <option value="Otro">
                Otro
              </option>
            </select>
          </div>
          <div className="input-field">
            <label>Numero De Ficha</label>
            <input type="number" placeholder="Digite su Numero de Ficha" required />
          </div>
          <div className="input-field">
            <label htmlFor="tipoElemento">Tipo de Elemento:</label>
            <select id="tipoElemento" name="tipoElemento">
              <option value="Computador">
                Computador
              </option>
              <option value="Raquetas">
                Raquetas
              </option>
              <option value="Tablet">Tablet</option>
              <option value="otro">Otro</option>
            </select>
          </div>
          <button type="submit " className="botton">Guardar</button>
        </div>
      </div>
    </form></div></div>

  )
}

export default Registroelemen