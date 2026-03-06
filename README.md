# Atividade PRISMA DW3 - Prof. Neymar

Comandos a se rodar:

```bash
npm install express prisma @prisma/client dotenv
npm install -D typescript ts-node-dev @types/node @types/express
```

.env:

DATABASE_URL="postgresql://postgres:123@localhost:5432/todo_db"

```bash
# Requer postgresql e pgadmin4 instalados
npx prisma init --datasource-provider postgresql
npx prisma migrate dev --name init
```

Então para rodar o programa:

```bash
npm run dev
```
