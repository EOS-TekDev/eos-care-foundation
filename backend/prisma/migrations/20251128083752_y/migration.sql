-- DropForeignKey
ALTER TABLE `berita` DROP FOREIGN KEY `berita_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `donasi_transactions` DROP FOREIGN KEY `donasi_transactions_donasiId_fkey`;

-- AlterTable
ALTER TABLE `berita` MODIFY `title` TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE `berita` ADD CONSTRAINT `berita_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `donasi_transactions` ADD CONSTRAINT `donasi_transactions_donasiId_fkey` FOREIGN KEY (`donasiId`) REFERENCES `donasi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
