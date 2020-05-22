const fs = require('fs')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const FigmaTokens = require('./src/js/figma-tokens')

app.use(bodyParser.json())
app.use(cors())

app.post('/tokens', (req, res) => {
  const { authToken, idFile, config } = req.body
  const figmaStyles = new FigmaTokens(authToken, idFile, config)
  figmaStyles.getTokens().then(data => {
    const finalTokens = {}
    Object.entries(data.token).forEach(e => {
      Object.assign(finalTokens, { [e[0]]: e[1] })
      const tokens = { [e[0]]: e[1] }
      fs.writeFileSync(path.resolve(__dirname, `propierties/${e[0]}.json`), JSON.stringify(tokens, null, 2))
    })

    res.send(finalTokens)
  }).catch(() => {
    res.send({ type: 'error', message: 'invalid data' })
  })
})

app.post('/style-dictionary', (req, res) => {
  const tokensPropierties = fs.readdirSync(path.resolve(__dirname, './propierties'))
  const tokensFiles = tokensPropierties.filter(e => e.includes('.json'))


  return new Promise ((resolve) => {
    tokensFiles.filter(e => e.includes('.json')).forEach(token => {
      const fileName = token.split('.')[0]
      const StyleDictionary = require('style-dictionary').extend({
        source: [`propierties/${fileName}.json`],
        platforms: {
          scss: {
            transformGroup: 'scss',
            buildPath: 'src/assets/scss/tokens/',
            transforms: ['name/cti/kebab', 'px/rem'],
            files: [{
              destination: `_${fileName}.scss`,
              format: token.includes('color') ? 'css/variables' : 'scss/variables',
              // format: 'scss/variables',
              mapName: 'my-tokens'
            }]
          }
        }
      })
      StyleDictionary.registerTransform({
        name: 'px/rem',
        type: 'value',
        matcher: function (prop) {
          return prop.type === 'spacer'
        },
        transformer: function (prop) {
          return `rem(${prop.original.value})`
        }
      })
      StyleDictionary.buildAllPlatforms()
    })
    resolve()
  }).then(() => {
    const styleFiles = fs.readdirSync(path.resolve(__dirname, './src/assets/scss/tokens/'))

    const styles = []
    styleFiles.forEach(fileName => {
      const filePath = path.resolve(__dirname, `./src/assets/scss/tokens/_color.scss`)

      fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) return console.log(err)

        fs.writeFile(filePath, data, 'utf8', function (err) {
          if (err) return console.log(err)
          res.send(data.toString())
        })
        
      })
    })
  })

  // const filePath = path.resolve(__dirname, 'src/assets/scss/tokens/_color.scss')
  // console.log(filePath)
  // fs.readFile(filePath, 'utf8', function (err, data) {
  //   if (err) return console.log(err)
  //   res.send(data.toString())
  // })
})

// listen on the port
app.listen(process.env.PORT || 8888)
