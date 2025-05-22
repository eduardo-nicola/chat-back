-- CreateEnum
CREATE TYPE "documentType" AS ENUM ('CPF', 'CNPJ');

-- CreateEnum
CREATE TYPE "plan" AS ENUM ('PREPAID', 'POSTPAID');

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "document_id" INTEGER NOT NULL,
    "document_type" "documentType" NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "plan" "plan" NOT NULL,
    "balance" INTEGER,
    "limit" INTEGER,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clients_id_key" ON "clients"("id");

-- CreateIndex
CREATE UNIQUE INDEX "clients_document_id_key" ON "clients"("document_id");

-- CreateIndex
CREATE UNIQUE INDEX "clients_email_key" ON "clients"("email");
