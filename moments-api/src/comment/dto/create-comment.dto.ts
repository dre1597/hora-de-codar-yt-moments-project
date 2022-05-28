import { Moment } from 'src/moment/entities/moment.entity';

export class CreateCommentDto {
  username: string;
  text: string;
  momentId: number;
  moment?: Moment;
}
