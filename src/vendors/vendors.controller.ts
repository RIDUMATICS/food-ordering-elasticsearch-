import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { VendorsService } from './vendors.service';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { Vendor } from './entities/vendor.entity';

@Controller('vendors')
export class VendorsController {
  constructor(private readonly vendorsService: VendorsService) {}

  // POST /vendors
  @Post()
  async create(@Body() createVendorDto: CreateVendorDto): Promise<Vendor> {
    return this.vendorsService.create(createVendorDto);
  }

  // GET /vendors
  // Supports filtering: /vendors?city=Lagos
  @Get()
  async findAll(@Query('city') city?: string): Promise<Vendor[]> {
    const query = {};

    if (city) {
      query['city'] = city;
    }
    return this.vendorsService.findAll(query);
  }

  // GET /vendors/:id
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Vendor> {
    return this.vendorsService.findOne(id);
  }

  // PATCH /vendors/:id
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateVendorDto: UpdateVendorDto,
  ): Promise<Vendor> {
    return this.vendorsService.update(id, updateVendorDto);
  }

  // DELETE /vendors/:id
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.vendorsService.remove(id);
  }
}
