import { Module } from '@nestjs/common';
import { TchNotificationController } from './tch-notification.controller';
import { TchNotificationService } from './tch-notification.service';

@Module({
  controllers: [TchNotificationController],
  providers: [TchNotificationService]
})
export class TchNotificationModule {}
