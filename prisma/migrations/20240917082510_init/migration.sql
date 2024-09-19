/*
  Warnings:

  - You are about to alter the column `ecologicalLabel` on the `car` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.
  - You are about to alter the column `transmission` on the `car` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - You are about to alter the column `status` on the `car` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(2))`.

*/
-- AlterTable
ALTER TABLE `car` MODIFY `ecologicalLabel` ENUM('B', 'C', 'ECO', 'O') NOT NULL,
    MODIFY `transmission` ENUM('Automatic', 'Manual') NOT NULL,
    MODIFY `status` ENUM('Pending', 'InProgress', 'Finished') NOT NULL;
