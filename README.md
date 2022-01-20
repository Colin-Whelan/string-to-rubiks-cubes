
# String to Rubik's Cube Faces

This tool will take a string, and encode it as faces of Rubik's cubes.

Strings are first converted to Braille, then encoded as colors(or other mappings)

These colors are then grouped into sections by Cube number, and Face labels - U(Up), F(Front), R(Right).

Each cube will only encode about 8 characters - including spaces, and capitals count as 2.

## Args

|Arg |Default  | Required|
--- | --- | --- |
|--t=| | Yes|
|--map=|'color'| No|

## Setup

### Cubes
Configure the visible stickers by adjusting the visibleStickers object.

For example,


This means for Cube '0', the 'U' face has 9 stickers visible, the 'F' face has 9 stickers visible, and the 'R' face has 5 stickers visible.


    0: {
        U: 9,
        F: 9,
        R: 5
    }

More cubes can be defined as needed.

### Mappings
Addional custom mappings can be adding to the 'keys' object.

Included mappings:

    keys.color = ['cyan', 'green', 'magenta', 'red', 'yellow', 'white']
    keys.symbol = ['^', 'v', '<', '>', '•', 'X']
    keys.number = [0,1,2,3,4,5]


# Usage

    node app --map=color --t="Hello World"  

will output: 

    Cube: 0
    U:
    green,white,cyan,
    magenta,red,cyan,
    red,cyan,magenta,
    F:
    yellow,cyan,magenta,
    yellow,cyan,red,
    yellow,green,white,
    R:
    green,magenta,red,
    white,cyan,

    --------------
    Cube: 1
    U:
    red,yellow,cyan,
    magenta,red,yellow,
    cyan,magenta,yellow,
    F:
    cyan,green,red,


    R:

# Decoding

There is no built in method of decoding. Here is the manual process.

From the output string above, convert the color into the digit according the 'keys.number' mapping:

    Cube: 0
    U:
    1,5,0,
    2,3,0,
    3,0,2,
    F:
    4,0,2,
    4,0,3,
    4,1,5,
    R:
    1,2,3,
    5,0,

    --------------
    Cube: 1
    U:
    3,4,0,
    2,3,4,
    0,2,4,
    F:
    0,1,3,


    R:



Start with Cube 0,

Starting with the first digit, we read digits until there is one of equal or lower value, signifying the start of a new character.

After the first round of braille grouping, this is the result

1,5 | 0,2,3 | 0,3 | 0,2,4 | 0,2,4 | 0,3,4 | 1,5 | 1,2,3,5, | 0...

These digits correspond to cells of the braille matrix that are activated.

Braille Character Matrix:

    [0, 1]
    [2, 3]
    [4, 5]

Using the full Character Matrix below, our string becomes:
Emph(capital) | h | e | l | l | o | Emph(capital) | w | ...

There is some abiguitty among the grouping which can require another split. Consider this grouping: | 0,1,2 |

With a direct conversion, this is '6, though it can also be viewed as | 0 | 1,2 | which is | a | i |

## Displaying cubes

There is no process yet to build a model off the cubes, this must be done with a graphics editor, or with a physical cube.

Once the encoded colors are mapped onto cubes with the layout guide removed, decoding becomes next to impossible without at least most of this data:

    1. Starting Cube
    2. Starting Face
    3. Order to read stickers
    4. Order to read faces
    5. Order to read cubes

![Full Braille Character Chart](https://st3.depositphotos.com/1032239/15276/v/1600/depositphotos_152769426-stock-illustration-braille-alphabet-english-version-for.jpg)







