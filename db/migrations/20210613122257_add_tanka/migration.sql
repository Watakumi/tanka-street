-- CreateTable
CREATE TABLE "Tanka" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstLine" TEXT NOT NULL,
    "secondLine" TEXT NOT NULL,
    "thirdLine" TEXT NOT NULL,
    "fourthLine" TEXT NOT NULL,
    "fifthLine" TEXT NOT NULL,

    PRIMARY KEY ("id")
);
