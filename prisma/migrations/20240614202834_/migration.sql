-- CreateTable
CREATE TABLE `product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `short_description` VARCHAR(100) NULL,
    `description` VARCHAR(1000) NOT NULL,
    `price` DOUBLE NOT NULL,
    `image` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
