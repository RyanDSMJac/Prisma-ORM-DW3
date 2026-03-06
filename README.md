# Atividade PRISMA DW3 - Prof. Neymar

Comandos a se rodar:

```bash
npm install express prisma @prisma/client dotenv
npm install -D typescript ts-node-dev @types/node @types/express
```

Adicione o .env então rode esses comandos:
```bash
# Requer postgresql instalado
npx prisma generate
npx prisma init --datasource-provider postgresql
npx prisma migrate dev --name init
```

Então para rodar o programa:

```bash
npm run dev
```
