// Supabase config
const supabaseUrl = 'https://wwnylounipjlxjxyopnf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3bnlsb3VuaXBqbHhqeHlvcG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMTg5ODEsImV4cCI6MjA1OTc5NDk4MX0.p9KB50Srt7vyvZNc0pFXycvsQivnB0x4H8TdScNRKiU';

// Verificar se o Supabase está disponível
let supabase;

// Funções de validação
function validateEmail(email) {
  console.log('🔍 VALIDANDO EMAIL:', email);
  // Remove espaços e converte para minúsculas
  email = email.trim().toLowerCase();
  
  // Verifica se está vazio
  if (!email) {
    return { isValid: false, message: 'Email é obrigatório' };
  }
  
  // Verifica se não tem espaços no meio
  if (email.includes(' ')) {
    return { isValid: false, message: 'O email não pode conter espaços' };
  }
  
  // Regex mais rigorosa para validação de email
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
  // Verifica se o email tem formato válido
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Por favor, insira um email válido (exemplo: seu@email.com)' };
  }
  
  // Verifica se tem pelo menos um caractere antes e depois do @
  const parts = email.split('@');
  if (parts[0].length === 0 || parts[1].length === 0) {
    return { isValid: false, message: 'Email inválido' };
  }
  
  // Verifica se o domínio tem pelo menos um ponto
  if (!parts[1].includes('.')) {
    return { isValid: false, message: 'Email inválido - domínio deve ter extensão (ex: .com, .br)' };
  }
  
  // Verifica se não tem caracteres especiais problemáticos
  if (email.includes('..') || email.includes('@@') || email.startsWith('.') || email.endsWith('.')) {
    return { isValid: false, message: 'Email inválido - formato incorreto' };
  }
  
  // Verifica se o domínio tem pelo menos 2 caracteres após o ponto
  const domainParts = parts[1].split('.');
  if (domainParts.length < 2 || domainParts[domainParts.length - 1].length < 2) {
    return { isValid: false, message: 'Email inválido - domínio deve ter extensão válida' };
  }
  
  return { isValid: true, message: 'Email válido' };
}

function validatePhone(phone) {
  // Remove todos os caracteres não numéricos
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Verifica se tem pelo menos 10 dígitos (DDD + número)
  if (cleanPhone.length < 10) {
    return { isValid: false, message: 'Telefone deve ter pelo menos 10 dígitos (DDD + número)' };
  }
  
  // Verifica se tem no máximo 11 dígitos (DDD + número com 9 dígitos)
  if (cleanPhone.length > 11) {
    return { isValid: false, message: 'Telefone deve ter no máximo 11 dígitos' };
  }
  
  // Verifica se o DDD é válido (11 a 99)
  const ddd = cleanPhone.substring(0, 2);
  if (parseInt(ddd) < 11 || parseInt(ddd) > 99) {
    return { isValid: false, message: 'DDD inválido (deve ser entre 11 e 99)' };
  }
  
  // Verifica se o número não é apenas zeros
  const number = cleanPhone.substring(2);
  if (number.replace(/0/g, '').length === 0) {
    return { isValid: false, message: 'Número de telefone inválido' };
  }
  
  return { isValid: true, message: 'Telefone válido' };
}

function formatPhone(phone) {
  // Remove todos os caracteres não numéricos
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Formata o telefone
  if (cleanPhone.length === 11) {
    // (11) 99999-9999
    return `(${cleanPhone.substring(0, 2)}) ${cleanPhone.substring(2, 7)}-${cleanPhone.substring(7)}`;
  } else if (cleanPhone.length === 10) {
    // (11) 9999-9999
    return `(${cleanPhone.substring(0, 2)}) ${cleanPhone.substring(2, 6)}-${cleanPhone.substring(6)}`;
  }
  
  return phone; // Retorna como está se não conseguir formatar
}

// Função para inicializar Supabase
function initSupabase() {
  try {
    if (window.supabase && window.supabase.createClient) {
      supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
      console.log('Supabase carregado com sucesso!');
      return true;
    } else {
      console.error('Supabase não está disponível!');
      return false;
    }
  } catch (error) {
    console.error('Erro ao inicializar Supabase:', error);
    return false;
  }
}

// Tentar inicializar imediatamente
initSupabase();

