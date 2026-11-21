// Live 3D product preview. Loaded only on capable devices, after the page has painted.
// Every model is built in code (no downloads): jars, bottles and lip balm tubes.
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export type Kind = 'jar' | 'bottle' | 'tube';

export interface PreviewState {
  container: string; // e.g. "Black jar", "Clear", "White"
  lid?: string; // jars only: "Black" | "White"
  label: boolean;
  frontText?: string;
  logo?: HTMLImageElement | null;
  date?: string; // already formatted 12.12.2026
  fill: string; // colour of what is inside (visible through clear containers)
}

const NAVY = '#1B2A4E';

function colourOf(name: string) {
  const n = name.toLowerCase();
  if (n.includes('black')) return 'black';
  if (n.includes('white')) return 'white';
  return 'clear';
}

function shellMaterial(kind: 'black' | 'white' | 'clear') {
  if (kind === 'clear') {
    return new THREE.MeshPhysicalMaterial({
      color: 0xffffff, transmission: 0.92, roughness: 0.06, ior: 1.5, thickness: 0.25,
      metalness: 0, clearcoat: 1, clearcoatRoughness: 0.05, transparent: true,
    });
  }
  return new THREE.MeshPhysicalMaterial({
    color: kind === 'black' ? 0x151515 : 0xf3f3f1,
    roughness: kind === 'black' ? 0.28 : 0.38, clearcoat: 0.6, clearcoatRoughness: 0.2,
  });
}

function lathe(points: [number, number][], segments = 72) {
  return new THREE.LatheGeometry(points.map(([x, y]) => new THREE.Vector2(x, y)), segments);
}

/** Label band: an open cylinder slice facing the camera. Returns mesh + its canvas aspect. */
function labelBand(radius: number, height: number, y: number, arc: number) {
  const geo = new THREE.CylinderGeometry(radius, radius, height, 64, 1, true, -arc / 2, arc);
  const canvas = document.createElement('canvas');
  const aspect = (radius * arc) / height;
  canvas.height = 512;
  canvas.width = Math.round(512 * aspect);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  const mat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.55, side: THREE.FrontSide });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.y = y;
  return { mesh, canvas, tex };
}

function drawLabel(canvas: HTMLCanvasElement, s: PreviewState) {
  const c = canvas.getContext('2d')!;
  const CW = canvas.width, CH = canvas.height;
  c.setTransform(1, 0, 0, 1, 0, 0);
  c.fillStyle = '#ffffff';
  c.fillRect(0, 0, CW, CH);
  // Tall, narrow labels (lip balm) read along the tube, like the real thing.
  const vertical = CW < CH * 0.9;
  if (vertical) {
    c.translate(0, CH);
    c.rotate(-Math.PI / 2);
  }
  const W = vertical ? CH : CW, H = vertical ? CW : CH;
  const pad = Math.round(Math.min(W, H) * 0.06);
  c.strokeStyle = NAVY;
  c.lineWidth = Math.max(4, Math.min(W, H) * 0.014);
  c.strokeRect(pad, pad, W - pad * 2, H - pad * 2);
  const boxW = vertical ? W - pad * 4 : Math.min(W * 0.62, W - pad * 4);
  const cx = W / 2;
  const hasDate = !!s.date;
  const fit = (text: string, start: number, weight: string, family: string, maxW: number) => {
    let size = start;
    c.font = `${weight} ${size}px ${family}`;
    while (c.measureText(text).width > maxW && size > 12) {
      size -= 2;
      c.font = `${weight} ${size}px ${family}`;
    }
    return size;
  };
  c.textAlign = 'center';
  c.textBaseline = 'middle';
  const frontY = hasDate ? H * 0.42 : H * 0.5;
  if (s.logo && s.logo.naturalWidth) {
    const maxW = boxW, maxH = (hasDate ? H * 0.5 : H * 0.66);
    const r = Math.min(maxW / s.logo.naturalWidth, maxH / s.logo.naturalHeight);
    const w = s.logo.naturalWidth * r, h = s.logo.naturalHeight * r;
    c.drawImage(s.logo, cx - w / 2, frontY - h / 2, w, h);
  } else {
    const text = (s.frontText || 'Your names').trim();
    fit(text, H * 0.3, '400', '"Young Serif", Georgia, serif', boxW);
    c.fillStyle = s.frontText ? NAVY : 'rgba(27,42,78,0.35)';
    c.fillText(text, cx, frontY);
  }
  if (hasDate) {
    fit(s.date!, H * 0.12, '700', '"DM Sans", system-ui, sans-serif', boxW * 0.6);
    c.fillStyle = NAVY;
    c.fillText(s.date!, cx, H * 0.76);
  }
}

