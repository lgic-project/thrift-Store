import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { GetCurrentUserId, Public } from 'src/common/decorators';
import { CategoryDto } from './dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  create(@GetCurrentUserId() userId: string, @Body() dto: CategoryDto) {
    return this.categoryService.create(userId, dto);
  }

  @Public()
  @Get()
  fetchAll() {
    return this.categoryService.fetchAll();
  }
}
