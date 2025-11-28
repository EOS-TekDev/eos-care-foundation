import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@eoscare.org' },
    update: {},
    create: {
      email: 'admin@eoscare.org',
      password: hashedPassword,
      name: 'Admin',
      role: 'ADMIN',
    },
  });

  console.log('Seeded admin user:', admin.email);

  // Seed sample about sections
  const aboutSections = [
    { title: 'Visi', content: 'Menjadi yayasan terdepan dalam pemberdayaan masyarakat.', order: 1 },
    { title: 'Misi', content: 'Memberikan edukasi dan pelatihan untuk masyarakat.', order: 2 },
  ];

  for (const section of aboutSections) {
    await prisma.about.upsert({
      where: { id: section.order },
      update: section,
      create: section,
    });
  }

  console.log('Seeded about sections');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
