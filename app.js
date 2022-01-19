const braille = require('./node_modules/bin-braille-parser/index.js')

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

let map = argv.map
if (!map) {
  console.log(`No --map= value detected, defaulting to 'color' map`)
  map = 'color'
}
map = map.toLowerCase()

secretMessage = braille.parserTextToBinBraille(secretMessage)

// false = braille dot turned off
// true = braille dot turned on
let binaryString = ''

for (let letter = 0; letter < secretMessage.length; letter++) {
  for (let characterRow = 0; characterRow < secretMessage[letter].length; characterRow++) {
    for (let binary = 0; binary < secretMessage[letter][characterRow].length; binary++) {
      binaryString += secretMessage[letter][characterRow][binary]
    };
  };
};

let keys = {}

keys.color = ['blue', 'green', 'orange', 'red', 'yellow', 'black']
keys.symbol = ['^', 'v', '<', '>', '•', 'X']
keys.number = [0,1,2,3,4,5]

let encodedSecret = []


for (let i = 0; i < binaryString.length; i++) {  
  if (binaryString[i] == 1) {
    // if that point in the braille matrix is enabled, use the keymap to assign char and push to array

    let encodedChar = keys[map][i % 6]   
    encodedSecret.push(encodedChar)

  }
};

encodedSecret = encodedSecret.toString()

console.log(encodedSecret)