// Função de teste do Supabase
window.testarSupabase = async function() {
  console.log('=== TESTE DO SUPABASE ===');
  console.log('window.supabase:', window.supabase);
  console.log('supabase client:', supabase);
  
  if (!supabase) {
    alert('Supabase não está disponível!');
    return;
  }
  
  try {
    // Teste simples de conexão
    const { data, error } = await supabase
      .from('leads')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('Erro no teste:', error);
      alert('Erro no teste: ' + error.message);
    } else {
      console.log('Teste bem-sucedido!', data);
      alert('Supabase funcionando!');
    }
  } catch (error) {
    console.error('Erro no teste:', error);
    alert('Erro no teste: ' + error.message);
  }
};

// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado!');
    
    // Aguardar o Supabase carregar se não estiver disponível
    if (!supabase) {
        console.log('Aguardando Supabase carregar...');
        setTimeout(() => {
            initSupabase();
        }, 1000);
    }
    
    console.log('Supabase disponível:', !!supabase);
    
    // Sempre defina a variável antes de usar!
    const ctaButtons = document.querySelectorAll('.cta-button');
    const leadModal = document.getElementById('leadModal');
    const closeLeadModal = document.getElementById('closeLeadModal');
    const leadForm = document.getElementById('leadForm');

    console.log('Elementos encontrados:', {
      ctaButtons: ctaButtons.length,
      leadModal: !!leadModal,
      closeLeadModal: !!closeLeadModal,
      leadForm: !!leadForm
    });
    
    // Verificar se todos os elementos necessários existem
    if (ctaButtons.length === 0) {
      console.warn('⚠️ Nenhum botão CTA encontrado!');
    }
    if (!leadModal) {
      console.warn('⚠️ Modal não encontrado!');
    }
    if (!leadForm) {
      console.warn('⚠️ Formulário não encontrado!');
    } else {
      console.log('✅ Formulário encontrado com sucesso!');
      
      // Verificar campos do formulário
      const nameField = document.getElementById('leadName');
      const emailField = document.getElementById('leadEmail');
      const phoneField = document.getElementById('leadPhone');
      const submitBtn = leadForm.querySelector('button[type=submit]');
      
      console.log('Campos do formulário:', {
        nameField: !!nameField,
        emailField: !!emailField,
        phoneField: !!phoneField,
        submitBtn: !!submitBtn
      });
    }

    // Função para abrir modal
    function openModal() {
      console.log('Tentando abrir modal...');
      if (leadModal) {
        leadModal.style.display = 'flex';
        console.log('Modal aberto com sucesso!');
      } else {
        console.log('Modal não encontrado!');
      }
    }

    // Função para fechar modal
    function closeModal() {
      if (leadModal) {
        leadModal.style.display = 'none';
        console.log('Modal fechado!');
      }
    }

    // Adicionar eventos aos botões CTA
    ctaButtons.forEach((btn, index) => {
      btn.addEventListener('click', function(e) {
        console.log(`Botão CTA ${index + 1} clicado!`);
        e.preventDefault();
        e.stopPropagation();
        openModal();
      });
    });

    // Fechar modal com X
    if (closeLeadModal) {
      closeLeadModal.addEventListener('click', closeModal);
    }

    // Fechar modal clicando fora
    window.addEventListener('click', function(event) {
      if (event.target === leadModal) {
        closeModal();
      }
    });

    // Salvar lead - MELHORADO COM MAIS DEBUG
    if (leadForm) {
      console.log('Formulário encontrado, adicionando evento submit...');
      
      // Adicionar validação em tempo real nos campos
      const emailField = document.getElementById('leadEmail');
      const phoneField = document.getElementById('leadPhone');
      
      if (emailField) {
        emailField.addEventListener('blur', function() {
          const email = this.value.trim();
          if (email) {
            const validation = validateEmail(email);
            if (!validation.isValid) {
              this.style.borderColor = '#ef4444';
              this.title = validation.message;
            } else {
              this.style.borderColor = '#10b981';
              this.title = '';
            }
          } else {
            this.style.borderColor = '';
            this.title = '';
          }
        });
      }
      
      if (phoneField) {
        phoneField.addEventListener('blur', function() {
          const phone = this.value.trim();
          if (phone) {
            const validation = validatePhone(phone);
            if (!validation.isValid) {
              this.style.borderColor = '#ef4444';
              this.title = validation.message;
            } else {
              this.style.borderColor = '#10b981';
              this.title = '';
              // Formatar automaticamente
              this.value = formatPhone(phone);
            }
          } else {
            this.style.borderColor = '';
            this.title = '';
          }
        });
        // Máscara para telefone celular (11 dígitos) apenas
        phoneField.addEventListener('input', function(e) {
          let val = this.value.replace(/\D/g, '');
          if (val.length > 11) val = val.substring(0, 11);
          let formatted = '';
          if (val.length > 0) {
            formatted += '(' + val.substring(0, 2);
          }
          if (val.length >= 3) {
            formatted += ') ' + val.substring(2, 7);
          }
          if (val.length > 7) {
            formatted += '-' + val.substring(7, 11);
          }
          this.value = formatted;
        });
      }
      
      // Adicionar evento de submit
      leadForm.addEventListener('submit', async function(e) {
        console.log('=== FORMULÁRIO SUBMETIDO ===');
        e.preventDefault();
        e.stopPropagation();
        
        console.log('Evento de submit capturado!');
        console.log('Formulário válido:', leadForm.checkValidity());
        
        // Verificar se os campos existem
        const nameField = document.getElementById('leadName');
        const emailField = document.getElementById('leadEmail');
        const phoneField = document.getElementById('leadPhone');
        
        console.log('Campos encontrados:', {
          name: !!nameField,
          email: !!emailField,
          phone: !!phoneField
        });
        
        if (!nameField || !emailField || !phoneField) {
          console.error('Campos do formulário não encontrados!');
          alert('Erro: Campos do formulário não encontrados. Tente recarregar a página.');
          return;
        }
        
        const name = nameField.value.trim();
        const email = emailField.value.trim();
        const phone = phoneField.value.trim();
        
        console.log('Dados do formulário:', { name, email, phone });
        
        // Validações
        if (!name || name.length < 2) {
          alert('Por favor, insira seu nome completo (mínimo 2 caracteres)');
          nameField.focus();
          return;
        }
        
        const emailValidation = validateEmail(email);
        if (!emailValidation.isValid) {
          alert(emailValidation.message);
          emailField.focus();
          return;
        }
        
        const phoneValidation = validatePhone(phone);
        if (!phoneValidation.isValid) {
          alert(phoneValidation.message);
          phoneField.focus();
          return;
        }
        
        // Formatar o telefone antes de salvar
        const formattedPhone = formatPhone(phone);
        
        console.log('Dados validados:', { name, email: email.toLowerCase(), phone: formattedPhone });
        
        if (name && email && phone) {
          // Tentar reinicializar o Supabase se não estiver disponível
          if (!supabase) {
            console.log('Tentando reinicializar Supabase...');
            const supabaseLoaded = initSupabase();
            if (!supabaseLoaded) {
              alert('Erro: Não foi possível conectar ao banco de dados. Verifique sua conexão e tente novamente.');
              return;
            }
          }
          
          try {
            console.log('Tentando salvar no Supabase...');
            console.log('Dados a serem salvos:', { name, email, phone });
            
            // Primeiro, buscar a primeira coluna do Kanban para associar o lead
            const { data: columns, error: colError } = await supabase
              .from('kanban_columns')
              .select('id')
              .order('order', { ascending: true })
              .limit(1);
            
            let columnId = null;
            if (!colError && columns && columns.length > 0) {
              columnId = columns[0].id;
            }
            
            // Salva no Supabase com column_id
            const { data, error } = await supabase
              .from('leads')
              .insert([{
                name, 
                email: email.toLowerCase(), 
                phone: formattedPhone,
                column_id: columnId // Associar à primeira coluna
              }])
              .select();
              
            console.log('Resposta completa do Supabase:', { data, error });
            
            if (error) {
              console.error('Erro do Supabase:', error);
              console.error('Detalhes do erro:', error.details, error.hint, error.code);
              alert('Erro ao cadastrar lead: ' + error.message);
            } else {
              console.log('Lead salvo com sucesso!');
              console.log('Dados retornados:', data);
              closeModal();
              // Limpar o formulário
              document.getElementById('leadName').value = '';
              document.getElementById('leadEmail').value = '';
              document.getElementById('leadPhone').value = '';
              // Redirecionar para o Google Calendar na aba principal
              window.location.href = 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0sY_HzXpwGONtwLergC-_4pgWttFNgcaquvSzw9teT23XNrdueNz1SAjzO5GBD6ag8bBwkqzpE';
              // Abrir grupo do WhatsApp em nova aba com delay
              setTimeout(function() {
                window.open('https://chat.whatsapp.com/F1g23kSlLoeEtiK46oBzK2', '_blank');
              }, 500);
            }
          } catch (error) {
            console.error('Erro ao salvar lead:', error);
            alert('Erro inesperado: ' + error.message);
          }
        } else {
          alert('Por favor, preencha todos os campos!');
        }
      });
      
      // Adicionar evento de clique no botão ENVIAR também
      const submitButton = leadForm.querySelector('button[type=submit]');
      if (submitButton) {
        console.log('Botão submit encontrado, adicionando evento de clique...');
        
        // Evento de clique direto no botão
        submitButton.addEventListener('click', function(e) {
          console.log('=== BOTÃO ENVIAR CLICADO ===');
          e.preventDefault();
          e.stopPropagation();
          
          // Processar o formulário diretamente
          processForm();
        });
      } else {
        console.error('Botão submit não encontrado!');
      }
      
      // Função para processar o formulário
      async function processForm() {
        console.log('=== PROCESSANDO FORMULÁRIO ===');
        
        const nameField = document.getElementById('leadName');
        const emailField = document.getElementById('leadEmail');
        const phoneField = document.getElementById('leadPhone');
        
        console.log('Campos encontrados:', {
          name: !!nameField,
          email: !!emailField,
          phone: !!phoneField
        });
        
        if (!nameField || !emailField || !phoneField) {
          console.error('Campos do formulário não encontrados!');
          alert('Erro: Campos do formulário não encontrados. Tente recarregar a página.');
          return;
        }
        
        const name = nameField.value.trim();
        const email = emailField.value.trim();
        const phone = phoneField.value.trim();
        
        console.log('Dados do formulário:', { name, email, phone });
        
        // Validações
        if (!name || name.length < 2) {
          alert('Por favor, insira seu nome completo (mínimo 2 caracteres)');
          nameField.focus();
          return;
        }
        
        const emailValidation = validateEmail(email);
        if (!emailValidation.isValid) {
          alert(emailValidation.message);
          emailField.focus();
          return;
        }
        
        const phoneValidation = validatePhone(phone);
        if (!phoneValidation.isValid) {
          alert(phoneValidation.message);
          phoneField.focus();
          return;
        }
        
        // Formatar o telefone antes de salvar
        const formattedPhone = formatPhone(phone);
        
        console.log('Dados validados:', { name, email: email.toLowerCase(), phone: formattedPhone });
        
        // Tentar reinicializar o Supabase se não estiver disponível
        if (!supabase) {
          console.log('Tentando reinicializar Supabase...');
          const supabaseLoaded = initSupabase();
          if (!supabaseLoaded) {
            alert('Erro: Não foi possível conectar ao banco de dados. Verifique sua conexão e tente novamente.');
            return;
          }
        }
        
        try {
          console.log('Tentando salvar no Supabase...');
          
          // Primeiro, buscar a primeira coluna do Kanban para associar o lead
          const { data: columns, error: colError } = await supabase
            .from('kanban_columns')
            .select('id')
            .order('order', { ascending: true })
            .limit(1);
          
          let columnId = null;
          if (!colError && columns && columns.length > 0) {
            columnId = columns[0].id;
          }
          
          // Salva no Supabase com column_id
          const { data, error } = await supabase
            .from('leads')
            .insert([{
              name, 
              email: email.toLowerCase(), 
              phone: formattedPhone,
              column_id: columnId // Associar à primeira coluna
            }])
            .select();
            
          console.log('Resposta do Supabase:', { data, error });
          
          if (error) {
            console.error('Erro do Supabase:', error);
            alert('Erro ao cadastrar lead: ' + error.message);
          } else {
            console.log('Lead salvo com sucesso!');
            closeModal();
            // Limpar o formulário
            document.getElementById('leadName').value = '';
            document.getElementById('leadEmail').value = '';
            document.getElementById('leadPhone').value = '';
            // Redirecionar para o Google Calendar na aba principal
            window.location.href = 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0sY_HzXpwGONtwLergC-_4pgWttFNgcaquvSzw9teT23XNrdueNz1SAjzO5GBD6ag8bBwkqzpE';
            // Abrir grupo do WhatsApp em nova aba
            window.open('https://chat.whatsapp.com/F1g23kSlLoeEtiK46oBzK2', '_blank');
          }
        } catch (error) {
          console.error('Erro ao salvar lead:', error);
          alert('Erro inesperado: ' + error.message);
        }
      }
      
    } else {
      console.error('Formulário de lead não encontrado!');
    }

    // Botão de copiar link
    const copyLinkButton = document.querySelector('.video-actions');
    if (copyLinkButton) {
        copyLinkButton.addEventListener('click', function() {
            const currentUrl = window.location.href;
            navigator.clipboard.writeText(currentUrl).then(function() {
                // Feedback visual
                const originalText = copyLinkButton.querySelector('span').textContent;
                copyLinkButton.querySelector('span').textContent = 'Link copiado!';
                
                setTimeout(() => {
                    copyLinkButton.querySelector('span').textContent = originalText;
                }, 2000);
            });
        });
    }

    // Animação de scroll suave
    function smoothScroll(target, duration) {
        const targetPosition = target.getBoundingClientRect().top;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    // Adicionar efeito de hover nos cards
    const cards = document.querySelectorAll('.target-card, .step-card, .credential-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Animação de entrada dos elementos quando aparecem na tela
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animação
    const animatedElements = document.querySelectorAll('.target-card, .step-card, .credential-card, .profile-card, .video-container');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Adicionar efeito de parallax suave no hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    });

    // Adicionar contador de números animado
    function animateNumbers() {
        const numbers = document.querySelectorAll('.result-number');
        numbers.forEach(number => {
            const target = parseInt(number.textContent.replace(/\D/g, ''));
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                if (number.textContent.includes('+')) {
                    number.textContent = Math.floor(current) + '+';
                } else if (number.textContent.includes('Bilhão')) {
                    number.textContent = Math.floor(current) + ' Bilhão';
                } else {
                    number.textContent = Math.floor(current);
                }
            }, 20);
        });
    }

    // Executar animação dos números quando a seção estiver visível
    const whoIsSection = document.querySelector('.who-is-section');
    if (whoIsSection) {
        const sectionObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        sectionObserver.observe(whoIsSection);
    }

    // Adicionar funcionalidade de menu mobile (se necessário)
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });
    }

    // Adicionar funcionalidade de voltar ao topo
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'back-to-top';
    backToTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #fbbf24;
        color: #1e293b;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        font-size: 18px;
    `;
    
    document.body.appendChild(backToTopButton);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.visibility = 'visible';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.visibility = 'hidden';
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Adicionar efeito de digitação no título principal
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Executar efeito de digitação no carregamento (opcional)
    const mainHeadline = document.querySelector('.main-headline');
    if (mainHeadline) {
        const originalText = mainHeadline.innerHTML;
        // typeWriter(mainHeadline, originalText, 50);
    }

    // Logs de debug
    console.log('Landing page carregada com sucesso!');
    console.log('Modal elements:', {
        modal: leadModal,
        closeBtn: closeLeadModal,
        form: leadForm
    });
    console.log('CTA buttons found:', ctaButtons.length);
    
    // Teste manual do modal
    window.testModal = function() {
        console.log('Testando modal via console...');
        openModal();
    };
    
        // Função para testar o formulário
    window.testForm = function() {
      console.log('=== TESTE DO FORMULÁRIO ===');
      const form = document.getElementById('leadForm');
      const nameField = document.getElementById('leadName');
      const emailField = document.getElementById('leadEmail');
      const phoneField = document.getElementById('leadPhone');
      
      console.log('Elementos encontrados:', {
        form: !!form,
        nameField: !!nameField,
        emailField: !!emailField,
        phoneField: !!phoneField
      });
      
      if (form && nameField && emailField && phoneField) {
        // Preencher campos de teste
        nameField.value = 'Teste da Silva';
        emailField.value = 'teste@email.com';
        phoneField.value = '(11) 99999-9999';
        
        console.log('Campos preenchidos para teste');
        console.log('Supabase disponível:', !!supabase);
        
        // Simular submit
        form.dispatchEvent(new Event('submit', { cancelable: true }));
      } else {
        console.error('Elementos do formulário não encontrados!');
      }
    };
    
    // Função para testar validações
    window.testValidations = function() {
      console.log('=== TESTE DAS VALIDAÇÕES ===');
      
      // Teste email válido
      console.log('Teste email válido:', validateEmail('teste@email.com'));
      
      // Teste email inválido
      console.log('Teste email inválido:', validateEmail('teste@'));
      console.log('Teste email com espaço:', validateEmail('teste @email.com'));
      console.log('Teste email malformado:', validateEmail('882173 a gm ail.com'));
      
      // Teste telefone válido
      console.log('Teste telefone válido:', validatePhone('11999999999'));
      
      // Teste telefone inválido
      console.log('Teste telefone inválido:', validatePhone('123'));
    };
}); 