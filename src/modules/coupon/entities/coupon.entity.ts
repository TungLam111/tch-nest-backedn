import { AbstractEntity } from 'src/helper/common/common_entity';
import { Column, Entity, PrimaryGeneratedColumn,
 ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';

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
  minimumSpend: number;

  @Column()
  isActive: boolean;

  @Column({ nullable: true })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id'})
  user: User;

}


export function CouponCreateInput(createCouponDto: {
        code: string, couponType: string, description: string, discountPercentage: number | null, expiryDate: Date, minimumSpend: number | null, isActive: boolean, userId: string | null
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
        code: string, couponType: string, description: string, discountPercentage: number | null, expiryDate: Date, minimumSpend: number | null, isActive: boolean, userId: string | null
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

