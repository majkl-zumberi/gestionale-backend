import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MeasureUnit } from 'src/measure-unit/entities/measure-unit.entity';
import { Repository } from 'typeorm';
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

  async create(createArticleDto: CreateArticleDto, id_measure:number) {
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
    const article = await this.articleRepository.findOne(id, {relations:['measure']});
    if(article)
      return article
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: `article not found for provided id:${id}`,
        },
        HttpStatus.FORBIDDEN,
      );
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
