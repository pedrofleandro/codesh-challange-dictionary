# Fullstack Challenge 🏅 - Dictionary

Este projeto é uma API de dicionário que permite consultar palavras, gerenciar favoritos e histórico, com integração à Free Dictionary API. 

---

## Tecnologias Utilizadas
- **Linguagem:** Javascript, TypeScript, NodeJs
- **Framework:** Express.js, ReactJs
- **Banco de Dados:** MongoDB (Atlas)
- **Ferramentas:** Axios, Mongoose, Body-parser, Cookie-parser, Cors, Compression

---

## Como Instalar e Usar

### Requisitos
- **Node.js**: versão 20.16.0
- **MongoDB Atlas**: para armazenamento de dados

### Passo a Passo

1. **Clone o repositório**
   ```bash
   git clone https://github.com/pedrofleandro/codesh-challange-dictionary
   cd ./codesh-challange-dictionary/api
   npm install


**Histórico**

## Arquitetura do Projeto
O projeto segue o padrão **MVC (Model-View-Controller)**.

### Estrutura de Diretórios
- `src/`
  - `controllers/`: Lida com a lógica das rotas.
  - `db/`: Modelos do banco de dados (MongoDB).
  - `router/`: Define as rotas disponíveis.
  - `middlewares/`: Funções intermediárias como autenticação.
  - `app.ts`: Configuração do servidor.

### Middleware de Autenticação
- Usei um middleware personalizado para verificar autenticação com base em tokens de sessão armazenados em cookies.

### Cache para Busca de Palavras
- Inicialmente, considerei salvar o cache na tabela `Word`, mas percebi que isso poderia causar problemas de desempenho em consultas grandes.
- A solução foi criar uma tabela `WordCache` para armazenar dados temporários e garantir performance.

### Histórico e Favoritos
- Decidi incorporar histórico e favoritos no modelo `User` para facilitar a consulta e evitar relacionamentos complexos entre tabelas.

### Problemas Enfrentados
1. **Erro ao buscar dados do cache:** Solucionado verificando a conexão com o banco antes da consulta.
2. **Paginação:** Implementada calculando os valores com base no total de documentos no banco.

## Testes
Os testes foram realizados utilizando a ferramenta **Postman** para validar os endpoints.

### Exemplos de Teste
- [GET] `http://localhost:8080/entries/en?search=fire&limit=5`
  **Resposta esperada:** Lista de palavras começando com "fire".
- [POST] `http://localhost:8080/entries/en/fire/favorite`
  **Resposta esperada:** Mensagem de sucesso ao favoritar a palavra juntamente com json com as informações gravadas.

### Instalação
Nesse momento a instalação está sendo feita através do npm na pasta api mas até o final do projeto a ideia é estar configurado
no docker para poder rodar o front e back juntos. 

