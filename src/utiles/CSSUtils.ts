export function addCssUnit(value: number, unit: 'px' | 'rem' | 'vh' | 'vw' | 'vmin' | 'vmax' | '%' = 'px') {
    return `${value}${unit}`;
  }