-- CreateEnum
CREATE TYPE "EventVisibility" AS ENUM ('Public', 'Private');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "visibility" "EventVisibility" NOT NULL DEFAULT E'Public';
