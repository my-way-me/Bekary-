export function toBn(num: number | string): string {
  const d: Record<string, string> = {
    "0": "০",
    "1": "১",
    "2": "২",
    "3": "৩",
    "4": "৪",
    "5": "৫",
    "6": "৬",
    "7": "৭",
    "8": "৮",
    "9": "৯",
  };
  return String(num).replace(/[0-9]/g, (w) => d[w]);
}

export const WA_NUMBER = "8801764411168";

export function waLink(msg: string): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

export function LS<T>(k: string, d: T): T {
  try {
    const v = localStorage.getItem("bas_" + k);
    return v ? (JSON.parse(v) as T) : d;
  } catch {
    return d;
  }
}

export function SS<T>(k: string, v: T): void {
  try {
    localStorage.setItem("bas_" + k, JSON.stringify(v));
  } catch {
    /* ignore */
  }
}
