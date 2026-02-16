import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { UpdateVendorDto } from './dto/update-vendor.dto';
import { Vendor } from './entities/vendor.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class VendorsService {
  constructor(
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,
    private readonly usersService: UsersService,
  ) {}

  async register(createVendorDto: CreateVendorDto): Promise<Vendor> {
    // 1. Create User
    const user = await this.usersService.create({
      email: createVendorDto.email,
      password: createVendorDto.password,
      name: createVendorDto.name,
      isVendor: true,
    });

    // 2. Create Vendor
    const vendor = this.vendorRepository.create({
      name: createVendorDto.vendorName,
      description: createVendorDto.description,
      address: createVendorDto.address,
      city: createVendorDto.city,
      state: createVendorDto.state,
      latitude: createVendorDto.latitude,
      longitude: createVendorDto.longitude,
      userId: user.id,
    });

    return this.vendorRepository.save(vendor);
  }

  async findAll(query: FindOptionsWhere<Vendor>): Promise<Vendor[]> {
    return this.vendorRepository.find({
      where: query,
    });
  }

  async findOne(id: string): Promise<Vendor> {
    const vendor = await this.vendorRepository.findOneBy({ id });
    if (!vendor) {
      throw new NotFoundException(`Vendor with ID ${id} not found`);
    }
    return vendor;
  }

  async update(id: string, updateVendorDto: UpdateVendorDto): Promise<Vendor> {
    const vendor = await this.findOne(id);
    Object.assign(vendor, updateVendorDto);
    return this.vendorRepository.save(vendor);
  }

  async remove(id: string): Promise<void> {
    const vendor = await this.findOne(id);
    await this.vendorRepository.remove(vendor);
  }
}
