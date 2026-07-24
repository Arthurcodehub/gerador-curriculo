# Gerador de Currículo

Aplicação web para criar currículos profissionais com pré-visualização em tempo real e exportação em PDF. Desenvolvida com HTML, CSS e JavaScript puro, sem frameworks ou dependências externas.



![Status](https://img.shields.io/badge/status-concluído-brightgreen)



## Demonstração

🔗 [Acesse o projeto online](https://arthurcodehub.github.io/gerador-curriculo/)

## Funcionalidades

- Formulário organizado em seções: dados pessoais, experiência, formação e habilidades
- Pré-visualização do currículo atualizada em tempo real, no formato de folha A4
- Adição e remoção dinâmica de itens de experiência e formação
- Salvamento automático no navegador (`localStorage`) — o progresso não se perde ao recarregar a página
- Exportação para PDF via impressão do navegador
- Validação de campos obrigatórios com feedback visual e mensagens acessíveis
- Interface responsiva, adaptada para desktop e mobile
- Navegação por teclado e suporte a leitores de tela (skip link, `aria-live`, `aria-invalid`)

## Tecnologias

- HTML5 semântico
- CSS3 (Grid, Flexbox, variáveis CSS, `@media print`)
- JavaScript (ES6+), sem bibliotecas ou frameworks

## Como rodar o projeto

Como é um projeto estático (sem back-end), basta abrir o `index.html` no navegador. Recomenda-se usar um servidor local para evitar restrições do navegador com módulos e requisições locais:

\`\`\`bash
git clone https://github.com/Arthurcodehub/gerador-curriculo.git
cd gerador-curriculo
\`\`\`

Depois, abra `index.html` com a extensão **Live Server** (VS Code) ou rode:

\`\`\`bash
python3 -m http.server 8000
\`\`\`

E acesse `http://localhost:8000` no navegador.

## Estrutura do projeto

\`\`\`
gerador-curriculo/
├── index.html
├── css/
│   ├── reset.css      # normalização entre navegadores
│   ├── style.css       # estilos principais e componentes
│   └── print.css       # regras específicas para exportação em PDF
├── js/
│   ├── storage.js       # persistência de dados (localStorage)
│   ├── form.js          # captura e validação do formulário
│   ├── preview.js       # renderização do currículo em tempo real
│   └── app.js            # orquestrador principal
└── README.md
\`\`\`

## Decisões técnicas

- **Sem frameworks:** projeto pensado para reforçar fundamentos de JavaScript puro (manipulação de DOM, eventos, `localStorage`)
- **Arquitetura modular:** cada arquivo JS tem uma responsabilidade única (captura de dados, renderização, persistência), facilitando manutenção e leitura
- **Exportação via impressão:** em vez de bibliotecas de geração de PDF, usa `window.print()` combinado com CSS `@media print`, mantendo o projeto leve e sem dependências

## Melhorias futuras

- [ ] Múltiplos temas de currículo
- [ ] Exportação direta em PDF sem passar pela caixa de diálogo de impressão

## Autor

Desenvolvido por [Arthur](https://github.com/Arthurcodehub) como projeto de portfólio.