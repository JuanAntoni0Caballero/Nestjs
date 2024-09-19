/*
  Warnings:

  - You are about to drop the column `reservationStatus` on the `car_reservation` table. All the data in the column will be lost.
  - You are about to alter the column `status` on the `reservationrequest` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - Added the required column `status` to the `Car_reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `car_reservation` DROP COLUMN `reservationStatus`,
    ADD COLUMN `status` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `reservationrequest` MODIFY `status` ENUM('Pending', 'InProgress', 'Finished') NOT NULL;
