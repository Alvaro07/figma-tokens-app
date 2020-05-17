const rgb = require('./color-converter')
const fetch = require('node-fetch')

/**
 * Get the Figma's design tokens
 * @class
 * @name FigmaTokens
 * @classdesc A function to get figma data and convert it to Tokens
 * @param {string} apiToken The user api token
 * @param {string} idFile The project id file
 */

class FigmaTokens {
  constructor (apiToken, idFile) {
    this.apiToken = apiToken
    this.idFile = idFile
    this.tokens = {}
    this.figmaTree = {}
  }

  /**
   * Get the all figma tree
   * @async
   * @return {Promise<Object>} The Figma json tree
   */

  async initFigmaObjTree () {
    const result = await fetch(`https://api.figma.com/v1/files/${this.idFile}`, {
      method: 'GET',
      headers: {
        'X-Figma-Token': this.apiToken
      }
    })
    const figmaTreeStructure = await result.json()
    if (figmaTreeStructure.status === 403) {
      throw new Error(figmaTreeStructure.error)
    }
    return figmaTreeStructure
  }

  /**
   * Init figma Tree
   * @function
   */

  initialize () {
    this.setToken('color', this.createColor)
    this.setToken('color-light', this.createColor)
    this.setToken('color-dark', this.createColor)
    this.setToken('text', this.createFont)
    this.setToken('space', this.createSpace)
  }

  /**
   * Get the final tokens
   * @function
   * @return {Promise<Object>} The style tokens
   */

  getTokens () {
    return new Promise((resolve, reject) => {
      this.initFigmaObjTree().then(data => {
        this.figmaTree = data.document.children[0].children
        this.initialize(data)
        resolve({ token: this.tokens })
      }).catch(error => {
        reject(error)
      })
    })
  }

  /**
   * Get the data type
   * @function
   * @param {String} name The Token's group name
   * @return {Object} The token's group data object
   */

  getTypeTokens (name) {
    return this.figmaTree.filter(item => item.name === name).length
      ? this.figmaTree.filter(item => item.name === name)[0].children
      : null
  }

  /**
   * The main function to extract de tokens data
   * @param {String} tokenType - The Token's name
   * @param {Function} createToken - The function that generate token object
   * @function
   */

  setToken (tokenType, createToken) {
    const tokens = {}

    this.getTypeTokens(tokenType).forEach(item => {
      item.type !== 'FRAME'
        ? Object.assign(tokens, createToken(item, this))
        : Object.assign(tokens, this.createTokenGroup(item, createToken))
    })

    Object.assign(this.tokens, { [tokenType]: tokens })
  }

  /**
   * Create token group inside setToken function
   * @param {String} tokenItem - The Token's array data
   * @param {Function} createToken - The function that generate token object
   * @param {String} groupName - The group name (only for sublevels)
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
   * Get color data
   * @param {Object} data - The data of the figma object
   * @return {Object} The token's propierty
   * @function
   */

  createColor (data, _this) {
    const color = _this.colorConvert(data.fills[0].color)

    return {
      [data.name]: {
        value: color.hex,
        rgba: color.rgba,
        type: 'color'
      }
    }
  }

  /**
   * Create font item object
   * @function
   * @return {Object} The token's propierty
   * @param {Object} data - The data of the figma object
   */

  createFont (data) {
    return {
      [data.name]: {
        family: {
          value: `${data.style.fontFamily}`,
          type: 'typography'
        },
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
        },
        letterSpacing: {
          value: data.style.letterSpacing ? `${data.style.letterSpacing}px` : null,
          type: 'typography'
        }
      }
    }
  }

  /**
   * Get color data
   * @param {Object} data - The data of the figma object
   * @return {Object} The token's propierty
   * @function
   */

  createSpace (data) {
    return {
      [data.name]: {
        value: data.absoluteBoundingBox ? data.absoluteBoundingBox.height : null,
        type: 'spacer'
      }
    }
  }

  /**
   * Get radius data
   * @param {Object} data - The data of the figma object
   * @return {Object} The token's propierty
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
   * Get radius data
   * @param {Object} data - The data of the figma object
   * @return {Object} The token's propierty
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
   * Get radius data
   * @param {Object} data - The data of the figma object
   * @return {Object} The token's propierty
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
   * Get radius data
   * @param {Object} data - The data of the figma object
   * @return {Object} The token's propierty
   * @function
   */

  createBreakpoint (data) {
    return {
      [data.name]: {
        value: data.absoluteBoundingBox.width ? `${data.absoluteBoundingBox.width}px` : null,
        type: 'opacity'
      }
    }
  }

  /**
   * A util funciton to convert the figma colors
   * @param {Object} color - The data of the figma color
   * @return {Object} The rgba and hexadecimal color
   * @function
   */

  colorConvert (color) {
    const rgbColor = {
      r: Math.floor(color.r * 255),
      g: Math.floor(color.g * 255),
      b: Math.floor(color.b * 255),
      a: color.a
    }

    return {
      rgba: `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, ${rgbColor.a})`,
      hex: `#${rgb(rgbColor.r, rgbColor.g, rgbColor.b)}`
    }
  }
}

module.exports = FigmaTokens
