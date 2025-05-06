import express from 'express';
import mqtt from "mqtt";
import cron from "node-cron";
import { db } from './database';
import { InvokeCommand } from "@aws-sdk/client-lambda";
import { ok, err } from './fallback-result'

const app = express()
const port = 3001

const client = mqtt.connect("mqtt://localhost:1883");

let cnt = 0

// 서버 재시작시 가질려면 kv에 저장해야한다. 
const timer = {
  start: null,
  end: null,
  done: false,
  reset: () => {
    timer.start = null;
    timer.end = null;
    timer.done = false;
  }
}
Object.seal(timer)


const timerProxy = new Proxy(timer, {
  set(target:any, prop, value) {
    if ((prop === 'start' || prop === 'end') && value !== null && !(value instanceof Date)) {
      throw new TypeError(`${prop}는 Date 인스턴스여야 합니다.`)
    }

    target[prop] = value

    // start와 end가 모두 Date 인스턴스일 경우에만 검사
    if (target.start instanceof Date && target.end instanceof Date) {
      target.done = target.start < target.end
    } else {
      target.done = false
    }

    return true
  }
})

client.on("connect", () => {
  console.log("🔗 MQTT 클라이언트 연결됨");
  timerProxy.end = new Date()
  client.subscribe("presence", (err) => {
    if (!err) {
      client.publish("presence", "Hello mqtt");
    }
  });
});

client.on('message', (topic, message) => {
  console.log(`📨 메시지 도착: ${topic} - ${message.toString()}`);
});

client.on('offline', () => {
  timerProxy.reset()
  timerProxy.start = new Date()
  console.log('📴 클라이언트가 오프라인 상태입니다 (offline)');
  // 받는 쪽에서 실행을 해줘야 하는데 람다가 제격이지 않나?
});

cron.schedule('* * * * * *', async () => {
  if(timerProxy.done) {
    timer.reset()
    backupCloudDatabase()
  }

  // // test를 위한 예시 동작임 
  // console.log('timescaleDB 동기화 작업 하면됨 여기서 어떤 조건?', db)
  // // 여기서 삽입을 하다가 끊기고 다시 동작 하면 backup에서 람다로 전송이 필요함 
  // insertAccumulatedData()
  // insertEtcDeviceData()
});

// 꺼내서 람다로 보냄 
const backupCloudDatabase = async () => {
  const result = await selectAllData();

  if(!result.ok) {
    console.error('failed', result.error)
    return
  }
  
  const [accumulated, etcDevice] = result.data;

  const hitQuerying = async() => {
    
  }
}

async function insertAccumulatedData() {
  await db.insertInto('accumulated')
  .values({
    plc_date: new Date(),
    today_accumulate_charge: ++cnt,
    today_accumulate_discharge: ++cnt,
    today_accumulate_energy: ++cnt,
    site_id: 0,
    device_no: 0
  })
  .executeTakeFirst()
}

async function insertEtcDeviceData() {
  await db.insertInto('etc')
  .values({
    plc_date: new Date(),
    site_id: 0,
    device_no: 0,
    etc_no: 0,
    data_type: 0,
    value: 0,
    location: 0,
    room_no: 0
  })
  .executeTakeFirst()
}

async function selectAllData() {
  try {
    const result = await Promise.all([
      db.selectFrom('accumulated')
      .selectAll()
      .where('plc_date', '>', timerProxy.start)
      .where('plc_date', '<', timerProxy.end)
      .executeTakeFirstOrThrow(),
  
      db.selectFrom('etc')
      .selectAll()
      .where('plc_date', '>', timerProxy.start)
      .where('plc_date', '<', timerProxy.end)
      .executeTakeFirstOrThrow()
    ])
    return ok(result)
  } catch (error) {
    console.error(error)
    return err(error)
  }
}


app.get('/', async (req, res) => {
  client.publish("presence", "Hello")
  res.send({ message: "Hello Wolrd!" })
})

app.get('/end', (req, res) => {
  client.end();
  res.send('Client disconnected')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})