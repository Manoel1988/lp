-- Script para inserir dados de exemplo reais na tabela page_views
-- Execute este script no SQL Editor do Supabase após criar a tabela

-- Inserir dados de exemplo reais
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

-- Verificar os dados inseridos
SELECT 
  date,
  COUNT(*) as visitas,
  device,
  referrer
FROM page_views 
GROUP BY date, device, referrer
ORDER BY date DESC; 