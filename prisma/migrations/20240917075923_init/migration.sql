-- CreateTable
CREATE TABLE `Car` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `brand` VARCHAR(191) NOT NULL,
    `model` VARCHAR(191) NOT NULL,
    `plateNumber` VARCHAR(191) NOT NULL,
    `registrationYear` INTEGER NOT NULL,
    `mercamadridPermission` BOOLEAN NOT NULL,
    `ecologicalLabel` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `transmission` VARCHAR(191) NOT NULL,
    `renting` VARCHAR(191) NOT NULL,
    `assistanceTelephone` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
