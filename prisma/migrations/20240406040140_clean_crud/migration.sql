/*
  Warnings:

  - Made the column `extension` on table `attachment` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `date` on the `repair` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE `attachment` MODIFY `extension` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `blog` MODIFY `image` VARCHAR(254) NULL;

-- AlterTable
ALTER TABLE `message` MODIFY `chattId` INTEGER NULL;

-- AlterTable
ALTER TABLE `order` MODIFY `imei` VARCHAR(254) NULL,
    MODIFY `rating` INTEGER NULL;

-- AlterTable
ALTER TABLE `repair` MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    DROP COLUMN `date`,
    ADD COLUMN `date` DATE NOT NULL;
