-- CreateTable
CREATE TABLE "public"."ScamReport" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "network" TEXT NOT NULL,
    "reportCount" INTEGER NOT NULL,
    "lastReported" TIMESTAMP(3) NOT NULL,
    "username" TEXT,
    "phoneNumber" TEXT,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ScamReport_pkey" PRIMARY KEY ("id")
);
