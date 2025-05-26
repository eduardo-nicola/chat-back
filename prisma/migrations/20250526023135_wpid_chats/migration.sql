/*
  Warnings:

  - A unique constraint covering the columns `[wp_id]` on the table `chats` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `wp_id` to the `chats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chats" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "wp_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "chats_wp_id_key" ON "chats"("wp_id");
