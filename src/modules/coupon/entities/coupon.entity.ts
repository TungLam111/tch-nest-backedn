import { AbstractEntity } from 'src/helper/common/common-entity';
import { User } from 'src/modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Coupon extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  couponType: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  discountPercentage: number;

  @Column()
  expiryDate: Date;

  @Column({ nullable: true })
  minimumSpend: string;

  @Column()
  isActive: boolean;

  @Column({ nullable: true })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: User;
}

export function CouponCreateInput(createCouponDto: {
  code: string;
  couponType: string;
  description: string;
  discountPercentage: number | null;
  expiryDate: Date;
  minimumSpend: string | null;
  isActive: boolean;
  userId: string | null;
}): Coupon {
  const createDto: Coupon = new Coupon();
  createDto.code = createCouponDto.code;
  createDto.couponType = createCouponDto.couponType;
  createDto.description = createCouponDto.description;
  createDto.discountPercentage = createCouponDto.discountPercentage;
  createDto.expiryDate = createCouponDto.expiryDate;
  createDto.minimumSpend = createCouponDto.minimumSpend;
  createDto.isActive = createCouponDto.isActive;
  createDto.userId = createCouponDto.userId;
  return createDto;
}

export function CouponUpdateInput(
  currentCoupon: Coupon,
  updateCouponDto: {
    code?: string;
    couponType?: string;
    description?: string;
    discountPercentage?: number | null;
    expiryDate?: Date;
    minimumSpend?: string | null;
    isActive?: boolean;
    userId?: string | null;
  },
): Coupon {
  const updateCoupon: Coupon = {
    ...currentCoupon,
  };

  if (updateCouponDto.code != undefined) {
    updateCoupon.code = updateCouponDto.code;
  }
  if (updateCouponDto.couponType != undefined) {
    updateCoupon.couponType = updateCouponDto.couponType;
  }
  if (updateCouponDto.description != undefined) {
    updateCoupon.description = updateCouponDto.description;
  }
  if (updateCouponDto.discountPercentage != undefined) {
    updateCoupon.discountPercentage = updateCouponDto.discountPercentage;
  }
  if (updateCouponDto.expiryDate != undefined) {
    updateCoupon.expiryDate = updateCouponDto.expiryDate;
  }
  if (updateCouponDto.minimumSpend != undefined) {
    updateCoupon.minimumSpend = updateCouponDto.minimumSpend;
  }
  if (updateCouponDto.isActive != undefined) {
    updateCoupon.isActive = updateCouponDto.isActive;
  }
  if (updateCouponDto.userId != undefined) {
    updateCoupon.userId = updateCouponDto.userId;
  }

  return updateCoupon;
}
