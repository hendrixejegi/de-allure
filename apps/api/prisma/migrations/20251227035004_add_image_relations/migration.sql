/*
  Warnings:

  - You are about to drop the column `image` on the `Combo` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[imageId]` on the table `Combo` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[imageId]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageId` to the `Combo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Combo" DROP COLUMN "image",
ADD COLUMN     "imageId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "image",
ADD COLUMN     "imageId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Combo_imageId_key" ON "Combo"("imageId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_imageId_key" ON "Product"("imageId");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Combo" ADD CONSTRAINT "Combo_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Image"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
