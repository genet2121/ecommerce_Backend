-- CreateTable
CREATE TABLE `attachment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `table` VARCHAR(191) NULL,
    `record` VARCHAR(191) NULL,
    `file_name` VARCHAR(100) NOT NULL,
    `extension` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
