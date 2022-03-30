import { Injectable } from '@nestjs/common';

import * as dotenv from 'dotenv';
import * as thecamp from 'the-camp-lib';

@Injectable()
export class AppService {
  async sendmessage(
    title: string,
    msg: string,
    password: string,
    address: string,
    sender: string,
  ): Promise<string> {
    dotenv.config();

    const id = process.env.USER_ID || '';
    const lpw = process.env.USER_PWD || '';
    const checkpw = process.env.CHECK_PWD || '';

    if (checkpw !== password) {
      return '비밀번호가 틀렸어요!';
    }

    const name = process.env.TRAINEE_NAME || '';
    const birth = process.env.TRAINEE_BIRTH || '';
    const enterDate = process.env.ENTER_DATE || '';
    const className = process.env.CLASS_NAME as thecamp.SoldierClassName;
    const groupName = process.env.GROUP_NAME as thecamp.SoldierGroupName;
    const unitName = process.env.UNIT_NAME as thecamp.SoldierUnitName;
    const traineeMgrSeq = process.env.TRAINEE_MGR_SEQ || '';

    const soldier = new thecamp.Soldier(
      name,
      birth,
      enterDate,
      className,
      groupName,
      unitName,
      thecamp.SoldierRelationship.FRIEND,
    );

    const cookies = await thecamp.login(id, lpw);

    soldier.setTraineeMgrSeq(traineeMgrSeq);
    const senderInfo = `\n      <자동생성 : ${sender}님이 보낸 메시지입니다.>`;
    const addressInfo = `\n      <자동생성 : ${address}으로 답변 주시면 됩니다.>`;

    const message = new thecamp.Message(
      title,
      msg + senderInfo + addressInfo,
      soldier,
    );

    await thecamp.sendMessage(cookies, soldier, message);

    return '메시지를 보냈어요!';
  }
}
