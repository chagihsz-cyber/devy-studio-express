# devY Studio — redesign comercial editorial (prévia v2)
Data de pesquisa e implementação: 13/10/2026.

## Escopo e cuidado
- Preservada a landing principal index.html da devY. Nova versão independente em preview-v2/.
- Sem backend, contas ou Pix. Contato por mailto para endereço Gmail conectado; nenhum envio automático.
- Imagens são capturas de protótipos próprios da biblioteca, não cases de clientes. Convertidas para webp a partir de arquivos preexistentes.
- Nova versão não implica aprovação comercial nem receita. Não alterar Motoquinha, backend e sites Assados em produção.

## Referências externas consultadas em 13/10/2026 (pesquisa de UX, sem copiar)
1. Instrument — https://www.instrument.com/ — foco público em trabalhos recentes, serviços e caminho de contato; lição: valorizar trabalhos reais antes de adjetivos.
2. Basement Studio — https://basement.studio/ — combina portfólio, ofertas de serviço e contato; lição: explicar especialidade e capacidade com projetos destacados.
3. Pentagram — https://www.pentagram.com/ — indexação e busca de trabalhos por indústria/disciplina; lição: distinguir seleções visuais pela natureza do projeto.
4. Studio Freight — https://studiofreight.com/ — o conteúdo principal pede JavaScript; dados insuficientes para analisar telas/fluxos; usado somente como referência geral de categorização.
Nenhuma fotografia, logo, código ou estrutura exclusiva foi copiada. Sem inferências de conversão, tráfego, prêmios ou clientes devY.

## Problemas de v1
- Abertura hero + janela fake do site + três cards de preço + passos + CTA: padrão recorrente de geradores IA.
- "preview" criado artificialmente em CSS no herói em vez de mostrar imagens de trabalhos reais.
- Grelha de cartões idênticos comunica template de preço antes de mostrar diferenciação.
- Página responsiva e publicada, mas requer direção autoral mais forte para o objetivo comercial.

## Três caminhos conceituais
A — Editorial em ação (implementado): manifesto tipográfico assimétrico, projetos demonstrativos, tabela de serviços. CTA por linha.
B — Tabela técnica de propostas (não implementado): serviço personalizado por checklist, matriz comparativa, interface documental.
C — Vitrine-first (não implementado): tela visual de estudos alternados, contato contextual por projeto, navegação por case.

Gate: pelo menos três eixos mudam entre cada conceito (ordem, navegação, apresentação, conversão, linguagem), com verificação textual no check_concepts.py. Avaliação visual humana continua necessária.

## Direção implementada
- Fundo papel, grafite e coral; títulos sans grandes com itálicos Georgia, linhas editoriais.
- Elemento de conversão na abertura + cada serviço como linha completa clicável; sem botões falsos.
- Projetos Lasanha+ e Doce+ com legenda de demonstração explícita e sem prometer loja ativa.
- Página estática sem chamadas a terceiros além do mailto; favicon SVG local; imagens WebP leves; sem dependências externas.
- Acessibilidade: skip link, links sem JS, foco visível, texto alternativo, media query mobile e prefers-reduced-motion.

## Verificações pendentes / resolvidas
- Validação sintática HTML e arquivos estáticos.
- Verificação HTTP 200 de prévia publicada.
- Captura mobile/desktop e análise de legibilidade, se navegador de teste estiver disponível.
- Revisão visual final e aceite humano **antes de substituir index.html público**.

## QA real — 13/10/2026
- Verificador textual anticlone em três direções documentadas: PASS (com ressalva de revisão visual humana).
- Inspeção de HTMLParser: sem IDs duplicados, âncoras internas íntegras, imagens locais presentes, quatro mailto, CSS de mobile e rótulos de demonstração: 8/8 PASS.
- GitHub Pages da prévia: build `built`, página e dois recursos WebP com HTTP 200. A versão principal permaneceu HTTP 200 e não foi substituída.
- Chrome real em modo headless no Bazzite: screenshot da abertura em 390×844 e 1440×900; resultados visualmente legíveis, sem colisão observada na primeira dobra. Evidências locais externas ao repositório em `/home/charlito/dev/devy-vendas-express-QA/`.
- Não houve teste integral de teclado com leitor de tela, validação externa de acessibilidade, consulta a clientes ou homologação comercial. Não declarar produção homologada.
