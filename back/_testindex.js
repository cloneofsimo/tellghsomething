const dotenv = require('dotenv');
const thecamp = require('the-camp-lib');

(async () => {
  dotenv.config();

  const id = process.env.USER_ID || '';
  const password = process.env.USER_PWD || '';

  const name = process.env.TRAINEE_NAME || '';
  const birth = process.env.TRAINEE_BIRTH || '';
  const enterDate = process.env.ENTER_DATE || '';
  const className = process.env.CLASS_NAME || '';
  const groupName = process.env.GROUP_NAME || '';
  const unitName = process.env.UNIT_NAME || '';
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

  const cookies = await thecamp.login(id, password);

  //   const [trainee] = await thecamp.fetchSoldiers(cookies, soldier);

  soldier.setTraineeMgrSeq(traineeMgrSeq);

  const message = new thecamp.Message(
    '반갑다. 류시모다.',
    '잘 지내냐? ㅋㅋㅋㅋ 잘 못 지낼거라 생각한다. 재미있는 문제만 던지겠다. 종종 인편 보낼 것이니 그렇게 알도록.(R 은 실수) A 는 R^d 의 유한한 부분집합이고 크기가 n임. A 의 모든 서로 다른 3 점을 잡으면 어떤 2개의 점이 1만큼 떨어져있음. 그리고 모든 점 v 에 대해 v 의 크기는 sqrt(0.5 - 1/2n) 과 sqrt(0.5 + 1/2n) 사이임. n <= 2d + 4 임을 보여봐.',
    soldier,
  );

  await thecamp.sendMessage(cookies, soldier, message);
})();
