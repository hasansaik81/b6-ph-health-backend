/*
  Warnings:

  - You are about to drop the column `paintedId` on the `appointmets` table. All the data in the column will be lost.
  - Added the required column `patientId` to the `appointmets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "appointmets" DROP CONSTRAINT "appointmets_paintedId_fkey";

-- DropIndex
DROP INDEX "appointmets_paintedId_idx";

-- AlterTable
ALTER TABLE "appointmets" DROP COLUMN "paintedId",
ADD COLUMN     "patientId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "appointmets_patientId_idx" ON "appointmets"("patientId");

-- AddForeignKey
ALTER TABLE "appointmets" ADD CONSTRAINT "appointmets_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE CASCADE ON UPDATE CASCADE;
