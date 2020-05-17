// server/server.js
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 8000
const FigmaTokens = require('./src/js/figma-tokens')

app.use(bodyParser.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.get('/tokens', (req, res) => {
  console.log('get', req.body)
})

app.post('/tokens', (req, res) => {
  const figmaStyles = new FigmaTokens(req.body.authToken, req.body.idFile)
  const finalTokens = {}
  figmaStyles.getTokens().then(data => {
    Object.entries(data.token).forEach(e => {
      Object.assign(finalTokens, { [e[0]]: e[1] })
    })
    res.send(finalTokens)
  }).catch(() => {
    res.send({ type: 'error', message: 'invalid data' })
  })
})

// listen on the port
app.listen(port)