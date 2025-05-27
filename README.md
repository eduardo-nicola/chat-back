# 🛠️ Nome do Projeto

Este é um projeto backend desenvolvido com NestJS, Docker e Prisma ORM.

---

## 🚀 Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- [Docker](https://www.docker.com/)
- [Prisma ORM](https://www.prisma.io/)

---

## 📦 Requisitos

- [Docker](https://www.docker.com/) instalado
- [Docker Compose](https://docs.docker.com/compose/) instalado

---

## ▶️ Rodando o Projeto pela Primeira Vez

Siga os passos abaixo para subir o ambiente e aplicar as migrações:

```bash
# 1. Suba os containers
docker compose up

# 2. Acesse o container da aplicação NestJS
docker exec -it svc-nestjs bash

# 3. Aplique as migrações do banco de dados com o Prisma
npx prisma migrate deploy
```

## Pronto o projeto estara rodando em http://localhost:3000/
