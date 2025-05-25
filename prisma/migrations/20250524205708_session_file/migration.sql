/*
  Warnings:

  - You are about to drop the column `session_auth` on the `clients` table. All the data in the column will be lost.
  - Added the required column `session_file` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "clients" DROP COLUMN "session_auth",
ADD COLUMN     "session_file" TEXT NOT NULL;
