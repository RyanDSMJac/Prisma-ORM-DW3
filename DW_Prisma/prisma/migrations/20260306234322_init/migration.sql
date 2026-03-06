-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pessoa" (
    "idpessoa" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Pessoa_pkey" PRIMARY KEY ("idpessoa")
);

-- CreateTable
CREATE TABLE "Carro" (
    "idcarro" SERIAL NOT NULL,
    "modelo" TEXT NOT NULL,

    CONSTRAINT "Carro_pkey" PRIMARY KEY ("idcarro")
);

-- CreateTable
CREATE TABLE "Telefone" (
    "idtelefone" SERIAL NOT NULL,
    "numero" TEXT NOT NULL,
    "idpessoa" INTEGER NOT NULL,

    CONSTRAINT "Telefone_pkey" PRIMARY KEY ("idtelefone")
);

-- CreateTable
CREATE TABLE "PessoaPorCarro" (
    "idpessoa" INTEGER NOT NULL,
    "idcarro" INTEGER NOT NULL,

    CONSTRAINT "PessoaPorCarro_pkey" PRIMARY KEY ("idpessoa","idcarro")
);

-- AddForeignKey
ALTER TABLE "Telefone" ADD CONSTRAINT "Telefone_idpessoa_fkey" FOREIGN KEY ("idpessoa") REFERENCES "Pessoa"("idpessoa") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PessoaPorCarro" ADD CONSTRAINT "PessoaPorCarro_idpessoa_fkey" FOREIGN KEY ("idpessoa") REFERENCES "Pessoa"("idpessoa") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PessoaPorCarro" ADD CONSTRAINT "PessoaPorCarro_idcarro_fkey" FOREIGN KEY ("idcarro") REFERENCES "Carro"("idcarro") ON DELETE CASCADE ON UPDATE CASCADE;
