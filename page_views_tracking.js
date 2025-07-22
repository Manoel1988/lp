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
    } else {
      console.log('✅ Visita registrada com sucesso:', data);
    }
    
  } catch (error) {
    console.error('❌ Erro inesperado no tracking:', error);
  }
}

// Função para obter estatísticas de visitas
async function obterEstatisticasVisitas(dias = 30) {
  try {
    let supabase = window.supabase;
    if (!supabase) {
      console.error('Supabase não disponível');
      return null;
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
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('❌ Erro inesperado ao buscar estatísticas:', error);
    return null;
  }
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
} 