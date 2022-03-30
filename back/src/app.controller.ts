import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { SoldierMessageDto } from './dto/soldier-msg.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/sendmsg')
  @UsePipes(ValidationPipe)
  getHello(@Body() soldierMsg: SoldierMessageDto): Promise<string> {
    return this.appService.sendmessage(
      soldierMsg.title,
      soldierMsg.msg,
      soldierMsg.password,
      soldierMsg.address,
      soldierMsg.sender,
    );
  }
}
