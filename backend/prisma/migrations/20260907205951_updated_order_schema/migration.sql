/*
  Warnings:

  - The values [READY_FOR_PICKUP,PICKED_UP,OUT_FOR_DELIVERY,COMPLETED,RETURN_REQUESTED,RETURNED,REFUNDED] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `discount` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `orderNumber` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `platformFee` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shippingCity` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shippingFullName` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shippingKebele` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shippingLandmark` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shippingPhone` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shippingStreet` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shippingSubCity` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `shippingWoreda` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `productSku` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `subtotal` on the `OrderItem` table. All the data in the column will be lost.
  - Made the column `addressId` on table `Order` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `totalPrice` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED');
ALTER TABLE "public"."Order" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Order" ALTER COLUMN "status" TYPE "OrderStatus_new" USING ("status"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "public"."OrderStatus_old";
ALTER TABLE "Order" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_addressId_fkey";

-- DropIndex
DROP INDEX "Order_orderNumber_key";

-- DropIndex
DROP INDEX "Order_status_createdAt_idx";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "discount",
DROP COLUMN "notes",
DROP COLUMN "orderNumber",
DROP COLUMN "platformFee",
DROP COLUMN "shippingCity",
DROP COLUMN "shippingFullName",
DROP COLUMN "shippingKebele",
DROP COLUMN "shippingLandmark",
DROP COLUMN "shippingPhone",
DROP COLUMN "shippingStreet",
DROP COLUMN "shippingSubCity",
DROP COLUMN "shippingWoreda",
ADD COLUMN     "customerNote" TEXT,
ALTER COLUMN "addressId" SET NOT NULL,
ALTER COLUMN "deliveryFee" DROP DEFAULT;

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "productSku",
DROP COLUMN "subtotal",
ADD COLUMN     "productImage" TEXT,
ADD COLUMN     "totalPrice" DECIMAL(12,2) NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
