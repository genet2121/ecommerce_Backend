/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `phone` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_phone_key` ON `user`(`phone`);
