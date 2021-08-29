/*
  Warnings:

  - Added the required column `groupId` to the `Team` table without a default value. This is not possible if the table is not empty.
  - Added the required column `participants` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "TeamGroup" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Team" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "participants" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "captain" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY ("groupId") REFERENCES "TeamGroup" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Team" ("id", "name") SELECT "id", "name" FROM "Team";
DROP TABLE "Team";
ALTER TABLE "new_Team" RENAME TO "Team";
CREATE UNIQUE INDEX "Team.createdAt_unique" ON "Team"("createdAt");
CREATE UNIQUE INDEX "Team.updatedAt_unique" ON "Team"("updatedAt");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "TeamGroup.createdAt_unique" ON "TeamGroup"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "TeamGroup.updatedAt_unique" ON "TeamGroup"("updatedAt");
