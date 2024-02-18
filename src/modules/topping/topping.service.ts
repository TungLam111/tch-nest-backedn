import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiResponse, ResponseData } from 'src/helper/common/interfaces';
import { Repository } from 'typeorm';
import { AddToppingOptionDto } from './dtos/add-topping-option.dto';
import { ToppingOption } from './entities/topping-option.entity';
import { Topping } from './entities/topping.entity';

@Injectable()
export class ToppingService {
    constructor(
        @InjectRepository(Topping) private toppingRepository: Repository<Topping>,
        @InjectRepository(ToppingOption) private toppingOptionRepository: Repository<ToppingOption>,
    ) { }
    private logger = new Logger(ToppingService.name);

    async getAllToppings(): Promise<ApiResponse> {
        const responseData = new ResponseData();
        try {
            const queryBuilder = this.toppingOptionRepository
                .createQueryBuilder('topping_option')
                .leftJoinAndSelect('topping_option.topping', 'topping')
                .select([
                    'topping.id as id',
                    'topping.name as name',
                    'topping."toppingType" as "toppingType"',
                    'topping."description" as "description"',
                    'topping."isRequired" as "isRequired"',
                    'topping."maxSelect" as "maxSelect"',
                    'topping."minSelect" as "minSelect"',
                    'topping_option.id as topping_option_id',
                    'topping_option.name as topping_option_name',
                    'topping_option.price as topping_option_price'
                ])

            const toppingsWithOptions = await queryBuilder.getRawMany()

            // Group the results by toppingId
            const groupedToppings = toppingsWithOptions.reduce((acc, curr) => {
                const { id, name, toppingType, description, isRequired, maxSelect, minSelect, topping_option_id, topping_option_name, topping_option_price } = curr;

                if (!acc[id]) {
                    acc[id] = {
                        id: id,
                        name: name,
                        toppingType: toppingType,
                        description: description,
                        isRequired: isRequired,
                        maxSelect: maxSelect,
                        minSelect: minSelect,
                        options: []
                    };
                }
                acc[id].options.push({
                    id: topping_option_id,
                    name: topping_option_name,
                    price: topping_option_price,
                });
                return acc;
            }, {});

            const toppingsWithGroupedOptions = Object.values(groupedToppings);
            responseData.appData = toppingsWithGroupedOptions
            responseData.hasError = false
            return {
                status: HttpStatus.OK,
                content: responseData
            }

        } catch (e) {
            this.logger.error(e)
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                content: null
            }
        }
    }

    async addToppingOption(dto: AddToppingOptionDto): Promise<ApiResponse> {
        const responseData = new ResponseData();
        try {
            const topping = await this.toppingRepository.findOne({
                where: {
                    isDeleted: false,
                    id: dto.toppingId,
                }
            })

            if (!topping) {
                responseData.message = 'Topping not found'
                return {
                    status: HttpStatus.BAD_REQUEST,
                    content: responseData
                }
            }

            const result = await this.toppingOptionRepository.save({
                toppingId: dto.toppingId,
                price: dto.toppingOptionPrice,
                name: dto.toppingOptionName,
            })

            if (!result) {
                responseData.message = 'Can not add new topping option'
                return {
                    status: HttpStatus.BAD_REQUEST,
                    content: responseData
                }
            }

            responseData.appData = result
            responseData.hasError = false
            return {
                status: HttpStatus.CREATED,
                content: responseData
            }

        } catch (e) {
            this.logger.error(e)
            return {
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                content: null
            }
        }
    }
}
