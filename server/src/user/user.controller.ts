import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId, Roles } from 'src/common/decorators';
import { RoleGuard } from 'src/common/guards';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  getAllUsers(@GetCurrentUserId() userId: string) {
    return this.userService.findAllUsers(userId);
  }

  @Get(':userId')
  getUserById(@Param('userId') userId: string) {
    return this.userService.findUserByID(userId);
  }

  @Get('province/:province')
  getUserByProvince(@Param('province', ParseIntPipe) province: number) {
    return this.userService.getUserByProvince(province);
  }

  @Get('district/:district')
  getUserByDistrict(@Param('district') district: string) {
    const districtLowerCase = district.toLowerCase();
    return this.userService.getUserByDistrict(districtLowerCase);
  }

  @Get('municipality/:municipality')
  getUserByMunicipality(@Param('municipality') municipality: string) {
    const municipalityLowerCase = municipality.toLowerCase();
    return this.userService.getUserByMunicipality(municipalityLowerCase);
  }

  @Get(':municipality/:ward')
  getUserByWard(
    @Param('municipality') municipality: string,
    @Param('ward') ward: string,
  ) {
    const municipalityLowerCase = municipality.toLowerCase();
    return this.userService.getUserByWard(municipalityLowerCase, ward);
  }

  @Patch(':userId/disable')
  @Roles('SUPERADMIN')
  @UseGuards(RoleGuard)
  disableUserByID(
    @Param('userId') userId: string,
    @GetCurrentUserId() myId: string,
  ) {
    return this.userService.disableUserByID(userId, myId);
  }

  @Delete(':userId')
  @Roles('SUPERADMIN')
  @UseGuards(RoleGuard)
  deleteUser(
    @Param('userId') userId: string,
    @GetCurrentUserId() myId: string,
  ) {
    return this.userService.deleteUserByID(userId, myId);
  }
}
