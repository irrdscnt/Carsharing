import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class FindOneOrderDto {
  @ApiProperty()
  @Length(24, 24)
  id: string;
}
