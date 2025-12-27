/*
  Warnings:

  - You are about to drop the column `url` on the `Image` table. All the data in the column will be lost.
  - Added the required column `metadata` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uploaded` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "url",
ADD COLUMN     "metadata" TEXT NOT NULL,
ADD COLUMN     "uploaded" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "variants" TEXT[];
