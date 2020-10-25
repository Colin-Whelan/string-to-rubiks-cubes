const braille = require('./node_modules/bin-braille-parser/index.js')

var codeString = ''
var secretMessage = process.argv[2]
if (!secretMessage) {
  secretMessage = 'Hello world.'
}

var map = process.argv[3]
if (!map) {
  map = 'color'
}
secretMessage = braille.parserTextToBinBraille(secretMessage)

var binaryString = ''

for (var letter = 0; letter < secretMessage.length; letter++) {
  for (var characterRow = 0; characterRow < secretMessage[letter].length; characterRow++) {
    for (var binary = 0; binary < secretMessage[letter][characterRow].length; binary++) {
      binaryString += secretMessage[letter][characterRow][binary]
    };
  };
};

var colormap = []
var color

var keymap = []
var key

for (var i = 0; i < binaryString.length; i++) {
  switch (i % 6) {
    case 0:
      color = 'blue'
      key = '^'
      break
    case 1:
      color = 'green'
      key = 'v'
      break
    case 2:
      color = 'orange'
      key = '<'
      break
    case 3:
      color = 'red'
      key = '>'
      break
    case 4:
      color = 'yellow'
      key = '•'
      break
    case 5:
      color = 'black'
      key = 'X'
      break
  }

  colormap.push(color + binaryString[i])
  keymap.push(key + binaryString[i])
};

function cleanString(string) {
  string = string.replace(/1/g, '');
  string = string.slice(0, -1)
  return string
}

function addToCodeString(mapChoice) {
  for (var i = 0; i < mapChoice.length; i++) {
    if (mapChoice[i].includes('1')) {
      codeString += mapChoice[i] + ','
    }
  };
}

function createCodeString() {

  switch (map) {
    case 'color':
      addToCodeString(colormap)
      break
    case 'key':
      addToCodeString(keymap)
      break
    case 'all':
      addToCodeString(colormap)
      codeString += '\n\n'
      addToCodeString(keymap)
      break
    case 'default':
      addToCodeString(colormap)
      break
  }
}

createCodeString()

console.log(cleanString(codeString))