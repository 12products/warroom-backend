/*
  Warnings:

  - The primary key for the `Incident` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `incidentNumber` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ActionItems" DROP CONSTRAINT "ActionItems_incidentId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_incidentId_fkey";

-- DropForeignKey
ALTER TABLE "StatusMessage" DROP CONSTRAINT "StatusMessage_incidentId_fkey";

-- AlterTable
ALTER TABLE "ActionItems" ALTER COLUMN "incidentId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "incidentId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Incident" DROP CONSTRAINT "Incident_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Incident_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Incident_id_seq";

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "incidentNumber" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "StatusMessage" ALTER COLUMN "incidentId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "Incident"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActionItems" ADD CONSTRAINT "ActionItems_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "Incident"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StatusMessage" ADD CONSTRAINT "StatusMessage_incidentId_fkey" FOREIGN KEY ("incidentId") REFERENCES "Incident"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
