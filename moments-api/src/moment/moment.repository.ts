import { EntityRepository, Repository } from 'typeorm';
import { CreateMomentDto } from './dto/create-moment.dto';
import { UpdateMomentDto } from './dto/update-moment.dto';
import { Moment } from './entities/moment.entity';

@EntityRepository(Moment)
export class MomentRepository extends Repository<Moment> {
  async createMoment(
    createMomentDto: CreateMomentDto,
    image?: string,
  ): Promise<Moment> {
    let moment: Moment;
    if (image) {
      moment = this.create({ ...createMomentDto, image });
    } else {
      moment = this.create({ ...createMomentDto });
    }
    await this.save(moment);

    return moment;
  }

  async updateMoment(
    id: number,
    updateMomentDto: UpdateMomentDto,
    image: Express.Multer.File,
  ) {
    const moment = await this.findOne(id);

    moment.title = updateMomentDto.title;
    moment.description = updateMomentDto.description;

    if (image) {
      moment.image = image.path;
    }

    await this.save(moment);
    return moment;
  }
}
