import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';

@Module({
  controllers: [StoreController],
  providers: [StoreService],
  imports: [
    TypeOrmModule.forFeature([Store]),
  ]
})
export class StoreModule { }
