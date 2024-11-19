from motor.motor_asyncio import AsyncIOMotorClient #Se utiliza para establecer conexion con mongo 
from pydantic import BaseModel, Field #para hacer que MongoDB reconozca el campo _id
from bson import ObjectId
from typing import Optional, List
from datetime import datetime


#Conexion base de datos 
client = AsyncIOMotorClient ("mongodb://localhost:27017/Entry-Solution")
database = client["Entry-Solution"]


#Validaciones
class Usuarios(BaseModel):
    id: Optional[str] = Field(alias="_id") 
    Usuario:str
    contraseña:str
    Nombres: str
    Apellidos: str
    NumeroDocumento: int
    Telefono: int
    Email: str
      


class Personas:
    def __init__(self, Nombres, Apellidos, TipoSangre, NumeroDocumento, FichaFormacion, ProgramaFormacion, Estado, email):
        self.Nombres = Nombres
        self.Apellidos = Apellidos
        self.TipoSangre = TipoSangre
        self.NumeroDocumento = NumeroDocumento
        self.FichaFormacion = FichaFormacion
        self.ProgramaFormacion = ProgramaFormacion
        self.Estado = Estado
        self.email = email

class Eventos:
    def __init__(self, fechaIngreso, fechaLimite, LugarEstablecido):
    
        self.fechaIngreso = fechaIngreso
        self.fechaLimite = fechaLimite
        self.LugarEstablecido = LugarEstablecido


class Parqueadero:
    def __init__(self, numeroEstacionamiento, tipoVehiculo, placa, estado, fechaIngreso, fechaLimite, lugarEstablecido):
        self.numeroEstacionamiento = numeroEstacionamiento
        self.tipoVehiculo = tipoVehiculo
        self.placa = placa
        self.estado = estado
        self.fechaIngreso = fechaIngreso
        self.fechaLimite = fechaLimite
        self.lugarEstablecido = lugarEstablecido


class Elementos:
    def __init__(self, TipoElemento, CantidadElemento, SerialElemento):
        self.TipoElemento = TipoElemento
        self.CantidadElemento = CantidadElemento
        self.SerialElemento = SerialElemento



"""
class Flujo (BaseModel):
    id: Optional[str] = Field(alias="_id") 
    horaIngreso:int
    horaSalida:int
    fechaSalida:int
    fechaIngreso:int
    estado:str



    




"""