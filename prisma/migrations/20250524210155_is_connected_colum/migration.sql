/*
  Warnings:

  - You are about to drop the column `is_conected` on the `clients` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "clients" DROP COLUMN "is_conected",
ADD COLUMN     "is_connected" BOOLEAN NOT NULL DEFAULT false;
