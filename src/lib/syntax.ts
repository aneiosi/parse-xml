/**
 * Regular expression that matches one or more `AttValue` characters in a
 * double-quoted attribute value.
 *
 * @see https://www.w3.org/TR/2008/REC-xml-20081126/#NT-AttValue
 */
export const attValueCharDoubleQuote = /["&<]/;

/**
 * Regular expression that matches one or more `AttValue` characters in a
 * single-quoted attribute value.
 *
 * @see https://www.w3.org/TR/2008/REC-xml-20081126/#NT-AttValue
 */
export const attValueCharSingleQuote = /['&<]/;

/**
 * Regular expression that matches a whitespace character that should be
 * normalized to a space character in an attribute value.
 *
 * @see https://www.w3.org/TR/2008/REC-xml-20081126/#AVNormalize
 */
export const attValueNormalizedWhitespace = /\r\n|[\n\r\t]/g;

/**
 * Regular expression that matches one or more characters that signal the end of
 * XML `CharData` content.
 *
 * @see https://www.w3.org/TR/2008/REC-xml-20081126/#dt-chardata
 */
export const endCharData = /<|&|]]>/;

/**
 * Mapping of predefined entity names to their replacement values.
 *
 * @see https://www.w3.org/TR/2008/REC-xml-20081126/#sec-predefined-ent
 */
export const predefinedEntities: Readonly<{[name: string]: string;}> = Object.freeze(Object.assign(Object.create(null), {
  amp: '&',
  apos: "'",
  gt: '>',
  lt: '<',
  quot: '"',
}));

/**
 * Returns `true` if _char_ is an XML `NameChar`, `false` if it isn't.
 *
 * @see https://www.w3.org/TR/2008/REC-xml-20081126/#NT-NameChar
 */
export function isNameChar(char: string): boolean {
  let cp = char.codePointAt(0) as number;

  // Including the most common NameStartChars here improves performance
  // slightly.
  return (cp >= 0x61 && cp <= 0x7A) // a-z
    || (cp >= 0x41 && cp <= 0x5A) // A-Z
    || (cp >= 0x30 && cp <= 0x39) // 0-9
    || cp === 0x2D // -
    || cp === 0x2E // .
    || cp === 0xB7
    || (cp >= 0x300 && cp <= 0x36F)
    || cp === 0x203F
    || cp === 0x2040
    || isNameStartChar(char, cp);
}

/**
 * Returns `true` if _char_ is an XML `NameStartChar`, `false` if it isn't.
 *
 * @see https://www.w3.org/TR/2008/REC-xml-20081126/#NT-NameStartChar
 */
export function isNameStartChar(char: string, cp = char.codePointAt(0) as number): boolean {
  return (cp >= 0x61 && cp <= 0x7A) // a-z
    || (cp >= 0x41 && cp <= 0x5A) // A-Z
    || cp === 0x3A // :
    || cp === 0x5F // _
    || (cp >= 0xC0 && cp <= 0xD6)
    || (cp >= 0xD8 && cp <= 0xF6)
    || (cp >= 0xF8 && cp <= 0x2FF)
    || (cp >= 0x370 && cp <= 0x37D)
    || (cp >= 0x37F && cp <= 0x1FFF)
    || cp === 0x200C
    || cp === 0x200D
    || (cp >= 0x2070 && cp <= 0x218F)
    || (cp >= 0x2C00 && cp <= 0x2FEF)
    || (cp >= 0x3001 && cp <= 0xD7FF)
    || (cp >= 0xF900 && cp <= 0xFDCF)
    || (cp >= 0xFDF0 && cp <= 0xFFFD)
    || (cp >= 0x10000 && cp <= 0xEFFFF);
}

/**
 * Returns `true` if _char_ is a valid reference character (which may appear
 * between `&` and `;` in a reference), `false` otherwise.
 *
 * @see https://www.w3.org/TR/2008/REC-xml-20081126/#sec-references
 */
export function isReferenceChar(char: string): boolean {
  return char === '#' || isNameChar(char);
}

/**
 * Returns `true` if _char_ is an XML whitespace character, `false` otherwise.
 *
 * @see https://www.w3.org/TR/2008/REC-xml-20081126/#white
 */
export function isWhitespace(char: string): boolean {
  let cp = char.codePointAt(0);

  return cp === 0x20
    || cp === 0x9
    || cp === 0xA
    || cp === 0xD;
}

/**
 * Returns `true` if _codepoint_ is a valid XML `Char` code point, `false`
 * otherwise.
 *
 * @see https://www.w3.org/TR/2008/REC-xml-20081126/#NT-Char
 */
export function isXmlCodePoint(cp: number): boolean {
  return (cp >= 0x20 && cp <= 0xD7FF)
    || cp === 0xA
    || cp === 0x9
    || cp === 0xD
    || (cp >= 0xE000 && cp <= 0xFFFD)
    || (cp >= 0x10000 && cp <= 0x10FFFF);
}
