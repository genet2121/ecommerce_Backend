/*
  Warnings:

  - You are about to drop the column `email` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `attachment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `blog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `device` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `faq` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `feedback` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `message` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `repair` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `service` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `Email` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FullName` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Password` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Phone` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Role` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Status` to the `user` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Username` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `message_ibfk_1`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `order_ibfk_1`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `order_ibfk_2`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `order_ibfk_3`;

-- DropForeignKey
ALTER TABLE `repair` DROP FOREIGN KEY `fk_orderId`;

-- DropIndex
DROP INDEX `User_email_key` ON `user`;

-- DropIndex
DROP INDEX `User_phone_key` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `email`,
    DROP COLUMN `name`,
    DROP COLUMN `password`,
    DROP COLUMN `phone`,
    DROP COLUMN `role`,
    ADD COLUMN `Email` VARCHAR(258) NOT NULL,
    ADD COLUMN `FullName` VARCHAR(258) NOT NULL,
    ADD COLUMN `Password` VARCHAR(258) NOT NULL,
    ADD COLUMN `Phone` VARCHAR(258) NOT NULL,
    ADD COLUMN `Role` VARCHAR(258) NOT NULL,
    ADD COLUMN `Status` VARCHAR(258) NOT NULL,
    ADD COLUMN `Username` VARCHAR(258) NOT NULL;

-- DropTable
DROP TABLE `attachment`;

-- DropTable
DROP TABLE `blog`;

-- DropTable
DROP TABLE `device`;

-- DropTable
DROP TABLE `faq`;

-- DropTable
DROP TABLE `feedback`;

-- DropTable
DROP TABLE `message`;

-- DropTable
DROP TABLE `order`;

-- DropTable
DROP TABLE `repair`;

-- DropTable
DROP TABLE `service`;

-- CreateTable
CREATE TABLE `bank` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `name` VARCHAR(258) NOT NULL,
    `image` VARCHAR(258) NOT NULL,

    INDEX `userId`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `businessplan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sector` VARCHAR(258) NOT NULL,
    `sub_sector` VARCHAR(258) NOT NULL,
    `description` VARCHAR(258) NOT NULL,
    `loan_return_date` DATE NOT NULL,
    `opportunity_created` INTEGER NOT NULL,
    `total_income` INTEGER NOT NULL,
    `current_stage` VARCHAR(258) NOT NULL,
    `stimated_cost` INTEGER NOT NULL,
    `business_groups` VARCHAR(258) NOT NULL,
    `monthly_revenue` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `score` INTEGER NOT NULL,

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `company` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `name` INTEGER NOT NULL,
    `legal_status` VARCHAR(258) NOT NULL,
    `tin` VARCHAR(258) NOT NULL,
    `sector` VARCHAR(258) NOT NULL,

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `companyeconomic` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `name` VARCHAR(258) NOT NULL,
    `employee_count` INTEGER NOT NULL,
    `company_age` INTEGER NOT NULL,
    `current_loans` INTEGER NOT NULL,
    `repaid_loans` INTEGER NOT NULL,
    `idr` VARCHAR(258) NOT NULL,
    `fccr` VARCHAR(258) NOT NULL,
    `assets` VARCHAR(258) NOT NULL,

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `economic` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `field_of_employment` VARCHAR(258) NOT NULL,
    `experience` INTEGER NOT NULL,
    `source_of_income` VARCHAR(258) NOT NULL,
    `current_loans` INTEGER NOT NULL,
    `repaid_loans` INTEGER NOT NULL,
    `dti` VARCHAR(258) NOT NULL,
    `assets` VARCHAR(258) NOT NULL,

    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `loan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `bank` INTEGER NOT NULL,
    `loan_amount` INTEGER NOT NULL,
    `loan_reason` VARCHAR(258) NOT NULL,
    `repayment_period` INTEGER NOT NULL,
    `collateral_type` VARCHAR(258) NOT NULL,
    `job_status` VARCHAR(258) NOT NULL,

    INDEX `bank`(`bank`),
    INDEX `userIda`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `personal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `tin` VARCHAR(258) NOT NULL,
    `age` INTEGER NOT NULL,
    `education` VARCHAR(258) NOT NULL,
    `marital_status` VARCHAR(258) NOT NULL,
    `dependants` INTEGER NOT NULL,
    `criminal` BOOLEAN NOT NULL,

    INDEX `userIds`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `bank` ADD CONSTRAINT `userId` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `businessplan` ADD CONSTRAINT `user_idbusinessplan` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `company` ADD CONSTRAINT `user_idff` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `companyeconomic` ADD CONSTRAINT `user_idss` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `economic` ADD CONSTRAINT `user_ideconomic` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `loan` ADD CONSTRAINT `bank` FOREIGN KEY (`bank`) REFERENCES `bank`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `loan` ADD CONSTRAINT `userIda` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `personal` ADD CONSTRAINT `userIds` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
