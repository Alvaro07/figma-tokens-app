/**
 * Archivo donde generaremos la instancia de la clase *FigmaTokens* para generar los diferentes
 * archivos de configuración, que usaremos para pasarle a la librería *style-dictionary* y generar los archivos de estilo.
 */

const fs = require('fs')
const rimraf = require('rimraf')
const path = require('path')
const appPath = path.resolve(process.cwd())
const FigmaTokens = require('./figma-tokens')
const configTokens = require(`${appPath}/tokens.config.js`)
const finalPath = `${appPath}/`

/**
 * A partir del archivo de configuración, le pasamos a la instancia FIgmaTokens los datos para ejecutarla.
 * Obteniendo un objeto de datos  para generar los archivos necesarios (.json) para *style-dictionary*,
 * siendo necesario fraccionarlos para obtener diferentes archivos finales, ya que cada uno tendrá configuración propia.
 */

const { authToken, idFile, idTheme, tokens } = configTokens
const figmaStyles = new FigmaTokens(authToken, idTheme || idFile, tokens)

console.info('⌛︎ Getting figma data')

fs.mkdir(`${finalPath}/propierties`, (err) => {
  if (err) throw err

  figmaStyles.getTokens().then(data => {
    Object.entries(data.token).forEach(e => {
      const tokens = { [e[0]]: e[1] }
      fs.writeFileSync(`${finalPath}/propierties/${e[0]}.json`, JSON.stringify(tokens, null, 2))
    })
    rimraf(`${appPath}/propierties`, () => {
      console.info('✔ Tokens ready ')
    })
  })
})
