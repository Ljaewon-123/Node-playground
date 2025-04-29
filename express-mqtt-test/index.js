const express = require('express')
const app = express()
const port = 3001

const mqtt = require("mqtt");
const client = mqtt.connect("mqtt://localhost:1883");
const cron = require("node-cron");

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
  set(target, prop, value) {
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
  timerProxy.start = new Date()
  console.log('📴 클라이언트가 오프라인 상태입니다 (offline)');
});

cron.schedule('* * * * * *', async () => {
  if(timerProxy.done) {
    await backupCloudDatabase()
  }
  console.log('timescaleDB 동기화 작업 하면됨 여기서 어떤 조건?')
});

const backupCloudDatabase = async () => {
  timer.reset()
}

app.get('/', (req, res) => {
  client.publish("presence", "Hello")
  res.send('Hello World!')
})

app.get('/end', (req, res) => {
  client.end();
  res.send('Client disconnected')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
