/*
  Warnings:

  - You are about to drop the column `exprience` on the `doctor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "doctor" DROP COLUMN "exprience",
ADD COLUMN     "experience" INTEGER NOT NULL DEFAULT 0;
