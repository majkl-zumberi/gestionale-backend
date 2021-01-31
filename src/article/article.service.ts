import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
  ) {}

  async create(createArticleDto: CreateArticleDto, id_measure: number) {
    const measure = await this.measureRepository.findOne({ id: id_measure });
    const newArticle = await this.articleRepository.create({
      ...createArticleDto,
      measure: measure,
    });
    await this.articleRepository.save(newArticle);
    return newArticle;
  }

  findAll() {
    return this.articleRepository.find({ relations: ['measure'] });
  }

  async findOne(id: number) {
    const article = await this.articleRepository.findOne(id, {
      relations: ['measure'],
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
      category: Like(`%${category}%`),
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
