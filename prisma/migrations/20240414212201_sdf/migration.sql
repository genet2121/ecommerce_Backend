/*
  Warnings:

  - Added the required column `score` to the `personal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `personal` ADD COLUMN `score` INTEGER NOT NULL;
