# Discovery de Negócio e Inovação

## MoovOlt — mobilidade elétrica com inteligência regional

**Preparado por MonyU**  
**Versão 1 · 16 de julho de 2026**  
**Uso estratégico da MoovOlt e MonyU**

---

## Resumo executivo

A MoovOlt está posicionada em um mercado que deixou de ser apenas uma promessa de eletrificação e entrou em uma fase de expansão operacional. Em maio de 2026, o Brasil registrava 25.429 pontos públicos e semipúblicos de recarga para um estoque estimado de 505.806 veículos plug-in. A relação de 19,9 veículos por ponto ainda é quase o dobro da referência de dez veículos por ponto citada pela ABVE. No Nordeste, a rede cresceu 20,5% em apenas três meses, chegando a 4.542 pontos.[^abve-may]

O principal achado desta discovery é direto: **a melhor avenida para a MoovOlt não é competir apenas pela venda do carregador. É ocupar a camada regional de confiança operacional — conformidade, gestão de energia, interoperabilidade e receita recorrente sobre os ativos de recarga.**

A empresa já reúne blocos pouco comuns em um player regional: plataforma CSMS, aplicativos publicados, arquitetura orientada a OCPP, fornecimento ou locação de carregadores, implantação e manutenção. Também possui inserção no ecossistema de inovação do Ceará e projeto selecionado pela FUNCAP em parceria com a Unifor.[^funcap] O desafio é converter esses ativos em uma tese comercial mais focada, comprovável e escalável.

As três oportunidades prioritárias são:

1. **MoovOlt CondoSafe — nota 9,1:** pacote de conformidade, engenharia, gestão de carga, cobrança individual e operação para condomínios, começando pela nova Norma Técnica 48/2025 do Corpo de Bombeiros do Ceará.
2. **MoovOlt Network Nordeste — nota 8,7:** federação white-label de operadores e integradores regionais, usando OCPP e OCPI para ampliar cobertura sem financiar uma rede proprietária extensa.
3. **MoovOlt Fleet Energy OS — nota 8,4:** gestão de recarga de frotas orientada a limites elétricos, disponibilidade operacional, tarifa, solar e armazenamento.

A recomendação é executar as três teses em paralelo controlado por 90 dias, com gates de decisão explícitos. Ao final, a MoovOlt deve escolher uma tese principal, uma adjacência e pausar frentes sem evidência suficiente. A expansão de corredores rápidos proprietários, embora atraente, não deve ser prioridade antes de a empresa comprovar utilização, confiabilidade e acesso a capital parceiro.

---

## 1. Escopo, método e limites

Esta discovery foi construída por desk research, com triangulação entre fontes oficiais da MoovOlt, lojas de aplicativos, repositórios técnicos, bases institucionais, dados setoriais, regulação, padrões internacionais, concorrentes, artigos científicos e bases de patentes.

O recorte geográfico prioriza Brasil, Nordeste e Ceará. O recorte tecnológico cobre CSMS, OCPP, OCPI, ISO 15118, smart charging, confiabilidade, segurança, integração renovável e V2G/V2B. O recorte de propriedade intelectual inclui dez famílias representativas e uma busca pública inicial por sinais associados à empresa.

### Limitações relevantes

- Não foram fornecidos dados internos de receita, margem, churn, CAC, funil, uptime, sucesso de sessão, telemetria ou contratos.
- Números de clientes, captação e marcos operacionais publicados no site da companhia são autodeclarados.
- Instagram, Facebook e YouTube limitaram a extração pública automatizada.
- A busca interativa do INPI não foi concluída. A ausência de resultado público não prova ausência de depósitos.
- O dimensionamento TAM/SAM/SOM é um proxy explícito de equipamentos, não uma estimativa auditada de receita de mercado.
- Status jurídicos de patentes consultados em agregadores devem ser revalidados nas autoridades competentes.

### Escala de confiança

- **Alta:** fonte oficial, regulatória, institucional ou dado primário verificável.
- **Média:** autodeclaração parcialmente corroborada ou inferência sustentada por múltiplas evidências.
- **Baixa:** proxy, extrapolação ou dado que depende de validação interna.

---

## 2. Retrato atual da MoovOlt

### 2.1 Identidade e posicionamento

A MoovOlt é a marca pública da **HCASTRO SISTEMAS DE MOBILIDADE LTDA**, CNPJ **52.316.815/0001-88**, fundada em 2023 e sediada em Fortaleza. O vínculo entre marca e entidade jurídica é corroborado por cadastro secundário e documento do Sebrae Ceará.[^sebrae][^cnpj]

O posicionamento declarado é de um ecossistema de mobilidade elétrica que combina gestão, implantação, manutenção, venda ou locação de equipamentos e modelos de monetização. O LinkedIn classifica a organização no setor de tecnologia, com faixa pública de 2–10 pessoas.[^linkedin]

