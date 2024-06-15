/*
  Warnings:

  - You are about to alter the column `dti` on the `economic` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `economic` MODIFY `dti` DOUBLE NOT NULL;
