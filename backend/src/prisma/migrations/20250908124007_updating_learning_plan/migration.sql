/*
  Warnings:

  - You are about to drop the column `roadmap_data` on the `LearningPlan` table. All the data in the column will be lost.
  - Added the required column `learningPlan_data` to the `LearningPlan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LearningPlan" DROP COLUMN "roadmap_data",
ADD COLUMN     "learningPlan_data" JSONB NOT NULL;
