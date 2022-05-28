import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMomentDto } from './dto/create-moment.dto';
import { UpdateMomentDto } from './dto/update-moment.dto';
import { Moment } from './entities/moment.entity';
import { MomentRepository } from './moment.repository';

@Injectable()
export class MomentService {
  constructor(
    @InjectRepository(MomentRepository)
    private momentRepository: MomentRepository,
  ) {}

  create(
    createMomentDto: CreateMomentDto,
    image: Express.Multer.File,
  ): Promise<Moment> {
    if (image) {
      return this.momentRepository.createMoment(
        createMomentDto,
        image.filename,
      );
    }
    return this.momentRepository.createMoment(createMomentDto);
  }

  findAll(): Promise<Moment[]> {
    return this.momentRepository.find({
      relations: ['comments'],
    });
  }

  findOne(id: number): Promise<Moment> {
    return this.momentRepository.findOne({
      where: {
        id,
      },
      relations: ['comments'],
    });
  }

  async update(
    id: number,
    updateMomentDto: UpdateMomentDto,
    image: Express.Multer.File,
  ): Promise<Moment> {
    return this.momentRepository.updateMoment(id, updateMomentDto, image);
  }

  async remove(id: number): Promise<Moment> {
    const momentToDelete = await this.findOne(id);
    return this.momentRepository.remove(momentToDelete);
  }
}
