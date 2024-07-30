import 'dotenv/config';
import { Basket } from 'src/modules/basket/entities/basket.entity';
import { Feedback } from 'src/modules/feedback/entities/feedback.entity';
import { TchNotification } from 'src/modules/notification/entities/notification.entity';
import { DataSourceOptions } from 'typeorm';
import { MenuProduct } from '../../../modules/menu/entities/menu-product.entity';
import { Menu } from '../../../modules/menu/entities/menu.entity';
import { OrderProduct } from '../../../modules/order/entities/order-product.entity';
import { Order } from '../../../modules/order/entities/order.entity';
import { PaymentMethod } from '../../../modules/payment-method/entities/payment-method.entity';
import { ProductTopping } from '../../../modules/product/entities/product-topping.entity';
import { Product } from '../../../modules/product/entities/product.entity';
import { Store } from '../../../modules/store/entities/store.entity';
import { ToppingOption } from '../../../modules/topping/entities/topping-option.entity';
import { Topping } from '../../../modules/topping/entities/topping.entity';
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
    TchNotification,
    Feedback,
    Basket,
  ],
  migrations: ['../../core/config/migrations/*{.ts,.js}'],
  synchronize: false,
  dropSchema: false,
  migrationsRun: false,
  logging: true,
};

export default databaseConfig;
