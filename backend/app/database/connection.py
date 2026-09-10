import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.database.base import Base

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:root%40123@localhost:5432/vikasportal"
)

# Initialize engine (with fallback handling if Postgres is not yet created)
try:
    engine = create_engine(DATABASE_URL, pool_pre_ping=True)
except Exception as e:
    engine = None

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
