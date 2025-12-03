-- Seed data for EOS Care Foundation
-- Run after schema.sql: mysql -u user -p database < seed.sql

-- Insert default admin user
-- Password: admin123 (bcrypt hash with 10 rounds)
INSERT INTO `users` (`email`, `password`, `name`, `role`, `createdAt`, `updatedAt`)
VALUES (
  'admin@eoscare.org',
  '$2b$10$8Kx5mGH5q.z5k5q5q5q5qO5q5q5q5q5q5q5q5q5q5q5q5q5q5q5q5q',
  'Administrator',
  'ADMIN',
  NOW(),
  NOW()
) ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);

-- Insert sample about section
INSERT INTO `about` (`title`, `content`, `image`, `order`, `createdAt`, `updatedAt`)
VALUES 
  ('Tentang Kami', 'EOS Care Foundation adalah organisasi nirlaba yang berdedikasi untuk membantu masyarakat yang membutuhkan.', NULL, 1, NOW(), NOW()),
  ('Visi & Misi', 'Visi kami adalah menciptakan masyarakat yang sejahtera dan berdaya. Misi kami adalah memberikan bantuan dan pemberdayaan kepada mereka yang membutuhkan.', NULL, 2, NOW(), NOW());

-- Insert sample team members
INSERT INTO `team_members` (`name`, `role`, `photo`, `order`, `isActive`, `createdAt`, `updatedAt`)
VALUES 
  ('John Doe', 'Ketua Yayasan', NULL, 1, 1, NOW(), NOW()),
  ('Jane Smith', 'Sekretaris', NULL, 2, 1, NOW(), NOW()),
  ('Bob Wilson', 'Bendahara', NULL, 3, 1, NOW(), NOW());

-- Insert sample home hero content
INSERT INTO `home_hero` (`badge`, `headline`, `subheadline`, `ctaPrimary`, `ctaSecondary`, `cardTitle`, `cardDesc`, `cardBadge`, `volunteerCount`, `todayAmount`, `isActive`, `createdAt`, `updatedAt`)
VALUES (
  'Yayasan Terpercaya',
  'Bersama Membangun Harapan untuk Masa Depan yang Lebih Baik',
  'EOS Care Foundation berkomitmen untuk membantu masyarakat yang membutuhkan melalui program-program sosial, pendidikan, dan pemberdayaan.',
  'Donasi Sekarang',
  'Pelajari Lebih Lanjut',
  'Dampak Nyata',
  'Setiap donasi Anda memberikan dampak langsung kepada mereka yang membutuhkan.',
  'Terverifikasi',
  '500+',
  'Rp 10.000.000',
  1,
  NOW(),
  NOW()
);

-- Insert sample home services
INSERT INTO `home_services` (`title`, `description`, `icon`, `color`, `stats`, `statsLabel`, `isFeatured`, `order`, `isActive`, `createdAt`, `updatedAt`)
VALUES 
  ('Program Sosial', 'Bantuan langsung kepada masyarakat yang membutuhkan dalam bentuk sembako, kesehatan, dan kebutuhan dasar lainnya.', 'Heart', 'red', '1000+', 'Penerima Manfaat', 1, 1, 1, NOW(), NOW()),
  ('Program Pendidikan', 'Beasiswa dan bantuan pendidikan untuk anak-anak kurang mampu agar dapat melanjutkan pendidikan.', 'GraduationCap', 'blue', '200+', 'Siswa Dibantu', 1, 2, 1, NOW(), NOW()),
  ('Program Pelatihan', 'Pelatihan keterampilan dan pemberdayaan ekonomi untuk meningkatkan kemandirian masyarakat.', 'Briefcase', 'green', '150+', 'Peserta Pelatihan', 0, 3, 1, NOW(), NOW());

-- Insert sample home CTA
INSERT INTO `home_cta` (`trustBadges`, `headline`, `subheadline`, `description`, `minDonation`, `ctaPrimary`, `ctaSecondary`, `cardTitle`, `cardProgress`, `testimonial`, `testimonialAuthor`, `isActive`, `createdAt`, `updatedAt`)
VALUES (
  'Terdaftar Resmi, Transparan, Akuntabel',
  'Jadilah Bagian dari Perubahan',
  'Setiap Kontribusi Berarti',
  'Donasi Anda akan digunakan untuk program-program sosial, pendidikan, dan pemberdayaan masyarakat. Kami menjamin transparansi dan akuntabilitas dalam setiap penggunaan dana.',
  'Rp 10.000',
  'Donasi Sekarang',
  'Lihat Program Kami',
  'Target Donasi Bulan Ini',
  45,
  'Berkat bantuan EOS Care Foundation, anak saya bisa melanjutkan sekolah. Terima kasih banyak!',
  'Ibu Siti, Penerima Manfaat',
  1,
  NOW(),
  NOW()
);

-- Insert sample donasi campaign
INSERT INTO `donasi` (`title`, `description`, `image`, `targetAmount`, `currentAmount`, `deadline`, `isActive`, `createdAt`, `updatedAt`)
VALUES (
  'Bantuan Pendidikan Anak Yatim',
  'Program beasiswa untuk anak-anak yatim agar dapat melanjutkan pendidikan mereka.',
  NULL,
  50000000.00,
  12500000.00,
  DATE_ADD(NOW(), INTERVAL 3 MONTH),
  1,
  NOW(),
  NOW()
);

-- Insert sample kegiatan
INSERT INTO `kegiatan` (`title`, `description`, `image`, `category`, `date`, `isActive`, `showDonationButton`, `donasiId`, `createdAt`, `updatedAt`)
VALUES 
  ('Bakti Sosial Ramadhan', 'Pembagian sembako dan santunan untuk masyarakat kurang mampu di bulan Ramadhan.', NULL, 'SOSIAL', DATE_ADD(NOW(), INTERVAL 1 MONTH), 1, 0, NULL, NOW(), NOW()),
  ('Beasiswa Prestasi 2024', 'Program beasiswa untuk siswa berprestasi dari keluarga kurang mampu.', NULL, 'PENDIDIKAN', DATE_ADD(NOW(), INTERVAL 2 WEEK), 1, 1, 1, NOW(), NOW()),
  ('Pelatihan Kewirausahaan', 'Pelatihan keterampilan usaha untuk ibu-ibu rumah tangga.', NULL, 'PELATIHAN', DATE_ADD(NOW(), INTERVAL 1 WEEK), 1, 0, NULL, NOW(), NOW());
