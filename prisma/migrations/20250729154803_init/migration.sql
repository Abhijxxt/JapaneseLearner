/*
  Warnings:

  - Added the required column `category` to the `Words` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subcategory` to the `Words` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `words` ADD COLUMN `category` VARCHAR(191) NOT NULL,
    ADD COLUMN `subcategory` VARCHAR(191) NOT NULL;
