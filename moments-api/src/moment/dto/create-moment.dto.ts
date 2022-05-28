import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMomentDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
