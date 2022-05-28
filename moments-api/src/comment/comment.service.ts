import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MomentRepository } from 'src/moment/moment.repository';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(MomentRepository)
    private momentRepository: MomentRepository,

    @InjectRepository(CommentRepository)
    private commentRepository: CommentRepository,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const moment = await this.momentRepository.findOne(
      createCommentDto.momentId,
    );

    createCommentDto.moment = moment;

    delete createCommentDto.momentId;

    return this.commentRepository.createComment(createCommentDto);
  }
}
