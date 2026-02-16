import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Food } from './entities/food.entity';

@Injectable()
export class FoodIndexingService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async indexFood(food: Food) {
    return this.elasticsearchService.index({
      index: 'foods',
      id: food.id,
      document: {
        name: food.name,
        description: food.description,
        tags: food.tags,
        price: food.price,
        isAvailable: food.isAvailable,
        categoryId: food.category?.id,
        categoryName: food.category?.name,
        vendorId: food.vendor?.id,
      },
    });
  }

  async removeIndex(id: string) {
    return this.elasticsearchService.delete({
      index: 'foods',
      id,
    });
  }
}
