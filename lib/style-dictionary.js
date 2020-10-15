const fs = require('fs')
const path = require('path')
const appPath = path.resolve(process.cwd())
const configTokens = require(`${appPath}/tokens.config.js`)
const _ = require('lodash')
const finalPath = `${appPath}/`

/**
 * Recorremos el objeto de configuración con los diferentes tokens.
 * Pasamos la configuración a *style-dictionary* para generar los archivos de estilo.
 */

console.info('⌛︎ Creating scss tokens...')

configTokens.tokens.forEach(token => {
  /**
   * Creamos la configuración de transformación del valor final.
   * El formato kebabCase siempre sera obligatorio
   * Tanto la transformación de pixeles a rem, como que una variable scss sea *!default*, será opcional
   */

  const transformsConfig = [
    'name/cti/kebab',
    token.transform || null,
    token.default && 'defaultProp'
  ].filter(e => e !== null)

  const isMobile = token.mobile && {
    transforms: ['toLowerCamelCase'],
    buildPath: `${finalPath}/xml/`,
    files: [{
      destination: `_${token.name}.xml`,
      format: 'android/xml'
    }]
  }

  const StyleDictionary = require('style-dictionary')
    .registerFilter({
      name: 'ignore-null',
      matcher: function (prop) {
        return !prop.value.includes('null')
      }
    })
    .extend({
      source: [`${finalPath}/propierties/${token.name}.json`],
      platforms: {
        scss: {
          buildPath: `${finalPath}/styles/`,
          transforms: transformsConfig,
          files: [{
            destination: `_${token.name}.scss`,
            format: token.format,
            filter: 'ignore-null'
          }]
        },
        android: {
          ...isMobile
        }
      }
    })

  StyleDictionary.registerTransform({
    name: 'defaultProp',
    type: 'value',
    transformer: function (prop) {
      return `${prop.value}!default`
    }
  })

  StyleDictionary.registerTransform({
    name: 'px/rem',
    type: 'value',
    transformer: function (prop) {
      return (typeof prop.value === 'string' && prop.value.includes('px'))
        ? `rem(${prop.value.replace('px', '')})`
        : `${prop.value}`
    }
  })

  StyleDictionary.registerTransform({
    name: 'toLowerCamelCase',
    type: 'name',
    transformer: function (prop) {
      return prop.path.join('-').replace(/-./g, x => x.toUpperCase()[1])
    }
  })

  StyleDictionary.registerFormat({
    name: 'android/xml',
    formatter: _.template(fs.readFileSync(`${appPath}/templates/android-xml.template`))
  })

  !isMobile
    ? StyleDictionary.buildPlatform('scss')
    : StyleDictionary.buildAllPlatforms()
})

/**
 * Generamos el index.scss que importará todos los archivos de tokens necesarios,
 * Exportamos los archivos finales (scss o css).
 **/

const tokensScssFile = `
@import "../utils/functions";
${configTokens.tokens.map(token => `@import './${token.name}';`).join('\n')}`

fs.writeFileSync(`${finalPath}/styles/index.scss`, tokensScssFile)

console.info('✔︎ Styles ready')
