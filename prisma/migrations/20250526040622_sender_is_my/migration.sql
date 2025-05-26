/*
  Warnings:

  - You are about to drop the column `owner_id` on the `messages` table. All the data in the column will be lost.
  - Added the required column `sender_is_my` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "messages" DROP COLUMN "owner_id",
ADD COLUMN     "sender_is_my" BOOLEAN NOT NULL;
