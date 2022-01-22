
# String to Rubik's Cube Faces

This tool will take a string, and encode it as faces of Rubiks' cubes.

Strings are first converted to Braille(I chose braille as the 2x3 dot matrix = 6 bits which easily corresponds to the 6 colors of the cube), then encoded as colors(or other mappings). 

These colors are then grouped into sections by Cube number, and Face labels - U(Up), F(Front), R(Right).

Each cube will only encode about 8 characters including spaces, and capitals count as 2.

Note that the output not does not account for valid cube configurations. Impossible cube cases are very frequent.

## Args

| Arg | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `--t=` | `string` | **Required**. The text to encode |
| `--map=` | `string` |Default: color. The type of encoded output. |

## Setup

### Cubes
Configure the visible stickers by adjusting the visibleStickers object.

For example, this means for Cube #0, the 'U' face has 9 stickers visible, the 'F' face has 9 stickers visible, and the 'R' face has 5 stickers visible.


    let visibleStickers = {
        0: {
            U: 9,
            F: 9,
            R: 5
        },
        .
        .
        .
    }
9 cubes are defined by default, more or less cubes can be defined as needed.

### Mappings
**.color** and **.number** are required for the script and **should not be modified**.

Addional custom mappings can be adding to the 'keys' object.

Included mappings:

    keys.color = ['cyan', 'green', 'magenta', 'red', 'yellow', 'white']
    keys.number = [0,1,2,3,4,5]
    keys.symbol = ['^', 'v', '<', '>', '•', 'X']


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

![Full Braille Character Chart](https://st3.depositphotos.com/1032239/15276/v/1600/depositphotos_152769426-stock-illustration-braille-alphabet-english-version-for.jpg)



## Displaying cubes

There is no process yet to build a model off the cubes. I am not sure how to do that at the moment.

Once the encoded colors are mapped onto cubes with the layout guide removed, decoding becomes next to impossible without at least most of this data:

    1. How the colors/mapped characters match the braille matrix
    2. Starting Cube
    3. Starting Face
    4. Order to read stickers
    5. Order to read faces
    6. Order to read cubes
    


## What's the point?

None really, 10 years ago I though up this way to encode strings onto Rubiks' Cubes for art projects. Manually was taking too long so I decided automate it.





