// applyApproxCharmMask の type 分岐に追加する近似形状テンプレート
// flood-fill が失敗した時のフォールバックなので、見た目が多少ズレても
// 「とりあえず着色が乗る」状態を担保する。

// 既存例（参考）:
//   donut  → 円環: radius を (nx-cx)/rx, (ny-cy)/ry で正規化し outer/inner で挟む
//   candy  → 縦軸プロファイル: ny を t に正規化し candyHalfWidthByT(t) で幅判定
//   heart  → ハート曲線: (x²+y²-1)³ - x²y³ ≤ 0

// --- 楕円型（スター・円形系に流用）---
} else if (type === "<ID>") {
  const ex = (nx - cx) / 0.22;
  const ey = (ny - 0.64) / 0.22;
  inside = ex * ex + ey * ey <= 1;
}

// --- 矩形型 ---
} else if (type === "<ID>") {
  inside =
    Math.abs(nx - cx) < 0.20 &&
    ny > 0.46 && ny < 0.82;
}

// --- 星型（5角星の極座標近似）---
} else if (type === "<ID>") {
  const sx = (nx - cx) / 0.24;
  const sy = (ny - 0.64) / 0.24;
  const r = Math.sqrt(sx * sx + sy * sy);
  const theta = Math.atan2(sy, sx);
  const points = 5;
  const outer = 1.0;
  const innerR = 0.45;
  const phase = theta * points / 2;
  const wave = Math.abs(Math.cos(phase));
  const boundary = innerR + (outer - innerR) * wave;
  inside = r <= boundary;
}

// --- 汎用ハート式流用（シンプル閉曲線）---
} else if (type === "<ID>") {
  const hx = (nx - cx) / 0.15;
  const hy = -(ny - cy) / 0.14 + 0.35;
  const v = Math.pow(hx * hx + hy * hy - 1, 3) - hx * hx * Math.pow(hy, 3);
  inside = v <= 0;
}
