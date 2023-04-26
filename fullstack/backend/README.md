# Documentação da API

## Tabela de Conteúdos

- [Visão Geral](#1-visão-geral)
- [Início Rápido](#2-início-rápido)
  - [Instalando Dependências](#21-instalando-dependências)
  - [Variáveis de Ambiente](#22-variáveis-de-ambiente)
  - [Migrations](#23-migrations)
  - [Test](#24-tests)
  - [Server](#25-server)
- [Endpoints](#3-endpoints)

---

## 1. Visão Geral

Um pouco das tecnologias usadas.

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [TypeORM](https://typeorm.io/)

![](/assets/img/diagrama.jpg)

---

## 2. Início Rápido

[ Voltar para o topo ](#tabela-de-conteúdos)

### 2.1. Instalando Dependências

Clone o projeto em sua máquina e instale as dependências com o comando:

```shell
yarn
```

### 2.2. Variáveis de Ambiente

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:

```
cp .env.example .env
```

Configure suas variáveis de ambiente com suas credenciais do Postgres e uma nova database da sua escolha.

### 2.3. Migrations

Execute as migrations com o comando:

```
yarn typeorm migration:run -d src/data-source.ts
```

---

### 2.4. Tests

Execute o comando para rodar os tests (Testes sendo desenvolvidos...):

```
yarn test
```

---

### 2.5. Server

Execute o comando para rodar o servidor na máquina local na porta 3001:

```
yarn dev
```

---

## 3. Endpoints

[ Voltar para o topo ](#tabela-de-conteúdos)

### Índice

- [Users](#1-users)

  - [POST - /user](#11-criação-de-usuário)
  - [GET - /user](#12-listando-usuários)
  - [GET - /users/login](#13-login-usuário)

- [Barber](#2-barber)

  - [POST - /barber](#21-criação-de-barbeiro)
  - [POST - /barber/:id](#22-referenciando-habilidades-ao-barbeiro)

- [Specialty](#3-specialty)

  - [POST - /specialty](#31-criação-de-habilidade)
  - [GET - /specialty](#32-listando-habilidade)

- [Avaliable](#4-Avaliable)
  - [POST - /avaliable-times/{id_barber}](#41-Liberando-horarios)
  - [GET - /avaliable-times](#42-Listando-por-data)
  - [PATCH - /avaliable-times/{id_avaliable_time}](#43-Atualizando-horarios)
- [Schedule](#5-Schedule)
  - [POST - /schedule](#51-Criando-agendamento)
  - [PATCH - /schedule/cancel/{id_schedule}](#52-Cancelando-agendamento)
  - [GET - /schedule/get/today](#53-Agendamentos-de-hoje)
  - [GET - /schedule/get/filter/:date](#54-Agendamentos-filtrados-por-data)
  - [GET - /schedule/:id_user](#55-Agendamentos-do-usuario)

---

## 1. **Users**

[ Voltar para os Endpoints ](#3-endpoints)

O objeto User é definido como:

| Campo    | Tipo    | Descrição                      |
| -------- | ------- | ------------------------------ |
| id       | string  | Identificador único do usuário |
| name     | string  | O nome do usuário.             |
| email    | string  | O e-mail do usuário.           |
| password | string  | A senha de acesso do usuário   |
| is_admin | boolean | Booleano se o user é admin     |

### Endpoints

| Método | Rota        | Descrição                                   |
| ------ | ----------- | ------------------------------------------- |
| POST   | /user       | Criação de um usuário.                      |
| GET    | /user       | Lista todos os usuários.                    |
| POST   | /user/login | Loga o usuário de acordo com as credenciais |

---

### 1.1. **Criação de Usuário**

[ Voltar para os Endpoints ](#3-endpoints)

### `/user`

### Exemplo de Request:

```
POST /user
Host: http://localhost:3001/user
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:

```json
{
  "name": "João",
  "email": "email@email.com",
  "password": "1234",
  "is_admin": true
}
```

### Exemplo de Response:

```
201 Created
```

```json
{
  "id": "07edd7bb-79df-47e5-8b6d-d22bab62fe75",
  "name": "João",
  "email": "email@email.com",
  "is_admin": true,
  "password": "$2b$10$Vqal3X.KkCPF1vso7OT7LODpRblC1/.k0W6Y7/9zJU1Z71D7tN3G2"
}
```

### Possíveis Erros:

| Código do Erro  | Descrição                 |
| --------------- | ------------------------- |
| 400 Bad Request | Email already registered. |

---

### 1.2. **Listando Usuários**

[ Voltar aos Endpoints ](#3-endpoints)

### `/user`

### Exemplo de Request:

```
GET /user
Host: http://localhost:3001/user
Authorization: None
Content-type: application/json
```

### Corpo da Requisição:

```json
Vazio
```

### Exemplo de Response:

```
200 OK
```

```json
[
  {
    "id": "0bdb154f-9379-42e7-a519-261def17acce",
    "name": "João",
    "email": "email@email.com",
    "is_admin": true,
    "password": "$2b$10$H1vzpLvLq5hWzFm5LjJYj.YxmnB170UHNtiKJKsR5Adi.AWVBS1vy"
  },
  {
    "id": "e4e67366-fa3b-4bfa-b1cb-e22c49c2d6e6",
    "name": "Alysson Colombo",
    "email": "colomboalysson@gmail.com",
    "is_admin": false,
    "password": "$2b$10$4j/k5ZszilK4M2gqTSByhOl7OF3RynyFHBN53TuXV/Xa9P306O8Hq"
  }
]
```

### Possíveis Erros:

Nenhum, o máximo que pode acontecer é retornar uma lista vazia.

---

### 1.3. **login usuário**

[ Voltar aos Endpoints ](#3-endpoints)

### `/user/login`

### Exemplo de Request:

```
POST /user/login
Host: http://localhost:3001/user/login
Authorization: None
Content-type: application/json

```

### Parâmetros da Requisição:

| Parâmetro | Tipo   | Descrição                                |
| --------- | ------ | ---------------------------------------- |
| email     | string | Identificador único do usuário (User)    |
| password  | string | Identificador da conta do usuário (User) |

### Corpo da Requisição:

```json
{
  "email": "email@email.com",
  "password": "1234"
}
```

### Exemplo de Response:

```
201 Created
```

```json
{
  "token": {
    "user": {
      "id": "07edd7bb-79df-47e5-8b6d-d22bab62fe75",
      "name": "João",
      "email": "email@email.com",
      "is_admin": true,
      "password": "$2b$10$Vqal3X.KkCPF1vso7OT7LODpRblC1/.k0W6Y7/9zJU1Z71D7tN3G2"
    },
    "userToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGVtYWlsLmNvbSIsImlhdCI6MTY4MjM2MDQ1OCwiZXhwIjoxNjgyNDQ2ODU4fQ.EYzUor-7ftPKSW0AMhHS9WyhKWlU12HwNpXTw5y9AFk"
  }
}
```

### Possíveis Erros:

| Código do Erro | Descrição          |
| -------------- | ------------------ |
| 401 Not Found  | Account not found. |

---

### 2.1. **Criação de barbeiro**

[ Voltar para os Endpoints ](#3-endpoints)

### POST`/barber`

### Exemplo de Request:

```json
	"name": "João",
	"age": 24,
	"hiring_date": "2018-05-10"
```

```
POST /barber
Host: http://localhost:3001/barber
Authorization: None
Content-type: Json
```

### Exemplo de Response:

```
200 Created
```

```json
	"id": "3752255b-0138-49fa-b226-2455c17a6fb3",
	"name": "João",
	"age": 24,
	"hiring_date": "2018-05-10"
```

### 2.2. **referenciando habilidades ao barbeiro**

[ Voltar para os Endpoints ](#3-endpoints)

### POST`/barber/{barber_id}`

### Exemplo de Request:

```json
{
  "id_specialty": "3775002c-0c7f-42ba-b120-9b82c715439d"
}
```

```
Host: http://localhost:3001/barber/{barber_id}
Authorization: None
Content-type: None
```

### Exemplo de Response:

```json
{
  "id": "5374b41b-11a6-4037-998d-4b099745b168",
  "name": "Rafael",
  "age": 24,
  "hiring_date": "2018-05-10T03:00:00.000Z",
  "specialties": [
    {
      "id": "3775002c-0c7f-42ba-b120-9b82c715439d",
      "name": "sobrancelha",
      "attributed": true
    }
  ]
}
```

```

### Possíveis Erros:

| Código do Erro  | Descrição                |
| --------------- | ------------------------ |
| 400 Bad Request | Id de barber não encontrado. |
| 400 Bad Request | Id de specialty não encontrado. |


---

```

### 3.1. **Criação de habilidade**

[ Voltar para os Endpoints ](#3-endpoints)

### POST`/specialty`

### Exemplo de Request:

```json

  "name": "Barba"

```

```
Host: http://localhost:3001/specialty
Authorization: None
Content-type: Json
```

### Exemplo de Response:

```
200 Created
```

```json

  "id": "4a2ab5ec-5aa3-4142-9464-23ac086fa501",
  "name": "Barba",
  "attributed": false
```

### 3.2. **Listando habilidade**

[ Voltar para os Endpoints ](#3-endpoints)

### GET`/specialty`

```
Host: http://localhost:3001/specialty
Authorization: None
Content-type: Json
```

### Exemplo de Response:

```
200 ok
```

```json
[
  {
    "id": "3775002c-0c7f-42ba-b120-9b82c715439d",
    "name": "sobrancelha",
    "attributed": true
  },
  {
    "id": "fa087bb8-650b-4ac4-acd0-22006a758ba1",
    "name": "cabelo",
    "attributed": false
  },
  {
    "id": "6c37594f-3da0-4e02-a1d6-2a3eff992091",
    "name": "barba",
    "attributed": false
  },
  {
    "id": "529150fb-a741-4577-ab99-c545a70cd33a",
    "name": "penteado",
    "attributed": false
  }
]
```

### 4.1. **Liberando horarios**

[ Voltar para os Endpoints ](#3-endpoints)

### POST`/avaliable-times/{id_barber}`

### Exemplo de Request:

```json
	"date": "2023/04/26"
```

```
POST /avaliable-times
Host: http://localhost:3001/avaliable-times
Authorization: None
Content-type: Json
```

### Exemplo de Response:

```
201 Created
```

```json
{
  "id": "c90b21de-57ed-469e-8a3b-c9a4c4cbb146",
  "date": "2023/04/26",
  "barber": {
    "id": "3752255b-0138-49fa-b226-2455c17a6fb3",
    "name": "João",
    "age": 24,
    "hiring_date": "2018-05-10T03:00:00.000Z"
  },
  "8:00": true,
  "8:30": true,
  "9:00": true,
  "9:30": true,
  "10:00": true,
  "10:30": true,
  "11:00": true,
  "11:30": true,
  "12:00": true,
  "12:30": true,
  "13:00": true,
  "13:30": true,
  "14:00": true,
  "14:30": true,
  "15:00": true,
  "15:30": true,
  "16:00": true,
  "16:30": true,
  "17:00": true,
  "17:30": true,
  "18:00": true
}
```

### 4.2. **Listando por data**

[ Voltar para os Endpoints ](#3-endpoints)

### GET `/avaliable-times/{yyyy/mm/dd}`

```
GET /avaliable-times/{yyyy/mm/dd}`
Host: http://localhost:3001/avaliable-times/{yyyy/mm/dd}
Authorization: None
Content-type: Json
```

### Exemplo de Response:

```
200 OK
```

```json
[
  {
    "id": "4d74597f-a58d-4481-90fb-0cba167232f3",
    "date": "2023-04-24T06:00:00.000Z",
    "8:00": true,
    "8:30": true,
    "9:00": true,
    "9:30": true,
    "10:00": true,
    "10:30": true,
    "11:00": true,
    "11:30": true,
    "12:00": true,
    "12:30": true,
    "13:00": true,
    "13:30": true,
    "14:00": true,
    "14:30": true,
    "15:00": true,
    "15:30": true,
    "16:00": true,
    "16:30": true,
    "17:00": true,
    "17:30": true,
    "18:00": true,
    "barberId": "5374b41b-11a6-4037-998d-4b099745b168"
  },
  {
    "id": "9874597f-a58d-4481-90fb-0cba167232f3",
    "date": "2023-04-24T06:00:00.000Z",
    "8:00": true,
    "8:30": true,
    "9:00": true,
    "9:30": true,
    "10:00": true,
    "10:30": true,
    "11:00": true,
    "11:30": true,
    "12:00": true,
    "12:30": true,
    "13:00": true,
    "13:30": true,
    "14:00": true,
    "14:30": true,
    "15:00": true,
    "15:30": true,
    "16:00": true,
    "16:30": true,
    "17:00": true,
    "17:30": true,
    "18:00": true,
    "barberId": "1834b41b-11a6-4037-998d-4b099745b168"
  }
]
```

### 4.3. **Atualizando horarios**

[ Voltar para os Endpoints ](#3-endpoints)

### PATCH`/avaliable-times/{id_avaliable_time}`

### Exemplo de Request:

```json
{
  "09:00": false,
  "09:30": true
}
```

```
Host: http://localhost:3001/avaliable-times/{id_avaliable_time}
Authorization: None
Content-type: Json
```

### Exemplo de Response:

```
201 Created
```

```json
{
  "id": "cebb14f7-6143-4f17-942d-09af858a3b92",
  "date": "2023-04-23T06:00:00.000Z",
  "08:00": true,
  "08:30": true,
  "09:00": false,
  "09:30": true,
  "10:00": true,
  "10:30": true,
  "11:00": true,
  "11:30": true,
  "12:00": true,
  "12:30": true,
  "13:00": true,
  "13:30": true,
  "14:00": true,
  "14:30": true,
  "15:00": true,
  "15:30": true,
  "16:00": true,
  "16:30": true,
  "17:00": true,
  "17:30": true,
  "18:00": true
}
```

### 5.1. **Criando agendamento**

[ Voltar para os Endpoints ](#3-endpoints)

### POST `/schedule`

### Exemplo de Request:

```json
{
  "user_email": "email@email.com",
  "barber_id": "a976884e-11bd-4ce6-979b-7d75e79547d5",
  "specialty_id": "e4b2b47f-5fa0-40bc-9cb9-5353b329b75d",
  "avaliable_time_id": "eab0f3fb-ae25-4129-9c57-fde5e107e1c7",
  "date_time": "2023-04-24T11:30:00"
}
```

```
Host: http://localhost:3001/schedule
Authorization: None
Content-type: Json

```

### Exemplo de Response:

201 Created

````

```json
{
	"id": "1502d1e7-3a7e-4a63-8a53-3406905a1d46",
	"user": {
		"id": "0bdb154f-9379-42e7-a519-261def17acce",
		"name": "João",
		"email": "email@email.com",
		"is_admin": true,
		"password": "$2b$10$H1vzpLvLq5hWzFm5LjJYj.YxmnB170UHNtiKJKsR5Adi.AWVBS1vy"
	},
	"barber": {
		"id": "a976884e-11bd-4ce6-979b-7d75e79547d5",
		"name": "Rafael",
		"age": 24,
		"hiring_date": "2018-05-10T03:00:00.000Z"
	},
	"specialty": {
		"id": "e4b2b47f-5fa0-40bc-9cb9-5353b329b75d",
		"name": "cabelo"
	},
	"date_time": "2023-04-24T11:30:00",
	"available_times": {
		"id": "eab0f3fb-ae25-4129-9c57-fde5e107e1c7",
		"date": "2023-04-24T06:00:00.000Z",
		"8:00": true,
		"8:30": true,
		"9:00": true,
		"9:30": true,
		"10:00": true,
		"10:30": true,
		"11:00": true,
		"11:30": false,
		"12:00": true,
		"12:30": true,
		"13:00": true,
		"13:30": true,
		"14:00": true,
		"14:30": true,
		"15:00": true,
		"15:30": true,
		"16:00": true,
		"16:30": true,
		"17:00": true,
		"17:30": true,
		"18:00": true
	},
	"status": "Agendado"
}
````

### 5.1. **Cancelando agendamento**

[ Voltar para os Endpoints ](#3-endpoints)

### PATCH`/schedule/cancel/{id_schedule}`

```
Host: http://localhost:3001/schedule/cancel/{id_schedule}
Authorization: None
Content-type: Json

```

### Exemplo de Response:

201 Created

````

```json
{
	"id": "1502d1e7-3a7e-4a63-8a53-3406905a1d46",
	"date_time": "2023-04-24T17:30:00.000Z",
	"status": "Cancelado",
	"available_times": {
		"id": "eab0f3fb-ae25-4129-9c57-fde5e107e1c7",
		"date": "2023-04-24T06:00:00.000Z",
		"8:00": true,
		"8:30": true,
		"9:00": true,
		"9:30": true,
		"10:00": true,
		"10:30": true,
		"11:00": true,
		"11:30": false,
		"12:00": true,
		"12:30": true,
		"13:00": true,
		"13:30": true,
		"14:00": true,
		"14:30": true,
		"15:00": true,
		"15:30": true,
		"16:00": true,
		"16:30": true,
		"17:00": true,
		"17:30": true,
		"18:00": true
	}
}
````

### 5.2. **Concluindo o serviço de agendamento**

[ Voltar para os Endpoints ](#3-endpoints)

### PATCH`/schedule/finished/{id_schedule}`

### Exemplo de Request:

```

Host: http://localhost:3001/schedule/finished/{id_schedule}
Authorization: None
Content-type: Json

```

### Exemplo de Response:

```

201 Created

```

```json
{
  "id": "1502d1e7-3a7e-4a63-8a53-3406905a1d46",
  "date_time": "2023-04-24T17:30:00.000Z",
  "status": "Concluído",
  "available_times": {
    "id": "eab0f3fb-ae25-4129-9c57-fde5e107e1c7",
    "date": "2023-04-24T06:00:00.000Z",
    "8:00": true,
    "8:30": true,
    "9:00": true,
    "9:30": true,
    "10:00": true,
    "10:30": true,
    "11:00": true,
    "11:30": false,
    "12:00": true,
    "12:30": true,
    "13:00": true,
    "13:30": true,
    "14:00": true,
    "14:30": true,
    "15:00": true,
    "15:30": true,
    "16:00": true,
    "16:30": true,
    "17:00": true,
    "17:30": true,
    "18:00": true
  }
}
```

### 5.3. **Agendamentos de hoje**

[ Voltar para os Endpoints ](#3-endpoints)

### GET`/schedule/get/today`

### Exemplo de Request:

```

Host: http://localhost:3001/schedule/get/today
Authorization: None
Content-type: Json

```

### Exemplo de Response:

```

201 Created

```

```json
[
  {
    "id": "61ce9aa5-6bce-4bb4-bf35-e9cafb930d36",
    "date_time": "2023-04-26T13:00:00.000Z",
    "status": "Concluído",
    "user": {
      "id": "f3c60bf2-c3c3-44c1-8b01-6d895f8592db",
      "name": "Alysson Colombo",
      "email": "colomboalysson@gmail.com",
      "is_admin": false,
      "password": "$2b$10$N4DqynkVWpb4kH3tMGB8Me2t6dbIFPtTjGRzL6kv5YQkMTT36TNPO"
    },
    "barber": {
      "id": "85fae8ec-0bbe-473f-a11a-d02488fde4f4",
      "name": "Joao",
      "age": 24,
      "hiring_date": "2018-05-10T03:00:00.000Z"
    },
    "specialty": {
      "id": "67769ad4-1f4f-41fe-bda3-225934104e26",
      "name": "barba",
      "attributed": true
    }
  },
  {
    "id": "8e537334-05c7-4e94-8092-9bec6b5bf9c5",
    "date_time": "2023-04-26T18:00:00.000Z",
    "status": "Concluído",
    "user": {
      "id": "f3c60bf2-c3c3-44c1-8b01-6d895f8592db",
      "name": "Alysson Colombo",
      "email": "colomboalysson@gmail.com",
      "is_admin": false,
      "password": "$2b$10$N4DqynkVWpb4kH3tMGB8Me2t6dbIFPtTjGRzL6kv5YQkMTT36TNPO"
    },
    "barber": {
      "id": "85fae8ec-0bbe-473f-a11a-d02488fde4f4",
      "name": "Joao",
      "age": 24,
      "hiring_date": "2018-05-10T03:00:00.000Z"
    },
    "specialty": {
      "id": "67769ad4-1f4f-41fe-bda3-225934104e26",
      "name": "barba",
      "attributed": true
    }
  }
]
```

### 5.4. **Agendamentos filtrados por data**

[ Voltar para os Endpoints ](#3-endpoints)

### GET`/schedule/get/filter/dd-mm-yyyy`

### Exemplo de Request:

```
Exemplo:
Host: http://localhost:3001/schedule/filter/26-04-2023
Authorization: None
Content-type: Json

```

### Exemplo de Response:

```

201 Created

```

```json
[
  {
    "id": "61ce9aa5-6bce-4bb4-bf35-e9cafb930d36",
    "date_time": "2023-04-26T13:00:00.000Z",
    "status": "Concluído",
    "user": {
      "id": "f3c60bf2-c3c3-44c1-8b01-6d895f8592db",
      "name": "Alysson Colombo",
      "email": "colomboalysson@gmail.com",
      "is_admin": false,
      "password": "$2b$10$N4DqynkVWpb4kH3tMGB8Me2t6dbIFPtTjGRzL6kv5YQkMTT36TNPO"
    },
    "barber": {
      "id": "85fae8ec-0bbe-473f-a11a-d02488fde4f4",
      "name": "Joao",
      "age": 24,
      "hiring_date": "2018-05-10T03:00:00.000Z"
    },
    "specialty": {
      "id": "67769ad4-1f4f-41fe-bda3-225934104e26",
      "name": "barba",
      "attributed": true
    }
  },
  {
    "id": "8e537334-05c7-4e94-8092-9bec6b5bf9c5",
    "date_time": "2023-04-26T18:00:00.000Z",
    "status": "Concluído",
    "user": {
      "id": "f3c60bf2-c3c3-44c1-8b01-6d895f8592db",
      "name": "Alysson Colombo",
      "email": "colomboalysson@gmail.com",
      "is_admin": false,
      "password": "$2b$10$N4DqynkVWpb4kH3tMGB8Me2t6dbIFPtTjGRzL6kv5YQkMTT36TNPO"
    },
    "barber": {
      "id": "85fae8ec-0bbe-473f-a11a-d02488fde4f4",
      "name": "Joao",
      "age": 24,
      "hiring_date": "2018-05-10T03:00:00.000Z"
    },
    "specialty": {
      "id": "67769ad4-1f4f-41fe-bda3-225934104e26",
      "name": "barba",
      "attributed": true
    }
  }
]
```

### 5.5. **Agendamentos do usuário**

[ Voltar para os Endpoints ](#3-endpoints)

### GET`/schedule/{id_user}`

### Exemplo de Request:

```
Exemplo:
Host: http://localhost:3001/schedule/{id_user}
Authorization: None
Content-type: Json

```

### Exemplo de Response:

```

201 Created

```

```json
[
  {
    "id": "61ce9aa5-6bce-4bb4-bf35-e9cafb930d36",
    "date_time": "2023-04-26T13:00:00.000Z",
    "status": "Concluído",
    "user": {
      "id": "f3c60bf2-c3c3-44c1-8b01-6d895f8592db",
      "name": "Alysson Colombo",
      "email": "colomboalysson@gmail.com",
      "is_admin": false,
      "password": "$2b$10$N4DqynkVWpb4kH3tMGB8Me2t6dbIFPtTjGRzL6kv5YQkMTT36TNPO"
    },
    "barber": {
      "id": "85fae8ec-0bbe-473f-a11a-d02488fde4f4",
      "name": "Joao",
      "age": 24,
      "hiring_date": "2018-05-10T03:00:00.000Z"
    },
    "specialty": {
      "id": "67769ad4-1f4f-41fe-bda3-225934104e26",
      "name": "barba",
      "attributed": true
    }
  },
  {
    "id": "8e537334-05c7-4e94-8092-9bec6b5bf9c5",
    "date_time": "2023-04-26T18:00:00.000Z",
    "status": "Concluído",
    "user": {
      "id": "f3c60bf2-c3c3-44c1-8b01-6d895f8592db",
      "name": "Alysson Colombo",
      "email": "colomboalysson@gmail.com",
      "is_admin": false,
      "password": "$2b$10$N4DqynkVWpb4kH3tMGB8Me2t6dbIFPtTjGRzL6kv5YQkMTT36TNPO"
    },
    "barber": {
      "id": "85fae8ec-0bbe-473f-a11a-d02488fde4f4",
      "name": "Joao",
      "age": 24,
      "hiring_date": "2018-05-10T03:00:00.000Z"
    },
    "specialty": {
      "id": "67769ad4-1f4f-41fe-bda3-225934104e26",
      "name": "barba",
      "attributed": true
    }
  }
]
```
