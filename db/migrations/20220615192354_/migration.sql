/*
  Warnings:

  - A unique constraint covering the columns `[followerId,followeeId]` on the table `Follower` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Follower_followerId_followeeId_key" ON "Follower"("followerId", "followeeId");
