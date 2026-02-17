import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class SearchService implements OnModuleInit {
  private readonly logger = new Logger(SearchService.name);

  private readonly indices = [
    {
      name: 'vendors',
      description: 'Index for storing vendor information',
      mappings: {
        _meta: { description: 'Index for storing vendor information' },
        properties: {
          id: { type: 'keyword' },
          name: { type: 'text' },
          description: { type: 'text' },
          city: { type: 'keyword' },
          state: { type: 'keyword' },
          address: { type: 'text' },
          latitude: { type: 'float' },
          longitude: { type: 'float' },
          rating: { type: 'float' },
          isActive: { type: 'boolean' },
          createdAt: { type: 'date' },
        },
      },
    },
    {
      name: 'foods',
      description: 'Index for storing food items',
      mappings: {
        _meta: { description: 'Index for storing food items' },
        properties: {
          id: { type: 'keyword' },
          name: { type: 'text' },
          description: { type: 'text' },
          price: { type: 'float' },
          category: { type: 'keyword' },
          vendorId: { type: 'keyword' },
          vendorName: { type: 'text' },
          isAvailable: { type: 'boolean' },
          preparationTime: { type: 'integer' },
          tags: { type: 'text' },
          createdAt: { type: 'date' },
        },
      },
    },
  ];

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async onModuleInit() {
    await this.createIndices();
  }

  async createIndices() {
    for (const indexConfig of this.indices) {
      const indexExists = await this.elasticsearchService.indices.exists({
        index: indexConfig.name,
      });

      if (!indexExists) {
        await this.elasticsearchService.indices.create({
          index: indexConfig.name,
          body: {
            mappings: indexConfig.mappings,
          },
        } as any);
        this.logger.log(
          `Index ${indexConfig.name} created. Description: ${indexConfig.description}`,
        );
      }
    }
  }
}
