from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ...services.hr_analytics import get_analytics
from ...core.database import get_db

router = APIRouter(prefix="/hr", tags=["hr"])

@router.get("/analytics")
async def analytics(db: Session = Depends(get_db)):
    return get_analytics(db)
