const rgb = require('./color-converter')
const fetch = require('node-fetch')

/**
 * Obten los tokens de diseño desde Figma
 *
 * @class
 * @name FigmaTokens
 * @classdesc Clase para obtener los tokens de diseño desde Figma mediante un una configuración específica.
 *
 * @param {string} apiToken El token de autenticación que proporciona Figma a cada usuario
 * @param {string} idFile El identificador único de cada archivo de Figma
 */

class FigmaTokens {
  constructor (apiToken, idFile, config) {
    this.apiToken = apiToken
    this.idFile = idFile
    this.config = config
    this.tokens = {}
    this.figmaTree = {}
  }

  /**
   * Obtenemos el arbol de datos total de Figma, accediendo mediante su API y pasandolé tanto
   * el *authToken* del usuario como el identificador único (idFile) del archivo de Figma.
   *
   * @async
   * @return {Promise<Object>} Devolvemos los datos totales que nos proporciona Figma.
   */

  async initFigmaObjTree () {
    const result = await fetch(`https://api.figma.com/v1/files/${this.idFile}`, {
      method: 'GET',
      headers: {
        'X-Figma-Token': this.apiToken
      }
    })
    const figmaTreeStructure = await result.json()
    return figmaTreeStructure
  }

  /**
   * Función que exponemos a la instancia de la clase para obtener los tokens.
   * Accedemos al árbol total que nos proporciona Figma, obtenemos los hijos directos del documento (datos de los tokens)
   * Inicializamos con la función `initialize`, que construirá los datos finales a devolver.
   *
   * @function
   * @return {Promise<Object>} Devolvemos en una promesa el objeto final de los tokens obtenidos.
   */

  getTokens () {
    return new Promise((resolve, reject) => {
      this.initFigmaObjTree().then(data => {
        this.figmaTree = data.document.children[0].children
        this.initialize(data)
        resolve({ token: this.tokens })
      }).catch(error => reject(error))
    })
  }

  /**
   * Función que inicia la generación de los tokens según su configuración.
   * Según el tipo de token requerido, se ejecuta la funcion genérica `setToken` asociada al nombre del Token
   * y su función generadora, que dependerá del *tipo de token* que asociemos en el archivo de configuración.
   *
   * @function
   */

  initialize () {
    this.config.forEach(token => {
      switch (token.type) {
        case 'color':
          this.setToken(token.name, this.createColor)
          break

        case 'typography':
          this.setToken(token.name, this.createFont)
          break

        case 'text':
          this.setToken(token.name, this.createText)
          break

        case 'space':
          this.setToken(token.name, this.createSpace)
          break

        case 'breakpoint':
          this.setToken(token.name, this.createBreakpoint)
          break

        case 'radius':
          this.setToken(token.name, this.createRadius)
          break

        case 'opacity':
          this.setToken(token.name, this.createOpacity)
          break

        case 'border':
          this.setToken(token.name, this.createBorder)
          break

        case 'shadow':
          this.setToken(token.name, this.createShadow)
          break

        default:
          break
      }
    })
  }

  /**
   * A partir del nombre del token, accede al objeto global de Figma, busca y aísla los
   * datos totales de cada token individualmente para luego procesarlos.
   * Si no encuentra dicho token ya que el nombre no es correcto, devuelve `null`
   *
   * @function
   * @param {String} name The Token's group name
   * @return {Object} The token's group data object
   */

  getDataToken (name) {
    return this.figmaTree.filter(item => item.name === name).length
      ? this.figmaTree.filter(item => item.name === name)[0].children
      : null
  }

  /**
   * Función genérica que asigna a la variable global *tokens* el objeto final de cada token.
   * En la función inicializadora, hemos invocado dicha función por cada tipo de token, asociando tanto el nombre como dicha función.
   * Si el primer hijo del objeto global es un *FRAME* quiere decir que es un grupo, por lo que invoca a la
   * función `createTokenGroup` para seguir introduciéndose en sus datos hasta obtener el token final.
   *
   * @param {String} tokenType - Tipo de token
   * @param {Function} createToken - Función generadora que crea el token final
   * @function
   */

  setToken (tokenType, createToken) {
    const tokens = {}

    this.getDataToken(tokenType).forEach(item => {
      item.type !== 'FRAME'
        ? Object.assign(tokens, createToken(item, this))
        : Object.assign(tokens, this.createTokenGroup(item, createToken))
    })

    Object.assign(this.tokens, { [tokenType]: tokens })
  }

  /**
   * Al haber detectado un grupo en la función *setToken*, volvemos a acceder a sus hijos
   * para comprobar si detecta más grupos, si es así, al ser una función recursiva repite el
   * procedimiento llamándose a ella misma repitiendo el proceso hasta obtener un token final.
   *
   * Una vez obtenido el token final lo asigna a la variable general *tokens* relacionado con dicho grupo.
   *
   * @param {String} tokenItem - Objeto de datos
   * @param {Function} createToken - Función generadora asociada al tipo de token.
   * @param {String} groupName - El nombre del grupo (solo para subniveles)
   * @function
   */

