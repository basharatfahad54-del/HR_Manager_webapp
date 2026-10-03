from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api.v1 import auth, hr, chat, assessments
from .core.database import Base, engine
# from .routers import *  # Removed due to unresolved import error

Base.metadata.create_all(bind=engine)  # Tables

app = FastAPI(title="HR AI Manager API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5500"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/v1")
app.include_router(hr.router, prefix="/api/v1")
app.include_router(chat.router, prefix="/api/v1")
app.include_router(assessments.router, prefix="/api/v1")

@app.get("/")
def root():
    return {"msg": "HR AI Backend v1.0 - Ready!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)

