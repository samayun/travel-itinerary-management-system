import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignupUserInput {
  @IsNotEmpty()
  @ApiProperty({ default: 'John Doe' })
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ default: 'johndoe@gmail.com' })
  email: string;

  @ApiProperty({ default: '123456' })
  @IsNotEmpty()
  password: string;
}

export class SigninUserInput {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ default: 'johndoe@gmail.com' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ default: '123456' })
  password: string;
}

export class UpdateUserInput {
  @IsNotEmpty()
  @ApiProperty({ default: 'John Doe' })
  name: string;
}
