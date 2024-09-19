/*
  Warnings:

  - The values [Pending,InProgress,Finished] on the enum `Car_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `car` MODIFY `status` ENUM('Available', 'InUse', 'Maintenance') NOT NULL;
