-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "participants" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "captain" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamGroup" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Team.createdAt_unique" ON "Team"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Team.updatedAt_unique" ON "Team"("updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "TeamGroup.createdAt_unique" ON "TeamGroup"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "TeamGroup.updatedAt_unique" ON "TeamGroup"("updatedAt");

-- AddForeignKey
ALTER TABLE "Team" ADD FOREIGN KEY ("groupId") REFERENCES "TeamGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
