# Calcular Flow Brasil - Site de Calculadora de Pedágios

Site profissional e pronto para publicação, desenvolvido seguindo todas as diretrizes do Google Ads e da LGPD.

## 📂 Estrutura de Arquivos

```
pedagio-site/
├── index.html                  # Página principal com calculadora
├── robots.txt                  # Controle de indexação
├── sitemap.xml                 # Mapa do site para buscadores
├── assets/
│   ├── styles.css             # Estilos do site
│   ├── script.js              # Lógica da calculadora + cookies + termos
│   └── img/                   # Imagens do site
│       ├── pedagio-hero.png
│       ├── pedagio-tags.png
│       └── pedagio-eletronico.png
└── pages/
    ├── sobre.html             # Página sobre nós
    ├── contato.html           # Página de contato com formulário
    ├── termos.html            # Termos de Uso
    ├── privacidade.html       # Política de Privacidade (LGPD)
    ├── cookies.html           # Política de Cookies
    └── lgpd.html              # Compromisso LGPD
```

## ✅ O que está incluído

### Conformidade com Google Ads
- ✓ Política de Privacidade completa
- ✓ Termos de Uso detalhados
- ✓ Política de Cookies
- ✓ Página Sobre Nós com descrição clara do serviço
- ✓ Página de Contato com formulário
- ✓ CNPJ visível no rodapé de todas as páginas
- ✓ Aviso legal claro em todas as páginas
- ✓ Modal de aceite de termos no primeiro acesso
- ✓ Banner de cookies (LGPD)
- ✓ Meta tags SEO
- ✓ Schema.org estruturado
- ✓ Robots.txt e Sitemap.xml

### Design
- ✓ Visual moderno e profissional (azul corporativo)
- ✓ 100% responsivo (mobile, tablet, desktop)
- ✓ Animações suaves
- ✓ Typography premium (Plus Jakarta Sans + Inter)
- ✓ Dark footer com disclaimer

### Funcionalidades
- ✓ Calculadora de pedágios com dados de 8 rotas principais
- ✓ 4 categorias de veículos (carro, moto, caminhão, ônibus)
- ✓ Cálculo de combustível estimado
- ✓ Lista detalhada de cada praça
- ✓ FAQ com perguntas frequentes
- ✓ Formulário de contato
- ✓ Menu mobile funcional

## 🔧 PERSONALIZAÇÃO OBRIGATÓRIA

**ATENÇÃO: Antes de publicar, você DEVE substituir os dados fictícios:**

### 1. ✅ CNPJ e Razão Social (JÁ PREENCHIDOS)
Os seguintes dados já estão configurados em todas as páginas:
- **Razão Social:** SYLUS IMOBILIARIA LTDA
- **Nome Fantasia/Marca:** Calcular Flow Brasil
- **CNPJ:** 17.644.769/0001-45

Se precisar alterar futuramente, busque por `17.644.769/0001-45` ou `SYLUS IMOBILIARIA LTDA` em todos os arquivos .html.

### 2. Substituir e-mails
Busque e substitua:
- `daniel@imobiliariasillos.com.br` → seu e-mail de contato
- `daniel@imobiliariasillos.com.br` → e-mail do encarregado LGPD (pode ser o mesmo)

### 3. Substituir endereço
Busque `São Paulo - SP, Brasil` e substitua pelo endereço real da empresa.

### 4. Substituir domínio
Busque `calcularflowbrasil.com.br` e substitua pelo seu domínio real em:
- Todas as tags `<link rel="canonical">`
- Meta tags Open Graph
- `sitemap.xml`
- `robots.txt`

### 5. Nome da empresa (opcional)
Se quiser mudar "Calcular Flow Brasil" para outro nome, faça busca global e substitua.

## 📤 Como Publicar

### Opção 1: Hospedagem tradicional (cPanel, hostgator, hostinger etc.)
1. Compacte a pasta `pedagio-site` em ZIP
2. Faça upload no gerenciador de arquivos da hospedagem
3. Descompacte dentro da pasta `public_html`
4. Acesse seu domínio

### Opção 2: Netlify (grátis)
1. Crie conta em netlify.com
2. Arraste a pasta `pedagio-site` na área de deploy
3. Pronto! Pode conectar seu domínio depois

### Opção 3: Vercel (grátis)
1. Crie conta em vercel.com
2. Importe o projeto
3. Deploy automático

### Opção 4: GitHub Pages (grátis)
1. Crie um repositório público no GitHub
2. Suba os arquivos
3. Ative o GitHub Pages nas configurações

## 🎯 Preparação para Google Ads

Para passar na aprovação do Google Ads, certifique-se de:

1. **Domínio próprio (não subdomínio gratuito)**: Compre um domínio .com.br
2. **SSL/HTTPS ativado**: Quase todas as hospedagens oferecem gratuitamente via Let's Encrypt
3. **Site totalmente funcional**: Teste todos os links e formulários
4. **CNPJ ativo e documentos fiscais válidos**
5. **Preencher o Google Search Console** com o sitemap.xml
6. **Dar pelo menos 7 dias de idade ao site** antes de anunciar
7. **Não prometa economizar dinheiro em pedágios ou isenções** (isso é violação)
8. **Aguarde a indexação do Google** antes de criar campanhas

## 📊 Adicionar Google Analytics

Para adicionar GA4, cole o código de rastreamento antes da tag `</head>` em cada página:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-SEU_ID_AQUI"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-SEU_ID_AQUI');
</script>
```

## ⚠️ Avisos Importantes

1. **Valores de pedágio**: Os valores no JavaScript são ilustrativos. Você pode atualizar consultando os sites oficiais das concessionárias.
2. **Formulário de contato**: Atualmente apenas simula o envio. Para funcionar de verdade, integre com serviços como Formspree, Netlify Forms ou um backend próprio.
3. **NÃO prometa venda de tags**, descontos ou qualquer coisa que você não entregue.
4. **Mantenha o disclaimer visível**: ele protege você legalmente.

## 📞 Dúvidas?

Este site foi desenvolvido como um template profissional. Adapte conforme sua necessidade específica. Qualquer dúvida sobre legislação, consulte um advogado.
