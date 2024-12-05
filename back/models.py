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
    Contrasenia:str
    Nombres: str
    Apellidos: str
    NumeroDocumento: int
    Telefono: int
    Email: str
      
class Funcionarios:
    def __init__(self, Nombres, Apellidos, TipoSangre,TipoDocumento, NumeroDocumento, Area, Estado, Email):
        self.Nombres = Nombres
        self.Apellidos = Apellidos
        self.TipoSangre = TipoSangre
        self.TipoDocumento = TipoDocumento
        self.NumeroDocumento = NumeroDocumento
        self.Area = Area
        self.Estado = Estado
        self.Email = Email


class Aprendices:
    def __init__(self, Nombres, Apellidos, TipoSangre, TipoDocuemnto,NumeroDocumento, FichaFormacion, ProgramaFormacion,Estado, Email):
        self.Nombres = Nombres
        self.Apellidos = Apellidos
        self.TipoSangre = TipoSangre
        self.TipopDocumento = TipoDocuemnto
        self.NumeroDocumento = NumeroDocumento        
        self.FichaFormacion = FichaFormacion
        self.ProgramaFormacion = ProgramaFormacion
        self.Estado = Estado
        self.Email = Email

class PreRegistro:
    def __init__(self, Nombres, Apellidos, TipoSangre, TipoDocuemnto,NumeroDocumento, FichaFormacion, ProgramaFormacion,Estado, Email):
        self.Nombres = Nombres
        self.Apellidos = Apellidos
        self.TipoSangre = TipoSangre
        self.TipopDocumento = TipoDocuemnto
        self.NumeroDocumento = NumeroDocumento        
        self.FichaFormacion = FichaFormacion
        self.ProgramaFormacion = ProgramaFormacion
        self.Estado = Estado
        self.Email = Email

class Visitantes:
    def __init__(self, Nombres, Apellidos, TipoSangre, TipoDocuemento,NumeroDocumento, LugarEstablecido,Estado, Email):
        self.Nombres = Nombres
        self.Apellidos = Apellidos
        self.TipoSangre = TipoSangre
        self.TipopDocumento = TipoDocuemento
        self.NumeroDocumento = NumeroDocumento        
        self.LugarEstablecido = LugarEstablecido
        self.Estado = Estado
        self.Email = Email

class Eventos:
    def __init__(self,Nombres,Apellidos, TipoDocumento, NumeroDocumento, Lugar,Email, TipoElemento,  TipoVehiculo, Placa, fechaIngreso, fechaLimite):

        
        self.Nombres = Nombres
        self.Apellidos = Apellidos
        self.TipoDocumento =TipoDocumento
        self.NumeroDocumento = NumeroDocumento
        self.Lugar = Lugar 
        self.Email = Email
        self.TipoElemento = TipoElemento
        self.TipoVehiculo = TipoVehiculo
        self.Placa = Placa
        self.fechaIngreso = fechaIngreso
        self.fechaLimite = fechaLimite
       

class Estacionamiento:
    def __init__(self, numeroEstacionamiento, tipoVehiculo, placa, Estado):
        self.numeroEstacionamiento = numeroEstacionamiento
        self.tipoVehiculo = tipoVehiculo
        self.placa = placa
        self.Estado = Estado
     


class Elementos:
    def __init__(self, TipoElemento,Color, CantidadElemento, SerialElemento):
        self.TipoElemento = TipoElemento
        self.Color = Color
        self.CantidadElemento = CantidadElemento
        self.SerialElemento = SerialElemento