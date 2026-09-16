-- Run this in pgAdmin Query Tool connected to database: vikasportal
-- Server: localhost | Port: 5432 | User: postgres | Database: vikasportal

-- 1) Confirm you are in the right database
SELECT current_database();

-- 2) Create the Admin table (the API also creates this on startup)
CREATE TABLE IF NOT EXISTS public.admins (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(20),
    department VARCHAR(200),
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'ADMIN',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 3) Let the existing users table store multiple applicants
ALTER TABLE public.users DROP CONSTRAINT IF EXISTS users_phone_key;
ALTER TABLE public.users ALTER COLUMN phone DROP NOT NULL;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS organization VARCHAR(200);

-- 4) Verify tables
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN ('users', 'admins')
ORDER BY table_name;

-- 5) Inspect stored records
SELECT id, full_name, email, phone, organization, role, created_at FROM public.users ORDER BY id;
SELECT id, full_name, email, phone, department, role, is_active, created_at FROM public.admins ORDER BY id;
