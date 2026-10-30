/*
  Warnings:

  - You are about to drop the column `followUpData` on the `prescriptions` table. All the data in the column will be lost.
  - Added the required column `followUpDate` to the `prescriptions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "prescriptions" DROP COLUMN "followUpData",
ADD COLUMN     "followUpDate" TIMESTAMP(3) NOT NULL;
