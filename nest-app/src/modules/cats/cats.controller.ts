import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  Header,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Redirect,
  SetMetadata,
  UseFilters,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/exception-filters/http-exception.filter';
import { RolesGuard } from 'src/guards/role.guard';
import { ClassValidatorValidationPipe } from 'src/pipes/class-validator-validation.pipe';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
@UseGuards(RolesGuard)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get('exception')
  @UseFilters(new HttpExceptionFilter())
  async getException() {
    throw new ForbiddenException();
  }

  @Post()
  //@UsePipes(new JoiValidationPipe(createCatSchema))
  @SetMetadata('roles', ['admin'])
  create(@Body(new ClassValidatorValidationPipe()) createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  findAll(): Cat[] {
    try {
      return this.catsService.findAll();
    } catch (err) {
      throw new BadRequestException('some error', { description: 'error' });
    }
  }

  @Get('/find/:id')
  @HttpCode(200)
  @Header('Cache-Control', 'none')
  getById(@Param('id', ParseIntPipe) id: number): string {
    return `This action get a cat by id ${id}`;
  }

  @Get('/goTo')
  @Redirect('https://nestjs.com', 301)
  goTo() {
    return '';
  }
}
