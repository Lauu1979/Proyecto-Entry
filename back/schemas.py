from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class UsuarioCreate(BaseModel):
    Nombres: str
    Apellidos: str
    NumeroDocumento: str  # Si necesitas mantenerlo como string
    Telefono: Optional[str] = None  # Permitir valores nulos u opcionales si necesario
    Email: str
    Contraseña: str

class UsuarioLogin(BaseModel):
    Email: str
    Contraseña: str

class UsuarioUpdate(BaseModel):
    Nombres: Optional[str] = None
    Apellidos: Optional[str] = None
    Telefono: Optional[int] = None
    Email: Optional[str] = None
    Contraseña: Optional[str] = None



class PersonaCreate(BaseModel):
    Nombres: str
    Apellidos: str
    TipoSangre: str
    TipoDocumento: str
    NumeroDocumento: str
    Rol: str
    FichaFormacion: Optional[str] = None
    ProgramaFormacion: str
    Estado: str
    LugarEstablecido: Optional[str] = None
    email: str
    

class EventoCreate(BaseModel):
    Nombres: str
    Apellidos: str
    TipoDocumento: str
    NumeroDocumento: str
    email: str
    TipoElemento: Optional[str] = None
    TipoVehiculo: Optional[str] = None
    fechaIngreso: datetime
    fechaLimite: datetime
    LugarEstablecido: str


from pydantic import BaseModel

class ParqueaderoCreate(BaseModel):
    numeroEstacionamiento: str
    tipoVehiculo: str
    placa: str
    estado: str
    fechaIngreso: str
    fechaLimite: str
    lugarEstablecido: str



class ElementoCreate(BaseModel):
    TipoElemento: str
    CantidadElemento: int
    SerialElemento: str
    
################################################
from pydantic import BaseModel
from typing import Optional

class UsuarioUpdate(BaseModel):
    Nombres: Optional[str]
    Apellidos: Optional[str]
    NumeroDocumento: Optional[str]
    Telefono: Optional[str]
    Email: Optional[str]
    Contraseña: Optional[str]

  

 

    

