/*
  Warnings:

  - You are about to drop the column `statusMessageId` on the `Incident` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ActionItems" DROP CONSTRAINT "ActionItems_userId_fkey";

-- AlterTable
ALTER TABLE "ActionItems" ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Incident" DROP COLUMN "statusMessageId";

-- AddForeignKey
ALTER TABLE "ActionItems" ADD CONSTRAINT "ActionItems_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
