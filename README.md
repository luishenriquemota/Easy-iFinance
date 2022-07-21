# Documentação da API - Capstone M4

## Tabela de Conteúdos

- [Visão Geral](#1-visão-geral)
- [Diagramas ER](#2-diagrama-er)
- [Início Rápido](#3-início-rápido)
    - [Instalando Dependências](#31-instalando-dependências)
    - [Variáveis de Ambiente](#32-variáveis-de-ambiente)
    - [Migrations](#33-migrations)
- [Autenticação](#4-autenticação)
    - [Criação de Usuários](#41-criação-de-usuários)
    - [Login de usuário e Token de Autenticação](#42-login-de-usuário-e-token-de-autenticação)
- [Endpoints](#5-endpoints)

---
## 1. Visão Geral

O projeto consiste em uma aplicação Backend que visa facilitar o monitoramento, compartilhamento e auditoria das transações realizadas nos cartões de crédito/débito cadastrados de nossos clientes. Através de uma lista de amigos, é possível permitir, ou não, que seus amigos utilizem seus cartões. Semanalmente por regra, e a cada transação, receba em seu email um relatório de todos os gastos e transações realizadas em seus cartões cadastrados, detalhando valores, especificações da compra e quem utilizou seu cartão.

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)

Url base da nossa aplicação:
https://easy-ifinance.herokuapp.com

---
## 2. Diagrama ER
[ Voltar para o topo ](#tabela-de-conteúdos)


Segue abaixo alguns diagramas que podem lhe auxiliar a entender o fluxo de dados da nossa aplicação:

![DER](https://i.postimg.cc/wjCzMrC0/diagrams.png)

---
## 3. Início Rápido
[ Voltar para o topo ](#tabela-de-conteúdos)


### 3.1. Instalando Dependências

Clone o projeto em sua máquina e instale as dependências com o comando:

```shell
yarn
```

### 3.2. Variáveis de Ambiente

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:
```
cp .env.example .env
```

Configure suas variáveis de ambiente com suas credenciais do Postgres e crie uma nova database da sua escolha(com o mesmo nome dado no seu arquivo .env).

### 3.3. Migrations

Execute as migrations com o comando:

```
yarn typeorm migration:run -d src/data-source.ts
```
Caso estas não estejam presentes na pasta src/migrations, gere-as com o comando:
```
yarn typeorm migration:generate src/migrations/initialMigrations -d src/data-source.ts
```
---
## 4. Autenticação
[ Voltar para o topo ](#tabela-de-conteúdos)


Algumas rotas da nossa aplicação requerem autenticação prévia por parte do usuário. Para realizar a autenticação, siga os seguintes passos:

### 4.1. Criação de Usuários
### `/users`

Registre-se na aplicação, solicitando uma requisição do tipo POST no endpoint da api https://linkdodeploy.com/users

### Exemplo de Request:
```
POST /users
Host: https://easy-ifinance.herokuapp.com
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"name": "usuario",
	"email": "usuario@mail.com",
	"password": "1234",
	"birth_date": "22-01-1996"
}
```

### Exemplo de Response:
```
201 Created
```

```json
{
	"id": "9cda28c9-e540-4b2c-bf0c-c90006d37893",
	"name": "Eduardo",
	"email": "edu@mail.com",
	"birth_date": "22/01/1996",
  	"created_at": "18-06-2022 10:52:35",
  	"updated_at": "18-06-2022 10:52:35"
}
```
### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 409 Conflict   | Email already exists |

---

### 4.2. Login de Usuário e Token de Autenticação
### `/users/login`

Faça Login na aplicação, solicitando uma requisição do tipo POST no endpoint da api https://linkdodeploy.com/users/login

### Exemplo de Request:
```
POST /users/login
Host: https://easy-ifinance.herokuapp.com
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"email": "usuario@mail.com",
	"password": "1234"
}
```
### Exemplo de Response:
```
200 Success
```

```json
{
	"token": "AbDAISDHIASD7AD8SDNASDAOSD7ADASDBHAadakjdaskdjasd7adatauya8dasdna7dDNAdandnDJjsDYDAS"
}
```
### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not available   | Account not found |
| 401 Unauthorized   | Wrong email password |

---
## 5. Endpoints

Consideramos que a partir daqui, você já se cadastrou e se autenticou na aplicação.

[ Voltar para o topo ](#tabela-de-conteúdos)

### Índice

- [Users](#1-users)
    - [GET - /users/profile](#11-listando-usuário)
    - [PATCH - /users](#12-atualizar-usuário)
    - [DELETE - /users](#13-deletar-usuário)
- [Cards](#2-cards)
    - [POST - /cards](#21-criação-de-cards)
    - [GET - /cards/:card_id](#22-listagem-de-card-especifico)
    - [GET - /cards](#23-listagem-de-cards-disponíveis)
    - [PATCH - /cards/:card_id](#24-atualização-de-card)
    - [DELETE - /cards/:card_id](#25-deleção-de-card)
- [Transactions](#3-transactions)
    - [POST - /transactions](#31-criação-de-transactions)
    - [GET - /transactions/userTransactions](#32-listagem-de-transactions)
    - [GET - /transactions/:card_id](#33-listagem-de-transactions-de-cartão-especifico)
    - [PATCH - /transactions/:transaction_id](#34-atualização-de-transactions)
    - [DELETE - /transactions/:transaction_id](#35-deleção-de-transactions)
- [Friendlist](#4-friendlist)
    - [POST - /friends/:user_id](#41-adição-de-amigo)
    - [DELETE - /friends/:friend_id](#42-remoção-de-amigo)
    - [GET - /friends/:user_id](#43-listagem-de-todos-os-amigos)
    - [GET - /friends/:friend_id](#44-listagem-de-amigo-especifico)

---

## 1. Users
Estas são as rotas relacionadas ao CRUD de usuários.

[ Voltar para Endpoints ](#5-endpoints)

### 1.1. Listando usuário
### `/users/profile`

Retorna os dados do usuário que realizou a requisição.

### Exemplo de Request:
```
POST /users/profile
Host: https://easy-ifinance.herokuapp.com
Authorization: Bearer Token
Content-type: application/json
```
### Exemplo de Response:
```
200 Success
```

```json
{
	"id": "ada47hdabdsa91821webgda72avnckash",
    	"name": "user",
    	"email": "user@mail.com",
    	"password":
    	"birth_date": "12-05-1999",
    	"created_at": "20-07-2022 13:13:31",
    	"updated_at": "20-07-2022 13:13:31",
    	"isActive": true,
	"cards": [],
	"transactions": []
}
```
### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 409 Conflict   | User not found |
| 401 Unauthorized   | Invalid token |

---
### 1.2. Atualizar usuário
### `/users`

Atualiza os dados do usuário que realizou a requisição

### Exemplo de Request:
```
PATCH /users
Host: https://easy-ifinance.herokuapp.com
Authorization: Bearer Token
Content-type: application/json
```
### Corpo da Requisição:
```json
{
	"name": "Kenzinho",
}
```
### Exemplo de Response:
```
200 Success
```
```json
{
	"id": "ada47hdabdsa91821webgda72avnckash",
    	"name": "Kenzinho",
    	"email": "user@mail.com",
    	"password":
    	"birth_date": "12-05-1999",
    	"created_at": "20-07-2022 13:13:31",
    	"updated_at": "20-07-2022 13:13:31",
    	"isActive": true,
	"cards": [],
	"transactions": []
}
```
### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not found  | User dont exists |
| 401 Unauthorized   | Invalid token |

---
### 1.3. Deletar usuário
### `/users`

Deleta o usuário que realizou a requisição

### Exemplo de Request:
```
DELETE /users
Host: https://easy-ifinance.herokuapp.com
Authorization: Bearer Token
Content-type: application/json
```
### Exemplo de Response:
```
204 Success, no content
```
### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 409 Conflict   | User not found |
| 401 Unauthorized   | Invalid token |

---
## 2. Cards
Estas são as rotas relacionadas ao CRUD de cards.

[ Voltar para Endpoints ](#5-endpoints)

### 2.1. Criação de cards
### `/cards`

Registra um cartão para o usuário que realizou a requisição

### Exemplo de Request:
```
POST /cards
Host: https://easy-ifinance.herokuapp.com
Authorization: Bearer Token
Content-type: application/json
```
### Corpo da Requisição:
```json
{
	"name": "Cartão de Crédito",
	"limit": 3000,
	"type": "crédito",
	"dueDate": "12-07-2024",
	"closingDate": "15-07-2022"
}
```
### Exemplo de Response:
```
201 Created
```
```json
{
	"id": 1,
    	"name": "Cartão de Crédito",
    	"limit": 3000,
    	"type": "crédito",
    	"dueDate": "12-07-2024",
	"closingDate": "15-07-2022"
    	"ownerId": "ada47hdabdsa91821webgda72avnckash",
	"allowedUsers": []
}
```
### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not found  | User not found |
| 409 Conflict   | Card already exists |
| 401 Unauthorized   | Invalid token |

---
### 2.2. Listagem de card especifico
### `/cards/:card_id`

Lista os dados do card especificado.

### Exemplo de Request:
```
GET /cards/:card_id
Host: https://easy-ifinance.herokuapp.com
Authorization: Bearer Token
Content-type: application/json
```
### Exemplo de Response:
```
200 Success
```
```json
{
	"id": 1,
    	"name": "Cartão de Crédito",
    	"limit": 3000,
    	"type": "crédito",
    	"dueDate": "12-07-2024",
	"closingDate": "15-07-2022"
    	"ownerId": "ada47hdabdsa91821webgda72avnckash",
	"allowedUsers": [],
	"transactions": []
}
```
### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not found  | Card not found |
| 401 Unauthorized   | Invalid token |

---
### 2.3. Listagem de cards disponíveis
### `/cards`

Lista todos os cards disponíveis ao usuário que fez a requisição.

### Exemplo de Request:
```
GET /cards
Host: https://easy-ifinance.herokuapp.com
Authorization: Bearer Token
Content-type: application/json
```
### Exemplo de Response:
```
200 Success
```
```json
[{
	"id": 1,
    	"name": "Cartão de Crédito",
    	"limit": 3000,
    	"type": "crédito",
    	"dueDate": "12-07-2024",
	"closingDate": "15-07-2022"
    	"ownerId": "ada47hdabdsa91821webgda72avnckash",
	"allowedUsers": [],
	"transactions": []
}]
```
### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not available   | Card not found |
| 401 Unauthorized   | Invalid token |

---
### 2.4. Atualização de card
### `/cards/:card_id`

Atualiza os dados de um cartão especifico.
### Exemplo de Request:
```
PATCH /cards/card_id
Host: https://easy-ifinance.herokuapp.com
Authorization: Bearer Token
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"name": "Cartão de Débito",
	"limit": 4000,
}
```
### Exemplo de Response:
```
200 Success
```
```json
[{
	"id": 1,
    	"name": "Cartão de Débito",
    	"limit": 4000,
    	"type": "crédito",
    	"dueDate": "12-07-2024",
	"closingDate": "15-07-2022"
    	"ownerId": "ada47hdabdsa91821webgda72avnckash",
	"allowedUsers": [],
	"transactions": []
}]
```
### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not available   | Card not found |
| 401 Unauthorized   | Invalid token |

---
### 2.5. Deleção de card
### `/cards/:card_id`

Deleta um cartão especifico.
### Exemplo de Request:
```
DELETE /cards/card_id
Host: https://easy-ifinance.herokuapp.com
Authorization: Bearer Token
Content-type: application/json
```
### Exemplo de Response:
```
204 Success, no content
```
### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not found   | Card not found |
| 401 Unauthorized   | Invalid token |
| 404 Not found   | User not found |

---
## 3. Transactions
Estas são as rotas relacionadas ao CRUD de transactions.

[ Voltar para Endpoints ](#5-endpoints)

### 3.1. Criação de transactions
### `/transactions`

Registra uma transação para um cartão e usuário.

### Exemplo de Request:
```
POST /transactions
Host: https://easy-ifinance.herokuapp.com
Authorization: Bearer Token
Content-type: application/json
```
### Corpo da Requisição:
```json
{
	"description": "Assinatura Netflix",
	"value": 54,
	"category": "Assinatura de serviço de streaming",
	"type": "Gasto no crédito",
	"card_id": 1,
	"user_id": "ada47hdabdsa91821webgda72avnckash"
}
```
### Exemplo de Response:
```
201 Created
```
```json
{
	"id": "1",
	"description": "Assinatura Netflix",
	"value": 54,
	"category": "Assinatura de serviço de streaming",
	"type": "Gasto no crédito",
	"cardId": 1,
	"userId": "ada47hdabdsa91821webgda72avnckash"
}
```
### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not available   | Card not exists |
| 401 Unauthorized   | Invalid token |
| 404 Not available   | User not exists |
| 403 Unauthorized  | User is not the card owner |

---
### 3.2. Listagem de transactions
### `/transactions/userTransactions`

Lista as transações do usuário que fez a requisição.

### Exemplo de Request:
```
GET /transactions/userTransactions
Host: https://easy-ifinance.herokuapp.com
Authorization: Bearer Token
Content-type: application/json
```
### Exemplo de Response:
```
200 Success
```
```json
{
	"id": "1",
	"description": "Assinatura Netflix",
	"value": 54,
	"created_at": "20-07-2022 13:35:13",
	"updated_at": "20-07-2022 13:35:13",
	"category": "Assinatura de serviço de streaming",
	"type": "Gasto no crédito",
	"cardId": 1,
	"userId": "ada47hdabdsa91821webgda72avnckash"
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not found   | User not found |
| 401 Unauthorized   | Invalid token |
| 400 Invalid | User don't have transactions |

---
### 3.3. Listagem de transactions de cartão especifico
### `/transactions/:card_id`

Lista todas as transações de um cartão especifico.

### Exemplo de Request:
```
GET /transactions/:card_id
Host: https://easy-ifinance.herokuapp.com
Authorization: Bearer Token
Content-type: application/json
```
### Exemplo de Response:
```
200 Success
```
```json
{
	"id": "1",
	"description": "Assinatura Netflix",
	"value": 54,
	"created_at": "20-07-2022 13:35:13",
	"updated_at": "20-07-2022 13:35:13",
	"category": "Assinatura de serviço de streaming",
	"type": "Gasto no crédito",
	"cardId": 1,
	"userId": "ada47hdabdsa91821webgda72avnckash"
}
```
### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not found  | User not found |
| 401 Unauthorized   | Invalid token |
| 400 Invalid | Card don't have transactions |

---
### 3.4. Atualização de transactions
### `/transactions/:transaction_id`

Atualiza os dados de uma transação especifica.

### Exemplo de Request:
```
PATCH /transactions/:transaction_id
Host: https://easy-ifinance.herokuapp.com
Authorization: Bearer Token
Content-type: application/json
```
### Corpo da Requisição:
```json
{
	"description": "Assinatura Disney Plus",
	"value": 59,
}
```
### Exemplo de Response:
```
200 Success
```
```json
{
	"id": "1",
	"description": "Assinatura Disney Plus",
	"value": 59,
	"created_at": "20-07-2022 13:35:13",
	"updated_at": "20-07-2022 13:35:13",
	"category": "Assinatura de serviço de streaming",
	"type": "Gasto no crédito",
	"cardId": 1,
	"userId": "ada47hdabdsa91821webgda72avnckash"
}
```
### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not found  | Transaction not found |
| 401 Unauthorized   | Invalid token |
| 400 Invalid | Card don't have transactions |
| 404 Not found  | User not exists |

---
### 3.5. Deleção de transactions
### `/transactions/:transaction_id`

Deleta uma transação específica

### Exemplo de Request:
```
DELETE /transactions/:transaction_id
Host: https://easy-ifinance.herokuapp.com
Authorization: Bearer Token
Content-type: application/json
```
### Exemplo de Response:
```
204 Success, no content
```
### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not found   | Transaction not found |
| 401 Unauthorized   | Invalid token |
| 400 Invalid | Card don't have transactions |
| 404 Not found   | User not exists |

---
## 4. Friendlist
Estas são as rotas relacionadas ao CRUD de friendlist.

[ Voltar para Endpoints ](#5-endpoints)

### 4.1. Adição de amigo
### `/friends/:friend_id`

Adiciona um amigo especifico.

### Exemplo de Request:
```
POST /friends/:friend_id
Host: https://easy-ifinance.herokuapp.com
Authorization: Bearer Token
Content-type: application/json
```

### Exemplo de Response:
```
201 Created
```
```json
{
	"message": "John added to your friendlist."
}
```
### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not found   | User not found. |
| 401 Unauthorized   | Invalid token |
| 409 Conflict | Card don't have transactions |
| 404 Not found  | you and this user are already friends. |

---
### 4.2. Remoção de amigo
### `/friends/:friend_id`

Remove um amigo especifico da sua lista de amigos.

### Exemplo de Request:
```
DELETE /friends/:friend_id
Host: https://easy-ifinance.herokuapp.com
Authorization: Bearer Token
Content-type: application/json
```
### Exemplo de Response:
```
204 Success, no content
```
### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not found   | User not found. |
| 401 Unauthorized   | Invalid token |

---
### 4.3. Listagem de todos os amigos
### `/friends/`

Lista todos os amigos do usuário que fez a requisição.
### Exemplo de Request:
```
GET /friends
Host: https://easy-ifinance.herokuapp.com
Authorization: Bearer Token
Content-type: application/json
```
### Exemplo de Response:
```
200 Success
```
```json
{
	[{
	"friendId": "anfh58jadnsasv762sgab21vbm0x"
	}, {
	"friendId": "dafh58jatyhggsv761sgab21vbmcaca"
	}]
}
```
### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not found   | your friends list is empty |
| 401 Unauthorized   | Invalid token |

---
### 4.4. Listagem de amigo especifico
### `/friends/:friend_id`

Lista um amigo especifico do usuário que fez a requisição.

### Exemplo de Request:
```
GET /friends/:friend_id
Host: https://easy-ifinance.herokuapp.com
Authorization: Bearer Token
Content-type: application/json
```
### Exemplo de Response:
```
200 Success
```
```json
{
	{
	"friendId": "anfh58jadnsasv762sgab21vbm0x"
	}
}
```

### Possíveis Erros:
| Código do Erro | Descrição |
|----------------|-----------|
| 404 Not found   | Friend not found |
| 401 Unauthorized   | Invalid token |

---
