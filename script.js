// ============================================================
//  トモコレ ペイントカラーガイド - script.js
//  Made by hiro / ヒロ  https://github.com/h1ro223
// ============================================================

// ============================================================
//  カラーパレット定義（ゲーム内カラーパレットの正確な配置）
//  12列 × 7行 = 84色 (row:0〜6, col:0〜11)
//  col0 = グレー/白
//  col1 = ラベンダー（薄紫）
//  col2 = パープル（紫）
//  col3 = ブルー（青）
//  col4 = シアン/ティール
//  col5 = グリーン（緑）
//  col6 = イエローグリーン（黄緑）
//  col7 = イエロー（黄）
//  col8 = オレンジ（橙）
//  col9 = レッド/ピンク（赤/ピンク）
//  col10 = ブラウン/ベージュ（茶/肌色系）
//  col11 = アクセント純色（右端の鮮やか列）
// ============================================================
const PALETTE = [
  // row 0 - 最も明るい（白〜ごく淡い色）
  { h:'#FFFFFF', row:0, col:0  }, { h:'#F2EEFF', row:0, col:1  }, { h:'#EAE8FF', row:0, col:2  },
  { h:'#E5EEFF', row:0, col:3  }, { h:'#DDFAF4', row:0, col:4  }, { h:'#DDFFD5', row:0, col:5  },
  { h:'#FAFFD5', row:0, col:6  }, { h:'#FFF6E0', row:0, col:7  }, { h:'#FFE8E0', row:0, col:8  },
  { h:'#FFE0DC', row:0, col:9  }, { h:'#F0DECE', row:0, col:10 }, { h:'#FF1111', row:0, col:11 },

  // row 1 - 明るいパステル
  { h:'#DDDDDD', row:1, col:0  }, { h:'#DDCCFF', row:1, col:1  }, { h:'#C8CCFF', row:1, col:2  },
  { h:'#BDD0FF', row:1, col:3  }, { h:'#AAEEDD', row:1, col:4  }, { h:'#BBFFBB', row:1, col:5  },
  { h:'#E0FFAA', row:1, col:6  }, { h:'#FFFFAA', row:1, col:7  }, { h:'#FFDAAA', row:1, col:8  },
  { h:'#FFB8B8', row:1, col:9  }, { h:'#F0C8A0', row:1, col:10 }, { h:'#FFFF00', row:1, col:11 },

  // row 2 - ライトトーン
  { h:'#BBBBBB', row:2, col:0  }, { h:'#CCAAFF', row:2, col:1  }, { h:'#AAAAFF', row:2, col:2  },
  { h:'#88BBFF', row:2, col:3  }, { h:'#55DDCC', row:2, col:4  }, { h:'#88EE88', row:2, col:5  },
  { h:'#CCEE66', row:2, col:6  }, { h:'#EEEE55', row:2, col:7  }, { h:'#FFBB55', row:2, col:8  },
  { h:'#FF8888', row:2, col:9  }, { h:'#DDA860', row:2, col:10 }, { h:'#00DD00', row:2, col:11 },

  // row 3 - ビビッド（最も鮮やか）
  { h:'#999999', row:3, col:0  }, { h:'#AA33EE', row:3, col:1  }, { h:'#5544DD', row:3, col:2  },
  { h:'#2277EE', row:3, col:3  }, { h:'#00BBAA', row:3, col:4  }, { h:'#33CC33', row:3, col:5  },
  { h:'#99CC00', row:3, col:6  }, { h:'#EEEE00', row:3, col:7  }, { h:'#FF8800', row:3, col:8  },
  { h:'#EE3333', row:3, col:9  }, { h:'#BB7733', row:3, col:10 }, { h:'#00CCFF', row:3, col:11 },

  // row 4 - ミディアムダーク
  { h:'#777777', row:4, col:0  }, { h:'#882299', row:4, col:1  }, { h:'#3333BB', row:4, col:2  },
  { h:'#1166BB', row:4, col:3  }, { h:'#008888', row:4, col:4  }, { h:'#228833', row:4, col:5  },
  { h:'#778800', row:4, col:6  }, { h:'#AAAA00', row:4, col:7  }, { h:'#CC6600', row:4, col:8  },
  { h:'#CC2222', row:4, col:9  }, { h:'#996633', row:4, col:10 }, { h:'#0000CC', row:4, col:11 },

  // row 5 - ダーク
  { h:'#555555', row:5, col:0  }, { h:'#550077', row:5, col:1  }, { h:'#220088', row:5, col:2  },
  { h:'#003399', row:5, col:3  }, { h:'#005566', row:5, col:4  }, { h:'#116622', row:5, col:5  },
  { h:'#445500', row:5, col:6  }, { h:'#777700', row:5, col:7  }, { h:'#884400', row:5, col:8  },
  { h:'#881111', row:5, col:9  }, { h:'#774422', row:5, col:10 }, { h:'#6600AA', row:5, col:11 },

  // row 6 - 最も暗い（黒〜極暗色）
  { h:'#000000', row:6, col:0  }, { h:'#220033', row:6, col:1  }, { h:'#110044', row:6, col:2  },
  { h:'#001155', row:6, col:3  }, { h:'#003333', row:6, col:4  }, { h:'#002200', row:6, col:5  },
  { h:'#223300', row:6, col:6  }, { h:'#332200', row:6, col:7  }, { h:'#331100', row:6, col:8  },
  { h:'#220000', row:6, col:9  }, { h:'#221100', row:6, col:10 }, { h:'#FF00BB', row:6, col:11 },
];

