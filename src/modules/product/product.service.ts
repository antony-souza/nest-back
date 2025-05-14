import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from 'src/services/prisma.service';
import { Product } from 'generated/prisma';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const checkProduct = await this.prisma.product.findFirst({
      where: {
        name: createProductDto.name,
        storeId: createProductDto.storeId,
        categoryId: createProductDto.categoryId,
      },
    });

    if (checkProduct) throw new BadRequestException('Product already exists');

    const newProduct = await this.prisma.product.create({
      data: {
        ...createProductDto,
      },
    });

    return newProduct;
  }

  async findAll(): Promise<Product[]> {
    return await this.prisma.product.findMany();
  }
}
