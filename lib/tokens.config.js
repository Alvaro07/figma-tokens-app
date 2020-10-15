/**
 * Archivo de configuración para el consumo de tokens desde Figma
 *
 * @param {String} authToken El token de autentificación del usuario
 * @param {String} idFile El identificador único del archivo de Figma
 * @param {Array} tokens Los diferentes tokens a consumir
 *
 * name: Nombre del token
 * type: Tipo del token: ['color', 'typography', 'text', 'space', 'breakpoint', 'radius', 'opacity', 'border', 'shadow', 'icon size']
 * format: Formato de salida: ['scss/variables', 'css/variables']
 * default: Añadir !default al valor de la propiedad css: [true, false ]
 * mobile: Posibilidad de exportar los archivos a xml para mobile
 *
 */

module.exports = {
  authToken: '',
  idFile: '',
  tokens: [
    {
      name: 'color-light',
      type: 'color',
      format: 'css/variables'
    }
  ]
}

/**
 * Ejemplo con las posibilidades
 *
 */

// module.exports = {
//   authToken: '',
//   idFile: '',
//   tokens: [
//     {
//       name: 'color-light',
//       type: 'color',
//       format: 'css/variables',
//       mobile: true
//     },
//     {
//       name: 'color-dark',
//       type: 'color',
//       format: 'css/variables'
//     },
//     {
//       name: 'txt',
//       type: 'text',
//       format: 'scss/variables',
//       transform: 'px/rem',
//       default: true
//     },
//     {
//       name: 'font',
//       type: 'typography',
//       format: 'scss/variables',
//       default: true
//     },
//     {
//       name: 'space',
//       type: 'space',
//       format: 'scss/variables',
//       transform: 'px/rem',
//       default: true
//     },
//     {
//       name: 'breakpoint',
//       type: 'breakpoint',
//       format: 'scss/variables',
//       default: true
//     },
//     {
//       name: 'radius',
//       type: 'radius',
//       format: 'scss/variables',
//       default: true
//     },
//     {
//       name: 'icon',
//       type: 'space',
//       format: 'scss/variables',
//       transform: 'px/rem',
//       default: true
//     },
//     {
//       name: 'border',
//       type: 'border',
//       format: 'scss/variables',
//       default: true
//     },
//     {
//       name: 'shadow',
//       type: 'shadow',
//       format: 'scss/variables',
//       default: true
//     }
//   ]
// }
