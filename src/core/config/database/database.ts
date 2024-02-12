import 'dotenv/config';
import { DataSourceOptions } from 'typeorm';
import { MenuProduct } from '../../../modules/menu/entities/menu-product.entity';
import { Menu } from '../../../modules/menu/entities/menu.entity';
import { OrderProduct } from '../../../modules/order/entities/order-product.entity';
import { Order } from '../../../modules/order/entities/order.entity';
import { PaymentMethod } from '../../../modules/payment-method/entities/payment-method.entity';
import { ProductTopping } from '../../../modules/product/entities/product-topping.entity';
import { Product } from '../../../modules/product/entities/product.entity';
import { ToppingOption } from '../../../modules/product/entities/topping-option.entity';
import { Topping } from '../../../modules/product/entities/topping.entity';
import { Store } from '../../../modules/store/entities/store.entity';
import { User } from '../../../modules/user/entities/user.entity';

const databaseConfig: DataSourceOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: +process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    entities: [
        Menu,
        MenuProduct,
        Order,
        OrderProduct,
        PaymentMethod,
        Product,
        ProductTopping,
        Store,
        Topping,
        ToppingOption,
        User,
    ],
    migrations: [
        '../../core/config/migrations/*{.ts,.js}'
    ],
    synchronize: false,
    dropSchema: false,
    migrationsRun: false,
    logging: true,
};

export default databaseConfig;