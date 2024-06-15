/*
  Warnings:

  - You are about to alter the column `dti` on the `economic` table. The data in that column could be lost. The data in that column will be cast from `VarChar(258)` to `Int`.

*/
-- AlterTable
ALTER TABLE `economic` MODIFY `dti` INTEGER NOT NULL;
