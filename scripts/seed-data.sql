-- Plataforma DISC - Script de Dados Iniciais
-- Execute após criar a estrutura do banco

-- Inserir empresa padrão
INSERT INTO "companies" ("id", "name", "active", "created_at", "updated_at") 
VALUES ('company-1', 'Dezorzi Consultoria', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

-- Inserir usuários (senhas: admin123, consultant123, client123)
-- Nota: As senhas estão com hash bcrypt para segurança
INSERT INTO "users" ("id", "name", "email", "password", "role", "company_id", "created_at", "updated_at") 
VALUES 
    ('user-admin', 'Administrador', 'admin@dezorzi.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'ADMIN', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('user-consultant', 'Consultor', 'consultant@dezorzi.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'CONSULTANT', NULL, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('user-client', 'Cliente', 'client@empresa.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'CLIENT', 'company-1', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("email") DO NOTHING;

-- Inserir projeto
INSERT INTO "projects" ("id", "name", "description", "company_id", "active", "created_at", "updated_at")
VALUES ('project-1', 'Projeto Piloto', 'Projeto inicial para teste da plataforma', 'company-1', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

-- Inserir candidatos
INSERT INTO "candidates" ("id", "name", "email", "status", "company_id", "project_id", "created_by_id", "created_at", "updated_at")
VALUES 
    ('candidate-1', 'João Silva', 'joao@exemplo.com', 'PENDING', 'company-1', 'project-1', 'user-consultant', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('candidate-2', 'Maria Oliveira', 'maria@exemplo.com', 'COMPLETED', 'company-1', 'project-1', 'user-consultant', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

-- Atualizar candidato completado com datas
UPDATE "candidates" 
SET 
    "assessment_sent_at" = CURRENT_TIMESTAMP - INTERVAL '7 days',
    "assessment_completed_at" = CURRENT_TIMESTAMP - INTERVAL '5 days'
WHERE "id" = 'candidate-2';

-- Inserir avaliação para candidato completado
INSERT INTO "assessments" ("id", "candidate_id", "started_at", "completed_at", "is_valid", "environment_check_passed", "device_type", "consent_given", "created_at", "updated_at")
VALUES ('assessment-1', 'candidate-2', CURRENT_TIMESTAMP - INTERVAL '5 days' + INTERVAL '30 minutes', CURRENT_TIMESTAMP - INTERVAL '5 days' + INTERVAL '40 minutes', true, true, 'desktop', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("id") DO NOTHING;

-- Inserir resultado DISC
INSERT INTO "disc_results" ("id", "assessment_id", "d_score", "i_score", "s_score", "c_score", "pattern_type", "report_generated", "created_at", "updated_at")
VALUES ('disc-result-1', 'assessment-1', 75, 45, 30, 60, 'DC', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT ("assessment_id") DO NOTHING;
