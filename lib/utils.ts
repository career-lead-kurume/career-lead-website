/**
 * 電話番号文字列から `tel:` リンク用の href を生成する。
 * ハイフン・空白を除去した数値列にする。
 */
export function telHref(tel: string): string {
  return `tel:${tel.replace(/[-\s]/g, "")}`;
}
