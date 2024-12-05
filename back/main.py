from fastapi import FastAPI, Depends, HTTPException, Query
from models import Usuarios
from schemas import UsuarioCreate,PersonaAprendiz,PersonaFuncionario, PreRegistro,PersonaVisitante,EventoCreate,ElementoCreate,EstacionamientoCreate
from database import get_db
from fastapi.middleware.cors import CORSMiddleware
import bcrypt, logging

app = FastAPI()

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # frontend en React
    allow_credentials=True,
    allow_methods=["*"],  # Permitir todos los métodos (GET, POST, etc.)
    allow_headers=["*"],  # Permitir todos los encabezados
)

######################################  Insertar(POST)  ############################################
@app.get("/")
def read_root():
    return {"mensaje": "Entry-Solution funciona :)"}

# Endpoint para registrar un usuario
@app.post("/inicio_sesion/registro")
async def register_user(user: UsuarioCreate, db=Depends(get_db)):
    print(f"Datos recibidos: {user}")

    # Verificar si el usuario ya existe en la colección 'usuarios' por su número de documento
    usuario_existente = await db.Usuarios.find_one({"Email": user.Email})
    if usuario_existente:
        raise HTTPException(status_code=400, detail="La persona ya existe")

    # Encriptar la contraseña del usuario
    hashed_password = bcrypt.hashpw(user.Contrasenia.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    # Crear un nuevo usuario con los datos proporcionados y la contraseña encriptada
    nuevo_usuario = {
        "Nombres": user.Nombres,
        "Apellidos": user.Apellidos,
        "NumeroDocumento": user.NumeroDocumento,
        "Telefono": user.Telefono,
        "Email": user.Email,
        "Contrasenia": hashed_password,  # Almacenamos la contraseña en formato de string
    }

    # Insertar el nuevo usuario en la base de datos
    await db.Usuarios.insert_one(nuevo_usuario)
    return {"mensaje": "Usuario registrado exitosamente"}

###########################Endpoint para registrar un aprendiz#############################
@app.post("/aprendiz/registro")
async def register_aprendiz(user: PersonaAprendiz, db=Depends(get_db)):
    print(f"Datos recibidos para aprendiz: {user}")

    # Verificar si ya existe un aprendiz con el mismo número de documento
    aprendiz_existente = await db.Aprendices.find_one({"NumeroDocumento": user.NumeroDocumento})
    if aprendiz_existente:
        raise HTTPException(status_code=400, detail="El aprendiz ya existe")
    
    # Crear un nuevo Aprendiz con los datos proporcionados
    nuevo_aprendiz = {
         "Nombres": user.Nombres,
        "Apellidos": user.Apellidos,
        "TipoSangre": user.TipoSangre,
        "TipoDocumento": user.TipoDocumento,
        "NumeroDocumento": user.NumeroDocumento,
        "FichaFormacion": user.FichaFormacion,
        "ProgramaFormacion": user.ProgramaFormacion,
        "Estado": user.Estado,
        "Email": user.Email,
    }
   
    # Insertar los datos en la colección de la base de datos
    await db.Aprendices.insert_one(nuevo_aprendiz)
    return {"mensaje": "Aprendiz registrado exitosamente"}

###########################Endpoint para registrar un Funcionario#############################
@app.post("/funcionario/registro")
async def register_funcionario(user: PersonaFuncionario, db=Depends(get_db)):
    print(f"Datos recibidos para funcionario: {user}")

    # Verificar si ya existe un funcionario con el mismo número de documento
    funcionario_existente = await db.Funcionarios.find_one({"NumeroDocumento": user.NumeroDocumento})
    if funcionario_existente:
        raise HTTPException(status_code=400, detail="El funcionario ya existe")
    
    # Crear un nuevo Funcionario con los datos proporcionados
    nuevo_funcionario = {
        "Nombres": user.Nombres,
        "Apellidos": user.Apellidos,
        "TipoSangre": user.TipoSangre,
        "TipoDocumento": user.TipoDocumento,
        "NumeroDocumento": user.NumeroDocumento,
        "Area": user.Area,
        "Estado": user.Estado,
        "Email": user.Email,
    }

    # Insertar los datos en la colección de la base de datos
    await db.Funcionarios.insert_one(nuevo_funcionario)
    return {"mensaje": "Funcionario registrado exitosamente"}

###################### Endpoint para registrar  Visitante ################################
@app.post("/visitante/registro")
async def register_visitante(user: PersonaVisitante, db=Depends(get_db)):
    print(f"Datos recibidos para visitante: {user}")

    # Verificar si ya existe un visitante con el mismo número de documento
    visitante_existente = await db.Visitantes.find_one({"NumeroDocumento": user.NumeroDocumento})
    if visitante_existente:
        raise HTTPException(status_code=400, detail="El visitante ya existe")
    
    # Crear un nuevo visitante con los datos proporcionados
    nuevo_visitante = {
        "Nombres": user.Nombres,
        "Apellidos": user.Apellidos,
        "TipoSangre": user.TipoSangre,
        "TipoDocumento":user.TipoDocumento,
        "NumeroDocumento": user.NumeroDocumento,
        "LugarEstablecido": user.LugarEstablecido,
        "Estado": user.Estado,
        "Email": user.Email,
    }

    # Insertar los datos en la colección de la base de datos
    await db.Visitantes.insert_one(nuevo_visitante)
    return {"mensaje": "Visitante registrado exitosamente"}

########################Endpoint para registrar eventos ########################################
@app.post("/eventos/registro")
async def register_evento(evento: EventoCreate, db=Depends(get_db)):
    print(f"Datos recibidos para evento: {evento}")

    # Verificar si ya existe un evento con el mismo número de documento
    evento_existente = await db.Eventos.find_one({"NumeroDocumento": evento.NumeroDocumento})
    if evento_existente:
        raise HTTPException(status_code=400, detail="El evento ya existe")

    # Crear un nuevo evento con los datos proporcionados
    nuevo_evento =  {
        "Nombres": evento.Nombres,
        "Apellidos": evento.Apellidos,
        "TipoDocumento": evento.TipoDocumento,
        "NumeroDocumento": evento.NumeroDocumento,
        "Lugar":evento.Lugar,
        "Email": evento.Email,
        "TipoElemento": evento.TipoElemento,
        "TipoVehiculo": evento.TipoVehiculo,
        "Placa": evento.Placa,
        "fechaIngreso": evento.fechaIngreso,
        "fechaLimite": evento.fechaLimite,
        
    }

    # Insertar el nuevo evento en la base de datos
    await db.Eventos.insert_one(nuevo_evento)
    return {"mensaje": "Evento registrado exitosamente"}

######################## Endpoint para registrar Elementos ########################################
@app.post("/elementos/registro")
async def register_elemento(elemento: ElementoCreate, db=Depends(get_db)):
    print(f"Datos recibidos para el elemento: {elemento}")
    
    # Verificar si el elemento ya existe en la base de datos por su SerialElemento
    elemento_existente = await db.Elementos.find_one({"SerialElemento": elemento.SerialElemento})
    if (elemento_existente):
        raise HTTPException(status_code=400, detail="El elemento ya existe")
    
    # Crear un nuevo elemento con los datos proporcionados
    nuevo_elemento = {
        "TipoElemento": elemento.TipoElemento,
        "Color": elemento.Color,
        "CantidadElemento": elemento.CantidadElemento,
        "SerialElemento": elemento.SerialElemento,
    }
    
    # Insertar el nuevo elemento en la base de datos
    await db.Elementos.insert_one(nuevo_elemento)
    return {"mensaje": "Elemento registrado exitosamente"}

######################## Endpoint para registrar PreRegistros ########################################

@app.post("/PreRegistro/registro")
async def register_preregistro(preregistro: PreRegistro, db=Depends(get_db)):
    print(f"Datos recibidos para el elemento: {preregistro}")
    
    # Verificar si el elemento ya existe en la base de datos por su NumeroDocumento
    preregistro_existente = await db.PreRegistro.find_one({"NumeroDocumento": preregistro.NumeroDocumento})
    if preregistro_existente:
        raise HTTPException(status_code=400, detail="El usuario ya existe")
    
    # Crear un nuevo elemento con los datos proporcionados
    nuevo_preregistro = preregistro.dict()
    
    # Insertar el nuevo elemento en la base de datos
    await db.PreRegistro.insert_one(nuevo_preregistro)
    return {"mensaje": "Elemento registrado exitosamente"}

################################### Endpoint para registrar un nuevo espacio o vehículo en el parqueadero #######################
@app.post("/estacionamiento/registro")
async def registrar_estacionamiento(estacionamiento: EstacionamientoCreate, db=Depends(get_db)):
    print(f"Datos recibidos para el registro de estacionamiento: {estacionamiento}")

    # Verificar si el espacio ya existe
    espacio_existente = await db.Estacionamiento.find_one({"numeroEstacionamiento": estacionamiento.numeroEstacionamiento})
    if espacio_existente:
        raise HTTPException(status_code=400, detail="El espacio ya está registrado")

    # Crear el nuevo espacio con los datos proporcionados
    nuevo_espacio = {
        "numeroEstacionamiento": estacionamiento.numeroEstacionamiento,
        "tipoVehiculo": estacionamiento.tipoVehiculo,
        "placa": estacionamiento.placa,
        "Estado": estacionamiento.Estado
    }

    # Insertar el nuevo espacio en la base de datos
    await db.Estacionamiento.insert_one(nuevo_espacio)

    return {"mensaje": "Espacio registrado exitosamente"}


############################################ (Llamar) GET ############################################

# Endpoint para obtener el estado de todos los espacios de estacionamiento
@app.get("/estacionamiento")
async def get_all_estacionamientos(db=Depends(get_db)):
    print("Consultando todos los espacios de estacionamiento")

    # Buscar todos los espacios de estacionamiento en la base de datos
    espacios = await db.Estacionamiento.find().to_list(None)
    if not espacios:
        raise HTTPException(status_code=404, detail="No se encontraron espacios de estacionamiento")

    # Retornar la lista de espacios y sus estados
    return [{"numeroEstacionamiento": espacio["numeroEstacionamiento"], "Estado": espacio["Estado"]} for espacio in espacios]


############################### Usuario ##################################

@app.get("/inicio_sesion")
async def iniciar_sesion(
    Email: str = Query(..., description="El correo electrónico del usuario"),
    Contrasenia: str = Query(..., description="La contraseña"),
    db=Depends(get_db)
):
    usuario_existente = await db.Usuarios.find_one({"Email": Email})
    if not usuario_existente:
        raise HTTPException(status_code=400, detail="Usuario no encontrado")

    hashed_password = usuario_existente["Contrasenia"]
    if not bcrypt.checkpw(Contrasenia.encode('utf-8'), hashed_password.encode('utf-8')):
        raise HTTPException(status_code=400, detail="Contraseña incorrecta")

    return {"mensaje": "Inicio de sesión exitoso"}



############################### Mapeo Eventos ##################################
@app.get("/eventos")
async def get_eventos(db=Depends(get_db)):
    eventos = await db.Eventos.find().to_list(1000)
    for evento in eventos:
        evento["_id"] = str(evento["_id"])  # Convertir ObjectId a cadena
    return eventos

############################### Mapeo Aprendices ##################################
@app.get("/aprendiz")
async def get_aprendiz(db=Depends(get_db)):
    aprendices = await db.Aprendices.find().to_list(1000)
    for aprendiz in aprendices:
        aprendiz["_id"] = str(aprendiz["_id"])  # Convertir ObjectId a cadena
    return aprendices

############################### Mapeo Funcionarios ##################################
@app.get("/funcionario")
async def get_aprendiz(db=Depends(get_db)):
    funcionarios = await db.Funcionarios.find().to_list(1000)
    for funcionario in  funcionarios:
        funcionario["_id"] = str(funcionario ["_id"])  # Convertir ObjectId a cadena
    return  funcionarios

############################### Mapeo Visitantes##################################
@app.get("/visitantes")
async def get_aprendiz(db=Depends(get_db)):
    visitantes = await db.Visitantes.find().to_list(1000)
    for visitante in  visitantes:
        visitante["_id"] = str(visitante["_id"])  # Convertir ObjectId a cadena
    return  visitantes

############################### PreRegistro##################################
@app.get("/PreRegistro")
async def get_preregistro(db=Depends(get_db)):
    preregistros = await db.PreRegistro.find().to_list(1000)
    for preregistro in preregistros:
        preregistro["_id"] = str(preregistro["_id"])  # Convertir ObjectId a cadena
    return preregistros



@app.get("/PreRegistro/registro/buscar")
async def buscar_preregistro(documento: str, db=Depends(get_db)):
    preregistro = await db.PreRegistro.find_one({"NumeroDocumento": documento})
    if preregistro:
        preregistro["_id"] = str(preregistro["_id"])  # Convertir ObjectId a cadena
        return {"usuarioEncontrado": True, "nombres": preregistro["Nombres"], "apellidos": preregistro["Apellidos"]}
    else:
        return {"usuarioEncontrado": False, "nombres": "", "apellidos": ""}