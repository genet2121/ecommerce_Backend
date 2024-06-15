/*
  Warnings:

  - You are about to alter the column `idr` on the `companyeconomic` table. The data in that column could be lost. The data in that column will be cast from `VarChar(258)` to `Int`.
  - You are about to alter the column `fccr` on the `companyeconomic` table. The data in that column could be lost. The data in that column will be cast from `VarChar(258)` to `Int`.

*/
-- AlterTable
ALTER TABLE `companyeconomic` MODIFY `idr` INTEGER NOT NULL,
    MODIFY `fccr` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `economic` ADD COLUMN `score` INTEGER NULL;