### 2.2 Portfólio público

| Oferta | Modalidade | Referência pública |
|---|---|---:|
| Plataforma CSMS e aplicativo | Software | Mapa, QR, sessão, energia/custo, histórico, usuários e modo público/privado |
| Wallbox 7,4 kW Smart | Compra / locação | R$ 4.226,90 / R$ 299 por mês |
| Wallbox 22 kW Business | Compra / locação | R$ 5.737,90 / R$ 399 por mês |
| Carregador rápido 30 kW DC | Compra / locação | R$ 58.400 / R$ 3.771 por mês |
| Carregador rápido 60 kW DC | Compra / locação | R$ 121.350 / R$ 7.836 por mês |
| Infraestrutura AC | Serviço | A partir de R$ 3.600 |
| Infraestrutura DC | Serviço | Sob consulta |

Os preços de locação são apresentados como médias para 60 meses. A página pública chama itens de 30 kW e 60 kW de “AC Fast Charging”, embora a descrição técnica indique DC. Essa inconsistência deve ser corrigida: em um mercado dependente de confiança técnica, taxonomia imprecisa reduz credibilidade.[^products]

### 2.3 Ativos tecnológicos observáveis

Os aplicativos iOS e Android apresentam mapa de estações, leitura de QR code, início e encerramento de recarga, energia e custo em tempo real, histórico, estatísticas, gestão de usuários e configuração pública ou privada. O aplicativo iOS é publicado por HCASTRO SISTEMAS DE MOBILIDADE LTDA; a loja ainda não possui volume suficiente de avaliações para inferir satisfação.[^appstore][^play]

O repositório público `moovolt-csms` apresenta backend em Rust, WebSocket, AMQP/RabbitMQ, PostgreSQL e Docker, com arquitetura OCPP separando o serviço dos carregadores do servidor de gestão. É um sinal positivo de direção arquitetural, mas repositório público não comprova sozinho segurança, escala ou maturidade de produção.[^github]

### 2.4 Tração e ecossistema

O site relata seleção no Centelha, participação em Unifor Hub e Porto Digital, início de operações em 2025 e quatro clientes em operação em 2026. Esses números precisam ser confirmados internamente antes de uso em material de investimento.[^site]

Há evidência institucional mais forte de inserção no ecossistema: a Unifor incluiu a MoovOlt em programa de internacionalização, o Porto Digital a descreveu entre startups de seu ecossistema e a FUNCAP publicou seleção de projeto da HCASTRO/MoovOlt com a Unifor na linha de cidades inteligentes.[^unifor][^porto][^funcap]

---

## 3. Diagnóstico do negócio

### 3.1 Modelo atual — hipótese pública

**Segmentos atendidos:** condomínios; empresas e frotas; varejo e estacionamentos; proprietários de pontos; motoristas de veículos elétricos.

**Propostas de valor:** implantação ponta a ponta; gestão remota; cobrança; compra ou locação; monetização de vagas; visibilidade da sessão.

**Possíveis receitas:** margem de hardware; projeto e instalação; locação; mensalidade de software; O&M; participação transacional.

**Variáveis ainda não verificadas:** mix de receita; margem por oferta; CAC; payback; churn; MRR; uptime; taxa de sucesso das sessões; suporte por 100 sessões.

### 3.2 Problema central

O mercado cresce mais rapidamente do que a capacidade de operadores locais entregarem uma experiência simultaneamente **confiável, segura, interoperável e economicamente administrável**. É nessa interseção — e não no equipamento isolado — que há maior disposição a pagar e potencial de recorrência.

### 3.3 Jobs to be done

- **Síndicos e administradoras:** aprovar e operar recarga sem criar risco de incêndio, conflito condominial ou rateio injusto.
- **Gestores de frota:** carregar dentro de limites elétricos e horários operacionais com custo previsível.
- **Donos de pontos:** maximizar disponibilidade e utilização sem montar equipe técnica própria.
- **Motoristas:** encontrar, acessar, pagar e concluir a recarga com previsibilidade.

### 3.4 Perguntas que precisam de dados internos

1. Qual vertical produz maior receita recorrente com menor custo de aquisição?
2. Qual é a taxa real de sucesso de sessão e o uptime por modelo de carregador?
3. A base atual suporta cybersecurity robusta, smart charging e migração para OCPP 2.0.1/2.1?
4. Quanto capital fica imobilizado em locação e qual o payback real?
5. Quais parceiros podem ampliar cobertura sem transferir risco excessivo à MoovOlt?
6. Quais ativos merecem proteção por marca, software, desenho, segredo ou patente?

---

## 4. SWOT

