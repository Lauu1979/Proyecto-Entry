from fastapi import FastAPI
from models import Usuarios
from schemas import UsuarioCreate
from database import get_db
from fastapi import Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import bcrypt

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
    usuario_existente = await db.Usuarios.find_one({"NumeroDocumento": user.NumeroDocumento})
    if usuario_existente:
        raise HTTPException(status_code=400, detail="La persona ya existe")

    # Encriptar la contraseña del usuario
    hashed_password = bcrypt.hashpw(user.Contraseña.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    # Crear un nuevo usuario con los datos proporcionados y la contraseña encriptada
    nuevo_usuario = {
        "Nombres": user.Nombres,
        "Apellidos": user.Apellidos,
        "NumeroDocumento": user.NumeroDocumento,
        "Telefono": user.Telefono,
        "Email": user.Email,
        "Contraseña": hashed_password,  # Almacenamos la contraseña en formato de string
    }

    # Insertar el nuevo usuario en la base de datos
    await db.Usuarios.insert_one(nuevo_usuario)
    return {"mensaje": "Usuario registrado exitosamente"}
