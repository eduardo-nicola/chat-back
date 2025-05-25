/*
  Warnings:

  - You are about to drop the column `to_phone` on the `messages` table. All the data in the column will be lost.
  - Added the required column `from_phone` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "messages" DROP COLUMN "to_phone",
ADD COLUMN     "from_name" TEXT,
ADD COLUMN     "from_phone" TEXT NOT NULL;
