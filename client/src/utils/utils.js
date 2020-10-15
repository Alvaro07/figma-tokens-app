export const codeTransform = function (file) {
  if (file.code.includes(':root')) {
    return { ...file, code: `:root${file.code.toString().split(':root')[1].trim()}` }
  } else {
    return file
  }
}
