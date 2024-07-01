import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash('password', 10)
  await prisma.user.create({
    data: {
      email: 'superAdmin@gmail.com',
      phone: '9812345678',
      password: hash,
      role: 'SUPERADMIN',
      Profile: {
        create: {
          name: 'SuperAdmin',
          username: '@super',
          dob: '1950-02-23',
          occupation: 'Administration',
          voterId: '123456',
          permanentAddress: 'Kathmandu',
          temporaryAddress: 'Kathmandu',
          referralCode: '9x9x9x',
          province: 4,
          district: 'kaski',
          municipality: 'Pokhara',
          ward: '26',
        },
      },
    },
  });
  console.log('SuperAdmin Created...');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit();
  });
