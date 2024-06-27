import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto, SignUpDto, UpdateProfileDto } from './dto/auth.dto';
import { Tokens } from './types';
import { District } from 'states-nepal';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';
import { StorageService } from 'src/storage/storage.service';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private readonly storageService: StorageService,
  ) {}

  async signUp(dto: SignUpDto): Promise<Tokens> {
    try {
      const findUser = await this.prisma.user.findFirst({
        where: {
          OR: [
            { email: dto.email },
            { phone: dto.phone },
            {
              Profile: {
                voterId: dto.voterId,
              },
            },
          ],
        },
      });

      if (findUser) {
        throw new ForbiddenException(
          'User with same number or email or voterId already exists',
        );
      }

      const district = new District();

      const allDistricts = district.getDistrictsWithMunicipalities();

      const filteredDistricts = allDistricts.filter(
        (district) => district.province_id === dto.province,
      );

      const districtNames = filteredDistricts.map((district) =>
        district.name.toLowerCase(),
      );

      if (!districtNames.includes(dto.district.toLowerCase())) {
        throw new ForbiddenException(
          `District ${dto.district} is not in province ${dto.province}`,
        );
      }

      const selectedDistrict = filteredDistricts.find(
        (district) =>
          district.name.toLowerCase() === dto.district.toLowerCase(),
      );

      if (!selectedDistrict || !selectedDistrict.municipalities) {
        throw new ForbiddenException(
          `Invalid district data for ${dto.district}`,
        );
      }

      const foundMunicipality = selectedDistrict.municipalities.find((m) => {
        return (
          m && m.name && m.name.toLowerCase() === dto.municipality.toLowerCase()
        );
      });

      if (!foundMunicipality) {
        throw new ForbiddenException(
          `Municipality ${dto.municipality} is not in district ${dto.district}`,
        );
      }

      if (
        !foundMunicipality.wards ||
        !foundMunicipality.wards.includes(dto.ward)
      ) {
        throw new ForbiddenException(
          `Ward ${dto.ward} is not in municipality ${dto.municipality}`,
        );
      }

      if (dto.password !== dto.confirmPassword) {
        throw new Error('Password and confirm password do not match');
      }

      const hash = await this.hashData(dto.password);
      const newUser = await this.prisma.user.create({
        data: {
          email: dto.email,
          phone: dto.phone,
          password: hash,
          Profile: {
            create: {
              name: dto.name,
              dob: dto.dob,
              occupation: dto.occupation,
              voterId: dto.voterId,
              permanentAddress: dto.permanentAddress,
              temporaryAddress: dto.temporaryAddress,
              referralCode: dto.referralCode,
              province: dto.province,
              district: dto.district,
              municipality: dto.municipality,
              ward: dto.ward,
            },
          },
        },
      });
      const tokens = await this.signToken(
        newUser.id,
        newUser.phone,
        newUser.email,
        newUser.role,
      );
      await this.updateRtHash(newUser.id, tokens.refresh_token);
      return tokens;
    } catch (e: any) {
      throw new ForbiddenException(e.message);
    }
  }

  async signIn(dto: SignInDto): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new ForbiddenException('User not found');

    if (user.disabled_by_admin)
      throw new ForbiddenException('User not allowed');

    const passwordMatch = await bcrypt.compare(dto.password, user.password);

    if (!passwordMatch) throw new ForbiddenException();

    const tokens = await this.signToken(
      user.id,
      user.phone,
      user.email,
      user.role,
    );

    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async signToken(
    userId: string,
    phone: string,
    email: string,
    role: Role,
  ): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: userId,
          email,
          phone,
          role,
        },
        { expiresIn: 60 * 15 * 60, secret: 'at-secret' },
      ),
      this.jwtService.signAsync(
        {
          id: userId,
          email,
          phone,
          role,
        },
        { expiresIn: 60 * 60 * 24 * 7, secret: 'rt-secret' },
      ),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async updateRtHash(userId: string, rt: string) {
    const hash = await this.hashData(rt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashRt: hash,
      },
    });
  }

  async getMe(userId: string) {
    return this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        phone: true,
        role: true,
        disabled_by_admin: true,
        kycVerified: true,
        Profile: true,
        KYC: true,
      },
    });
  }

  async updateProfile(
    userId: string,
    dto: UpdateProfileDto,
    file: Express.Multer.File,
  ) {
    let url: string = '';
    if (file) {
      url = await this.storageService.uploadPhoto(file);
    }
    const update = this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        Profile: {
          update: {
            name: dto.name,
            avatar: url,
            referralCode: dto.referralCode,
          },
        },
      },
      select: {
        id: true,
        email: true,
        phone: true,
        role: true,
        disabled_by_admin: true,
        kycVerified: true,
        Profile: true,
        KYC: true,
      },
    });
    return update;
  }
}
