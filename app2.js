const braille = require('./node_modules/bin-braille-parser/index.js')

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

doesArgExist(argv.t, 't')
let secretMessage = argv.t

let keys = {}

keys.color = ['blue', 'green', 'orange', 'red', 'yellow', 'black']
keys.symbol = ['^', 'v', '<', '>', '•', 'X']
keys.number = [0,1,2,3,4,5]

let encodedSecret = []

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
if (!map || !keys[map]) {
  console.log(`No valid --map= value detected, defaulting to 'number' map`)
  map = 'number'
}
map = map.toLowerCase()

secretMessage = braille.parserTextToBinBraille(secretMessage)

let binaryString = ''

for (let letter = 0; letter < secretMessage.length; letter++) {
  for (let characterRow = 0; characterRow < secretMessage[letter].length; characterRow++) {
    for (let binary = 0; binary < secretMessage[letter][characterRow].length; binary++) {
      binaryString += secretMessage[letter][characterRow][binary]
    };
  };
};

for (let i = 0; i < binaryString.length; i++) {  
  if (binaryString[i] == 1) {
    // if that point in the braille matrix is enabled, use the keymap to assign char and push to array
    let encodedChar = keys.number[i % 6]   
    encodedSecret.push(encodedChar)
  }
};

let encodedSecretString = encodedSecret.toString()
let faceStrings = []
let rowStrings = []


let secretInCubes = encodedSecretString.replace(/,/g,'')
secretInCubes = secretInCubes.match(/.{1,27}/g);

for (var cube = 0; cube < secretInCubes.length; cube++) {  

  faceStrings.push(secretInCubes[cube].match(/.{1,9}/g));

  for (var face = 0; face < faceStrings.length; face++) {
    // rowStrings.push(faceStrings[face].match(/.{1,3}/g))
    for (var row = 0; row < faceStrings[face].length; row++) {

      // convertEncoding(faceStrings[face][row].match(/.{1,3}/g), map)
      let strings = faceStrings[face][row].match(/.{1,3}/g )


      for (var sticker = 0; sticker < faceStrings[face][row].length; sticker++) {
        // console.log(convertChar(faceStrings[face][row][sticker], map))
        console.log(faceStrings[face][row])
      }
      
      rowStrings.push(faceStrings[face][row].match(/.{1,3}/g));
    }
  }

}

let rows = []

console.log(rowStrings)
// convertEncoding(rowStrings, map)


function convertChar(char, map){
  for (var i = 0; i < keys[map].length; i++) {    

    let regex = new RegExp(keys.number[i], 'g')
    char = char.replace(regex, keys[map][i])
  }

  return char
}


function convertEncoding(secret, map){
let convertedSecret = secret

  for (var i = 0; i < keys[map].length; i++) {    

    let regex = new RegExp(keys.number[i], 'g')
    convertedSecret = convertedSecret.replace(regex, keys[map][i])
  }


console.log(convertedSecret)  
}

convertEncoding(encodedSecretString, map)


console.log(encodedSecretString)