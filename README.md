<h1 align="center">Assistente de Vendas Inclusivo com IA</h1>

<div align="center">
  <a href="https://www.linkedin.com/in/paulodms/" target="_blank">
    <img src="https://img.shields.io/static/v1?message=PAULO&logo=linkedin&label=&color=EA4C89&logoColor=white&labelColor=&style=for-the-badge" height="40" alt="LinkedIn Paulo" />
  </a>
  <a href="https://www.linkedin.com/in/anabeatrizviga-dev/" target="_blank">
    <img src="https://img.shields.io/static/v1?message=ANA&logo=visualstudio&label=&color=1de9b6&logoColor=white&labelColor=&style=for-the-badge" height="40" alt="Perfil Ana" />
  </a>
  <a href="https://www.linkedin.com/in/wanderson-souza-sa-filho-ba9646328/" target="_blank">
    <img src="https://img.shields.io/static/v1?message=WANDERSON&logo=slack&label=&color=9146FF&logoColor=white&labelColor=&style=for-the-badge" height="40" alt="Perfil Wanderson" />
  </a>
</div>

<br />

<div align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg" height="50" alt="JavaScript" />
  <img width="45" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" height="50" alt="HTML5" />
  <img width="45" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" height="50" alt="CSS3" />
  <img width="45" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" height="50" alt="AWS" />
</div>

---

## 📝 Descrição

Assistente web para apoio na **identificação de medicamentos**, com foco em **acessibilidade** para idosos e pessoas com deficiência visual ou auditiva  

Este repositório contém o **protótipo frontend** e a documentação da **arquitetura serverless proposta em AWS**

---

## 📚 Índice

