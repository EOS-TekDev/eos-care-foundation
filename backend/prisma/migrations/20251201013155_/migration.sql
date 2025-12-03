-- CreateTable
CREATE TABLE `berita_comments` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `beritaId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `parentId` INTEGER NULL,
    `content` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `berita_comments_beritaId_fkey`(`beritaId`),
    INDEX `berita_comments_userId_fkey`(`userId`),
    INDEX `berita_comments_parentId_idx`(`parentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `berita_comments` ADD CONSTRAINT `berita_comments_beritaId_fkey` FOREIGN KEY (`beritaId`) REFERENCES `berita`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `berita_comments` ADD CONSTRAINT `berita_comments_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `berita_comments` ADD CONSTRAINT `berita_comments_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `berita_comments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