| Forças | Fraquezas |
|---|---|
| Oferta integrada de software, app, hardware e serviço | Tração pública pequena e métricas operacionais não divulgadas |
| Arquitetura orientada a protocolo OCPP | Baixa prova social verificável nos aplicativos |
| Presença local e inserção institucional no Ceará | Portfólio amplo para uma equipe pública de 2–10 pessoas |
| Compra e locação reduzem barreira de entrada | Inconsistência de comunicação técnica no portfólio |
| Gestão de pontos públicos e privados | Sem evidência pública de OCPI, OCPP 2.0.1/2.1 ou segurança certificada |

| Oportunidades | Ameaças |
|---|---|
| Crescimento de plug-ins e rede de recarga | Plataformas nacionais mais capitalizadas |
| Normas de segurança criam demanda imediata | Comoditização de hardware e pressão de fabricantes globais |
| Fragmentação regional favorece roaming white-label | Falhas e incidentes com efeito reputacional elevado |
| Frotas exigem smart charging e gestão energética | Cybersecurity, fraude e indisponibilidade |
| Dados OCPP habilitam manutenção preditiva | Mudanças regulatórias, tributárias e técnicas |
| Ecossistemas de P&D e financiamento verde | Possível risco de colisão internacional de marca |

**Leitura:** a MoovOlt tem ativos suficientes para construir uma vantagem regional, mas precisa escolher um campo de batalha. A amplitude atual do portfólio deve ser reorganizada em ofertas verticais com métricas, playbooks e canais próprios.

---

## 5. PESTAL

### Político

O Programa MOVER formaliza incentivos à mobilidade e à descarbonização da cadeia automotiva. O Ceará também estrutura um polo automotivo com projeção de produção híbrida e elétrica. Isso cria ambiente para P&D e parcerias, mas edital não pode substituir demanda comercial.[^mover][^cehub]

### Econômico

Carregadores DC têm CAPEX alto e dependem fortemente de utilização. A estratégia deve privilegiar modelos asset-light, financiamento parceiro, software e O&M. Toda oferta de locação precisa de cálculo explícito de capital de giro, manutenção, valor residual e inadimplência.

### Social

A confiança do usuário depende menos da quantidade nominal de pontos e mais da probabilidade de a sessão funcionar. Estudos de campo mostram que falhas materiais em carregadores públicos alteram a experiência e o comportamento do motorista.[^rempel][^karanam]

### Tecnológico

OCPP 2.1 incorporou recursos ligados a ISO 15118-20, bidirecionalidade, controle de recursos distribuídos e pagamentos. OCPP 2.0.1 já possui trilhas de certificação para segurança, smart charging e ISO 15118. OCPI 2.3 é o principal vetor de interoperabilidade entre operadores e provedores de mobilidade.[^oca][^ocpi]

### Ambiental

Smart charging pode alinhar recarga, consumo e geração fotovoltaica, reduzindo picos e ampliando o autoconsumo. O valor deve ser medido por site, com baseline energético e metodologia transparente.[^fachrizal][^anwar]

### Legal

A ANEEL permite a exploração comercial da recarga pública com preços livremente negociados. O Inmetro informa que carregadores não estão hoje sujeitos à certificação compulsória da Portaria 148/2022, embora a série ABNT NBR IEC 61851 seja referência técnica. No Ceará, a NT 48/2025 passou a disciplinar sistemas de recarga em garagens, criando uma oportunidade imediata de compliance como serviço.[^aneel][^inmetro][^cbmce]

---

## 6. Mercado e dimensionamento

### 6.1 Evidências de crescimento

O Brasil vendeu 223.912 veículos eletrificados em 2025; 181.542 foram plug-in, equivalentes a 81% do total eletrificado. A participação dos eletrificados chegou a 9% do mercado anual e a 13% em dezembro.[^abve-sales]

Em maio de 2026, a infraestrutura pública e semipública tinha:

- **25.429 pontos** no Brasil;
- **16.828 AC** e **8.601 DC**;
- **505.806 veículos plug-in** no estoque acumulado 2022–maio de 2026;
- **19,9 veículos por ponto**;
- **4.542 pontos no Nordeste**, crescimento de 20,5% desde fevereiro;
- no trimestre, **+277 AC** e **+494 DC** no Nordeste.[^abve-may]

A IEA também registrou expansão brasileira de infraestrutura e vendas em 2025, reforçando o sinal de crescimento, embora metodologias e datas de corte variem.[^iea]

### 6.2 TAM, SAM e SOM — proxy transparente

O cálculo usa como referência reduzir a relação nacional para dez veículos plug-in por ponto. A conta é deliberadamente conservadora no preço: wallbox MoovOlt de 22 kW para AC e carregador MoovOlt de 30 kW para DC.

