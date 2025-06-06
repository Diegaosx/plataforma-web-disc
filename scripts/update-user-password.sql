-- Atualiza a senha do usuário admin para "admin123"
-- Hash gerado com bcrypt (10 rounds)
UPDATE "users"
SET "password" = '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy'
WHERE "email" = 'admin@dezorzi.com';

-- Atualiza a senha do usuário consultant para "consultant123"
UPDATE "users"
SET "password" = '$2a$10$ILOxAVrJCvv5MWK/XslmH.rrKwLpFzD7G5hPWw5K8tEKHMAXu1jAi'
WHERE "email" = 'consultant@dezorzi.com';

-- Atualiza a senha do usuário client para "client123"
UPDATE "users"
SET "password" = '$2a$10$DEzK0UZSYe1Pn81.m8JzAOStkqhkDxRJAhKSNl.NHmCIQgKJcRYPO'
WHERE "email" = 'client@empresa.com';
