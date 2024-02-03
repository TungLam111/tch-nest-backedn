import { Module } from '@nestjs/common';
import { CommonResourceController } from './common-resource.controller';
import { CommonResourceService } from './common-resource.service';

@Module({
  controllers: [CommonResourceController],
  providers: [CommonResourceService]
})
export class CommonResourceModule {}