| Camada | Definição | Resultado |
|---|---|---:|
| Rede ideal | 505.806 veículos ÷ 10 | 50.581 pontos |
| Gap nacional | Rede ideal − 25.429 | 25.152 pontos |
| Mix aplicado ao gap | 66% AC / 34% DC | 16.645 AC + 8.507 DC |
| **TAM** | Equipamentos para o gap nacional | **R$ 592,3 milhões** |
| **SAM** | Fluxo anualizado da expansão trimestral no Nordeste | **R$ 121,8 milhões/ano** |
| **SOM** | 0,5%–1,0% do fluxo regional | **R$ 608,8 mil–R$ 1,22 milhão/ano** |
| Volume SOM | Aproximação pelo mix regional | **15–31 pontos/ano** |

#### Fórmulas

**TAM:** 16.645 × R$ 5.737,90 + 8.507 × R$ 58.400 = R$ 592.316.145,50.

**SAM:** a expansão trimestral do Nordeste foi anualizada: 1.108 AC + 1.976 DC. Aplicando os preços de referência, o fluxo equivale a R$ 121.755.993,20.

**SOM:** 0,5%–1,0% do SAM = R$ 608.779,97 a R$ 1.217.559,93.

#### Limitações

Este é um **proxy de equipamentos**, não receita observada. Exclui instalação, software, energia, financiamento, operação, impostos e descontos. Anualiza um único trimestre e assume continuidade do mix AC/DC. Portanto, TAM tem confiança média; SAM e SOM, baixa até serem substituídos por pipeline, ticket e conversão reais.

---

## 7. Cenário competitivo

| Player | Evidência de oferta | Força aparente | Espaço para a MoovOlt |
|---|---|---|---|
| Tupi | CSMS, app, pagamentos, fiscal, suporte, OCPP | Base nacional e ecossistema | Proximidade regional e compliance de campo |
| Voltbras | CSMS white-label, pagamentos, roaming e APIs | Integrações e parceiros automotivos | Verticalização e execução física no Nordeste |
| Zletric | Condomínios, cobrança individual, rede e app | Especialização condominial | NT 48/2025 e resposta local |
| ELEV | OCPP, OCPI, telemetria e insights preditivos | Interoperabilidade e narrativa técnica | Pacote ponta a ponta e canal regional |
| WEG WEMOB | Hardware, app e gestão | Marca, hardware e canais | Agilidade, multimarcas e software local |
| Integradores regionais | Projeto e instalação elétrica | Relacionamento e serviço de campo | Torná-los canais conectados ao CSMS |

Fontes: páginas públicas de Tupi, Voltbras, Zletric, ELEV e WEG WEMOB.[^tupi][^voltbras][^zletric][^elev][^weg]

### Leitura competitiva

O software de gestão, isoladamente, já é um mercado competitivo. A diferenciação provável da MoovOlt está em combinar:

1. **implantação regulatoriamente segura**;
2. **operação regional com SLA**;
3. **software multimarcas e interoperável**;
4. **gestão energética verticalizada**;
5. **canais locais que não precisam trocar sua própria marca**.

Em vez de enfrentar integradores regionais, a MoovOlt pode transformá-los em parceiros de distribuição e serviço de campo.

---

## 8. Tendências tecnológicas com impacto

### OCPP 2.0.1 e 2.1

O roadmap precisa incluir device model, segurança, certificados, smart charging e compatibilidade com ISO 15118. A decisão não é migrar tudo imediatamente, mas medir o gap e evitar dívida arquitetural que bloqueie contratos futuros.[^oca]

### OCPI 2.3 e roaming

OCPI permite integração entre CPOs e provedores de mobilidade, bilateralmente ou por hubs. Para a MoovOlt, é o habilitador do modelo de federação Nordeste.[^ocpi]

### ISO 15118-20 e Plug & Charge

O padrão contempla comunicação EV–EVSE e bidirecionalidade. É estratégico para arquitetura e pilotos, mas não deve consumir o roadmap comercial antes de existir hardware, parceiro e caso econômico.[^iso]

### Smart charging

Revisões científicas convergem: gerenciar janela, potência, tarifa, geração e prioridade pode reduzir custo e impacto de pico. O benefício precisa ser demonstrado no site específico, não apenas simulado.[^sadeghian][^anwar]

### Reliability AI

O primeiro produto não precisa de “IA” sofisticada. A sequência correta é: taxonomia de falhas, dados completos, observabilidade, alertas, diagnóstico assistido e só então modelos preditivos. Uptime, taxa de sucesso e MTTR são ativos comerciais.

### Solar, armazenamento e V2B/V2G

É uma adjacência de P&D coerente com a parceria Unifor/FUNCAP. Deve operar como sandbox financiado, sem desviar a equipe da validação comercial prioritária.

---

## 9. Propriedade intelectual

### 9.1 Rastreio inicial da MoovOlt

