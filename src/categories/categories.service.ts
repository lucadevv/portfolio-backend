import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ){}

  async create(createCategoryDto: CreateCategoryDto):Promise<Category> {
    try {
      const category = await this.categoryRepository.create(createCategoryDto)

      const saveCategory =  await this.categoryRepository.save(category)

      return saveCategory as Category;

    } catch (error) {
      this.handleExecption(error)
    }
  }

  findAll() {
    return `This action returns all categories`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }

  private handleExecption(error:any):never{
    console.log(error);
    
    if (error.code === '23505') {
      throw new BadRequestException('Project already exists');
    }
    throw new InternalServerErrorException('An unexpected error occurred');
  }
}
