/*
  Warnings:

  - Added the required column `teamId` to the `Nomination` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Nomination" ADD COLUMN     "teamId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Nomination" ADD CONSTRAINT "Nomination_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
