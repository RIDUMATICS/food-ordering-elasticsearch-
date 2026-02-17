import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { Food } from './entities/food.entity';
import { FoodCategory } from './entities/food-category.entity';
import { Vendor } from '../vendors/entities/vendor.entity';

@Injectable()
export class FoodsService {
  constructor(
    @InjectRepository(Food)
    private readonly foodRepository: Repository<Food>,
    @InjectRepository(FoodCategory)
    private readonly categoryRepository: Repository<FoodCategory>,
  ) {}

  async createFood(createFoodDto: CreateFoodDto): Promise<Food> {
    const { categoryId, vendorId, ...foodData } = createFoodDto;

    const category = await this.categoryRepository.findOneBy({
      id: categoryId,
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${categoryId} not found`);
    }

    const food = this.foodRepository.create({
      ...foodData,
      category,
      vendor: { id: vendorId } as Vendor,
    });

    const savedFood = await this.foodRepository.save(food);
    return savedFood;
  }

  async findAll(): Promise<Food[]> {
    return this.foodRepository.find({
      relations: ['category', 'vendor'],
    });
  }

  async findOne(id: string): Promise<Food> {
    const food = await this.foodRepository.findOne({
      where: { id },
      relations: ['category', 'vendor'],
    });
    if (!food) {
      throw new NotFoundException(`Food with ID ${id} not found`);
    }
    return food;
  }

  async update(id: string, updateFoodDto: UpdateFoodDto): Promise<Food> {
    const food = await this.findOne(id);
    const { categoryId, vendorId, ...updateData } = updateFoodDto;

    if (categoryId) {
      const category = await this.categoryRepository.findOneBy({
        id: categoryId,
      });
      if (!category) {
        throw new NotFoundException(`Category with ID ${categoryId} not found`);
      }
      food.category = category;
    }

    if (vendorId) {
      food.vendor = { id: vendorId } as Vendor;
    }

    Object.assign(food, updateData);
    const savedFood = await this.foodRepository.save(food);
    return savedFood;
  }

  async updatePrice(id: string, price: number): Promise<Food> {
    const food = await this.findOne(id);
    food.price = price;
    const savedFood = await this.foodRepository.save(food);
    return savedFood;
  }

  async updateAvailability(id: string, isAvailable: boolean): Promise<Food> {
    const food = await this.findOne(id);
    food.isAvailable = isAvailable;
    const savedFood = await this.foodRepository.save(food);
    return savedFood;
  }

  async remove(id: string): Promise<void> {
    const food = await this.findOne(id);
    await this.foodRepository.remove(food);
  }

  // Categories
  async createCategory(
    name: string,
    description?: string,
  ): Promise<FoodCategory> {
    const category = this.categoryRepository.create({ name, description });
    return this.categoryRepository.save(category);
  }

  async findAllCategories(): Promise<FoodCategory[]> {
    return this.categoryRepository.find();
  }
}
