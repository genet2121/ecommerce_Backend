/*
  Warnings:

  - Added the required column `logoColor` to the `bank` table without a default value. This is not possible if the table is not empty.
  - Made the column `image` on table `bank` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `bank` ADD COLUMN `logoColor` VARCHAR(10) NOT NULL,
    MODIFY `image` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `company` ADD COLUMN `score` INTEGER NULL;
