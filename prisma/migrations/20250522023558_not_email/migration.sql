/*
  Warnings:

  - You are about to drop the column `email` on the `clients` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "clients_email_key";

-- AlterTable
ALTER TABLE "clients" DROP COLUMN "email",
ALTER COLUMN "plan" SET DEFAULT 'PREPAID',
ALTER COLUMN "updated_at" DROP NOT NULL;
