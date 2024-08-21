import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponse } from 'src/helper/common/interfaces';
import { SharedService } from 'src/helper/shared_service';
import { Repository } from 'typeorm';
import { AddCouponRequest } from './dtos/request.dto';
import { CouponResponse } from './dtos/response.dto';
import { Coupon, CouponCreateInput } from './entities/coupon.entity';

@Injectable()
export class CouponService extends SharedService {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>,
  ) {
    super(CouponService.name);
  }

  async getAll(userId: string): Promise<ApiResponse<CouponResponse[]>> {
    return this.handleRequest<CouponResponse[]>(async () => {
      const coupons = await this.couponRepository.find({
        where: [
          {
            isDeleted: false,
            userId: userId,
            isActive: true,
          },
          {
            isDeleted: false,
            userId: null,
            isActive: true,
          },
        ],
        order: {
          createdAt: 'DESC',
        },
      });

      if (coupons !== undefined && coupons !== null) {
        return coupons.map(
          (e) =>
            <CouponResponse>{
              id: e.id,
              code: e.code,
              couponType: e.couponType,
              description: e.description,
              discountPercentage: e.discountPercentage,
              expiryDate: e.expiryDate,
              minimumSpend: +e.minimumSpend,
              isActive: e.isActive,
              userId: e.userId,
            },
        );
      }
      return null;
    });
  }

  async getOne(
    userId: string,
    couponId: string,
  ): Promise<ApiResponse<CouponResponse>> {
    return this.handleRequest<CouponResponse>(async () => {
      const coupon = await this.couponRepository.findOne({
        where: [
          { id: couponId, isDeleted: false, userId: userId, isActive: true },
          { id: couponId, isDeleted: false, userId: null, isActive: true },
        ],
      });
      return <CouponResponse>{
        ...coupon,
        minimumSpend: +coupon.minimumSpend,
      };
    });
  }

  async addOne(dto: AddCouponRequest): Promise<ApiResponse<CouponResponse>> {
    return this.handleRequest<CouponResponse>(async () => {
      const toAddCoupon = CouponCreateInput({
        code: dto.code,
        couponType: dto.couponType,
        description: dto.description,
        discountPercentage: dto.discountPercentage,
        expiryDate: dto.expiryDate,
        minimumSpend: dto.minimumSpend.toString(),
        isActive: true,
        userId: null,
      });
      const coupon = await this.couponRepository.save(toAddCoupon);
      return <CouponResponse>{
        ...coupon,
        minimumSpend: +coupon.minimumSpend,
      };
    });
  }
}
