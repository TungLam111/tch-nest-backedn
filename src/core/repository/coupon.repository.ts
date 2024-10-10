import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coupon } from 'src/modules/coupon/entities/coupon.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CouponRepository extends Repository<Coupon> {
  constructor(
    @InjectRepository(Coupon)
    private couponRepository: Repository<Coupon>,
  ) {
    super(
      couponRepository.target,
      couponRepository.manager,
      couponRepository.queryRunner,
    );
  }

  async findPrivateCouponByUserId(userId: string): Promise<Coupon[]> {
    return this.find({
      where: {
        isDeleted: false,
        userId: userId,
      },
    });
  }

  async findOneById(id: string): Promise<Coupon | null> {
    return this.findOneBy({ id: id, isDeleted: false });
  }

  async createOne(coupon: Coupon): Promise<Coupon> {
    return await this.save(coupon);
  }

  async updateOne(coupon: Coupon): Promise<Coupon> {
    return await this.save(coupon);
  }

  async destroy(coupon: Coupon): Promise<Coupon> {
    return await this.save({
      ...coupon,
      isDeleted: true,
      deletedDate: new Date(),
    });
  }
}
