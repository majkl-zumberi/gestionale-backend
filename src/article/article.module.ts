import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { MeasureUnit } from 'src/measure-unit/entities/measure-unit.entity';
import { Category } from 'src/category/entities/category.entity';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService],
  imports: [TypeOrmModule.forFeature([MeasureUnit, Article, Category])]
})
export class ArticleModule {}
