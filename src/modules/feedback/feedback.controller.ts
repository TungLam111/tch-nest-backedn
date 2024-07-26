import { Body, Controller, Delete, Get, Param, Post, Req, Res } from '@nestjs/common';
import { AuthenticatedRequest } from 'src/helper/common/interfaces';
import { User } from '../user/entities/user.entity';
import { CreateFeedbackDto } from './dtos/create-feedback.dto';
import { FeedbackService } from './feedback.service';

@Controller('feedback')
export class FeedbackController {
    constructor(private feedbackService: FeedbackService) { }

    @Get()
    async getAllFeedbacks(@Res() res: any, @Req() req: AuthenticatedRequest) {
        const user = req.user || new User();
        user.id = '342e7249-7f23-447d-8666-dcd7c10e9969'
        const result = await this.feedbackService.getAllFeedbacks(user);
        res.status(result.status).json(result.content);
    }

    @Post()
    async newFeedBack(@Res() res: any, @Req() req: AuthenticatedRequest, @Body() createFeedbackDto: CreateFeedbackDto) {
        const user = req.user || new User();
        user.id = '342e7249-7f23-447d-8666-dcd7c10e9969'
        const result = await this.feedbackService.createNewFeedback(user, createFeedbackDto);
        res.status(result.status).json(result.content);
    }


    @Delete(':id')
    async deleteFeedBack(@Res() res: any, @Req() req: AuthenticatedRequest, @Param('id') feedbackId: string) {
        const user = req.user || new User();
        user.id = '342e7249-7f23-447d-8666-dcd7c10e9969'
        const result = await this.feedbackService.delete(user, feedbackId);
        res.status(result.status).json(result.content);
    }
}
