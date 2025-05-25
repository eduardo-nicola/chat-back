-- CreateEnum
CREATE TYPE "status" AS ENUM ('PENDING', 'SENT');

-- AlterTable
ALTER TABLE "clients" ADD COLUMN     "phone_number" TEXT;

-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" "status" NOT NULL,
    "to_phone" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
