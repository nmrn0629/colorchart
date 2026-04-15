---
name: add-charm
description: "colorchart プロジェクトに新しいチャーム形状（PNG）を追加する。CHARM_TYPES / CHARM_DEFS / applyApproxCharmMask / detectSlotStitch / initImage を一括で更新。キーワード: チャーム, charm, 追加, 新形状, PNG"
---

# add-charm

colorchart の `index.html` に新チャーム形状を追加するための手順書。
新チャーム追加は `index.html` の **6〜8箇所** を同期更新する必要があるため、この順番で抜け漏れなく作業する。

## 引数

`$ARGUMENTS` にチャーム ID（英字）・ラベル（日本語）・形状分類（`radial` | `body` | `closed`）・PNG パスを受け取る。
例: `star スター closed star.png`

不足情報は AskUserQuestion で補う。

## 前提条件

- 透過 PNG をプロジェクトルートに配置済み（推奨 1200〜1600px、濃い線画＋内部透明）
- 既存コミット基準（`2f6b170` 以降）: チャーム1.3倍ルール適用済み、`SLOT_CENTER_X = [0.275, 0.755]`

## 追加で触るべきポイント

| # | 場所 | 内容 |
|---|------|------|
| 1 | `index.html` `CHARM_TYPES` (~L376) | 新 ID を配列に追記 |
| 2 | `CHARM_DEFS` (~L378-419) | `templates/charm-def-<kind>.js` を貼り付けて置換 |
| 3 | `applyApproxCharmMask` (~L970-1008) | 新 `type` の else-if 分岐（`templates/approx-mask-branch.js` 参照） |
| 4 | `detectSlotStitch` (~L1231) | 新 `stitch.kind` を導入した場合のみ分岐追加 |
| 5 | `initImage` `Promise.all` (~L1619-1628) | `loadImage(CHARM_DEFS.<ID>.image)` と `charmImages.<ID> = ...` |
| 6 | `candyHalfWidthByT` (~L821) | body 型で独自プロファイルが要る時だけ新関数追加 |

UIボタンは `CHARM_TYPES` を反復生成するので #1 で自動追従。`applyCharmMasks` (~L1011) は `CHARM_DEFS[type].mask.seedDX/seedY` を使う汎用処理なので通常は編集不要。

## 手順

1. **受け入れ確認** — ID / ラベル / 形状分類 / PNG パスを確認。PNG が存在し透過輪郭になっていることを Read で確認。
2. **CHARM_TYPES 追記** — `["donut", "candy", "heart"]` → `["donut", "candy", "heart", "<ID>"]`
3. **CHARM_DEFS 追記** — 形状分類に応じて `templates/charm-def-radial.js` / `charm-def-body.js` / `charm-def-closed.js` を選び、`<ID>` / `<LABEL>` / `<IMAGE_PATH>` を置換して `CHARM_DEFS` に追加
4. **initImage 更新** — `Promise.all` 配列に `loadImage(CHARM_DEFS.<ID>.image)` を追加、then の分解も `[donutImg, candyImg, heartImg, <ID>Img]` に拡張、`charmImages.<ID> = <ID>Img`
5. **applyApproxCharmMask 分岐** — `templates/approx-mask-branch.js` を参考に、flood-fill 失敗時の近似形状判定を追加
6. **(任意) 新ステッチ kind** — 既存 radial/candy/heart で足りないときのみ:
   - `detect<ID>Stitch(slotIdx, src, width, height, relaxed)` を新設
   - `detectSlotStitch` の `else if (cfg.kind === "<newKind>")` 分岐を追加
7. **起動確認** — `python3 -m http.server 8765` → ブラウザで:
   - 新ID ボタンが両スロットに出る
   - 色パレットで新チャームが着色される
   - ステッチ白/黒切替が効く
   - スワップで左右入替が崩れない
   - 既存 3 チャームに回帰が無い
8. **Codex レビュー** — `/codex-review` で blocking 0件を確認 → コミット

## サブエージェント活用

効率が上がる場面だけ使う。単純置換はメインで直接やる方が速い。

- **手順5 近似形状式の設計** — `Explore` サブに「既存 donut/candy/heart の applyApproxCharmMask 分岐を読んで、新形状 <ID> に最適な `inside` 判定式を提案」と投げる。試行錯誤が要る所をメイン文脈から切り離せる。
- **手順7 回帰チェック** — `general-purpose` サブに「新ID追加後、index.html の 6〜8箇所（CHARM_TYPES / CHARM_DEFS / applyApproxCharmMask / initImage / detectSlotStitch 等）に同期漏れがないか独立検証」と依頼。抜け漏れを第三者視点で拾える。
- **使わない方がいい手順** — 手順2〜4（CHARM_TYPES / CHARM_DEFS / initImage 追記）は単純な置換なのでメインで直接編集する。サブ起動コストの方が高い。

## 参照する既存スキル / 関数

- [~/.claude/skills/stitch-overlay/SKILL.md](~/.claude/skills/stitch-overlay/SKILL.md) — 内部ステッチ抽出アルゴリズム
- `buildLineBarrier` / `markOutsideArea` / `findEnclosedSeed` / `floodFillRegion` / `insetMaskFromBarrier` — マスク構築共通基盤（index.html 内）

## 過去の参考実装

- heart 追加コミット `ac48fa0 Add heart charm slot and fix stitch detection` — 同じポイントを全て触ったリファレンス
