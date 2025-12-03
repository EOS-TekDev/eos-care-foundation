-- Create home_hero table
CREATE TABLE IF NOT EXISTS `home_hero` (
  `id` INT NOT NULL AUTO_INCREMENT,
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

-- Create home_services table
CREATE TABLE IF NOT EXISTS `home_services` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(191) NOT NULL,
  `description` TEXT NOT NULL,
  `icon` VARCHAR(191) NOT NULL,
  `color` VARCHAR(191) NOT NULL,
  `stats` VARCHAR(191) NULL,
  `statsLabel` VARCHAR(191) NULL,
  `isFeatured` BOOLEAN NOT NULL DEFAULT false,
  `order` INT NOT NULL DEFAULT 0,
  `isActive` BOOLEAN NOT NULL DEFAULT true,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create home_cta table
CREATE TABLE IF NOT EXISTS `home_cta` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `trustBadges` TEXT NOT NULL,
  `headline` VARCHAR(191) NOT NULL,
  `subheadline` VARCHAR(191) NOT NULL,
  `description` TEXT NOT NULL,
  `minDonation` VARCHAR(191) NOT NULL,
  `ctaPrimary` VARCHAR(191) NOT NULL,
  `ctaSecondary` VARCHAR(191) NOT NULL,
  `cardTitle` VARCHAR(191) NOT NULL,
  `cardProgress` INT NOT NULL DEFAULT 85,
  `testimonial` TEXT NULL,
  `testimonialAuthor` VARCHAR(191) NULL,
  `isActive` BOOLEAN NOT NULL DEFAULT true,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL,
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
