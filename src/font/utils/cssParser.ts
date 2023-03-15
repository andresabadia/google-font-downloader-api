import { CSSFontFace } from '../models/CSSFontFace';

/**
 * parces the css response from google to a js object
 * @param css css string retrive from https://fonts.googleapis.com/css2
 * @returns an array of js objects with the readable properties
 */
export function cssParser(css: string): CSSFontFace[] {
  // split the file into an array with different fonts
  let fonts = css.split('}\n');
  fonts.pop();
  // remove the initial @font-face selector from the css
  fonts = fonts.map((f) => f.replace('@font-face {\n', ''));
  const fontsObject: CSSFontFace[] = [];
  // loop through every font to get the properties
  fonts.forEach((font, index) => {
    // split the properties of every font to an array
    const fontProps = font.split(';\n');
    fontProps.pop();
    // loop to every property to get it's key and value
    fontProps.forEach((fontProp) => {
      // split the key value sting into it's values
      const keyValueProp = fontProp.trim().split(': ');
      const key = keyValueProp[0];
      const value = keyValueProp[1];
      if (key === 'src') {
        const src = value.split(' ');
        const srcValue = {
          url: src[0].replace('url(', '').replace(')', ''),
          format: src[1].replace("format('", '').replace("')", ''),
        };
        fontsObject[index] = {
          ...fontsObject[index],
          [kebabToDromedaryCase(key)]: srcValue,
        };
      } else {
        fontsObject[index] = {
          ...fontsObject[index],
          [kebabToDromedaryCase(key)]: value,
        };
      }
    });
  });

  return fontsObject;
}

function kebabToDromedaryCase(kebab: string): string {
  let dromedary = '';
  kebab.split('-').forEach((w, i) => {
    if (i < 1) {
      dromedary += w;
    } else {
      dromedary += w.charAt(0).toUpperCase() + w.slice(1);
    }
  });
  return dromedary;
}
