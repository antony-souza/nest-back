import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaService } from 'src/services/prisma.service';
import { Category } from 'generated/prisma';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const checkCategory = await this.prisma.category.count({
      where: {
        name: createCategoryDto.name,
        storeId: createCategoryDto.storeId,
      },
    });

    if (checkCategory > 0)
      throw new BadRequestException('Category already exists');

    const newCategory = await this.prisma.category.create({
      data: {
        ...createCategoryDto,
      },
    });

    if (!newCategory)
      throw new BadRequestException('Failed to create category');

    return newCategory;
  }

  findAll(): Promise<Category[]> {
    return this.prisma.category.findMany({
      include: {
        store: {
          select: {
            name: true,
          },
        },
      },
    });
  }
}