- [Visão geral](#visao-geral)
- [Funcionalidades](#funcionalidades)
- [Acessibilidade](#acessibilidade)
- [Arquitetura proposta](#arquitetura-proposta)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Como executar localmente](#como-executar-localmente)
- [Roadmap](#roadmap)
- [Autores](#autores)
- [Licença](#licenca)

---

<h2 id="visao-geral">📌 Visão geral</h2>

O **Assistente de Vendas Inclusivo com IA** foi desenvolvido como parte de um TCC na **Escola da Nuvem (Projeto Restart + IA)** para demonstrar:

- Uso de **serviços em nuvem (AWS)** em uma arquitetura **serverless**
- Aplicação prática de **Inteligência Artificial**  
  (reconhecimento de imagens e síntese de voz)
- Foco em **acessibilidade digital**, alinhado às necessidades de:
  - idosos
  - pessoas com baixa visão
  - pessoas com deficiência auditiva

**Fluxo esperado do usuário:**

1. Acessa o aplicativo pelo navegador (de preferência no celular)
2. Faz login (fluxo conceitual com Google, Facebook ou SMS)
3. Tira uma foto da embalagem do medicamento ou informa o código de barras
4. Recebe as informações do medicamento em:
   - texto
   - leitura em voz alta
   - interpretação em LIBRAS (via **VLibras**)

> ⚠️ Neste repositório a identificação do medicamento ainda é **simulada no frontend**
> A integração real com os serviços da AWS faz parte do **roadmap**

---

<h2 id="funcionalidades">✨ Funcionalidades</h2>

### Onboarding

- Tela inicial com **splash screen**
- Carrossel com passos de introdução, explicando:
  - objetivo do aplicativo
  - como funciona a identificação de medicamentos
  - recursos de acessibilidade disponíveis
- Ação final leva o usuário ao fluxo de login

### Fluxo de login (UI)

- Botões:
  - **“Entrar com Google”**
  - **“Entrar com Facebook”**
  - **“Entrar com celular (SMS)”**
- Telas para:
  - informar número de telefone
  - informar código de verificação (OTP)
- Mensagens e tooltips orientadas à futura integração com **Amazon Cognito** e **Amazon SNS**

> 🔒 Não há autenticação real neste protótipo. O fluxo é apenas de interface

### Identificação do medicamento (simulada)

- Tela principal com:
  - botão **“Tirar foto”** (abre seletor de imagem do navegador)
  - botão **“Código de barras”** (abre tela para digitar o código)
- Após o envio, é exibida uma tela de **“análise”** e, em seguida, o resultado:
  - Nome do medicamento (ex.: *Losartana Potássica 50 mg – 30 comprimidos*)
  - Laboratório (ex.: **Eurofarma – genérico**)
  - Faixa de preço estimada
  - Localização na loja (corredor/prateleira/seção)
  - Avisos importantes (ex.: uso sob prescrição médica)

A imagem `losartana.jpg` é utilizada como **exemplo de embalagem** no protótipo

### Leitura em voz alta

- Botão **“Ouvir tudo”**:
  - Lê em voz alta o texto principal da tela de resultado  
    (nome, dosagem, preço, avisos)
  - Implementado via **Web Speech API** (`window.speechSynthesis`) em `pt-BR`
- Botão **“Parar voz”** para interromper a leitura

### Logs (conceito CloudWatch)

- Rodapé fixo simulando um painel de logs do **Amazon CloudWatch**
- Mostra eventos a cada ação do usuário (login, upload de imagem, análise etc.)
- Recurso pedagógico para visualizar o fluxo que ocorreria no backend em AWS

---

<h2 id="acessibilidade">Acessibilidade</h2>

O projeto foi modelado com foco em **acessibilidade** desde o início

### Controle de fonte

- Botões **“A+”** e **“A–”** para aumentar ou diminuir o tamanho da fonte global
- Ajuste aplicado no elemento `html`, facilitando a leitura

### Modo alto contraste

- Alternância entre:
  - tema padrão (teal/verde)
  - tema de **alto contraste** (fundo preto, tipografia amarela/branca, bordas bem definidas)
- Estilização complementar em `style.css` para manter botões, cards e campos legíveis nesse modo

### Leitura automática

- Opção **“Auto leitura”**:
  - Quando ativada, o texto principal da tela é lido automaticamente sempre que o usuário troca de etapa (home, código de barras, análise, resultado)

### Integração com VLibras

- Inclusão do **widget oficial do VLibras** no `index.html`
- Disponível em todas as telas para interpretação em LIBRAS

---

<h2 id="arquitetura-proposta">☁️ Arquitetura proposta</h2>

A arquitetura abaixo é conceitual e está documentada em  
`docss/diagrama-assistente-de-vendas.png`.

![Diagrama de Arquitetura em AWS](docss/diagrama-assistente-de-vendas.png)

**Resumo dos componentes planejados:**

- **Camada de borda**
  - Amazon Route 53 (DNS)
  - Amazon CloudFront (CDN)
  - AWS WAF (firewall de aplicação)

- **Frontend**
  - Aplicação estática hospedada em **Amazon S3** e entregue via **CloudFront**

- **Autenticação e notificação**
  - Amazon Cognito (usuários, login social e OTP por SMS)
  - Amazon SNS (envio de SMS)

- **Backend serverless**
  - Amazon API Gateway (exposição de APIs REST)
  - AWS Lambda (funções para:
    - processar imagem
    - consultar/atualizar dados no DynamoDB
    - gerar áudio com Polly)

- **Dados e IA**
  - Amazon Rekognition (Custom Labels) para identificação de embalagens
  - Amazon Polly para síntese de voz
  - Amazon DynamoDB para dados de medicamentos
  - Amazon S3 para imagens e áudios

- **Monitoramento e segurança**
  - Amazon CloudWatch (logs e métricas)
  - AWS IAM (permissões e papéis)

> A implementação desses serviços **não está neste MVP**,  
> mas o projeto foi desenhado para evoluir nessa direção

---

<h2 id="tecnologias-utilizadas">🧰 Tecnologias utilizadas</h2>

### Frontend

- HTML5  
- Tailwind CSS (via CDN)  
- CSS custom (`style.css`)  
- JavaScript (ES6) – `main.js`  
- Web Speech API (SpeechSynthesis)  
- Lucide Icons (via CDN)  
- Widget VLibras  

### Backend (planejado)

- Node.js em AWS Lambda  
- Amazon API Gateway  
- Amazon Rekognition (Custom Labels)  
- Amazon Polly  
- Amazon DynamoDB  
- Amazon S3  
- Amazon CloudFront  
- Amazon Cognito  
- Amazon SNS  
- Amazon CloudWatch  
- AWS WAF  
- AWS IAM  

---

<h2 id="estrutura-do-projeto">🗂 Estrutura do projeto</h2>

```bash
.
├── pwa-assistente-de-vendas/
    ├── index.html                     # SPA principal
    ├── main.js                        # Lógica da aplicação e acessibilidade
    ├── style.css                      # Estilos complementares (ex.: modo alto contraste)
    ├── losartana.jpg                  # Imagem de exemplo de medicamento
├── docss/
│   ├── TCC-Final-Grupo5.pdf       # Documento do TCC
│   ├── Calculadora-de-Preco.pdf   # Estimativa de custos na AWS
│   └── Diagrama-TCC5-drawio-fundobranco.png  # Diagrama de arquitetura
└── README.md

```
---

<h2 id="como-executar-localmente">▶️ Como executar localmente</h2>

Projeto frontend estático – Baixe a pasta pwa-assistente-de-vendas-ia e rode localmente na sua máquina o código

<h2 id="roadmap">Roadmap</h2>

- [ ] Implementar backend real com **AWS Lambda + API Gateway**  
- [ ] Integrar autenticação com **Amazon Cognito**  
- [ ] Integrar envio de SMS com **Amazon SNS**  
- [ ] Integrar análise de imagem com **Amazon Rekognition Custom Labels**  
- [ ] Integrar síntese de voz com **Amazon Polly**  
- [ ] Persistir dados de medicamentos em **Amazon DynamoDB**  
- [ ] Criar pipeline de **CI/CD** (GitHub Actions + S3/CloudFront)  
- [ ] Adicionar testes automatizados (unitários e E2E)  
- [ ] Internacionalização (pt-BR / en-US)  

---

<h2 id="autores">👥 Autores</h2>

Projeto desenvolvido como parte do TCC do Projeto Restart + IA – Escola da Nuvem (Grupo 5):

<a href="https://www.linkedin.com/in/paulodms/">Paulo Damasceno dos Santos</a>

<a href="https://www.linkedin.com/in/anabeatrizviga-dev/">Ana Beatriz de Souza Viga</a>

<a href="https://www.linkedin.com/in/wanderson-souza-sa-filho-ba9646328/">Wanderson Carlos Ramos de Souza Sá Filho</a>

<h2 id="licenca">📜 Licença</h2>

MIT License

Copyright (c) 2025 Assistente de Vendas Inclusivo com IA

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights  
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell  
copies of the Software, and to permit persons to whom the Software is  
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all  
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR  
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,  
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE  
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER  
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,  
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE  
SOFTWARE.

---

<div align="center">
  <img src="https://raw.githubusercontent.com/trizcodes/Assistente-Vendas-Inclusivo-IA/output/snake.svg" alt="Snake animation" />
</div>
