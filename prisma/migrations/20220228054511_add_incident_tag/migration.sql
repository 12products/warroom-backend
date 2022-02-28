/*
  Warnings:

  - The `incidentId` column on the `ActionItems` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `incidentId` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Incident` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Incident` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `tag` to the `Incident` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `incidentId` on the `StatusMessage` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "ActionItems" DROP CONSTRAINT "ActionItems_incidentId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_incidentId_fkey";

-- DropForeignKey
ALTER TABLE "StatusMessage" DROP CONSTRAINT "StatusMessage_incidentId_fkey";

-- AlterTable
ALTER TABLE "ActionItems" DROP COLUMN "incidentId",
ADD COLUMN     "incidentId" INTEGER;

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "incidentId",
ADD COLUMN     "incidentId" INTEGER;

-- AlterTable
ALTER TABLE "Incident" DROP CONSTRAINT "Incident_pkey",
ADD COLUMN     "tag" TEXT NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Incident_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "StatusMessage" DROP COLUMN "incidentId",
ADD COLUMN     "incidentId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "Incident"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionItems" ADD CONSTRAINT "ActionItems_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "Incident"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StatusMessage" ADD CONSTRAINT "StatusMessage_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "Incident"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
