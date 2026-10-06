export function isHexLike(input: string): boolean {
  const v = input.trim();
  return v === '' || v === '#' || /^#?[0-9a-fA-F]{0,6}$/.test(v);
}

export function isValidHex(input: string): boolean {
  const v = input.trim();
  return /^#[0-9a-fA-F]{6}$/.test(v) || /^#[0-9a-fA-F]{3}$/.test(v);
}

/**
 * Normalize a hex color string.
 * - Accepts '#RGB' / '#RRGGBB' / 'RGB' / 'RRGGBB'
 * - Returns normalized '#rrggbb'
 * - Returns null if it can't be normalized
 */
export function normalizeHex(input: string): string | null {
  let v = input.trim();
  if (!v) return null;
  if (!v.startsWith('#')) v = `#${v}`;
  v = v.toLowerCase();

  if (/^#[0-9a-f]{3}$/.test(v)) {
    const r = v[1];
    const g = v[2];
    const b = v[3];
    return `#${r}${r}${g}${g}${b}${b}`;
  }
  if (/^#[0-9a-f]{6}$/.test(v)) return v;
  return null;
}

/**
 * 调整十六进制颜色的亮度
 * @param hexStr 颜色十六进制字符串，如 '#3b82f6' 或 '3b82f6'
 * @param factor 调整系数，>1 变亮，<1 变暗
 */
export function adjustHex(hexStr: string, factor: number): string {
  const clean = hexStr.replace('#', '');
  if (clean.length !== 6) return hexStr;
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  const adjust = (c: number) => Math.max(0, Math.min(255, Math.round(c * factor)));
  const nr = adjust(r);
  const ng = adjust(g);
  const nb = adjust(b);
  return `#${nr.toString(16).padStart(2, '0')}${ng.toString(16).padStart(2, '0')}${nb.toString(16).padStart(2, '0')}`;
}
