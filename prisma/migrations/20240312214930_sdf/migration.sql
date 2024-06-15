/*
  Warnings:

  - Added the required column `role` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `role` VARCHAR(191) NOT NULL,
    MODIFY `phone` INTEGER NULL,
    MODIFY `password` VARCHAR(191) NULL;
