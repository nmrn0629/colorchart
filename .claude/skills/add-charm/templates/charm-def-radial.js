// 放射型（ドーナツのような環状）チャーム用 CHARM_DEFS エントリ
// 使用方法: CHARM_DEFS に以下を追加し、<ID> / <LABEL> / <IMAGE_PATH> を置換
// rx/ry は「描画幅に対する半径」相当で、widthFrac * 0.5 付近が目安
// outerR/innerR は rx/ry に対する相対比率（無次元）
<ID>: {
  label: "<LABEL>",
  image: "<IMAGE_PATH>",
  widthFrac: 0.44,
  mask: { kind: "<ID>", seedDX: 0.13, seedY: 0.62 },
  stitch: {
    kind: "radial",
    centerDX: 0, centerY: 0.62,
    rx: 0.22, ry: 0.20,
    outerR: 0.87, outerTol: 0.048, outerTolRelax: 0.058,
    innerR: 0.44, innerTol: 0.040, innerTolRelax: 0.050,
    window: { dx: [-0.25, 0.27], y: [0.41, 0.84] },
    minCount: 120
  }
},
