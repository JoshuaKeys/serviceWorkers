function getFileExtension(filename) {
  let filenameFragments = filename.split('.');
  return filenameFragments[filenameFragments.length -1];
}
module.exports = getFileExtension;
