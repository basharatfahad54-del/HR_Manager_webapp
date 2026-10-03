from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class CandidateBase(BaseModel):
    name: str
    email: str
    resume: str

class CandidateCreate(CandidateBase):
    pass

class Candidate(CandidateBase):
    id: int
    score: Optional[float]
    skills: Optional[str]
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