Nenhum pedido de patente claramente atribuível à MoovOlt ou HCASTRO foi identificado nas buscas públicas web-indexadas. Isso **não significa ausência de depósito**. É necessária busca profissional no INPI por titular, inventores, marca e classes, além de inventário de software, código, contratos de cessão, segredos e documentação técnica.

Foi localizado um pedido norte-americano da marca **MOOVOLT**, por terceiro, para itens relacionados a baterias e carregadores. O achado não demonstra colisão no Brasil, porém justifica clearance de marca no INPI e nos mercados onde a empresa pretenda operar.[^trademark]

### 9.2 Radar de dez patentes/famílias

| Publicação | Tema | Status indicado na plataforma | Implicação |
|---|---|---|---|
| WO2023118649A1 | Gestão de estação, QR e acesso | PCT cessado; famílias pendentes | Examinar fluxos público/privado |
| US20230249560A1 | Acesso à rede, roaming e pagamento | Pedido pendente; família concedida | Mapear autenticação e roaming |
| US11225158B2 | Mediação entre carregador e servidores | Ativa | Relevante para arquitetura multi-CSMS |
| US20200333151A1 | Charge sharing e manutenção preditiva | Abandonada | Prior art útil; verificar famílias |
| US11968283B2 | Ponte OCPP–protocolos industriais | Ativa | Avaliar gateways futuros |
| US20180189900A1 | Gestão de rede e reserva | Abandonada | Prior art para operação e reservas |
| WO2014074425A2 | Filas e disponibilidade | Cessada | Investigar famílias EP/US |
| US12380372B2 | Reserva automática de carregador | Ativa | Claim chart antes de automatizar reservas |
| US9630511B2 | V2G e compensação de perdas | Expirada por taxas | Prior art para sandbox V2G |
| WO2025166382A1 | Pagamento por portal/QR | Publicada; validar | Próxima do checkout da plataforma |

Links e metadados completos constam na base JSON deste projeto.

> **Ressalva:** este radar é insumo de discovery, não parecer jurídico nem análise de liberdade de operação. Titularidade, família, status, território, validade e escopo das reivindicações precisam ser revalidados no INPI, WIPO, Espacenet e escritórios nacionais.

### 9.3 Estratégia de proteção recomendada

- Fazer clearance e estratégia territorial da marca MoovOlt.
- Garantir cessão de propriedade intelectual de fundadores, empregados e fornecedores.
- Registrar software e preservar histórico de autoria.
- Classificar segredos de negócio: regras de orquestração, diagnóstico, modelos, playbooks e dados.
- Realizar FTO antes dos módulos de roaming, reserva automática, gateways e V2G.
- Avaliar patenteabilidade apenas quando houver solução técnica específica, nova e documentada.

---

## 10. Evidência científica — dez artigos

