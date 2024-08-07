import { Controller, Get, Res } from '@nestjs/common';
import { ToppingService } from './topping.service';

@Controller('topping')
export class ToppingController {
    constructor(private toppingService: ToppingService) { }

    @Get()
    async getToppings(@Res() res: any) {
        const result = await this.toppingService.getAllToppings();
        res.status(result.status).json(result.content);
    }
}
