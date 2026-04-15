// 縦軸本体型（キャンディのような細長い本体）チャーム用 CHARM_DEFS エントリ
// tRange は canvas Y 方向のチャーム占有範囲 (0..1)
// 独自の縦軸プロファイルが必要なら candyHalfWidthByT を拡張して shape 別関数を追加
<ID>: {
  label: "<LABEL>",
  image: "<IMAGE_PATH>",
  widthFrac: 0.36,
  mask: { kind: "<ID>", seedDX: 0, seedY: 0.64 },
  stitch: {
    kind: "candy",
    tRange: [0.39, 0.89],
    window: { dx: [-0.13, 0.13], y: [0.39, 0.89] },
    minCount: 80
  }
},
