/*
  Warnings:

  - You are about to drop the column `session_file` on the `clients` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "clients" DROP COLUMN "session_file";
