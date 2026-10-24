/*
  Warnings:

  - You are about to drop the column `createdAT` on the `appointmets` table. All the data in the column will be lost.
  - You are about to drop the column `createdAT` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `trnsactionId` on the `payments` table. All the data in the column will be lost.
  - You are about to drop the column `endData` on the `schedules` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `schedules` table. All the data in the column will be lost.
  - You are about to drop the column `startData` on the `schedules` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `schedules` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[videoCallingId]` on the table `appointmets` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[transactionId]` on the table `payments` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripeEventId]` on the table `payments` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `videoCallingId` on the `appointmets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `transactionId` to the `payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endDateTime` to the `schedules` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDateTime` to the `schedules` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "payments_trnsactionId_idx";

-- DropIndex
DROP INDEX "payments_trnsactionId_key";

-- AlterTable
ALTER TABLE "appointmets" DROP COLUMN "createdAT",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "videoCallingId",
ADD COLUMN     "videoCallingId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "createdAT",
DROP COLUMN "trnsactionId",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "stripeEventId" TEXT,
ADD COLUMN     "transactionId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "schedules" DROP COLUMN "endData",
DROP COLUMN "endTime",
DROP COLUMN "startData",
DROP COLUMN "startTime",
ADD COLUMN     "endDateTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "startDateTime" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "appointmets_videoCallingId_key" ON "appointmets"("videoCallingId");

-- CreateIndex
CREATE UNIQUE INDEX "payments_transactionId_key" ON "payments"("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "payments_stripeEventId_key" ON "payments"("stripeEventId");

-- CreateIndex
CREATE INDEX "payments_transactionId_idx" ON "payments"("transactionId");
