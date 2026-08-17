# Gerador de Currículo

Aplicação web para criar currículos profissionais com pré-visualização em tempo real e exportação em PDF nativa. Desenvolvida com HTML, CSS e JavaScript puro (sem frameworks), com foco em acessibilidade, performance e segurança.

![Status](https://img.shields.io/badge/status-conclu%C3%ADdo-brightgreen)
![Performance](https://img.shields.io/badge/PageSpeed-93%2F100-brightgreen)
![Accessibility](https://img.shields.io/badge/Accessibility-100%2F100-brightgreen)
![Security](https://img.shields.io/badge/Mozilla_Observatory-A%2B-brightgreen)

## Demonstração

🔗 [Acesse o projeto online](https://arthurcodehub.github.io/gerador-curriculo/)

![Preview desktop](assets/screenshots/desktop.png)

![Preview mobile](assets/screenshots/mobile.png)

## Funcionalidades

- Formulário organizado em seções: dados pessoais, experiência, formação e habilidades
- Pré-visualização do currículo atualizada em tempo real, no formato de folha A4
- Adição e remoção dinâmica de itens de experiência e formação
- Salvamento automático no navegador (localStorage) — o progresso não se perde ao recarregar a página
- Exportação para PDF em um clique, com texto real e selecionável (compatível com sistemas de triagem/ATS)
- Validação de campos obrigatórios com feedback visual e mensagens acessíveis
- Interface responsiva, adaptada para desktop e mobile
- Navegação por teclado e suporte a leitores de tela (skip link, aria-live, aria-invalid)

## Qualidade e Performance

Auditado com [Google PageSpeed Insights](https://pagespeed.web.dev/):

| Categoria | Nota |
|---|---|
| Performance | 93/100 |
| Accessibility | 100/100 |
| Best Practices | 100/100 |
| SEO | 100/100 |

## Segurança

Auditado com [Mozilla HTTP Observatory](https://developer.mozilla.org/en-US/observatory), nota **120/100 (A+)**.

Medidas implementadas:

- **Content Security Policy (CSP)** restritiva (`default-src 'none'`, com liberação explícita apenas do necessário), incluindo `frame-ancestors`, `base-uri` e `form-action` travados
- **Subresource Integrity (SRI)** na dependência externa (jsPDF), garantindo que o script só executa se o conteúdo bater exatamente com o hash esperado
- **Referrer-Policy** restritiva (`strict-origin-when-cross-origin`)
- Sanitização de todo dado inserido no DOM (proteção contra XSS), sem uso de `eval()`, estilos ou eventos inline
- Nenhum dado do usuário sai do navegador — tudo (preview, PDF, persistência) roda 100% client-side

**Limitação conhecida:** headers HTTP como `X-Frame-Options` e `X-Content-Type-Options` dependem de configuração no servidor e não são configuráveis no GitHub Pages (hospedagem estática sem controle de servidor). A proteção equivalente contra clickjacking foi implementada via CSP (`frame-ancestors 'none'`).

## Tecnologias

- HTML5 semântico
- CSS3 (Grid, Flexbox, variáveis CSS, media print)
- JavaScript (ES6+), sem frameworks
- [jsPDF](https://github.com/parallax/jsPDF) — única dependência externa, usada para gerar o PDF com texto real (carregada via CDN com SRI)

## Como rodar o projeto

Como é um projeto estático (sem back-end), basta abrir o index.html no navegador. Recomenda-se usar um servidor local para evitar restrições do navegador com módulos e requisições locais.

Clonar o repositório:

```
git clone https://github.com/Arthurcodehub/gerador-curriculo.git
cd gerador-curriculo
```

Depois, abra index.html com a extensão Live Server (VS Code) ou rode:

```
python3 -m http.server 8000
```

E acesse http://localhost:8000 no navegador.

## Estrutura do projeto

<!-- TREE_START -->
```
.
├── assets
│   ├── icons
│   │   ├── android-chrome-192x192.png
│   │   ├── android-chrome-512x512.png
│   │   ├── apple-touch-icon.png
│   │   ├── favicon-16x16.png
│   │   ├── favicon-32x32.png
│   │   └── favicon.ico
│   └── screenshots
│       ├── desktop.png
│       └── mobile.png
├── css
│   ├── print.css
│   ├── reset.css
│   └── style.css
├── js
│   ├── app.js
│   ├── form.js
│   ├── modal.js
│   ├── pdf.js
│   ├── preview.js
│   └── storage.js
├── LICENSE
├── README.md
├── index.html
├── jsconfig.json
└── update-tree.sh

6 directories, 22 files
```
<!-- TREE_END -->

## Decisões técnicas

- **Sem frameworks**: projeto pensado para reforçar fundamentos de JavaScript puro (manipulação de DOM, eventos, localStorage)
- **Arquitetura modular**: cada arquivo JS tem uma responsabilidade única (captura de dados, renderização, persistência, geração de PDF), facilitando manutenção e leitura
- **PDF com texto real, não imagem**: a geração do PDF desenha o texto diretamente via jsPDF, em vez de rasterizar o HTML (como fazem bibliotecas baseadas em `html2canvas`). Isso mantém o PDF final com texto selecionável e legível por sistemas de triagem de currículo (ATS), à custa de mais código manual de posicionamento
- **Automação de documentação**: a árvore de pastas nesse README é atualizada automaticamente via Git hook (`update-tree.sh`) a cada commit, eliminando desatualização manual

## Melhorias futuras

- [ ] Múltiplos modelos/temas de currículo
- [ ] Upload de foto de perfil
- [ ] Hospedar a fonte (Inter) localmente, eliminando a dependência do Google Fonts

## Autor

Desenvolvido por [Arthur](https://github.com/Arthurcodehub) como projeto de portfólio.

