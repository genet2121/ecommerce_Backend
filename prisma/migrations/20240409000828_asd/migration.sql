/*
  Warnings:

  - Added the required column `file_name` to the `attachment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `attachment` ADD COLUMN `file_name` VARCHAR(100) NOT NULL;
