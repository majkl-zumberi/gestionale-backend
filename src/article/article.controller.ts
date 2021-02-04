import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { FilterArticleCategory } from './dto/filter-article-category.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post(':id_measure/:id_category')
  create(@Body() createArticleDto: CreateArticleDto, @Param('id_measure') id_measure: string, @Param('id_category') id_category: string) {
    return this.articleService.create(createArticleDto, +id_measure, +id_category);
  }

  @Get()
  findAll() {
    return this.articleService.findAll();
  }

  @Get('/category')
  findByCategory(@Query() query: FilterArticleCategory) {
    return this.articleService.findByCategory(query.name);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id);
  }
}
