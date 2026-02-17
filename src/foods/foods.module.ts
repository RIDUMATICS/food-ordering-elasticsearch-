import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Food } from './entities/food.entity';
import { FoodCategory } from './entities/food-category.entity';
import { FoodsService } from './foods.service';
import { FoodsController } from './foods.controller';
import { SearchModule } from '../search/search.module';

@Module({
  imports: [TypeOrmModule.forFeature([Food, FoodCategory]), SearchModule],
  providers: [FoodsService],
  controllers: [FoodsController],
})
export class FoodsModule {}
