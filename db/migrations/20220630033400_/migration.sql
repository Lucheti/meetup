/*
  Warnings:

  - You are about to drop the column `url` on the `Provider` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[imageId]` on the table `Provider` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageId` to the `Provider` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Provider" DROP COLUMN "url",
ADD COLUMN     "imageId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Provider_imageId_key" ON "Provider"("imageId");

-- AddForeignKey
ALTER TABLE "Provider" ADD CONSTRAINT "Provider_imageId_fkey" FOREIGN KEY ("imageId") REFERENCES "Images"("id") ON DELETE CASCADE ON UPDATE CASCADE;
