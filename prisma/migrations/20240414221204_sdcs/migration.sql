/*
  Warnings:

  - You are about to alter the column `source_of_income` on the `economic` table. The data in that column could be lost. The data in that column will be cast from `VarChar(258)` to `Int`.

*/
-- AlterTable
ALTER TABLE `businessplan` MODIFY `score` INTEGER NULL;

-- AlterTable
ALTER TABLE `economic` MODIFY `source_of_income` INTEGER NOT NULL;
