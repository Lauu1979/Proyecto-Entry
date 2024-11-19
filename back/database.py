from motor.motor_asyncio import AsyncIOMotorClient #Se utiliza para establecer conexion con mongo 
from fastapi import Depends
from pymongo import MongoClient


MONGODB_URL = "mongodb://localhost:27017/Entry-Solution"

client = AsyncIOMotorClient(MONGODB_URL)
db = client["Entry-Solution"]



async def get_db():
    try:
        yield db
    finally: 
        client.close()