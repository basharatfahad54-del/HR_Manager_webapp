from sqlalchemy.orm import Session
from ..models.candidate import Candidate

def get_analytics(db: Session):
    total_candidates = db.query(Candidate).count()
    high_scores = db.query(Candidate).filter(Candidate.score > 80).count()
    return {
        "total_candidates": total_candidates,
        "hires_ready": high_scores,
        "avg_score": 85.5  # Query avg real
    }