1. **Sadeghian et al. (2022), Journal of Energy Storage.** Revisão abrangente de smart charging; fundamenta gestão de demanda. DOI: [10.1016/j.est.2022.105241](https://doi.org/10.1016/j.est.2022.105241).
2. **Dimitriadou et al. (2023), Energies.** Infraestrutura, padrões e integração. DOI: [10.3390/en16042057](https://doi.org/10.3390/en16042057).
3. **Fachrizal et al. (2020), eTransportation.** Recarga inteligente com geração fotovoltaica. DOI: [10.1016/j.etran.2020.100056](https://doi.org/10.1016/j.etran.2020.100056).
4. **Garofalaki et al. (2022), IEEE Communications Surveys & Tutorials.** Segurança e desafios de OCPP. DOI: [10.1109/COMST.2022.3184448](https://doi.org/10.1109/COMST.2022.3184448).
5. **Rempel et al. (2024), Human Factors.** Avaliação de confiabilidade de carregadores rápidos públicos. DOI: [10.1177/00187208231215242](https://doi.org/10.1177/00187208231215242).
6. **Karanam e Tal (2023), preprint.** Impacto de carregadores não confiáveis no comportamento. DOI: [10.21203/rs.3.rs-2592351/v1](https://doi.org/10.21203/rs.3.rs-2592351/v1).
7. **Mastoi et al. (2022), Energy Reports.** Infraestrutura, política e tendências. DOI: [10.1016/j.egyr.2022.09.011](https://doi.org/10.1016/j.egyr.2022.09.011).
8. **Shariatzadeh, Lopes e Antunes (2025), Applied Energy.** Comportamento do usuário e agenda de pesquisa. DOI: [10.1016/j.apenergy.2025.126167](https://doi.org/10.1016/j.apenergy.2025.126167).
9. **Anwar et al. (2022), Energy & Environmental Science.** Valor da recarga gerenciada. DOI: [10.1039/D1EE02206G](https://doi.org/10.1039/D1EE02206G).
10. **Barman et al. (2023), Renewable and Sustainable Energy Reviews.** Integração renovável e smart charging. DOI: [10.1016/j.rser.2023.113518](https://doi.org/10.1016/j.rser.2023.113518).

---

## 11. Portfólio de oportunidades

As notas sintetizam atratividade, aderência estratégica, evidência, viabilidade e risco. Os pesos e a fórmula proprietária da MonyU não são divulgados.

| Rank | Oportunidade | Nota | Horizonte | Decisão central |
|---:|---|---:|---|---|
| 1 | **MoovOlt CondoSafe** | **9,1** | 0–12 meses | Pilotos imediatos no Ceará |
| 2 | **MoovOlt Network Nordeste** | **8,7** | 3–18 meses | Federação asset-light |
| 3 | **MoovOlt Fleet Energy OS** | **8,4** | 3–18 meses | Economia mensurável em piloto pago |
| 4 | MoovOlt Reliability AI | 8,0 | 3–15 meses | Começar por observabilidade e SLA |
| 5 | Charge-as-a-Service Regional | 7,7 | 0–18 meses | Condicionar a unit economics e funding |
| 6 | MoovOlt Revenue Engine | 7,3 | 6–18 meses | Validar utilização e FTO de reservas |
| 7 | V2B/V2G Sandbox Ceará | 6,2 | 12–36 meses | P&D com parceiro e capital dedicado |
| 8 | Corredores rápidos proprietários | 5,7 | 12–48 meses | Somente com parceiro de ativos |

### 11.1 MoovOlt CondoSafe

**Conceito:** diagnóstico, projeto, conformidade, gestão de carga, cobrança individual, documentação, monitoramento e O&M para garagens.

**Receita:** projeto e implantação; mensalidade por site/ponto; O&M; locação.

**Por que agora:** a NT 48/2025 cria urgência e a MoovOlt já possui software e execução local.

**Gate:** três condomínios-piloto, aprovação técnica, cobrança individual, zero não conformidade crítica e contrato recorrente.

### 11.2 MoovOlt Network Nordeste

**Conceito:** conectar CPOs e integradores mantendo suas marcas, com roaming OCPI, gestão OCPP, pagamentos e suporte compartilhado.

**Receita:** SaaS por conector; take rate; setup; suporte premium.

**Por que agora:** a rede do Nordeste cresce rapidamente e é fragmentada. Parceria amplia cobertura com menor CAPEX.

**Gate:** dois operadores, 20 pontos interoperáveis, uso real e taxa de sucesso acima da meta acordada.

### 11.3 MoovOlt Fleet Energy OS

**Conceito:** orquestrar potência por limite do site, prioridade, rota, janela, tarifa, solar e armazenamento.

**Receita:** diagnóstico; SaaS por veículo/conector; integração; success fee sobre economia.

**Por que agora:** economia e disponibilidade da frota são mensuráveis e podem sustentar ticket recorrente superior.

**Gate:** piloto pago que reduza pico ou custo sem comprometer veículos prontos no horário.

### 11.4 MoovOlt Reliability AI

Saúde do ativo, detecção de anomalias, alertas e manutenção preditiva. O gate inicial é reduzir MTTR a partir de uma taxonomia de falhas e baseline confiável, antes de treinar modelos avançados.

### 11.5 Charge-as-a-Service Regional

Oferta de implantação, operação e manutenção por mensalidade para varejo, hospitalidade e estacionamentos. Deve ser estruturada com parceiro financeiro e contratos mínimos para evitar pressão sobre caixa.

### 11.6 MoovOlt Revenue Engine

Reservas, preço por horário, fidelidade, mídia local e analytics. Deve vir depois de uma base ativa e de análise de propriedade intelectual dos fluxos de reserva.

### 11.7 V2B/V2G Sandbox Ceará

Laboratório de bidirecionalidade com Unifor, concessionária e fabricante. É uma tese de P&D e posicionamento futuro, não o produto comercial prioritário.

### 11.8 Corredores rápidos proprietários

O mercado DC cresce, mas a rede própria concentra CAPEX, conexão, manutenção e risco de utilização. Prosseguir apenas com parceiro de ativos e estudo de demanda por local.

---

## 12. Top 3 — teses de validação

### 1. CondoSafe: ganhar pela confiança

**Tese:** a nova exigência de segurança permite à MoovOlt vender um sistema operacional condominial, e não apenas carregadores.

**Primeiro experimento:** três condomínios de perfis distintos.

**KPIs:** tempo até aprovação; custo por vaga habilitada; sessões individualizadas; uptime; MRR por condomínio; não conformidades críticas.

**Decisão em 90 dias:** escalar via administradoras se pelo menos dois pilotos converterem em recorrência com margem positiva.

### 2. Network Nordeste: ganhar pela federação

**Tese:** cobertura regional pode ser construída com parceiros, deixando à MoovOlt a camada de software, pagamento e suporte.

**Primeiro experimento:** dois operadores e vinte pontos em ambiente interoperável.

**KPIs:** pontos conectados; sucesso de sessão; tempo de integração; transações roaming; receita por conector; tickets por 100 sessões.

**Decisão em 90 dias:** prosseguir se houver uso real, governança contratual e economics positivos.

### 3. Fleet Energy OS: ganhar pela economia

**Tese:** smart charging transforma potência elétrica em economia e previsibilidade, justificando SaaS de maior valor.

**Primeiro experimento:** uma frota com ao menos dez veículos ou cinco conectores.

**KPIs:** pico kW; custo de energia por km; veículos prontos; utilização; uptime; economia líquida.

**Decisão em 90 dias:** verticalizar se a economia exceder com folga a mensalidade e não reduzir a disponibilidade da frota.

---

## 13. Plano 30/60/90

### 0–30 dias — preparar a validação

- Auditar OCPP, cybersecurity, telemetria e métricas de sessão.
- Construir matriz da NT 48/2025 com engenheiro habilitado e Corpo de Bombeiros.
- Entrevistar dez condomínios/administradoras, dez frotas e cinco operadores.
- Definir unit economics por hardware, instalação, software, locação e O&M.
- Corrigir taxonomia técnica do site e instrumentar funil e aplicativos.
- Iniciar busca profissional de marca, software e patentes no INPI.

**Entregáveis:** kit CondoSafe v0; baseline do produto; lista de pilotos; painel de unit economics; matriz de riscos.

### 31–60 dias — executar e medir

- Iniciar três pilotos CondoSafe.
- Conectar o primeiro parceiro da Network Nordeste em teste.
- Rodar piloto Fleet OS com regras simples e baseline energético.
- Implantar KPIs de uptime, sucesso, MTTR, tickets e margem.
- Formalizar contratos, responsabilidade técnica, LGPD e SLA.

**Entregáveis:** pilotos ativos; dashboard; primeiro contrato recorrente; arquitetura OCPI; playbook de suporte.

### 61–90 dias — decidir e concentrar

- Medir economia, confiabilidade, conversão e margem.
- Escolher uma tese principal e uma adjacência.
- Criar canal com administradoras e integradores certificados.
- Preparar tese de captação baseada em resultados observados.
- Definir roadmap OCPP 2.0.1/2.1, OCPI e Reliability AI.

**Entregáveis:** memo go/no-go; pipeline de parceiros; case de piloto; roadmap de 12 meses; tese de captação.

---

## 14. Riscos e mitigação

| Risco | Impacto | Mitigação prioritária |
|---|---|---|
| Incidente elétrico ou incêndio | Crítico | Responsabilidade técnica, normas, inspeção, manutenção e seguro |
| Falha de sessão | Alto | Observabilidade, SLA, redundância, runbooks e peças |
| Cybersecurity e fraude | Alto | TLS, certificados, segredos, atualizações, logs e resposta |
| CAPEX e capital de giro | Alto | Asset-light, parceiros e gates de utilização |
| Concentração de equipe | Alto | Foco vertical, documentação e canais de campo |
| Fiscal e pagamentos | Alto | Provedor especializado, reconciliação e piloto limitado |
| Marca e patentes | Médio–alto | Clearance, cessões e FTO |
| LGPD | Alto | Privacy by design, minimização e governança de retenção |

---

## 15. Recomendação final

A MoovOlt não precisa provar agora que consegue ser uma rede nacional. Precisa provar que consegue ser **a melhor camada regional de confiança operacional**: instalações seguras, sessões que funcionam, energia administrada, operadores conectados e receita recorrente.

O próximo passo é transformar a oportunidade prioritária em arquitetura de valor, piloto, roadmap e tese de captação. A decisão recomendada é iniciar pelo **CondoSafe**, validar em paralelo a **Network Nordeste** e buscar um piloto pago do **Fleet Energy OS**.

### [Avançar para o Projeto Matriz](https://wa.me/5585991577137?text=Ol%C3%A1%21%20Li%20o%20relat%C3%B3rio%20de%20Discovery%20de%20Inova%C3%A7%C3%A3o%20e%20quero%20avan%C3%A7ar%20para%20a%20defini%C3%A7%C3%A3o%20da%20oportunidade%20priorit%C3%A1ria%2C%20mapear%20o%20Projeto%20Matriz%20e%20estruturar%20a%20tese%20de%20capta%C3%A7%C3%A3o%20de%20recursos.%20Podemos%20seguir%20para%20o%20pr%C3%B3ximo%20passo%3F)

---

## Fontes principais

[^site]: [MoovOlt — site institucional](https://moovolt.com.br/)
[^products]: [MoovOlt — produtos](https://moovolt.com.br/products)
[^linkedin]: [MoovOlt no LinkedIn](https://www.linkedin.com/company/moovolt/)
[^appstore]: [MoovOlt na App Store](https://apps.apple.com/br/app/moovolt/id6615082106)
[^play]: [MoovOlt no Google Play](https://play.google.com/store/apps/details?id=br.com.moovolt.app)
[^github]: [Repositório público moovolt-csms](https://github.com/FlipSoftware/moovolt-csms)
[^sebrae]: [Sebrae Ceará — selecionadas do Prêmio Startup Destaque STS 2025](https://sebraeceara.com.br/wp-content/uploads/2025/10/Selecionadas-Premio-Startup-Destaque-STS-2025.pdf)
[^cnpj]: [Cadastro secundário da HCASTRO](https://cnpj.biz/52316815000188)
[^funcap]: [FUNCAP — resultado definitivo](https://montenegro.funcap.ce.gov.br/sugba/edital/resultados/703.pdf)
[^unifor]: [Unifor — programa de internacionalização](https://unifor.br/web/pesquisa-inovacao/-/startups-aceleradas-pelo-unifor-hub-entram-em-programa-de-internacionalizacao)
[^porto]: [Porto Digital — startups do ecossistema](https://jornaldigital.recife.br/2025/12/09/ecossistema-do-porto-digital-recebe-novas-startups-graduadas-e-premiadas-em-programas-de-2025/)
[^abve-sales]: [ABVE — vendas de eletrificados em 2025](https://abve.org.br/eletrificados-crescem-dez-vezes-mais-do-que-conjunto-do-mercado-em-2025-com-224-mil-veiculos-vendidos/)
[^abve-may]: [ABVE — infraestrutura em maio de 2026](https://abve.org.br/recarga-rapida-dc-cresce-33-em-tres-meses-e-puxa-a-expansao-da-rede/)
[^iea]: [IEA — Global EV Outlook 2026, charging](https://www.iea.org/reports/global-ev-outlook-2026/electric-vehicle-charging-chap-6-and-10)
[^mover]: [Lei nº 14.902/2024 — MOVER](https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2024/lei/l14902.htm)
[^cehub]: [Governo do Ceará — Polo Automotivo](https://www.ce.gov.br/2025/08/15/reuniao-de-acompanhamento-do-polo-automotivo-do-ceara-e-realizada-em-sao-paulo/)
[^aneel]: [ANEEL — veículos elétricos](https://www.gov.br/aneel/pt-br/assuntos/veiculos-eletricos)
[^inmetro]: [Inmetro — carregadores de veículos elétricos](https://www.gov.br/inmetro/pt-br/acesso-a-informacao/perguntas-frequentes/avaliacao-da-conformidade/aparelhos-eletrodomesticos-e-similares/carregadores-de-veiculos-eletricos-estao-no-escopo-da-portaria-inmetro-ndeg-148-de-2022-carregadores-de-veiculos-eletricos-devem-ser-certificados)
[^cbmce]: [CBMCE — NT 48/2025](https://www.bombeiros.ce.gov.br/2026/03/05/cbmce-publica-norma-tecnica-sobre-sistemas-de-recarga-para-veiculos-eletricos-em-garagens/)
[^oca]: [Open Charge Alliance — OCPP](https://openchargealliance.org/about-us/discover-our-history/)
[^ocpi]: [EVRoaming Foundation — OCPI](https://evroaming.org/ocpi/)
[^iso]: [ISO 15118-20](https://www.iso.org/standard/77845.html)
[^sadeghian]: [Sadeghian et al. (2022)](https://doi.org/10.1016/j.est.2022.105241)
[^fachrizal]: [Fachrizal et al. (2020)](https://doi.org/10.1016/j.etran.2020.100056)
[^anwar]: [Anwar et al. (2022)](https://doi.org/10.1039/D1EE02206G)
[^rempel]: [Rempel et al. (2024)](https://doi.org/10.1177/00187208231215242)
[^karanam]: [Karanam e Tal (2023)](https://doi.org/10.21203/rs.3.rs-2592351/v1)
[^tupi]: [Tupi — software de gestão](https://tupimob.com/software-de-gestao/)
[^voltbras]: [Voltbras](https://voltbras.com/)
[^zletric]: [Zletric — condomínios](https://www.zletric.com.br/lp/zletric-network-condominio-ceo)
[^elev]: [ELEV — empresas](https://elevmobility.com/para-empresas/)
[^weg]: [WEG WEMOB](https://materiais.wegdigital.weg.net/weg-digital-wemob-condominios-canais)
[^trademark]: [Justia — pedido de marca MOOVOLT nos Estados Unidos](https://trademarks.justia.com/992/19/moovolt-99219604.html)

---

**MonyU** · Estratégia, inovação e captação  
[www.monyu.com.br](https://www.monyu.com.br) · WhatsApp +55 85 99157-7137
