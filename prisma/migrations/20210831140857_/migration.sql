-- DropIndex
DROP INDEX "TeamGroup.owner_unique";

-- AlterTable
ALTER TABLE "TeamGroup" ALTER COLUMN "owner" DROP NOT NULL;
