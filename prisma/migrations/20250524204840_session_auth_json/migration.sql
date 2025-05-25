/*
  Warnings:

  - Changed the type of `session_auth` on the `clients` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "clients" DROP COLUMN "session_auth",
ADD COLUMN     "session_auth" JSONB NOT NULL;
