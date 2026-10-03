from pydantic import BaseModel

class AssessmentRequest(BaseModel):
    resume: str

class AssessmentResponse(BaseModel):
    score: float
    skills: list[str]
    recommend: str
