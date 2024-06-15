/*
  Warnings:

  - You are about to drop the column `loan_return_date` on the `businessplan` table. All the data in the column will be lost.
  - You are about to alter the column `total_income` on the `businessplan` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `stimated_cost` on the `businessplan` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `monthly_revenue` on the `businessplan` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `idr` on the `companyeconomic` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `fccr` on the `companyeconomic` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- DropForeignKey
ALTER TABLE `companyeconomic` DROP FOREIGN KEY `user_idss`;

-- AlterTable
ALTER TABLE `businessplan` DROP COLUMN `loan_return_date`,
    ADD COLUMN `company_id` INTEGER NULL,
    MODIFY `description` VARCHAR(5000) NOT NULL,
    MODIFY `total_income` DOUBLE NOT NULL,
    MODIFY `stimated_cost` DOUBLE NOT NULL,
    MODIFY `business_groups` INTEGER NULL,
    MODIFY `monthly_revenue` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `companyeconomic` MODIFY `idr` DOUBLE NOT NULL,
    MODIFY `fccr` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `loan` ADD COLUMN `company_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `businessplan` ADD CONSTRAINT `company_idbusinessplan` FOREIGN KEY (`company_id`) REFERENCES `company`(`id`) ON DELETE SET NULL ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `companyeconomic` ADD CONSTRAINT `user_idss` FOREIGN KEY (`user_id`) REFERENCES `company`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `loan` ADD CONSTRAINT `companyIda` FOREIGN KEY (`company_id`) REFERENCES `company`(`id`) ON DELETE SET NULL ON UPDATE RESTRICT;
