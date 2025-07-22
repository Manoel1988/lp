// Configuração do Webhook para Make (Integromat)
// Substitua a URL abaixo pela URL do seu webhook no Make

const WEBHOOK_CONFIG = {
  // URL do webhook do Make - OBTER NO SEU CENÁRIO DO MAKE
  url: 'https://hook.eu1.make.com/SEU_WEBHOOK_ID_AQUI',
  
  // Configurações adicionais
  timeout: 10000, // 10 segundos
  retryAttempts: 3,
  
  // Headers personalizados (se necessário)
  headers: {
    'Content-Type': 'application/json',
    'X-Source': 'landing_page'
  }
};

// Função para atualizar a URL do webhook
function updateWebhookUrl(newUrl) {
  WEBHOOK_CONFIG.url = newUrl;
  console.log('Webhook URL atualizada:', newUrl);
}

// Função para obter a configuração atual
function getWebhookConfig() {
  return WEBHOOK_CONFIG;
}

// Exportar para uso global
if (typeof window !== 'undefined') {
  window.WEBHOOK_CONFIG = WEBHOOK_CONFIG;
  window.updateWebhookUrl = updateWebhookUrl;
  window.getWebhookConfig = getWebhookConfig;
} 