// hex文字列 → {r,g,b} 変換
function hexToRgb(hex) {
  const v = parseInt(hex.replace('#',''), 16);
  return { r: (v >> 16) & 255, g: (v >> 8) & 255, b: v & 255 };
}

// RGB → HEX
function rgbToHex(r, g, b) {
  return '#' + [r,g,b].map(x => x.toString(16).padStart(2,'0').toUpperCase()).join('');
}

// RGB → HSV (h:0-360, s:0-100, v:0-100)
function rgbToHsv(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r,g,b), min = Math.min(r,g,b), d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r)      h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else                h = (r - g) / d + 4;
    h = Math.round(h * 60);
    if (h < 0) h += 360;
  }
  const s = max === 0 ? 0 : Math.round((d / max) * 100);
  const v = Math.round(max * 100);
  return { h, s, v };
}

// 知覚的色距離（重み付きRGB）
function colorDist(r1,g1,b1, r2,g2,b2) {
  const rm = (r1+r2)/2;
  const dr = r1-r2, dg = g1-g2, db = b1-b2;
  return Math.sqrt((2+rm/256)*dr*dr + 4*dg*dg + (2+(255-rm)/256)*db*db);
}

// ============================================================
//  状態
// ============================================================
let zoom = 1;
let imgData = null;
let currentMode = 'palette';
let closestIdx  = -1;
let rulerEnabled = false;
let lastSelPx = -1, lastSelPy = -1;

const ZOOM_STEPS = [1,2,4,8,12,16];

// ============================================================
//  DOM参照
// ============================================================
const dropZone     = document.getElementById('drop-zone');
const fileInput    = document.getElementById('file-input');
const uploadSec    = document.getElementById('upload-section');
const mainContent  = document.getElementById('main-content');
const pixelCanvas  = document.getElementById('pixel-canvas');
const overlayCanvas= document.getElementById('overlay-canvas');
const zoomLabel    = document.getElementById('zoom-label');
const zoomIn       = document.getElementById('zoom-in');
const zoomOut      = document.getElementById('zoom-out');
const resetBtn     = document.getElementById('reset-btn');
const noSelectMsg  = document.getElementById('no-select-msg');
const colorInfo    = document.getElementById('color-info');
const imgInfoEl    = document.getElementById('img-info');

// ============================================================
//  画像読み込み
// ============================================================
dropZone.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', e => loadImageFile(e.target.files[0]));

dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('dragover'); });
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
dropZone.addEventListener('drop', e => {
  e.preventDefault();
  dropZone.classList.remove('dragover');
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) loadImageFile(file);
});

resetBtn.addEventListener('click', () => {
  uploadSec.classList.remove('hidden');
  mainContent.classList.add('hidden');
  imgData = null;
  fileInput.value = '';
  noSelectMsg.classList.remove('hidden');
  colorInfo.classList.add('hidden');
});

function loadImageFile(file) {
  if (!file) return;
  const url = URL.createObjectURL(file);
  const img = new Image();
  img.onload = () => {
    const tmp = document.createElement('canvas');
    tmp.width = img.width; tmp.height = img.height;
    tmp.getContext('2d').drawImage(img, 0, 0);
    const ctx = tmp.getContext('2d');
    imgData = {
      width: img.width,
      height: img.height,
      data: ctx.getImageData(0,0,img.width,img.height).data,
    };
    URL.revokeObjectURL(url);

    // 画像サイズに合わせて初期ズームを設定（最大16×）
    if (img.width <= 16 && img.height <= 16) {
      zoom = 16;
    } else if (img.width <= 32 && img.height <= 32) {
      zoom = 8;
    } else if (img.width <= 64 && img.height <= 64) {
      zoom = 4;
    } else {
      zoom = 1;
    }

    // 画像情報表示
    imgInfoEl.textContent = `${img.width}×${img.height}px（${img.width * img.height}ピクセル）`;
    if (img.width === 16 && img.height === 16) {
      imgInfoEl.textContent += ' ✅ トモコレペイント対応サイズ';
    }

    setupCanvases();
    buildPaletteGrid();
    uploadSec.classList.add('hidden');
    mainContent.classList.remove('hidden');
  };
  img.src = url;
}

// ============================================================
//  キャンバス描画
// ============================================================
function setupCanvases() {
  renderPixelCanvas();
}

function renderPixelCanvas() {
  if (!imgData) return;
  const w = imgData.width, h = imgData.height;
  pixelCanvas.width  = w * zoom;
  pixelCanvas.height = h * zoom;
  overlayCanvas.width  = w * zoom;
  overlayCanvas.height = h * zoom;

  const ctx = pixelCanvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const r = imgData.data[i], g = imgData.data[i+1], b = imgData.data[i+2], a = imgData.data[i+3];
      if (a < 10) continue;
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(x * zoom, y * zoom, zoom, zoom);
    }
  }

  // グリッド線（zoom>=4のとき）
  if (zoom >= 4) {
    ctx.strokeStyle = 'rgba(0,0,0,0.15)';
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= w; x++) {
      ctx.beginPath(); ctx.moveTo(x*zoom, 0); ctx.lineTo(x*zoom, h*zoom); ctx.stroke();
    }
    for (let y = 0; y <= h; y++) {
      ctx.beginPath(); ctx.moveTo(0, y*zoom); ctx.lineTo(w*zoom, y*zoom); ctx.stroke();
    }
  }

  // ルーラー（有効時）
  if (rulerEnabled) drawRuler(ctx, w, h);

  zoomLabel.textContent = zoom + '×';
}

