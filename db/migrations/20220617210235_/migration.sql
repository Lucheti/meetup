-- DropForeignKey
ALTER TABLE "Location" DROP CONSTRAINT "Location_eventId_fkey";

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
