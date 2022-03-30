import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class SoldierMessageDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  @Length(1, 50)
  title: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  @Length(1, 1500)
  msg: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  @Length(1, 50)
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  @Length(1, 200)
  sender: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ required: true })
  @Length(1, 200)
  address: string;
}
