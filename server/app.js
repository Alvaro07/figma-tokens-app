// server/server.js
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const FigmaTokens = require('./src/js/figma-tokens')

app.use(bodyParser.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

// app.get('/tokens', (req, res) => {
//   console.log('get', req.body)
// })

app.post('/tokens', (req, res) => {
  res.json({ msg: 'This is CORS-enabled for all origins!' })

  const { authToken, idFile, config } = req.body
  const figmaStyles = new FigmaTokens(authToken, idFile, config)

  figmaStyles.getTokens().then(data => {
    const finalTokens = {}
    Object.entries(data.token).forEach(e => Object.assign(finalTokens, { [e[0]]: e[1] }))
    res.send(finalTokens)
  }).catch(() => {
    res.send({ type: 'error', message: 'invalid data' })
  })
})

// listen on the port
app.listen(process.env.PORT || 8000)
