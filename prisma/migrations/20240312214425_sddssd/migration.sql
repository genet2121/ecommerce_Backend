-- CreateTable
CREATE TABLE `order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `deviceId` INTEGER NOT NULL,
    `serviceId` INTEGER NOT NULL,
    `price` INTEGER NOT NULL,
    `imei` VARCHAR(254) NOT NULL,
    `description` VARCHAR(254) NOT NULL,
    `userId` INTEGER NOT NULL,
    `warranty` INTEGER NOT NULL,
    `status` VARCHAR(254) NOT NULL,

    INDEX `deviceId`(`deviceId`),
    INDEX `serviceId`(`serviceId`),
    INDEX `userId`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_ibfk_1` FOREIGN KEY (`deviceId`) REFERENCES `device`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_ibfk_2` FOREIGN KEY (`serviceId`) REFERENCES `service`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `order_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
