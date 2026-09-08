/*
  Warnings:

  - You are about to drop the column `status` on the `Review` table. All the data in the column will be lost.
  - Made the column `orderId` on table `Review` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Review_productId_status_idx";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "status",
ALTER COLUMN "orderId" SET NOT NULL;

-- CreateIndex
CREATE INDEX "Review_orderId_idx" ON "Review"("orderId");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