function buildModel(kind: Kind) {
  const group = new THREE.Group();
  const parts: { shell: THREE.Mesh[]; lid: THREE.Mesh[]; fill: THREE.Mesh[] } = { shell: [], lid: [], fill: [] };
  let band: ReturnType<typeof labelBand>;

  if (kind === 'jar') {
    const body = new THREE.Mesh(lathe([[0, 0], [0.98, 0], [1.04, 0.05], [1.05, 0.15], [1.05, 0.78], [0.97, 0.82], [0.97, 0.92], [0, 0.92]]));
    const fill = new THREE.Mesh(new THREE.CylinderGeometry(0.96, 0.96, 0.7, 64));
    fill.position.y = 0.43;
    const lid = new THREE.Mesh(lathe([[0, 1.24], [0.98, 1.24], [1.06, 1.2], [1.09, 1.12], [1.09, 0.88], [1.0, 0.86], [0, 0.86]]));
    parts.shell.push(body); parts.fill.push(fill); parts.lid.push(lid);
    band = labelBand(1.062, 0.52, 0.46, Math.PI * 0.95);
    group.add(fill, body, lid, band.mesh);
    group.position.y = -0.62;
  } else if (kind === 'bottle') {
    const body = new THREE.Mesh(lathe([[0, 0], [0.5, 0], [0.56, 0.06], [0.56, 1.5], [0.5, 1.68], [0.3, 1.82], [0.2, 1.88], [0.2, 2.02], [0, 2.02]]));
    const fill = new THREE.Mesh(lathe([[0, 0.05], [0.52, 0.05], [0.52, 1.45], [0, 1.45]]));
    const cap = new THREE.Mesh(lathe([[0, 2.42], [0.2, 2.42], [0.25, 2.38], [0.25, 1.98], [0, 1.98]]));
    parts.shell.push(body, cap); parts.fill.push(fill);
    band = labelBand(0.572, 0.95, 0.78, Math.PI * 0.9);
    group.add(fill, body, cap, band.mesh);
    group.position.y = -1.2;
  } else {
    const body = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 1.4, 48));
    body.position.y = 0.7;
    const fill = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 1.32, 32));
    fill.position.y = 0.7;
    const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.265, 0.265, 0.62, 48));
    cap.position.y = 1.72;
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.255, 0.255, 0.12, 48));
    base.position.y = 0.0;
    parts.shell.push(body, cap, base); parts.fill.push(fill);
    band = labelBand(0.268, 1.0, 0.72, Math.PI * 0.8);
    group.add(fill, body, cap, base, band.mesh);
    group.position.y = -1.0;
    group.scale.setScalar(1.25);
  }
  return { group, parts, band };
}

function shadowPlane() {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d')!;
  const grd = g.createRadialGradient(128, 128, 10, 128, 128, 128);
  grd.addColorStop(0, 'rgba(27,42,78,0.35)');
  grd.addColorStop(1, 'rgba(27,42,78,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, 256, 256);
  const m = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 3.4), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false }));
  m.rotation.x = -Math.PI / 2;
  return m;
}

export function mountPreview(canvas: HTMLCanvasElement, kind: Kind, initial: PreviewState) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
  const mobile = matchMedia('(max-width: 900px)').matches;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.add(new THREE.HemisphereLight(0xffffff, 0xffb8d1, 0.6));
  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(2, 4, 3);
  scene.add(key);

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
  camera.position.set(0, 0.6, 6.2);

  const { group, parts, band } = buildModel(kind);
  const shadow = shadowPlane();
  shadow.position.y = group.position.y - 0.001;
  scene.add(group, shadow);

  const controls = new OrbitControls(camera, canvas);
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.enableDamping = true;
  controls.minPolarAngle = Math.PI * 0.32;
  controls.maxPolarAngle = Math.PI * 0.55;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 1.2;
  controls.target.set(0, 0, 0);
  controls.addEventListener('start', () => (controls.autoRotate = false));

  let state = initial;
  let raf = 0;
  let visible = true;
  let dirty = true;

  function apply(s: PreviewState) {
    const shell = colourOf(s.container);
    parts.shell.forEach((m) => { (m.material as THREE.Material)?.dispose?.(); m.material = shellMaterial(shell); });
    const lidColour = s.lid ? colourOf(s.lid) : shell;
    parts.lid.forEach((m) => { m.material = shellMaterial(lidColour === 'clear' ? 'white' : lidColour); });
    parts.fill.forEach((m) => {
      m.material = new THREE.MeshStandardMaterial({ color: new THREE.Color(s.fill), roughness: 0.6 });
      m.visible = shell === 'clear';
    });
    band.mesh.visible = s.label;
    if (s.label) {
      drawLabel(band.canvas, s);
      band.tex.needsUpdate = true;
    }
    dirty = true;
  }

  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    dirty = true;
  }

  function loop() {
    raf = requestAnimationFrame(loop);
    if (!visible || document.hidden) return;
    const moved = controls.update();
    if (moved || controls.autoRotate || dirty) {
      renderer.render(scene, camera);
      dirty = false;
    }
  }

  const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
  io.observe(canvas);
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  // Wait for brand fonts so the label is drawn in Young Serif, not a fallback.
  const fontsReady = document.fonts
    ? Promise.all([document.fonts.load('40px "Young Serif"'), document.fonts.load("700 20px \"DM Sans\"")]).catch(() => {})
    : Promise.resolve();
  fontsReady.then(() => apply(state));
  apply(state);
  resize();
  loop();

  return {
    update(s: PreviewState) {
      state = s;
      apply(s);
    },
    destroy() {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      controls.dispose();
      renderer.dispose();
    },
  };
}
