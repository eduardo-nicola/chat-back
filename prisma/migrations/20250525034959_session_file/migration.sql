/*
  Warnings:

  - Added the required column `session_file` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "session_file" TEXT NOT NULL;
