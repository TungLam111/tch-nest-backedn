import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';

@Module({
  controllers: [LocationController],
  providers: [LocationService],
  imports: [
    TypeOrmModule.forFeature([Location, User]),
  ]
})
export class LocationModule { }
