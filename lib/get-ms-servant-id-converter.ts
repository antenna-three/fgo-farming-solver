import { Servant } from '../interfaces'

const noToMsId: { [key: number]: number } = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  11: 11,
  12: 12,
  13: 13,
  14: 14,
  15: 15,
  16: 16,
  17: 17,
  18: 18,
  19: 19,
  20: 20,
  21: 21,
  22: 22,
  23: 23,
  24: 24,
  25: 25,
  26: 26,
  27: 27,
  28: 28,
  29: 29,
  30: 30,
  31: 31,
  32: 32,
  33: 33,
  34: 34,
  35: 35,
  36: 36,
  37: 37,
  38: 38,
  39: 39,
  40: 40,
  41: 41,
  42: 42,
  43: 43,
  44: 44,
  45: 45,
  46: 46,
  47: 47,
  48: 48,
  49: 49,
  50: 50,
  51: 51,
  52: 52,
  53: 53,
  54: 54,
  55: 55,
  56: 56,
  57: 57,
  58: 58,
  59: 59,
  60: 60,
  61: 61,
  62: 62,
  63: 63,
  64: 64,
  65: 65,
  66: 66,
  67: 67,
  68: 68,
  69: 69,
  70: 70,
  71: 71,
  72: 72,
  73: 73,
  74: 74,
  75: 75,
  76: 76,
  77: 77,
  78: 78,
  79: 79,
  80: 80,
  81: 81,
  82: 82,
  84: 84,
  85: 85,
  86: 86,
  87: 87,
  88: 88,
  89: 89,
  90: 90,
  91: 91,
  92: 92,
  93: 93,
  94: 94,
  95: 95,
  96: 96,
  97: 97,
  98: 98,
  99: 99,
  100: 100,
  101: 101,
  102: 102,
  103: 103,
  104: 104,
  105: 105,
  106: 106,
  107: 107,
  108: 108,
  109: 109,
  110: 110,
  111: 111,
  112: 112,
  113: 113,
  114: 114,
  115: 115,
  116: 116,
  117: 117,
  118: 118,
  119: 119,
  120: 120,
  121: 121,
  122: 122,
  123: 123,
  124: 124,
  125: 125,
  126: 126,
  127: 127,
  128: 128,
  129: 129,
  130: 130,
  131: 131,
  132: 132,
  133: 133,
  134: 134,
  135: 135,
  136: 136,
  137: 137,
  138: 138,
  139: 139,
  140: 140,
  141: 141,
  142: 142,
  143: 143,
  144: 144,
  145: 145,
  146: 146,
  147: 147,
  148: 148,
  150: 149,
  153: 150,
  154: 151,
  155: 153,
  156: 154,
  157: 155,
  158: 156,
  159: 157,
  160: 158,
  161: 159,
  162: 160,
  163: 161,
  164: 162,
  165: 163,
  166: 164,
  167: 165,
  169: 166,
  170: 167,
  171: 168,
  172: 169,
  173: 170,
  174: 171,
  175: 172,
  176: 173,
  177: 174,
  178: 175,
  179: 177,
  180: 178,
  181: 179,
  182: 176,
  183: 180,
  184: 181,
  185: 182,
  186: 183,
  187: 184,
  188: 185,
  189: 186,
  190: 187,
  191: 211,
  192: 188,
  193: 189,
  194: 190,
  195: 191,
  196: 152,
  197: 192,
  198: 193,
  199: 194,
  200: 195,
  201: 196,
  202: 197,
  203: 198,
  204: 199,
  205: 200,
  206: 201,
  207: 202,
  208: 203,
  209: 204,
  210: 205,
  211: 206,
  212: 207,
  213: 208,
  214: 209,
  215: 210,
  216: 212,
  217: 213,
  218: 214,
  219: 215,
  220: 216,
  221: 217,
  222: 218,
  223: 219,
  224: 220,
  225: 221,
  226: 222,
  227: 223,
  228: 224,
  229: 227,
  230: 226,
  231: 225,
  232: 228,
  233: 229,
  234: 230,
  235: 231,
  236: 232,
  237: 233,
  238: 234,
  239: 235,
  241: 236,
  242: 237,
  243: 238,
  244: 239,
  245: 240,
  246: 241,
  247: 242,
  248: 243,
  249: 244,
  250: 245,
  251: 246,
  252: 247,
  253: 248,
  254: 249,
  255: 250,
  256: 251,
  257: 252,
  258: 253,
  259: 254,
  260: 255,
  261: 256,
  262: 257,
  263: 258,
  264: 259,
  265: 260,
  266: 261,
  267: 262,
  268: 263,
  269: 264,
  270: 265,
  271: 266,
  272: 267,
  273: 268,
  274: 269,
  275: 270,
  276: 271,
  277: 272,
  278: 273,
  279: 274,
  280: 275,
  281: 276,
  282: 277,
  283: 278,
  284: 279,
  285: 280,
  286: 281,
  287: 282,
  288: 283,
  289: 284,
  290: 285,
  291: 286,
  292: 287,
  293: 288,
  294: 289,
  295: 290,
  296: 291,
  297: 292,
  298: 293,
  299: 294,
  300: 296,
  301: 295,
  302: 297,
  303: 298,
  304: 299,
  305: 300,
  306: 301,
  307: 302,
  308: 303,
  309: 304,
  310: 305,
  311: 306,
  312: 307,
  313: 308,
  314: 309,
  315: 310,
  316: 311,
}

export const getMsServantIdConverter = (servants: Servant[]) => {
  const idToNo = Object.fromEntries(
    servants.map(({ id, collectionNo }) => [id, collectionNo])
  )
  const noToId = Object.fromEntries(
    servants.map(({ id, collectionNo }) => [collectionNo, id])
  )
  const msIdToNo = Object.fromEntries(
    Object.entries(noToMsId).map(([k, v]) => [v, k])
  )
  const getMsId = (id: number) => {
    const no = idToNo[id]
    return noToMsId[no] || no - 5
  }
  const getId = (msId: number) => {
    const no = msIdToNo[msId]
    return noToId[no] || no + 5
  }
  return { getMsId, getId }
}