// ============================================================
//  ルーラー描画（中心ガイド＋座標番号）
// ============================================================
function drawRuler(ctx, w, h) {
  ctx.save();

  // 中心ピクセル（16×16なら8と9の間＝8列目の右端）
  const cx = w / 2; // ピクセル境界
  const cy = h / 2;

  // 中心縦線
  ctx.strokeStyle = 'rgba(255, 100, 0, 0.8)';
  ctx.lineWidth = Math.max(1, zoom <= 2 ? 1 : 2);
  ctx.setLineDash([Math.max(3, zoom), Math.max(2, zoom * 0.5)]);
  ctx.beginPath();
  ctx.moveTo(cx * zoom, 0);
  ctx.lineTo(cx * zoom, h * zoom);
  ctx.stroke();

  // 中心横線
  ctx.beginPath();
  ctx.moveTo(0, cy * zoom);
  ctx.lineTo(w * zoom, cy * zoom);
  ctx.stroke();

  ctx.setLineDash([]);

  // 座標番号（zoom >= 8 のとき）
  if (zoom >= 8) {
    const fs = Math.min(Math.floor(zoom * 0.55), 11);
    ctx.font = `bold ${fs}px monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // 列番号（上端）
    for (let x = 0; x < w; x++) {
      const label = String(x + 1);
      const px = x * zoom + zoom / 2;
      const py = zoom / 2;
      const isCenter = (x === cx - 1 || x === cx);
      // 背景
      ctx.fillStyle = isCenter ? 'rgba(255,120,0,0.85)' : 'rgba(255,255,255,0.75)';
      ctx.fillRect(px - fs * 0.55, py - fs * 0.65, fs * 1.1, fs * 1.3);
      ctx.fillStyle = isCenter ? '#fff' : '#333';
      ctx.fillText(label, px, py);
    }

    // 行番号（左端）
    ctx.textAlign = 'center';
    for (let y = 0; y < h; y++) {
      const label = String(y + 1);
      const px = zoom / 2;
      const py = y * zoom + zoom / 2;
      const isCenter = (y === cy - 1 || y === cy);
      ctx.fillStyle = isCenter ? 'rgba(255,120,0,0.85)' : 'rgba(255,255,255,0.75)';
      ctx.fillRect(px - fs * 0.55, py - fs * 0.65, fs * 1.1, fs * 1.3);
      ctx.fillStyle = isCenter ? '#fff' : '#333';
      ctx.fillText(label, px, py);
    }
  } else if (zoom >= 4) {
    // zoom4〜7は中心に「C」マーカーだけ
    const px = cx * zoom;
    const py = cy * zoom;
    ctx.fillStyle = 'rgba(255,100,0,0.9)';
    ctx.beginPath();
    ctx.arc(px, py, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 7px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('C', px, py);
  } else {
    // zoom1〜3は中心に小さな点だけ
    const px = cx * zoom;
    const py = cy * zoom;
    ctx.fillStyle = 'rgba(255,100,0,0.9)';
    ctx.beginPath();
    ctx.arc(px, py, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

// ルーラートグル
function toggleRuler() {
  rulerEnabled = !rulerEnabled;
  const btn = document.getElementById('ruler-btn');
  btn.classList.toggle('active', rulerEnabled);
  renderPixelCanvas();
  // 選択中のピクセルがあればオーバーレイも再描画
  if (lastSelPx >= 0) drawSelectionOverlay(lastSelPx, lastSelPy);
}

// ============================================================
//  ズームコントロール
// ============================================================
zoomIn.addEventListener('click', () => {
  const idx = ZOOM_STEPS.indexOf(zoom);
  if (idx < ZOOM_STEPS.length - 1) { zoom = ZOOM_STEPS[idx+1]; renderPixelCanvas(); }
});
zoomOut.addEventListener('click', () => {
  const idx = ZOOM_STEPS.indexOf(zoom);
  if (idx > 0) { zoom = ZOOM_STEPS[idx-1]; renderPixelCanvas(); }
});

// ============================================================
//  クリック / タップでピクセル選択
// ============================================================
function handleCanvasClick(e) {
  if (!imgData) return;
  const rect = pixelCanvas.getBoundingClientRect();
  let cx, cy;
  if (e.touches) {
    cx = e.touches[0].clientX - rect.left;
    cy = e.touches[0].clientY - rect.top;
  } else {
    cx = e.clientX - rect.left;
    cy = e.clientY - rect.top;
  }
  const px = Math.floor(cx / zoom);
  const py = Math.floor(cy / zoom);
  if (px < 0 || py < 0 || px >= imgData.width || py >= imgData.height) return;

  const idx = (py * imgData.width + px) * 4;
  const r = imgData.data[idx], g = imgData.data[idx+1], b = imgData.data[idx+2], a = imgData.data[idx+3];
  if (a < 10) return;

  selectColor(r, g, b, px, py);
}

pixelCanvas.addEventListener('click', handleCanvasClick);
pixelCanvas.addEventListener('touchstart', e => { e.preventDefault(); handleCanvasClick(e); }, { passive: false });

// ============================================================
//  選択色の処理
// ============================================================
function selectColor(r, g, b, px, py) {
  const hex = rgbToHex(r, g, b);
  const hsv = rgbToHsv(r, g, b);

  document.getElementById('selected-swatch').style.background = hex;
  document.getElementById('hex-val').textContent = hex;
  document.getElementById('rgb-val').textContent = `${r}, ${g}, ${b}`;
  document.getElementById('hsv-val').textContent = `${hsv.h}°, ${hsv.s}%, ${hsv.v}%`;

  // ピクセル座標表示
  const posEl = document.getElementById('pixel-pos');
  if (px >= 0 && py >= 0) {
    posEl.textContent = `X:${px+1} Y:${py+1}`;
  } else {
    posEl.textContent = '-';
  }

  // カラーパレット最近傍探索
  let bestDist = Infinity, bestIdx = 0;
  PALETTE.forEach((p, i) => {
    const c = hexToRgb(p.h);
    const d = colorDist(r, g, b, c.r, c.g, c.b);
    if (d < bestDist) { bestDist = d; bestIdx = i; }
  });
  closestIdx = bestIdx;
  updatePaletteHighlight(bestIdx, bestDist);

  // フルカラーガイド更新
  updateFullColorGuide(hsv, r, g, b);

  // オーバーレイ描画
  if (px >= 0) {
    lastSelPx = px; lastSelPy = py;
    drawSelectionOverlay(px, py);
  }

  noSelectMsg.classList.add('hidden');
  colorInfo.classList.remove('hidden');
}

// ============================================================
//  オーバーレイ（選択ピクセル枠）
// ============================================================
function drawSelectionOverlay(px, py) {
  const ctx = overlayCanvas.getContext('2d');
  ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
  ctx.strokeStyle = '#FF9E00';
  ctx.lineWidth = Math.max(2, zoom * 0.3);
  ctx.strokeRect(px * zoom, py * zoom, zoom, zoom);
  ctx.strokeStyle = 'rgba(0,0,0,0.6)';
  ctx.lineWidth = 1;
  ctx.strokeRect(px * zoom - 1, py * zoom - 1, zoom + 2, zoom + 2);
}

// ============================================================
//  パレットグリッド構築
// ============================================================
function buildPaletteGrid() {
  const grid = document.getElementById('palette-grid');
  grid.innerHTML = '';
  PALETTE.forEach((p, i) => {
    const cell = document.createElement('div');
    cell.className = 'palette-cell';
    cell.style.background = p.h;
    cell.title = `${p.h}\n${p.row+1}行目 ${p.col+1}列目`;
    cell.dataset.idx = i;
    grid.appendChild(cell);
  });
}

function updatePaletteHighlight(bestIdx, bestDist) {
  document.querySelectorAll('.palette-cell').forEach((cell, i) => {
    cell.classList.toggle('closest', i === bestIdx);
  });
  const best = PALETTE[bestIdx];
  document.getElementById('closest-swatch').style.background = best.h;
  document.getElementById('closest-hex').textContent = best.h.toUpperCase();
  document.getElementById('closest-pos').textContent = `${best.row+1}行目 ${best.col+1}列目`;
  document.getElementById('closest-dist').textContent = Math.round(bestDist) + ' (低いほど近い)';
}

// ============================================================
//  フルカラーガイド更新
//  ゲーム内スライダー配置:
//    ZL(左端)=赤(0°) → 反時計回りに一周 → ZR(右端)=赤(360°/0°)
//    左: 赤→マゼンタ→青  中央: シアン(180°)  右: 緑→黄→赤
//    hue→pos変換: pos = ((360 - hue) % 360) / 360
// ============================================================
function updateFullColorGuide(hsv, r, g, b) {
  const { h, s, v } = hsv;

  // --- 色相スライダー位置 ---
  // hue 0°(赤)=左端(0%), hue 180°(シアン)=中央(50%), hue 359°=右端付近(≈100%)
  let huePos;
  if (h === 0) {
    huePos = 0; // 赤 → 左端
  } else {
    huePos = ((360 - h) % 360) / 360;
  }
  const huePct = Math.round(huePos * 100);

  document.getElementById('hue-indicator').style.left = huePct + '%';
  document.getElementById('hue-num').textContent = h;
  document.getElementById('hue-pos').textContent = huePct;

  // --- SV正方形描画 ---
  drawSvSquare(h);
  const svCanvas = document.getElementById('sv-canvas');
  const sx = (s / 100) * svCanvas.width;
  const sy = ((100 - v) / 100) * svCanvas.height;
  const ind = document.getElementById('sv-indicator');
  ind.style.left = sx + 'px';
  ind.style.top  = sy + 'px';

  document.getElementById('sat-num').textContent = s;
  document.getElementById('val-num').textContent = v;

  // --- ステップ説明 ---
  const stepsBox = document.getElementById('steps-box');
  const posDesc = huePct <= 10 ? 'かなり左端 (ZL側・赤)' :
                  huePct <= 25 ? '左寄り (マゼンタ〜青)' :
                  huePct <= 40 ? 'やや左 (青〜シアン)' :
                  huePct <= 60 ? '中央あたり (シアン)' :
                  huePct <= 75 ? 'やや右 (緑)' :
                  huePct <= 90 ? '右寄り (黄〜オレンジ)' : 'かなり右端 (ZR側)';
  const satDesc = s <= 10 ? 'かなり左端（ほぼ白/灰）' :
                  s <= 30 ? '左寄り（淡い色）' :
                  s <= 70 ? '中央あたり' :
                  s <= 90 ? '右寄り（濃い色）' : 'かなり右端（鮮やか）';
  const valDesc = v >= 90 ? 'かなり上端（明るい）' :
                  v >= 70 ? '上寄り（明るめ）' :
                  v >= 40 ? '中央あたり' :
                  v >= 20 ? '下寄り（暗め）' : 'かなり下端（暗い）';

  stepsBox.innerHTML = `
    <div class="step"><span class="step-num">1</span><span>「フルカラー」タブを選択する</span></div>
    <div class="step"><span class="step-num">2</span><span>色相スライダーを <strong>${posDesc}</strong> (${huePct}%) に動かす → 色相 ${h}°</span></div>
    <div class="step"><span class="step-num">3</span><span>正方形の横位置: <strong>${satDesc}</strong> (彩度 ${s}%)</span></div>
    <div class="step"><span class="step-num">4</span><span>正方形の縦位置: <strong>${valDesc}</strong> (明度 ${v}%)</span></div>
  `;
}

function drawSvSquare(hue) {
  const canvas = document.getElementById('sv-canvas');
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.fillRect(0, 0, W, H);

  const gradS = ctx.createLinearGradient(0, 0, W, 0);
  gradS.addColorStop(0, 'rgba(255,255,255,1)');
  gradS.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = gradS;
  ctx.fillRect(0, 0, W, H);

  const gradV = ctx.createLinearGradient(0, 0, 0, H);
  gradV.addColorStop(0, 'rgba(0,0,0,0)');
  gradV.addColorStop(1, 'rgba(0,0,0,1)');
  ctx.fillStyle = gradV;
  ctx.fillRect(0, 0, W, H);
}

// ============================================================
//  タブ切替
// ============================================================
function switchTab(mode) {
  currentMode = mode;
  document.getElementById('tab-palette').classList.toggle('active', mode === 'palette');
  document.getElementById('tab-fullcolor').classList.toggle('active', mode === 'fullcolor');
  document.getElementById('mode-palette').classList.toggle('hidden', mode !== 'palette');
  document.getElementById('mode-fullcolor').classList.toggle('hidden', mode !== 'fullcolor');
}

// ============================================================
//  初期化
// ============================================================
buildPaletteGrid();
