import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  create(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepository.save(createCategoryDto);
  }

  findAll() {
    return this.categoryRepository.find();
  }

  findOne(id: number) {
    return this.categoryRepository.findOne(id);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    if (!(await this.categoryRepository.findOne(id))) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: `measure unit found for provided id:${id}`,
        },
        HttpStatus.FORBIDDEN,
      );
    }

    await this.categoryRepository.update(id, updateCategoryDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    if (!(await this.categoryRepository.findOne(id))) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: `user not found for provided id:${id}`,
        },
        HttpStatus.FORBIDDEN,
      );
    }
    this.categoryRepository.delete(id);
  }
}
