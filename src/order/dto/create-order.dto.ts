import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Client name',
    example: 'John',
  })
  @IsNotEmpty()
  @Length(3, 20)
  name: string;

  @ApiProperty({
    description: 'Phone number',
    example: '+996500123456',
  })
  @IsNotEmpty()
  @Length(6, 15)
  phone: string;

  @ApiProperty({
    description: 'Rent date',
    example: '2022-02-22T10:30:40.000Z',
  })
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({
    description: 'Return date',
    example: '2022-02-22T10:30:40.000Z',
  })
  @IsNotEmpty()
  endDate: Date;

  @ApiProperty({
    description: 'Car id',
    example: '1',
  })
  @IsNotEmpty()
  carId: number;

  @ApiPropertyOptional({
    description: 'Brand',
    example: 'BMW',
  })
  brand?: string;

  @ApiProperty({
    description: 'Price for all rent days',
    example: '300',
  })
  totalPrice?: number;
}
