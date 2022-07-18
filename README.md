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
http://linkaqui.com

---
## 2. Diagrama ER
[ Voltar para o topo ](#tabela-de-conteúdos)


Segue abaixo alguns diagramas que podem lhe auxiliar a entender o fluxo de dados da nossa aplicação:

![DER](https://i.postimg.cc/zGGT2Y1v/diagrams.png)

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
Host: https://linkdodeploy.com/
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:
```json
{
	"name": "usuario",
	"email": "usuario@mail.com",
	"password": "1234",
	"birth_date": "22/01/1996"
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
  "created_at": "18/06/2022 10:52:35",
  "updated_at": "18/06/2022 10:52:35"
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
Host: https://linkdodeploy.com/
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

[ Voltar para o topo ](#tabela-de-conteúdos)

### Índice

- [Users](#1-users)
    - [POST - /users](#11-criação-de-usuário)
    - [POST - /users/login](#12-login-de-usuário)
    - [GET - /users/profile](#13-listando-usuário)
	  - [PATCH - /users](#14-atualizar-usuário)
    - [DELETE - /users](#15-deletar-usuário)
- [Cards](#2-cards)
    - [POST - /cards](#21-criação-de-cards)
    - [GET - /cards/:card_id](#22-listagem-de-card-especifico)
    - [GET - /cards](#23-listagem-de-cards-disponíveis)
    - [PATCH - /cards/:card_id](#24-atualização-de-card)
    - [DELETE - /cards/:card_id](#25-deleção-de-card)
- [Cart](#3-cart)
- [Users](#4-buys)

---
