import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AbstractEntity } from 'src/helper/common/common_entity';
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

  @Column()
  discountPercentage: number;

  @Column()
  expiryDate: Date;

  @Column({ nullable: true })
  minimumSpend: number;

  @Column()
  isActive: boolean;

  @Column({ nullable: true })
  userId: string;

}


export function CouponCreateInput(createCouponDto: {
        code: string, couponType: string, description: string, discountPercentage: number, expiryDate: Date, minimumSpend: number | null, isActive: boolean, userId: string | null
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

export function CouponUpdateInput(currentCoupon: Coupon, updateCouponDto: {
        code: string, couponType: string, description: string, discountPercentage: number, expiryDate: Date, minimumSpend: number | null, isActive: boolean, userId: string | null
    }): Coupon {
  return {
    ...currentCoupon,
        code: updateCouponDto.code,
    couponType: updateCouponDto.couponType,
    description: updateCouponDto.description,
    discountPercentage: updateCouponDto.discountPercentage,
    expiryDate: updateCouponDto.expiryDate,
    minimumSpend: updateCouponDto.minimumSpend,
    isActive: updateCouponDto.isActive,
    userId: updateCouponDto.userId,
  };
}

