import 'dotenv/config';
import { Basket } from 'src/modules/basket/entities/basket.entity';
import { Coupon } from 'src/modules/coupon/entities/coupon.entity';
import { Feedback } from 'src/modules/feedback/entities/feedback.entity';
import { Location } from 'src/modules/location/entities/location.entity';
import { MenuProduct } from 'src/modules/menu-product/entities/menu-product.entity';
import { OrderBasket } from 'src/modules/order-basket/entities/order-basket.entity';
import { OrderRating } from 'src/modules/order-rating/entities/order-rating.entity';
import { PaymentCard } from 'src/modules/payment-card/entities/payment-card.entity';
import { ProductTopping } from 'src/modules/product-topping/entities/product-topping.entity';
import { TchNotification } from 'src/modules/tch-notification/entities/tch-notification.entity';
import { ToppingOption } from 'src/modules/topping-option/entities/topping-option.entity';
import { DataSourceOptions } from 'typeorm';
import { Menu } from '../../../modules/menu/entities/menu.entity';
import { Order } from '../../../modules/order/entities/order.entity';
import { PaymentMethod } from '../../../modules/payment-method/entities/payment-method.entity';
import { Product } from '../../../modules/product/entities/product.entity';
import { Store } from '../../../modules/store/entities/store.entity';
import { Topping } from '../../../modules/topping/entities/topping.entity';
import { User } from '../../../modules/user/entities/user.entity';
import { CreateUsersTable1723644154142 } from '../migrations/1723644154142-CreateUsersTable';

const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
  entities: [
    Menu,
    MenuProduct,
    Order,
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
    PaymentCard,
    Location,
    OrderBasket,
    Coupon,
    OrderRating,
  ],
  migrations: [CreateUsersTable1723644154142],
  synchronize: false,
  dropSchema: false,
  migrationsRun: false,
  logging: true,
};

export default databaseConfig;
