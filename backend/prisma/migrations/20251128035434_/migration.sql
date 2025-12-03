-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,
    `photo` VARCHAR(191) NULL,
    `googleId` VARCHAR(191) NULL,
    `role` ENUM('ADMIN', 'USER') NOT NULL DEFAULT 'USER',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_googleId_key`(`googleId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `berita` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` TEXT NOT NULL,
    `image` VARCHAR(191) NULL,
    `isPublished` BOOLEAN NOT NULL DEFAULT false,
    `showDonationButton` BOOLEAN NOT NULL DEFAULT false,
    `donasiId` INTEGER NULL,
    `authorId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `about` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `content` TEXT NOT NULL,
    `image` VARCHAR(191) NULL,
    `order` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kegiatan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `image` VARCHAR(191) NULL,
    `category` ENUM('SOSIAL', 'PENDIDIKAN', 'PELATIHAN') NOT NULL,
    `date` DATETIME(3) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `showDonationButton` BOOLEAN NOT NULL DEFAULT false,
    `donasiId` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `donasi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `image` VARCHAR(191) NULL,
    `targetAmount` DECIMAL(15, 2) NOT NULL,
    `currentAmount` DECIMAL(15, 2) NOT NULL DEFAULT 0,
    `deadline` DATETIME(3) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `donasi_transactions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `donasiId` INTEGER NOT NULL,
    `donorName` VARCHAR(191) NOT NULL,
    `donorEmail` VARCHAR(191) NULL,
    `amount` DECIMAL(15, 2) NOT NULL,
    `message` TEXT NULL,
    `status` ENUM('PENDING', 'COMPLETED', 'FAILED') NOT NULL DEFAULT 'PENDING',
    `orderId` VARCHAR(191) NULL,
    `snapToken` TEXT NULL,
    `paymentType` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `donasi_transactions_orderId_key`(`orderId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `team_members` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `role` VARCHAR(191) NOT NULL,
    `photo` VARCHAR(191) NULL,
    `order` INTEGER NOT NULL DEFAULT 0,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `home_hero` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `badge` VARCHAR(191) NOT NULL,
    `headline` TEXT NOT NULL,
    `subheadline` TEXT NOT NULL,
    `ctaPrimary` VARCHAR(191) NOT NULL,
    `ctaSecondary` VARCHAR(191) NOT NULL,
    `cardTitle` VARCHAR(191) NOT NULL,
    `cardDesc` TEXT NOT NULL,
    `cardBadge` VARCHAR(191) NOT NULL,
    `volunteerCount` VARCHAR(191) NOT NULL,
    `todayAmount` VARCHAR(191) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `home_services` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `icon` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `stats` VARCHAR(191) NULL,
    `statsLabel` VARCHAR(191) NULL,
    `isFeatured` BOOLEAN NOT NULL DEFAULT false,
    `order` INTEGER NOT NULL DEFAULT 0,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `home_cta` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `trustBadges` TEXT NOT NULL,
    `headline` VARCHAR(191) NOT NULL,
    `subheadline` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `minDonation` VARCHAR(191) NOT NULL,
    `ctaPrimary` VARCHAR(191) NOT NULL,
    `ctaSecondary` VARCHAR(191) NOT NULL,
    `cardTitle` VARCHAR(191) NOT NULL,
    `cardProgress` INTEGER NOT NULL DEFAULT 85,
    `testimonial` TEXT NULL,
    `testimonialAuthor` VARCHAR(191) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `berita` ADD CONSTRAINT `berita_donasiId_fkey` FOREIGN KEY (`donasiId`) REFERENCES `donasi`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `berita` ADD CONSTRAINT `berita_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kegiatan` ADD CONSTRAINT `kegiatan_donasiId_fkey` FOREIGN KEY (`donasiId`) REFERENCES `donasi`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `donasi_transactions` ADD CONSTRAINT `donasi_transactions_donasiId_fkey` FOREIGN KEY (`donasiId`) REFERENCES `donasi`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
