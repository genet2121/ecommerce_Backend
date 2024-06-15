/*
  Warnings:

  - Added the required column `business_plan_id` to the `loan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `loan` ADD COLUMN `business_plan_id` INTEGER NOT NULL;
