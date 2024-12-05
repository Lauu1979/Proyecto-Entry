from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class UsuarioCreate(BaseModel):
    Nombres: str
    Apellidos: str
    NumeroDocumento: str  # Si necesitas mantenerlo como string
    Telefono: Optional[str] = None  # Permitir valores nulos u opcionales si necesario
    Email: str
    Contrasenia: str


class UsuarioLogin(BaseModel):
    Email: str
    Contrasenia: str

class Usuario(BaseModel):
    id: Optional[str] = Field(alias="_id")
    Contrasenia: str
    Nombres: str
    Apellidos: str
    NumeroDocumento: str  # Asegurarse de que el tipo sea consistente
    Telefono: Optional[str] = None  # Permitir valores nulos u opcionales si necesario
    Email: str

class UsuarioUpdate(BaseModel):
    Nombres: Optional[str] = None
    Apellidos: Optional[str] = None
    Telefono: Optional[int] = None
    Email: Optional[str] = None
    Contrasenia: Optional[str] = None



class PersonaAprendiz(BaseModel):
    Nombres: str
    Apellidos: str
    TipoSangre: str
    TipoDocumento: str
    NumeroDocumento: str
    FichaFormacion: Optional[str] = None
    ProgramaFormacion: str
    Estado: str
    Email: str

class PreRegistro(BaseModel):
    Nombres: str
    Apellidos: str
    TipoSangre: str
    TipoDocumento: str
    NumeroDocumento: str
    FichaFormacion: Optional[str] = None
    ProgramaFormacion: str
    Estado: str
    Email: str

class PersonaFuncionario(BaseModel):
    Nombres: str
    Apellidos: str
    TipoSangre: str
    TipoDocumento: str
    NumeroDocumento: str
    Area: str
    Estado: str
    Email: str

class PersonaVisitante(BaseModel):
    Nombres: str
    Apellidos: str
    TipoSangre: str
    TipoDocumento: str
    NumeroDocumento: str
    LugarEstablecido: str
    Estado: str
    Email: str


    

class EventoCreate(BaseModel): 
    Nombres: str 
    Apellidos: str 
    TipoDocumento: str 
    NumeroDocumento: str 
    Lugar: str 
    Email: str 
    TipoElemento: Optional[str] = None 
    TipoVehiculo: Optional[str] = None 
    Placa: Optional[str] = None 
    fechaIngreso: datetime 
    fechaLimite:datetime 




class EstacionamientoCreate(BaseModel):
    numeroEstacionamiento: str
    tipoVehiculo: str
    placa: str
    Estado:str



class ElementoCreate(BaseModel):
    TipoElemento: str
    Color: str
    CantidadElemento: int
    SerialElemento: str
    
################################################


class UsuarioUpdate(BaseModel):
    Nombres: Optional[str]
    Apellidos: Optional[str]
    NumeroDocumento: Optional[str]
    Telefono: Optional[str]
    Email: Optional[str]
    Contraseña: Optional[str]

  

 

    

