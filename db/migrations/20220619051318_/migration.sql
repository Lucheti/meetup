-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('Male', 'Female', 'Other');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "sex" "Sex" NOT NULL DEFAULT E'Male';
