from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from passlib.context import CryptContext

router = APIRouter()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# fake DB
users_db = {}

class RegisterRequest(BaseModel):
    username: str
    password: str

class LoginRequest(BaseModel):
    username: str
    password: str

@router.post("/register")
def register(req: RegisterRequest):
    if req.username in users_db:
        raise HTTPException(status_code=400, detail="User exists")
    hashed_pw = pwd_context.hash(req.password)
    users_db[req.username] = hashed_pw
    return {"msg": "User registered"}

@router.post("/login")
def login(req: LoginRequest):
    hashed_pw = users_db.get(req.username)
    if not hashed_pw or not pwd_context.verify(req.password, hashed_pw):
        raise HTTPException(status_code=401, detail="Invalid creds")
    return {"msg": "Login successful"}
