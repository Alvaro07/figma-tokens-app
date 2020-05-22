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
  deletePropFiles()

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

app.post('/style-dictionary', async (req, res) => {
  const tokensFiles = fs.readdirSync(path.resolve(__dirname, './propierties')).filter(e => e.includes('.json'))
  await generateConfig(tokensFiles)
  const finalStyles = await readFiles(fs.readdirSync(path.resolve(__dirname, './src/assets/scss/tokens/')))

  res.send(finalStyles.map((e, i) => {
    return { name: tokensFiles[i].split('.')[0], code: e }
  }))
})

function deletePropFiles () {
  if (fs.existsSync(path.resolve(__dirname, './propierties'))) {
    const tokensFiles = fs.readdirSync(path.resolve(__dirname, './propierties')).filter(e => e.includes('.json'))
    tokensFiles.forEach((file, i) => {
      fs.unlinkSync(path.resolve(__dirname, `./propierties/${file}`))
    })
  }

  if (fs.existsSync(path.resolve(__dirname, './src/assets/scss/tokens'))) {
    const scssFiles = fs.readdirSync(path.resolve(__dirname, './src/assets/scss/tokens'))
    scssFiles.forEach((file, i) => {
      fs.unlinkSync(path.resolve(__dirname, `./src/assets/scss/tokens/${file}`))
    })
  }
}

function generateConfig (tokenFiles) {
  return new Promise((resolve, reject) => {
    tokenFiles.filter(e => e.includes('.json')).forEach(token => {
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
      resolve()
    })
  })
}

function readFiles (styleFiles) {
  return new Promise((resolve, reject) => {
    const styles = []
    styleFiles.forEach(fileName => {
      const filePath = path.resolve(__dirname, `./src/assets/scss/tokens/${fileName}`)

      fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) return console.log(err)

        fs.writeFile(filePath, data, 'utf8', function (err) {
          if (err) return console.log(err)
          styles.push(data.toString())
          styles.length === styleFiles.length && resolve(styles)
        })
      })
    })
  })
}

// listen on the port
app.listen(process.env.PORT || 8888)
