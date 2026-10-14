import os
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from app.database.base import Base

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:root%40123@localhost:5432/vikasportal"
)

def get_engine():
    # 1. Try PostgreSQL if configured
    if DATABASE_URL and (DATABASE_URL.startswith("postgresql://") or DATABASE_URL.startswith("postgres://")):
        try:
            pg_engine = create_engine(
                DATABASE_URL,
                pool_pre_ping=True,
                connect_args={"connect_timeout": 2}
            )
            with pg_engine.connect() as conn:
                conn.execute(text("SELECT 1"))
            print("[Database] PostgreSQL connected successfully.")
            return pg_engine
        except Exception as e:
            print(f"[Database] PostgreSQL connection failed or timed out: {e}")
            print("[Database] Falling back to SQLite database.")

    # 2. SQLite fallback
    backend_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    sqlite_path = os.path.join(backend_dir, "vikasportal.db")
    sqlite_url = f"sqlite:///{sqlite_path}"
    sqlite_engine = create_engine(sqlite_url, connect_args={"check_same_thread": False})
    print(f"[Database] SQLite engine initialized: {sqlite_url}")
    return sqlite_engine

try:
    engine = get_engine()
except Exception as e:
    engine = None
    print(f"[Database] Engine init failed completely: {e}")

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
        print("[Database] Skipping init_db — engine is not available.")
        return False

    try:
        from app.database.models import UserDB, AdminDB  # noqa: F401
        Base.metadata.create_all(bind=engine)
        if engine.dialect.name == "postgresql":
            with engine.begin() as conn:
                conn.execute(text("ALTER TABLE users DROP CONSTRAINT IF EXISTS users_phone_key"))
                conn.execute(text("ALTER TABLE users ALTER COLUMN phone DROP NOT NULL"))
                conn.execute(text(
                    "ALTER TABLE users ADD COLUMN IF NOT EXISTS organization VARCHAR(200)"
                ))
        print(f"[Database] Connected. Tables ready on {engine.dialect.name}: users, admins")
        return True
    except Exception as e:
        print(f"[Database] init_db failed: {e}")
        return False


# Prepare tables as soon as the backend process imports this module
init_db()

