
/**
 * A function to convert rgb color to hexadecimal color format
 *
 * @name rgb
 * @param {string} r - red param
 * @param {string} g - green param
 * @param {string} b - blue param
 * @return {string} A hexadecimal format color
 */

function rgb (r, g, b) {
  return toHex(r) + toHex(g) + toHex(b)
}

/**
 * Convert rgb format to hex
 *
 * @name toHex
 * @param {string} d - The unic color
 * @return {string} A code string
 */

function toHex (d) {
  if (d < 0) { return '00' }
  if (d > 255) { return 'FF' }
  return ('0' + (Number(d).toString(16))).slice(-2).toUpperCase()
}

module.exports = rgb
