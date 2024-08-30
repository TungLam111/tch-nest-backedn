import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';

import {
  AddProductToMenuDto,
  CreateProductRequestDto,
  DeleteProductDto,
  SearchProductDto,
  UpdateProductRequestDto,
} from './dtos/request';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getProductsWithMenu(@Res() res: any) {
    const result = await this.productService.getProductsWithMenu();
    res.status(result.status).json(result.content);
  }

  @Get('search')
  async searchProductByName(
    @Res() res: any,
    @Query() searchQuery: SearchProductDto,
  ) {
    const result = await this.productService.searchProduct(searchQuery);
    res.status(result.status).json(result.content);
  }

  @Get('/:id')
  async getProduct(@Res() res: any, @Param('id') id: string) {
    const result = await this.productService.getProductDetail(id);
    res.status(result.status).json(result.content);
  }

  @Post()
  async addProduct(@Res() res: any, @Body() product: CreateProductRequestDto) {
    const result = await this.productService.addProduct(product);
    res.status(result.status).json(result.content);
  }

  @Put()
  async updateProduct(
    @Res() res: any,
    @Body() product: UpdateProductRequestDto,
  ) {
    const result = await this.productService.updateProduct(product);
    res.status(result.status).json(result.content);
  }

  @Post('add-to-menu')
  async addProductToMenu(
    @Res() res: any,
    @Body() product: AddProductToMenuDto,
  ) {
    const result = await this.productService.addProductToMenu(product);
    res.status(result.status).json(result.content);
  }

  @Delete()
  async deleteProduct(@Res() res: any, @Body() product: DeleteProductDto) {
    const result = await this.productService.deleteProduct(product);
    res.status(result.status).json(result.content);
  }
}
