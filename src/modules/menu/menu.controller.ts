import { Body, Controller, Delete, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { CreateMenuDto } from './dtos/create-menu.dto';
import { UpdateMenuDto } from './dtos/update-menu.dto';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
    constructor(private menuService: MenuService) { }

    @Get()
    async getAllMenus(@Res() res: any) {
        const result = await this.menuService.getMenus();
        res.status(result.status).json(result.content);
    }

    @Get('/:id')
    async getOneMenu(@Res() res: any, @Param('id') menuId: string) {
        const result = await this.menuService.getOneMenu(menuId);
        res.status(result.status).json(result.content);
    }

    @Post()
    async createMenu(@Res() res: any, @Body() createMenuDto: CreateMenuDto) {
        const result = await this.menuService.createMenu(createMenuDto);
        res.status(result.status).json(result.content);
    }

    @Patch()
    async updateMenu(@Res() res: any, @Body() menuDto: UpdateMenuDto) {
        const result = await this.menuService.updateMenu(menuDto);
        res.status(result.status).json(result.content);
    }

    @Delete('/:id')
    async deleteMenu(@Res() res: any, @Param('id') menuId: string) {
        const result = await this.menuService.delete(menuId);
        res.status(result.status).json(result.content);
    }
}



// import { CreatePaymentCardDto } from 'src/modules/payment-card/dtos/create-payment-card.dto';
// import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// import { AbstractEntity } from '../../../helper/common/common_entity';

// @Entity()
// export class PaymentCard extends AbstractEntity {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column()
//   userId: string;

//   @Column()
//   cardHolderName: string;

//   @Column()
//   cardNumber: string;

//   @Column()
//   cardType: string;

//   @Column()
//   expirationDate: Date;

//   @Column()
//   startDate: Date;

//   @Column()
//   issueNumber?: string;

//   @Column()
//   billingAddressID?: string;
// }

// export function paymentCardCreateInput(
//   createPaymentCardDto: CreatePaymentCardDto,
// ): PaymentCard {
//   const createDto: PaymentCard = new PaymentCard();
//   createDto.userId = createPaymentCardDto.userId;
//   createDto.cardHolderName = createPaymentCardDto.cardHolderName;
//   createDto.cardNumber = createPaymentCardDto.cardNumber;
//   createDto.cardType = createPaymentCardDto.cardType;
//   createDto.expirationDate = createPaymentCardDto.expirationDate;
//   createDto.startDate = createPaymentCardDto.startDate;
//   return createDto;
// }

// export function paymentCardUpdateInput(
//   paymentCard: PaymentCard,
//   createPaymentCardDto: CreatePaymentCardDto,
// ): PaymentCard {
//   const updatePaymentCard: PaymentCard = paymentCard;
//   return {
//     ...updatePaymentCard,
//     cardHolderName: createPaymentCardDto.cardHolderName,
//     cardNumber: createPaymentCardDto.cardNumber,
//     cardType: createPaymentCardDto.cardType,
//     expirationDate: createPaymentCardDto.expirationDate,
//     startDate: createPaymentCardDto.startDate,
//   };
// }
