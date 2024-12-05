from motor.motor_asyncio import AsyncIOMotorClient #Se utiliza para establecer conexion con mongo 
from fastapi import Depends
from pymongo import MongoClient

uri = "mongodb+srv://laurabohorquezpabon123:pBW3LjPURK95f3um@cluster0.4gmxd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

client = MongoClient(uri)

# Prueba de conexión
try:
    client.admin.command('ping')
    print("Conexión exitosa a MongoDB")
except Exception as e:
    print(f"Error en la conexión a MongoDB: {e}")



async def get_db():
    try:
        yield db
    finally: 
        pass