/*
  Warnings:

  - A unique constraint covering the columns `[sellerId,slug]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Made the column `publicId` on table `ProductImage` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Product_slug_key";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "rejectionReason" TEXT,
ADD COLUMN     "reviewedAt" TIMESTAMP(3),
ADD COLUMN     "reviewedBy" TEXT,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ProductImage" ALTER COLUMN "publicId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_sellerId_slug_key" ON "Product"("sellerId", "slug");
