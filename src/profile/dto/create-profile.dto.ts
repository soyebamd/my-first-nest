import { IsString, Islength } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @Islength(3, 100)
  name!: string;

  @IsString()
  description!: string;
}
