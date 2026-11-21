// Draws the customer's label onto a packaging photo, inside the area the owner marked.
// Bands (jars, bottles, tubes) wrap around the body with cylinder foreshortening;
// ellipses (aluminium lids) take a round label seen at an angle.
import type { LabelArea } from '../data/photos';

const NAVY = '#1B2A4E';

export interface LabelContent {
  text?: string;
  logo?: HTMLImageElement | null;
  date?: string;
}

function lerp(xs: number[], ys: number[], x: number) {
  if (x <= xs[0]) return ys[0];
  for (let i = 1; i < xs.length; i++) {
    if (x <= xs[i]) {
      const t = (x - xs[i - 1]) / (xs[i] - xs[i - 1] || 1);
      return ys[i - 1] + (ys[i] - ys[i - 1]) * t;
    }
  }
  return ys[ys.length - 1];
}

function fitFont(c: CanvasRenderingContext2D, text: string, start: number, weight: string, family: string, maxW: number) {
  let size = start;
  c.font = `${weight} ${size}px ${family}`;
  while (c.measureText(text).width > maxW && size > 10) {
    size -= 1;
    c.font = `${weight} ${size}px ${family}`;
  }
}

/** The flat label artwork (white, navy border, front text or logo, date below). */
function artwork(w: number, h: number, content: LabelContent, round: boolean) {
  const cv = document.createElement('canvas');
  cv.width = Math.max(1, Math.round(w));
  cv.height = Math.max(1, Math.round(h));
  const c = cv.getContext('2d')!;
  const W = cv.width, H = cv.height;
  c.fillStyle = '#fff';
  if (round) {
    c.beginPath();
    c.arc(W / 2, H / 2, Math.min(W, H) / 2, 0, Math.PI * 2);
    c.fill();
  } else c.fillRect(0, 0, W, H);
  c.strokeStyle = NAVY;
  c.lineWidth = Math.max(2, Math.min(W, H) * 0.025);
  if (round) {
    c.beginPath();
    c.arc(W / 2, H / 2, Math.min(W, H) / 2 - c.lineWidth * 2, 0, Math.PI * 2);
    c.stroke();
  } else {
    const p = Math.min(W, H) * 0.07;
    c.strokeRect(p, p, W - p * 2, H - p * 2);
  }
  const boxW = round ? W * 0.68 : W * 0.78;
  const hasDate = !!content.date;
  const frontY = hasDate ? H * 0.43 : H * 0.5;
  c.textAlign = 'center';
  c.textBaseline = 'middle';
  if (content.logo && content.logo.naturalWidth) {
    const maxH = H * (hasDate ? 0.42 : 0.6);
    const r = Math.min(boxW / content.logo.naturalWidth, maxH / content.logo.naturalHeight);
    const lw = content.logo.naturalWidth * r, lh = content.logo.naturalHeight * r;
    c.drawImage(content.logo, W / 2 - lw / 2, frontY - lh / 2, lw, lh);
  } else {
    const text = (content.text || 'Your names').trim();
    fitFont(c, text, H * 0.3, '400', '"Young Serif", Georgia, serif', boxW);
    c.fillStyle = content.text ? NAVY : 'rgba(27,42,78,0.35)';
    c.fillText(text, W / 2, frontY);
  }
  if (hasDate) {
    fitFont(c, content.date!, H * 0.13, '700', '"DM Sans", system-ui, sans-serif', boxW * 0.6);
    c.fillStyle = NAVY;
    c.fillText(content.date!, W / 2, H * (round ? 0.7 : 0.74));
  }
  return cv;
}

/** Paint photo + label onto `out` (sized to the photo). */
export function paint(out: HTMLCanvasElement, photo: HTMLImageElement, area: LabelArea, content: LabelContent) {
  const W = photo.naturalWidth, H = photo.naturalHeight;
  out.width = W;
  out.height = H;
  const c = out.getContext('2d')!;
  c.drawImage(photo, 0, 0, W, H);

  if (area.kind === 'ellipse') {
    const rx = area.rx * W, ry = area.ry * H;
    const art = artwork(rx * 2, rx * 2, content, true);
    c.save();
    c.translate(area.cx * W, area.cy * H);
    c.scale(1, ry / rx);
    c.drawImage(art, -rx, -rx);
    c.restore();
    return;
  }

  const x0 = area.xs[0] * W, x1 = area.xs[area.xs.length - 1] * W;
  const cx = (x0 + x1) / 2, r = (x1 - x0) / 2;
  const midTop = lerp(area.xs, area.top, 0.5 * (area.xs[0] + area.xs[area.xs.length - 1])) * H;
  const midBot = lerp(area.xs, area.bot, 0.5 * (area.xs[0] + area.xs[area.xs.length - 1])) * H;
  const bandH = midBot - midTop;
  // Visible front of the cylinder is half its circumference: π·r wide when unrolled.
  const art = artwork(Math.PI * r, bandH, content, false);
  const shade = c.createLinearGradient(x0, 0, x1, 0);
  shade.addColorStop(0, 'rgba(0,0,0,0.28)');
  shade.addColorStop(0.18, 'rgba(0,0,0,0.06)');
  shade.addColorStop(0.5, 'rgba(0,0,0,0)');
  shade.addColorStop(0.82, 'rgba(0,0,0,0.06)');
  shade.addColorStop(1, 'rgba(0,0,0,0.28)');
  for (let x = Math.ceil(x0); x < x1; x++) {
    const s = Math.max(-1, Math.min(1, (x + 0.5 - cx) / r));
    const u = (Math.asin(s) / Math.PI + 0.5) * art.width; // where this column sits on the unrolled label
    const s2 = Math.max(-1, Math.min(1, (x + 1.5 - cx) / r));
    const u2 = (Math.asin(s2) / Math.PI + 0.5) * art.width;
    const t = lerp(area.xs, area.top, x / W) * H;
    const b = lerp(area.xs, area.bot, x / W) * H;
    c.drawImage(art, u, 0, Math.max(0.5, u2 - u), art.height, x, t, 1, b - t);
  }
  // soft roll-off at the sides so it sits on the curve
  c.save();
  c.globalCompositeOperation = 'source-atop';
  c.beginPath();
  for (let i = 0; i < area.xs.length; i++) c.lineTo(area.xs[i] * W, area.top[i] * H);
  for (let i = area.xs.length - 1; i >= 0; i--) c.lineTo(area.xs[i] * W, area.bot[i] * H);
  c.closePath();
  c.clip();
  c.fillStyle = shade;
  c.fillRect(x0, 0, x1 - x0, H);
  c.restore();
}
