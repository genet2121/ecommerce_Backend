-- AlterTable
ALTER TABLE `bank` MODIFY `image` VARCHAR(258) NULL;

-- AlterTable
ALTER TABLE `company` MODIFY `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `personal` MODIFY `age` INTEGER NULL,
    MODIFY `education` VARCHAR(258) NULL,
    MODIFY `marital_status` VARCHAR(258) NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `Password` VARCHAR(258) NULL,
    MODIFY `Username` VARCHAR(258) NULL;
