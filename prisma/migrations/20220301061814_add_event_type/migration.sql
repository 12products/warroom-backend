/*
  Warnings:

  - Added the required column `tag` to the `Incident` table without a default value. This is not possible if the table is not empty.
  - Added the required column `incidentNumber` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('CAUSE', 'DETECTION', 'RESOLUTION', 'GENERIC');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "type" "EventType" NOT NULL DEFAULT E'GENERIC';

-- AlterTable
ALTER TABLE "Incident" ADD COLUMN     "tag" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "incidentNumber" INTEGER NOT NULL;
