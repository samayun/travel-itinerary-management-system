import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ default: 'John Doe' })
  name: string;

  @ApiProperty({ default: 'johndoe@gmail.com' })
  email: string;

  @ApiProperty({ default: '123456' })
  password: string;
}
