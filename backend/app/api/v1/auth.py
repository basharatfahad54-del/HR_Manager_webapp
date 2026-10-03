from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer

router = APIRouter(prefix="/auth", tags=["auth"])
security = HTTPBearer()

@router.post("/login")
async def login(username: str = "hr", password: str = "admin"):
    if username == "hr" and password == "admin":
        return {"token": "dummy-jwt-token"}  # Prod: JWT
    raise HTTPException(401, "Invalid creds")
