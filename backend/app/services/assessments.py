from openai import OpenAI
from sqlalchemy.orm import Session
from ..core.config import settings
from ..core.database import get_db
from ..models.candidate import Candidate as CandidateModel
from ..schemas.candidate import CandidateCreate

client = OpenAI(api_key=settings.openrouter_api_key, base_url="https://openrouter.ai/api/v1")

def generate_test(resume: str) -> dict:
    response = client.chat.completions.create(
        model="openai/gpt-3.5-turbo",
        messages=[{"role": "user", "content": f"Generate 5-question test for resume: {resume}"}]
    )
    return {"test": response.choices[0].message.content}

def score_resume(resume: str) -> dict:
    response = client.chat.completions.create(
        model="openai/gpt-3.5-turbo",
        messages=[{"role": "user", "content": f"Score 0-100 and list skills for: {resume}. JSON format."}]
    )
    content = response.choices[0].message.content
    # Parse simple
    score = float(content.split()[0]) if content.split()[0].replace('.', '').isdigit() else 75.0
    skills = ["Python", "HR"]  # Parse real
    return {"score": score, "skills": skills, "recommend": "Interview" if score > 80 else "Review"}

def create_candidate(db: Session, candidate: CandidateCreate):
    db_candidate = CandidateModel(**candidate.dict())
    db.add(db_candidate)
    db.commit()
    db.refresh(db_candidate)
    return db_candidate
