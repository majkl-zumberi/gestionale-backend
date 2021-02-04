/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { MeasureUnit } from 'src/measure-unit/entities/measure-unit.entity';
import { Like, Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
    @InjectRepository(MeasureUnit)
    private measureRepository: Repository<MeasureUnit>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createArticleDto: CreateArticleDto, id_measure: number, id_category: number) {
    const measure = await this.measureRepository.findOne({ id: id_measure });
    const category = await this.categoryRepository.findOne({ id: id_category });
    const newArticle = await this.articleRepository.create({
      ...createArticleDto,
      createdAt: new Date(),
      measure: measure,
      category: category
    });
    await this.articleRepository.save(newArticle);
    return newArticle;
  }

  findAll() {
    return this.articleRepository.find({ relations: ['measure','category'] });
  }

  async findOne(id: number) {
    const article = await this.articleRepository.findOne(id, {
      relations: ['measure','category'],
    });
    if (article) return article;
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: `article not found for provided id:${id}`,
      },
      HttpStatus.FORBIDDEN,
    );
  }

  async findByCategory(category: string) {
    return await this.articleRepository.find({
      relations: ['category'],
      where: [
        {
          category: {
            code: Like(`%${category}%`),
          },
        },
      ],
    });
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    await this.articleRepository.update(id, updateArticleDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const removeArticle = await this.findOne(id);
    this.articleRepository.delete(removeArticle);
  }
}
