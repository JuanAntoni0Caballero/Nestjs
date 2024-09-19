-- CreateTable
CREATE TABLE `ReservationRequest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `duration` VARCHAR(191) NOT NULL,
    `overnight` BOOLEAN NOT NULL,
    `reason` VARCHAR(191) NOT NULL,
    `expectedDistance` INTEGER NOT NULL,
    `requests_date` VARCHAR(191) NOT NULL,
    `reservation_date` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `applicantName` VARCHAR(191) NOT NULL,
    `applicantEmail` VARCHAR(191) NOT NULL,
    `observations` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Car_reservation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `car_id` INTEGER NOT NULL,
    `reservation_request_id` INTEGER NOT NULL,
    `duration` VARCHAR(191) NOT NULL,
    `date` VARCHAR(191) NOT NULL,
    `pickUpDate` VARCHAR(191) NOT NULL,
    `returnDate` VARCHAR(191) NOT NULL,
    `reservationStatus` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Car_reservation` ADD CONSTRAINT `Car_reservation_car_id_fkey` FOREIGN KEY (`car_id`) REFERENCES `Car`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Car_reservation` ADD CONSTRAINT `Car_reservation_reservation_request_id_fkey` FOREIGN KEY (`reservation_request_id`) REFERENCES `ReservationRequest`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
