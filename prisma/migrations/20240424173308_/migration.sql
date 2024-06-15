/*
  Warnings:

  - You are about to alter the column `loan_amount` on the `loan` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `loan` MODIFY `loan_amount` DOUBLE NOT NULL,
    MODIFY `loan_reason` VARCHAR(1000) NOT NULL;
