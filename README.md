# Assistente de Vendas Inclusivo com IA

Assistente web para apoio na identificação de medicamentos, com foco em acessibilidade para idosos e pessoas com deficiência visual ou auditiva.  
Este repositório contém o **protótipo frontend** e a documentação de arquitetura proposta em AWS (serverless)

---

## Índice

- [Visão geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Acessibilidade](#acessibilidade)
- [Arquitetura proposta](#arquitetura-proposta)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Como executar localmente](#como-executar-localmente)
- [Roadmap](#roadmap)
- [Autores](#autores)
- [Licença](#licença)

---

## Visão geral

O **Assistente de Vendas Inclusivo com IA** foi desenvolvido como parte de um TCC na Escola da Nuvem (Projeto Restart + IA) para demonstrar:

- Uso de **serviços em nuvem (AWS)** em uma arquitetura **serverless**;
- Aplicação prática de conceitos de **Inteligência Artificial** (reconhecimento de imagens e síntese de voz)
- Foco em **acessibilidade digital**, alinhado às necessidades de:
  - Idosos
  - Pessoas com baixa visão
  - Pessoas com deficiência auditiva

Fluxo esperado do usuário:

1. Acessa o aplicativo pelo navegador (preferencialmente no celular)
2. Faz login (fluxo conceitual com opções de Google, Facebook ou SMS)
3. Tira uma foto da embalagem do medicamento ou informa o código de barras
4. Recebe as informações do medicamento em:
   - texto
   - leitura em voz alta
   - interpretação em LIBRAS (via VLibras)

> Importante: neste repositório a identificação do medicamento ainda é **simulada no frontend**. A integração real com os serviços da AWS faz parte do roadmap

---

## Funcionalidades

### Onboarding

- Tela inicial com **splash screen**.
- Carrossel com passos de introdução, explicando:
  - objetivo do aplicativo;
  - como funciona a identificação de medicamentos;
  - recursos de acessibilidade disponíveis.
- Ação final leva o usuário ao fluxo de login.

### Fluxo de login (UI)

- Botões de:
  - “Entrar com Google”
  - “Entrar com Facebook”
  - “Entrar com celular (SMS)”
- Telas para:
  - informar número de telefone
  - informar código de verificação (OTP)
- Mensagens e tooltips orientadas à futura integração com **Amazon Cognito** e **Amazon SNS**

> Não há autenticação real neste protótipo. O fluxo é apenas de interface

### Identificação do medicamento (simulada)

- Tela principal com:
  - botão de **“Tirar foto”** (abre seletor de imagem do navegador)
  - botão de **“Código de barras”** (abre tela para digitar o código)
- Após o envio, é exibida uma tela de “análise” e, em seguida, o resultado:
  - Nome do medicamento (ex.: *Losartana Potássica 50 mg – 30 comprimidos*)
  - Laboratório (ex.: Eurofarma – genérico)
  - Faixa de preço estimada
  - Localização na loja (corredor/prateleira/seção)
  - Avisos importantes (ex.: uso sob prescrição médica)

A imagem `losartana.jpg` é utilizada como exemplo de embalagem no protótipo

### Leitura em voz alta

- Botão **“Ouvir tudo”**:
  - Lê em voz alta o texto principal da tela de resultado (nome, dosagem, preço, avisos)
  - Implementado via **Web Speech API** (`window.speechSynthesis`) configurada para `pt-BR`
- Botão **“Parar voz”** para interromper a leitura

### Logs (conceito CloudWatch)

- Rodapé fixo simulando um painel de logs do **Amazon CloudWatch**
- Mostra eventos a cada ação do usuário (login, upload de imagem, análise, etc.)
- Recurso pedagógico para visualizar o fluxo que ocorreria no backend em AWS

---

## Acessibilidade

O projeto foi modelado com foco em acessibilidade desde o início:

### Controle de fonte

- Botões “A+” e “A–” para aumentar ou diminuir o tamanho da fonte global
- Ajuste aplicado no elemento `<html>`, facilitando a leitura

### Modo alto contraste

- Alternância entre:
  - Tema padrão (teal/verde)
  - Tema de **alto contraste** (fundo preto, tipografia amarelo/ branco, bordas bem definidas)
- Estilização complementar em `style.css` para manter botões, cards e campos legíveis no modo contraste

### Leitura automática

- Opção **“Auto leitura”**:
  - Quando ativada, o texto principal da tela é lido automaticamente sempre que o usuário troca de etapa (home, código de barras, análise, resultado)

### Integração com VLibras

- Inclusão do **widget oficial do VLibras** no `index.html`
- Disponível em todas as telas para interpretação em LIBRAS

---

## Arquitetura proposta

A arquitetura abaixo é conceitual e está documentada em  
`diagrama-assistente-de-vendas.png`.

![Diagrama de Arquitetura em AWS](docss/diagrama-assistente-de-vendas.png)

Resumo dos componentes planejados:

- **Camada de borda**
  - Amazon Route 53 (DNS)
  - Amazon CloudFront (CDN)
  - AWS WAF (firewall de aplicação)

- **Frontend**
  - Aplicação estática hospedada em Amazon S3 e entregue via CloudFront

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

> A implementação desses serviços não está neste MVP, mas o projeto foi desenhado para evoluir nessa direção

---

## Tecnologias utilizadas

### Frontend

- HTML5
- Tailwind CSS (via CDN)
- CSS custom (arquivo `style.css`)
- JavaScript (ES6) – arquivo `main.js`
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

## Estrutura do projeto

```bash
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
