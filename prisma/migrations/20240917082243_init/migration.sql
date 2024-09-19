/*
  Warnings:

  - You are about to alter the column `duration` on the `car_reservation` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(2))`.
  - You are about to alter the column `date` on the `car_reservation` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `pickUpDate` on the `car_reservation` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `returnDate` on the `car_reservation` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `status` on the `car_reservation` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(3))`.
  - You are about to alter the column `duration` on the `reservationrequest` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(2))`.
  - You are about to alter the column `requests_date` on the `reservationrequest` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to alter the column `reservation_date` on the `reservationrequest` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `car_reservation` MODIFY `duration` ENUM('Morning', 'Afternoon') NOT NULL,
    MODIFY `date` DATETIME(3) NOT NULL,
    MODIFY `pickUpDate` DATETIME(3) NOT NULL,
    MODIFY `returnDate` DATETIME(3) NOT NULL,
    MODIFY `status` ENUM('Pending', 'InProgress', 'Finished') NOT NULL;

-- AlterTable
ALTER TABLE `reservationrequest` MODIFY `duration` ENUM('Morning', 'Afternoon') NOT NULL,
    MODIFY `requests_date` DATETIME(3) NOT NULL,
    MODIFY `reservation_date` DATETIME(3) NOT NULL;
