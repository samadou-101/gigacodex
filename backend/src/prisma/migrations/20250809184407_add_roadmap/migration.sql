-- CreateTable
CREATE TABLE "Roadmap" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "roadmap_data" JSONB NOT NULL,

    CONSTRAINT "Roadmap_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Roadmap_userId_key" ON "Roadmap"("userId");

-- AddForeignKey
ALTER TABLE "Roadmap" ADD CONSTRAINT "Roadmap_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
