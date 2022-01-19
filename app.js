const braille = require('./node_modules/bin-braille-parser/index.js')

var codeString = ''

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

doesArgExist(argv.t, 't')
let secretMessage = argv.t

function doesArgExist(arg, argName) {
  if (!arg || arg === true) { 
    logError(`--${argName}=`)
  } 
}

function logError(arg){
  console.error(`Enter a valid '${arg}'`)
  process.exit(1)
}

var map = argv.map
if (!map) {
  console.log(`No --map= value detected, defaulting to 'color' map`)
  map = 'color'
}
map = map.toLowerCase()

secretMessage = braille.parserTextToBinBraille(secretMessage)

var binaryString = ''

for (var letter = 0; letter < secretMessage.length; letter++) {
  for (var characterRow = 0; characterRow < secretMessage[letter].length; characterRow++) {
    for (var binary = 0; binary < secretMessage[letter][characterRow].length; binary++) {
      binaryString += secretMessage[letter][characterRow][binary]
    };
  };
};

// this can be improved
var colormap = []
var color

var keymap = []
var key

var numbermap = []
var number


for (var i = 0; i < binaryString.length; i++) {
  switch (i % 6) {
    case 0:
      color = 'blue'
      key = '^'
      number = '1'
      break
    case 1:
      color = 'green'
      key = 'v'
      number = '2'
      break
    case 2:
      color = 'orange'
      key = '<'
      number = '3'
      break
    case 3:
      color = 'red'
      key = '>'
      number = '4'
      break
    case 4:
      color = 'yellow'
      key = '•'
      number = '5'
      break
    case 5:
      color = 'black'
      key = 'X'
      number = '6'
      break
  }

  colormap.push(color + binaryString[i])
  keymap.push(key + binaryString[i])
  numbermap.push(number + binaryString[i])

  console.log(keymap)
};

function convertStringByMap(string, map) {
  
}

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
    case 'number':
      addToCodeString(numbermap)
      break
    case 'all':
      addToCodeString(colormap)
      codeString += '\n\n'
      addToCodeString(keymap)
      codeString += '\n\n'
      addToCodeString(numbermap)
      break
    case 'default':
      addToCodeString(colormap)
      break
  }
}

createCodeString()

console.log(cleanString(codeString))