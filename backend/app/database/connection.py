import os
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from app.database.base import Base

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:root%40123@localhost:5432/vikasportal"
)

try:
    engine = create_engine(DATABASE_URL, pool_pre_ping=True)
except Exception as e:
    engine = None
    print(f"[PostgreSQL] Engine init failed: {e}")

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


def init_db():
    """
    Create missing tables (users, admins) and relax the unique phone constraint
    so multiple registered applicants can be stored.
    """
    if engine is None:
        print("[PostgreSQL] Skipping init_db — engine is not available.")
        return False

    try:
        from app.database.models import UserDB, AdminDB  # noqa: F401
        Base.metadata.create_all(bind=engine)
        with engine.begin() as conn:
            conn.execute(text("ALTER TABLE users DROP CONSTRAINT IF EXISTS users_phone_key"))
            conn.execute(text("ALTER TABLE users ALTER COLUMN phone DROP NOT NULL"))
            conn.execute(text(
                "ALTER TABLE users ADD COLUMN IF NOT EXISTS organization VARCHAR(200)"
            ))
        print("[PostgreSQL] Connected. Tables ready: users, admins")
        return True
    except Exception as e:
        print(f"[PostgreSQL] init_db failed: {e}")
        return False


# Prepare tables as soon as the backend process imports this module
init_db()
