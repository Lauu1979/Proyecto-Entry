from fastapi import APIRouter, Depends, HTTPException
from database import get_db
from schemas import UsuarioCreate , EventoCreate , ElementoCreate, UsuarioUpdate
from models import Usuarios,Personas,Eventos , Elementos
from datetime import datetime, timedelta
import bcrypt

router = APIRouter()



###################################### GET ############################################

############################# Obtener Personas ##############################

# Endpoint para obtener una persona (Aprendiz, Funcionario, Visitante) por Número de Documento
@router.get("/personas/{NumeroDocumento}", response_model=PersonaCreate)
async def get_persona(NumeroDocumento: int, db=Depends(get_db)):
    # Buscar si la persona existe en la colección por Número de Documento
    persona = await db["Personas"].find_one({"NumeroDocumento": NumeroDocumento})
    if not persona:
        raise HTTPException(status_code=404, detail="Persona no encontrada")

    # Retornar los datos de la persona encontrada
    return persona


###############

# Endpoint para obtener eventos por Número de Documento
@router.get("/eventos/{NumeroDocumento}", response_model=list[EventoCreate])
async def get_eventos_por_persona(NumeroDocumento: str, db=Depends(get_db)):
    # Buscar eventos asociados al Número de Documento
    eventos = await db.Eventos.find({"NumeroDocumento": NumeroDocumento}).to_list(length=100)
    if not eventos:
        raise HTTPException(status_code=404, detail="No se encontraron eventos para esta persona")

    # Retornar los eventos asociados
    return eventos

# Endpoint para obtener un elemento por Serial
@router.get("/elementos/{SerialElemento}", response_model=ElementoCreate)
async def get_elemento_por_serial(SerialElemento: str, db=Depends(get_db)):
    # Buscar el elemento en la base de datos por el número de serie
    elemento = await db.Elementos.find_one({"SerialElemento": SerialElemento})
    if not elemento:
        raise HTTPException(status_code=404, detail="Elemento no encontrado")

    # Retornar el elemento encontrado
    return elemento


from fastapi import APIRouter, Depends, HTTPException
from typing import Optional
from database import get_db

router = APIRouter()

############################################ Reportes ############################################

# Endpoint para generar reportes de personas
@router.get("/reportes/personas")
async def generar_reporte_personas(
    tipo: Optional[str] = None,
    rol: Optional[str] = None,
    ubicacion: Optional[str] = None,
    db=Depends(get_db)
):
    # Construir el filtro de búsqueda
    filtro = {}
    
    if tipo:
        filtro["TipoDocumento"] = tipo
    if rol:
        filtro["Rol"] = rol
    if ubicacion:
        filtro["LugarEstablecido"] = ubicacion

    # Consultar las personas en la base de datos según los filtros
    personas = await db.Personas.find(filtro).to_list(None)

    if not personas:
        raise HTTPException(status_code=404, detail="No se encontraron personas con los criterios proporcionados")

    # Retornar el reporte con las personas encontradas
    return {"personas": personas}

from fastapi import APIRouter, Depends, HTTPException
from database import get_db

router = APIRouter()




######################################## Actualizar #######################################
########## Actualizar Usuario ####

