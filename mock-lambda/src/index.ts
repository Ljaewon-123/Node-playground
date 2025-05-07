import express from 'express'
import { db } from './database'
import { AccumulatedTable, EtcTable } from './types';

const app = express()
const port = 3002

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
  res.send({ message: "Hello Wolrd!" })
})

app.post('/accumulated', async(req, res) => {
  const accumulatedData = req.body as any[]
  console.log(accumulatedData, '저장확인')
  
  if(accumulatedData.length == 0) throw res.status(400).send({ message: 'accumulatedData is empty' })
  
  await db.insertInto('accumulated').values(accumulatedData).execute()
  res.send({ message: 'accumulated success' })
})

app.post('/etcDevice', async(req, res) => {
  const etcData = req.body as any[]

  await db.insertInto('etc').values(etcData).execute()
  
  res.send({ message: 'etcDevice success' })
})

app.listen(port, () => {
  console.log(`Mock app listening on port ${port}`)
})
