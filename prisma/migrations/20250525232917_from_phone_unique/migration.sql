/*
  Warnings:

  - A unique constraint covering the columns `[from_phone]` on the table `chats` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "chats_from_phone_key" ON "chats"("from_phone");
