import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { CommentRepository } from './comment.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MomentRepository } from 'src/moment/moment.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CommentRepository, MomentRepository])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
