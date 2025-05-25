/*
  Warnings:

  - Added the required column `session_file` to the `clients` table without a default value. This is not possible if the table is not empty.
  - Made the column `phone_number` on table `clients` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "session_file" TEXT NOT NULL,
ALTER COLUMN "phone_number" SET NOT NULL;
