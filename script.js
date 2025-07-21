// Supabase config
const supabaseUrl = 'https://wwnylounipjlxjxyopnf.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind3bnlsb3VuaXBqbHhqeHlvcG5mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMTg5ODEsImV4cCI6MjA1OTc5NDk4MX0.p9KB50Srt7vyvZNc0pFXycvsQivnB0x4H8TdScNRKiU';

// Verificar se o Supabase está disponível
let supabase;

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
        console.log('Campos válidos:', {
          name: name.length > 0,
          email: email.length > 0 && email.includes('@'),
          phone: phone.length > 0
        });
        
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
                email, 
                phone,
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
              // Redirecionar para o Google Calendar
              window.location.href = 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0sY_HzXpwGONtwLergC-_4pgWttFNgcaquvSzw9teT23XNrdueNz1SAjzO5GBD6ag8bBwkqzpE';
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
        
        if (!name || !email || !phone) {
          alert('Por favor, preencha todos os campos!');
          return;
        }
        
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
              email, 
              phone,
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
            // Redirecionar para o Google Calendar
            window.location.href = 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0sY_HzXpwGONtwLergC-_4pgWttFNgcaquvSzw9teT23XNrdueNz1SAjzO5GBD6ag8bBwkqzpE';
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
}); 