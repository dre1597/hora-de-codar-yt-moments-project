import { Module } from '@nestjs/common';
import { MomentService } from './moment.service';
import { MomentController } from './moment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MomentRepository } from './moment.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MomentRepository])],
  controllers: [MomentController],
  providers: [MomentService],
})
export class MomentModule {}
