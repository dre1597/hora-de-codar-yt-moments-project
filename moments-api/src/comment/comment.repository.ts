import { EntityRepository, Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const comment = this.create(createCommentDto);

    await this.save(comment);

    return comment;
  }
}
