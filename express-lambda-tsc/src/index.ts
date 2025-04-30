import express from 'express';

const app = express()
const port = 3001


app.get('/', async (req, res) => {
  res.send('Hello World!')
})

app.get('/end', (req, res) => {
  res.send('Client disconnected')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})