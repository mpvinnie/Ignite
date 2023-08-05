/*
  Warnings:

  - You are about to drop the column `adoption_date` on the `pets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "adoption_date",
ADD COLUMN     "adopted_at" TIMESTAMP(3);
