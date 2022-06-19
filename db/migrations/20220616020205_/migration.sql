/*
  Warnings:

  - You are about to drop the column `profile_picture` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "profile_picture",
ADD COLUMN     "imagesId" TEXT;

-- CreateTable
CREATE TABLE "Images" (
    "id" TEXT NOT NULL,
    "url_small" TEXT NOT NULL,
    "url_medium" TEXT NOT NULL,
    "url_large" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Images_userId_key" ON "Images"("userId");

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
