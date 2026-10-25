/*
  Warnings:

  - You are about to drop the column `scheduledId` on the `appointmets` table. All the data in the column will be lost.
  - Added the required column `scheduleId` to the `appointmets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "appointmets" DROP CONSTRAINT "appointmets_scheduledId_fkey";

-- DropIndex
DROP INDEX "appointmets_scheduledId_idx";

-- AlterTable
ALTER TABLE "appointmets" DROP COLUMN "scheduledId",
ADD COLUMN     "scheduleId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "appointmets_scheduleId_idx" ON "appointmets"("scheduleId");

-- AddForeignKey
ALTER TABLE "appointmets" ADD CONSTRAINT "appointmets_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "schedules"("id") ON DELETE CASCADE ON UPDATE CASCADE;
