import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) { }

    @Get()
    async getProductsWithMenu(@Res() res: any) {
        const result = await this.productService.getProductsWithMenu();
        res.status(result.status).json(result.content);
    }

    @Post()
    async addProduct(@Res() res: any, @Body() product: CreateProductDto) {
        const result = await this.productService.addProduct(product)
        res.status(result.status).json(result.content);
    }
}
