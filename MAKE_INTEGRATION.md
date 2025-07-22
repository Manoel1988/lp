# Integração com Make (Integromat) - Webhook

## 📋 Visão Geral

Esta integração permite que os leads capturados na landing page sejam automaticamente enviados para o Make (anteriormente Integromat) através de webhook, permitindo automações como:

- Envio de emails automáticos
- Criação de contatos no CRM
- Notificações no WhatsApp/Telegram
- Integração com Google Sheets
- E muito mais!

## 🔧 Configuração

### 1. Criar Cenário no Make

1. Acesse [make.com](https://make.com)
2. Crie um novo cenário
3. Adicione um módulo **Webhook** como trigger
4. Configure o webhook:
   - **URL**: Copie a URL gerada
   - **Method**: POST
   - **Content Type**: JSON

### 2. Configurar o Webhook no Código

1. Abra o arquivo `webhook-config.js`
2. Substitua a URL do webhook:

```javascript
const WEBHOOK_CONFIG = {
  url: 'https://hook.eu1.make.com/SUA_URL_AQUI',
  // ... resto da configuração
};
```

### 3. Estrutura dos Dados Enviados

O webhook recebe os seguintes dados:

```json
{
  "lead": {
    "name": "Nome do Lead",
    "email": "email@exemplo.com",
    "phone": "(11) 99999-9999",
    "source": "landing_page",
    "timestamp": "2025-01-22T16:30:00.000Z"
  },
  "metadata": {
    "source": "landing_page",
    "timestamp": "2025-01-22T16:30:00.000Z",
    "user_agent": "Mozilla/5.0...",
    "referrer": "https://google.com",
    "page_url": "https://manoel1988.github.io/lp/"
  }
}
```

## 🚀 Exemplos de Automações

### 1. Email de Boas-vindas

```javascript
// No Make, após o webhook:
// 1. Módulo Gmail
// 2. Enviar email com template personalizado
// 3. Incluir dados do lead: {{lead.name}}, {{lead.email}}
```

### 2. Notificação no WhatsApp

```javascript
// No Make:
// 1. Webhook (trigger)
// 2. WhatsApp Business API
// 3. Enviar mensagem: "Novo lead: {{lead.name}} - {{lead.phone}}"
```

### 3. Google Sheets

```javascript
// No Make:
// 1. Webhook (trigger)
// 2. Google Sheets
// 3. Adicionar linha: {{lead.name}}, {{lead.email}}, {{lead.phone}}, {{lead.timestamp}}
```

### 4. CRM Integration

```javascript
// No Make:
// 1. Webhook (trigger)
// 2. HubSpot/Pipedrive/Salesforce
// 3. Criar contato com dados do lead
```

## 🔍 Testando a Integração

### 1. Verificar Console do Navegador

Abra o DevTools (F12) e verifique se aparecem as mensagens:
- ✅ Webhook enviado com sucesso
- ❌ Erro ao enviar para webhook (se houver erro)

### 2. Testar no Make

1. Vá para o seu cenário no Make
2. Clique em "Run once" para testar
3. Verifique se os dados chegam corretamente

### 3. Logs de Debug

```javascript
// Para debug, adicione no console:
console.log('Webhook config:', window.WEBHOOK_CONFIG);
console.log('Lead data:', leadData);
```

## ⚙️ Configurações Avançadas

### Timeout e Retry

```javascript
const WEBHOOK_CONFIG = {
  url: 'https://hook.eu1.make.com/SUA_URL',
  timeout: 15000, // 15 segundos
  retryAttempts: 5,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': 'sua_chave_secreta'
  }
};
```

### Múltiplos Webhooks

```javascript
// Para enviar para múltiplos webhooks:
async function enviarParaMultiplosWebhooks(data) {
  const webhooks = [
    'https://hook1.make.com/url1',
    'https://hook2.make.com/url2'
  ];
  
  const promises = webhooks.map(url => 
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
  );
  
  await Promise.allSettled(promises);
}
```

## 🛠️ Solução de Problemas

### Erro 404
- Verifique se a URL do webhook está correta
- Confirme se o cenário no Make está ativo

### Erro de CORS
- O Make não tem problemas de CORS
- Verifique se a URL está correta

### Timeout
- Aumente o timeout no `webhook-config.js`
- Verifique a conexão com a internet

### Dados não chegam
- Verifique o console do navegador
- Confirme se o formulário está sendo enviado
- Teste o webhook diretamente no Make

## 📞 Suporte

Para dúvidas sobre:
- **Make**: [Documentação oficial](https://www.make.com/en/help)
- **Webhook**: [Guia de webhooks](https://www.make.com/en/help/apps/webhooks)
- **Integração**: Verifique os logs no console do navegador 