/*
  Warnings:

  - You are about to drop the column `receiverId` on the `message` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `warranty` on the `order` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `user` table. All the data in the column will be lost.
  - Added the required column `chattId` to the `message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `completed` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `warrantyAmount` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `warrantyDate` to the `order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `message` DROP COLUMN `receiverId`,
    ADD COLUMN `chattId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `order` DROP COLUMN `description`,
    DROP COLUMN `status`,
    DROP COLUMN `warranty`,
    ADD COLUMN `code` INTEGER NOT NULL,
    ADD COLUMN `completed` BOOLEAN NOT NULL,
    ADD COLUMN `date` DATE NOT NULL,
    ADD COLUMN `number` INTEGER NOT NULL,
    ADD COLUMN `rating` INTEGER NOT NULL,
    ADD COLUMN `state` VARCHAR(254) NOT NULL,
    ADD COLUMN `warrantyAmount` INTEGER NOT NULL,
    ADD COLUMN `warrantyDate` DATE NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `firstName`,
    DROP COLUMN `lastName`,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `repair` (
    `id` INTEGER NOT NULL,
    `orderId` INTEGER NOT NULL,
    `date` INTEGER NOT NULL,
    `state` INTEGER NOT NULL,
    `description` INTEGER NOT NULL,

    INDEX `fk_orderId`(`orderId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `repair` ADD CONSTRAINT `fk_orderId` FOREIGN KEY (`orderId`) REFERENCES `order`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
