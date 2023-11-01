/*
  Warnings:

  - The `mode_of_delivery` column on the `Course` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "DeliveryMode" AS ENUM ('online', 'hybrid', 'physical');

-- DropIndex
DROP INDEX "Course_mode_of_delivery_key";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "mode_of_delivery",
ADD COLUMN     "mode_of_delivery" "DeliveryMode" NOT NULL DEFAULT 'online';