  createTokenGroup (tokenItem, createToken, groupName) {
    const groupObject = {}
    tokenItem.children.forEach(item => {
      item.type !== 'FRAME'
        ? Object.assign(groupObject, createToken(item, this))
        : this.createTokenGroup(item, createToken, { [tokenItem.name]: groupObject })
    })

    if (!groupName) {
      return { [tokenItem.name]: groupObject }
    } else {
      Object.assign(Object.values(groupName)[0], { [tokenItem.name]: groupObject })
      return { [groupName]: { [groupObject.name]: groupObject } }
    }
  }

  /**
   * Función generadora del tipo *color*
   *
   * @param {Object} data - Objeto de datos
   * @return {Object} Devuelve las propiedades finales del token
   * @function
   */

  createColor (data, _this) {
    const color = _this.colorConvert(data.fills[0].color)

    return {
      [data.name]: {
        value: color.hex,
        rgb: color.rgb,
        type: 'color'
      }
    }
  }

  /**
   * Función generadora del tipo *font*
   *
   * @param {Object} data - Objeto de datos
   * @return {Object} Devuelve las propiedades finales del token
   * @function
   */

  createText (data) {
    return {
      [data.name]: {
        size: {
          value: data.style.fontSize ? `${data.style.fontSize}px` : null,
          type: 'typography'
        },
        weight: {
          value: data.style.fontWeight ? data.style.fontWeight : null,
          type: 'typography'
        },
        lineHeight: {
          value: data.style.lineHeightPx ? `${data.style.lineHeightPx}px` : null,
          type: 'typography'
        }
        // letterSpacing: {
        //   value: data.style.letterSpacing ? `${data.style.letterSpacing}px` : null,
        //   type: 'typography'
        // }
      }
    }
  }
  /**
   * Función generadora del tipo *font*
   *
   * @param {Object} data - Objeto de datos
   * @return {Object} Devuelve las propiedades finales del token
   * @function
   */

  createFont (data) {
    return {
      [data.name]: {
        value: `'${data.style.fontFamily}'`,
        type: 'typography'
      }
    }
  }

  /**
   * Función generadora del tipo *space*
   *
   * @param {Object} data - Objeto de datos
   * @return {Object} Devuelve las propiedades finales del token
   * @function
   */

  createSpace (data) {
    return {
      [data.name]: {
        value: data.absoluteBoundingBox ? `${data.absoluteBoundingBox.height}px` : null,
        type: 'spacer'
      }
    }
  }

  /**
   * Función generadora del tipo *radius*
   *
   * @param {Object} data - Objeto de datos
   * @return {Object} Devuelve las propiedades finales del token
   * @function
   */

  createRadius (data) {
    return {
      [data.name]: {
        value: data.rectangleCornerRadii ? `${data.rectangleCornerRadii[0]}px` : 0,
        type: 'radius'
      }
    }
  }

  /**
   * Función generadora del tipo *border*
   *
   * @param {Object} data - Objeto de datos
   * @return {Object} Devuelve las propiedades finales del token
   * @function
   */

  createBorder (data) {
    return {
      [data.name]: {
        value: data.strokeWeight > 0 ? `${data.strokeWeight}px` : 0,
        type: 'border'
      }
    }
  }

  /**
   * Función generadora del tipo *opacity*
   *
   * @param {Object} data - Objeto de datos
   * @return {Object} Devuelve las propiedades finales del token
   * @function
   */

  createOpacity (data) {
    return {
      [data.name]: {
        value: data.opacity ? `.${Math.round(data.opacity * 10)}` : 1,
        type: 'opacity'
      }
    }
  }

  /**
   * Función generadora del tipo *breakpoint*
   *
   * @param {Object} data - Objeto de datos
   * @return {Object} Devuelve las propiedades finales del token
   * @function
   */

  createBreakpoint (data) {
    return {
      [data.name]: {
        value: data.absoluteBoundingBox.width ? `${data.absoluteBoundingBox.width}px` : null,
        type: 'breakpoint'
      }
    }
  }

  /**
   * Función generadora del tipo *shadow*
   *
   * @param {Object} data - Objeto de datos
   * @return {Object} Devuelve las propiedades finales del token
   * @function
   */

  createShadow (data, _this) {
    const values = data.effects[0]
    const color = _this.colorConvert(values.color)

    return {
      [data.name]: {
        value: `${values.offset.x}px ${values.offset.y}px ${values.radius}px ${color.rgba}`,
        type: 'shadow'
      }
    }
  }

  /**
   * Figma nos da el color con decimales y en rgba. Por lo que se crea esta función
   * para devolver tanto el hexadecimal, que sera el valor principal, como un
   * valor de apoyo *rgba* por su en un futuro fuese necesario.
   *
   * @param {Object} color - El color en formato de figma
   * @return {Object} el color en formato hexadecimal y en rgba
   * @function
   */

  colorConvert (color) {
    const rgbaColor = {
      r: Math.floor(color.r * 255),
      g: Math.floor(color.g * 255),
      b: Math.floor(color.b * 255),
      a: color.a
    }

    return {
      rgb: `${rgbaColor.r}, ${rgbaColor.g}, ${rgbaColor.b}`,
      rgba: `rgba(${rgbaColor.r}, ${rgbaColor.g}, ${rgbaColor.b}, ${rgbaColor.a})`,
      hex: `#${rgb(rgbaColor.r, rgbaColor.g, rgbaColor.b)}`
    }
  }
}

module.exports = FigmaTokens
