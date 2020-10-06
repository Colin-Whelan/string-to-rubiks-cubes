const braille = require('./node_modules/bin-braille-parser/index.js')


var secretMessage = braille.parserTextToBinBraille('-')

var binaryString = ''

for (var letter = 0; letter < secretMessage.length; letter++) {
  for (var characterRow = 0; characterRow < secretMessage[letter].length; characterRow++) {
    for (var binary = 0; binary < secretMessage[letter][characterRow].length; binary++) {
      binaryString += secretMessage[letter][characterRow][binary]
    };
  };
};

var colorMap = []

for (var i = 0; i < binaryString.length; i++) {
  switch (i % 6) {
    case 0:
      color = 'blue'
      break
    case 1:
      color = 'green'
      break
    case 2:
      color = 'orange'
      break
    case 3:
      color = 'red'
      break
    case 4:
      color = 'yellow'
      break
    case 5:
      color = 'black'
      break
  }

  colorMap.push(color + binaryString[i])

};

var cleanedString = ''

for (var i = 0; i < colorMap.length; i++) {
  if (colorMap[i].includes('1')) {
    cleanedString += colorMap[i] + ','
  }
};

cleanedString = cleanedString.replace(/1/g, '');

console.log(cleanedString)