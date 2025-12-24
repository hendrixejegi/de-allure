-- DropIndex
DROP INDEX "ComboItem_variantId_key";

-- AlterTable
ALTER TABLE "ComboItem" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "ComboItem_pkey" PRIMARY KEY ("id");