# Endpoint para actualizar un usuario
@router.put("/usuarios/{NumeroDocumento}")
async def update_usuario(NumeroDocumento: str, usuario_update: UsuarioUpdate, db=Depends(get_db)):
    # Buscar el usuario en la colección por Número de Documento
    usuario = await db.Usuarios.find_one({"NumeroDocumento": NumeroDocumento})
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    
    # Convertir los datos a un diccionario, ignorando los valores nulos
    usuario_update_data = usuario_update.dict(exclude_unset=True)

    # Si se proporciona una nueva contraseña, encriptarla antes de actualizar
    if "Contraseña" in usuario_update_data:
        usuario_update_data["Contraseña"] = bcrypt.hashpw(usuario_update_data["Contraseña"].encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    # Actualizar el usuario en la base de datos
    await db.Usuarios.update_one({"NumeroDocumento": NumeroDocumento}, {"$set": usuario_update_data})

    # Retornar el usuario actualizado
    usuario_actualizado = await db.Usuarios.find_one({"NumeroDocumento": NumeroDocumento}) 
    return {"usuario_actualizado": usuario_actualizado, "mensaje": "Usuario actualizado exitosamente"}



############################################ Actualizar Personas ######################################

# Endpoint para actualizar una persona
@router.put("/personas/{NumeroDocumento}")
async def update_persona(NumeroDocumento: str, user: PersonaCreate, db=Depends(get_db)):
    print(f"Actualizando datos para la persona con NumeroDocumento: {NumeroDocumento}")

    # Verificar si la persona existe
    persona_existente = await db.Personas.find_one({"NumeroDocumento": NumeroDocumento})
    if not persona_existente:
        raise HTTPException(status_code=404, detail="Persona no encontrada")

    # Actualizar los datos de la persona con la información proporcionada
    update_data = {key: value for key, value in user.dict().items() if value is not None}

    # Actualizar la persona en la base de datos
    await db.Personas.update_one(
        {"NumeroDocumento": NumeroDocumento}, {"$set": update_data}
    )

    # Retornar la persona actualizada
    persona_actualizada = await db.Personas.find_one({"NumeroDocumento": NumeroDocumento})
    return {"persona_actualizada": persona_actualizada,
             "mensaje": "Información de la persona actualizada exitosamente"}


############################################ Actualizar Eventos ######################################

# Endpoint para actualizar un evento
@router.put("/eventos/{id}")
async def update_evento(id: str, evento: EventoCreate, db=Depends(get_db)):
    print(f"Actualizando evento con ID: {id}")

    # Convertir ID a ObjectId
    evento_id = ObjectId(id)

    # Verificar si el evento existe
    evento_existente = await db.Eventos.find_one({"_id": evento_id})
    if not evento_existente:
        raise HTTPException(status_code=404, detail="Evento no encontrado")

    # Filtrar los datos que fueron enviados para evitar valores None
    update_data = {key: value for key, value in evento.dict().items() if value is not None}

    # Actualizar el evento en la base de datos
    await db.Eventos.update_one(
        {"_id": evento_id}, {"$set": update_data}
    )

    # Retornar el evento actualizado
   
############################################ Actualizar Estado de Estacionamiento ######################################

# Endpoint para actualizar el estado de un espacio de estacionamiento
@router.put("/estacionamiento/{numeroEstacionamiento}")
async def update_estacionamiento(numeroEstacionamiento: str, estado: str, db=Depends(get_db)):
    print(f"Actualizando estado del espacio de estacionamiento con número: {numeroEstacionamiento}")

    # Verificar si el espacio de estacionamiento existe
    espacio_existente = await db.Parqueadero.find_one({"numeroEstacionamiento": numeroEstacionamiento})
    if not espacio_existente:
        raise HTTPException(status_code=404, detail="Espacio de estacionamiento no encontrado")

    # Validar el estado recibido (debe ser "ocupado" o "vacío")
    if estado not in ["ocupado", "vacío"]:
        raise HTTPException(status_code=400, detail="Estado inválido. Debe ser 'ocupado' o 'vacío'")

    # Actualizar el estado del espacio de estacionamiento
    await db.Parqueadero.update_one(
        {"numeroEstacionamiento": numeroEstacionamiento}, {"$set": {"estado": estado}}
    )

    # Retornar el espacio de estacionamiento actualizado
    espacio_actualizado = await db.Parqueadero.find_one({"numeroEstacionamiento": numeroEstacionamiento})
    return {"numeroEstacionamiento": espacio_actualizado["numeroEstacionamiento"], "estado": espacio_actualizado["estado"]}


############################################ Actualizar Elementos ######################################

# Endpoint para actualizar un elemento
@router.put("/elementos/{SerialElemento}")
async def update_elemento(SerialElemento: str, tipoElemento: str, cantidadElemento: int, db=Depends(get_db)):
    print(f"Actualizando información del elemento con Serial: {SerialElemento}")

    # Verificar si el elemento existe
    elemento_existente = await db.Elementos.find_one({"SerialElemento": SerialElemento})
    if not elemento_existente:
        raise HTTPException(status_code=404, detail="Elemento no encontrado")

    # Actualizar la información del elemento
    await db.Elementos.update_one(
        {"SerialElemento": SerialElemento},
        {"$set": {"TipoElemento": tipoElemento, "CantidadElemento": cantidadElemento}}
    )

    # Retornar el elemento actualizado
    elemento_actualizado = await db.Elementos.find_one({"SerialElemento": SerialElemento})
    return {"elemento_actualizado": elemento_actualizado, "mensaje": f"Elemento con Serial {SerialElemento} actualizado exitosamente"}

######################################## Eliminar #########################################
from fastapi import APIRouter, Depends, HTTPException
from database import get_db

router = APIRouter()

################# Eliminar Usuario #########

# Endpoint para eliminar un usuario
@router.delete("/usuarios/{NumeroDocumento}")
async def delete_usuario(NumeroDocumento: str, db=Depends(get_db)):
    # Buscar si el usuario existe en la colección por Número de Documento
    usuario = await db.Usuarios.find_one({"NumeroDocumento": NumeroDocumento})
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")

    # Eliminar el usuario de la base de datos
    await db.Usuarios.delete_one({"NumeroDocumento": NumeroDocumento})
    
    return {"mensaje": "Usuario eliminado exitosamente"}
from fastapi import APIRouter, Depends, HTTPException
from database import get_db
from bson import ObjectId

router = APIRouter()

############################################ Eliminar Evento ######################################

# Endpoint para eliminar un evento
@router.delete("/eventos/{id}")
async def delete_evento(id: str, db=Depends(get_db)):
    print(f"Eliminando evento con id: {id}")

    # Convertir ID a ObjectId
    evento_id = ObjectId(id)

    # Verificar si el evento existe
    evento_existente = await db.Eventos.find_one({"_id": evento_id})
    if not evento_existente:
        raise HTTPException(status_code=404, detail="Evento no encontrado")

    # Eliminar el evento de la base de datos
    await db.Eventos.delete_one({"_id": evento_id})

    return {"mensaje": f"Evento con id {id} eliminado exitosamente"}

############################################ Eliminar Elemento ######################################

# Endpoint para eliminar un elemento
@router.delete("/elementos/{SerialElemento}")
async def delete_elemento(SerialElemento: str, db=Depends(get_db)):
    print(f"Eliminando elemento con SerialElemento: {SerialElemento}")

    # Verificar si el elemento existe
    elemento_existente = await db.Elementos.find_one({"SerialElemento": SerialElemento})
    if not elemento_existente:
        raise HTTPException(status_code=404, detail="Elemento no encontrado")
    # Eliminar el elemento de la base de datos
    await db.Elementos.delete_one({"SerialElemento": SerialElemento})

    return {"mensaje": f"Elemento con SerialElemento {SerialElemento} eliminado exitosamente"}

































