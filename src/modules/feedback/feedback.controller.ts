import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthenticatedRoleRequest } from 'src/core/middleware/auth-user';
import { User } from '../user/entities/user.entity';
import { CreateFeedbackDto } from './dtos/request';
import { FeedbackService } from './feedback.service';

@Controller('feedback')
export class FeedbackController {
  constructor(private feedbackService: FeedbackService) {}

  @Get()
  async getAllFeedbacks(@Res() res: any, @Req() req: AuthenticatedRoleRequest) {
    const user = req.user.user || new User();
    user.id = '342e7249-7f23-447d-8666-dcd7c10e9969';
    const result = await this.feedbackService.getAllFeedbacks(user);
    res.status(result.status).json(result.content);
  }

  @Post()
  async newFeedBackmake(
    @Res() res: any,
    @Req() req: AuthenticatedRoleRequest,
    @Body() createFeedbackDto: CreateFeedbackDto,
  ) {
    const user = req.user.user || new User();
    user.id = '342e7249-7f23-447d-8666-dcd7c10e9969';
    const result = await this.feedbackService.createNewFeedback(
      user,
      createFeedbackDto,
    );
    res.status(result.status).json(result.content);
  }

  @Delete(':id')
  async deleteFeedBack(
    @Res() res: any,
    @Req() req: AuthenticatedRoleRequest,
    @Param('id') feedbackId: string,
  ) {
    const user = req.user.user || new User();
    user.id = '342e7249-7f23-447d-8666-dcd7c10e9969';
    const result = await this.feedbackService.delete(user, feedbackId);
    res.status(result.status).json(result.content);
  }
}
