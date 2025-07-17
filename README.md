# Landing Page - Manoel Santos - Diretor de Vendas

Uma landing page moderna e responsiva para Manoel Santos, especialista em transformação de equipes comerciais.

## 🚀 Características

- **Design Moderno**: Interface limpa e profissional com tema escuro
- **Totalmente Responsiva**: Funciona perfeitamente em desktop, tablet e mobile
- **Animações Suaves**: Efeitos de entrada e hover para melhor experiência do usuário
- **Otimizada para Conversão**: Foco em call-to-actions estratégicos
- **Performance**: Carregamento rápido e otimizado

## 📁 Estrutura do Projeto

```
├── index.html          # Arquivo principal HTML
├── styles.css          # Estilos CSS
├── script.js           # JavaScript para interatividade
└── README.md           # Este arquivo
```

## 🎨 Seções da Landing Page

1. **Banner Vermelho**: Mensagem exclusiva para empresários
2. **Hero Section**: Apresentação principal com imagem e headline
3. **Perfil**: Card com informações do Manoel Santos
4. **Para Quem É**: Cards explicando o público-alvo
5. **Depoimento**: Seção de vídeo/testimonial
6. **Como Funciona**: Processo da sessão estratégica
7. **Quem É**: Biografia e credenciais
8. **Footer**: Informações de contato e legal

## 🛠️ Como Usar

### 1. Abrir a Landing Page
```bash
# Abra o arquivo index.html em qualquer navegador
# Ou use um servidor local:
python -m http.server 8000
# Depois acesse: http://localhost:8000
```

### 2. Personalizar Conteúdo

#### Textos e Conteúdo
Edite o arquivo `index.html` para alterar:
- Nome e título
- Textos das seções
- Números e estatísticas
- Links de vídeo

#### Cores e Estilo
Edite o arquivo `styles.css` para personalizar:
- Cores principais (variável `--primary-color`)
- Tipografia
- Espaçamentos
- Efeitos visuais

#### Funcionalidades
Edite o arquivo `script.js` para:
- Adicionar formulários de captura
- Integrar com sistemas de CRM
- Personalizar animações
- Adicionar tracking

## 🎯 Personalizações Recomendadas

### 1. Substituir Imagens
```html
<!-- Substitua as URLs das imagens por suas próprias -->
<img src="sua-imagem.jpg" alt="Manoel Santos">
```

### 2. Adicionar Formulário de Captura
```javascript
// No script.js, substitua o alert por um formulário real
ctaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        // Abrir modal de formulário ou redirecionar
        openLeadForm();
    });
});
```

### 3. Integrar com Analytics
```javascript
// Adicionar Google Analytics ou Facebook Pixel
gtag('event', 'click', {
    'event_category': 'CTA',
    'event_label': 'Botão Principal'
});
```

### 4. Adicionar Vídeo Real
```html
<!-- Substitua o placeholder por um vídeo real -->
<iframe src="https://www.youtube.com/embed/SEU_VIDEO_ID"></iframe>
```

## 📱 Responsividade

A landing page é totalmente responsiva e se adapta a:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: 320px - 767px

## 🚀 Deploy

### Opções de Hospedagem

1. **GitHub Pages** (Gratuito)
2. **Netlify** (Gratuito)
3. **Vercel** (Gratuito)
4. **Hostinger** (Pago)
5. **GoDaddy** (Pago)

### Exemplo com Netlify
1. Faça upload dos arquivos para o Netlify
2. Configure o domínio personalizado
3. Ative HTTPS automaticamente

## 📊 Otimizações de Performance

- ✅ Imagens otimizadas
- ✅ CSS minificado
- ✅ JavaScript otimizado
- ✅ Fontes web otimizadas
- ✅ Lazy loading de imagens

## 🔧 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica
- **CSS3**: Estilos modernos com Flexbox e Grid
- **JavaScript ES6+**: Interatividade e animações
- **Font Awesome**: Ícones
- **Google Fonts**: Tipografia Inter

## 📞 Suporte

Para dúvidas ou personalizações específicas:
- Email: seu-email@exemplo.com
- WhatsApp: (11) 99999-9999

## 📄 Licença

Este projeto é de uso livre para fins comerciais e pessoais.

---

**Desenvolvido com ❤️ para Manoel Santos - Diretor de Vendas** 