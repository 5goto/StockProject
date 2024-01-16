import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  async create(dto: CreateProductDto) {
    try {
      const result = this.productRepo.create(dto);
      return await this.productRepo.save(result);
    } catch (e) {
      console.log(e);
    }
  }

  async findAll(): Promise<Product[]> {
    return this.productRepo.find();
  }

  async findOne(product_id: number) {
    const product = await this.productRepo.findOne({ where: { product_id } });
    if (!product) {
      throw new NotFoundException(`Product #${product_id} not found`);
    }
    return product;
  }

  async update(product_id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepo.preload({
      product_id,
      ...updateProductDto,
    });
    if (!product) {
      throw new NotFoundException(`Product #${product_id} not found`);
    }
    return await this.productRepo.save(product);
  }

  async remove(product_id: number) {
    const product = await this.productRepo.findOne({ where: { product_id } });
    return this.productRepo.remove(product);
  }
}
