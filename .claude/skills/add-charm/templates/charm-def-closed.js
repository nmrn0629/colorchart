// 閉領域型（ハートのような単純閉曲線）チャーム用 CHARM_DEFS エントリ
// flood-fill + 線画バリアでマスクを得る heart 方式を再利用
// insetPasses / maxBandPasses で内部ステッチバンド幅を調整
<ID>: {
  label: "<LABEL>",
  image: "<IMAGE_PATH>",
  widthFrac: 0.39,
  mask: { kind: "<ID>", seedDX: 0, seedY: 0.66 },
  stitch: {
    kind: "heart",
    window: { dx: [-0.18, 0.18], y: [0.41, 0.85] },
    insetPasses: 4,
    maxBandPasses: 8,
    minCount: 100
  }
},
