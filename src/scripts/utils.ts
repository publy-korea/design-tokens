
export type IconaDataType = {
  [name: string]: {
    svg: string;
    name: string;
    png: Record<string, string>;
  };
};

export type TransformedIconsType = {
  [name: string]: {
    [type: string]: string;
  };
}

export function toPascalCase(str: string) {
  return str
    .replace(/([-_][a-z0-9])/g, group => group.replace('-', '').replace('_', '').toUpperCase())
    .replace(/^[a-z]/, firstLetter => firstLetter.toUpperCase());
}

/**
 * Remove fill attribute from svg tag string
 */
export function removeFillAttribute(svgString: string): string {
  const fillRegex = /\sfill="[^"]*"/g;
  return svgString.replace(fillRegex, '');
}

/**
 * Get inner html (<g/>, <path/>, ...) of svg tag string
 */
export const getSvgInnerHTML = (svgString: string): string | undefined => {
  const svgRegex = /<svg[^>]*>([\s\S]*?)<\/svg>/;
  const svgMatch = svgString.match(svgRegex);
  if (svgMatch) {
    return svgMatch[1];
  }
  return undefined;
}