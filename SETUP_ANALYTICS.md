# 📊 Setup Analytics - Dados Reais

## 🎯 Objetivo
Configurar o sistema de analytics para capturar dados reais de visitas ao invés de usar dados de exemplo.

## 📋 Passos para Configurar

### 1. **Acessar o Supabase**
1. Vá para: https://supabase.com/dashboard
2. Faça login na sua conta
3. Acesse o projeto: `wwnylounipjlxjxyopnf`

### 2. **Criar a Tabela page_views**
1. No painel do Supabase, vá em **SQL Editor**
2. Clique em **New Query**
3. Cole o conteúdo do arquivo `create_page_views_table.sql`
4. Clique em **Run** para executar

### 3. **Inserir Dados de Exemplo Reais (Opcional)**
1. Crie uma nova query no SQL Editor
2. Cole o conteúdo do arquivo `insert_sample_page_views.sql`
3. Clique em **Run** para executar

### 4. **Verificar a Configuração**
1. Vá em **Table Editor**
2. Procure pela tabela `page_views`
3. Confirme que a tabela foi criada com as colunas corretas

## 🔧 Estrutura da Tabela

### **Colunas Principais:**
- `id` - ID único da visita
- `page_url` - URL da página visitada
- `page_title` - Título da página
- `referrer` - URL de origem
- `timestamp` - Data e hora da visita
- `date` - Data da visita (gerada automaticamente)
- `hour` - Hora da visita (gerada automaticamente)

### **Informações do Dispositivo:**
- `device` - Tipo (desktop, mobile, tablet)
- `user_agent` - User agent do navegador
- `screen_width` - Largura da tela
- `screen_height` - Altura da tela
- `language` - Idioma do navegador

### **Parâmetros UTM:**
- `utm_source` - Fonte do tráfego
- `utm_medium` - Meio de aquisição
- `utm_campaign` - Campanha
- `utm_term` - Termo de busca
- `utm_content` - Conteúdo específico

## 📊 Dados que Serão Capturados

### **Automaticamente:**
- ✅ Cada visita à landing page
- ✅ Dispositivo usado
- ✅ Resolução da tela
- ✅ Idioma do navegador
- ✅ Data e hora da visita

### **Se Disponível:**
- ✅ URL de origem (referrer)
- ✅ Parâmetros UTM da URL
- ✅ User agent completo

## 🚀 Como Funciona

### **1. Tracking Automático:**
- O arquivo `page_views_tracking.js` captura dados automaticamente
- Cada visita é registrada no Supabase
- Dados são processados em tempo real

### **2. Analytics Dashboard:**
- O CRM carrega dados reais do Supabase
- Gráficos são atualizados automaticamente
- Estatísticas são calculadas em tempo real

### **3. Fallback:**
- Se a tabela não existir, usa dados de exemplo
- Sistema continua funcionando mesmo sem Supabase
- Logs informativos no console

## 🔍 Verificar se Está Funcionando

### **1. No Console do Navegador:**
```javascript
// Verificar se a tabela existe
obterEstatisticasVisitas()

// Verificar dados de exemplo
obterDadosExemplo()
```

### **2. No Supabase:**
```sql
-- Verificar visitas recentes
SELECT * FROM page_views ORDER BY timestamp DESC LIMIT 10;

-- Verificar estatísticas
SELECT 
  date,
  COUNT(*) as visitas,
  device,
  referrer
FROM page_views 
GROUP BY date, device, referrer
ORDER BY date DESC;
```

## 📈 Dados Esperados

### **Após Configuração:**
- **Gráfico:** Linha com visitas reais por dia
- **Dispositivos:** Distribuição real de desktop/mobile/tablet
- **Referrers:** Fontes reais de tráfego
- **Tempo Real:** Novas visitas aparecem automaticamente

### **Exemplo de Dados Reais:**
- **Google:** 40% do tráfego
- **Facebook:** 25% do tráfego
- **Instagram:** 20% do tráfego
- **Direto:** 15% do tráfego

## 🛠️ Troubleshooting

### **Problema:** "Tabela page_views não existe"
**Solução:** Execute o script `create_page_views_table.sql`

### **Problema:** "Erro de permissão"
**Solução:** Verifique as políticas RLS no Supabase

### **Problema:** "Dados não aparecem"
**Solução:** Verifique o console do navegador para logs

### **Problema:** "Gráfico vazio"
**Solução:** Execute o script `insert_sample_page_views.sql`

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs no console do navegador
2. Confirme que a tabela foi criada no Supabase
3. Teste com dados de exemplo primeiro
4. Verifique as políticas de segurança (RLS)

---

**🎯 Resultado Final:** Analytics funcionando com dados reais de visitas! 