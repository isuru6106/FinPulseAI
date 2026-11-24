-- CreateEnum
CREATE TYPE "ValuationMethod" AS ENUM ('MARKET_PRICE', 'MANUAL', 'CONTRACTUAL', 'APPRAISAL', 'ESTIMATED');

-- CreateEnum
CREATE TYPE "HoldingStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'CLOSED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "AssetType" ADD VALUE 'ETF';
ALTER TYPE "AssetType" ADD VALUE 'COMMODITY';
ALTER TYPE "AssetType" ADD VALUE 'GOVERNMENT_SECURITY';
ALTER TYPE "AssetType" ADD VALUE 'FIXED_DEPOSIT';
ALTER TYPE "AssetType" ADD VALUE 'MUTUAL_FUND';
ALTER TYPE "AssetType" ADD VALUE 'REAL_ESTATE';
ALTER TYPE "AssetType" ADD VALUE 'CASH_EQUIVALENT';
ALTER TYPE "AssetType" ADD VALUE 'OTHER';

-- CreateTable
CREATE TABLE "Portfolio" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'My Portfolio',
    "description" TEXT,
    "baseCurrency" TEXT NOT NULL DEFAULT 'USD',
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Portfolio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Holding" (
    "id" TEXT NOT NULL,
    "portfolioId" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "quantity" DECIMAL(30,12) NOT NULL,
    "averageCost" DECIMAL(30,12),
    "costCurrency" TEXT,
    "valuationMethod" "ValuationMethod" NOT NULL DEFAULT 'MANUAL',
    "status" "HoldingStatus" NOT NULL DEFAULT 'ACTIVE',
    "acquiredAt" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Holding_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssetValuation" (
    "id" TEXT NOT NULL,
    "holdingId" TEXT NOT NULL,
    "unitPrice" DECIMAL(30,12) NOT NULL,
    "totalValue" DECIMAL(30,12) NOT NULL,
    "currency" TEXT NOT NULL,
    "method" "ValuationMethod" NOT NULL,
    "source" TEXT,
    "valuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AssetValuation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Portfolio_userId_idx" ON "Portfolio"("userId");

-- CreateIndex
CREATE INDEX "Holding_portfolioId_idx" ON "Holding"("portfolioId");

-- CreateIndex
CREATE INDEX "Holding_assetId_idx" ON "Holding"("assetId");

-- CreateIndex
CREATE INDEX "Holding_portfolioId_status_idx" ON "Holding"("portfolioId", "status");

-- CreateIndex
CREATE INDEX "AssetValuation_holdingId_valuedAt_idx" ON "AssetValuation"("holdingId", "valuedAt");

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Holding" ADD CONSTRAINT "Holding_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Holding" ADD CONSTRAINT "Holding_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetValuation" ADD CONSTRAINT "AssetValuation_holdingId_fkey" FOREIGN KEY ("holdingId") REFERENCES "Holding"("id") ON DELETE CASCADE ON UPDATE CASCADE;
