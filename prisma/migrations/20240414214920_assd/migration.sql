/*
  Warnings:

  - You are about to alter the column `business_groups` on the `businessplan` table. The data in that column could be lost. The data in that column will be cast from `VarChar(258)` to `Int`.

*/
-- AlterTable
ALTER TABLE `businessplan` MODIFY `business_groups` INTEGER NOT NULL;
