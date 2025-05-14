import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/services/prisma.service';
import { HashPasswordService } from 'src/services/hash-password.service';
import { User } from 'generated/prisma';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const [checkStore, checkUser] = await Promise.all([
      this.prisma.store.findUnique({
        where: { id: createUserDto.storeId },
      }),
      this.prisma.user.findUnique({
        where: { email: createUserDto.email },
      }),
    ]);

    if (checkUser) throw new BadRequestException('User already exists');
    if (!checkStore) throw new NotFoundException('Store not found');

    const newUser = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: await HashPasswordService.hashPassword(
          createUserDto.password,
        ),
      },
    });

    if (!newUser) throw new BadRequestException('User not created');

    return newUser;
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      include: {
        store: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!users) throw new NotFoundException('No users found');

    return users;
  }
}
