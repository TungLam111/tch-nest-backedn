import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CouponType } from 'src/helper/common/enum';
import { FunctionError } from 'src/helper/common/error_app';
import { ApiResponse } from 'src/helper/common/interfaces';
import { SharedService } from 'src/helper/shared_service';
import { IsNull, Repository } from 'typeorm';
import { BasketService } from '../basket/basket.service';
import { CheckUsageCouponRequest } from './dtos/request.dto';
import { CheckUsageCouponResponse } from './dtos/response.dto';
import { Coupon } from './entities/coupon.entity';

@Injectable()
export class CouponService extends SharedService {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>,
    private readonly basketService: BasketService,
  ) {
    super(CouponService.name);
  }

  async getAll(userId: string): Promise<ApiResponse<Coupon[]>> {
    return this.handleRequest<Coupon[]>(async () => {
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
        return coupons;
      }
      return null;
    });
  }

  async getOne(userId: string, couponId: string): Promise<ApiResponse<Coupon>> {
    return this.handleRequest<Coupon>(async () => {
      const coupon = await this.couponRepository.findOne({
        where: [
          { id: couponId, isDeleted: false, userId: userId, isActive: true },
          { id: couponId, isDeleted: false, userId: null, isActive: true },
        ],
      });
      return coupon;
    });
  }

  async checkCoupon(
    userId: string,
    couponId: string,
    dto: CheckUsageCouponRequest,
  ): Promise<ApiResponse<CheckUsageCouponResponse>> {
    return this.handleRequest<CheckUsageCouponResponse>(async () => {
      const coupon = await this.couponRepository.findOne({
        where: [
          {
            isDeleted: false,
            id: couponId,
            isActive: true,
            userId: userId,
          },
          {
            isDeleted: false,
            id: couponId,
            isActive: true,
            userId: IsNull(),
          },
        ],
      });

      if (!coupon)
        throw new FunctionError(HttpStatus.BAD_REQUEST, 'Coupon not found');

      if (coupon.expiryDate < new Date()) {
        return {
          isValid: false,
          message: 'Coupon expired',
        };
      }

      const basketListInfo =
        await this.basketService.getAllRecentBaskets(userId);

      let totalPriceAfterCoupon =
        basketListInfo.foodPrice + (dto.amountDelivery ?? 0);
      let amountCoupon = 0;

      if (!basketListInfo || basketListInfo.results.length === 0)
        throw new FunctionError(HttpStatus.BAD_REQUEST, 'Basket list is empty');

      if (coupon.couponType === CouponType[CouponType.discount]) {
        if (coupon.minimumSpend && coupon.discountPercentage) {
          if (basketListInfo.foodPrice >= coupon.minimumSpend) {
            amountCoupon =
              (basketListInfo.foodPrice * coupon.discountPercentage) / 100;
            totalPriceAfterCoupon = totalPriceAfterCoupon - amountCoupon;
          } else {
            return {
              isValid: false,
              message: 'Total food price is not enough to use coupon',
            };
          }
        } else {
          throw new FunctionError(
            HttpStatus.INTERNAL_SERVER_ERROR,
            'Something wrong. We are checking',
          );
        }
      } else {
        totalPriceAfterCoupon = totalPriceAfterCoupon - dto.amountDelivery;
        amountCoupon = dto.amountDelivery;
      }
      return {
        isValid: true,
        message: 'Free delivery ok',
        amountDiscount: amountCoupon,
        amountTotal: totalPriceAfterCoupon,
      };
    });
  }
}
