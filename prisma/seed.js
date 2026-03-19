import prisma from '../src/config/db.js';
import bcrypt from 'bcryptjs';


async function main() {
  // Hash the password
  const hashedPassword = await bcrypt.hash('admin123', 10);

  // Create or update admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@restaurant.com' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@restaurant.com',
      password: hashedPassword,
      isAdmin: true,
    },
  });

  console.log('Admin user created:', admin);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });