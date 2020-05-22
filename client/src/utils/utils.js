export const codeTransform = function (file) {
  if (file.includes(':root')) {
    return `:root${file.split(':root')[1]}`
  } else {
    return file
  }
}
