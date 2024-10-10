import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedbackRepository } from 'src/core/repository/feedback.repository';
import { OrderModule } from '../order/order.module';
import { Feedback } from './entities/feedback.entity';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';

@Module({
  controllers: [FeedbackController],
  providers: [FeedbackRepository, FeedbackService],
  imports: [TypeOrmModule.forFeature([Feedback]), OrderModule],
  exports: [FeedbackRepository],
})
export class FeedbackModule {}
