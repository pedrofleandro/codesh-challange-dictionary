openapi: 3.0.0
info:
  title: Fullstack Challenge 🏅 - Dictionary API
  version: 1.0.0
  description: |
Este projeto é uma API de dicionário que permite consultar palavras, gerenciar favoritos e histórico, com integração à Free Dictionary API.

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

    ## Rodando o Projeto com Docker
     - Certifique-se que possui o docker instalado na maquina
     - Navegue até a raiz do projeto onde está o arquivo docker-compose.yml e rode o comando: docker-compose up --build

     - Acesse o frontend:
       - A aplicação frontend estará disponível em http://localhost:5173.
     - Acesse a API:
       - O backend estará disponível em http://localhost:8080.
     - Banco de Dados:
       - O MongoDb estará rodando em http://localhost:27017.

    ## Como Instalar e Usar sem  o Docker
    ### Requisitos
    - **Node.js**: versão 20.16.0 ou superior
    - **MongoDB Atlas**: Configurado como banco de dados.

    ### Backend
    1. Navegue até a pasta do backend:
       ```bash
       cd ./api
       ```
    2. Instale as dependências:
       ```bash
       npm install
       ```
    3. Inicie o servidor de desenvolvimento:
       ```bash
       npm run dev

    ### Frontend
    1. Navegue até a pasta do frontend:
       ```bash
       cd ./frontend
       ```
    2. Instale as dependências:
       ```bash
       npm install
       ```
    3. Inicie o servidor de desenvolvimento:
       ```bash
       npm run dev
       ```
    4. Acesse a aplicação no navegador no endereço: `http://localhost:5173/`.

servers:
  - url: http://localhost:8080 (api)
  - url: http://localhost:5173 (frontend)
    description: Servidor local para desenvolvimento.

paths:
  /auth/signup:
    post:
      summary: Registra um novo usuário.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UserSignupRequest'
      responses:
        '201':
          description: Usuário registrado com sucesso.
        '400':
          description: Dados inválidos.

  /auth/signin:
    post:
      summary: Realiza o login de um usuário.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UserLoginRequest'
      responses:
        '200':
          description: Login realizado com sucesso.
        '401':
          description: Credenciais inválidas.

  /auth/validate:
    post:
      summary: Valida o token de autenticação.
      responses:
        '200':
          description: Token válido.
        '401':
          description: Token inválido ou expirado.

  /auth/logout:
    post:
      summary: Realiza o logout do usuário.
      responses:
        '200':
          description: Logout realizado com sucesso.

  /users:
    get:
      summary: Obtém a lista de todos os usuários.
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Lista de usuários.
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/UserResponse'

  /user/me/:
    get:
      summary: Obtém o perfil do usuário autenticado.
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Dados do perfil do usuário.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserProfileResponse'

  /user/me/history:
    get:
      summary: Obtém o histórico de palavras visualizadas pelo usuário.
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Histórico de palavras visualizadas.
          content:
            application/json:
              schema:
                type: array
                items:
                  type: string

  /user/me/favorites:
    get:
      summary: Obtém as palavras favoritas do usuário.
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Lista de palavras favoritas.
          content:
            application/json:
              schema:
                type: array
                items:
                  type: string

  /user/{id}:
    delete:
      summary: Deleta o usuário especificado.
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      security:
        - bearerAuth: []
      responses:
        '204':
          description: Usuário deletado com sucesso.
        '403':
          description: Acesso negado.

    patch:
      summary: Atualiza informações do usuário especificado.
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: string
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Dados do usuário atualizados com sucesso.

  /entries/en/{word}/favorite:
    post:
      summary: Adiciona uma palavra aos favoritos.
      parameters:
        - name: word
          in: path
          required: true
          schema:
            type: string
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Palavra adicionada aos favoritos.

  /entries/en/{word}/unfavorite:
    delete:
      summary: Remove uma palavra dos favoritos.
      parameters:
        - name: word
          in: path
          required: true
          schema:
            type: string
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Palavra removida dos favoritos.

  /entries/en:
    get:
      summary: Busca palavras com paginação e filtros.
      parameters:
        - name: search
          in: query
          description: Filtro opcional para busca de palavras que começam com o termo informado.
          schema:
            type: string
        - name: page
          in: query
          description: Número da página para paginação.
          schema:
            type: integer
            default: 1
        - name: limit
          in: query
          description: Número de itens por página.
          schema:
            type: integer
            default: 10
      responses:
        '200':
          description: Retorna as palavras encontradas.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/WordListResponse'

  /entries/en/{word}:
    get:
      summary: Busca detalhes de uma palavra específica.
      parameters:
        - name: word
          in: path
          required: true
          schema:
            type: string
      responses:
        '200':
          description: Retorna os detalhes da palavra.
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/WordDetailResponse'

components:
  schemas:
    UserSignupRequest:
      type: object
      properties:
        email:
          type: string
        password:
          type: string
    UserLoginRequest:
      type: object
      properties:
        email:
          type: string
        password:
          type: string
    UserResponse:
      type: object
      properties:
        id:
          type: string
        email:
          type: string
    UserProfileResponse:
      type: object
      properties:
        id:
          type: string
        email:
          type: string
        favorites:
          type: array
          items:
            type: string
        history:
          type: array
          items:
            type: string
    WordListResponse:
      type: object
      properties:
        results:
          type: array
          items:
            type: string
        totalDocs:
          type: integer
        page:
          type: integer
        totalPages:
          type: integer
        hasNext:
          type: boolean
        hasPrev:
          type: boolean
    WordDetailResponse:
      type: object
      properties:
        word:
          type: string
        phonetic:
          type: string
        origin:
          type: string
        meanings:
          type: array
          items:
            type: object
            properties:
              partOfSpeech:
                type: string
              definitions:
                type: array
                items:
                  type: object
                  properties:
                    definition:
                      type: string
                    example:
                      type: string

securitySchemes:
  bearerAuth:
    type: http
    scheme: bearer
    bearerFormat: JWT
