-- CreateTable
CREATE TABLE "WinOfTheWeek" (
    "id" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "shoutoutId" TEXT NOT NULL,

    CONSTRAINT "WinOfTheWeek_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WinOfTheWeek_shoutoutId_key" ON "WinOfTheWeek"("shoutoutId");

-- AddForeignKey
ALTER TABLE "WinOfTheWeek" ADD CONSTRAINT "WinOfTheWeek_shoutoutId_fkey" FOREIGN KEY ("shoutoutId") REFERENCES "Shoutout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
