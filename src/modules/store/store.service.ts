import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { PrismaService } from 'src/services/prisma.service';
import { Store } from 'generated/prisma';

@Injectable()
export class StoreService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createStoreDto: CreateStoreDto): Promise<Store> {
    const checkStore = await this.prisma.store.findFirst({
      where: {
        name: createStoreDto.name,
      },
    });

    if (checkStore) throw new BadRequestException('Store already exists');

    const store = await this.prisma.store.create({
      data: {
        name: createStoreDto.name,
      },
    });

    if (!store) throw new BadRequestException('Store creation failed');

    return store;
  }
}
