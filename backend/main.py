from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from tortoise.contrib.fastapi import register_tortoise
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from pydantic import BaseModel
from models import User
import os
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

app.add_middleware(
           CORSMiddleware,
           allow_origins=["http://localhost:3000"],
           allow_credentials=True,
           allow_methods=["GET", "POST", "OPTIONS"],
           allow_headers=["*"],
       )

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")
SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

class UserCreate(BaseModel):
           name: str
           email: str
           password: str
           role: str

class UserOut(BaseModel):
           id: int
           email: str
           role: str

class Token(BaseModel):
           token: str

class LoginRequest(BaseModel):
           email: str
           password: str

async def get_current_user(token: str = Depends(oauth2_scheme)):
           try:
               payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
               user_id: int = payload.get("sub")
               if user_id is None:
                   raise HTTPException(status_code=401, detail="Invalid token")
               user = await User.get_or_none(id=user_id)
               if user is None:
                   raise HTTPException(status_code=401, detail="User not found")
               return user
           except JWTError:
               raise HTTPException(status_code=401, detail="Invalid token")

def create_access_token(data: dict):
           to_encode = data.copy()
           expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
           to_encode.update({"exp": expire})
           return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@app.post("/register", response_model=UserOut)
async def register(user: UserCreate):
           if user.role not in ["buyer", "seller"]:
               raise HTTPException(status_code=400, detail="Invalid role")
           if await User.get_or_none(email=user.email):
               raise HTTPException(status_code=400, detail="Email already registered")
           hashed_password = pwd_context.hash(user.password)
           db_user = await User.create(
               name=user.name,
               email=user.email,
               password_hash=hashed_password,
               role=user.role
           )
           return {"id": db_user.id, "email": db_user.email, "role": db_user.role}

@app.post("/login", response_model=Token)
async def login(login_data: LoginRequest):
           user = await User.get_or_none(email=login_data.email)
           if not user or not pwd_context.verify(login_data.password, user.password_hash):
               raise HTTPException(status_code=401, detail="Invalid credentials")
           token = create_access_token(data={"sub": str(user.id)})
           return {"token": token}

@app.get("/me", response_model=UserOut)
async def get_me(current_user: User = Depends(get_current_user)):
           return {"id": current_user.id, "email": current_user.email, "role": current_user.role}

@app.post("/logout")
async def logout():
           return {"message": "Logged out"}

register_tortoise(
           app,
           db_url=os.getenv("DATABASE_URL"),
           modules={"models": ["models"]},
           generate_schemas=False,
       )