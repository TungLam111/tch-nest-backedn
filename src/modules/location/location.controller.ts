import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { AuthenticatedRoleRequest } from 'src/core/middleware/auth-user';
import { CreateLocationDto } from './dtos/create-location.dto';
import { UpdateLocationDto } from './dtos/update-location.dto';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
  constructor(private locationService: LocationService) {}

  // Get all locations by user
  @Get()
  async getLocationsByUser(
    @Res() res: any,
    @Req() req: AuthenticatedRoleRequest,
  ) {
    const result = await this.locationService.getLocationsByUser(req.user.user);
    res.status(result.status).json(result.content);
  }

  // Create location by user
  @Post()
  async addLocation(
    @Res() res: any,
    @Req() req: AuthenticatedRoleRequest,
    @Body() createLocationDto: CreateLocationDto,
  ) {
    const result = await this.locationService.addLocation(
      req.user.user,
      createLocationDto,
    );
    res.status(result.status).json(result.content);
  }

  // Delete location by user
  @Delete(':id')
  async deleteLocation(
    @Res() res: any,
    @Req() req: AuthenticatedRoleRequest,
    @Param('id') id: string,
  ) {
    const result = await this.locationService.deleteLocation(req.user.user, id);
    res.status(result.status).json(result.content);
  }

  // Update location by user
  @Put()
  async updateLocation(
    @Res() res: any,
    @Req() req: AuthenticatedRoleRequest,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    const result = await this.locationService.updateLocation(
      req.user.user,
      updateLocationDto,
    );
    res.status(result.status).json(result.content);
  }

  // Update location by user
  @Get(':id')
  async getLocation(
    @Res() res: any,
    @Req() req: AuthenticatedRoleRequest,
    @Param('id') id: string,
  ) {
    const result = await this.locationService.getLocation(req.user.user, id);
    res.status(result.status).json(result.content);
  }
}
