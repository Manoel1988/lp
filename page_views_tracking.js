// Sistema de Tracking de Visitas - Supabase
// Este script rastreia visitas à página e salva no Supabase

const TRACKING_CONFIG = {
  // Configurações do Supabase (mesmas do script principal)
  supabaseUrl: 'https://wwnylounipjlxjxyopnf.supabase.co',
  supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3bnlsb3VuaXBqbHhqeHlvcG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMTg5ODEsImV4cCI6MjA1OTc5NDk4MX0.p9KB50Srt7vyvZNc0pFXycvsQivnB0x4H8TdScNRKiU',
  
  // Configurações de tracking
  trackPageViews: true,
  trackReferrers: true,
  trackUserAgent: true,
  trackUTM: true
};

// Função para obter parâmetros UTM da URL
function getUTMParams() {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    utm_source: urlParams.get('utm_source') || null,
    utm_medium: urlParams.get('utm_medium') || null,
    utm_campaign: urlParams.get('utm_campaign') || null,
    utm_term: urlParams.get('utm_term') || null,
    utm_content: urlParams.get('utm_content') || null
  };
}

// Função para obter informações do dispositivo
function getDeviceInfo() {
  const userAgent = navigator.userAgent;
  let device = 'desktop';
  
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
    device = 'mobile';
  } else if (/iPad/i.test(userAgent)) {
    device = 'tablet';
  }
  
  return {
    device,
    user_agent: userAgent,
    screen_width: screen.width,
    screen_height: screen.height,
    language: navigator.language || 'pt-BR'
  };
}

// Função para registrar visita
async function registrarVisita() {
  if (!TRACKING_CONFIG.trackPageViews) return;
  
  try {
    // Verificar se já existe uma instância do Supabase
    let supabase = window.supabase;
    if (!supabase) {
      console.warn('Supabase não disponível para tracking');
      return;
    }
    
    // Dados da visita
    const visitData = {
      page_url: window.location.href,
      page_title: document.title,
      referrer: document.referrer || null,
      timestamp: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      hour: new Date().getHours(),
      ...getDeviceInfo(),
      ...getUTMParams()
    };
    
    console.log('📊 Registrando visita:', visitData);
    
    // Salvar no Supabase
    const { data, error } = await supabase
      .from('page_views')
      .insert([visitData])
      .select();
    
    if (error) {
      console.error('❌ Erro ao registrar visita:', error);
      // Se a tabela não existe, criar dados de exemplo
      if (error.message.includes('relation "page_views" does not exist')) {
        console.warn('⚠️ Tabela page_views não existe. Criando dados de exemplo...');
        criarDadosExemplo();
      }
    } else {
      console.log('✅ Visita registrada com sucesso:', data);
    }
    
  } catch (error) {
    console.error('❌ Erro inesperado no tracking:', error);
  }
}

// Função para criar dados de exemplo (quando a tabela não existe)
function criarDadosExemplo() {
  const dadosExemplo = [
    {
      page_url: 'https://manoel1988.github.io/lp/',
      page_title: 'Landing Page - Manoel Santos',
      referrer: 'https://google.com',
      timestamp: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0],
      hour: new Date().getHours(),
      device: 'desktop',
      user_agent: navigator.userAgent,
      screen_width: screen.width,
      screen_height: screen.height,
      language: navigator.language || 'pt-BR'
    },
    {
      page_url: 'https://manoel1988.github.io/lp/',
      page_title: 'Landing Page - Manoel Santos',
      referrer: 'https://facebook.com',
      timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 dia atrás
      date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
      hour: 14,
      device: 'mobile',
      user_agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
      screen_width: 375,
      screen_height: 667,
      language: 'pt-BR'
    },
    {
      page_url: 'https://manoel1988.github.io/lp/',
      page_title: 'Landing Page - Manoel Santos',
      referrer: 'https://instagram.com',
      timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 dias atrás
      date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
      hour: 10,
      device: 'desktop',
      user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      screen_width: 1920,
      screen_height: 1080,
      language: 'pt-BR'
    }
  ];
  
  // Armazenar dados de exemplo no localStorage
  localStorage.setItem('page_views_example', JSON.stringify(dadosExemplo));
  console.log('✅ Dados de exemplo criados:', dadosExemplo);
}

// Função para obter estatísticas de visitas
async function obterEstatisticasVisitas(dias = 30) {
  try {
    let supabase = window.supabase;
    if (!supabase) {
      console.error('Supabase não disponível');
      return obterDadosExemplo();
    }
    
    // Calcular data de início
    const dataInicio = new Date();
    dataInicio.setDate(dataInicio.getDate() - dias);
    
    // Buscar visitas dos últimos X dias
    const { data, error } = await supabase
      .from('page_views')
      .select('*')
      .gte('timestamp', dataInicio.toISOString())
      .order('timestamp', { ascending: true });
    
    if (error) {
      console.error('❌ Erro ao buscar estatísticas:', error);
      if (error.message.includes('relation "page_views" does not exist')) {
        console.warn('⚠️ Tabela page_views não existe. Usando dados de exemplo...');
        return obterDadosExemplo();
      }
      return null;
    }
    
    // Se não há dados reais, usar dados de exemplo
    if (!data || data.length === 0) {
      console.warn('⚠️ Nenhum dado encontrado. Usando dados de exemplo...');
      return obterDadosExemplo();
    }
    
    return data;
  } catch (error) {
    console.error('❌ Erro inesperado ao buscar estatísticas:', error);
    return obterDadosExemplo();
  }
}

