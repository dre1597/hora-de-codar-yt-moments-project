import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  Patch,
} from '@nestjs/common';
import { MomentService } from './moment.service';
import { CreateMomentDto } from './dto/create-moment.dto';
import { UpdateMomentDto } from './dto/update-moment.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from './moment.storage';
import { Moment } from './entities/moment.entity';

@Controller('moments')
export class MomentController {
  constructor(private readonly momentService: MomentService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', storage))
  create(
    @Body() createMomentDto: CreateMomentDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<Moment> {
    return this.momentService.create(createMomentDto, image);
  }

  @Get()
  findAll(): Promise<Moment[]> {
    return this.momentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Moment> {
    return this.momentService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image', storage))
  update(
    @Param('id') id: string,
    @Body() updateMomentDto: UpdateMomentDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<Moment> {
    return this.momentService.update(+id, updateMomentDto, image);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Moment> {
    return this.momentService.remove(+id);
  }
}
