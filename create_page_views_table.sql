-- Script para criar a tabela page_views no Supabase
-- Execute este script no SQL Editor do Supabase

-- Criar tabela page_views
CREATE TABLE IF NOT EXISTS page_views (
  id BIGSERIAL PRIMARY KEY,
  page_url TEXT NOT NULL,
  page_title TEXT,
  referrer TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  date DATE DEFAULT CURRENT_DATE,
  hour INTEGER DEFAULT EXTRACT(HOUR FROM NOW()),
  
  -- Informações do dispositivo
  device TEXT DEFAULT 'desktop',
  user_agent TEXT,
  screen_width INTEGER,
  screen_height INTEGER,
  language TEXT DEFAULT 'pt-BR',
  
  -- Parâmetros UTM
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  
  -- Timestamps automáticos
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_page_views_date ON page_views(date);
CREATE INDEX IF NOT EXISTS idx_page_views_timestamp ON page_views(timestamp);
CREATE INDEX IF NOT EXISTS idx_page_views_device ON page_views(device);
CREATE INDEX IF NOT EXISTS idx_page_views_utm_source ON page_views(utm_source);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar updated_at
CREATE TRIGGER update_page_views_updated_at 
    BEFORE UPDATE ON page_views 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Políticas de segurança (RLS)
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Permitir inserção para usuários anônimos (para tracking)
CREATE POLICY "Allow anonymous insert" ON page_views
    FOR INSERT WITH CHECK (true);

-- Permitir leitura para usuários autenticados
CREATE POLICY "Allow authenticated read" ON page_views
    FOR SELECT USING (auth.role() = 'authenticated');

-- Permitir leitura para usuários anônimos (para analytics)
CREATE POLICY "Allow anonymous read" ON page_views
    FOR SELECT USING (true);

-- Comentários na tabela
COMMENT ON TABLE page_views IS 'Tabela para armazenar dados de tracking de visitas à página';
COMMENT ON COLUMN page_views.page_url IS 'URL da página visitada';
COMMENT ON COLUMN page_views.referrer IS 'URL de origem (referrer)';
COMMENT ON COLUMN page_views.device IS 'Tipo de dispositivo (desktop, mobile, tablet)';
COMMENT ON COLUMN page_views.utm_source IS 'Parâmetro UTM source';
COMMENT ON COLUMN page_views.utm_medium IS 'Parâmetro UTM medium';
COMMENT ON COLUMN page_views.utm_campaign IS 'Parâmetro UTM campaign'; 