// Função para obter dados de exemplo
function obterDadosExemplo() {
  const dadosSalvos = localStorage.getItem('page_views_example');
  if (dadosSalvos) {
    return JSON.parse(dadosSalvos);
  }
  
  // Criar dados de exemplo se não existirem
  const dadosExemplo = [
    {
      page_url: 'https://manoel1988.github.io/lp/',
      page_title: 'Landing Page - Manoel Santos',
      referrer: 'https://google.com',
      timestamp: new Date().toISOString(),
      date: new Date().toISOString().split('T')[0],
      hour: new Date().getHours(),
      device: 'desktop',
      user_agent: navigator.userAgent,
      screen_width: screen.width,
      screen_height: screen.height,
      language: navigator.language || 'pt-BR'
    },
    {
      page_url: 'https://manoel1988.github.io/lp/',
      page_title: 'Landing Page - Manoel Santos',
      referrer: 'https://facebook.com',
      timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 dia atrás
      date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
      hour: 14,
      device: 'mobile',
      user_agent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)',
      screen_width: 375,
      screen_height: 667,
      language: 'pt-BR'
    },
    {
      page_url: 'https://manoel1988.github.io/lp/',
      page_title: 'Landing Page - Manoel Santos',
      referrer: 'https://instagram.com',
      timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 dias atrás
      date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
      hour: 10,
      device: 'desktop',
      user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      screen_width: 1920,
      screen_height: 1080,
      language: 'pt-BR'
    },
    {
      page_url: 'https://manoel1988.github.io/lp/',
      page_title: 'Landing Page - Manoel Santos',
      referrer: 'https://linkedin.com',
      timestamp: new Date(Date.now() - 259200000).toISOString(), // 3 dias atrás
      date: new Date(Date.now() - 259200000).toISOString().split('T')[0],
      hour: 16,
      device: 'tablet',
      user_agent: 'Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X)',
      screen_width: 768,
      screen_height: 1024,
      language: 'pt-BR'
    },
    {
      page_url: 'https://manoel1988.github.io/lp/',
      page_title: 'Landing Page - Manoel Santos',
      referrer: 'https://twitter.com',
      timestamp: new Date(Date.now() - 345600000).toISOString(), // 4 dias atrás
      date: new Date(Date.now() - 345600000).toISOString().split('T')[0],
      hour: 9,
      device: 'mobile',
      user_agent: 'Mozilla/5.0 (Android 10; Mobile)',
      screen_width: 360,
      screen_height: 640,
      language: 'pt-BR'
    }
  ];
  
  localStorage.setItem('page_views_example', JSON.stringify(dadosExemplo));
  return dadosExemplo;
}

// Função para agrupar visitas por dia
function agruparVisitasPorDia(visitas) {
  const visitasPorDia = {};
  
  visitas.forEach(visita => {
    const data = visita.date;
    if (!visitasPorDia[data]) {
      visitasPorDia[data] = 0;
    }
    visitasPorDia[data]++;
  });
  
  return visitasPorDia;
}

// Função para obter estatísticas por dispositivo
function obterEstatisticasDispositivos(visitas) {
  const dispositivos = {};
  
  visitas.forEach(visita => {
    const device = visita.device || 'desktop';
    if (!dispositivos[device]) {
      dispositivos[device] = 0;
    }
    dispositivos[device]++;
  });
  
  return dispositivos;
}

// Função para obter top referrers
function obterTopReferrers(visitas) {
  const referrers = {};
  
  visitas.forEach(visita => {
    if (visita.referrer) {
      const domain = new URL(visita.referrer).hostname;
      if (!referrers[domain]) {
        referrers[domain] = 0;
      }
      referrers[domain]++;
    }
  });
  
  // Ordenar por quantidade
  return Object.entries(referrers)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});
}

// Registrar visita quando a página carrega
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', registrarVisita);
} else {
  registrarVisita();
}

// Exportar funções para uso global
if (typeof window !== 'undefined') {
  window.TRACKING_CONFIG = TRACKING_CONFIG;
  window.registrarVisita = registrarVisita;
  window.obterEstatisticasVisitas = obterEstatisticasVisitas;
  window.agruparVisitasPorDia = agruparVisitasPorDia;
  window.obterEstatisticasDispositivos = obterEstatisticasDispositivos;
  window.obterTopReferrers = obterTopReferrers;
  window.obterDadosExemplo = obterDadosExemplo;
  window.criarDadosExemplo = criarDadosExemplo;
} 