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
  console.log(`No valid --map= value detected, defaulting to 'color' map`)
  map = 'color'
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

let visibleStickers = {
  0: {
    total: 23,
    U: 9,
    F: 9,
    R: 5
  },
  1: {
    total: 23,
    U: 9,
    F: 9,
    R: 5
  },
  2: {
    total: 21,
    U: 9,
    F: 8,
    R: 4
  },
  3: {
    total: 23,
    U: 9,
    F: 5,
    R: 9
  },
  4: {
    total: 23,
    U: 9,
    F: 5,
    R: 9
  },
  5: {
    total: 21,
    U: 8,
    F: 4,
    R: 9
  },
  6: {
    total: 23,
    U: 5,
    F: 9,
    R: 9
  },
  7: {
    total: 23,
    U: 5,
    F: 9,
    R: 9
  },
  8: {
    total: 21,
    U: 4,
    F: 9,
    R: 8
  },
}

let collapsedSecret = encodedSecretString.replace(/,/g,'')
let secretInCubes = collapsedSecret

let cubeStrings = []

for (let cube in visibleStickers) {
  let cubeString = secretInCubes.substring(0, visibleStickers[cube].total);
  secretInCubes = secretInCubes.replace(cubeString, '')

  let faceString = cubeString

  let face_U = faceString.substring(0, visibleStickers[cube].U);
  faceString = faceString.replace(face_U, '')

  let face_F = faceString.substring(0, visibleStickers[cube].F);
  faceString = faceString.replace(face_F, '')

  let face_R = faceString.substring(0, visibleStickers[cube].R);
  faceString = faceString.replace(face_R, '')


  console.log(`Cube: ${cube}`)
  console.log(`U Face: ${convertEncoding(face_U, map)}`)
  console.log(`F Face: ${convertEncoding(face_F, map)}`)
  console.log(`R Face: ${convertEncoding(face_R, map)}`)
  console.log(`--------------`)

  if (cubeString) {    
    cubeStrings.push(cubeString)
  } 
}

function convertEncoding(secret, map){
let convertedSecret = secret

  for (var i = 0; i < keys[map].length; i++) {    

    let regex = new RegExp(keys.number[i], 'g')
    convertedSecret = convertedSecret.replace(regex, `${keys[map][i]},`)
  }

  return convertedSecret 
}