import os
from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv()

class Settings(BaseSettings):
    openrouter_api_key: str = os.getenv("OPENROUTER_API_KEY")
    database_url: str = os.getenv("DATABASE_URL", "sqlite:///hr.db")
    secret_key: str = os.getenv("SECRET_KEY", "dev-secret")
    api_v1_str: str = "/api/v1"

    class Config:
        env_file = ".env"

settings = Settings()
