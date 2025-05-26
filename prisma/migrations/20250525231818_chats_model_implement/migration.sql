/*
  Warnings:

  - You are about to drop the column `from_name` on the `messages` table. All the data in the column will be lost.
  - Added the required column `chat_id` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "messages" DROP COLUMN "from_name",
ADD COLUMN     "chat_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Chats" (
    "id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "from_name" TEXT,
    "from_phone" TEXT NOT NULL,

    CONSTRAINT "Chats_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Chats" ADD CONSTRAINT "Chats_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "Chats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
