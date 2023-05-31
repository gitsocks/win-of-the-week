-- CreateTable
CREATE TABLE "Shoutout" (
    "id" TEXT NOT NULL,
    "shoutout" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "teamId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Shoutout_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Shoutout" ADD CONSTRAINT "Shoutout_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shoutout" ADD CONSTRAINT "Shoutout_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
