import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDto {
  @ApiProperty({
    description: 'Client name',
    example: 'John',
  })
  name: string;

  @ApiProperty({
    description: 'Phone number',
    example: '+996500123456',
  })
  phone: string;

  @ApiProperty({
    description: 'Rent date',
    example: '2022-02-19T13:21:13.012Z',
  })
  startDate: Date;

  @ApiProperty({
    description: 'Return date',
    example: '2022-02-19T13:21:13.012Z',
  })
  endDate: Date;

  @ApiProperty({
    description: 'Car id',
    example: 1,
  })
  id: number;
}
