from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from ...services.assessments import generate_test, score_resume, create_candidate
from ...core.database import get_db
from ...models.candidate import Candidate as CandidateModel
from ...schemas.candidate import CandidateCreate, Candidate
from ...schemas.assessment import AssessmentRequest, AssessmentResponse

router = APIRouter(prefix="/assessments", tags=["assessments"])

@router.post("/generate")
async def gen_test(request: AssessmentRequest):
    return generate_test(request.resume)

@router.post("/score", response_model=AssessmentResponse)
async def assess(request: AssessmentRequest):
    return score_resume(request.resume)

@router.post("/candidate", response_model=Candidate)
async def add_candidate(candidate: CandidateCreate, db: Session = Depends(get_db)):
    return create_candidate(db, candidate)
