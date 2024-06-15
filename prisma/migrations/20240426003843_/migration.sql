/*
  Warnings:

  - Added the required column `status` to the `loan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `loan` ADD COLUMN `status` VARCHAR(10) NOT NULL;
