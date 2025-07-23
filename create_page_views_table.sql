-- Script para criar a tabela page_views no Supabase
-- Execute este script no SQL Editor do Supabase

-- Criar tabela page_views
CREATE TABLE IF NOT EXISTS page_views (
  id BIGSERIAL PRIMARY KEY,
  page_url TEXT NOT NULL,
  page_title TEXT,
  referrer TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  date DATE GENERATED ALWAYS AS (DATE(timestamp)) STORED,
  hour INTEGER GENERATED ALWAYS AS (EXTRACT(HOUR FROM timestamp)) STORED,
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

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_page_views_timestamp ON page_views(timestamp);
CREATE INDEX IF NOT EXISTS idx_page_views_date ON page_views(date);
CREATE INDEX IF NOT EXISTS idx_page_views_device ON page_views(device);
CREATE INDEX IF NOT EXISTS idx_page_views_referrer ON page_views(referrer);

-- Habilitar Row Level Security (RLS)
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Criar política para permitir inserção de dados anônimos
CREATE POLICY "Permitir inserção de page views anônimos" ON page_views
  FOR INSERT WITH CHECK (true);

-- Criar política para permitir leitura de dados anônimos
CREATE POLICY "Permitir leitura de page views anônimos" ON page_views
  FOR SELECT USING (true);

-- Comentários na tabela
COMMENT ON TABLE page_views IS 'Tabela para armazenar dados de visitas às páginas';
COMMENT ON COLUMN page_views.page_url IS 'URL da página visitada';
COMMENT ON COLUMN page_views.page_title IS 'Título da página';
COMMENT ON COLUMN page_views.referrer IS 'URL de origem (referrer)';
COMMENT ON COLUMN page_views.timestamp IS 'Data e hora da visita';
COMMENT ON COLUMN page_views.date IS 'Data da visita (gerada automaticamente)';
COMMENT ON COLUMN page_views.hour IS 'Hora da visita (gerada automaticamente)';
COMMENT ON COLUMN page_views.device IS 'Tipo de dispositivo (desktop, mobile, tablet)';
COMMENT ON COLUMN page_views.user_agent IS 'User agent do navegador';
COMMENT ON COLUMN page_views.screen_width IS 'Largura da tela';
COMMENT ON COLUMN page_views.screen_height IS 'Altura da tela';
COMMENT ON COLUMN page_views.language IS 'Idioma do navegador';
COMMENT ON COLUMN page_views.utm_source IS 'Parâmetro UTM source';
COMMENT ON COLUMN page_views.utm_medium IS 'Parâmetro UTM medium';
COMMENT ON COLUMN page_views.utm_campaign IS 'Parâmetro UTM campaign';
COMMENT ON COLUMN page_views.utm_term IS 'Parâmetro UTM term';
COMMENT ON COLUMN page_views.utm_content IS 'Parâmetro UTM content'; 