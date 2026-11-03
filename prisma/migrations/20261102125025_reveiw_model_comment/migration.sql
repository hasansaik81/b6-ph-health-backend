/*
  Warnings:

  - You are about to drop the column `commet` on the `reviews` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "reviews" DROP COLUMN "commet",
ADD COLUMN     "comment" TEXT;
