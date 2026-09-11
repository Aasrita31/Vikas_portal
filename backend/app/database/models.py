from sqlalchemy import Column, Integer, String, Date, DateTime
from datetime import datetime
from app.database.base import Base

class UserDB(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    full_name = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, nullable=False, index=True)
    phone = Column(String(20), nullable=False)
    password_hash = Column(String(255), nullable=False)
    date_of_birth = Column(Date, nullable=True)
    role = Column(String(20), default="APPLICANT")
    created_at = Column(DateTime, default=datetime.utcnow)
