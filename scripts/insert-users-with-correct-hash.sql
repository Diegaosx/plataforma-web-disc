-- Inserir usuários com hashes corretos
-- Primeiro, deletar usuários existentes se houver
DELETE FROM "users" WHERE "email" IN ('admin@dezorzi.com', 'consultant@dezorzi.com', 'client@empresa.com');

-- Inserir usuários com senhas corretas
INSERT INTO "users" ("id", "name", "email", "password", "role", "company_id", "created_at", "updated_at") 
VALUES 
    ('admin-user-1', 'Administrador', 'admin@dezorzi.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'ADMIN', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('consultant-user-1', 'Consultor', 'consultant@dezorzi.com', '$2a$10$ILOxAVrJCvv5MWK/XslmH.rrKwLpFzD7G5hPWw5K8tEKHMAXu1jAi', 'CONSULTANT', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('client-user-1', 'Cliente', 'client@empresa.com', '$2a$10$DEzK0UZSYe1Pn81.m8JzAOStkqhkDxRJAhKSNl.NHmCIQgKJcRYPO', 'CLIENT', 'company-1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("email") DO UPDATE SET
    "password" = EXCLUDED."password",
    "updated_at" = CURRENT_TIMESTAMP;
