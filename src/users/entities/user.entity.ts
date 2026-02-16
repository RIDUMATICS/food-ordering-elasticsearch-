import { Order } from 'src/orders/entities/order.entity';
import { Vendor } from 'src/vendors/entities/vendor.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: false, name: 'is_vendor' })
  isVendor: boolean;

  @OneToOne(() => Vendor, (vendor) => vendor.user)
  vendor: Vendor;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  // @OneToMany(() => FoodReview, (review) => review.user)
  // reviews: FoodReview[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
