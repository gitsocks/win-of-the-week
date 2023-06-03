-- CreateTable
CREATE TABLE "Nomination" (
    "userId" TEXT NOT NULL,
    "shoutoutId" TEXT NOT NULL,

    CONSTRAINT "Nomination_pkey" PRIMARY KEY ("userId","shoutoutId")
);

-- AddForeignKey
ALTER TABLE "Nomination" ADD CONSTRAINT "Nomination_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nomination" ADD CONSTRAINT "Nomination_shoutoutId_fkey" FOREIGN KEY ("shoutoutId") REFERENCES "Shoutout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
