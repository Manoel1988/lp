-- =====================================================
-- SCRIPT SIMPLES PARA CONFIGURAR ANALYTICS NO SUPABASE
-- =====================================================
-- Cole este código no SQL Editor do Supabase e execute
-- =====================================================

-- 1. CRIAR TABELA page_views (VERSÃO SIMPLES)
-- =====================================================
CREATE TABLE IF NOT EXISTS page_views (
  id BIGSERIAL PRIMARY KEY,
  page_url TEXT NOT NULL,
  page_title TEXT,
  referrer TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  device TEXT,
  user_agent TEXT,
  screen_width INTEGER,
  screen_height INTEGER,
  language TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. CRIAR ÍNDICES PARA PERFORMANCE
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_page_views_timestamp ON page_views(timestamp);
CREATE INDEX IF NOT EXISTS idx_page_views_device ON page_views(device);
CREATE INDEX IF NOT EXISTS idx_page_views_referrer ON page_views(referrer);

-- 3. HABILITAR ROW LEVEL SECURITY (RLS)
-- =====================================================
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- 4. CRIAR POLÍTICAS DE SEGURANÇA
-- =====================================================
-- Política para permitir inserção de dados anônimos
CREATE POLICY "Permitir inserção de page views anônimos" ON page_views
  FOR INSERT WITH CHECK (true);

-- Política para permitir leitura de dados anônimos
CREATE POLICY "Permitir leitura de page views anônimos" ON page_views
  FOR SELECT USING (true);

-- 5. INSERIR DADOS DE EXEMPLO REAIS
-- =====================================================
INSERT INTO page_views (
  page_url,
  page_title,
  referrer,
  timestamp,
  device,
  user_agent,
  screen_width,
  screen_height,
  language,
  utm_source,
  utm_medium,
  utm_campaign
) VALUES 
-- Visita de hoje
(
  'https://manoel1988.github.io/lp/',
  'Landing Page - Manoel Santos',
  'https://google.com',
  NOW(),
  'desktop',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
  1920,
  1080,
  'pt-BR',
  'google',
  'organic',
  'landing_page'
),

-- Visita de ontem
(
  'https://manoel1988.github.io/lp/',
  'Landing Page - Manoel Santos',
  'https://facebook.com',
  NOW() - INTERVAL '1 day',
  'mobile',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
  375,
  667,
  'pt-BR',
  'facebook',
  'social',
  'landing_page'
),

-- Visita de 2 dias atrás
(
  'https://manoel1988.github.io/lp/',
  'Landing Page - Manoel Santos',
  'https://instagram.com',
  NOW() - INTERVAL '2 days',
  'desktop',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  1920,
  1080,
  'pt-BR',
  'instagram',
  'social',
  'landing_page'
),

-- Visita de 3 dias atrás
(
  'https://manoel1988.github.io/lp/',
  'Landing Page - Manoel Santos',
  'https://linkedin.com',
  NOW() - INTERVAL '3 days',
  'tablet',
  'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
  768,
  1024,
  'pt-BR',
  'linkedin',
  'social',
  'landing_page'
),

-- Visita de 4 dias atrás
(
  'https://manoel1988.github.io/lp/',
  'Landing Page - Manoel Santos',
  'https://twitter.com',
  NOW() - INTERVAL '4 days',
  'mobile',
  'Mozilla/5.0 (Android 10; Mobile) AppleWebKit/537.36',
  360,
  640,
  'pt-BR',
  'twitter',
  'social',
  'landing_page'
),

-- Visita direta de hoje
(
  'https://manoel1988.github.io/lp/',
  'Landing Page - Manoel Santos',
  NULL,
  NOW() - INTERVAL '2 hours',
  'desktop',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
  1440,
  900,
  'pt-BR',
  NULL,
  NULL,
  NULL
),

-- Visita do WhatsApp
(
  'https://manoel1988.github.io/lp/',
  'Landing Page - Manoel Santos',
  'https://wa.me',
  NOW() - INTERVAL '6 hours',
  'mobile',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X) AppleWebKit/605.1.15',
  390,
  844,
  'pt-BR',
  'whatsapp',
  'social',
  'landing_page'
),

-- Visita do YouTube
(
  'https://manoel1988.github.io/lp/',
  'Landing Page - Manoel Santos',
  'https://youtube.com',
  NOW() - INTERVAL '12 hours',
  'desktop',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  1366,
  768,
  'pt-BR',
  'youtube',
  'social',
  'landing_page'
);

-- 6. VERIFICAR SE TUDO FUNCIONOU
-- =====================================================
-- Verificar se a tabela foi criada
SELECT 
  'Tabela page_views criada com sucesso!' as status,
  COUNT(*) as total_visitas
FROM page_views;

-- Verificar dados por dia (usando DATE(timestamp))
SELECT 
  DATE(timestamp) as data,
  COUNT(*) as visitas,
  device,
  referrer
FROM page_views 
GROUP BY DATE(timestamp), device, referrer
ORDER BY DATE(timestamp) DESC;

-- Verificar dispositivos
SELECT 
  device,
  COUNT(*) as total,
  ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM page_views), 1) as percentual
FROM page_views 
GROUP BY device
ORDER BY total DESC;

-- Verificar referrers
SELECT 
  COALESCE(referrer, 'Direto') as fonte,
  COUNT(*) as total,
  ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM page_views), 1) as percentual
FROM page_views 
GROUP BY referrer
ORDER BY total DESC;

-- =====================================================
-- FIM DO SCRIPT - EXECUTE TUDO DE UMA VEZ!
-- ===================================================== 