// 全艦娘マスターデータ（初期ステータス版）
import type { ShipMasterData } from './shipMasterDataCore'

export const SHIP_MASTER_DATA: { [key: number]: ShipMasterData } = {
  1: {
    shipId: 1, sortId: 31, name: '睦月', yomi: 'むつき', shipClass: 2, shipType: 28, rarity: 3,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 13, firepower: 6, armor: 5, torpedo: 18, evasion: 58, aa: 7, aircraft: 2, speed: 10, los: 4, range: 1, luck: 12, asw: 16 }
  },
  2: {
    shipId: 2, sortId: 32, name: '如月', yomi: 'きさらぎ', shipClass: 2, shipType: 28, rarity: 2,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 13, firepower: 6, armor: 5, torpedo: 18, evasion: 58, aa: 7, aircraft: 2, speed: 10, los: 4, range: 1, luck: 10, asw: 16 }
  },
  6: {
    shipId: 6, sortId: 35, name: '長月', yomi: 'ながつき', shipClass: 2, shipType: 28, rarity: 2,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 13, firepower: 6, armor: 5, torpedo: 18, evasion: 58, aa: 7, aircraft: 2, speed: 10, los: 4, range: 1, luck: 15, asw: 16 }
  },
  7: {
    shipId: 7, sortId: 37, name: '三日月', yomi: 'みかづき', shipClass: 2, shipType: 28, rarity: 1,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 13, firepower: 6, armor: 5, torpedo: 18, evasion: 58, aa: 7, aircraft: 2, speed: 10, los: 4, range: 1, luck: 10, asw: 16 }
  },
  9: {
    shipId: 9, sortId: 11, name: '吹雪', yomi: 'ふぶき', shipClass: 2, shipType: 12, rarity: 3,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 15, firepower: 10, armor: 5, torpedo: 27, evasion: 74, aa: 10, aircraft: 2, speed: 10, los: 5, range: 1, luck: 17, asw: 20 }
  },
  10: {
    shipId: 10, sortId: 12, name: '白雪', yomi: 'しらゆき', shipClass: 2, shipType: 12, rarity: 2,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 15, firepower: 10, armor: 5, torpedo: 27, evasion: 74, aa: 10, aircraft: 2, speed: 10, los: 5, range: 1, luck: 10, asw: 20 }
  },
  11: {
    shipId: 11, sortId: 14, name: '深雪', yomi: 'みゆき', shipClass: 2, shipType: 12, rarity: 2,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 15, firepower: 10, armor: 5, torpedo: 27, evasion: 74, aa: 10, aircraft: 2, speed: 10, los: 5, range: 1, luck: 10, asw: 20 }
  },
  12: {
    shipId: 12, sortId: 16, name: '磯波', yomi: 'いそなみ', shipClass: 2, shipType: 12, rarity: 1,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 15, firepower: 10, armor: 5, torpedo: 27, evasion: 74, aa: 10, aircraft: 2, speed: 10, los: 5, range: 1, luck: 10, asw: 20 }
  },
  13: {
    shipId: 13, sortId: 17, name: '綾波', yomi: 'あやなみ', shipClass: 2, shipType: 1, rarity: 3,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 15, firepower: 10, armor: 5, torpedo: 27, evasion: 74, aa: 12, aircraft: 2, speed: 10, los: 5, range: 1, luck: 12, asw: 20 }
  },
  14: {
    shipId: 14, sortId: 18, name: '敷波', yomi: 'しきなみ', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 15, firepower: 10, armor: 5, torpedo: 27, evasion: 74, aa: 12, aircraft: 2, speed: 10, los: 5, range: 1, luck: 10, asw: 20 }
  },
  15: {
    shipId: 15, sortId: 68, name: '曙', yomi: 'あけぼの', shipClass: 2, shipType: 1, rarity: 1,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 15, firepower: 10, armor: 5, torpedo: 27, evasion: 74, aa: 12, aircraft: 2, speed: 10, los: 5, range: 1, luck: 10, asw: 20 }
  },
  16: {
    shipId: 16, sortId: 70, name: '潮', yomi: 'うしお', shipClass: 2, shipType: 1, rarity: 1,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 15, firepower: 10, armor: 5, torpedo: 27, evasion: 74, aa: 12, aircraft: 2, speed: 10, los: 5, range: 1, luck: 20, asw: 20 }
  },
  17: {
    shipId: 17, sortId: 91, name: '陽炎', yomi: 'かげろう', shipClass: 2, shipType: 30, rarity: 3,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 70, aa: 12, aircraft: 2, speed: 10, los: 6, range: 1, luck: 12, asw: 24 }
  },
  18: {
    shipId: 18, sortId: 92, name: '不知火', yomi: 'しらぬい', shipClass: 2, shipType: 30, rarity: 2,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 70, aa: 9, aircraft: 2, speed: 10, los: 6, range: 1, luck: 10, asw: 24 }
  },
  19: {
    shipId: 19, sortId: 93, name: '黒潮', yomi: 'くろしお', shipClass: 2, shipType: 30, rarity: 1,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 70, aa: 9, aircraft: 2, speed: 10, los: 6, range: 1, luck: 10, asw: 24 }
  },
  20: {
    shipId: 20, sortId: 5, name: '雪風', yomi: 'ゆきかぜ', shipClass: 2, shipType: 30, rarity: 6,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 7, torpedo: 24, evasion: 70, aa: 12, aircraft: 2, speed: 10, los: 6, range: 1, luck: 50, asw: 24 }
  },
  21: {
    shipId: 21, sortId: 42, name: '長良', yomi: 'ながら', shipClass: 3, shipType: 20, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 26, firepower: 14, armor: 10, torpedo: 24, evasion: 92, aa: 13, aircraft: 2, speed: 10, los: 8, range: 2, luck: 12, asw: 20 }
  },
  22: {
    shipId: 22, sortId: 43, name: '五十鈴', yomi: 'いすず', shipClass: 3, shipType: 20, rarity: 2,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 26, firepower: 14, armor: 10, torpedo: 24, evasion: 112, aa: 13, aircraft: 2, speed: 10, los: 8, range: 2, luck: 10, asw: 40 }
  },
  23: {
    shipId: 23, sortId: 45, name: '由良', yomi: 'ゆら', shipClass: 3, shipType: 20, rarity: 1,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 26, firepower: 14, armor: 10, torpedo: 24, evasion: 112, aa: 13, aircraft: 2, speed: 10, los: 8, range: 2, luck: 10, asw: 40 }
  },
  24: {
    shipId: 24, sortId: 19, name: '大井', yomi: 'おおい', shipClass: 3, shipType: 4, rarity: 5,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 25, firepower: 14, armor: 11, torpedo: 24, evasion: 93, aa: 13, aircraft: 2, speed: 10, los: 8, range: 2, luck: 17, asw: 19 }
  },
  25: {
    shipId: 25, sortId: 20, name: '北上', yomi: 'きたかみ', shipClass: 3, shipType: 4, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 25, firepower: 14, armor: 10, torpedo: 24, evasion: 93, aa: 13, aircraft: 2, speed: 10, los: 8, range: 2, luck: 15, asw: 19 }
  },
  26: {
    shipId: 26, sortId: 26, name: '扶桑', yomi: 'ふそう', shipClass: 9, shipType: 26, rarity: 4,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 67, firepower: 74, armor: 59, torpedo: 0, evasion: 30, aa: 23, aircraft: 4, speed: 5, los: 9, range: 3, luck: 5, asw: 0 }
  },
  27: {
    shipId: 27, sortId: 27, name: '山城', yomi: 'やましろ', shipClass: 9, shipType: 26, rarity: 4,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 67, firepower: 74, armor: 59, torpedo: 0, evasion: 30, aa: 23, aircraft: 4, speed: 5, los: 9, range: 3, luck: 5, asw: 0 }
  },
  28: {
    shipId: 28, sortId: 33, name: '皐月', yomi: 'さつき', shipClass: 2, shipType: 28, rarity: 2,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 13, firepower: 6, armor: 5, torpedo: 18, evasion: 58, aa: 7, aircraft: 2, speed: 10, los: 4, range: 1, luck: 10, asw: 16 }
  },
  29: {
    shipId: 29, sortId: 34, name: '文月', yomi: 'ふみづき', shipClass: 2, shipType: 28, rarity: 2,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 13, firepower: 6, armor: 5, torpedo: 18, evasion: 58, aa: 7, aircraft: 2, speed: 10, los: 4, range: 1, luck: 10, asw: 16 }
  },
  30: {
    shipId: 30, sortId: 36, name: '菊月', yomi: 'きくづき', shipClass: 2, shipType: 28, rarity: 1,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 13, firepower: 6, armor: 5, torpedo: 18, evasion: 58, aa: 7, aircraft: 2, speed: 10, los: 4, range: 1, luck: 10, asw: 16 }
  },
  31: {
    shipId: 31, sortId: 38, name: '望月', yomi: 'もちづき', shipClass: 2, shipType: 28, rarity: 1,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 13, firepower: 6, armor: 5, torpedo: 18, evasion: 58, aa: 7, aircraft: 2, speed: 10, los: 4, range: 1, luck: 10, asw: 16 }
  },
  32: {
    shipId: 32, sortId: 13, name: '初雪', yomi: 'はつゆき', shipClass: 2, shipType: 12, rarity: 1,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 15, firepower: 10, armor: 5, torpedo: 27, evasion: 74, aa: 10, aircraft: 2, speed: 10, los: 5, range: 1, luck: 10, asw: 20 }
  },
  33: {
    shipId: 33, sortId: 15, name: '叢雲', yomi: 'むらくも', shipClass: 2, shipType: 12, rarity: 2,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 15, firepower: 10, armor: 5, torpedo: 27, evasion: 74, aa: 10, aircraft: 2, speed: 10, los: 5, range: 1, luck: 10, asw: 20 }
  },
  34: {
    shipId: 34, sortId: 71, name: '暁', yomi: 'あかつき', shipClass: 2, shipType: 5, rarity: 3,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 15, firepower: 10, armor: 6, torpedo: 27, evasion: 74, aa: 12, aircraft: 2, speed: 10, los: 5, range: 1, luck: 12, asw: 20 }
  },
  35: {
    shipId: 35, sortId: 72, name: '響', yomi: 'ひびき', shipClass: 2, shipType: 5, rarity: 2,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 15, firepower: 10, armor: 6, torpedo: 27, evasion: 74, aa: 12, aircraft: 2, speed: 10, los: 5, range: 1, luck: 10, asw: 20 }
  },
  36: {
    shipId: 36, sortId: 73, name: '雷', yomi: 'いかづち', shipClass: 2, shipType: 5, rarity: 1,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 15, firepower: 10, armor: 6, torpedo: 27, evasion: 74, aa: 12, aircraft: 2, speed: 10, los: 5, range: 1, luck: 10, asw: 20 }
  },
  37: {
    shipId: 37, sortId: 74, name: '電', yomi: 'いなづま', shipClass: 2, shipType: 5, rarity: 1,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 15, firepower: 10, armor: 6, torpedo: 27, evasion: 74, aa: 12, aircraft: 2, speed: 10, los: 5, range: 1, luck: 10, asw: 20 }
  },
  38: {
    shipId: 38, sortId: 75, name: '初春', yomi: 'はつはる', shipClass: 2, shipType: 10, rarity: 3,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 27, evasion: 73, aa: 12, aircraft: 2, speed: 10, los: 5, range: 1, luck: 12, asw: 21 }
  },
  39: {
    shipId: 39, sortId: 76, name: '子日', yomi: 'ねのひ', shipClass: 2, shipType: 10, rarity: 1,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 27, evasion: 73, aa: 9, aircraft: 2, speed: 10, los: 5, range: 1, luck: 10, asw: 21 }
  },
  40: {
    shipId: 40, sortId: 77, name: '若葉', yomi: 'わかば', shipClass: 2, shipType: 10, rarity: 2,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 27, evasion: 73, aa: 9, aircraft: 2, speed: 10, los: 5, range: 1, luck: 10, asw: 21 }
  },
  41: {
    shipId: 41, sortId: 78, name: '初霜', yomi: 'はつしも', shipClass: 2, shipType: 10, rarity: 2,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 27, evasion: 73, aa: 9, aircraft: 2, speed: 10, los: 5, range: 1, luck: 10, asw: 21 }
  },
  42: {
    shipId: 42, sortId: 79, name: '白露', yomi: 'しらつゆ', shipClass: 2, shipType: 23, rarity: 3,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 73, aa: 12, aircraft: 2, speed: 10, los: 5, range: 1, luck: 12, asw: 21 }
  },
  43: {
    shipId: 43, sortId: 80, name: '時雨', yomi: 'しぐれ', shipClass: 2, shipType: 23, rarity: 2,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 73, aa: 9, aircraft: 2, speed: 10, los: 5, range: 1, luck: 10, asw: 21 }
  },
  44: {
    shipId: 44, sortId: 81, name: '村雨', yomi: 'むらさめ', shipClass: 2, shipType: 23, rarity: 2,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 73, aa: 9, aircraft: 2, speed: 10, los: 5, range: 1, luck: 10, asw: 21 }
  },
  45: {
    shipId: 45, sortId: 82, name: '夕立', yomi: 'ゆうだち', shipClass: 2, shipType: 23, rarity: 2,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 73, aa: 9, aircraft: 2, speed: 10, los: 5, range: 1, luck: 10, asw: 21 }
  },
  46: {
    shipId: 46, sortId: 83, name: '五月雨', yomi: 'さみだれ', shipClass: 2, shipType: 23, rarity: 2,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 73, aa: 9, aircraft: 2, speed: 10, los: 5, range: 1, luck: 10, asw: 21 }
  },
  47: {
    shipId: 47, sortId: 84, name: '涼風', yomi: 'すずかぜ', shipClass: 2, shipType: 23, rarity: 3,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 73, aa: 9, aircraft: 2, speed: 10, los: 5, range: 1, luck: 12, asw: 21 }
  },
  48: {
    shipId: 48, sortId: 89, name: '霰', yomi: 'あられ', shipClass: 2, shipType: 18, rarity: 1,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 73, aa: 9, aircraft: 2, speed: 10, los: 5, range: 1, luck: 10, asw: 21 }
  },
  49: {
    shipId: 49, sortId: 90, name: '霞', yomi: 'かすみ', shipClass: 2, shipType: 18, rarity: 2,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 73, aa: 9, aircraft: 2, speed: 10, los: 5, range: 1, luck: 15, asw: 21 }
  },
  50: {
    shipId: 50, sortId: 10, name: '島風', yomi: 'しまかぜ', shipClass: 2, shipType: 22, rarity: 6,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 19, firepower: 12, armor: 8, torpedo: 45, evasion: 70, aa: 14, aircraft: 2, speed: 10, los: 7, range: 1, luck: 10, asw: 24 }
  },
  51: {
    shipId: 51, sortId: 28, name: '天龍', yomi: 'てんりゅう', shipClass: 3, shipType: 21, rarity: 3,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 23, firepower: 11, armor: 7, torpedo: 18, evasion: 94, aa: 8, aircraft: 2, speed: 10, los: 7, range: 2, luck: 17, asw: 18 }
  },
  52: {
    shipId: 52, sortId: 29, name: '龍田', yomi: 'たつた', shipClass: 3, shipType: 21, rarity: 3,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 23, firepower: 11, armor: 7, torpedo: 18, evasion: 94, aa: 8, aircraft: 2, speed: 10, los: 7, range: 2, luck: 17, asw: 18 }
  },
  53: {
    shipId: 53, sortId: 44, name: '名取', yomi: 'なとり', shipClass: 3, shipType: 20, rarity: 2,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 26, firepower: 14, armor: 10, torpedo: 24, evasion: 92, aa: 13, aircraft: 2, speed: 10, los: 8, range: 2, luck: 10, asw: 20 }
  },
  54: {
    shipId: 54, sortId: 46, name: '川内', yomi: 'せんだい', shipClass: 3, shipType: 16, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 26, firepower: 14, armor: 11, torpedo: 24, evasion: 111, aa: 13, aircraft: 2, speed: 10, los: 8, range: 2, luck: 12, asw: 20 }
  },
  55: {
    shipId: 55, sortId: 47, name: '神通', yomi: 'じんつう', shipClass: 3, shipType: 16, rarity: 1,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 26, firepower: 14, armor: 11, torpedo: 24, evasion: 111, aa: 13, aircraft: 2, speed: 10, los: 8, range: 2, luck: 10, asw: 20 }
  },
  56: {
    shipId: 56, sortId: 48, name: '那珂', yomi: 'なか', shipClass: 3, shipType: 16, rarity: 2,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 26, firepower: 14, armor: 11, torpedo: 24, evasion: 108, aa: 13, aircraft: 2, speed: 10, los: 8, range: 2, luck: 10, asw: 24 }
  },
  57: {
    shipId: 57, sortId: 97, name: '大井改', yomi: 'おおい', shipClass: 4, shipType: 4, rarity: 6,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 32, firepower: 8, armor: 12, torpedo: 80, evasion: 88, aa: 13, aircraft: 2, speed: 10, los: 8, range: 2, luck: 10, asw: 25 }
  },
  58: {
    shipId: 58, sortId: 98, name: '北上改', yomi: 'きたかみ', shipClass: 4, shipType: 4, rarity: 6,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 32, firepower: 8, armor: 12, torpedo: 80, evasion: 88, aa: 13, aircraft: 2, speed: 10, los: 8, range: 2, luck: 15, asw: 25 }
  },
  59: {
    shipId: 59, sortId: 52, name: '古鷹', yomi: 'ふるたか', shipClass: 5, shipType: 7, rarity: 3,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 36, firepower: 30, armor: 25, torpedo: 12, evasion: 30, aa: 16, aircraft: 3, speed: 10, los: 10, range: 2, luck: 10, asw: 0 }
  },
  60: {
    shipId: 60, sortId: 53, name: '加古', yomi: 'かこ', shipClass: 5, shipType: 7, rarity: 1,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 36, firepower: 30, armor: 25, torpedo: 12, evasion: 30, aa: 16, aircraft: 3, speed: 10, los: 10, range: 2, luck: 10, asw: 0 }
  },
  61: {
    shipId: 61, sortId: 54, name: '青葉', yomi: 'あおば', shipClass: 5, shipType: 13, rarity: 3,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 37, firepower: 30, armor: 26, torpedo: 12, evasion: 30, aa: 16, aircraft: 3, speed: 10, los: 11, range: 2, luck: 20, asw: 0 }
  },
  62: {
    shipId: 62, sortId: 55, name: '妙高', yomi: 'みょうこう', shipClass: 5, shipType: 29, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 44, firepower: 40, armor: 32, torpedo: 24, evasion: 30, aa: 16, aircraft: 3, speed: 10, los: 12, range: 2, luck: 10, asw: 0 }
  },
  63: {
    shipId: 63, sortId: 56, name: '那智', yomi: 'なち', shipClass: 5, shipType: 29, rarity: 1,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 44, firepower: 40, armor: 32, torpedo: 24, evasion: 30, aa: 16, aircraft: 3, speed: 10, los: 12, range: 2, luck: 10, asw: 0 }
  },
  64: {
    shipId: 64, sortId: 57, name: '足柄', yomi: 'あしがら', shipClass: 5, shipType: 29, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 44, firepower: 40, armor: 32, torpedo: 24, evasion: 30, aa: 16, aircraft: 3, speed: 10, los: 12, range: 2, luck: 10, asw: 0 }
  },
  65: {
    shipId: 65, sortId: 58, name: '羽黒', yomi: 'はぐろ', shipClass: 5, shipType: 29, rarity: 1,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 44, firepower: 40, armor: 32, torpedo: 24, evasion: 30, aa: 16, aircraft: 3, speed: 10, los: 12, range: 2, luck: 10, asw: 0 }
  },
  66: {
    shipId: 66, sortId: 59, name: '高雄', yomi: 'たかお', shipClass: 5, shipType: 8, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 45, firepower: 40, armor: 35, torpedo: 24, evasion: 30, aa: 18, aircraft: 3, speed: 10, los: 13, range: 2, luck: 10, asw: 0 }
  },
  67: {
    shipId: 67, sortId: 60, name: '愛宕', yomi: 'あたご', shipClass: 5, shipType: 8, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 45, firepower: 40, armor: 35, torpedo: 24, evasion: 30, aa: 18, aircraft: 3, speed: 10, los: 13, range: 2, luck: 10, asw: 0 }
  },
  68: {
    shipId: 68, sortId: 61, name: '摩耶', yomi: 'まや', shipClass: 5, shipType: 8, rarity: 1,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 45, firepower: 40, armor: 35, torpedo: 24, evasion: 30, aa: 18, aircraft: 3, speed: 10, los: 13, range: 2, luck: 10, asw: 0 }
  },
  69: {
    shipId: 69, sortId: 62, name: '鳥海', yomi: 'ちょうかい', shipClass: 5, shipType: 8, rarity: 1,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 45, firepower: 40, armor: 35, torpedo: 24, evasion: 30, aa: 18, aircraft: 3, speed: 10, los: 13, range: 2, luck: 10, asw: 0 }
  },
  70: {
    shipId: 70, sortId: 51, name: '最上', yomi: 'もがみ', shipClass: 5, shipType: 9, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 41, firepower: 40, armor: 31, torpedo: 18, evasion: 30, aa: 20, aircraft: 3, speed: 10, los: 14, range: 2, luck: 10, asw: 0 }
  },
  71: {
    shipId: 71, sortId: 63, name: '利根', yomi: 'とね', shipClass: 5, shipType: 31, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 44, firepower: 32, armor: 36, torpedo: 24, evasion: 30, aa: 20, aircraft: 3, speed: 10, los: 20, range: 2, luck: 10, asw: 0 }
  },
  72: {
    shipId: 72, sortId: 64, name: '筑摩', yomi: 'ちくま', shipClass: 5, shipType: 31, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 44, firepower: 32, armor: 36, torpedo: 24, evasion: 30, aa: 20, aircraft: 3, speed: 10, los: 20, range: 2, luck: 10, asw: 0 }
  },
  73: {
    shipId: 73, sortId: 101, name: '最上改', yomi: 'もがみ', shipClass: 6, shipType: 9, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 50, firepower: 24, armor: 37, torpedo: 18, evasion: 30, aa: 20, aircraft: 4, speed: 10, los: 22, range: 2, luck: 10, asw: 0 }
  },
  74: {
    shipId: 74, sortId: 94, name: '祥鳳', yomi: 'しょうほう', shipClass: 7, shipType: 11, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 32, firepower: 10, armor: 19, torpedo: 0, evasion: 30, aa: 14, aircraft: 3, speed: 10, los: 34, range: 1, luck: 10, asw: 0 }
  },
  75: {
    shipId: 75, sortId: 65, name: '飛鷹', yomi: 'ひよう', shipClass: 7, shipType: 24, rarity: 4,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 40, firepower: 10, armor: 21, torpedo: 0, evasion: 30, aa: 21, aircraft: 4, speed: 5, los: 38, range: 1, luck: 10, asw: 0 }
  },
  76: {
    shipId: 76, sortId: 30, name: '龍驤', yomi: 'りゅうじょう', shipClass: 7, shipType: 32, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 31, firepower: 10, armor: 17, torpedo: 0, evasion: 30, aa: 16, aircraft: 3, speed: 10, los: 34, range: 1, luck: 10, asw: 0 }
  },
  77: {
    shipId: 77, sortId: 3, name: '伊勢', yomi: 'いせ', shipClass: 9, shipType: 2, rarity: 5,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 74, firepower: 74, armor: 70, torpedo: 0, evasion: 30, aa: 28, aircraft: 4, speed: 5, los: 10, range: 3, luck: 15, asw: 0 }
  },
  78: {
    shipId: 78, sortId: 21, name: '金剛', yomi: 'こんごう', shipClass: 8, shipType: 6, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 63, firepower: 63, armor: 52, torpedo: 0, evasion: 30, aa: 24, aircraft: 3, speed: 10, los: 13, range: 3, luck: 12, asw: 0 }
  },
  79: {
    shipId: 79, sortId: 23, name: '榛名', yomi: 'はるな', shipClass: 8, shipType: 6, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 63, firepower: 63, armor: 52, torpedo: 0, evasion: 30, aa: 24, aircraft: 3, speed: 10, los: 13, range: 3, luck: 15, asw: 0 }
  },
  80: {
    shipId: 80, sortId: 1, name: '長門', yomi: 'ながと', shipClass: 9, shipType: 19, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 80, firepower: 82, armor: 75, torpedo: 0, evasion: 30, aa: 31, aircraft: 4, speed: 5, los: 12, range: 3, luck: 20, asw: 0 }
  },
  81: {
    shipId: 81, sortId: 2, name: '陸奥', yomi: 'むつ', shipClass: 9, shipType: 19, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 80, firepower: 82, armor: 75, torpedo: 0, evasion: 30, aa: 31, aircraft: 4, speed: 5, los: 12, range: 3, luck: 3, asw: 0 }
  },
  82: {
    shipId: 82, sortId: 102, name: '伊勢改', yomi: 'いせ', shipClass: 10, shipType: 2, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 77, firepower: 63, armor: 74, torpedo: 0, evasion: 30, aa: 45, aircraft: 4, speed: 5, los: 24, range: 3, luck: 30, asw: 0 }
  },
  83: {
    shipId: 83, sortId: 6, name: '赤城', yomi: 'あかぎ', shipClass: 11, shipType: 14, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 69, firepower: 10, armor: 28, torpedo: 0, evasion: 30, aa: 32, aircraft: 4, speed: 10, los: 44, range: 1, luck: 12, asw: 0 }
  },
  84: {
    shipId: 84, sortId: 7, name: '加賀', yomi: 'かが', shipClass: 11, shipType: 3, rarity: 5,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 71, firepower: 10, armor: 29, torpedo: 0, evasion: 30, aa: 28, aircraft: 4, speed: 10, los: 40, range: 1, luck: 10, asw: 0 }
  },
  85: {
    shipId: 85, sortId: 24, name: '霧島', yomi: 'きりしま', shipClass: 8, shipType: 6, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 63, firepower: 63, armor: 52, torpedo: 0, evasion: 30, aa: 24, aircraft: 3, speed: 10, los: 13, range: 3, luck: 10, asw: 0 }
  },
  86: {
    shipId: 86, sortId: 22, name: '比叡', yomi: 'ひえい', shipClass: 8, shipType: 6, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 63, firepower: 63, armor: 52, torpedo: 0, evasion: 30, aa: 24, aircraft: 3, speed: 10, los: 13, range: 3, luck: 10, asw: 0 }
  },
  87: {
    shipId: 87, sortId: 4, name: '日向', yomi: 'ひゅうが', shipClass: 9, shipType: 2, rarity: 5,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 74, firepower: 74, armor: 70, torpedo: 0, evasion: 30, aa: 28, aircraft: 4, speed: 5, los: 10, range: 3, luck: 15, asw: 0 }
  },
  88: {
    shipId: 88, sortId: 103, name: '日向改', yomi: 'ひゅうが', shipClass: 10, shipType: 2, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 77, firepower: 63, armor: 74, torpedo: 0, evasion: 30, aa: 45, aircraft: 4, speed: 5, los: 24, range: 3, luck: 30, asw: 0 }
  },
  89: {
    shipId: 89, sortId: 25, name: '鳳翔', yomi: 'ほうしょう', shipClass: 7, shipType: 27, rarity: 3,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 30, firepower: 10, armor: 15, torpedo: 0, evasion: 30, aa: 10, aircraft: 2, speed: 5, los: 32, range: 1, luck: 20, asw: 0 }
  },
  90: {
    shipId: 90, sortId: 8, name: '蒼龍', yomi: 'そうりゅう', shipClass: 11, shipType: 17, rarity: 5,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 50, firepower: 10, armor: 27, torpedo: 0, evasion: 30, aa: 26, aircraft: 4, speed: 10, los: 42, range: 1, luck: 10, asw: 0 }
  },
  91: {
    shipId: 91, sortId: 9, name: '飛龍', yomi: 'ひりゅう', shipClass: 11, shipType: 25, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 50, firepower: 10, armor: 27, torpedo: 0, evasion: 30, aa: 26, aircraft: 4, speed: 10, los: 42, range: 1, luck: 35, asw: 0 }
  },
  92: {
    shipId: 92, sortId: 66, name: '隼鷹', yomi: 'じゅんよう', shipClass: 7, shipType: 24, rarity: 4,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 40, firepower: 10, armor: 21, torpedo: 0, evasion: 30, aa: 21, aircraft: 4, speed: 5, los: 38, range: 1, luck: 20, asw: 0 }
  },
  93: {
    shipId: 93, sortId: 67, name: '朧', yomi: 'おぼろ', shipClass: 2, shipType: 1, rarity: 1,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 15, firepower: 10, armor: 5, torpedo: 27, evasion: 74, aa: 12, aircraft: 2, speed: 10, los: 5, range: 1, luck: 10, asw: 20 }
  },
  94: {
    shipId: 94, sortId: 69, name: '漣', yomi: 'さざなみ', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 15, firepower: 10, armor: 5, torpedo: 27, evasion: 74, aa: 12, aircraft: 2, speed: 10, los: 5, range: 1, luck: 10, asw: 20 }
  },
  95: {
    shipId: 95, sortId: 85, name: '朝潮', yomi: 'あさしお', shipClass: 2, shipType: 18, rarity: 3,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 73, aa: 12, aircraft: 2, speed: 10, los: 5, range: 1, luck: 12, asw: 21 }
  },
  96: {
    shipId: 96, sortId: 86, name: '大潮', yomi: 'おおしお', shipClass: 2, shipType: 18, rarity: 1,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 73, aa: 9, aircraft: 2, speed: 10, los: 5, range: 1, luck: 10, asw: 21 }
  },
  97: {
    shipId: 97, sortId: 87, name: '満潮', yomi: 'みちしお', shipClass: 2, shipType: 18, rarity: 1,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 73, aa: 9, aircraft: 2, speed: 10, los: 5, range: 1, luck: 10, asw: 21 }
  },
  98: {
    shipId: 98, sortId: 88, name: '荒潮', yomi: 'あらしお', shipClass: 2, shipType: 18, rarity: 1,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 73, aa: 9, aircraft: 2, speed: 10, los: 5, range: 1, luck: 10, asw: 21 }
  },
  99: {
    shipId: 99, sortId: 39, name: '球磨', yomi: 'くま', shipClass: 3, shipType: 4, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 25, firepower: 14, armor: 10, torpedo: 24, evasion: 93, aa: 13, aircraft: 2, speed: 10, los: 8, range: 2, luck: 12, asw: 19 }
  },
  100: {
    shipId: 100, sortId: 40, name: '多摩', yomi: 'たま', shipClass: 3, shipType: 4, rarity: 2,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 25, firepower: 14, armor: 10, torpedo: 24, evasion: 93, aa: 13, aircraft: 2, speed: 10, los: 8, range: 2, luck: 10, asw: 19 }
  },
  101: {
    shipId: 101, sortId: 41, name: '木曾', yomi: 'きそ', shipClass: 3, shipType: 4, rarity: 1,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 25, firepower: 14, armor: 10, torpedo: 24, evasion: 93, aa: 13, aircraft: 2, speed: 10, los: 8, range: 2, luck: 10, asw: 19 }
  },
  102: {
    shipId: 102, sortId: 49, name: '千歳', yomi: 'ちとせ', shipClass: 16, shipType: 15, rarity: 2,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 40, firepower: 9, armor: 18, torpedo: 0, evasion: 30, aa: 14, aircraft: 2, speed: 10, los: 34, range: 1, luck: 10, asw: 0 }
  },
  103: {
    shipId: 103, sortId: 50, name: '千代田', yomi: 'ちよだ', shipClass: 16, shipType: 15, rarity: 1,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 40, firepower: 9, armor: 18, torpedo: 0, evasion: 30, aa: 14, aircraft: 2, speed: 10, los: 34, range: 1, luck: 10, asw: 0 }
  },
  104: {
    shipId: 104, sortId: 95, name: '千歳改', yomi: 'ちとせ', shipClass: 16, shipType: 15, rarity: 3,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 41, firepower: 9, armor: 20, torpedo: 0, evasion: 30, aa: 15, aircraft: 3, speed: 10, los: 36, range: 1, luck: 10, asw: 0 }
  },
  105: {
    shipId: 105, sortId: 96, name: '千代田改', yomi: 'ちよだ', shipClass: 16, shipType: 15, rarity: 3,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 41, firepower: 9, armor: 20, torpedo: 0, evasion: 30, aa: 15, aircraft: 3, speed: 10, los: 36, range: 1, luck: 10, asw: 0 }
  },
  106: {
    shipId: 106, sortId: 99, name: '千歳甲', yomi: 'ちとせ', shipClass: 16, shipType: 15, rarity: 3,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 42, firepower: 9, armor: 21, torpedo: 15, evasion: 30, aa: 17, aircraft: 3, speed: 10, los: 30, range: 1, luck: 10, asw: 0 }
  },
  107: {
    shipId: 107, sortId: 100, name: '千代田甲', yomi: 'ちよだ', shipClass: 16, shipType: 15, rarity: 3,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 42, firepower: 9, armor: 21, torpedo: 15, evasion: 30, aa: 17, aircraft: 3, speed: 10, los: 30, range: 1, luck: 10, asw: 0 }
  },
  108: {
    shipId: 108, sortId: 104, name: '千歳航', yomi: 'ちとせ', shipClass: 7, shipType: 15, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 47, firepower: 10, armor: 25, torpedo: 0, evasion: 30, aa: 20, aircraft: 3, speed: 10, los: 36, range: 1, luck: 10, asw: 0 }
  },
  109: {
    shipId: 109, sortId: 105, name: '千代田航', yomi: 'ちよだ', shipClass: 7, shipType: 15, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 47, firepower: 10, armor: 25, torpedo: 0, evasion: 30, aa: 20, aircraft: 3, speed: 10, los: 36, range: 1, luck: 10, asw: 0 }
  },
  110: {
    shipId: 110, sortId: 106, name: '翔鶴', yomi: 'しょうかく', shipClass: 11, shipType: 33, rarity: 5,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 62, firepower: 10, armor: 33, torpedo: 0, evasion: 30, aa: 29, aircraft: 4, speed: 10, los: 44, range: 1, luck: 10, asw: 0 }
  },
  111: {
    shipId: 111, sortId: 107, name: '瑞鶴', yomi: 'ずいかく', shipClass: 11, shipType: 33, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 62, firepower: 10, armor: 33, torpedo: 0, evasion: 30, aa: 29, aircraft: 4, speed: 10, los: 44, range: 1, luck: 40, asw: 0 }
  },
  112: {
    shipId: 112, sortId: 108, name: '瑞鶴改', yomi: 'ずいかく', shipClass: 11, shipType: 33, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 75, firepower: 10, armor: 42, torpedo: 0, evasion: 30, aa: 40, aircraft: 4, speed: 10, los: 48, range: 1, luck: 42, asw: 0 }
  },
  113: {
    shipId: 113, sortId: 109, name: '鬼怒', yomi: 'きぬ', shipClass: 3, shipType: 20, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 26, firepower: 14, armor: 10, torpedo: 24, evasion: 92, aa: 13, aircraft: 2, speed: 10, los: 8, range: 2, luck: 12, asw: 20 }
  },
  114: {
    shipId: 114, sortId: 110, name: '阿武隈', yomi: 'あぶくま', shipClass: 3, shipType: 20, rarity: 5,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 27, firepower: 14, armor: 10, torpedo: 24, evasion: 92, aa: 13, aircraft: 2, speed: 10, los: 8, range: 2, luck: 12, asw: 20 }
  },
  115: {
    shipId: 115, sortId: 111, name: '夕張', yomi: 'ゆうばり', shipClass: 3, shipType: 34, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 19, firepower: 17, armor: 10, torpedo: 20, evasion: 61, aa: 10, aircraft: 3, speed: 10, los: 6, range: 2, luck: 12, asw: 13 }
  },
  116: {
    shipId: 116, sortId: 112, name: '瑞鳳', yomi: 'ずいほう', shipClass: 7, shipType: 11, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 32, firepower: 10, armor: 19, torpedo: 0, evasion: 30, aa: 14, aircraft: 3, speed: 10, los: 34, range: 1, luck: 30, asw: 0 }
  },
  117: {
    shipId: 117, sortId: 113, name: '瑞鳳改', yomi: 'ずいほう', shipClass: 7, shipType: 11, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 45, firepower: 10, armor: 25, torpedo: 0, evasion: 30, aa: 18, aircraft: 4, speed: 10, los: 35, range: 1, luck: 40, asw: 0 }
  },
  118: {
    shipId: 118, sortId: 114, name: '大井改二', yomi: 'おおい', shipClass: 4, shipType: 4, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 43, firepower: 17, armor: 23, torpedo: 90, evasion: 124, aa: 15, aircraft: 3, speed: 10, los: 9, range: 2, luck: 13, asw: 27 }
  },
  119: {
    shipId: 119, sortId: 115, name: '北上改二', yomi: 'きたかみ', shipClass: 4, shipType: 4, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 43, firepower: 17, armor: 23, torpedo: 90, evasion: 124, aa: 15, aircraft: 3, speed: 10, los: 9, range: 2, luck: 30, asw: 27 }
  },
  120: {
    shipId: 120, sortId: 116, name: '三隈', yomi: 'みくま', shipClass: 5, shipType: 9, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 40, firepower: 40, armor: 30, torpedo: 18, evasion: 30, aa: 18, aircraft: 3, speed: 10, los: 14, range: 2, luck: 5, asw: 0 }
  },
  121: {
    shipId: 121, sortId: 117, name: '三隈改', yomi: 'みくま', shipClass: 6, shipType: 9, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 50, firepower: 24, armor: 37, torpedo: 18, evasion: 30, aa: 20, aircraft: 4, speed: 10, los: 22, range: 2, luck: 10, asw: 0 }
  },
  122: {
    shipId: 122, sortId: 119, name: '舞風', yomi: 'まいかぜ', shipClass: 2, shipType: 30, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 70, aa: 9, aircraft: 2, speed: 10, los: 6, range: 1, luck: 10, asw: 24 }
  },
  123: {
    shipId: 123, sortId: 120, name: '衣笠', yomi: 'きぬがさ', shipClass: 5, shipType: 13, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 37, firepower: 30, armor: 26, torpedo: 12, evasion: 30, aa: 16, aircraft: 3, speed: 10, los: 11, range: 2, luck: 20, asw: 0 }
  },
  124: {
    shipId: 124, sortId: 124, name: '鈴谷', yomi: 'すずや', shipClass: 5, shipType: 9, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 40, firepower: 40, armor: 30, torpedo: 18, evasion: 30, aa: 18, aircraft: 3, speed: 10, los: 14, range: 2, luck: 5, asw: 0 }
  },
  125: {
    shipId: 125, sortId: 125, name: '熊野', yomi: 'くまの', shipClass: 5, shipType: 9, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 40, firepower: 40, armor: 30, torpedo: 18, evasion: 30, aa: 18, aircraft: 3, speed: 10, los: 14, range: 2, luck: 5, asw: 0 }
  },
  126: {
    shipId: 126, sortId: 126, name: '伊168', yomi: 'い168', shipClass: 13, shipType: 35, rarity: 3,
    maxLevel: 100, slotCount: 1, initialStats: { hp: 10, firepower: 2, armor: 3, torpedo: 24, evasion: 30, aa: 10, aircraft: 1, speed: 5, los: 9, range: 1, luck: 10, asw: 0 }
  },
  127: {
    shipId: 127, sortId: 127, name: '伊58', yomi: 'い58', shipClass: 13, shipType: 36, rarity: 4,
    maxLevel: 100, slotCount: 1, initialStats: { hp: 14, firepower: 2, armor: 4, torpedo: 30, evasion: 30, aa: 10, aircraft: 1, speed: 5, los: 10, range: 1, luck: 40, asw: 0 }
  },
  128: {
    shipId: 128, sortId: 128, name: '伊8', yomi: 'い8', shipClass: 13, shipType: 40, rarity: 5,
    maxLevel: 100, slotCount: 1, initialStats: { hp: 15, firepower: 2, armor: 4, torpedo: 30, evasion: 30, aa: 10, aircraft: 1, speed: 5, los: 10, range: 1, luck: 20, asw: 0 }
  },
  129: {
    shipId: 129, sortId: 129, name: '鈴谷改', yomi: 'すずや', shipClass: 6, shipType: 9, rarity: 5,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 50, firepower: 24, armor: 37, torpedo: 18, evasion: 30, aa: 20, aircraft: 4, speed: 10, los: 22, range: 2, luck: 10, asw: 0 }
  },
  130: {
    shipId: 130, sortId: 130, name: '熊野改', yomi: 'くまの', shipClass: 6, shipType: 9, rarity: 5,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 50, firepower: 24, armor: 37, torpedo: 18, evasion: 30, aa: 20, aircraft: 4, speed: 10, los: 22, range: 2, luck: 10, asw: 0 }
  },
  131: {
    shipId: 131, sortId: 131, name: '大和', yomi: 'やまと', shipClass: 9, shipType: 37, rarity: 8,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 93, firepower: 96, armor: 88, torpedo: 0, evasion: 30, aa: 50, aircraft: 4, speed: 5, los: 15, range: 4, luck: 12, asw: 0 }
  },
  132: {
    shipId: 132, sortId: 132, name: '秋雲', yomi: 'あきぐも', shipClass: 2, shipType: 30, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 70, aa: 9, aircraft: 2, speed: 10, los: 6, range: 1, luck: 14, asw: 24 }
  },
  133: {
    shipId: 133, sortId: 133, name: '夕雲', yomi: 'ゆうぐも', shipClass: 2, shipType: 38, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 73, aa: 9, aircraft: 2, speed: 10, los: 6, range: 1, luck: 12, asw: 27 }
  },
  134: {
    shipId: 134, sortId: 134, name: '巻雲', yomi: 'まきぐも', shipClass: 2, shipType: 38, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 73, aa: 9, aircraft: 2, speed: 10, los: 6, range: 1, luck: 11, asw: 27 }
  },
  135: {
    shipId: 135, sortId: 135, name: '長波', yomi: 'ながなみ', shipClass: 2, shipType: 38, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 73, aa: 9, aircraft: 2, speed: 10, los: 6, range: 1, luck: 13, asw: 27 }
  },
  136: {
    shipId: 136, sortId: 136, name: '大和改', yomi: 'やまと', shipClass: 9, shipType: 37, rarity: 8,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 96, firepower: 92, armor: 92, torpedo: 0, evasion: 30, aa: 68, aircraft: 4, speed: 5, los: 17, range: 4, luck: 13, asw: 0 }
  },
  137: {
    shipId: 137, sortId: 137, name: '阿賀野', yomi: 'あがの', shipClass: 3, shipType: 41, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 30, firepower: 20, armor: 17, torpedo: 24, evasion: 109, aa: 17, aircraft: 3, speed: 10, los: 12, range: 2, luck: 10, asw: 25 }
  },
  138: {
    shipId: 138, sortId: 138, name: '能代', yomi: 'のしろ', shipClass: 3, shipType: 41, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 30, firepower: 20, armor: 17, torpedo: 24, evasion: 109, aa: 17, aircraft: 3, speed: 10, los: 12, range: 2, luck: 10, asw: 25 }
  },
  139: {
    shipId: 139, sortId: 139, name: '矢矧', yomi: 'やはぎ', shipClass: 3, shipType: 41, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 31, firepower: 20, armor: 17, torpedo: 24, evasion: 109, aa: 17, aircraft: 3, speed: 10, los: 13, range: 2, luck: 13, asw: 25 }
  },
  140: {
    shipId: 140, sortId: 140, name: '酒匂', yomi: 'さかわ', shipClass: 3, shipType: 41, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 31, firepower: 19, armor: 17, torpedo: 23, evasion: 111, aa: 17, aircraft: 3, speed: 10, los: 12, range: 2, luck: 20, asw: 27 }
  },
  141: {
    shipId: 141, sortId: 141, name: '五十鈴改二', yomi: 'いすず', shipClass: 3, shipType: 20, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 44, firepower: 18, armor: 30, torpedo: 24, evasion: 128, aa: 45, aircraft: 3, speed: 10, los: 15, range: 1, luck: 13, asw: 54 }
  },
  142: {
    shipId: 142, sortId: 142, name: '衣笠改二', yomi: 'きぬがさ', shipClass: 5, shipType: 13, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 53, firepower: 38, armor: 35, torpedo: 24, evasion: 30, aa: 22, aircraft: 4, speed: 10, los: 13, range: 2, luck: 13, asw: 0 }
  },
  143: {
    shipId: 143, sortId: 143, name: '武蔵', yomi: 'むさし', shipClass: 9, shipType: 37, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 94, firepower: 96, armor: 88, torpedo: 0, evasion: 30, aa: 50, aircraft: 4, speed: 5, los: 16, range: 4, luck: 10, asw: 0 }
  },
  144: {
    shipId: 144, sortId: 144, name: '夕立改二', yomi: 'ゆうだち', shipClass: 2, shipType: 23, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 31, firepower: 17, armor: 14, torpedo: 37, evasion: 104, aa: 16, aircraft: 3, speed: 10, los: 12, range: 1, luck: 20, asw: 28 }
  },
  145: {
    shipId: 145, sortId: 145, name: '時雨改二', yomi: 'しぐれ', shipClass: 2, shipType: 23, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 31, firepower: 13, armor: 14, torpedo: 28, evasion: 122, aa: 24, aircraft: 3, speed: 10, los: 20, range: 1, luck: 50, asw: 31 }
  },
  146: {
    shipId: 146, sortId: 146, name: '木曾改二', yomi: 'きそ', shipClass: 4, shipType: 4, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 44, firepower: 18, armor: 24, torpedo: 80, evasion: 125, aa: 24, aircraft: 3, speed: 10, los: 13, range: 2, luck: 13, asw: 32 }
  },
  147: {
    shipId: 147, sortId: 147, name: 'Верный', yomi: 'ひびき', shipClass: 2, shipType: 5, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 37, firepower: 13, armor: 15, torpedo: 30, evasion: 117, aa: 18, aircraft: 3, speed: 10, los: 10, range: 1, luck: 20, asw: 30 }
  },
  148: {
    shipId: 148, sortId: 148, name: '武蔵改', yomi: 'むさし', shipClass: 9, shipType: 37, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 97, firepower: 92, armor: 92, torpedo: 0, evasion: 30, aa: 60, aircraft: 4, speed: 5, los: 18, range: 4, luck: 9, asw: 0 }
  },
  149: {
    shipId: 149, sortId: 149, name: '金剛改二', yomi: 'こんごう', shipClass: 8, shipType: 6, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 82, firepower: 76, armor: 70, torpedo: 0, evasion: 30, aa: 30, aircraft: 4, speed: 10, los: 16, range: 3, luck: 15, asw: 0 }
  },
  150: {
    shipId: 150, sortId: 150, name: '比叡改二', yomi: 'ひえい', shipClass: 8, shipType: 6, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 83, firepower: 76, armor: 72, torpedo: 0, evasion: 30, aa: 30, aircraft: 4, speed: 10, los: 16, range: 3, luck: 13, asw: 0 }
  },
  151: {
    shipId: 151, sortId: 151, name: '榛名改二', yomi: 'はるな', shipClass: 8, shipType: 6, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 81, firepower: 75, armor: 70, torpedo: 0, evasion: 30, aa: 41, aircraft: 4, speed: 10, los: 17, range: 3, luck: 41, asw: 0 }
  },
  152: {
    shipId: 152, sortId: 152, name: '霧島改二', yomi: 'きりしま', shipClass: 8, shipType: 6, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 82, firepower: 78, armor: 70, torpedo: 0, evasion: 30, aa: 30, aircraft: 4, speed: 10, los: 15, range: 3, luck: 14, asw: 0 }
  },
  153: {
    shipId: 153, sortId: 153, name: '大鳳', yomi: 'たいほう', shipClass: 18, shipType: 43, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 67, firepower: 10, armor: 40, torpedo: 0, evasion: 30, aa: 42, aircraft: 4, speed: 10, los: 47, range: 1, luck: 2, asw: 0 }
  },
  154: {
    shipId: 154, sortId: 154, name: '香取', yomi: 'かとり', shipClass: 21, shipType: 56, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 36, firepower: 14, armor: 9, torpedo: 12, evasion: 68, aa: 14, aircraft: 3, speed: 5, los: 10, range: 2, luck: 10, asw: 12 }
  },
  155: {
    shipId: 155, sortId: 155, name: '伊401', yomi: 'い401', shipClass: 14, shipType: 44, rarity: 6,
    maxLevel: 100, slotCount: 1, initialStats: { hp: 20, firepower: 2, armor: 5, torpedo: 36, evasion: 30, aa: 10, aircraft: 1, speed: 5, los: 15, range: 1, luck: 20, asw: 0 }
  },
  156: {
    shipId: 156, sortId: 156, name: '大鳳改', yomi: 'たいほう', shipClass: 18, shipType: 43, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 70, firepower: 10, armor: 44, torpedo: 0, evasion: 30, aa: 45, aircraft: 4, speed: 10, los: 50, range: 1, luck: 4, asw: 0 }
  },
  157: {
    shipId: 157, sortId: 157, name: '龍驤改二', yomi: 'りゅうじょう', shipClass: 7, shipType: 32, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 50, firepower: 10, armor: 28, torpedo: 0, evasion: 30, aa: 24, aircraft: 4, speed: 10, los: 37, range: 1, luck: 15, asw: 0 }
  },
  158: {
    shipId: 158, sortId: 158, name: '川内改二', yomi: 'せんだい', shipClass: 3, shipType: 16, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 49, firepower: 24, armor: 29, torpedo: 26, evasion: 105, aa: 20, aircraft: 3, speed: 10, los: 16, range: 2, luck: 14, asw: 38 }
  },
  159: {
    shipId: 159, sortId: 159, name: '神通改二', yomi: 'じんつう', shipClass: 3, shipType: 16, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 51, firepower: 27, armor: 29, torpedo: 38, evasion: 114, aa: 18, aircraft: 3, speed: 10, los: 12, range: 2, luck: 13, asw: 40 }
  },
  160: {
    shipId: 160, sortId: 160, name: '那珂改二', yomi: 'なか', shipClass: 3, shipType: 16, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 48, firepower: 22, armor: 29, torpedo: 28, evasion: 119, aa: 24, aircraft: 3, speed: 10, los: 15, range: 2, luck: 13, asw: 48 }
  },
  161: {
    shipId: 161, sortId: 161, name: 'あきつ丸', yomi: 'あきつまる', shipClass: 17, shipType: 45, rarity: 5,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 38, firepower: 6, armor: 13, torpedo: 0, evasion: 30, aa: 13, aircraft: 2, speed: 5, los: 3, range: 1, luck: 10, asw: 0 }
  },
  162: {
    shipId: 162, sortId: 162, name: '神威', yomi: 'かもい', shipClass: 22, shipType: 72, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 36, firepower: 3, armor: 6, torpedo: 0, evasion: 30, aa: 8, aircraft: 3, speed: 5, los: 5, range: 2, luck: 17, asw: 0 }
  },
  163: {
    shipId: 163, sortId: 163, name: 'まるゆ', yomi: 'まるゆ', shipClass: 13, shipType: 46, rarity: 5,
    maxLevel: 100, slotCount: 0, initialStats: { hp: 6, firepower: 1, armor: 2, torpedo: 0, evasion: 30, aa: 10, aircraft: 0, speed: 5, los: 1, range: 1, luck: 7, asw: 0 }
  },
  164: {
    shipId: 164, sortId: 164, name: '弥生', yomi: 'やよい', shipClass: 2, shipType: 28, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 13, firepower: 6, armor: 5, torpedo: 18, evasion: 58, aa: 7, aircraft: 2, speed: 10, los: 4, range: 1, luck: 10, asw: 16 }
  },
  165: {
    shipId: 165, sortId: 165, name: '卯月', yomi: 'うづき', shipClass: 2, shipType: 28, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 13, firepower: 6, armor: 5, torpedo: 18, evasion: 58, aa: 7, aircraft: 2, speed: 10, los: 4, range: 1, luck: 10, asw: 16 }
  },
  166: {
    shipId: 166, sortId: 166, name: 'あきつ丸改', yomi: 'あきつまる', shipClass: 17, shipType: 45, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 40, firepower: 8, armor: 15, torpedo: 0, evasion: 30, aa: 15, aircraft: 3, speed: 5, los: 13, range: 1, luck: 13, asw: 0 }
  },
  167: {
    shipId: 167, sortId: 167, name: '磯風', yomi: 'いそかぜ', shipClass: 2, shipType: 30, rarity: 5,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 70, aa: 14, aircraft: 2, speed: 10, los: 8, range: 1, luck: 16, asw: 24 }
  },
  168: {
    shipId: 168, sortId: 168, name: '浦風', yomi: 'うらかぜ', shipClass: 2, shipType: 30, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 70, aa: 10, aircraft: 2, speed: 10, los: 7, range: 1, luck: 13, asw: 24 }
  },
  169: {
    shipId: 169, sortId: 169, name: '谷風', yomi: 'たにかぜ', shipClass: 2, shipType: 30, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 70, aa: 10, aircraft: 2, speed: 10, los: 7, range: 1, luck: 14, asw: 24 }
  },
  170: {
    shipId: 170, sortId: 170, name: '浜風', yomi: 'はまかぜ', shipClass: 2, shipType: 30, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 70, aa: 13, aircraft: 2, speed: 10, los: 7, range: 1, luck: 15, asw: 24 }
  },
  171: {
    shipId: 171, sortId: 171, name: 'Bismarck', yomi: 'ビスマルク', shipClass: 8, shipType: 47, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 90, firepower: 64, armor: 67, torpedo: 0, evasion: 30, aa: 18, aircraft: 4, speed: 10, los: 16, range: 3, luck: 8, asw: 0 }
  },
  172: {
    shipId: 172, sortId: 172, name: 'Bismarck改', yomi: 'ビスマルク', shipClass: 8, shipType: 47, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 94, firepower: 70, armor: 77, torpedo: 0, evasion: 30, aa: 24, aircraft: 4, speed: 10, los: 18, range: 3, luck: 10, asw: 0 }
  },
  173: {
    shipId: 173, sortId: 173, name: 'Bismarck zwei', yomi: 'ビスマルク', shipClass: 8, shipType: 47, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 96, firepower: 70, armor: 80, torpedo: 0, evasion: 30, aa: 25, aircraft: 4, speed: 10, los: 19, range: 3, luck: 20, asw: 0 }
  },
  174: {
    shipId: 174, sortId: 174, name: 'Z1', yomi: 'レーベレヒト・マース', shipClass: 2, shipType: 48, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 18, firepower: 8, armor: 8, torpedo: 24, evasion: 91, aa: 12, aircraft: 3, speed: 10, los: 6, range: 1, luck: 6, asw: 32 }
  },
  175: {
    shipId: 175, sortId: 175, name: 'Z3', yomi: 'マックス・シュルツ', shipClass: 2, shipType: 48, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 18, firepower: 8, armor: 8, torpedo: 24, evasion: 91, aa: 12, aircraft: 3, speed: 10, los: 6, range: 1, luck: 6, asw: 32 }
  },
  176: {
    shipId: 176, sortId: 176, name: 'Prinz Eugen', yomi: 'プリンツ・オイゲン', shipClass: 5, shipType: 55, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 50, firepower: 38, armor: 38, torpedo: 32, evasion: 30, aa: 16, aircraft: 3, speed: 10, los: 15, range: 2, luck: 30, asw: 0 }
  },
  177: {
    shipId: 177, sortId: 177, name: 'Prinz Eugen改', yomi: 'プリンツ・オイゲン', shipClass: 5, shipType: 55, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 63, firepower: 48, armor: 48, torpedo: 40, evasion: 30, aa: 18, aircraft: 4, speed: 10, los: 16, range: 2, luck: 40, asw: 0 }
  },
  178: {
    shipId: 178, sortId: 178, name: 'Bismarck drei', yomi: 'ビスマルク', shipClass: 8, shipType: 47, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 96, firepower: 74, armor: 82, torpedo: 16, evasion: 30, aa: 35, aircraft: 4, speed: 10, los: 22, range: 3, luck: 22, asw: 0 }
  },
  179: {
    shipId: 179, sortId: 179, name: 'Z1 zwei', yomi: 'レーベレヒト・マース', shipClass: 2, shipType: 48, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 35, firepower: 12, armor: 18, torpedo: 27, evasion: 96, aa: 20, aircraft: 3, speed: 10, los: 9, range: 1, luck: 15, asw: 37 }
  },
  180: {
    shipId: 180, sortId: 180, name: 'Z3 zwei', yomi: 'マックス・シュルツ', shipClass: 2, shipType: 48, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 35, firepower: 10, armor: 18, torpedo: 27, evasion: 96, aa: 24, aircraft: 3, speed: 10, los: 9, range: 1, luck: 15, asw: 37 }
  },
  181: {
    shipId: 181, sortId: 181, name: '天津風', yomi: 'あまつかぜ', shipClass: 2, shipType: 30, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 18, firepower: 10, armor: 7, torpedo: 28, evasion: 78, aa: 22, aircraft: 3, speed: 10, los: 8, range: 1, luck: 18, asw: 26 }
  },
  182: {
    shipId: 182, sortId: 182, name: '明石', yomi: 'あかし', shipClass: 19, shipType: 49, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 39, firepower: 4, armor: 7, torpedo: 0, evasion: 30, aa: 10, aircraft: 3, speed: 5, los: 1, range: 1, luck: 10, asw: 0 }
  },
  183: {
    shipId: 183, sortId: 183, name: '大淀', yomi: 'おおよど', shipClass: 3, shipType: 52, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 34, firepower: 24, armor: 19, torpedo: 0, evasion: 72, aa: 18, aircraft: 3, speed: 10, los: 24, range: 2, luck: 24, asw: 0 }
  },
  184: {
    shipId: 184, sortId: 184, name: '大鯨', yomi: 'たいげい・りゅうほう', shipClass: 20, shipType: 50, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 39, firepower: 5, armor: 15, torpedo: 0, evasion: 30, aa: 16, aircraft: 3, speed: 5, los: 24, range: 1, luck: 20, asw: 0 }
  },
  185: {
    shipId: 185, sortId: 185, name: '龍鳳', yomi: 'たいげい・りゅうほう', shipClass: 7, shipType: 51, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 39, firepower: 10, armor: 18, torpedo: 0, evasion: 30, aa: 24, aircraft: 3, speed: 5, los: 28, range: 1, luck: 20, asw: 0 }
  },
  186: {
    shipId: 186, sortId: 186, name: '時津風', yomi: 'ときつかぜ', shipClass: 2, shipType: 30, rarity: 5,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 70, aa: 10, aircraft: 2, speed: 10, los: 7, range: 1, luck: 13, asw: 24 }
  },
  187: {
    shipId: 187, sortId: 187, name: '明石改', yomi: 'あかし', shipClass: 19, shipType: 49, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 45, firepower: 6, armor: 9, torpedo: 0, evasion: 30, aa: 16, aircraft: 4, speed: 5, los: 2, range: 1, luck: 12, asw: 0 }
  },
  188: {
    shipId: 188, sortId: 188, name: '利根改二', yomi: 'とね', shipClass: 6, shipType: 31, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 59, firepower: 46, armor: 48, torpedo: 32, evasion: 30, aa: 32, aircraft: 4, speed: 10, los: 36, range: 2, luck: 15, asw: 0 }
  },
  189: {
    shipId: 189, sortId: 189, name: '筑摩改二', yomi: 'ちくま', shipClass: 6, shipType: 31, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 58, firepower: 46, armor: 48, torpedo: 33, evasion: 30, aa: 33, aircraft: 4, speed: 10, los: 30, range: 2, luck: 14, asw: 0 }
  },
  190: {
    shipId: 190, sortId: 118, name: '初風', yomi: 'はつかぜ', shipClass: 2, shipType: 30, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 70, aa: 9, aircraft: 2, speed: 10, los: 6, range: 1, luck: 10, asw: 24 }
  },
  191: {
    shipId: 191, sortId: 123, name: '伊19', yomi: 'い19', shipClass: 13, shipType: 39, rarity: 4,
    maxLevel: 100, slotCount: 1, initialStats: { hp: 14, firepower: 2, armor: 4, torpedo: 36, evasion: 30, aa: 10, aircraft: 1, speed: 5, los: 10, range: 1, luck: 12, asw: 0 }
  },
  192: {
    shipId: 192, sortId: 192, name: '那智改二', yomi: 'なち', shipClass: 5, shipType: 29, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 56, firepower: 50, armor: 48, torpedo: 34, evasion: 30, aa: 33, aircraft: 4, speed: 10, los: 20, range: 2, luck: 18, asw: 0 }
  },
  193: {
    shipId: 193, sortId: 193, name: '足柄改二', yomi: 'あしがら', shipClass: 5, shipType: 29, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 56, firepower: 53, armor: 47, torpedo: 34, evasion: 30, aa: 26, aircraft: 4, speed: 10, los: 17, range: 2, luck: 20, asw: 0 }
  },
  194: {
    shipId: 194, sortId: 194, name: '羽黒改二', yomi: 'はぐろ', shipClass: 5, shipType: 29, rarity: 5,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 57, firepower: 52, armor: 47, torpedo: 34, evasion: 30, aa: 24, aircraft: 4, speed: 10, los: 18, range: 2, luck: 19, asw: 0 }
  },
  195: {
    shipId: 195, sortId: 195, name: '綾波改二', yomi: 'あやなみ', shipClass: 2, shipType: 1, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 32, firepower: 17, armor: 15, torpedo: 30, evasion: 96, aa: 16, aircraft: 3, speed: 10, los: 13, range: 1, luck: 40, asw: 25 }
  },
  196: {
    shipId: 196, sortId: 196, name: '飛龍改二', yomi: 'ひりゅう', shipClass: 11, shipType: 25, rarity: 8,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 67, firepower: 10, armor: 37, torpedo: 0, evasion: 30, aa: 33, aircraft: 4, speed: 10, los: 52, range: 1, luck: 53, asw: 0 }
  },
  197: {
    shipId: 197, sortId: 197, name: '蒼龍改二', yomi: 'そうりゅう', shipClass: 11, shipType: 17, rarity: 8,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 67, firepower: 10, armor: 36, torpedo: 0, evasion: 30, aa: 34, aircraft: 4, speed: 10, los: 55, range: 1, luck: 17, asw: 0 }
  },
  198: {
    shipId: 198, sortId: 198, name: '霰改二', yomi: 'あられ', shipClass: 2, shipType: 18, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 31, firepower: 16, armor: 14, torpedo: 32, evasion: 122, aa: 20, aircraft: 3, speed: 10, los: 11, range: 1, luck: 15, asw: 33 }
  },
  199: {
    shipId: 199, sortId: 199, name: '大潮改二', yomi: 'おおしお', shipClass: 2, shipType: 18, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 31, firepower: 17, armor: 14, torpedo: 33, evasion: 97, aa: 20, aircraft: 3, speed: 10, los: 12, range: 1, luck: 17, asw: 26 }
  },
  200: {
    shipId: 200, sortId: 200, name: '阿武隈改二', yomi: 'あぶくま', shipClass: 3, shipType: 20, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 45, firepower: 16, armor: 29, torpedo: 34, evasion: 111, aa: 35, aircraft: 3, speed: 10, los: 16, range: 1, luck: 20, asw: 48 }
  },
  201: {
    shipId: 201, sortId: 1301, name: '吹雪改', yomi: 'ふぶき', shipClass: 2, shipType: 12, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 30, firepower: 12, armor: 13, torpedo: 28, evasion: 89, aa: 15, aircraft: 3, speed: 10, los: 7, range: 1, luck: 12, asw: 24 }
  },
  202: {
    shipId: 202, sortId: 1302, name: '白雪改', yomi: 'しらゆき', shipClass: 2, shipType: 12, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 30, firepower: 12, armor: 13, torpedo: 28, evasion: 89, aa: 15, aircraft: 3, speed: 10, los: 7, range: 1, luck: 12, asw: 24 }
  },
  203: {
    shipId: 203, sortId: 1303, name: '初雪改', yomi: 'はつゆき', shipClass: 2, shipType: 12, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 30, firepower: 12, armor: 13, torpedo: 28, evasion: 89, aa: 15, aircraft: 3, speed: 10, los: 7, range: 1, luck: 12, asw: 24 }
  },
  204: {
    shipId: 204, sortId: 1304, name: '深雪改', yomi: 'みゆき', shipClass: 2, shipType: 12, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 30, firepower: 12, armor: 13, torpedo: 28, evasion: 89, aa: 15, aircraft: 3, speed: 10, los: 7, range: 1, luck: 12, asw: 24 }
  },
  205: {
    shipId: 205, sortId: 1305, name: '叢雲改', yomi: 'むらくも', shipClass: 2, shipType: 12, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 30, firepower: 12, armor: 13, torpedo: 28, evasion: 89, aa: 15, aircraft: 3, speed: 10, los: 7, range: 1, luck: 12, asw: 24 }
  },
  206: {
    shipId: 206, sortId: 1306, name: '磯波改', yomi: 'いそなみ', shipClass: 2, shipType: 12, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 30, firepower: 12, armor: 13, torpedo: 28, evasion: 89, aa: 15, aircraft: 3, speed: 10, los: 7, range: 1, luck: 12, asw: 24 }
  },
  207: {
    shipId: 207, sortId: 1307, name: '綾波改', yomi: 'あやなみ', shipClass: 2, shipType: 1, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 30, firepower: 12, armor: 13, torpedo: 28, evasion: 89, aa: 15, aircraft: 3, speed: 10, los: 7, range: 1, luck: 12, asw: 24 }
  },
  208: {
    shipId: 208, sortId: 1308, name: '敷波改', yomi: 'しきなみ', shipClass: 2, shipType: 1, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 30, firepower: 12, armor: 13, torpedo: 28, evasion: 89, aa: 15, aircraft: 3, speed: 10, los: 7, range: 1, luck: 12, asw: 24 }
  },
  209: {
    shipId: 209, sortId: 1309, name: '金剛改', yomi: 'こんごう', shipClass: 8, shipType: 6, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 75, firepower: 72, armor: 67, torpedo: 0, evasion: 30, aa: 28, aircraft: 4, speed: 10, los: 15, range: 3, luck: 12, asw: 0 }
  },
  210: {
    shipId: 210, sortId: 1310, name: '比叡改', yomi: 'ひえい', shipClass: 8, shipType: 6, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 75, firepower: 72, armor: 67, torpedo: 0, evasion: 30, aa: 28, aircraft: 4, speed: 10, los: 15, range: 3, luck: 12, asw: 0 }
  },
  211: {
    shipId: 211, sortId: 1311, name: '榛名改', yomi: 'はるな', shipClass: 8, shipType: 6, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 75, firepower: 72, armor: 67, torpedo: 0, evasion: 30, aa: 28, aircraft: 4, speed: 10, los: 15, range: 3, luck: 20, asw: 0 }
  },
  212: {
    shipId: 212, sortId: 1312, name: '霧島改', yomi: 'きりしま', shipClass: 8, shipType: 6, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 75, firepower: 72, armor: 67, torpedo: 0, evasion: 30, aa: 28, aircraft: 4, speed: 10, los: 15, range: 3, luck: 12, asw: 0 }
  },
  213: {
    shipId: 213, sortId: 1313, name: '天龍改', yomi: 'てんりゅう', shipClass: 3, shipType: 21, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 40, firepower: 20, armor: 28, torpedo: 24, evasion: 108, aa: 12, aircraft: 3, speed: 10, los: 10, range: 2, luck: 12, asw: 24 }
  },
  214: {
    shipId: 214, sortId: 1314, name: '龍田改', yomi: 'たつた', shipClass: 3, shipType: 21, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 40, firepower: 20, armor: 28, torpedo: 24, evasion: 108, aa: 12, aircraft: 3, speed: 10, los: 10, range: 2, luck: 12, asw: 24 }
  },
  215: {
    shipId: 215, sortId: 1315, name: '球磨改', yomi: 'くま', shipClass: 3, shipType: 4, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 42, firepower: 20, armor: 29, torpedo: 24, evasion: 126, aa: 15, aircraft: 3, speed: 10, los: 10, range: 2, luck: 12, asw: 24 }
  },
  216: {
    shipId: 216, sortId: 1316, name: '多摩改', yomi: 'たま', shipClass: 3, shipType: 4, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 42, firepower: 20, armor: 29, torpedo: 24, evasion: 126, aa: 15, aircraft: 3, speed: 10, los: 10, range: 2, luck: 12, asw: 24 }
  },
  217: {
    shipId: 217, sortId: 1317, name: '木曾改', yomi: 'きそ', shipClass: 3, shipType: 4, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 42, firepower: 20, armor: 29, torpedo: 24, evasion: 126, aa: 15, aircraft: 3, speed: 10, los: 10, range: 2, luck: 12, asw: 24 }
  },
  218: {
    shipId: 218, sortId: 1318, name: '長良改', yomi: 'ながら', shipClass: 3, shipType: 20, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 43, firepower: 20, armor: 29, torpedo: 24, evasion: 126, aa: 15, aircraft: 3, speed: 10, los: 10, range: 2, luck: 12, asw: 24 }
  },
  219: {
    shipId: 219, sortId: 1319, name: '五十鈴改', yomi: 'いすず', shipClass: 3, shipType: 20, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 37, firepower: 18, armor: 29, torpedo: 24, evasion: 105, aa: 40, aircraft: 3, speed: 10, los: 10, range: 2, luck: 12, asw: 48 }
  },
  220: {
    shipId: 220, sortId: 1320, name: '由良改', yomi: 'ゆら', shipClass: 3, shipType: 20, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 43, firepower: 20, armor: 29, torpedo: 24, evasion: 105, aa: 15, aircraft: 3, speed: 10, los: 10, range: 2, luck: 12, asw: 48 }
  },
  221: {
    shipId: 221, sortId: 1321, name: '名取改', yomi: 'なとり', shipClass: 3, shipType: 20, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 43, firepower: 20, armor: 29, torpedo: 24, evasion: 126, aa: 15, aircraft: 3, speed: 10, los: 10, range: 2, luck: 12, asw: 24 }
  },
  222: {
    shipId: 222, sortId: 1322, name: '川内改', yomi: 'せんだい', shipClass: 3, shipType: 16, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 44, firepower: 20, armor: 29, torpedo: 24, evasion: 126, aa: 15, aircraft: 3, speed: 10, los: 10, range: 2, luck: 12, asw: 24 }
  },
  223: {
    shipId: 223, sortId: 1323, name: '神通改', yomi: 'じんつう', shipClass: 3, shipType: 16, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 44, firepower: 20, armor: 29, torpedo: 24, evasion: 126, aa: 15, aircraft: 3, speed: 10, los: 10, range: 2, luck: 12, asw: 24 }
  },
  224: {
    shipId: 224, sortId: 1324, name: '那珂改', yomi: 'なか', shipClass: 3, shipType: 16, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 44, firepower: 20, armor: 29, torpedo: 24, evasion: 119, aa: 15, aircraft: 3, speed: 10, los: 10, range: 2, luck: 12, asw: 32 }
  },
  225: {
    shipId: 225, sortId: 1325, name: '陽炎改', yomi: 'かげろう', shipClass: 2, shipType: 30, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 32, firepower: 12, armor: 14, torpedo: 28, evasion: 86, aa: 16, aircraft: 3, speed: 10, los: 8, range: 1, luck: 12, asw: 27 }
  },
  226: {
    shipId: 226, sortId: 1326, name: '不知火改', yomi: 'しらぬい', shipClass: 2, shipType: 30, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 32, firepower: 12, armor: 14, torpedo: 28, evasion: 86, aa: 16, aircraft: 3, speed: 10, los: 8, range: 1, luck: 12, asw: 27 }
  },
  227: {
    shipId: 227, sortId: 1327, name: '黒潮改', yomi: 'くろしお', shipClass: 2, shipType: 30, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 32, firepower: 12, armor: 14, torpedo: 28, evasion: 86, aa: 16, aircraft: 3, speed: 10, los: 8, range: 1, luck: 12, asw: 27 }
  },
  228: {
    shipId: 228, sortId: 1328, name: '雪風改', yomi: 'ゆきかぜ', shipClass: 2, shipType: 30, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 32, firepower: 12, armor: 14, torpedo: 28, evasion: 88, aa: 16, aircraft: 3, speed: 10, los: 8, range: 1, luck: 60, asw: 27 }
  },
  229: {
    shipId: 229, sortId: 1329, name: '島風改', yomi: 'しまかぜ', shipClass: 2, shipType: 22, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 36, firepower: 14, armor: 14, torpedo: 48, evasion: 86, aa: 16, aircraft: 3, speed: 10, los: 9, range: 1, luck: 12, asw: 27 }
  },
  230: {
    shipId: 230, sortId: 1330, name: '朧改', yomi: 'おぼろ', shipClass: 2, shipType: 1, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 30, firepower: 12, armor: 13, torpedo: 28, evasion: 89, aa: 15, aircraft: 3, speed: 10, los: 7, range: 1, luck: 12, asw: 24 }
  },
  231: {
    shipId: 231, sortId: 1331, name: '曙改', yomi: 'あけぼの', shipClass: 2, shipType: 1, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 30, firepower: 12, armor: 13, torpedo: 28, evasion: 89, aa: 15, aircraft: 3, speed: 10, los: 7, range: 1, luck: 12, asw: 24 }
  },
  232: {
    shipId: 232, sortId: 1332, name: '漣改', yomi: 'さざなみ', shipClass: 2, shipType: 1, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 30, firepower: 12, armor: 13, torpedo: 28, evasion: 89, aa: 15, aircraft: 3, speed: 10, los: 7, range: 1, luck: 12, asw: 24 }
  },
  233: {
    shipId: 233, sortId: 1333, name: '潮改', yomi: 'うしお', shipClass: 2, shipType: 1, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 30, firepower: 12, armor: 13, torpedo: 28, evasion: 89, aa: 15, aircraft: 3, speed: 10, los: 7, range: 1, luck: 20, asw: 24 }
  },
  234: {
    shipId: 234, sortId: 1334, name: '暁改', yomi: 'あかつき', shipClass: 2, shipType: 5, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 30, firepower: 12, armor: 13, torpedo: 28, evasion: 89, aa: 15, aircraft: 3, speed: 10, los: 7, range: 1, luck: 12, asw: 24 }
  },
  235: {
    shipId: 235, sortId: 1335, name: '響改', yomi: 'ひびき', shipClass: 2, shipType: 5, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 30, firepower: 12, armor: 13, torpedo: 28, evasion: 89, aa: 15, aircraft: 3, speed: 10, los: 7, range: 1, luck: 12, asw: 24 }
  },
  236: {
    shipId: 236, sortId: 1336, name: '雷改', yomi: 'いかづち', shipClass: 2, shipType: 5, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 30, firepower: 12, armor: 13, torpedo: 28, evasion: 89, aa: 15, aircraft: 3, speed: 10, los: 7, range: 1, luck: 12, asw: 24 }
  },
  237: {
    shipId: 237, sortId: 1337, name: '電改', yomi: 'いなづま', shipClass: 2, shipType: 5, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 30, firepower: 12, armor: 13, torpedo: 28, evasion: 89, aa: 15, aircraft: 3, speed: 10, los: 7, range: 1, luck: 12, asw: 24 }
  },
  238: {
    shipId: 238, sortId: 1338, name: '初春改', yomi: 'はつはる', shipClass: 2, shipType: 10, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 30, firepower: 12, armor: 13, torpedo: 28, evasion: 89, aa: 15, aircraft: 3, speed: 10, los: 7, range: 1, luck: 12, asw: 24 }
  },
  239: {
    shipId: 239, sortId: 1339, name: '子日改', yomi: 'ねのひ', shipClass: 2, shipType: 10, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 30, firepower: 12, armor: 13, torpedo: 28, evasion: 89, aa: 15, aircraft: 3, speed: 10, los: 7, range: 1, luck: 12, asw: 24 }
  },
  240: {
    shipId: 240, sortId: 1340, name: '若葉改', yomi: 'わかば', shipClass: 2, shipType: 10, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 30, firepower: 12, armor: 13, torpedo: 28, evasion: 89, aa: 15, aircraft: 3, speed: 10, los: 7, range: 1, luck: 12, asw: 24 }
  },
  241: {
    shipId: 241, sortId: 1341, name: '初霜改', yomi: 'はつしも', shipClass: 2, shipType: 10, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 30, firepower: 12, armor: 13, torpedo: 28, evasion: 89, aa: 15, aircraft: 3, speed: 10, los: 7, range: 1, luck: 12, asw: 24 }
  },
  242: {
    shipId: 242, sortId: 1342, name: '白露改', yomi: 'しらつゆ', shipClass: 2, shipType: 23, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 30, firepower: 12, armor: 14, torpedo: 28, evasion: 89, aa: 15, aircraft: 3, speed: 10, los: 7, range: 1, luck: 12, asw: 24 }
  },
  243: {
    shipId: 243, sortId: 1343, name: '時雨改', yomi: 'しぐれ', shipClass: 2, shipType: 23, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 30, firepower: 12, armor: 14, torpedo: 28, evasion: 89, aa: 15, aircraft: 3, speed: 10, los: 7, range: 1, luck: 12, asw: 24 }
  },
  244: {
    shipId: 244, sortId: 1344, name: '村雨改', yomi: 'むらさめ', shipClass: 2, shipType: 23, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 30, firepower: 12, armor: 14, torpedo: 28, evasion: 89, aa: 15, aircraft: 3, speed: 10, los: 7, range: 1, luck: 12, asw: 24 }
  },
  245: {
    shipId: 245, sortId: 1345, name: '夕立改', yomi: 'ゆうだち', shipClass: 2, shipType: 23, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 30, firepower: 12, armor: 14, torpedo: 28, evasion: 89, aa: 15, aircraft: 3, speed: 10, los: 7, range: 1, luck: 12, asw: 24 }
  },
  246: {
    shipId: 246, sortId: 1346, name: '五月雨改', yomi: 'さみだれ', shipClass: 2, shipType: 23, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 30, firepower: 12, armor: 14, torpedo: 28, evasion: 89, aa: 15, aircraft: 3, speed: 10, los: 7, range: 1, luck: 12, asw: 24 }
  },
  247: {
    shipId: 247, sortId: 1347, name: '涼風改', yomi: 'すずかぜ', shipClass: 2, shipType: 23, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 30, firepower: 12, armor: 14, torpedo: 28, evasion: 89, aa: 15, aircraft: 3, speed: 10, los: 7, range: 1, luck: 12, asw: 24 }
  },
  248: {
    shipId: 248, sortId: 1348, name: '朝潮改', yomi: 'あさしお', shipClass: 2, shipType: 18, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 31, firepower: 12, armor: 14, torpedo: 28, evasion: 89, aa: 16, aircraft: 3, speed: 10, los: 8, range: 1, luck: 12, asw: 24 }
  },
  249: {
    shipId: 249, sortId: 1349, name: '大潮改', yomi: 'おおしお', shipClass: 2, shipType: 18, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 31, firepower: 12, armor: 14, torpedo: 28, evasion: 89, aa: 16, aircraft: 3, speed: 10, los: 8, range: 1, luck: 12, asw: 24 }
  },
  250: {
    shipId: 250, sortId: 1350, name: '満潮改', yomi: 'みちしお', shipClass: 2, shipType: 18, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 31, firepower: 12, armor: 14, torpedo: 28, evasion: 89, aa: 16, aircraft: 3, speed: 10, los: 8, range: 1, luck: 12, asw: 24 }
  },
  251: {
    shipId: 251, sortId: 1351, name: '荒潮改', yomi: 'あらしお', shipClass: 2, shipType: 18, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 31, firepower: 12, armor: 14, torpedo: 28, evasion: 89, aa: 16, aircraft: 3, speed: 10, los: 8, range: 1, luck: 12, asw: 24 }
  },
  252: {
    shipId: 252, sortId: 1352, name: '霰改', yomi: 'あられ', shipClass: 2, shipType: 18, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 31, firepower: 12, armor: 14, torpedo: 28, evasion: 89, aa: 16, aircraft: 3, speed: 10, los: 8, range: 1, luck: 12, asw: 24 }
  },
  253: {
    shipId: 253, sortId: 1353, name: '霞改', yomi: 'かすみ', shipClass: 2, shipType: 18, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 31, firepower: 12, armor: 14, torpedo: 28, evasion: 89, aa: 16, aircraft: 3, speed: 10, los: 8, range: 1, luck: 20, asw: 24 }
  },
  254: {
    shipId: 254, sortId: 1354, name: '睦月改', yomi: 'むつき', shipClass: 2, shipType: 28, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 24, firepower: 9, armor: 11, torpedo: 18, evasion: 94, aa: 12, aircraft: 3, speed: 10, los: 6, range: 1, luck: 12, asw: 18 }
  },
  255: {
    shipId: 255, sortId: 1355, name: '如月改', yomi: 'きさらぎ', shipClass: 2, shipType: 28, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 24, firepower: 9, armor: 11, torpedo: 18, evasion: 94, aa: 12, aircraft: 3, speed: 10, los: 6, range: 1, luck: 12, asw: 18 }
  },
  256: {
    shipId: 256, sortId: 1356, name: '皐月改', yomi: 'さつき', shipClass: 2, shipType: 28, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 24, firepower: 9, armor: 11, torpedo: 18, evasion: 94, aa: 12, aircraft: 3, speed: 10, los: 6, range: 1, luck: 12, asw: 18 }
  },
  257: {
    shipId: 257, sortId: 1357, name: '文月改', yomi: 'ふみづき', shipClass: 2, shipType: 28, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 24, firepower: 9, armor: 11, torpedo: 18, evasion: 94, aa: 12, aircraft: 3, speed: 10, los: 6, range: 1, luck: 12, asw: 18 }
  },
  258: {
    shipId: 258, sortId: 1358, name: '長月改', yomi: 'ながつき', shipClass: 2, shipType: 28, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 24, firepower: 9, armor: 11, torpedo: 18, evasion: 94, aa: 12, aircraft: 3, speed: 10, los: 6, range: 1, luck: 20, asw: 18 }
  },
  259: {
    shipId: 259, sortId: 1359, name: '菊月改', yomi: 'きくづき', shipClass: 2, shipType: 28, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 24, firepower: 9, armor: 11, torpedo: 18, evasion: 94, aa: 12, aircraft: 3, speed: 10, los: 6, range: 1, luck: 12, asw: 18 }
  },
  260: {
    shipId: 260, sortId: 1360, name: '三日月改', yomi: 'みかづき', shipClass: 2, shipType: 28, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 24, firepower: 9, armor: 11, torpedo: 18, evasion: 94, aa: 12, aircraft: 3, speed: 10, los: 6, range: 1, luck: 12, asw: 18 }
  },
  261: {
    shipId: 261, sortId: 1361, name: '望月改', yomi: 'もちづき', shipClass: 2, shipType: 28, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 24, firepower: 9, armor: 11, torpedo: 18, evasion: 94, aa: 12, aircraft: 3, speed: 10, los: 6, range: 1, luck: 12, asw: 18 }
  },
  262: {
    shipId: 262, sortId: 1362, name: '古鷹改', yomi: 'ふるたか', shipClass: 5, shipType: 7, rarity: 4,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 48, firepower: 36, armor: 32, torpedo: 18, evasion: 30, aa: 18, aircraft: 4, speed: 10, los: 12, range: 2, luck: 10, asw: 0 }
  },
  263: {
    shipId: 263, sortId: 1363, name: '加古改', yomi: 'かこ', shipClass: 5, shipType: 7, rarity: 4,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 48, firepower: 36, armor: 32, torpedo: 18, evasion: 30, aa: 18, aircraft: 4, speed: 10, los: 12, range: 2, luck: 10, asw: 0 }
  },
  264: {
    shipId: 264, sortId: 1364, name: '青葉改', yomi: 'あおば', shipClass: 5, shipType: 13, rarity: 4,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 49, firepower: 36, armor: 34, torpedo: 18, evasion: 30, aa: 18, aircraft: 4, speed: 10, los: 12, range: 2, luck: 30, asw: 0 }
  },
  265: {
    shipId: 265, sortId: 1365, name: '妙高改', yomi: 'みょうこう', shipClass: 5, shipType: 29, rarity: 5,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 55, firepower: 48, armor: 42, torpedo: 24, evasion: 30, aa: 18, aircraft: 4, speed: 10, los: 14, range: 2, luck: 10, asw: 0 }
  },
  266: {
    shipId: 266, sortId: 1366, name: '那智改', yomi: 'なち', shipClass: 5, shipType: 29, rarity: 4,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 55, firepower: 48, armor: 42, torpedo: 24, evasion: 30, aa: 18, aircraft: 4, speed: 10, los: 14, range: 2, luck: 10, asw: 0 }
  },
  267: {
    shipId: 267, sortId: 1367, name: '足柄改', yomi: 'あしがら', shipClass: 5, shipType: 29, rarity: 4,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 55, firepower: 48, armor: 42, torpedo: 24, evasion: 30, aa: 18, aircraft: 4, speed: 10, los: 14, range: 2, luck: 10, asw: 0 }
  },
  268: {
    shipId: 268, sortId: 1368, name: '羽黒改', yomi: 'はぐろ', shipClass: 5, shipType: 29, rarity: 4,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 55, firepower: 48, armor: 42, torpedo: 24, evasion: 30, aa: 18, aircraft: 4, speed: 10, los: 14, range: 2, luck: 10, asw: 0 }
  },
  269: {
    shipId: 269, sortId: 1369, name: '高雄改', yomi: 'たかお', shipClass: 5, shipType: 8, rarity: 5,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 57, firepower: 48, armor: 45, torpedo: 24, evasion: 30, aa: 20, aircraft: 4, speed: 10, los: 14, range: 2, luck: 10, asw: 0 }
  },
  270: {
    shipId: 270, sortId: 1370, name: '愛宕改', yomi: 'あたご', shipClass: 5, shipType: 8, rarity: 5,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 57, firepower: 48, armor: 45, torpedo: 24, evasion: 30, aa: 20, aircraft: 4, speed: 10, los: 14, range: 2, luck: 10, asw: 0 }
  },
  271: {
    shipId: 271, sortId: 1371, name: '摩耶改', yomi: 'まや', shipClass: 5, shipType: 8, rarity: 4,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 55, firepower: 43, armor: 45, torpedo: 24, evasion: 30, aa: 55, aircraft: 4, speed: 10, los: 14, range: 2, luck: 10, asw: 0 }
  },
  272: {
    shipId: 272, sortId: 1372, name: '鳥海改', yomi: 'ちょうかい', shipClass: 5, shipType: 8, rarity: 4,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 57, firepower: 48, armor: 45, torpedo: 24, evasion: 30, aa: 20, aircraft: 4, speed: 10, los: 14, range: 2, luck: 10, asw: 0 }
  },
  273: {
    shipId: 273, sortId: 1373, name: '利根改', yomi: 'とね', shipClass: 5, shipType: 31, rarity: 5,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 56, firepower: 42, armor: 46, torpedo: 24, evasion: 30, aa: 24, aircraft: 4, speed: 10, los: 24, range: 2, luck: 10, asw: 0 }
  },
  274: {
    shipId: 274, sortId: 1374, name: '筑摩改', yomi: 'ちくま', shipClass: 5, shipType: 31, rarity: 5,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 56, firepower: 42, armor: 46, torpedo: 24, evasion: 30, aa: 24, aircraft: 4, speed: 10, los: 24, range: 2, luck: 10, asw: 0 }
  },
  275: {
    shipId: 275, sortId: 1375, name: '長門改', yomi: 'ながと', shipClass: 9, shipType: 19, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 90, firepower: 90, armor: 85, torpedo: 0, evasion: 30, aa: 33, aircraft: 4, speed: 5, los: 15, range: 3, luck: 32, asw: 0 }
  },
  276: {
    shipId: 276, sortId: 1376, name: '陸奥改', yomi: 'むつ', shipClass: 9, shipType: 19, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 90, firepower: 90, armor: 85, torpedo: 0, evasion: 30, aa: 33, aircraft: 4, speed: 5, los: 15, range: 3, luck: 6, asw: 0 }
  },
  277: {
    shipId: 277, sortId: 1377, name: '赤城改', yomi: 'あかぎ', shipClass: 11, shipType: 14, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 77, firepower: 10, armor: 40, torpedo: 0, evasion: 30, aa: 35, aircraft: 4, speed: 10, los: 50, range: 1, luck: 12, asw: 0 }
  },
  278: {
    shipId: 278, sortId: 1378, name: '加賀改', yomi: 'かが', shipClass: 11, shipType: 3, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 79, firepower: 10, armor: 40, torpedo: 0, evasion: 30, aa: 30, aircraft: 4, speed: 10, los: 50, range: 1, luck: 12, asw: 0 }
  },
  279: {
    shipId: 279, sortId: 1379, name: '蒼龍改', yomi: 'そうりゅう', shipClass: 11, shipType: 17, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 65, firepower: 10, armor: 35, torpedo: 0, evasion: 30, aa: 30, aircraft: 4, speed: 10, los: 46, range: 1, luck: 12, asw: 0 }
  },
  280: {
    shipId: 280, sortId: 1380, name: '飛龍改', yomi: 'ひりゅう', shipClass: 11, shipType: 25, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 65, firepower: 10, armor: 35, torpedo: 0, evasion: 30, aa: 30, aircraft: 4, speed: 10, los: 46, range: 1, luck: 40, asw: 0 }
  },
  281: {
    shipId: 281, sortId: 1381, name: '龍驤改', yomi: 'りゅうじょう', shipClass: 7, shipType: 32, rarity: 5,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 45, firepower: 10, armor: 25, torpedo: 0, evasion: 30, aa: 20, aircraft: 4, speed: 10, los: 35, range: 1, luck: 12, asw: 0 }
  },
  282: {
    shipId: 282, sortId: 1382, name: '祥鳳改', yomi: 'しょうほう', shipClass: 7, shipType: 11, rarity: 5,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 45, firepower: 10, armor: 25, torpedo: 0, evasion: 30, aa: 18, aircraft: 4, speed: 10, los: 35, range: 1, luck: 12, asw: 0 }
  },
  283: {
    shipId: 283, sortId: 1383, name: '飛鷹改', yomi: 'ひよう', shipClass: 7, shipType: 24, rarity: 5,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 50, firepower: 10, armor: 30, torpedo: 0, evasion: 30, aa: 25, aircraft: 4, speed: 5, los: 40, range: 1, luck: 12, asw: 0 }
  },
  284: {
    shipId: 284, sortId: 1384, name: '隼鷹改', yomi: 'じゅんよう', shipClass: 7, shipType: 24, rarity: 5,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 50, firepower: 10, armor: 30, torpedo: 0, evasion: 30, aa: 25, aircraft: 4, speed: 5, los: 40, range: 1, luck: 30, asw: 0 }
  },
  285: {
    shipId: 285, sortId: 1385, name: '鳳翔改', yomi: 'ほうしょう', shipClass: 7, shipType: 27, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 40, firepower: 10, armor: 25, torpedo: 0, evasion: 30, aa: 15, aircraft: 3, speed: 5, los: 35, range: 1, luck: 30, asw: 0 }
  },
  286: {
    shipId: 286, sortId: 1386, name: '扶桑改', yomi: 'ふそう', shipClass: 10, shipType: 26, rarity: 5,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 75, firepower: 63, armor: 72, torpedo: 0, evasion: 30, aa: 40, aircraft: 4, speed: 5, los: 18, range: 3, luck: 10, asw: 0 }
  },
  287: {
    shipId: 287, sortId: 1387, name: '山城改', yomi: 'やましろ', shipClass: 10, shipType: 26, rarity: 5,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 75, firepower: 63, armor: 72, torpedo: 0, evasion: 30, aa: 40, aircraft: 4, speed: 5, los: 18, range: 3, luck: 10, asw: 0 }
  },
  288: {
    shipId: 288, sortId: 1388, name: '翔鶴改', yomi: 'しょうかく', shipClass: 11, shipType: 33, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 75, firepower: 10, armor: 42, torpedo: 0, evasion: 30, aa: 40, aircraft: 4, speed: 10, los: 48, range: 1, luck: 12, asw: 0 }
  },
  289: {
    shipId: 289, sortId: 1389, name: '鬼怒改', yomi: 'きぬ', shipClass: 3, shipType: 20, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 41, firepower: 20, armor: 29, torpedo: 24, evasion: 105, aa: 15, aircraft: 3, speed: 10, los: 10, range: 2, luck: 12, asw: 48 }
  },
  290: {
    shipId: 290, sortId: 1390, name: '阿武隈改', yomi: 'あぶくま', shipClass: 3, shipType: 20, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 42, firepower: 20, armor: 29, torpedo: 24, evasion: 105, aa: 15, aircraft: 3, speed: 10, los: 10, range: 2, luck: 12, asw: 48 }
  },
  291: {
    shipId: 291, sortId: 1391, name: '千歳航改', yomi: 'ちとせ', shipClass: 7, shipType: 15, rarity: 5,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 57, firepower: 10, armor: 32, torpedo: 0, evasion: 30, aa: 27, aircraft: 4, speed: 10, los: 42, range: 1, luck: 12, asw: 0 }
  },
  292: {
    shipId: 292, sortId: 1392, name: '千代田航改', yomi: 'ちよだ', shipClass: 7, shipType: 15, rarity: 5,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 57, firepower: 10, armor: 32, torpedo: 0, evasion: 30, aa: 27, aircraft: 4, speed: 10, los: 42, range: 1, luck: 12, asw: 0 }
  },
  293: {
    shipId: 293, sortId: 1393, name: '夕張改', yomi: 'ゆうばり', shipClass: 3, shipType: 34, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 36, firepower: 23, armor: 28, torpedo: 24, evasion: 108, aa: 20, aircraft: 4, speed: 10, los: 8, range: 2, luck: 17, asw: 24 }
  },
  294: {
    shipId: 294, sortId: 1394, name: '舞風改', yomi: 'まいかぜ', shipClass: 2, shipType: 30, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 32, firepower: 12, armor: 14, torpedo: 28, evasion: 111, aa: 16, aircraft: 3, speed: 10, los: 8, range: 1, luck: 12, asw: 27 }
  },
  295: {
    shipId: 295, sortId: 1395, name: '衣笠改', yomi: 'きぬがさ', shipClass: 5, shipType: 13, rarity: 5,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 49, firepower: 36, armor: 34, torpedo: 18, evasion: 30, aa: 18, aircraft: 4, speed: 10, los: 12, range: 2, luck: 10, asw: 0 }
  },
  296: {
    shipId: 296, sortId: 121, name: '千歳航改二', yomi: 'ちとせ', shipClass: 7, shipType: 15, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 58, firepower: 10, armor: 32, torpedo: 0, evasion: 30, aa: 30, aircraft: 4, speed: 10, los: 42, range: 1, luck: 13, asw: 0 }
  },
  297: {
    shipId: 297, sortId: 122, name: '千代田航改二', yomi: 'ちよだ', shipClass: 7, shipType: 15, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 58, firepower: 10, armor: 32, torpedo: 0, evasion: 30, aa: 30, aircraft: 4, speed: 10, los: 42, range: 1, luck: 13, asw: 0 }
  },
  299: {
    shipId: 299, sortId: 493, name: 'Scamp', yomi: 'スキャンプ', shipClass: 13, shipType: 114, rarity: 6,
    maxLevel: 100, slotCount: 1, initialStats: { hp: 13, firepower: 1, armor: 4, torpedo: 35, evasion: 30, aa: 10, aircraft: 1, speed: 5, los: 11, range: 1, luck: 11, asw: 0 }
  },
  300: {
    shipId: 300, sortId: 1396, name: '初風改', yomi: 'はつかぜ', shipClass: 2, shipType: 30, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 32, firepower: 12, armor: 14, torpedo: 28, evasion: 96, aa: 16, aircraft: 3, speed: 10, los: 8, range: 1, luck: 12, asw: 27 }
  },
  301: {
    shipId: 301, sortId: 1397, name: '秋雲改', yomi: 'あきぐも', shipClass: 2, shipType: 30, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 32, firepower: 8, armor: 14, torpedo: 28, evasion: 96, aa: 22, aircraft: 3, speed: 10, los: 8, range: 1, luck: 15, asw: 27 }
  },
  302: {
    shipId: 302, sortId: 1398, name: '夕雲改', yomi: 'ゆうぐも', shipClass: 2, shipType: 38, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 32, firepower: 12, armor: 14, torpedo: 28, evasion: 100, aa: 16, aircraft: 3, speed: 10, los: 9, range: 1, luck: 12, asw: 29 }
  },
  303: {
    shipId: 303, sortId: 1399, name: '巻雲改', yomi: 'まきぐも', shipClass: 2, shipType: 38, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 32, firepower: 12, armor: 14, torpedo: 28, evasion: 100, aa: 16, aircraft: 3, speed: 10, los: 9, range: 1, luck: 12, asw: 29 }
  },
  304: {
    shipId: 304, sortId: 1400, name: '長波改', yomi: 'ながなみ', shipClass: 2, shipType: 38, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 32, firepower: 12, armor: 14, torpedo: 28, evasion: 100, aa: 16, aircraft: 3, speed: 10, los: 9, range: 1, luck: 14, asw: 29 }
  },
  305: {
    shipId: 305, sortId: 1401, name: '阿賀野改', yomi: 'あがの', shipClass: 3, shipType: 41, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 45, firepower: 28, armor: 31, torpedo: 24, evasion: 130, aa: 20, aircraft: 3, speed: 10, los: 14, range: 2, luck: 10, asw: 26 }
  },
  306: {
    shipId: 306, sortId: 1402, name: '能代改', yomi: 'のしろ', shipClass: 3, shipType: 41, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 45, firepower: 28, armor: 31, torpedo: 24, evasion: 130, aa: 20, aircraft: 3, speed: 10, los: 14, range: 2, luck: 10, asw: 26 }
  },
  307: {
    shipId: 307, sortId: 1403, name: '矢矧改', yomi: 'やはぎ', shipClass: 3, shipType: 41, rarity: 8,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 47, firepower: 28, armor: 32, torpedo: 24, evasion: 130, aa: 22, aircraft: 3, speed: 10, los: 14, range: 2, luck: 14, asw: 26 }
  },
  308: {
    shipId: 308, sortId: 1404, name: '弥生改', yomi: 'やよい', shipClass: 2, shipType: 28, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 24, firepower: 9, armor: 11, torpedo: 18, evasion: 94, aa: 12, aircraft: 3, speed: 10, los: 6, range: 1, luck: 12, asw: 18 }
  },
  309: {
    shipId: 309, sortId: 1405, name: '卯月改', yomi: 'うづき', shipClass: 2, shipType: 28, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 24, firepower: 7, armor: 12, torpedo: 18, evasion: 103, aa: 18, aircraft: 3, speed: 10, los: 6, range: 1, luck: 14, asw: 21 }
  },
  310: {
    shipId: 310, sortId: 1406, name: 'Z1改', yomi: 'レーベレヒト・マース', shipClass: 2, shipType: 48, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 33, firepower: 11, armor: 15, torpedo: 25, evasion: 97, aa: 15, aircraft: 3, speed: 10, los: 8, range: 1, luck: 12, asw: 36 }
  },
  311: {
    shipId: 311, sortId: 1407, name: 'Z3改', yomi: 'マックス・シュルツ', shipClass: 2, shipType: 48, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 33, firepower: 11, armor: 15, torpedo: 25, evasion: 97, aa: 15, aircraft: 3, speed: 10, los: 8, range: 1, luck: 12, asw: 36 }
  },
  312: {
    shipId: 312, sortId: 1408, name: '浜風改', yomi: 'はまかぜ', shipClass: 2, shipType: 30, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 32, firepower: 12, armor: 14, torpedo: 28, evasion: 103, aa: 22, aircraft: 3, speed: 10, los: 8, range: 1, luck: 17, asw: 27 }
  },
  313: {
    shipId: 313, sortId: 1409, name: '谷風改', yomi: 'たにかぜ', shipClass: 2, shipType: 30, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 32, firepower: 12, armor: 14, torpedo: 28, evasion: 104, aa: 16, aircraft: 3, speed: 10, los: 8, range: 1, luck: 16, asw: 28 }
  },
  314: {
    shipId: 314, sortId: 1410, name: '酒匂改', yomi: 'さかわ', shipClass: 3, shipType: 41, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 46, firepower: 27, armor: 31, torpedo: 23, evasion: 133, aa: 19, aircraft: 3, speed: 10, los: 14, range: 2, luck: 30, asw: 29 }
  },
  316: {
    shipId: 316, sortId: 1411, name: '天津風改', yomi: 'あまつかぜ', shipClass: 2, shipType: 30, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 34, firepower: 12, armor: 14, torpedo: 32, evasion: 85, aa: 23, aircraft: 3, speed: 10, los: 9, range: 1, luck: 17, asw: 28 }
  },
  317: {
    shipId: 317, sortId: 1412, name: '浦風改', yomi: 'うらかぜ', shipClass: 2, shipType: 30, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 32, firepower: 12, armor: 14, torpedo: 28, evasion: 103, aa: 16, aircraft: 3, speed: 10, los: 8, range: 1, luck: 13, asw: 29 }
  },
  318: {
    shipId: 318, sortId: 190, name: '龍鳳改', yomi: 'たいげい・りゅうほう', shipClass: 7, shipType: 51, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 48, firepower: 10, armor: 24, torpedo: 0, evasion: 30, aa: 28, aircraft: 4, speed: 5, los: 30, range: 1, luck: 24, asw: 0 }
  },
  319: {
    shipId: 319, sortId: 191, name: '妙高改二', yomi: 'みょうこう', shipClass: 5, shipType: 29, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 56, firepower: 50, armor: 47, torpedo: 36, evasion: 30, aa: 28, aircraft: 4, speed: 10, los: 19, range: 2, luck: 32, asw: 0 }
  },
  320: {
    shipId: 320, sortId: 1413, name: '磯風改', yomi: 'いそかぜ', shipClass: 2, shipType: 30, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 33, firepower: 12, armor: 14, torpedo: 28, evasion: 103, aa: 24, aircraft: 3, speed: 10, los: 9, range: 1, luck: 18, asw: 27 }
  },
  321: {
    shipId: 321, sortId: 1414, name: '大淀改', yomi: 'おおよど', shipClass: 3, shipType: 52, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 47, firepower: 32, armor: 32, torpedo: 0, evasion: 72, aa: 22, aircraft: 4, speed: 10, los: 28, range: 2, luck: 30, asw: 0 }
  },
  322: {
    shipId: 322, sortId: 1415, name: '時津風改', yomi: 'ときつかぜ', shipClass: 2, shipType: 30, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 32, firepower: 12, armor: 14, torpedo: 28, evasion: 97, aa: 16, aircraft: 3, speed: 10, los: 8, range: 1, luck: 12, asw: 26 }
  },
  323: {
    shipId: 323, sortId: 1416, name: '春雨改', yomi: 'はるさめ', shipClass: 2, shipType: 23, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 30, firepower: 12, armor: 14, torpedo: 28, evasion: 89, aa: 15, aircraft: 3, speed: 10, los: 7, range: 1, luck: 12, asw: 24 }
  },
  324: {
    shipId: 324, sortId: 1417, name: '早霜改', yomi: 'はやしも', shipClass: 2, shipType: 38, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 32, firepower: 12, armor: 14, torpedo: 28, evasion: 100, aa: 16, aircraft: 3, speed: 10, los: 9, range: 1, luck: 12, asw: 29 }
  },
  325: {
    shipId: 325, sortId: 1418, name: '清霜改', yomi: 'きよしも', shipClass: 2, shipType: 38, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 32, firepower: 12, armor: 14, torpedo: 28, evasion: 100, aa: 16, aircraft: 3, speed: 10, los: 9, range: 1, luck: 13, asw: 29 }
  },
  326: {
    shipId: 326, sortId: 204, name: '初春改二', yomi: 'はつはる', shipClass: 2, shipType: 10, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 31, firepower: 13, armor: 14, torpedo: 32, evasion: 102, aa: 23, aircraft: 3, speed: 10, los: 10, range: 1, luck: 16, asw: 30 }
  },
  327: {
    shipId: 327, sortId: 1419, name: '朝雲改', yomi: 'あさぐも', shipClass: 2, shipType: 18, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 31, firepower: 12, armor: 14, torpedo: 28, evasion: 92, aa: 16, aircraft: 3, speed: 10, los: 8, range: 1, luck: 12, asw: 23 }
  },
  328: {
    shipId: 328, sortId: 1420, name: '山雲改', yomi: 'やまぐも', shipClass: 2, shipType: 18, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 31, firepower: 12, armor: 14, torpedo: 28, evasion: 98, aa: 16, aircraft: 3, speed: 10, los: 8, range: 1, luck: 11, asw: 27 }
  },
  329: {
    shipId: 329, sortId: 1421, name: '野分改', yomi: 'のわき', shipClass: 2, shipType: 30, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 32, firepower: 12, armor: 14, torpedo: 28, evasion: 102, aa: 16, aircraft: 3, speed: 10, los: 8, range: 1, luck: 13, asw: 28 }
  },
  330: {
    shipId: 330, sortId: 1422, name: '秋月改', yomi: 'あきづき', shipClass: 2, shipType: 54, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 37, firepower: 24, armor: 16, torpedo: 24, evasion: 108, aa: 80, aircraft: 3, speed: 10, los: 10, range: 1, luck: 12, asw: 30 }
  },
  331: {
    shipId: 331, sortId: 202, name: '天城', yomi: 'あまぎ', shipClass: 11, shipType: 53, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 48, firepower: 10, armor: 26, torpedo: 0, evasion: 30, aa: 27, aircraft: 4, speed: 10, los: 38, range: 1, luck: 13, asw: 0 }
  },
  332: {
    shipId: 332, sortId: 203, name: '葛城', yomi: 'かつらぎ', shipClass: 11, shipType: 53, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 48, firepower: 10, armor: 27, torpedo: 0, evasion: 30, aa: 27, aircraft: 4, speed: 10, los: 36, range: 1, luck: 20, asw: 0 }
  },
  334: {
    shipId: 334, sortId: 1504, name: 'U-511改', yomi: 'ゆー511・ろ500', shipClass: 13, shipType: 57, rarity: 6,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 13, firepower: 3, armor: 6, torpedo: 27, evasion: 30, aa: 10, aircraft: 2, speed: 5, los: 9, range: 1, luck: 34, asw: 0 }
  },
  343: {
    shipId: 343, sortId: 1423, name: '香取改', yomi: 'かとり', shipClass: 21, shipType: 56, rarity: 5,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 40, firepower: 16, armor: 15, torpedo: 14, evasion: 96, aa: 24, aircraft: 4, speed: 5, los: 12, range: 2, luck: 12, asw: 22 }
  },
  344: {
    shipId: 344, sortId: 1424, name: '朝霜改', yomi: 'あさしも', shipClass: 2, shipType: 38, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 33, firepower: 12, armor: 14, torpedo: 28, evasion: 117, aa: 22, aircraft: 3, speed: 10, los: 10, range: 1, luck: 18, asw: 35 }
  },
  345: {
    shipId: 345, sortId: 1425, name: '高波改', yomi: 'たかなみ', shipClass: 2, shipType: 38, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 32, firepower: 12, armor: 14, torpedo: 28, evasion: 100, aa: 16, aircraft: 3, speed: 10, los: 13, range: 1, luck: 10, asw: 29 }
  },
  346: {
    shipId: 346, sortId: 1426, name: '照月改', yomi: 'てるづき', shipClass: 2, shipType: 54, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 37, firepower: 24, armor: 16, torpedo: 25, evasion: 108, aa: 80, aircraft: 3, speed: 10, los: 10, range: 1, luck: 11, asw: 30 }
  },
  347: {
    shipId: 347, sortId: 1427, name: 'Libeccio改', yomi: 'リベッチオ', shipClass: 2, shipType: 61, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 29, firepower: 11, armor: 15, torpedo: 27, evasion: 114, aa: 20, aircraft: 3, speed: 10, los: 10, range: 1, luck: 16, asw: 40 }
  },
  348: {
    shipId: 348, sortId: 1428, name: '瑞穂改', yomi: 'みずほ', shipClass: 16, shipType: 62, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 42, firepower: 18, armor: 24, torpedo: 15, evasion: 30, aa: 18, aircraft: 3, speed: 5, los: 38, range: 1, luck: 10, asw: 0 }
  },
  349: {
    shipId: 349, sortId: 1429, name: '風雲改', yomi: 'かざぐも', shipClass: 2, shipType: 38, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 32, firepower: 12, armor: 14, torpedo: 29, evasion: 102, aa: 17, aircraft: 3, speed: 10, los: 9, range: 1, luck: 14, asw: 30 }
  },
  350: {
    shipId: 350, sortId: 1430, name: '海風改', yomi: 'うみかぜ', shipClass: 2, shipType: 23, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 30, firepower: 12, armor: 14, torpedo: 28, evasion: 94, aa: 16, aircraft: 3, speed: 10, los: 8, range: 1, luck: 13, asw: 27 }
  },
  351: {
    shipId: 351, sortId: 1431, name: '江風改', yomi: 'かわかぜ', shipClass: 2, shipType: 23, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 30, firepower: 12, armor: 14, torpedo: 29, evasion: 89, aa: 15, aircraft: 3, speed: 10, los: 8, range: 1, luck: 12, asw: 24 }
  },
  352: {
    shipId: 352, sortId: 1432, name: '速吸改', yomi: 'はやすい', shipClass: 22, shipType: 60, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 48, firepower: 8, armor: 6, torpedo: 0, evasion: 56, aa: 20, aircraft: 3, speed: 5, los: 18, range: 1, luck: 8, asw: 12 }
  },
  353: {
    shipId: 353, sortId: 1433, name: 'Graf Zeppelin改', yomi: 'グラーフ・ツェッペリン', shipClass: 11, shipType: 63, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 78, firepower: 15, armor: 42, torpedo: 0, evasion: 30, aa: 44, aircraft: 4, speed: 10, los: 45, range: 2, luck: 7, asw: 0 }
  },
  354: {
    shipId: 354, sortId: 1434, name: '嵐改', yomi: 'あらし', shipClass: 2, shipType: 30, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 32, firepower: 12, armor: 14, torpedo: 28, evasion: 104, aa: 16, aircraft: 3, speed: 10, los: 8, range: 1, luck: 12, asw: 30 }
  },
  355: {
    shipId: 355, sortId: 1435, name: '萩風改', yomi: 'はぎかぜ', shipClass: 2, shipType: 30, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 32, firepower: 13, armor: 14, torpedo: 28, evasion: 102, aa: 16, aircraft: 3, speed: 10, los: 8, range: 1, luck: 12, asw: 28 }
  },
  356: {
    shipId: 356, sortId: 1436, name: '鹿島改', yomi: 'かしま', shipClass: 21, shipType: 56, rarity: 5,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 40, firepower: 14, armor: 15, torpedo: 13, evasion: 108, aa: 22, aircraft: 4, speed: 5, los: 10, range: 2, luck: 20, asw: 24 }
  },
  357: {
    shipId: 357, sortId: 1437, name: '初月改', yomi: 'はつづき', shipClass: 2, shipType: 54, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 37, firepower: 25, armor: 17, torpedo: 24, evasion: 108, aa: 80, aircraft: 3, speed: 10, los: 10, range: 1, luck: 8, asw: 30 }
  },
  358: {
    shipId: 358, sortId: 1438, name: 'Zara改', yomi: 'ザラ', shipClass: 5, shipType: 64, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 56, firepower: 42, armor: 46, torpedo: 0, evasion: 30, aa: 22, aircraft: 4, speed: 10, los: 12, range: 3, luck: 12, asw: 0 }
  },
  359: {
    shipId: 359, sortId: 1439, name: '沖波改', yomi: 'おきなみ', shipClass: 2, shipType: 38, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 32, firepower: 12, armor: 14, torpedo: 29, evasion: 103, aa: 16, aircraft: 3, speed: 10, los: 9, range: 1, luck: 12, asw: 32 }
  },
  360: {
    shipId: 360, sortId: 1440, name: 'Iowa改', yomi: 'アイオワ', shipClass: 8, shipType: 65, rarity: 8,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 92, firepower: 90, armor: 89, torpedo: 0, evasion: 30, aa: 82, aircraft: 4, speed: 10, los: 30, range: 3, luck: 40, asw: 0 }
  },
  361: {
    shipId: 361, sortId: 1441, name: 'Pola改', yomi: 'ポーラ', shipClass: 5, shipType: 64, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 56, firepower: 41, armor: 45, torpedo: 0, evasion: 30, aa: 21, aircraft: 4, speed: 10, los: 11, range: 3, luck: 11, asw: 0 }
  },
  362: {
    shipId: 362, sortId: 1442, name: '親潮改', yomi: 'おやしお', shipClass: 2, shipType: 30, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 32, firepower: 13, armor: 14, torpedo: 28, evasion: 101, aa: 16, aircraft: 3, speed: 10, los: 9, range: 1, luck: 14, asw: 27 }
  },
  363: {
    shipId: 363, sortId: 1443, name: '春風改', yomi: 'はるかぜ', shipClass: 2, shipType: 66, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 23, firepower: 7, armor: 11, torpedo: 14, evasion: 140, aa: 10, aircraft: 3, speed: 10, los: 4, range: 1, luck: 30, asw: 0 }
  },
  364: {
    shipId: 364, sortId: 1444, name: 'Warspite改', yomi: 'ウォースパイト', shipClass: 9, shipType: 67, rarity: 8,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 82, firepower: 86, armor: 78, torpedo: 0, evasion: 30, aa: 48, aircraft: 4, speed: 5, los: 20, range: 3, luck: 70, asw: 0 }
  },
  365: {
    shipId: 365, sortId: 1445, name: 'Aquila改', yomi: 'アクィラ', shipClass: 11, shipType: 68, rarity: 8,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 48, firepower: 10, armor: 28, torpedo: 0, evasion: 30, aa: 30, aircraft: 4, speed: 10, los: 36, range: 1, luck: 7, asw: 0 }
  },
  366: {
    shipId: 366, sortId: 1446, name: '水無月改', yomi: 'みなづき', shipClass: 2, shipType: 28, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 24, firepower: 9, armor: 11, torpedo: 18, evasion: 97, aa: 12, aircraft: 3, speed: 10, los: 6, range: 1, luck: 16, asw: 19 }
  },
  367: {
    shipId: 367, sortId: 1447, name: '伊26改', yomi: 'い26', shipClass: 14, shipType: 39, rarity: 5,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 18, firepower: 3, armor: 5, torpedo: 39, evasion: 30, aa: 10, aircraft: 2, speed: 5, los: 17, range: 1, luck: 16, asw: 0 }
  },
  368: {
    shipId: 368, sortId: 1448, name: '浦波改', yomi: 'うらなみ', shipClass: 2, shipType: 12, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 30, firepower: 12, armor: 13, torpedo: 28, evasion: 89, aa: 16, aircraft: 3, speed: 10, los: 8, range: 1, luck: 17, asw: 24 }
  },
  369: {
    shipId: 369, sortId: 1449, name: '山風改', yomi: 'やまかぜ', shipClass: 2, shipType: 23, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 30, firepower: 13, armor: 14, torpedo: 28, evasion: 110, aa: 15, aircraft: 3, speed: 10, los: 7, range: 1, luck: 8, asw: 30 }
  },
  370: {
    shipId: 370, sortId: 1450, name: '朝風改', yomi: 'あさかぜ', shipClass: 2, shipType: 66, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 23, firepower: 8, armor: 10, torpedo: 14, evasion: 111, aa: 10, aircraft: 3, speed: 10, los: 9, range: 1, luck: 14, asw: 18 }
  },
  371: {
    shipId: 371, sortId: 1451, name: '松風改', yomi: 'まつかぜ', shipClass: 2, shipType: 66, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 23, firepower: 7, armor: 10, torpedo: 14, evasion: 113, aa: 10, aircraft: 3, speed: 10, los: 9, range: 1, luck: 12, asw: 20 }
  },
  372: {
    shipId: 372, sortId: 1452, name: 'Commandant Teste改', yomi: 'コマンダン・テスト', shipClass: 16, shipType: 70, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 43, firepower: 32, armor: 26, torpedo: 0, evasion: 30, aa: 20, aircraft: 4, speed: 5, los: 34, range: 1, luck: 20, asw: 0 }
  },
  373: {
    shipId: 373, sortId: 1453, name: '藤波改', yomi: 'ふじなみ', shipClass: 2, shipType: 38, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 32, firepower: 12, armor: 14, torpedo: 27, evasion: 99, aa: 18, aircraft: 3, speed: 10, los: 12, range: 1, luck: 11, asw: 28 }
  },
  374: {
    shipId: 374, sortId: 1454, name: '伊13改', yomi: 'い13', shipClass: 14, shipType: 71, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 21, firepower: 5, armor: 6, torpedo: 32, evasion: 30, aa: 10, aircraft: 3, speed: 5, los: 13, range: 1, luck: 8, asw: 0 }
  },
  375: {
    shipId: 375, sortId: 1455, name: '伊14改', yomi: 'い14', shipClass: 14, shipType: 71, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 22, firepower: 4, armor: 6, torpedo: 32, evasion: 30, aa: 10, aircraft: 3, speed: 5, los: 14, range: 1, luck: 24, asw: 0 }
  },
  376: {
    shipId: 376, sortId: 1456, name: '占守改', yomi: 'しむしゅ', shipClass: 1, shipType: 74, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 17, firepower: 5, armor: 7, torpedo: 0, evasion: 113, aa: 11, aircraft: 3, speed: 5, los: 5, range: 1, luck: 50, asw: 35 }
  },
  377: {
    shipId: 377, sortId: 1457, name: '国後改', yomi: 'くなしり', shipClass: 1, shipType: 74, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 17, firepower: 5, armor: 7, torpedo: 0, evasion: 110, aa: 10, aircraft: 3, speed: 5, los: 6, range: 1, luck: 45, asw: 34 }
  },
  378: {
    shipId: 378, sortId: 1458, name: '八丈改', yomi: 'はちじょう', shipClass: 1, shipType: 74, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 17, firepower: 5, armor: 7, torpedo: 0, evasion: 112, aa: 11, aircraft: 3, speed: 5, los: 5, range: 1, luck: 49, asw: 34 }
  },
  379: {
    shipId: 379, sortId: 1459, name: '石垣改', yomi: 'いしがき', shipClass: 1, shipType: 74, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 17, firepower: 5, armor: 7, torpedo: 0, evasion: 116, aa: 10, aircraft: 3, speed: 5, los: 6, range: 1, luck: 10, asw: 36 }
  },
  380: {
    shipId: 380, sortId: 1460, name: '大鷹改', yomi: 'たいよう', shipClass: 7, shipType: 76, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 47, firepower: 10, armor: 22, torpedo: 0, evasion: 91, aa: 16, aircraft: 4, speed: 5, los: 33, range: 1, luck: 9, asw: 65 }
  },
  381: {
    shipId: 381, sortId: 1461, name: '神鷹改', yomi: 'しんよう', shipClass: 7, shipType: 76, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 48, firepower: 10, armor: 22, torpedo: 0, evasion: 92, aa: 18, aircraft: 4, speed: 5, los: 29, range: 1, luck: 11, asw: 66 }
  },
  382: {
    shipId: 382, sortId: 1462, name: '雲鷹改', yomi: 'うんよう', shipClass: 7, shipType: 76, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 47, firepower: 10, armor: 21, torpedo: 0, evasion: 92, aa: 17, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 64 }
  },
  383: {
    shipId: 383, sortId: 1463, name: '択捉改', yomi: 'えとろふ', shipClass: 1, shipType: 77, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 17, firepower: 5, armor: 7, torpedo: 0, evasion: 115, aa: 12, aircraft: 3, speed: 5, los: 5, range: 1, luck: 40, asw: 37 }
  },
  384: {
    shipId: 384, sortId: 1464, name: '松輪改', yomi: 'まつわ', shipClass: 1, shipType: 77, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 17, firepower: 5, armor: 7, torpedo: 0, evasion: 116, aa: 12, aircraft: 3, speed: 5, los: 5, range: 1, luck: 9, asw: 36 }
  },
  385: {
    shipId: 385, sortId: 1465, name: '佐渡改', yomi: 'さど', shipClass: 1, shipType: 77, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 17, firepower: 5, armor: 7, torpedo: 0, evasion: 115, aa: 12, aircraft: 3, speed: 5, los: 6, range: 1, luck: 9, asw: 37 }
  },
  386: {
    shipId: 386, sortId: 1466, name: '対馬改', yomi: 'つしま', shipClass: 1, shipType: 77, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 17, firepower: 5, armor: 7, torpedo: 0, evasion: 120, aa: 12, aircraft: 3, speed: 5, los: 5, range: 1, luck: 49, asw: 36 }
  },
  387: {
    shipId: 387, sortId: 1467, name: '旗風改', yomi: 'はたかぜ', shipClass: 2, shipType: 66, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 23, firepower: 7, armor: 10, torpedo: 14, evasion: 112, aa: 10, aircraft: 3, speed: 10, los: 8, range: 1, luck: 18, asw: 21 }
  },
  390: {
    shipId: 390, sortId: 1470, name: '天霧改', yomi: 'あまぎり', shipClass: 2, shipType: 1, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 30, firepower: 12, armor: 13, torpedo: 28, evasion: 89, aa: 15, aircraft: 3, speed: 10, los: 7, range: 1, luck: 17, asw: 24 }
  },
  391: {
    shipId: 391, sortId: 1471, name: '狭霧改', yomi: 'さぎり', shipClass: 2, shipType: 1, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 30, firepower: 11, armor: 13, torpedo: 27, evasion: 89, aa: 15, aircraft: 3, speed: 10, los: 7, range: 1, luck: 7, asw: 24 }
  },
  392: {
    shipId: 392, sortId: 1472, name: 'Richelieu改', yomi: 'リシュリュー', shipClass: 8, shipType: 79, rarity: 8,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 89, firepower: 72, armor: 78, torpedo: 0, evasion: 30, aa: 28, aircraft: 4, speed: 10, los: 16, range: 3, luck: 24, asw: 0 }
  },
  393: {
    shipId: 393, sortId: 1473, name: 'Ark Royal改', yomi: 'アークロイヤル', shipClass: 11, shipType: 78, rarity: 8,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 71, firepower: 10, armor: 28, torpedo: 0, evasion: 30, aa: 36, aircraft: 4, speed: 10, los: 42, range: 1, luck: 13, asw: 0 }
  },
  394: {
    shipId: 394, sortId: 1474, name: 'Jervis改', yomi: 'ジャーヴィス', shipClass: 2, shipType: 82, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 31, firepower: 14, armor: 15, torpedo: 40, evasion: 124, aa: 30, aircraft: 3, speed: 10, los: 12, range: 1, luck: 55, asw: 55 }
  },
  395: {
    shipId: 395, sortId: 1475, name: 'Ташкент改', yomi: 'タシュケント', shipClass: 2, shipType: 81, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 39, firepower: 28, armor: 28, torpedo: 18, evasion: 101, aa: 30, aircraft: 4, speed: 10, los: 10, range: 2, luck: 43, asw: 40 }
  },
  396: {
    shipId: 396, sortId: 1476, name: 'Gambier Bay改', yomi: 'ガンビア・ベイ', shipClass: 7, shipType: 83, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 38, firepower: 10, armor: 10, torpedo: 0, evasion: 101, aa: 24, aircraft: 3, speed: 5, los: 38, range: 1, luck: 15, asw: 30 }
  },
  397: {
    shipId: 397, sortId: 1477, name: 'Intrepid改', yomi: 'イントレピッド', shipClass: 11, shipType: 84, rarity: 8,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 69, firepower: 10, armor: 52, torpedo: 0, evasion: 30, aa: 55, aircraft: 4, speed: 10, los: 52, range: 2, luck: 50, asw: 0 }
  },
  398: {
    shipId: 398, sortId: 1498, name: '伊168改', yomi: 'い168', shipClass: 13, shipType: 35, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 15, firepower: 3, armor: 5, torpedo: 30, evasion: 30, aa: 10, aircraft: 2, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  399: {
    shipId: 399, sortId: 1499, name: '伊58改', yomi: 'い58', shipClass: 14, shipType: 36, rarity: 5,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 18, firepower: 3, armor: 5, torpedo: 36, evasion: 30, aa: 10, aircraft: 2, speed: 5, los: 15, range: 1, luck: 50, asw: 0 }
  },
  400: {
    shipId: 400, sortId: 1500, name: '伊8改', yomi: 'い8', shipClass: 14, shipType: 40, rarity: 6,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 19, firepower: 4, armor: 5, torpedo: 36, evasion: 30, aa: 10, aircraft: 2, speed: 5, los: 16, range: 1, luck: 25, asw: 0 }
  },
  401: {
    shipId: 401, sortId: 1501, name: '伊19改', yomi: 'い19', shipClass: 14, shipType: 39, rarity: 5,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 18, firepower: 3, armor: 5, torpedo: 42, evasion: 30, aa: 10, aircraft: 2, speed: 5, los: 15, range: 1, luck: 13, asw: 0 }
  },
  402: {
    shipId: 402, sortId: 1502, name: 'まるゆ改', yomi: 'まるゆ', shipClass: 13, shipType: 46, rarity: 6,
    maxLevel: 100, slotCount: 1, initialStats: { hp: 7, firepower: 1, armor: 2, torpedo: 0, evasion: 30, aa: 10, aircraft: 1, speed: 5, los: 1, range: 1, luck: 7, asw: 0 }
  },
  403: {
    shipId: 403, sortId: 1503, name: '伊401改', yomi: 'い401', shipClass: 14, shipType: 44, rarity: 7,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 24, firepower: 6, armor: 7, torpedo: 40, evasion: 30, aa: 10, aircraft: 2, speed: 5, los: 15, range: 1, luck: 20, asw: 0 }
  },
  404: {
    shipId: 404, sortId: 201, name: '雲龍', yomi: 'うんりゅう', shipClass: 11, shipType: 53, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 48, firepower: 10, armor: 26, torpedo: 0, evasion: 30, aa: 28, aircraft: 4, speed: 10, los: 40, range: 1, luck: 10, asw: 0 }
  },
  405: {
    shipId: 405, sortId: 205, name: '春雨', yomi: 'はるさめ', shipClass: 2, shipType: 23, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 73, aa: 9, aircraft: 2, speed: 10, los: 5, range: 1, luck: 10, asw: 21 }
  },
  406: {
    shipId: 406, sortId: 206, name: '雲龍改', yomi: 'うんりゅう', shipClass: 11, shipType: 53, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 60, firepower: 10, armor: 35, torpedo: 0, evasion: 30, aa: 32, aircraft: 4, speed: 10, los: 48, range: 1, luck: 12, asw: 0 }
  },
  407: {
    shipId: 407, sortId: 207, name: '潮改二', yomi: 'うしお', shipClass: 2, shipType: 1, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 33, firepower: 10, armor: 15, torpedo: 25, evasion: 112, aa: 24, aircraft: 3, speed: 10, los: 11, range: 1, luck: 32, asw: 32 }
  },
  408: {
    shipId: 408, sortId: 208, name: '隼鷹改二', yomi: 'じゅんよう', shipClass: 7, shipType: 24, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 55, firepower: 10, armor: 31, torpedo: 0, evasion: 30, aa: 36, aircraft: 4, speed: 5, los: 44, range: 1, luck: 41, asw: 0 }
  },
  409: {
    shipId: 409, sortId: 209, name: '早霜', yomi: 'はやしも', shipClass: 2, shipType: 38, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 73, aa: 9, aircraft: 2, speed: 10, los: 6, range: 1, luck: 11, asw: 27 }
  },
  410: {
    shipId: 410, sortId: 210, name: '清霜', yomi: 'きよしも', shipClass: 2, shipType: 38, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 73, aa: 9, aircraft: 2, speed: 10, los: 6, range: 1, luck: 12, asw: 27 }
  },
  411: {
    shipId: 411, sortId: 211, name: '扶桑改二', yomi: 'ふそう', shipClass: 10, shipType: 26, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 77, firepower: 80, armor: 72, torpedo: 0, evasion: 45, aa: 44, aircraft: 4, speed: 5, los: 22, range: 3, luck: 13, asw: 8 }
  },
  412: {
    shipId: 412, sortId: 212, name: '山城改二', yomi: 'やましろ', shipClass: 10, shipType: 26, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 77, firepower: 80, armor: 73, torpedo: 0, evasion: 47, aa: 43, aircraft: 4, speed: 5, los: 23, range: 3, luck: 14, asw: 8 }
  },
  413: {
    shipId: 413, sortId: 213, name: '朝雲', yomi: 'あさぐも', shipClass: 2, shipType: 18, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 73, aa: 9, aircraft: 2, speed: 10, los: 5, range: 1, luck: 8, asw: 21 }
  },
  414: {
    shipId: 414, sortId: 214, name: '山雲', yomi: 'やまぐも', shipClass: 2, shipType: 18, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 73, aa: 9, aircraft: 2, speed: 10, los: 5, range: 1, luck: 7, asw: 23 }
  },
  415: {
    shipId: 415, sortId: 215, name: '野分', yomi: 'のわき', shipClass: 2, shipType: 30, rarity: 5,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 70, aa: 12, aircraft: 2, speed: 10, los: 8, range: 1, luck: 14, asw: 24 }
  },
  416: {
    shipId: 416, sortId: 216, name: '古鷹改二', yomi: 'ふるたか', shipClass: 5, shipType: 7, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 53, firepower: 39, armor: 34, torpedo: 24, evasion: 30, aa: 22, aircraft: 4, speed: 10, los: 13, range: 2, luck: 14, asw: 0 }
  },
  417: {
    shipId: 417, sortId: 217, name: '加古改二', yomi: 'かこ', shipClass: 5, shipType: 7, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 52, firepower: 40, armor: 33, torpedo: 25, evasion: 30, aa: 24, aircraft: 4, speed: 10, los: 14, range: 2, luck: 12, asw: 0 }
  },
  418: {
    shipId: 418, sortId: 218, name: '皐月改二', yomi: 'さつき', shipClass: 2, shipType: 28, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 28, firepower: 8, armor: 12, torpedo: 27, evasion: 125, aa: 40, aircraft: 3, speed: 10, los: 10, range: 1, luck: 20, asw: 30 }
  },
  419: {
    shipId: 419, sortId: 219, name: '初霜改二', yomi: 'はつしも', shipClass: 2, shipType: 10, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 32, firepower: 12, armor: 14, torpedo: 28, evasion: 110, aa: 35, aircraft: 3, speed: 10, los: 13, range: 1, luck: 53, asw: 28 }
  },
  420: {
    shipId: 420, sortId: 220, name: '叢雲改二', yomi: 'むらくも', shipClass: 2, shipType: 12, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 31, firepower: 14, armor: 14, torpedo: 32, evasion: 104, aa: 27, aircraft: 3, speed: 10, los: 9, range: 1, luck: 16, asw: 28 }
  },
  421: {
    shipId: 421, sortId: 221, name: '秋月', yomi: 'あきづき', shipClass: 2, shipType: 54, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 20, firepower: 16, armor: 9, torpedo: 16, evasion: 94, aa: 70, aircraft: 3, speed: 10, los: 9, range: 1, luck: 10, asw: 27 }
  },
  422: {
    shipId: 422, sortId: 222, name: '照月', yomi: 'てるづき', shipClass: 2, shipType: 54, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 20, firepower: 16, armor: 9, torpedo: 16, evasion: 94, aa: 70, aircraft: 3, speed: 10, los: 9, range: 1, luck: 9, asw: 27 }
  },
  423: {
    shipId: 423, sortId: 223, name: '初月', yomi: 'はつづき', shipClass: 2, shipType: 54, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 20, firepower: 18, armor: 9, torpedo: 15, evasion: 93, aa: 70, aircraft: 3, speed: 10, los: 8, range: 1, luck: 7, asw: 26 }
  },
  424: {
    shipId: 424, sortId: 224, name: '高波', yomi: 'たかなみ', shipClass: 2, shipType: 38, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 73, aa: 9, aircraft: 2, speed: 10, los: 9, range: 1, luck: 8, asw: 27 }
  },
  425: {
    shipId: 425, sortId: 225, name: '朝霜', yomi: 'あさしも', shipClass: 2, shipType: 38, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 100, aa: 9, aircraft: 2, speed: 10, los: 6, range: 1, luck: 16, asw: 35 }
  },
  426: {
    shipId: 426, sortId: 226, name: '吹雪改二', yomi: 'ふぶき', shipClass: 2, shipType: 12, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 31, firepower: 15, armor: 14, torpedo: 30, evasion: 104, aa: 35, aircraft: 3, speed: 10, los: 14, range: 1, luck: 18, asw: 26 }
  },
  427: {
    shipId: 427, sortId: 227, name: '鳥海改二', yomi: 'ちょうかい', shipClass: 5, shipType: 8, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 57, firepower: 55, armor: 46, torpedo: 35, evasion: 30, aa: 24, aircraft: 4, speed: 10, los: 22, range: 2, luck: 19, asw: 0 }
  },
  428: {
    shipId: 428, sortId: 228, name: '摩耶改二', yomi: 'まや', shipClass: 5, shipType: 8, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 57, firepower: 42, armor: 48, torpedo: 34, evasion: 30, aa: 72, aircraft: 4, speed: 10, los: 16, range: 2, luck: 14, asw: 0 }
  },
  429: {
    shipId: 429, sortId: 229, name: '天城改', yomi: 'あまぎ', shipClass: 11, shipType: 53, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 60, firepower: 10, armor: 35, torpedo: 0, evasion: 30, aa: 33, aircraft: 4, speed: 10, los: 46, range: 1, luck: 17, asw: 0 }
  },
  430: {
    shipId: 430, sortId: 230, name: '葛城改', yomi: 'かつらぎ', shipClass: 11, shipType: 53, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 60, firepower: 10, armor: 36, torpedo: 0, evasion: 30, aa: 32, aircraft: 4, speed: 10, los: 44, range: 1, luck: 30, asw: 0 }
  },
  431: {
    shipId: 431, sortId: 231, name: 'U-511', yomi: 'ゆー511・ろ500', shipClass: 13, shipType: 57, rarity: 5,
    maxLevel: 100, slotCount: 1, initialStats: { hp: 8, firepower: 2, armor: 4, torpedo: 22, evasion: 30, aa: 10, aircraft: 1, speed: 5, los: 8, range: 1, luck: 30, asw: 0 }
  },
  432: {
    shipId: 432, sortId: 232, name: 'Graf Zeppelin', yomi: 'グラーフ・ツェッペリン', shipClass: 11, shipType: 63, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 70, firepower: 10, armor: 29, torpedo: 0, evasion: 30, aa: 40, aircraft: 3, speed: 10, los: 40, range: 2, luck: 4, asw: 0 }
  },
  433: {
    shipId: 433, sortId: 233, name: 'Saratoga', yomi: 'サラトガ', shipClass: 11, shipType: 69, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 83, firepower: 30, armor: 40, torpedo: 0, evasion: 30, aa: 36, aircraft: 4, speed: 10, los: 40, range: 2, luck: 25, asw: 0 }
  },
  434: {
    shipId: 434, sortId: 234, name: '睦月改二', yomi: 'むつき', shipClass: 2, shipType: 28, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 27, firepower: 10, armor: 12, torpedo: 28, evasion: 104, aa: 16, aircraft: 3, speed: 10, los: 8, range: 1, luck: 14, asw: 28 }
  },
  435: {
    shipId: 435, sortId: 235, name: '如月改二', yomi: 'きさらぎ', shipClass: 2, shipType: 28, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 27, firepower: 10, armor: 12, torpedo: 28, evasion: 105, aa: 18, aircraft: 3, speed: 10, los: 9, range: 1, luck: 13, asw: 27 }
  },
  436: {
    shipId: 436, sortId: 236, name: '呂500', yomi: 'ゆー511・ろ500', shipClass: 13, shipType: 86, rarity: 7,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 13, firepower: 4, armor: 7, torpedo: 30, evasion: 30, aa: 10, aircraft: 2, speed: 5, los: 12, range: 1, luck: 44, asw: 0 }
  },
  437: {
    shipId: 437, sortId: 237, name: '暁改二', yomi: 'あかつき', shipClass: 2, shipType: 5, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 31, firepower: 14, armor: 14, torpedo: 32, evasion: 99, aa: 19, aircraft: 3, speed: 10, los: 17, range: 1, luck: 15, asw: 28 }
  },
  438: {
    shipId: 438, sortId: 238, name: 'Saratoga改', yomi: 'サラトガ', shipClass: 11, shipType: 69, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 88, firepower: 10, armor: 48, torpedo: 0, evasion: 30, aa: 52, aircraft: 4, speed: 10, los: 48, range: 1, luck: 35, asw: 0 }
  },
  439: {
    shipId: 439, sortId: 239, name: 'Warspite', yomi: 'ウォースパイト', shipClass: 9, shipType: 67, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 72, firepower: 72, armor: 72, torpedo: 0, evasion: 30, aa: 38, aircraft: 4, speed: 5, los: 14, range: 3, luck: 55, asw: 0 }
  },
  440: {
    shipId: 440, sortId: 240, name: 'Iowa', yomi: 'アイオワ', shipClass: 8, shipType: 65, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 84, firepower: 85, armor: 79, torpedo: 0, evasion: 30, aa: 70, aircraft: 4, speed: 10, los: 24, range: 3, luck: 35, asw: 0 }
  },
  441: {
    shipId: 441, sortId: 241, name: 'Littorio', yomi: 'リットリオ・イタリア', shipClass: 8, shipType: 58, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 88, firepower: 78, armor: 72, torpedo: 0, evasion: 30, aa: 40, aircraft: 4, speed: 10, los: 15, range: 4, luck: 20, asw: 0 }
  },
  442: {
    shipId: 442, sortId: 242, name: 'Roma', yomi: 'ローマ', shipClass: 8, shipType: 58, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 88, firepower: 79, armor: 71, torpedo: 0, evasion: 30, aa: 44, aircraft: 4, speed: 10, los: 17, range: 4, luck: 6, asw: 0 }
  },
  443: {
    shipId: 443, sortId: 243, name: 'Libeccio', yomi: 'リベッチオ', shipClass: 2, shipType: 61, rarity: 6,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 15, firepower: 9, armor: 7, torpedo: 22, evasion: 86, aa: 11, aircraft: 2, speed: 10, los: 7, range: 1, luck: 12, asw: 30 }
  },
  444: {
    shipId: 444, sortId: 244, name: 'Aquila', yomi: 'アクィラ', shipClass: 11, shipType: 68, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 38, firepower: 10, armor: 18, torpedo: 0, evasion: 30, aa: 18, aircraft: 3, speed: 10, los: 30, range: 1, luck: 5, asw: 0 }
  },
  445: {
    shipId: 445, sortId: 245, name: '秋津洲', yomi: 'あきつしま', shipClass: 16, shipType: 59, rarity: 7,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 32, firepower: 6, armor: 9, torpedo: 0, evasion: 30, aa: 12, aircraft: 2, speed: 5, los: 22, range: 1, luck: 12, asw: 0 }
  },
  446: {
    shipId: 446, sortId: 246, name: 'Italia', yomi: 'リットリオ・イタリア', shipClass: 8, shipType: 58, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 92, firepower: 81, armor: 77, torpedo: 0, evasion: 30, aa: 44, aircraft: 4, speed: 10, los: 17, range: 4, luck: 30, asw: 0 }
  },
  447: {
    shipId: 447, sortId: 247, name: 'Roma改', yomi: 'ローマ', shipClass: 8, shipType: 58, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 92, firepower: 82, armor: 76, torpedo: 0, evasion: 30, aa: 46, aircraft: 4, speed: 10, los: 17, range: 4, luck: 8, asw: 0 }
  },
  448: {
    shipId: 448, sortId: 248, name: 'Zara', yomi: 'ザラ', shipClass: 5, shipType: 64, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 42, firepower: 36, armor: 36, torpedo: 0, evasion: 30, aa: 18, aircraft: 3, speed: 10, los: 10, range: 3, luck: 10, asw: 0 }
  },
  449: {
    shipId: 449, sortId: 249, name: 'Pola', yomi: 'ポーラ', shipClass: 5, shipType: 64, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 42, firepower: 35, armor: 35, torpedo: 0, evasion: 30, aa: 16, aircraft: 3, speed: 10, los: 9, range: 3, luck: 9, asw: 0 }
  },
  450: {
    shipId: 450, sortId: 250, name: '秋津洲改', yomi: 'あきつしま', shipClass: 16, shipType: 59, rarity: 8,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 36, firepower: 8, armor: 13, torpedo: 0, evasion: 30, aa: 16, aircraft: 3, speed: 5, los: 24, range: 1, luck: 14, asw: 0 }
  },
  451: {
    shipId: 451, sortId: 251, name: '瑞穂', yomi: 'みずほ', shipClass: 16, shipType: 62, rarity: 5,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 41, firepower: 12, armor: 19, torpedo: 0, evasion: 30, aa: 16, aircraft: 2, speed: 5, los: 36, range: 1, luck: 8, asw: 0 }
  },
  452: {
    shipId: 452, sortId: 252, name: '沖波', yomi: 'おきなみ', shipClass: 2, shipType: 38, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 74, aa: 9, aircraft: 2, speed: 10, los: 7, range: 1, luck: 10, asw: 28 }
  },
  453: {
    shipId: 453, sortId: 253, name: '風雲', yomi: 'かざぐも', shipClass: 2, shipType: 38, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 25, evasion: 73, aa: 10, aircraft: 2, speed: 10, los: 6, range: 1, luck: 13, asw: 27 }
  },
  454: {
    shipId: 454, sortId: 254, name: '嵐', yomi: 'あらし', shipClass: 2, shipType: 30, rarity: 5,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 91, aa: 9, aircraft: 2, speed: 10, los: 6, range: 1, luck: 11, asw: 28 }
  },
  455: {
    shipId: 455, sortId: 255, name: '萩風', yomi: 'はぎかぜ', shipClass: 2, shipType: 30, rarity: 5,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 11, armor: 6, torpedo: 24, evasion: 87, aa: 9, aircraft: 2, speed: 10, los: 6, range: 1, luck: 11, asw: 26 }
  },
  456: {
    shipId: 456, sortId: 256, name: '親潮', yomi: 'おやしお', shipClass: 2, shipType: 30, rarity: 5,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 67, aa: 9, aircraft: 2, speed: 10, los: 8, range: 1, luck: 13, asw: 23 }
  },
  457: {
    shipId: 457, sortId: 257, name: '山風', yomi: 'やまかぜ', shipClass: 2, shipType: 23, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 11, armor: 6, torpedo: 24, evasion: 61, aa: 8, aircraft: 2, speed: 10, los: 5, range: 1, luck: 6, asw: 19 }
  },
  458: {
    shipId: 458, sortId: 258, name: '海風', yomi: 'うみかぜ', shipClass: 2, shipType: 23, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 73, aa: 10, aircraft: 2, speed: 10, los: 6, range: 1, luck: 10, asw: 23 }
  },
  459: {
    shipId: 459, sortId: 259, name: '江風', yomi: 'かわかぜ', shipClass: 2, shipType: 23, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 25, evasion: 73, aa: 9, aircraft: 2, speed: 10, los: 6, range: 1, luck: 10, asw: 21 }
  },
  460: {
    shipId: 460, sortId: 260, name: '速吸', yomi: 'はやすい', shipClass: 22, shipType: 60, rarity: 6,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 43, firepower: 4, armor: 3, torpedo: 0, evasion: 33, aa: 10, aircraft: 2, speed: 5, los: 15, range: 1, luck: 7, asw: 5 }
  },
  461: {
    shipId: 461, sortId: 261, name: '翔鶴改二', yomi: 'しょうかく', shipClass: 11, shipType: 33, rarity: 8,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 77, firepower: 10, armor: 43, torpedo: 0, evasion: 30, aa: 48, aircraft: 4, speed: 10, los: 27, range: 2, luck: 20, asw: 0 }
  },
  462: {
    shipId: 462, sortId: 262, name: '瑞鶴改二', yomi: 'ずいかく', shipClass: 11, shipType: 33, rarity: 8,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 78, firepower: 10, armor: 44, torpedo: 0, evasion: 30, aa: 54, aircraft: 4, speed: 10, los: 52, range: 2, luck: 50, asw: 0 }
  },
  463: {
    shipId: 463, sortId: 263, name: '朝潮改二', yomi: 'あさしお', shipClass: 2, shipType: 18, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 31, firepower: 18, armor: 14, torpedo: 36, evasion: 87, aa: 22, aircraft: 3, speed: 10, los: 11, range: 1, luck: 17, asw: 26 }
  },
  464: {
    shipId: 464, sortId: 264, name: '霞改二', yomi: 'かすみ', shipClass: 2, shipType: 18, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 31, firepower: 16, armor: 14, torpedo: 33, evasion: 102, aa: 24, aircraft: 3, speed: 10, los: 14, range: 1, luck: 37, asw: 28 }
  },
  465: {
    shipId: 465, sortId: 265, name: '鹿島', yomi: 'かしま', shipClass: 21, shipType: 56, rarity: 3,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 36, firepower: 13, armor: 9, torpedo: 11, evasion: 69, aa: 15, aircraft: 3, speed: 5, los: 9, range: 2, luck: 20, asw: 13 }
  },
  466: {
    shipId: 466, sortId: 266, name: '翔鶴改二甲', yomi: 'しょうかく', shipClass: 18, shipType: 33, rarity: 8,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 78, firepower: 10, armor: 49, torpedo: 0, evasion: 30, aa: 48, aircraft: 4, speed: 10, los: 50, range: 2, luck: 20, asw: 0 }
  },
  467: {
    shipId: 467, sortId: 267, name: '瑞鶴改二甲', yomi: 'ずいかく', shipClass: 18, shipType: 33, rarity: 8,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 79, firepower: 10, armor: 49, torpedo: 0, evasion: 30, aa: 54, aircraft: 4, speed: 10, los: 50, range: 2, luck: 50, asw: 0 }
  },
  468: {
    shipId: 468, sortId: 268, name: '朝潮改二丁', yomi: 'あさしお', shipClass: 2, shipType: 18, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 34, firepower: 12, armor: 15, torpedo: 36, evasion: 127, aa: 30, aircraft: 3, speed: 10, los: 10, range: 1, luck: 17, asw: 45 }
  },
  469: {
    shipId: 469, sortId: 269, name: '江風改二', yomi: 'かわかぜ', shipClass: 2, shipType: 23, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 31, firepower: 16, armor: 14, torpedo: 38, evasion: 96, aa: 18, aircraft: 3, speed: 10, los: 13, range: 1, luck: 19, asw: 25 }
  },
  470: {
    shipId: 470, sortId: 270, name: '霞改二乙', yomi: 'かすみ', shipClass: 2, shipType: 18, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 31, firepower: 12, armor: 15, torpedo: 30, evasion: 102, aa: 32, aircraft: 3, speed: 10, los: 11, range: 1, luck: 37, asw: 28 }
  },
  471: {
    shipId: 471, sortId: 271, name: '神風', yomi: 'かみかぜ', shipClass: 2, shipType: 66, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 12, firepower: 5, armor: 5, torpedo: 12, evasion: 94, aa: 5, aircraft: 2, speed: 10, los: 5, range: 1, luck: 30, asw: 20 }
  },
  472: {
    shipId: 472, sortId: 272, name: '朝風', yomi: 'あさかぜ', shipClass: 2, shipType: 66, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 12, firepower: 5, armor: 5, torpedo: 12, evasion: 88, aa: 6, aircraft: 2, speed: 10, los: 6, range: 1, luck: 13, asw: 17 }
  },
  473: {
    shipId: 473, sortId: 273, name: '春風', yomi: 'はるかぜ', shipClass: 2, shipType: 66, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 12, firepower: 5, armor: 5, torpedo: 12, evasion: 89, aa: 6, aircraft: 2, speed: 10, los: 4, range: 1, luck: 25, asw: 18 }
  },
  474: {
    shipId: 474, sortId: 274, name: '松風', yomi: 'まつかぜ', shipClass: 2, shipType: 66, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 12, firepower: 5, armor: 5, torpedo: 12, evasion: 97, aa: 5, aircraft: 2, speed: 10, los: 4, range: 1, luck: 12, asw: 21 }
  },
  475: {
    shipId: 475, sortId: 275, name: '旗風', yomi: 'はたかぜ', shipClass: 2, shipType: 66, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 12, firepower: 5, armor: 5, torpedo: 12, evasion: 89, aa: 5, aircraft: 2, speed: 10, los: 4, range: 1, luck: 17, asw: 17 }
  },
  476: {
    shipId: 476, sortId: 276, name: '神風改', yomi: 'かみかぜ', shipClass: 2, shipType: 66, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 23, firepower: 8, armor: 10, torpedo: 14, evasion: 123, aa: 14, aircraft: 3, speed: 10, los: 7, range: 1, luck: 40, asw: 24 }
  },
  477: {
    shipId: 477, sortId: 277, name: '天龍改二', yomi: 'てんりゅう', shipClass: 3, shipType: 21, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 42, firepower: 22, armor: 29, torpedo: 0, evasion: 109, aa: 40, aircraft: 3, speed: 10, los: 12, range: 1, luck: 17, asw: 24 }
  },
  478: {
    shipId: 478, sortId: 278, name: '龍田改二', yomi: 'たつた', shipClass: 3, shipType: 21, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 42, firepower: 13, armor: 29, torpedo: 20, evasion: 109, aa: 32, aircraft: 3, speed: 10, los: 10, range: 1, luck: 18, asw: 50 }
  },
  479: {
    shipId: 479, sortId: 279, name: '天霧', yomi: 'あまぎり', shipClass: 2, shipType: 1, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 15, firepower: 10, armor: 5, torpedo: 27, evasion: 74, aa: 12, aircraft: 2, speed: 10, los: 5, range: 1, luck: 11, asw: 20 }
  },
  480: {
    shipId: 480, sortId: 280, name: '狭霧', yomi: 'さぎり', shipClass: 2, shipType: 1, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 15, firepower: 10, armor: 5, torpedo: 27, evasion: 74, aa: 12, aircraft: 2, speed: 10, los: 5, range: 1, luck: 6, asw: 20 }
  },
  481: {
    shipId: 481, sortId: 281, name: '水無月', yomi: 'みなづき', shipClass: 2, shipType: 28, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 13, firepower: 6, armor: 5, torpedo: 18, evasion: 61, aa: 7, aircraft: 2, speed: 10, los: 4, range: 1, luck: 13, asw: 17 }
  },
  483: {
    shipId: 483, sortId: 283, name: '伊26', yomi: 'い26', shipClass: 13, shipType: 39, rarity: 4,
    maxLevel: 100, slotCount: 1, initialStats: { hp: 14, firepower: 2, armor: 4, torpedo: 32, evasion: 30, aa: 10, aircraft: 1, speed: 5, los: 10, range: 1, luck: 14, asw: 0 }
  },
  484: {
    shipId: 484, sortId: 284, name: '浜波', yomi: 'はまなみ', shipClass: 2, shipType: 38, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 74, aa: 12, aircraft: 2, speed: 10, los: 9, range: 1, luck: 10, asw: 26 }
  },
  485: {
    shipId: 485, sortId: 285, name: '藤波', yomi: 'ふじなみ', shipClass: 2, shipType: 38, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 76, aa: 12, aircraft: 2, speed: 10, los: 9, range: 1, luck: 9, asw: 26 }
  },
  486: {
    shipId: 486, sortId: 286, name: '浦波', yomi: 'うらなみ', shipClass: 2, shipType: 12, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 15, firepower: 10, armor: 5, torpedo: 27, evasion: 74, aa: 10, aircraft: 2, speed: 10, los: 5, range: 1, luck: 14, asw: 20 }
  },
  487: {
    shipId: 487, sortId: 287, name: '鬼怒改二', yomi: 'きぬ', shipClass: 3, shipType: 20, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 45, firepower: 15, armor: 29, torpedo: 28, evasion: 120, aa: 41, aircraft: 3, speed: 10, los: 15, range: 1, luck: 17, asw: 49 }
  },
  488: {
    shipId: 488, sortId: 288, name: '由良改二', yomi: 'ゆら', shipClass: 3, shipType: 20, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 45, firepower: 14, armor: 29, torpedo: 26, evasion: 112, aa: 36, aircraft: 3, speed: 10, los: 17, range: 1, luck: 16, asw: 49 }
  },
  489: {
    shipId: 489, sortId: 289, name: '満潮改二', yomi: 'みちしお', shipClass: 2, shipType: 18, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 31, firepower: 19, armor: 15, torpedo: 32, evasion: 89, aa: 20, aircraft: 3, speed: 10, los: 14, range: 1, luck: 18, asw: 26 }
  },
  490: {
    shipId: 490, sortId: 290, name: '荒潮改二', yomi: 'あらしお', shipClass: 2, shipType: 18, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 31, firepower: 19, armor: 14, torpedo: 33, evasion: 87, aa: 22, aircraft: 3, speed: 10, los: 11, range: 1, luck: 17, asw: 26 }
  },
  491: {
    shipId: 491, sortId: 291, name: 'Commandant Teste', yomi: 'コマンダン・テスト', shipClass: 16, shipType: 70, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 42, firepower: 28, armor: 24, torpedo: 0, evasion: 30, aa: 18, aircraft: 3, speed: 5, los: 32, range: 1, luck: 17, asw: 0 }
  },
  492: {
    shipId: 492, sortId: 292, name: 'Richelieu', yomi: 'リシュリュー', shipClass: 8, shipType: 79, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 85, firepower: 64, armor: 72, torpedo: 0, evasion: 30, aa: 22, aircraft: 4, speed: 10, los: 14, range: 3, luck: 22, asw: 0 }
  },
  493: {
    shipId: 493, sortId: 293, name: '伊400', yomi: 'い400', shipClass: 14, shipType: 44, rarity: 6,
    maxLevel: 100, slotCount: 1, initialStats: { hp: 20, firepower: 2, armor: 5, torpedo: 36, evasion: 30, aa: 10, aircraft: 1, speed: 5, los: 15, range: 1, luck: 19, asw: 0 }
  },
  494: {
    shipId: 494, sortId: 294, name: '伊13', yomi: 'い13', shipClass: 14, shipType: 71, rarity: 5,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 18, firepower: 2, armor: 5, torpedo: 27, evasion: 30, aa: 10, aircraft: 2, speed: 5, los: 13, range: 1, luck: 6, asw: 0 }
  },
  495: {
    shipId: 495, sortId: 295, name: '伊14', yomi: 'い14', shipClass: 14, shipType: 71, rarity: 6,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 18, firepower: 2, armor: 5, torpedo: 27, evasion: 30, aa: 10, aircraft: 2, speed: 5, los: 14, range: 1, luck: 24, asw: 0 }
  },
  496: {
    shipId: 496, sortId: 296, name: 'Zara due', yomi: 'ザラ', shipClass: 5, shipType: 64, rarity: 8,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 62, firepower: 57, armor: 55, torpedo: 0, evasion: 30, aa: 35, aircraft: 4, speed: 10, los: 19, range: 3, luck: 17, asw: 0 }
  },
  497: {
    shipId: 497, sortId: 297, name: '白露改二', yomi: 'しらつゆ', shipClass: 2, shipType: 23, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 31, firepower: 16, armor: 14, torpedo: 28, evasion: 129, aa: 17, aircraft: 3, speed: 10, los: 10, range: 1, luck: 16, asw: 30 }
  },
  498: {
    shipId: 498, sortId: 298, name: '村雨改二', yomi: 'むらさめ', shipClass: 2, shipType: 23, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 31, firepower: 16, armor: 14, torpedo: 28, evasion: 118, aa: 18, aircraft: 3, speed: 10, los: 9, range: 1, luck: 17, asw: 29 }
  },
  499: {
    shipId: 499, sortId: 299, name: '神威改', yomi: 'かもい', shipClass: 16, shipType: 72, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 37, firepower: 6, armor: 13, torpedo: 0, evasion: 30, aa: 12, aircraft: 3, speed: 5, los: 22, range: 2, luck: 19, asw: 0 }
  },
  500: {
    shipId: 500, sortId: 300, name: '神威改母', yomi: 'かもい', shipClass: 22, shipType: 72, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 39, firepower: 7, armor: 17, torpedo: 0, evasion: 47, aa: 14, aircraft: 3, speed: 5, los: 24, range: 2, luck: 20, asw: 10 }
  },
  501: {
    shipId: 501, sortId: 301, name: '最上改二', yomi: 'もがみ', shipClass: 6, shipType: 9, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 60, firepower: 30, armor: 41, torpedo: 38, evasion: 30, aa: 30, aircraft: 4, speed: 10, los: 28, range: 2, luck: 18, asw: 0 }
  },
  502: {
    shipId: 502, sortId: 302, name: '三隈改二', yomi: 'みくま', shipClass: 6, shipType: 9, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 59, firepower: 31, armor: 41, torpedo: 38, evasion: 30, aa: 30, aircraft: 4, speed: 10, los: 25, range: 2, luck: 12, asw: 0 }
  },
  503: {
    shipId: 503, sortId: 303, name: '鈴谷改二', yomi: 'すずや', shipClass: 6, shipType: 9, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 61, firepower: 30, armor: 42, torpedo: 40, evasion: 30, aa: 30, aircraft: 4, speed: 10, los: 26, range: 2, luck: 14, asw: 0 }
  },
  504: {
    shipId: 504, sortId: 304, name: '熊野改二', yomi: 'くまの', shipClass: 6, shipType: 9, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 62, firepower: 30, armor: 42, torpedo: 40, evasion: 30, aa: 30, aircraft: 4, speed: 10, los: 25, range: 2, luck: 13, asw: 0 }
  },
  506: {
    shipId: 506, sortId: 306, name: '最上改二特', yomi: 'もがみ', shipClass: 6, shipType: 9, rarity: 8,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 61, firepower: 40, armor: 41, torpedo: 39, evasion: 30, aa: 30, aircraft: 4, speed: 10, los: 24, range: 2, luck: 18, asw: 0 }
  },
  507: {
    shipId: 507, sortId: 307, name: '三隈改二特', yomi: 'みくま', shipClass: 16, shipType: 9, rarity: 8,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 59, firepower: 31, armor: 41, torpedo: 46, evasion: 30, aa: 35, aircraft: 4, speed: 10, los: 32, range: 2, luck: 12, asw: 0 }
  },
  508: {
    shipId: 508, sortId: 308, name: '鈴谷航改二', yomi: 'すずや', shipClass: 7, shipType: 9, rarity: 8,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 61, firepower: 10, armor: 42, torpedo: 0, evasion: 30, aa: 33, aircraft: 4, speed: 10, los: 46, range: 2, luck: 13, asw: 0 }
  },
  509: {
    shipId: 509, sortId: 309, name: '熊野航改二', yomi: 'くまの', shipClass: 7, shipType: 9, rarity: 8,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 62, firepower: 10, armor: 42, torpedo: 0, evasion: 30, aa: 33, aircraft: 4, speed: 10, los: 45, range: 2, luck: 12, asw: 0 }
  },
  511: {
    shipId: 511, sortId: 311, name: 'Гангут', yomi: 'ガングート', shipClass: 8, shipType: 73, rarity: 5,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 59, firepower: 55, armor: 55, torpedo: 14, evasion: 30, aa: 22, aircraft: 4, speed: 5, los: 8, range: 3, luck: 20, asw: 0 }
  },
  512: {
    shipId: 512, sortId: 312, name: 'Октябрьская революция', yomi: 'ガングート', shipClass: 8, shipType: 73, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 72, firepower: 65, armor: 68, torpedo: 0, evasion: 30, aa: 36, aircraft: 4, speed: 5, los: 10, range: 3, luck: 30, asw: 0 }
  },
  513: {
    shipId: 513, sortId: 316, name: 'Гангут два', yomi: 'ガングート', shipClass: 8, shipType: 73, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 77, firepower: 66, armor: 71, torpedo: 16, evasion: 30, aa: 38, aircraft: 4, speed: 5, los: 14, range: 3, luck: 35, asw: 0 }
  },
  514: {
    shipId: 514, sortId: 314, name: 'Sheffield', yomi: 'シェフィールド', shipClass: 3, shipType: 108, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 38, firepower: 25, armor: 16, torpedo: 20, evasion: 97, aa: 28, aircraft: 3, speed: 10, los: 22, range: 2, luck: 17, asw: 38 }
  },
  515: {
    shipId: 515, sortId: 315, name: 'Ark Royal', yomi: 'アークロイヤル', shipClass: 11, shipType: 78, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 55, firepower: 10, armor: 26, torpedo: 0, evasion: 30, aa: 30, aircraft: 4, speed: 10, los: 40, range: 1, luck: 8, asw: 0 }
  },
  516: {
    shipId: 516, sortId: 313, name: 'Ташкент', yomi: 'タシュケント', shipClass: 2, shipType: 81, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 22, firepower: 18, armor: 12, torpedo: 12, evasion: 74, aa: 20, aircraft: 3, speed: 10, los: 7, range: 2, luck: 40, asw: 33 }
  },
  517: {
    shipId: 517, sortId: 317, name: '占守', yomi: 'しむしゅ', shipClass: 1, shipType: 74, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 9, firepower: 4, armor: 4, torpedo: 0, evasion: 106, aa: 7, aircraft: 2, speed: 5, los: 3, range: 1, luck: 40, asw: 32 }
  },
  518: {
    shipId: 518, sortId: 318, name: '国後', yomi: 'くなしり', shipClass: 1, shipType: 74, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 9, firepower: 4, armor: 4, torpedo: 0, evasion: 103, aa: 6, aircraft: 2, speed: 5, los: 4, range: 1, luck: 35, asw: 31 }
  },
  519: {
    shipId: 519, sortId: 319, name: 'Jervis', yomi: 'ジャーヴィス', shipClass: 2, shipType: 82, rarity: 6,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 15, firepower: 12, armor: 7, torpedo: 30, evasion: 118, aa: 22, aircraft: 2, speed: 10, los: 10, range: 1, luck: 50, asw: 40 }
  },
  520: {
    shipId: 520, sortId: 320, name: 'Janus', yomi: 'ジェーナス', shipClass: 2, shipType: 82, rarity: 6,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 15, firepower: 12, armor: 7, torpedo: 30, evasion: 120, aa: 22, aircraft: 2, speed: 10, los: 10, range: 1, luck: 17, asw: 40 }
  },
  521: {
    shipId: 521, sortId: 321, name: '春日丸', yomi: 'たいよう', shipClass: 7, shipType: 75, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 36, firepower: 10, armor: 14, torpedo: 0, evasion: 30, aa: 12, aircraft: 2, speed: 5, los: 28, range: 1, luck: 5, asw: 0 }
  },
  522: {
    shipId: 522, sortId: 322, name: '八幡丸', yomi: 'うんよう', shipClass: 7, shipType: 75, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 36, firepower: 10, armor: 14, torpedo: 0, evasion: 30, aa: 13, aircraft: 2, speed: 5, los: 28, range: 1, luck: 6, asw: 0 }
  },
  524: {
    shipId: 524, sortId: 334, name: '択捉', yomi: 'えとろふ', shipClass: 1, shipType: 77, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 9, firepower: 4, armor: 4, torpedo: 0, evasion: 104, aa: 7, aircraft: 2, speed: 5, los: 3, range: 1, luck: 37, asw: 35 }
  },
  525: {
    shipId: 525, sortId: 335, name: '松輪', yomi: 'まつわ', shipClass: 1, shipType: 77, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 9, firepower: 4, armor: 4, torpedo: 0, evasion: 104, aa: 7, aircraft: 2, speed: 5, los: 3, range: 1, luck: 7, asw: 35 }
  },
  526: {
    shipId: 526, sortId: 326, name: '大鷹', yomi: 'たいよう', shipClass: 7, shipType: 76, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 37, firepower: 10, armor: 15, torpedo: 0, evasion: 79, aa: 13, aircraft: 3, speed: 5, los: 30, range: 1, luck: 6, asw: 35 }
  },
  527: {
    shipId: 527, sortId: 327, name: '岸波', yomi: 'きしなみ', shipClass: 2, shipType: 38, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 78, aa: 12, aircraft: 2, speed: 10, los: 9, range: 1, luck: 10, asw: 26 }
  },
  528: {
    shipId: 528, sortId: 328, name: '早波', yomi: 'はやなみ', shipClass: 2, shipType: 38, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 79, aa: 12, aircraft: 2, speed: 10, los: 9, range: 1, luck: 9, asw: 25 }
  },
  529: {
    shipId: 529, sortId: 331, name: '大鷹改二', yomi: 'たいよう', shipClass: 7, shipType: 76, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 49, firepower: 18, armor: 26, torpedo: 0, evasion: 101, aa: 24, aircraft: 4, speed: 5, los: 40, range: 2, luck: 14, asw: 75 }
  },
  530: {
    shipId: 530, sortId: 330, name: '伊504', yomi: 'ルイージ・トレッリ', shipClass: 13, shipType: 80, rarity: 7,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 14, firepower: 3, armor: 5, torpedo: 30, evasion: 30, aa: 10, aircraft: 2, speed: 5, los: 10, range: 1, luck: 40, asw: 0 }
  },
  531: {
    shipId: 531, sortId: 339, name: '佐渡', yomi: 'さど', shipClass: 1, shipType: 77, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 9, firepower: 4, armor: 4, torpedo: 0, evasion: 105, aa: 7, aircraft: 2, speed: 5, los: 3, range: 1, luck: 7, asw: 36 }
  },
  532: {
    shipId: 532, sortId: 332, name: '涼月', yomi: 'すずつき', shipClass: 2, shipType: 54, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 21, firepower: 16, armor: 10, torpedo: 16, evasion: 92, aa: 70, aircraft: 3, speed: 10, los: 8, range: 1, luck: 27, asw: 25 }
  },
  533: {
    shipId: 533, sortId: 333, name: '冬月', yomi: 'ふゆつき', shipClass: 2, shipType: 54, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 21, firepower: 16, armor: 10, torpedo: 16, evasion: 91, aa: 70, aircraft: 3, speed: 10, los: 8, range: 1, luck: 38, asw: 24 }
  },
  534: {
    shipId: 534, sortId: 324, name: '神鷹', yomi: 'しんよう', shipClass: 7, shipType: 76, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 38, firepower: 10, armor: 15, torpedo: 0, evasion: 80, aa: 14, aircraft: 3, speed: 5, los: 28, range: 1, luck: 9, asw: 36 }
  },
  535: {
    shipId: 535, sortId: 325, name: 'Luigi Torelli', yomi: 'ルイージ・トレッリ', shipClass: 13, shipType: 80, rarity: 4,
    maxLevel: 100, slotCount: 1, initialStats: { hp: 11, firepower: 2, armor: 5, torpedo: 18, evasion: 30, aa: 10, aircraft: 1, speed: 5, los: 6, range: 1, luck: 25, asw: 0 }
  },
  536: {
    shipId: 536, sortId: 336, name: '神鷹改二', yomi: 'しんよう', shipClass: 7, shipType: 76, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 50, firepower: 15, armor: 26, torpedo: 0, evasion: 101, aa: 27, aircraft: 4, speed: 5, los: 32, range: 2, luck: 15, asw: 73 }
  },
  537: {
    shipId: 537, sortId: 337, name: '涼月改', yomi: 'すずつき', shipClass: 2, shipType: 54, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 38, firepower: 22, armor: 16, torpedo: 22, evasion: 108, aa: 82, aircraft: 3, speed: 10, los: 9, range: 1, luck: 37, asw: 28 }
  },
  538: {
    shipId: 538, sortId: 338, name: '冬月改', yomi: 'ふゆつき', shipClass: 2, shipType: 54, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 38, firepower: 22, armor: 16, torpedo: 22, evasion: 107, aa: 82, aircraft: 3, speed: 10, los: 9, range: 1, luck: 38, asw: 29 }
  },
  539: {
    shipId: 539, sortId: 329, name: 'UIT-25', yomi: 'ルイージ・トレッリ', shipClass: 13, shipType: 80, rarity: 6,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 13, firepower: 2, armor: 5, torpedo: 0, evasion: 30, aa: 10, aircraft: 2, speed: 5, los: 9, range: 1, luck: 35, asw: 0 }
  },
  540: {
    shipId: 540, sortId: 340, name: '対馬', yomi: 'つしま', shipClass: 1, shipType: 77, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 9, firepower: 4, armor: 4, torpedo: 0, evasion: 104, aa: 7, aircraft: 2, speed: 5, los: 3, range: 1, luck: 47, asw: 35 }
  },
  541: {
    shipId: 541, sortId: 341, name: '長門改二', yomi: 'ながと', shipClass: 9, shipType: 19, rarity: 8,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 91, firepower: 91, armor: 88, torpedo: 0, evasion: 30, aa: 40, aircraft: 4, speed: 5, los: 16, range: 3, luck: 40, asw: 0 }
  },
  542: {
    shipId: 542, sortId: 342, name: '夕雲改二', yomi: 'ゆうぐも', shipClass: 2, shipType: 38, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 33, firepower: 18, armor: 15, torpedo: 30, evasion: 117, aa: 20, aircraft: 3, speed: 10, los: 12, range: 1, luck: 18, asw: 30 }
  },
  543: {
    shipId: 543, sortId: 343, name: '長波改二', yomi: 'ながなみ', shipClass: 2, shipType: 38, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 33, firepower: 18, armor: 15, torpedo: 30, evasion: 101, aa: 20, aircraft: 3, speed: 10, los: 13, range: 1, luck: 30, asw: 30 }
  },
  544: {
    shipId: 544, sortId: 344, name: 'Gambier Bay', yomi: 'ガンビア・ベイ', shipClass: 7, shipType: 83, rarity: 5,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 28, firepower: 10, armor: 9, torpedo: 0, evasion: 94, aa: 20, aircraft: 2, speed: 5, los: 36, range: 1, luck: 12, asw: 20 }
  },
  545: {
    shipId: 545, sortId: 345, name: 'Saratoga Mk.II', yomi: 'サラトガ', shipClass: 11, shipType: 69, rarity: 8,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 89, firepower: 10, armor: 48, torpedo: 0, evasion: 30, aa: 60, aircraft: 4, speed: 10, los: 54, range: 2, luck: 40, asw: 0 }
  },
  546: {
    shipId: 546, sortId: 346, name: '武蔵改二', yomi: 'むさし', shipClass: 9, shipType: 37, rarity: 8,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 99, firepower: 100, armor: 95, torpedo: 0, evasion: 30, aa: 65, aircraft: 5, speed: 5, los: 18, range: 4, luck: 10, asw: 0 }
  },
  547: {
    shipId: 547, sortId: 347, name: '多摩改二', yomi: 'たま', shipClass: 3, shipType: 4, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 46, firepower: 16, armor: 29, torpedo: 25, evasion: 121, aa: 33, aircraft: 3, speed: 10, los: 14, range: 1, luck: 13, asw: 43 }
  },
  548: {
    shipId: 548, sortId: 348, name: '文月改二', yomi: 'ふみづき', shipClass: 2, shipType: 28, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 27, firepower: 7, armor: 12, torpedo: 27, evasion: 125, aa: 37, aircraft: 3, speed: 10, los: 11, range: 1, luck: 17, asw: 30 }
  },
  549: {
    shipId: 549, sortId: 349, name: 'Intrepid', yomi: 'イントレピッド', shipClass: 11, shipType: 84, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 65, firepower: 10, armor: 43, torpedo: 0, evasion: 30, aa: 50, aircraft: 4, speed: 10, los: 50, range: 2, luck: 45, asw: 0 }
  },
  550: {
    shipId: 550, sortId: 350, name: 'Saratoga Mk.II Mod.2', yomi: 'サラトガ', shipClass: 18, shipType: 69, rarity: 8,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 89, firepower: 10, armor: 50, torpedo: 0, evasion: 30, aa: 60, aircraft: 4, speed: 10, los: 56, range: 2, luck: 40, asw: 0 }
  },
  551: {
    shipId: 551, sortId: 351, name: '日振', yomi: 'ひぶり', shipClass: 1, shipType: 85, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 9, firepower: 4, armor: 4, torpedo: 0, evasion: 111, aa: 10, aircraft: 2, speed: 5, los: 3, range: 1, luck: 7, asw: 40 }
  },
  552: {
    shipId: 552, sortId: 352, name: '大東', yomi: 'だいとう', shipClass: 1, shipType: 85, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 9, firepower: 4, armor: 4, torpedo: 0, evasion: 109, aa: 10, aircraft: 2, speed: 5, los: 3, range: 1, luck: 33, asw: 40 }
  },
  553: {
    shipId: 553, sortId: 353, name: '伊勢改二', yomi: 'いせ', shipClass: 10, shipType: 2, rarity: 8,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 78, firepower: 60, armor: 75, torpedo: 0, evasion: 30, aa: 48, aircraft: 5, speed: 5, los: 30, range: 2, luck: 40, asw: 0 }
  },
  554: {
    shipId: 554, sortId: 354, name: '日向改二', yomi: 'ひゅうが', shipClass: 10, shipType: 2, rarity: 8,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 78, firepower: 58, armor: 73, torpedo: 0, evasion: 99, aa: 46, aircraft: 5, speed: 5, los: 32, range: 2, luck: 40, asw: 68 }
  },
  555: {
    shipId: 555, sortId: 355, name: '瑞鳳改二', yomi: 'ずいほう', shipClass: 7, shipType: 11, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 59, firepower: 10, armor: 37, torpedo: 0, evasion: 30, aa: 27, aircraft: 4, speed: 10, los: 40, range: 2, luck: 42, asw: 0 }
  },
  556: {
    shipId: 556, sortId: 356, name: '浦風丁改', yomi: 'うらかぜ', shipClass: 2, shipType: 30, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 33, firepower: 12, armor: 14, torpedo: 20, evasion: 125, aa: 26, aircraft: 3, speed: 10, los: 10, range: 1, luck: 18, asw: 45 }
  },
  557: {
    shipId: 557, sortId: 357, name: '磯風乙改', yomi: 'いそかぜ', shipClass: 2, shipType: 30, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 34, firepower: 10, armor: 14, torpedo: 24, evasion: 105, aa: 30, aircraft: 3, speed: 10, los: 10, range: 1, luck: 24, asw: 31 }
  },
  558: {
    shipId: 558, sortId: 358, name: '浜風乙改', yomi: 'はまかぜ', shipClass: 2, shipType: 30, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 33, firepower: 10, armor: 14, torpedo: 24, evasion: 108, aa: 32, aircraft: 3, speed: 10, los: 9, range: 1, luck: 20, asw: 32 }
  },
  559: {
    shipId: 559, sortId: 359, name: '谷風丁改', yomi: 'たにかぜ', shipClass: 2, shipType: 30, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 33, firepower: 11, armor: 14, torpedo: 32, evasion: 122, aa: 27, aircraft: 3, speed: 10, los: 8, range: 1, luck: 17, asw: 44 }
  },
  560: {
    shipId: 560, sortId: 360, name: '瑞鳳改二乙', yomi: 'ずいほう', shipClass: 7, shipType: 11, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 59, firepower: 10, armor: 37, torpedo: 0, evasion: 61, aa: 33, aircraft: 4, speed: 10, los: 40, range: 3, luck: 42, asw: 32 }
  },
  561: {
    shipId: 561, sortId: 361, name: 'Samuel B.Roberts', yomi: 'サミュエル・B・ロバーツ', shipClass: 2, shipType: 87, rarity: 5,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 14, firepower: 8, armor: 5, torpedo: 12, evasion: 107, aa: 20, aircraft: 2, speed: 5, los: 12, range: 1, luck: 30, asw: 48 }
  },
  562: {
    shipId: 562, sortId: 362, name: 'Johnston', yomi: 'ジョンストン', shipClass: 2, shipType: 91, rarity: 5,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 17, firepower: 12, armor: 7, torpedo: 20, evasion: 109, aa: 32, aircraft: 2, speed: 10, los: 20, range: 1, luck: 17, asw: 50 }
  },
  563: {
    shipId: 563, sortId: 363, name: '巻雲改二', yomi: 'まきぐも', shipClass: 2, shipType: 38, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 33, firepower: 18, armor: 15, torpedo: 30, evasion: 108, aa: 20, aircraft: 3, speed: 10, los: 11, range: 1, luck: 16, asw: 30 }
  },
  564: {
    shipId: 564, sortId: 364, name: '風雲改二', yomi: 'かざぐも', shipClass: 2, shipType: 38, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 33, firepower: 18, armor: 15, torpedo: 30, evasion: 120, aa: 20, aircraft: 3, speed: 10, los: 10, range: 1, luck: 20, asw: 29 }
  },
  565: {
    shipId: 565, sortId: 365, name: '福江', yomi: 'ふかえ', shipClass: 1, shipType: 77, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 9, firepower: 4, armor: 4, torpedo: 0, evasion: 104, aa: 7, aircraft: 2, speed: 5, los: 3, range: 1, luck: 36, asw: 35 }
  },
  566: {
    shipId: 566, sortId: 366, name: '陽炎改二', yomi: 'かげろう', shipClass: 2, shipType: 30, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 33, firepower: 18, armor: 14, torpedo: 30, evasion: 99, aa: 20, aircraft: 3, speed: 10, los: 10, range: 1, luck: 20, asw: 30 }
  },
  567: {
    shipId: 567, sortId: 367, name: '不知火改二', yomi: 'しらぬい', shipClass: 2, shipType: 30, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 33, firepower: 18, armor: 14, torpedo: 30, evasion: 101, aa: 20, aircraft: 3, speed: 10, los: 11, range: 1, luck: 24, asw: 30 }
  },
  568: {
    shipId: 568, sortId: 368, name: '黒潮改二', yomi: 'くろしお', shipClass: 2, shipType: 30, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 33, firepower: 18, armor: 14, torpedo: 30, evasion: 103, aa: 20, aircraft: 3, speed: 10, los: 10, range: 1, luck: 22, asw: 31 }
  },
  569: {
    shipId: 569, sortId: 369, name: '沖波改二', yomi: 'おきなみ', shipClass: 2, shipType: 38, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 33, firepower: 18, armor: 15, torpedo: 30, evasion: 124, aa: 18, aircraft: 3, speed: 10, los: 10, range: 1, luck: 22, asw: 29 }
  },
  570: {
    shipId: 570, sortId: 370, name: '平戸', yomi: 'ひらと', shipClass: 1, shipType: 77, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 9, firepower: 4, armor: 4, torpedo: 0, evasion: 108, aa: 7, aircraft: 2, speed: 5, los: 3, range: 1, luck: 11, asw: 34 }
  },
  571: {
    shipId: 571, sortId: 371, name: 'Nelson', yomi: 'ネルソン', shipClass: 9, shipType: 88, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 82, firepower: 72, armor: 74, torpedo: 0, evasion: 30, aa: 24, aircraft: 4, speed: 5, los: 12, range: 3, luck: 24, asw: 0 }
  },
  572: {
    shipId: 572, sortId: 372, name: 'Rodney', yomi: 'ロドニー', shipClass: 9, shipType: 88, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 81, firepower: 72, armor: 73, torpedo: 0, evasion: 30, aa: 24, aircraft: 4, speed: 5, los: 12, range: 3, luck: 23, asw: 0 }
  },
  573: {
    shipId: 573, sortId: 373, name: '陸奥改二', yomi: 'むつ', shipClass: 9, shipType: 19, rarity: 8,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 91, firepower: 91, armor: 86, torpedo: 0, evasion: 30, aa: 38, aircraft: 4, speed: 5, los: 15, range: 3, luck: 16, asw: 0 }
  },
  574: {
    shipId: 574, sortId: 374, name: 'Gotland', yomi: 'ゴトランド', shipClass: 3, shipType: 89, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 32, firepower: 16, armor: 12, torpedo: 16, evasion: 77, aa: 18, aircraft: 3, speed: 10, los: 45, range: 2, luck: 20, asw: 36 }
  },
  575: {
    shipId: 575, sortId: 375, name: 'Maestrale', yomi: 'マエストラーレ', shipClass: 2, shipType: 61, rarity: 6,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 15, firepower: 9, armor: 7, torpedo: 22, evasion: 86, aa: 11, aircraft: 2, speed: 10, los: 7, range: 1, luck: 14, asw: 30 }
  },
  576: {
    shipId: 576, sortId: 376, name: 'Nelson改', yomi: 'ネルソン', shipClass: 9, shipType: 88, rarity: 8,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 93, firepower: 81, armor: 84, torpedo: 0, evasion: 30, aa: 30, aircraft: 4, speed: 5, los: 14, range: 3, luck: 28, asw: 0 }
  },
  577: {
    shipId: 577, sortId: 377, name: 'Rodney改', yomi: 'ロドニー', shipClass: 9, shipType: 88, rarity: 8,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 92, firepower: 81, armor: 83, torpedo: 0, evasion: 30, aa: 30, aircraft: 4, speed: 5, los: 13, range: 3, luck: 27, asw: 0 }
  },
  578: {
    shipId: 578, sortId: 378, name: '朝霜改二', yomi: 'あさしも', shipClass: 2, shipType: 38, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 33, firepower: 18, armor: 15, torpedo: 30, evasion: 116, aa: 18, aircraft: 3, speed: 10, los: 12, range: 1, luck: 28, asw: 29 }
  },
  579: {
    shipId: 579, sortId: 379, name: 'Gotland改', yomi: 'ゴトランド', shipClass: 3, shipType: 89, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 43, firepower: 17, armor: 18, torpedo: 17, evasion: 82, aa: 66, aircraft: 4, speed: 10, los: 18, range: 2, luck: 24, asw: 38 }
  },
  580: {
    shipId: 580, sortId: 380, name: 'Maestrale改', yomi: 'マエストラーレ', shipClass: 2, shipType: 61, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 29, firepower: 13, armor: 15, torpedo: 27, evasion: 114, aa: 22, aircraft: 3, speed: 10, los: 10, range: 1, luck: 17, asw: 40 }
  },
  581: {
    shipId: 581, sortId: 381, name: '日進', yomi: 'にっしん', shipClass: 16, shipType: 90, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 45, firepower: 16, armor: 22, torpedo: 0, evasion: 30, aa: 20, aircraft: 3, speed: 10, los: 40, range: 2, luck: 9, asw: 0 }
  },
  582: {
    shipId: 582, sortId: 382, name: '夏雲', yomi: 'なつぐも', shipClass: 2, shipType: 18, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 71, aa: 9, aircraft: 2, speed: 10, los: 5, range: 1, luck: 6, asw: 21 }
  },
  583: {
    shipId: 583, sortId: 383, name: '峯雲', yomi: 'みねぐも', shipClass: 2, shipType: 18, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 73, aa: 9, aircraft: 2, speed: 10, los: 5, range: 1, luck: 6, asw: 21 }
  },
  584: {
    shipId: 584, sortId: 384, name: '八丈', yomi: 'はちじょう', shipClass: 1, shipType: 74, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 9, firepower: 4, armor: 4, torpedo: 0, evasion: 107, aa: 7, aircraft: 2, speed: 5, los: 3, range: 1, luck: 40, asw: 31 }
  },
  585: {
    shipId: 585, sortId: 385, name: '石垣', yomi: 'いしがき', shipClass: 1, shipType: 74, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 9, firepower: 4, armor: 4, torpedo: 0, evasion: 112, aa: 6, aircraft: 2, speed: 5, los: 4, range: 1, luck: 9, asw: 32 }
  },
  586: {
    shipId: 586, sortId: 386, name: '日進甲', yomi: 'にっしん', shipClass: 16, shipType: 90, rarity: 8,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 49, firepower: 20, armor: 24, torpedo: 0, evasion: 30, aa: 25, aircraft: 4, speed: 10, los: 48, range: 2, luck: 10, asw: 0 }
  },
  587: {
    shipId: 587, sortId: 387, name: '海風改二', yomi: 'うみかぜ', shipClass: 2, shipType: 23, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 31, firepower: 15, armor: 14, torpedo: 38, evasion: 128, aa: 19, aircraft: 3, speed: 10, los: 11, range: 1, luck: 20, asw: 28 }
  },
  588: {
    shipId: 588, sortId: 388, name: '山風改二', yomi: 'やまかぜ', shipClass: 2, shipType: 23, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 30, firepower: 14, armor: 12, torpedo: 36, evasion: 134, aa: 17, aircraft: 3, speed: 10, los: 7, range: 1, luck: 10, asw: 30 }
  },
  589: {
    shipId: 589, sortId: 389, name: 'L.d.S.D.d.Abruzzi', yomi: 'アブルッツィ', shipClass: 3, shipType: 92, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 37, firepower: 27, armor: 33, torpedo: 20, evasion: 55, aa: 20, aircraft: 3, speed: 10, los: 12, range: 2, luck: 20, asw: 20 }
  },
  590: {
    shipId: 590, sortId: 390, name: 'G.Garibaldi', yomi: 'ガリバルディ', shipClass: 3, shipType: 92, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 37, firepower: 28, armor: 33, torpedo: 20, evasion: 57, aa: 20, aircraft: 3, speed: 10, los: 12, range: 2, luck: 20, asw: 20 }
  },
  591: {
    shipId: 591, sortId: 391, name: '金剛改二丙', yomi: 'こんごう', shipClass: 8, shipType: 6, rarity: 8,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 86, firepower: 76, armor: 72, torpedo: 20, evasion: 30, aa: 32, aircraft: 4, speed: 10, los: 17, range: 3, luck: 18, asw: 0 }
  },
  592: {
    shipId: 592, sortId: 392, name: '比叡改二丙', yomi: 'ひえい', shipClass: 8, shipType: 6, rarity: 8,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 86, firepower: 76, armor: 71, torpedo: 18, evasion: 30, aa: 31, aircraft: 4, speed: 10, los: 17, range: 3, luck: 15, asw: 0 }
  },
  593: {
    shipId: 593, sortId: 393, name: '榛名改二乙', yomi: 'はるな', shipClass: 8, shipType: 6, rarity: 8,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 85, firepower: 74, armor: 70, torpedo: 17, evasion: 30, aa: 51, aircraft: 4, speed: 10, los: 16, range: 3, luck: 48, asw: 0 }
  },
  594: {
    shipId: 594, sortId: 404, name: '赤城改二', yomi: 'あかぎ', shipClass: 11, shipType: 14, rarity: 8,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 81, firepower: 10, armor: 42, torpedo: 0, evasion: 30, aa: 40, aircraft: 5, speed: 10, los: 51, range: 2, luck: 20, asw: 0 }
  },
  595: {
    shipId: 595, sortId: 395, name: 'Houston', yomi: 'ヒューストン', shipClass: 5, shipType: 95, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 43, firepower: 37, armor: 33, torpedo: 16, evasion: 30, aa: 20, aircraft: 3, speed: 10, los: 15, range: 2, luck: 12, asw: 0 }
  },
  596: {
    shipId: 596, sortId: 396, name: 'Fletcher', yomi: 'フレッチャー', shipClass: 2, shipType: 91, rarity: 6,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 18, firepower: 12, armor: 7, torpedo: 20, evasion: 111, aa: 32, aircraft: 2, speed: 10, los: 20, range: 1, luck: 30, asw: 50 }
  },
  597: {
    shipId: 597, sortId: 397, name: 'Atlanta', yomi: 'アトランタ', shipClass: 3, shipType: 99, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 27, firepower: 16, armor: 15, torpedo: 22, evasion: 28, aa: 80, aircraft: 3, speed: 10, los: 11, range: 1, luck: 17, asw: 10 }
  },
  598: {
    shipId: 598, sortId: 398, name: 'Honolulu', yomi: 'ホノルル', shipClass: 3, shipType: 110, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 38, firepower: 29, armor: 16, torpedo: 0, evasion: 65, aa: 26, aircraft: 3, speed: 10, los: 17, range: 2, luck: 15, asw: 0 }
  },
  599: {
    shipId: 599, sortId: 409, name: '赤城改二戊', yomi: 'あかぎ', shipClass: 11, shipType: 14, rarity: 8,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 81, firepower: 10, armor: 42, torpedo: 0, evasion: 30, aa: 40, aircraft: 5, speed: 10, los: 50, range: 2, luck: 20, asw: 0 }
  },
  600: {
    shipId: 600, sortId: 400, name: 'Houston改', yomi: 'ヒューストン', shipClass: 5, shipType: 95, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 54, firepower: 46, armor: 40, torpedo: 20, evasion: 30, aa: 30, aircraft: 4, speed: 10, los: 16, range: 2, luck: 20, asw: 0 }
  },
  601: {
    shipId: 601, sortId: 401, name: 'Colorado', yomi: 'コロラド', shipClass: 9, shipType: 93, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 77, firepower: 78, armor: 73, torpedo: 0, evasion: 30, aa: 28, aircraft: 4, speed: 5, los: 9, range: 3, luck: 30, asw: 0 }
  },
  602: {
    shipId: 602, sortId: 402, name: 'South Dakota', yomi: 'サウスダコタ', shipClass: 8, shipType: 102, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 79, firepower: 81, armor: 77, torpedo: 0, evasion: 30, aa: 40, aircraft: 4, speed: 10, los: 15, range: 3, luck: 20, asw: 0 }
  },
  603: {
    shipId: 603, sortId: 403, name: 'Hornet', yomi: 'ホーネット', shipClass: 11, shipType: 105, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 67, firepower: 10, armor: 38, torpedo: 0, evasion: 30, aa: 32, aircraft: 4, speed: 10, los: 45, range: 2, luck: 28, asw: 0 }
  },
  604: {
    shipId: 604, sortId: 399, name: 'De Ruyter', yomi: 'デ・ロイテル', shipClass: 3, shipType: 98, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 28, firepower: 21, armor: 15, torpedo: 0, evasion: 66, aa: 20, aircraft: 3, speed: 10, los: 10, range: 2, luck: 9, asw: 10 }
  },
  605: {
    shipId: 605, sortId: 1505, name: 'Luigi Torelli改', yomi: 'ルイージ・トレッリ', shipClass: 13, shipType: 80, rarity: 5,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 13, firepower: 10, armor: 5, torpedo: 0, evasion: 30, aa: 10, aircraft: 2, speed: 5, los: 8, range: 1, luck: 30, asw: 0 }
  },
  606: {
    shipId: 606, sortId: 1506, name: '伊400改', yomi: 'い400', shipClass: 14, shipType: 44, rarity: 7,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 24, firepower: 6, armor: 7, torpedo: 40, evasion: 30, aa: 10, aircraft: 2, speed: 5, los: 16, range: 1, luck: 19, asw: 0 }
  },
  607: {
    shipId: 607, sortId: 1507, name: '伊47改', yomi: 'い47', shipClass: 13, shipType: 103, rarity: 6,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 18, firepower: 3, armor: 5, torpedo: 40, evasion: 30, aa: 10, aircraft: 2, speed: 5, los: 11, range: 1, luck: 50, asw: 0 }
  },
  609: {
    shipId: 609, sortId: 1494, name: 'De Ruyter改', yomi: 'デ・ロイテル', shipClass: 3, shipType: 98, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 43, firepower: 29, armor: 29, torpedo: 0, evasion: 80, aa: 25, aircraft: 3, speed: 10, los: 11, range: 2, luck: 10, asw: 15 }
  },
  610: {
    shipId: 610, sortId: 410, name: '加賀改二戊', yomi: 'かが', shipClass: 11, shipType: 3, rarity: 8,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 84, firepower: 10, armor: 41, torpedo: 0, evasion: 18685, aa: 36, aircraft: 5, speed: 10, los: 10, range: 2, luck: 18, asw: 0 }
  },
  611: {
    shipId: 611, sortId: 411, name: '御蔵', yomi: 'みくら', shipClass: 1, shipType: 94, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 9, firepower: 4, armor: 4, torpedo: 0, evasion: 111, aa: 9, aircraft: 2, speed: 5, los: 3, range: 1, luck: 12, asw: 40 }
  },
  612: {
    shipId: 612, sortId: 412, name: '屋代', yomi: 'やしろ', shipClass: 1, shipType: 94, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 9, firepower: 4, armor: 4, torpedo: 0, evasion: 112, aa: 9, aircraft: 2, speed: 5, los: 3, range: 1, luck: 20, asw: 40 }
  },
  613: {
    shipId: 613, sortId: 413, name: 'Perth', yomi: 'パース', shipClass: 3, shipType: 96, rarity: 4,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 29, firepower: 24, armor: 17, torpedo: 20, evasion: 80, aa: 24, aircraft: 3, speed: 10, los: 9, range: 2, luck: 12, asw: 15 }
  },
  614: {
    shipId: 614, sortId: 414, name: 'Grecale', yomi: 'グレカーレ', shipClass: 2, shipType: 61, rarity: 6,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 15, firepower: 9, armor: 7, torpedo: 22, evasion: 86, aa: 10, aircraft: 2, speed: 10, los: 7, range: 1, luck: 14, asw: 30 }
  },
  615: {
    shipId: 615, sortId: 415, name: 'Helena', yomi: 'ヘレナ', shipClass: 3, shipType: 106, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 39, firepower: 30, armor: 17, torpedo: 0, evasion: 67, aa: 30, aircraft: 3, speed: 10, los: 18, range: 2, luck: 9, asw: 0 }
  },
  616: {
    shipId: 616, sortId: 416, name: '御蔵改', yomi: 'みくら', shipClass: 1, shipType: 94, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 17, firepower: 5, armor: 7, torpedo: 0, evasion: 122, aa: 16, aircraft: 3, speed: 5, los: 5, range: 1, luck: 15, asw: 40 }
  },
  617: {
    shipId: 617, sortId: 417, name: '屋代改', yomi: 'やしろ', shipClass: 1, shipType: 94, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 17, firepower: 5, armor: 7, torpedo: 0, evasion: 124, aa: 16, aircraft: 3, speed: 5, los: 10, range: 1, luck: 30, asw: 39 }
  },
  618: {
    shipId: 618, sortId: 418, name: 'Perth改', yomi: 'パース', shipClass: 3, shipType: 96, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 45, firepower: 32, armor: 27, torpedo: 24, evasion: 85, aa: 28, aircraft: 3, speed: 10, los: 10, range: 2, luck: 22, asw: 20 }
  },
  619: {
    shipId: 619, sortId: 419, name: 'Grecale改', yomi: 'グレカーレ', shipClass: 2, shipType: 61, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 29, firepower: 12, armor: 15, torpedo: 18, evasion: 114, aa: 36, aircraft: 3, speed: 10, los: 10, range: 1, luck: 40, asw: 38 }
  },
  620: {
    shipId: 620, sortId: 420, name: 'Helena改', yomi: 'ヘレナ', shipClass: 3, shipType: 106, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 53, firepower: 36, armor: 27, torpedo: 0, evasion: 74, aa: 40, aircraft: 4, speed: 10, los: 23, range: 2, luck: 13, asw: 0 }
  },
  621: {
    shipId: 621, sortId: 421, name: '神州丸', yomi: 'しんしゅうまる', shipClass: 17, shipType: 97, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 37, firepower: 5, armor: 9, torpedo: 0, evasion: 57, aa: 10, aircraft: 3, speed: 5, los: 20, range: 1, luck: 14, asw: 20 }
  },
  622: {
    shipId: 622, sortId: 422, name: '夕張改二', yomi: 'ゆうばり', shipClass: 3, shipType: 34, rarity: 7,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 41, firepower: 14, armor: 35, torpedo: 50, evasion: 112, aa: 58, aircraft: 5, speed: 10, los: 10, range: 1, luck: 30, asw: 49 }
  },
  623: {
    shipId: 623, sortId: 423, name: '夕張改二特', yomi: 'ゆうばり', shipClass: 3, shipType: 34, rarity: 7,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 41, firepower: 14, armor: 36, torpedo: 0, evasion: 107, aa: 48, aircraft: 5, speed: 5, los: 10, range: 1, luck: 30, asw: 27 }
  },
  624: {
    shipId: 624, sortId: 424, name: '夕張改二丁', yomi: 'ゆうばり', shipClass: 3, shipType: 34, rarity: 7,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 41, firepower: 14, armor: 34, torpedo: 50, evasion: 122, aa: 48, aircraft: 5, speed: 10, los: 12, range: 1, luck: 30, asw: 50 }
  },
  625: {
    shipId: 625, sortId: 425, name: '秋霜', yomi: 'あきしも', shipClass: 2, shipType: 38, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 75, aa: 8, aircraft: 2, speed: 10, los: 10, range: 1, luck: 11, asw: 27 }
  },
  626: {
    shipId: 626, sortId: 426, name: '神州丸改', yomi: 'しんしゅうまる', shipClass: 17, shipType: 97, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 39, firepower: 6, armor: 12, torpedo: 0, evasion: 63, aa: 12, aircraft: 4, speed: 5, los: 24, range: 1, luck: 18, asw: 30 }
  },
  627: {
    shipId: 627, sortId: 427, name: '敷波改二', yomi: 'しきなみ', shipClass: 2, shipType: 1, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 31, firepower: 13, armor: 14, torpedo: 28, evasion: 121, aa: 16, aircraft: 3, speed: 10, los: 11, range: 1, luck: 30, asw: 30 }
  },
  628: {
    shipId: 628, sortId: 428, name: 'Fletcher改 Mod.2', yomi: 'フレッチャー', shipClass: 2, shipType: 91, rarity: 8,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 37, firepower: 16, armor: 17, torpedo: 29, evasion: 128, aa: 45, aircraft: 3, speed: 10, los: 22, range: 1, luck: 47, asw: 52 }
  },
  629: {
    shipId: 629, sortId: 429, name: 'Fletcher Mk.II', yomi: 'フレッチャー', shipClass: 2, shipType: 91, rarity: 8,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 38, firepower: 16, armor: 17, torpedo: 0, evasion: 133, aa: 50, aircraft: 3, speed: 10, los: 23, range: 1, luck: 47, asw: 55 }
  },
  630: {
    shipId: 630, sortId: 430, name: 'Gotland andra', yomi: 'ゴトランド', shipClass: 3, shipType: 89, rarity: 8,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 47, firepower: 16, armor: 22, torpedo: 16, evasion: 80, aa: 30, aircraft: 4, speed: 10, los: 46, range: 2, luck: 26, asw: 36 }
  },
  631: {
    shipId: 631, sortId: 431, name: '薄雲', yomi: 'うすぐも', shipClass: 2, shipType: 12, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 15, firepower: 10, armor: 5, torpedo: 27, evasion: 75, aa: 10, aircraft: 2, speed: 10, los: 4, range: 1, luck: 7, asw: 19 }
  },
  632: {
    shipId: 632, sortId: 432, name: '有明', yomi: 'ありあけ', shipClass: 2, shipType: 10, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 27, evasion: 75, aa: 8, aircraft: 2, speed: 10, los: 5, range: 1, luck: 10, asw: 21 }
  },
  633: {
    shipId: 633, sortId: 433, name: '夕暮', yomi: 'ゆうぐれ', shipClass: 2, shipType: 10, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 27, evasion: 75, aa: 8, aircraft: 2, speed: 10, los: 5, range: 1, luck: 10, asw: 21 }
  },
  634: {
    shipId: 634, sortId: 434, name: '迅鯨', yomi: 'じんげい', shipClass: 20, shipType: 100, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 32, firepower: 6, armor: 5, torpedo: 0, evasion: 30, aa: 12, aircraft: 2, speed: 5, los: 20, range: 2, luck: 11, asw: 0 }
  },
  635: {
    shipId: 635, sortId: 435, name: '長鯨', yomi: 'ちょうげい', shipClass: 20, shipType: 100, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 31, firepower: 6, armor: 5, torpedo: 0, evasion: 30, aa: 11, aircraft: 2, speed: 5, los: 20, range: 2, luck: 17, asw: 0 }
  },
  636: {
    shipId: 636, sortId: 436, name: '伊47', yomi: 'い47', shipClass: 13, shipType: 103, rarity: 5,
    maxLevel: 100, slotCount: 1, initialStats: { hp: 14, firepower: 2, armor: 4, torpedo: 36, evasion: 30, aa: 10, aircraft: 1, speed: 5, los: 7, range: 1, luck: 47, asw: 0 }
  },
  637: {
    shipId: 637, sortId: 437, name: '第四号海防艦', yomi: 'だいよんごう', shipClass: 1, shipType: 104, rarity: 4,
    maxLevel: 100, slotCount: 1, initialStats: { hp: 8, firepower: 3, armor: 4, torpedo: 0, evasion: 99, aa: 5, aircraft: 1, speed: 5, los: 2, range: 1, luck: 18, asw: 30 }
  },
  638: {
    shipId: 638, sortId: 438, name: '第三〇号海防艦', yomi: 'だいさんじゅうごう', shipClass: 1, shipType: 104, rarity: 4,
    maxLevel: 100, slotCount: 1, initialStats: { hp: 9, firepower: 3, armor: 4, torpedo: 0, evasion: 95, aa: 4, aircraft: 1, speed: 5, los: 2, range: 1, luck: 17, asw: 30 }
  },
  639: {
    shipId: 639, sortId: 439, name: '迅鯨改', yomi: 'じんげい', shipClass: 20, shipType: 100, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 38, firepower: 8, armor: 17, torpedo: 0, evasion: 30, aa: 14, aircraft: 3, speed: 5, los: 22, range: 2, luck: 16, asw: 0 }
  },
  640: {
    shipId: 640, sortId: 440, name: '長鯨改', yomi: 'ちょうげい', shipClass: 20, shipType: 100, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 37, firepower: 8, armor: 17, torpedo: 0, evasion: 30, aa: 13, aircraft: 3, speed: 5, los: 22, range: 2, luck: 20, asw: 0 }
  },
  641: {
    shipId: 641, sortId: 441, name: '松', yomi: 'まつ', shipClass: 2, shipType: 101, rarity: 5,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 14, firepower: 5, armor: 5, torpedo: 16, evasion: 114, aa: 20, aircraft: 2, speed: 10, los: 10, range: 1, luck: 14, asw: 30 }
  },
  642: {
    shipId: 642, sortId: 442, name: '竹', yomi: 'たけ', shipClass: 2, shipType: 101, rarity: 6,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 14, firepower: 5, armor: 5, torpedo: 19, evasion: 113, aa: 19, aircraft: 2, speed: 10, los: 9, range: 1, luck: 28, asw: 29 }
  },
  643: {
    shipId: 643, sortId: 443, name: '梅', yomi: 'うめ', shipClass: 2, shipType: 101, rarity: 5,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 14, firepower: 5, armor: 5, torpedo: 16, evasion: 119, aa: 16, aircraft: 2, speed: 10, los: 11, range: 1, luck: 11, asw: 26 }
  },
  644: {
    shipId: 644, sortId: 444, name: '桃', yomi: 'もも', shipClass: 2, shipType: 101, rarity: 5,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 14, firepower: 5, armor: 5, torpedo: 16, evasion: 118, aa: 18, aircraft: 2, speed: 10, los: 8, range: 1, luck: 8, asw: 27 }
  },
  645: {
    shipId: 645, sortId: 445, name: '宗谷', yomi: 'そうや', shipClass: 22, shipType: 111, rarity: 6,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 23, firepower: 10, armor: 13, torpedo: 0, evasion: 3, aa: 10, aircraft: 2, speed: 5, los: 8, range: 1, luck: 65, asw: 0 }
  },
  646: {
    shipId: 646, sortId: 446, name: '加賀改二護', yomi: 'かが', shipClass: 11, shipType: 3, rarity: 8,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 84, firepower: 36, armor: 41, torpedo: 0, evasion: 94, aa: 40, aircraft: 5, speed: 10, los: 54, range: 2, luck: 18, asw: 72 }
  },
  647: {
    shipId: 647, sortId: 447, name: '浦波改二', yomi: 'うらなみ', shipClass: 2, shipType: 12, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 31, firepower: 14, armor: 14, torpedo: 28, evasion: 101, aa: 28, aircraft: 3, speed: 10, los: 12, range: 1, luck: 29, asw: 25 }
  },
  648: {
    shipId: 648, sortId: 448, name: '秋雲改二', yomi: 'あきぐも', shipClass: 2, shipType: 30, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 33, firepower: 18, armor: 15, torpedo: 30, evasion: 115, aa: 18, aircraft: 3, speed: 10, los: 10, range: 1, luck: 18, asw: 28 }
  },
  649: {
    shipId: 649, sortId: 449, name: '高波改二', yomi: 'たかなみ', shipClass: 2, shipType: 38, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 33, firepower: 16, armor: 15, torpedo: 30, evasion: 108, aa: 20, aircraft: 3, speed: 10, los: 14, range: 1, luck: 12, asw: 30 }
  },
  650: {
    shipId: 650, sortId: 450, name: '宗谷', yomi: 'そうや', shipClass: 22, shipType: 111, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 26, firepower: 10, armor: 15, torpedo: 0, evasion: 7, aa: 10, aircraft: 3, speed: 5, los: 16, range: 1, luck: 77, asw: 0 }
  },
  651: {
    shipId: 651, sortId: 451, name: '丹陽', yomi: 'ゆきかぜ', shipClass: 2, shipType: 30, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 35, firepower: 18, armor: 16, torpedo: 0, evasion: 89, aa: 40, aircraft: 3, speed: 10, los: 15, range: 1, luck: 60, asw: 26 }
  },
  652: {
    shipId: 652, sortId: 452, name: '球磨改二', yomi: 'くま', shipClass: 3, shipType: 4, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 46, firepower: 22, armor: 29, torpedo: 32, evasion: 114, aa: 32, aircraft: 3, speed: 10, los: 13, range: 1, luck: 16, asw: 40 }
  },
  653: {
    shipId: 653, sortId: 453, name: 'Scirocco', yomi: 'シロッコ', shipClass: 2, shipType: 61, rarity: 6,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 15, firepower: 9, armor: 7, torpedo: 22, evasion: 86, aa: 11, aircraft: 2, speed: 10, los: 7, range: 1, luck: 9, asw: 29 }
  },
  654: {
    shipId: 654, sortId: 454, name: 'Washington', yomi: 'ワシントン', shipClass: 8, shipType: 107, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 81, firepower: 80, armor: 74, torpedo: 0, evasion: 30, aa: 38, aircraft: 4, speed: 10, los: 14, range: 3, luck: 24, asw: 0 }
  },
  655: {
    shipId: 655, sortId: 455, name: 'Northampton', yomi: 'ノーザンプトン', shipClass: 5, shipType: 95, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 44, firepower: 36, armor: 33, torpedo: 16, evasion: 30, aa: 20, aircraft: 3, speed: 10, los: 14, range: 2, luck: 10, asw: 0 }
  },
  656: {
    shipId: 656, sortId: 456, name: '雪風改二', yomi: 'ゆきかぜ', shipClass: 2, shipType: 30, rarity: 8,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 35, firepower: 17, armor: 16, torpedo: 32, evasion: 113, aa: 32, aircraft: 3, speed: 10, los: 14, range: 1, luck: 63, asw: 28 }
  },
  657: {
    shipId: 657, sortId: 457, name: '球磨改二丁', yomi: 'くま', shipClass: 3, shipType: 4, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 46, firepower: 17, armor: 29, torpedo: 0, evasion: 115, aa: 35, aircraft: 3, speed: 10, los: 13, range: 1, luck: 16, asw: 48 }
  },
  658: {
    shipId: 658, sortId: 1707, name: 'Scirocco改', yomi: 'シロッコ', shipClass: 2, shipType: 61, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 28, firepower: 13, armor: 15, torpedo: 27, evasion: 115, aa: 22, aircraft: 3, speed: 10, los: 9, range: 1, luck: 13, asw: 39 }
  },
  659: {
    shipId: 659, sortId: 459, name: 'Washington改', yomi: 'ワシントン', shipClass: 8, shipType: 107, rarity: 8,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 93, firepower: 84, armor: 84, torpedo: 0, evasion: 30, aa: 55, aircraft: 4, speed: 10, los: 18, range: 3, luck: 38, asw: 0 }
  },
  660: {
    shipId: 660, sortId: 460, name: 'Northampton改', yomi: 'ノーザンプトン', shipClass: 5, shipType: 95, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 55, firepower: 45, armor: 40, torpedo: 20, evasion: 30, aa: 30, aircraft: 4, speed: 10, los: 15, range: 2, luck: 12, asw: 0 }
  },
  662: {
    shipId: 662, sortId: 462, name: '能代改二', yomi: 'のしろ', shipClass: 3, shipType: 41, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 53, firepower: 30, armor: 33, torpedo: 28, evasion: 129, aa: 26, aircraft: 4, speed: 10, los: 15, range: 2, luck: 13, asw: 32 }
  },
  663: {
    shipId: 663, sortId: 463, name: '矢矧改二', yomi: 'やはぎ', shipClass: 3, shipType: 41, rarity: 8,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 54, firepower: 30, armor: 33, torpedo: 28, evasion: 128, aa: 25, aircraft: 4, speed: 10, los: 15, range: 2, luck: 17, asw: 31 }
  },
  665: {
    shipId: 665, sortId: 465, name: '曙改二', yomi: 'あけぼの', shipClass: 2, shipType: 1, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 31, firepower: 10, armor: 14, torpedo: 25, evasion: 112, aa: 22, aircraft: 3, speed: 10, los: 10, range: 1, luck: 18, asw: 30 }
  },
  666: {
    shipId: 666, sortId: 466, name: '磯波改二', yomi: 'いそなみ', shipClass: 2, shipType: 12, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 30, firepower: 13, armor: 14, torpedo: 28, evasion: 115, aa: 29, aircraft: 3, speed: 10, los: 9, range: 1, luck: 15, asw: 28 }
  },
  667: {
    shipId: 667, sortId: 467, name: '山風改二丁', yomi: 'やまかぜ', shipClass: 2, shipType: 23, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 30, firepower: 14, armor: 11, torpedo: 24, evasion: 128, aa: 16, aircraft: 3, speed: 10, los: 8, range: 1, luck: 10, asw: 28 }
  },
  668: {
    shipId: 668, sortId: 468, name: '矢矧改二乙', yomi: 'やはぎ', shipClass: 3, shipType: 41, rarity: 8,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 53, firepower: 30, armor: 32, torpedo: 24, evasion: 123, aa: 36, aircraft: 4, speed: 10, los: 15, range: 2, luck: 17, asw: 30 }
  },
  670: {
    shipId: 670, sortId: 470, name: '親潮改二', yomi: 'おやしお', shipClass: 2, shipType: 30, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 33, firepower: 18, armor: 14, torpedo: 30, evasion: 102, aa: 19, aircraft: 3, speed: 10, los: 9, range: 1, luck: 21, asw: 30 }
  },
  671: {
    shipId: 671, sortId: 471, name: '巻波', yomi: 'まきなみ', shipClass: 2, shipType: 38, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 80, aa: 11, aircraft: 2, speed: 10, los: 9, range: 1, luck: 8, asw: 24 }
  },
  674: {
    shipId: 674, sortId: 474, name: '玉波', yomi: 'たまなみ', shipClass: 2, shipType: 38, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 79, aa: 12, aircraft: 2, speed: 10, los: 9, range: 1, luck: 8, asw: 22 }
  },
  675: {
    shipId: 675, sortId: 475, name: '涼波', yomi: 'すずなみ', shipClass: 2, shipType: 38, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 81, aa: 12, aircraft: 2, speed: 10, los: 9, range: 1, luck: 6, asw: 24 }
  },
  678: {
    shipId: 678, sortId: 1478, name: '日振改', yomi: 'ひぶり', shipClass: 1, shipType: 85, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 18, firepower: 5, armor: 7, torpedo: 0, evasion: 120, aa: 18, aircraft: 3, speed: 5, los: 6, range: 1, luck: 9, asw: 40 }
  },
  679: {
    shipId: 679, sortId: 1479, name: '大東改', yomi: 'だいとう', shipClass: 1, shipType: 85, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 18, firepower: 5, armor: 7, torpedo: 0, evasion: 124, aa: 18, aircraft: 3, speed: 5, los: 5, range: 1, luck: 37, asw: 40 }
  },
  680: {
    shipId: 680, sortId: 1480, name: '浜波改', yomi: 'はまなみ', shipClass: 2, shipType: 38, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 32, firepower: 12, armor: 14, torpedo: 27, evasion: 97, aa: 18, aircraft: 3, speed: 10, los: 12, range: 1, luck: 12, asw: 28 }
  },
  681: {
    shipId: 681, sortId: 1481, name: 'Samuel B.Roberts改', yomi: 'サミュエル・B・ロバーツ', shipClass: 2, shipType: 87, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 27, firepower: 10, armor: 12, torpedo: 24, evasion: 121, aa: 28, aircraft: 3, speed: 5, los: 14, range: 1, luck: 40, asw: 50 }
  },
  684: {
    shipId: 684, sortId: 1484, name: '平戸改', yomi: 'ひらと', shipClass: 1, shipType: 77, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 17, firepower: 5, armor: 7, torpedo: 0, evasion: 120, aa: 12, aircraft: 3, speed: 5, los: 5, range: 1, luck: 14, asw: 35 }
  },
  685: {
    shipId: 685, sortId: 1485, name: '福江改', yomi: 'ふかえ', shipClass: 1, shipType: 77, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 17, firepower: 5, armor: 7, torpedo: 0, evasion: 117, aa: 12, aircraft: 3, speed: 5, los: 5, range: 1, luck: 40, asw: 37 }
  },
  686: {
    shipId: 686, sortId: 1486, name: '岸波改', yomi: 'きしなみ', shipClass: 2, shipType: 38, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 32, firepower: 12, armor: 14, torpedo: 28, evasion: 108, aa: 18, aircraft: 3, speed: 10, los: 10, range: 1, luck: 13, asw: 30 }
  },
  687: {
    shipId: 687, sortId: 1487, name: '峯雲改', yomi: 'みねぐも', shipClass: 2, shipType: 18, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 31, firepower: 12, armor: 14, torpedo: 28, evasion: 87, aa: 16, aircraft: 3, speed: 10, los: 8, range: 1, luck: 9, asw: 24 }
  },
  688: {
    shipId: 688, sortId: 1488, name: '早波改', yomi: 'はやなみ', shipClass: 2, shipType: 38, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 32, firepower: 12, armor: 14, torpedo: 27, evasion: 106, aa: 18, aircraft: 3, speed: 10, los: 12, range: 1, luck: 10, asw: 26 }
  },
  689: {
    shipId: 689, sortId: 1489, name: 'Johnston改', yomi: 'ジョンストン', shipClass: 2, shipType: 91, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 34, firepower: 15, armor: 16, torpedo: 26, evasion: 123, aa: 40, aircraft: 3, speed: 10, los: 20, range: 1, luck: 40, asw: 52 }
  },
  690: {
    shipId: 690, sortId: 1490, name: '日進改', yomi: 'にっしん', shipClass: 16, shipType: 90, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 47, firepower: 18, armor: 24, torpedo: 0, evasion: 30, aa: 22, aircraft: 3, speed: 10, los: 48, range: 2, luck: 10, asw: 0 }
  },
  691: {
    shipId: 691, sortId: 1491, name: 'G.Garibaldi改', yomi: 'ガリバルディ', shipClass: 3, shipType: 92, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 52, firepower: 34, armor: 42, torpedo: 22, evasion: 90, aa: 24, aircraft: 4, speed: 10, los: 13, range: 2, luck: 30, asw: 25 }
  },
  692: {
    shipId: 692, sortId: 1492, name: 'Fletcher改', yomi: 'フレッチャー', shipClass: 2, shipType: 91, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 35, firepower: 15, armor: 16, torpedo: 26, evasion: 124, aa: 40, aircraft: 3, speed: 10, los: 20, range: 1, luck: 40, asw: 52 }
  },
  693: {
    shipId: 693, sortId: 1483, name: 'L.d.S.D.d.Abruzzi改', yomi: 'アブルッツィ', shipClass: 3, shipType: 92, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 52, firepower: 33, armor: 42, torpedo: 22, evasion: 88, aa: 24, aircraft: 4, speed: 10, los: 13, range: 2, luck: 30, asw: 25 }
  },
  694: {
    shipId: 694, sortId: 394, name: '霧島改二丙', yomi: 'きりしま', shipClass: 8, shipType: 6, rarity: 8,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 85, firepower: 79, armor: 71, torpedo: 17, evasion: 30, aa: 32, aircraft: 4, speed: 10, los: 16, range: 3, luck: 16, asw: 0 }
  },
  695: {
    shipId: 695, sortId: 1495, name: '秋霜改', yomi: 'あきしも', shipClass: 2, shipType: 38, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 32, firepower: 11, armor: 14, torpedo: 28, evasion: 102, aa: 15, aircraft: 3, speed: 10, los: 9, range: 1, luck: 12, asw: 28 }
  },
  696: {
    shipId: 696, sortId: 1496, name: 'Atlanta改', yomi: 'アトランタ', shipClass: 3, shipType: 99, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 41, firepower: 18, armor: 27, torpedo: 22, evasion: 49, aa: 82, aircraft: 3, speed: 10, los: 11, range: 1, luck: 18, asw: 12 }
  },
  697: {
    shipId: 697, sortId: 407, name: 'South Dakota改', yomi: 'サウスダコタ', shipClass: 8, shipType: 102, rarity: 8,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 91, firepower: 86, armor: 86, torpedo: 0, evasion: 30, aa: 58, aircraft: 4, speed: 10, los: 18, range: 3, luck: 36, asw: 0 }
  },
  698: {
    shipId: 698, sortId: 405, name: '加賀改二', yomi: 'かが', shipClass: 11, shipType: 3, rarity: 8,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 84, firepower: 10, armor: 41, torpedo: 0, evasion: 30, aa: 36, aircraft: 5, speed: 10, los: 51, range: 2, luck: 18, asw: 0 }
  },
  699: {
    shipId: 699, sortId: 408, name: '宗谷', yomi: 'そうや', shipClass: 22, shipType: 111, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 22, firepower: 1, armor: 13, torpedo: 0, evasion: 52, aa: 8, aircraft: 3, speed: 5, los: 2, range: 1, luck: 55, asw: 8 }
  },
  700: {
    shipId: 700, sortId: 1700, name: '薄雲改', yomi: 'うすぐも', shipClass: 2, shipType: 12, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 30, firepower: 12, armor: 13, torpedo: 27, evasion: 93, aa: 14, aircraft: 3, speed: 10, los: 7, range: 1, luck: 9, asw: 22 }
  },
  701: {
    shipId: 701, sortId: 1701, name: '第四号海防艦改', yomi: 'だいよんごう', shipClass: 1, shipType: 104, rarity: 5,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 15, firepower: 4, armor: 5, torpedo: 0, evasion: 115, aa: 11, aircraft: 2, speed: 5, los: 4, range: 1, luck: 20, asw: 31 }
  },
  702: {
    shipId: 702, sortId: 1702, name: '松改', yomi: 'まつ', shipClass: 2, shipType: 101, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 27, firepower: 7, armor: 12, torpedo: 16, evasion: 119, aa: 30, aircraft: 3, speed: 10, los: 15, range: 1, luck: 18, asw: 34 }
  },
  703: {
    shipId: 703, sortId: 1703, name: '有明改', yomi: 'ありあけ', shipClass: 2, shipType: 10, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 30, firepower: 7, armor: 12, torpedo: 20, evasion: 96, aa: 12, aircraft: 3, speed: 10, los: 5, range: 1, luck: 12, asw: 16 }
  },
  704: {
    shipId: 704, sortId: 1704, name: 'Hornet改', yomi: 'ホーネット', shipClass: 11, shipType: 105, rarity: 8,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 81, firepower: 10, armor: 45, torpedo: 0, evasion: 30, aa: 42, aircraft: 4, speed: 10, los: 49, range: 2, luck: 30, asw: 0 }
  },
  705: {
    shipId: 705, sortId: 1705, name: 'Sheffield改', yomi: 'シェフィールド', shipClass: 3, shipType: 108, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 52, firepower: 32, armor: 25, torpedo: 24, evasion: 109, aa: 34, aircraft: 4, speed: 10, los: 24, range: 2, luck: 20, asw: 40 }
  },
  706: {
    shipId: 706, sortId: 1706, name: '竹改', yomi: 'たけ', shipClass: 2, shipType: 101, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 26, firepower: 7, armor: 12, torpedo: 30, evasion: 118, aa: 28, aircraft: 3, speed: 10, los: 14, range: 1, luck: 38, asw: 34 }
  },
  707: {
    shipId: 707, sortId: 458, name: 'Gambier Bay Mk.II', yomi: 'ガンビア・ベイ', shipClass: 7, shipType: 83, rarity: 8,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 53, firepower: 3, armor: 17, torpedo: 0, evasion: 109, aa: 25, aircraft: 4, speed: 5, los: 39, range: 1, luck: 16, asw: 40 }
  },
  708: {
    shipId: 708, sortId: 1708, name: '桃改', yomi: 'もも', shipClass: 2, shipType: 101, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 26, firepower: 7, armor: 12, torpedo: 16, evasion: 122, aa: 28, aircraft: 3, speed: 10, los: 13, range: 1, luck: 11, asw: 33 }
  },
  709: {
    shipId: 709, sortId: 1709, name: '巻波改', yomi: 'まきなみ', shipClass: 2, shipType: 38, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 32, firepower: 12, armor: 14, torpedo: 28, evasion: 99, aa: 16, aircraft: 3, speed: 10, los: 11, range: 1, luck: 9, asw: 27 }
  },
  710: {
    shipId: 710, sortId: 1710, name: '涼波改', yomi: 'すずなみ', shipClass: 2, shipType: 38, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 32, firepower: 12, armor: 14, torpedo: 27, evasion: 106, aa: 14, aircraft: 3, speed: 10, los: 10, range: 1, luck: 7, asw: 26 }
  },
  711: {
    shipId: 711, sortId: 1711, name: 'Honolulu改', yomi: 'ホノルル', shipClass: 3, shipType: 110, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 53, firepower: 34, armor: 26, torpedo: 0, evasion: 80, aa: 36, aircraft: 4, speed: 10, los: 21, range: 2, luck: 27, asw: 0 }
  },
  712: {
    shipId: 712, sortId: 1712, name: '第三〇号海防艦改', yomi: 'だいさんじゅうごう', shipClass: 1, shipType: 104, rarity: 5,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 15, firepower: 4, armor: 5, torpedo: 0, evasion: 112, aa: 10, aircraft: 2, speed: 5, los: 4, range: 1, luck: 20, asw: 30 }
  },
  713: {
    shipId: 713, sortId: 1713, name: 'Victorious改', yomi: 'ヴィクトリアス', shipClass: 18, shipType: 112, rarity: 8,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 74, firepower: 10, armor: 49, torpedo: 0, evasion: 30, aa: 40, aircraft: 4, speed: 10, los: 46, range: 2, luck: 22, asw: 0 }
  },
  714: {
    shipId: 714, sortId: 1714, name: '昭南改', yomi: 'しょうなん', shipClass: 1, shipType: 85, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 18, firepower: 5, armor: 7, torpedo: 0, evasion: 118, aa: 18, aircraft: 3, speed: 5, los: 6, range: 1, luck: 12, asw: 38 }
  },
  715: {
    shipId: 715, sortId: 1715, name: 'Scamp改', yomi: 'スキャンプ', shipClass: 13, shipType: 114, rarity: 7,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 17, firepower: 2, armor: 6, torpedo: 40, evasion: 30, aa: 10, aircraft: 2, speed: 5, los: 13, range: 1, luck: 17, asw: 0 }
  },
  716: {
    shipId: 716, sortId: 1716, name: '梅改', yomi: 'うめ', shipClass: 2, shipType: 101, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 27, firepower: 7, armor: 12, torpedo: 13, evasion: 120, aa: 26, aircraft: 3, speed: 10, los: 16, range: 1, luck: 16, asw: 33 }
  },
  717: {
    shipId: 717, sortId: 1717, name: '山汐丸改', yomi: 'やましおまる', shipClass: 22, shipType: 115, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 39, firepower: 4, armor: 8, torpedo: 0, evasion: 125, aa: 18, aircraft: 3, speed: 5, los: 23, range: 1, luck: 7, asw: 32 }
  },
  718: {
    shipId: 718, sortId: 1718, name: '玉波改', yomi: 'たまなみ', shipClass: 2, shipType: 38, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 32, firepower: 12, armor: 14, torpedo: 27, evasion: 101, aa: 18, aircraft: 3, speed: 10, los: 12, range: 1, luck: 10, asw: 25 }
  },
  719: {
    shipId: 719, sortId: 1719, name: '伊201改', yomi: 'い201', shipClass: 13, shipType: 109, rarity: 7,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 13, firepower: 1, armor: 4, torpedo: 22, evasion: 30, aa: 10, aircraft: 2, speed: 5, los: 13, range: 1, luck: 24, asw: 0 }
  },
  720: {
    shipId: 720, sortId: 1720, name: '早潮改', yomi: 'はやしお', shipClass: 2, shipType: 30, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 32, firepower: 13, armor: 14, torpedo: 28, evasion: 98, aa: 14, aircraft: 3, speed: 10, los: 9, range: 1, luck: 12, asw: 26 }
  },
  721: {
    shipId: 721, sortId: 1721, name: '夏雲改', yomi: 'なつぐも', shipClass: 2, shipType: 18, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 31, firepower: 12, armor: 14, torpedo: 28, evasion: 85, aa: 13, aircraft: 3, speed: 10, los: 6, range: 1, luck: 8, asw: 24 }
  },
  722: {
    shipId: 722, sortId: 1722, name: 'Brooklyn改', yomi: 'ブルックリン', shipClass: 3, shipType: 110, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 53, firepower: 33, armor: 26, torpedo: 0, evasion: 80, aa: 36, aircraft: 4, speed: 10, los: 22, range: 2, luck: 37, asw: 0 }
  },
  723: {
    shipId: 723, sortId: 1723, name: 'Ranger改', yomi: 'レンジャー', shipClass: 11, shipType: 118, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 64, firepower: 10, armor: 18, torpedo: 0, evasion: 30, aa: 30, aircraft: 4, speed: 10, los: 40, range: 1, luck: 32, asw: 0 }
  },
  724: {
    shipId: 724, sortId: 1724, name: 'Jean Bart改', yomi: 'ジャン・バール', shipClass: 8, shipType: 79, rarity: 8,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 88, firepower: 70, armor: 77, torpedo: 0, evasion: 30, aa: 24, aircraft: 4, speed: 10, los: 15, range: 3, luck: 22, asw: 0 }
  },
  725: {
    shipId: 725, sortId: 1725, name: '夕暮改', yomi: 'ゆうぐれ', shipClass: 2, shipType: 10, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 30, firepower: 7, armor: 12, torpedo: 20, evasion: 96, aa: 12, aircraft: 3, speed: 10, los: 6, range: 1, luck: 12, asw: 16 }
  },
  726: {
    shipId: 726, sortId: 1726, name: 'Heywood L.E.改', yomi: 'ヘイウッド', shipClass: 2, shipType: 91, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 34, firepower: 15, armor: 16, torpedo: 26, evasion: 123, aa: 40, aircraft: 3, speed: 10, los: 19, range: 1, luck: 38, asw: 52 }
  },
  727: {
    shipId: 727, sortId: 1727, name: '第百一号輸送艦改', yomi: 'だいひゃくいちごう', shipClass: 17, shipType: 120, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 19, firepower: 3, armor: 9, torpedo: 0, evasion: 30, aa: 10, aircraft: 3, speed: 5, los: 3, range: 1, luck: 10, asw: 0 }
  },
  728: {
    shipId: 728, sortId: 1728, name: '第二十二号海防艦改', yomi: 'だいにじゅうにごう', shipClass: 1, shipType: 104, rarity: 5,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 17, firepower: 4, armor: 5, torpedo: 0, evasion: 118, aa: 10, aircraft: 2, speed: 5, los: 4, range: 1, luck: 22, asw: 33 }
  },
  729: {
    shipId: 729, sortId: 1729, name: '白雲改', yomi: 'しらくも', shipClass: 2, shipType: 12, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 30, firepower: 11, armor: 13, torpedo: 27, evasion: 104, aa: 16, aircraft: 3, speed: 10, los: 5, range: 1, luck: 14, asw: 24 }
  },
  730: {
    shipId: 730, sortId: 1730, name: '稲木改', yomi: 'いなぎ', shipClass: 1, shipType: 117, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 17, firepower: 4, armor: 6, torpedo: 0, evasion: 118, aa: 18, aircraft: 3, speed: 5, los: 4, range: 1, luck: 13, asw: 46 }
  },
  731: {
    shipId: 731, sortId: 1731, name: 'C.Cappellini改', yomi: 'コマンダンテ・カッペリーニ', shipClass: 13, shipType: 124, rarity: 5,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 11, firepower: 10, armor: 5, torpedo: 0, evasion: 30, aa: 10, aircraft: 2, speed: 5, los: 7, range: 1, luck: 35, asw: 0 }
  },
  732: {
    shipId: 732, sortId: 1732, name: 'Drum改', yomi: 'ドラム', shipClass: 13, shipType: 114, rarity: 7,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 17, firepower: 2, armor: 6, torpedo: 38, evasion: 30, aa: 10, aircraft: 2, speed: 5, los: 12, range: 1, luck: 37, asw: 0 }
  },
  733: {
    shipId: 733, sortId: 1733, name: 'Valiant改', yomi: 'ヴァリアント', shipClass: 9, shipType: 67, rarity: 8,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 83, firepower: 87, armor: 78, torpedo: 0, evasion: 30, aa: 56, aircraft: 4, speed: 5, los: 18, range: 3, luck: 40, asw: 0 }
  },
  734: {
    shipId: 734, sortId: 1734, name: 'Phoenix改', yomi: 'フェニックス', shipClass: 3, shipType: 110, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 53, firepower: 33, armor: 26, torpedo: 0, evasion: 78, aa: 36, aircraft: 4, speed: 10, los: 22, range: 2, luck: 38, asw: 0 }
  },
  735: {
    shipId: 735, sortId: 1735, name: 'Lexington改', yomi: 'レキシントン', shipClass: 11, shipType: 69, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 89, firepower: 30, armor: 50, torpedo: 0, evasion: 30, aa: 50, aircraft: 4, speed: 10, los: 46, range: 1, luck: 17, asw: 0 }
  },
  736: {
    shipId: 736, sortId: 1736, name: '榧改', yomi: 'かや', shipClass: 2, shipType: 101, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 27, firepower: 7, armor: 12, torpedo: 16, evasion: 117, aa: 28, aircraft: 3, speed: 10, los: 16, range: 1, luck: 20, asw: 32 }
  },
  737: {
    shipId: 737, sortId: 1737, name: 'Richard P.Leary改', yomi: 'リチャード・P・リアリー', shipClass: 2, shipType: 91, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 34, firepower: 15, armor: 16, torpedo: 26, evasion: 18685, aa: 42, aircraft: 3, speed: 10, los: 10, range: 1, luck: 39, asw: 0 }
  },
  877: {
    shipId: 877, sortId: 477, name: 'Conte di Cavour', yomi: 'カブール', shipClass: 9, shipType: 113, rarity: 5,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 57, firepower: 53, armor: 50, torpedo: 8, evasion: 30, aa: 15, aircraft: 4, speed: 5, los: 6, range: 3, luck: 22, asw: 0 }
  },
  878: {
    shipId: 878, sortId: 478, name: 'Conte di Cavour改', yomi: 'カブール', shipClass: 8, shipType: 113, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 73, firepower: 62, armor: 53, torpedo: 0, evasion: 30, aa: 40, aircraft: 4, speed: 10, los: 11, range: 3, luck: 23, asw: 0 }
  },
  879: {
    shipId: 879, sortId: 479, name: 'Conte di Cavour nuovo', yomi: 'カブール', shipClass: 8, shipType: 113, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 78, firepower: 64, armor: 57, torpedo: 8, evasion: 30, aa: 48, aircraft: 4, speed: 10, los: 17, range: 3, luck: 24, asw: 0 }
  },
  881: {
    shipId: 881, sortId: 481, name: '伊201', yomi: 'い201', shipClass: 13, shipType: 109, rarity: 6,
    maxLevel: 100, slotCount: 1, initialStats: { hp: 12, firepower: 1, armor: 4, torpedo: 20, evasion: 30, aa: 10, aircraft: 1, speed: 5, los: 8, range: 1, luck: 24, asw: 0 }
  },
  882: {
    shipId: 882, sortId: 482, name: '伊203', yomi: 'い203', shipClass: 13, shipType: 109, rarity: 6,
    maxLevel: 100, slotCount: 1, initialStats: { hp: 12, firepower: 1, armor: 4, torpedo: 20, evasion: 30, aa: 10, aircraft: 1, speed: 5, los: 8, range: 1, luck: 23, asw: 0 }
  },
  883: {
    shipId: 883, sortId: 483, name: '龍鳳改二戊', yomi: 'たいげい・りゅうほう', shipClass: 7, shipType: 51, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 61, firepower: 10, armor: 36, torpedo: 0, evasion: 62, aa: 30, aircraft: 4, speed: 5, los: 30, range: 2, luck: 42, asw: 36 }
  },
  884: {
    shipId: 884, sortId: 484, name: '雲鷹', yomi: 'うんよう', shipClass: 7, shipType: 76, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 39, firepower: 10, armor: 14, torpedo: 0, evasion: 80, aa: 14, aircraft: 3, speed: 5, los: 27, range: 1, luck: 8, asw: 34 }
  },
  885: {
    shipId: 885, sortId: 485, name: 'Victorious', yomi: 'ヴィクトリアス', shipClass: 18, shipType: 112, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 59, firepower: 10, armor: 38, torpedo: 0, evasion: 30, aa: 32, aircraft: 4, speed: 10, los: 39, range: 1, luck: 10, asw: 0 }
  },
  886: {
    shipId: 886, sortId: 486, name: '早潮', yomi: 'はやしお', shipClass: 2, shipType: 30, rarity: 5,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 66, aa: 8, aircraft: 2, speed: 10, los: 9, range: 1, luck: 9, asw: 22 }
  },
  887: {
    shipId: 887, sortId: 487, name: '伊203改', yomi: 'い203', shipClass: 13, shipType: 109, rarity: 7,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 13, firepower: 1, armor: 4, torpedo: 22, evasion: 30, aa: 10, aircraft: 2, speed: 5, los: 14, range: 1, luck: 24, asw: 0 }
  },
  888: {
    shipId: 888, sortId: 488, name: '龍鳳改二', yomi: 'たいげい・りゅうほう', shipClass: 7, shipType: 51, rarity: 8,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 63, firepower: 10, armor: 36, torpedo: 0, evasion: 58, aa: 32, aircraft: 4, speed: 10, los: 33, range: 2, luck: 42, asw: 32 }
  },
  889: {
    shipId: 889, sortId: 489, name: '雲鷹改二', yomi: 'うんよう', shipClass: 7, shipType: 76, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 49, firepower: 17, armor: 25, torpedo: 0, evasion: 102, aa: 25, aircraft: 4, speed: 5, los: 37, range: 2, luck: 15, asw: 74 }
  },
  891: {
    shipId: 891, sortId: 491, name: 'Salmon', yomi: 'サーモン', shipClass: 13, shipType: 122, rarity: 5,
    maxLevel: 100, slotCount: 1, initialStats: { hp: 12, firepower: 1, armor: 3, torpedo: 28, evasion: 30, aa: 10, aircraft: 1, speed: 5, los: 10, range: 1, luck: 16, asw: 0 }
  },
  892: {
    shipId: 892, sortId: 492, name: 'Drum', yomi: 'ドラム', shipClass: 13, shipType: 114, rarity: 6,
    maxLevel: 100, slotCount: 1, initialStats: { hp: 13, firepower: 1, armor: 4, torpedo: 35, evasion: 30, aa: 10, aircraft: 1, speed: 5, los: 11, range: 1, luck: 33, asw: 0 }
  },
  893: {
    shipId: 893, sortId: 1493, name: 'Janus改', yomi: 'ジェーナス', shipClass: 2, shipType: 82, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 31, firepower: 14, armor: 15, torpedo: 40, evasion: 127, aa: 30, aircraft: 3, speed: 10, los: 12, range: 1, luck: 22, asw: 53 }
  },
  894: {
    shipId: 894, sortId: 494, name: '鳳翔改二', yomi: 'ほうしょう', shipClass: 7, shipType: 27, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 57, firepower: 10, armor: 33, torpedo: 0, evasion: 100, aa: 24, aircraft: 4, speed: 5, los: 43, range: 1, luck: 50, asw: 33 }
  },
  895: {
    shipId: 895, sortId: 495, name: '昭南', yomi: 'しょうなん', shipClass: 1, shipType: 85, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 9, firepower: 4, armor: 4, torpedo: 0, evasion: 109, aa: 10, aircraft: 2, speed: 5, los: 3, range: 1, luck: 9, asw: 38 }
  },
  896: {
    shipId: 896, sortId: 497, name: 'Brooklyn', yomi: 'ブルックリン', shipClass: 3, shipType: 110, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 38, firepower: 29, armor: 16, torpedo: 0, evasion: 65, aa: 26, aircraft: 3, speed: 10, los: 18, range: 2, luck: 17, asw: 0 }
  },
  897: {
    shipId: 897, sortId: 496, name: 'Salmon改', yomi: 'サーモン', shipClass: 13, shipType: 122, rarity: 6,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 15, firepower: 2, armor: 5, torpedo: 34, evasion: 30, aa: 10, aircraft: 2, speed: 5, los: 12, range: 1, luck: 17, asw: 0 }
  },
  898: {
    shipId: 898, sortId: 498, name: '第二十二号海防艦', yomi: 'だいにじゅうにごう', shipClass: 1, shipType: 104, rarity: 4,
    maxLevel: 100, slotCount: 1, initialStats: { hp: 8, firepower: 3, armor: 4, torpedo: 0, evasion: 106, aa: 4, aircraft: 1, speed: 5, los: 2, range: 1, luck: 19, asw: 30 }
  },
  899: {
    shipId: 899, sortId: 499, name: '鳳翔改二戦', yomi: 'ほうしょう', shipClass: 7, shipType: 27, rarity: 8,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 57, firepower: 10, armor: 35, torpedo: 0, evasion: 103, aa: 24, aircraft: 4, speed: 5, los: 36, range: 1, luck: 50, asw: 34 }
  },
  900: {
    shipId: 900, sortId: 500, name: '山汐丸', yomi: 'やましおまる', shipClass: 22, shipType: 115, rarity: 5,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 36, firepower: 2, armor: 7, torpedo: 0, evasion: 97, aa: 16, aircraft: 2, speed: 5, los: 13, range: 1, luck: 3, asw: 23 }
  },
  901: {
    shipId: 901, sortId: 501, name: 'Javelin', yomi: 'ジャヴェリン', shipClass: 2, shipType: 82, rarity: 6,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 15, firepower: 12, armor: 7, torpedo: 30, evasion: 116, aa: 22, aircraft: 2, speed: 10, los: 10, range: 1, luck: 30, asw: 40 }
  },
  903: {
    shipId: 903, sortId: 503, name: '天霧改二', yomi: 'あまぎり', shipClass: 2, shipType: 1, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 31, firepower: 13, armor: 14, torpedo: 30, evasion: 118, aa: 15, aircraft: 3, speed: 10, los: 9, range: 1, luck: 33, asw: 27 }
  },
  904: {
    shipId: 904, sortId: 504, name: '能美', yomi: 'のうみ', shipClass: 1, shipType: 94, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 9, firepower: 4, armor: 4, torpedo: 0, evasion: 116, aa: 9, aircraft: 2, speed: 5, los: 3, range: 1, luck: 13, asw: 38 }
  },
  905: {
    shipId: 905, sortId: 505, name: '倉橋', yomi: 'くらはし', shipClass: 1, shipType: 94, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 9, firepower: 4, armor: 4, torpedo: 0, evasion: 114, aa: 9, aircraft: 2, speed: 5, los: 3, range: 1, luck: 18, asw: 40 }
  },
  906: {
    shipId: 906, sortId: 506, name: 'Javelin改', yomi: 'ジャヴェリン', shipClass: 2, shipType: 82, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 31, firepower: 14, armor: 15, torpedo: 40, evasion: 125, aa: 30, aircraft: 3, speed: 10, los: 12, range: 1, luck: 39, asw: 53 }
  },
  908: {
    shipId: 908, sortId: 508, name: '天霧改二丁', yomi: 'あまぎり', shipClass: 2, shipType: 1, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 31, firepower: 13, armor: 13, torpedo: 18, evasion: 125, aa: 14, aircraft: 3, speed: 10, los: 10, range: 1, luck: 33, asw: 25 }
  },
  909: {
    shipId: 909, sortId: 509, name: '能美改', yomi: 'のうみ', shipClass: 1, shipType: 94, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 17, firepower: 5, armor: 7, torpedo: 0, evasion: 128, aa: 16, aircraft: 3, speed: 5, los: 4, range: 1, luck: 16, asw: 39 }
  },
  910: {
    shipId: 910, sortId: 510, name: '倉橋改', yomi: 'くらはし', shipClass: 1, shipType: 94, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 17, firepower: 5, armor: 7, torpedo: 0, evasion: 125, aa: 16, aircraft: 3, speed: 5, los: 5, range: 1, luck: 23, asw: 40 }
  },
  911: {
    shipId: 911, sortId: 511, name: '大和改二', yomi: 'やまと', shipClass: 8, shipType: 37, rarity: 8,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 98, firepower: 100, armor: 92, torpedo: 0, evasion: 30, aa: 65, aircraft: 5, speed: 10, los: 18, range: 4, luck: 18, asw: 0 }
  },
  913: {
    shipId: 913, sortId: 513, name: 'Maryland', yomi: 'メリーランド', shipClass: 9, shipType: 93, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 77, firepower: 78, armor: 73, torpedo: 0, evasion: 30, aa: 28, aircraft: 4, speed: 5, los: 9, range: 3, luck: 30, asw: 0 }
  },
  915: {
    shipId: 915, sortId: 515, name: '早潮改二', yomi: 'はやしお', shipClass: 2, shipType: 30, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 33, firepower: 17, armor: 14, torpedo: 30, evasion: 95, aa: 19, aircraft: 3, speed: 10, los: 10, range: 1, luck: 15, asw: 30 }
  },
  916: {
    shipId: 916, sortId: 516, name: '大和改二重', yomi: 'やまと', shipClass: 10, shipType: 37, rarity: 8,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 98, firepower: 108, armor: 94, torpedo: 0, evasion: 75, aa: 65, aircraft: 5, speed: 5, los: 20, range: 4, luck: 18, asw: 16 }
  },
  918: {
    shipId: 918, sortId: 518, name: 'Maryland改', yomi: 'メリーランド', shipClass: 9, shipType: 93, rarity: 8,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 91, firepower: 80, armor: 83, torpedo: 0, evasion: 30, aa: 37, aircraft: 4, speed: 5, los: 16, range: 3, luck: 38, asw: 0 }
  },
  920: {
    shipId: 920, sortId: 520, name: 'Samuel B.Roberts Mk.II', yomi: 'サミュエル・B・ロバーツ', shipClass: 2, shipType: 87, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 29, firepower: 10, armor: 13, torpedo: 24, evasion: 123, aa: 29, aircraft: 3, speed: 10, los: 14, range: 1, luck: 40, asw: 51 }
  },
  921: {
    shipId: 921, sortId: 521, name: '鵜来', yomi: 'うくる', shipClass: 1, shipType: 117, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 9, firepower: 4, armor: 4, torpedo: 0, evasion: 120, aa: 9, aircraft: 2, speed: 5, los: 3, range: 1, luck: 35, asw: 42 }
  },
  922: {
    shipId: 922, sortId: 522, name: '稲木', yomi: 'いなぎ', shipClass: 1, shipType: 117, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 9, firepower: 4, armor: 4, torpedo: 0, evasion: 119, aa: 9, aircraft: 2, speed: 5, los: 3, range: 1, luck: 9, asw: 41 }
  },
  923: {
    shipId: 923, sortId: 523, name: 'Tuscaloosa', yomi: 'タスカルーサ', shipClass: 5, shipType: 121, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 43, firepower: 36, armor: 34, torpedo: 0, evasion: 30, aa: 18, aircraft: 3, speed: 10, los: 15, range: 2, luck: 17, asw: 0 }
  },
  924: {
    shipId: 924, sortId: 524, name: 'Nevada', yomi: 'ネヴァダ', shipClass: 9, shipType: 125, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 74, firepower: 72, armor: 71, torpedo: 0, evasion: 30, aa: 20, aircraft: 4, speed: 5, los: 8, range: 3, luck: 33, asw: 0 }
  },
  925: {
    shipId: 925, sortId: 525, name: 'Langley', yomi: 'ラングレー', shipClass: 7, shipType: 116, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 31, firepower: 14, armor: 14, torpedo: 0, evasion: 83, aa: 32, aircraft: 3, speed: 10, los: 40, range: 2, luck: 27, asw: 16 }
  },
  926: {
    shipId: 926, sortId: 526, name: '鵜来改', yomi: 'うくる', shipClass: 1, shipType: 117, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 17, firepower: 4, armor: 6, torpedo: 0, evasion: 122, aa: 17, aircraft: 3, speed: 5, los: 5, range: 1, luck: 38, asw: 48 }
  },
  927: {
    shipId: 927, sortId: 527, name: 'Valiant', yomi: 'ヴァリアント', shipClass: 9, shipType: 67, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 73, firepower: 74, armor: 72, torpedo: 0, evasion: 30, aa: 40, aircraft: 4, speed: 5, los: 15, range: 3, luck: 35, asw: 0 }
  },
  928: {
    shipId: 928, sortId: 528, name: 'Tuscaloosa改', yomi: 'タスカルーサ', shipClass: 5, shipType: 121, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 53, firepower: 45, armor: 41, torpedo: 0, evasion: 30, aa: 32, aircraft: 4, speed: 10, los: 16, range: 2, luck: 20, asw: 0 }
  },
  929: {
    shipId: 929, sortId: 529, name: 'Nevada改', yomi: 'ネヴァダ', shipClass: 9, shipType: 125, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 89, firepower: 77, armor: 78, torpedo: 0, evasion: 18685, aa: 33, aircraft: 4, speed: 5, los: 10, range: 3, luck: 40, asw: 0 }
  },
  930: {
    shipId: 930, sortId: 530, name: 'Langley改', yomi: 'ラングレー', shipClass: 7, shipType: 116, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 44, firepower: 18, armor: 22, torpedo: 0, evasion: 92, aa: 34, aircraft: 4, speed: 10, los: 50, range: 2, luck: 35, asw: 18 }
  },
  931: {
    shipId: 931, sortId: 531, name: 'Ranger', yomi: 'レンジャー', shipClass: 11, shipType: 118, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 48, firepower: 10, armor: 17, torpedo: 0, evasion: 30, aa: 28, aircraft: 4, speed: 10, los: 38, range: 1, luck: 20, asw: 0 }
  },
  933: {
    shipId: 933, sortId: 533, name: 'Massachusetts', yomi: 'マサチューセッツ', shipClass: 8, shipType: 102, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 79, firepower: 80, armor: 77, torpedo: 0, evasion: 30, aa: 40, aircraft: 4, speed: 10, los: 15, range: 3, luck: 18, asw: 0 }
  },
  934: {
    shipId: 934, sortId: 534, name: 'C.Cappellini', yomi: 'コマンダンテ・カッペリーニ', shipClass: 13, shipType: 124, rarity: 4,
    maxLevel: 100, slotCount: 1, initialStats: { hp: 10, firepower: 5, armor: 5, torpedo: 19, evasion: 30, aa: 10, aircraft: 1, speed: 5, los: 5, range: 1, luck: 33, asw: 0 }
  },
  935: {
    shipId: 935, sortId: 535, name: 'Jean Bart', yomi: 'ジャン・バール', shipClass: 8, shipType: 79, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 84, firepower: 61, armor: 70, torpedo: 0, evasion: 30, aa: 18, aircraft: 4, speed: 10, los: 12, range: 3, luck: 15, asw: 0 }
  },
  936: {
    shipId: 936, sortId: 536, name: 'Nevada改 Mod.2', yomi: 'ネヴァダ', shipClass: 9, shipType: 125, rarity: 8,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 90, firepower: 82, armor: 80, torpedo: 0, evasion: 30, aa: 50, aircraft: 4, speed: 5, los: 15, range: 3, luck: 45, asw: 0 }
  },
  938: {
    shipId: 938, sortId: 538, name: 'Massachusetts改', yomi: 'マサチューセッツ', shipClass: 8, shipType: 102, rarity: 8,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 91, firepower: 84, armor: 86, torpedo: 0, evasion: 30, aa: 60, aircraft: 4, speed: 10, los: 18, range: 3, luck: 45, asw: 0 }
  },
  939: {
    shipId: 939, sortId: 539, name: 'UIT-24', yomi: 'コマンダンテ・カッペリーニ', shipClass: 13, shipType: 124, rarity: 6,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 12, firepower: 3, armor: 5, torpedo: 0, evasion: 30, aa: 10, aircraft: 2, speed: 5, los: 9, range: 1, luck: 36, asw: 0 }
  },
  940: {
    shipId: 940, sortId: 540, name: '伊503', yomi: 'コマンダンテ・カッペリーニ', shipClass: 13, shipType: 124, rarity: 7,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 13, firepower: 4, armor: 5, torpedo: 32, evasion: 30, aa: 10, aircraft: 2, speed: 5, los: 10, range: 1, luck: 43, asw: 0 }
  },
  941: {
    shipId: 941, sortId: 541, name: 'Heywood L.E.', yomi: 'ヘイウッド', shipClass: 2, shipType: 91, rarity: 5,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 17, firepower: 12, armor: 7, torpedo: 20, evasion: 112, aa: 32, aircraft: 2, speed: 10, los: 20, range: 1, luck: 18, asw: 49 }
  },
  942: {
    shipId: 942, sortId: 542, name: 'Richard P.Leary', yomi: 'リチャード・P・リアリー', shipClass: 2, shipType: 91, rarity: 5,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 17, firepower: 12, armor: 7, torpedo: 20, evasion: 110, aa: 32, aircraft: 2, speed: 10, los: 20, range: 1, luck: 19, asw: 49 }
  },
  943: {
    shipId: 943, sortId: 543, name: '熊野丸', yomi: 'くまのまる', shipClass: 17, shipType: 119, rarity: 5,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 38, firepower: 4, armor: 11, torpedo: 0, evasion: 100, aa: 15, aircraft: 2, speed: 5, los: 13, range: 1, luck: 17, asw: 22 }
  },
  944: {
    shipId: 944, sortId: 544, name: '平安丸', yomi: 'へいあんまる', shipClass: 20, shipType: 126, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 36, firepower: 5, armor: 3, torpedo: 0, evasion: 30, aa: 10, aircraft: 2, speed: 5, los: 11, range: 2, luck: 6, asw: 0 }
  },
  945: {
    shipId: 945, sortId: 545, name: '第百一号輸送艦', yomi: 'だいひゃくいちごう', shipClass: 17, shipType: 120, rarity: 5,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 11, firepower: 2, armor: 5, torpedo: 0, evasion: 30, aa: 7, aircraft: 2, speed: 5, los: 2, range: 1, luck: 8, asw: 0 }
  },
  948: {
    shipId: 948, sortId: 548, name: '熊野丸改', yomi: 'くまのまる', shipClass: 17, shipType: 119, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 40, firepower: 12, armor: 14, torpedo: 0, evasion: 112, aa: 17, aircraft: 3, speed: 5, los: 15, range: 1, luck: 22, asw: 30 }
  },
  949: {
    shipId: 949, sortId: 549, name: '平安丸改', yomi: 'へいあんまる', shipClass: 20, shipType: 126, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 39, firepower: 11, armor: 17, torpedo: 0, evasion: 30, aa: 12, aircraft: 3, speed: 5, los: 18, range: 2, luck: 11, asw: 0 }
  },
  951: {
    shipId: 951, sortId: 551, name: '天津風改二', yomi: 'あまつかぜ', shipClass: 2, shipType: 30, rarity: 8,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 35, firepower: 16, armor: 15, torpedo: 30, evasion: 100, aa: 26, aircraft: 3, speed: 10, los: 10, range: 1, luck: 19, asw: 29 }
  },
  952: {
    shipId: 952, sortId: 552, name: 'Phoenix', yomi: 'フェニックス', shipClass: 3, shipType: 110, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 38, firepower: 29, armor: 16, torpedo: 0, evasion: 63, aa: 26, aircraft: 3, speed: 10, los: 18, range: 2, luck: 19, asw: 0 }
  },
  953: {
    shipId: 953, sortId: 553, name: '朝日', yomi: 'あさひ', shipClass: 21, shipType: 123, rarity: 5,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 36, firepower: 2, armor: 20, torpedo: 0, evasion: 30, aa: 6, aircraft: 2, speed: 5, los: 1, range: 1, luck: 17, asw: 0 }
  },
  954: {
    shipId: 954, sortId: 554, name: '榛名改二丙', yomi: 'はるな', shipClass: 8, shipType: 6, rarity: 8,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 85, firepower: 75, armor: 70, torpedo: 18, evasion: 18685, aa: 44, aircraft: 4, speed: 10, los: 10, range: 3, luck: 48, asw: 0 }
  },
  955: {
    shipId: 955, sortId: 555, name: '清霜改二', yomi: 'きよしも', shipClass: 2, shipType: 38, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 33, firepower: 18, armor: 15, torpedo: 29, evasion: 117, aa: 20, aircraft: 3, speed: 10, los: 9, range: 1, luck: 27, asw: 28 }
  },
  956: {
    shipId: 956, sortId: 556, name: '早霜改二', yomi: 'はやしも', shipClass: 2, shipType: 38, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 33, firepower: 18, armor: 15, torpedo: 29, evasion: 115, aa: 20, aircraft: 3, speed: 10, los: 11, range: 1, luck: 18, asw: 28 }
  },
  957: {
    shipId: 957, sortId: 557, name: 'General Belgrano', yomi: 'フェニックス', shipClass: 3, shipType: 110, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 55, firepower: 60, armor: 55, torpedo: 0, evasion: 84, aa: 85, aircraft: 4, speed: 10, los: 39, range: 2, luck: 39, asw: 0 }
  },
  958: {
    shipId: 958, sortId: 558, name: '朝日改', yomi: 'あさひ', shipClass: 19, shipType: 123, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 37, firepower: 1, armor: 23, torpedo: 0, evasion: 30, aa: 6, aircraft: 3, speed: 5, los: 10, range: 1, luck: 18, asw: 0 }
  },
  959: {
    shipId: 959, sortId: 559, name: '深雪改二', yomi: 'みゆき', shipClass: 2, shipType: 12, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 31, firepower: 14, armor: 14, torpedo: 30, evasion: 99, aa: 33, aircraft: 3, speed: 10, los: 13, range: 1, luck: 15, asw: 25 }
  },
  960: {
    shipId: 960, sortId: 560, name: '清霜改二丁', yomi: 'きよしも', shipClass: 2, shipType: 38, rarity: 8,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 33, firepower: 16, armor: 15, torpedo: 23, evasion: 114, aa: 20, aircraft: 3, speed: 10, los: 12, range: 1, luck: 27, asw: 27 }
  },
  961: {
    shipId: 961, sortId: 561, name: '時雨改三', yomi: 'しぐれ', shipClass: 2, shipType: 23, rarity: 8,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 34, firepower: 16, armor: 15, torpedo: 31, evasion: 130, aa: 31, aircraft: 3, speed: 10, los: 12, range: 1, luck: 55, asw: 39 }
  },
  962: {
    shipId: 962, sortId: 562, name: 'Mogador', yomi: 'モガドール', shipClass: 2, shipType: 129, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 21, firepower: 32, armor: 13, torpedo: 16, evasion: 69, aa: 28, aircraft: 3, speed: 10, los: 8, range: 2, luck: 6, asw: 32 }
  },
  964: {
    shipId: 964, sortId: 564, name: '白雲', yomi: 'しらくも', shipClass: 2, shipType: 12, rarity: 4,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 15, firepower: 10, armor: 5, torpedo: 27, evasion: 73, aa: 10, aircraft: 2, speed: 10, los: 3, range: 1, luck: 8, asw: 19 }
  },
  965: {
    shipId: 965, sortId: 565, name: 'Gloire', yomi: 'グロワール', shipClass: 3, shipType: 128, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 33, firepower: 23, armor: 16, torpedo: 12, evasion: 67, aa: 32, aircraft: 3, speed: 10, los: 20, range: 2, luck: 22, asw: 0 }
  },
  966: {
    shipId: 966, sortId: 566, name: 'Lexington', yomi: 'レキシントン', shipClass: 11, shipType: 69, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 84, firepower: 30, armor: 40, torpedo: 0, evasion: 30, aa: 36, aircraft: 4, speed: 10, los: 40, range: 2, luck: 15, asw: 0 }
  },
  967: {
    shipId: 967, sortId: 567, name: 'Mogador改', yomi: 'モガドール', shipClass: 2, shipType: 129, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 38, firepower: 40, armor: 29, torpedo: 17, evasion: 84, aa: 34, aircraft: 4, speed: 10, los: 11, range: 2, luck: 11, asw: 38 }
  },
  968: {
    shipId: 968, sortId: 568, name: '初月改二', yomi: 'はつづき', shipClass: 2, shipType: 54, rarity: 8,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 39, firepower: 28, armor: 19, torpedo: 26, evasion: 112, aa: 81, aircraft: 4, speed: 10, los: 12, range: 1, luck: 18, asw: 32 }
  },
  969: {
    shipId: 969, sortId: 569, name: 'Richelieu Deux', yomi: 'リシュリュー', shipClass: 8, shipType: 79, rarity: 8,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 91, firepower: 84, armor: 83, torpedo: 0, evasion: 30, aa: 40, aircraft: 4, speed: 10, los: 19, range: 3, luck: 28, asw: 0 }
  },
  970: {
    shipId: 970, sortId: 570, name: 'Gloire改', yomi: 'グロワール', shipClass: 3, shipType: 128, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 46, firepower: 30, armor: 24, torpedo: 12, evasion: 84, aa: 38, aircraft: 4, speed: 10, los: 24, range: 2, luck: 35, asw: 0 }
  },
  971: {
    shipId: 971, sortId: 571, name: '伊36', yomi: 'い36', shipClass: 14, shipType: 39, rarity: 5,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 14, firepower: 2, armor: 4, torpedo: 36, evasion: 30, aa: 10, aircraft: 2, speed: 5, los: 9, range: 1, luck: 46, asw: 0 }
  },
  972: {
    shipId: 972, sortId: 572, name: '伊41', yomi: 'い41', shipClass: 14, shipType: 127, rarity: 5,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 14, firepower: 2, armor: 4, torpedo: 36, evasion: 30, aa: 10, aircraft: 2, speed: 5, los: 10, range: 1, luck: 18, asw: 0 }
  },
  975: {
    shipId: 975, sortId: 575, name: '春雨改二', yomi: 'はるさめ', shipClass: 2, shipType: 23, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 31, firepower: 16, armor: 14, torpedo: 28, evasion: 120, aa: 20, aircraft: 3, speed: 10, los: 10, range: 1, luck: 18, asw: 29 }
  },
  976: {
    shipId: 976, sortId: 576, name: '伊36改', yomi: 'い36', shipClass: 14, shipType: 39, rarity: 6,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 18, firepower: 3, armor: 4, torpedo: 38, evasion: 30, aa: 10, aircraft: 2, speed: 5, los: 10, range: 1, luck: 48, asw: 0 }
  },
  977: {
    shipId: 977, sortId: 577, name: '伊41改', yomi: 'い41', shipClass: 14, shipType: 127, rarity: 6,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 18, firepower: 3, armor: 4, torpedo: 38, evasion: 30, aa: 10, aircraft: 2, speed: 5, los: 11, range: 1, luck: 22, asw: 0 }
  },
  979: {
    shipId: 979, sortId: 579, name: '稲木改二', yomi: 'いなぎ', shipClass: 1, shipType: 117, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 27, firepower: 9, armor: 9, torpedo: 0, evasion: 121, aa: 27, aircraft: 3, speed: 5, los: 5, range: 1, luck: 17, asw: 47 }
  },
  981: {
    shipId: 981, sortId: 581, name: '藤波改二', yomi: 'ふじなみ', shipClass: 2, shipType: 38, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 33, firepower: 18, armor: 15, torpedo: 30, evasion: 119, aa: 28, aircraft: 3, speed: 10, los: 12, range: 1, luck: 21, asw: 30 }
  },
  983: {
    shipId: 983, sortId: 583, name: '浜波改二', yomi: 'はまなみ', shipClass: 2, shipType: 38, rarity: 7,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 33, firepower: 18, armor: 15, torpedo: 30, evasion: 123, aa: 28, aircraft: 3, speed: 10, los: 10, range: 1, luck: 22, asw: 30 }
  },
  984: {
    shipId: 984, sortId: 584, name: 'Wahoo', yomi: 'ワフー', shipClass: 13, shipType: 114, rarity: 6,
    maxLevel: 100, slotCount: 1, initialStats: { hp: 13, firepower: 2, armor: 4, torpedo: 36, evasion: 30, aa: 10, aircraft: 1, speed: 5, los: 12, range: 1, luck: 13, asw: 0 }
  },
  986: {
    shipId: 986, sortId: 586, name: '白雪改二', yomi: 'しらゆき', shipClass: 2, shipType: 12, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 31, firepower: 15, armor: 14, torpedo: 30, evasion: 98, aa: 36, aircraft: 3, speed: 10, los: 13, range: 1, luck: 17, asw: 26 }
  },
  987: {
    shipId: 987, sortId: 587, name: '初雪改二', yomi: 'はつゆき', shipClass: 2, shipType: 12, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 31, firepower: 17, armor: 15, torpedo: 30, evasion: 96, aa: 37, aircraft: 3, speed: 10, los: 14, range: 1, luck: 18, asw: 27 }
  },
  989: {
    shipId: 989, sortId: 589, name: 'Wahoo改', yomi: 'ワフー', shipClass: 13, shipType: 114, rarity: 7,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 17, firepower: 4, armor: 6, torpedo: 38, evasion: 30, aa: 10, aircraft: 2, speed: 5, los: 14, range: 1, luck: 18, asw: 0 }
  },
  992: {
    shipId: 992, sortId: 592, name: '杉', yomi: 'すぎ', shipClass: 2, shipType: 101, rarity: 5,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 14, firepower: 5, armor: 5, torpedo: 16, evasion: 113, aa: 22, aircraft: 2, speed: 10, los: 8, range: 1, luck: 16, asw: 28 }
  },
  994: {
    shipId: 994, sortId: 594, name: '榧', yomi: 'かや', shipClass: 2, shipType: 101, rarity: 5,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 14, firepower: 5, armor: 5, torpedo: 16, evasion: 114, aa: 22, aircraft: 2, speed: 10, los: 8, range: 1, luck: 16, asw: 27 }
  },
  995: {
    shipId: 995, sortId: 595, name: '大泊', yomi: 'おおとまり', shipClass: 22, shipType: 130, rarity: 5,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 20, firepower: 2, armor: 11, torpedo: 0, evasion: 23, aa: 6, aircraft: 2, speed: 5, los: 7, range: 1, luck: 40, asw: 12 }
  },
  997: {
    shipId: 997, sortId: 597, name: '杉改', yomi: 'すぎ', shipClass: 2, shipType: 101, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 27, firepower: 7, armor: 12, torpedo: 16, evasion: 116, aa: 28, aircraft: 3, speed: 10, los: 15, range: 1, luck: 20, asw: 32 }
  },
  1000: {
    shipId: 1000, sortId: 600, name: '大泊改', yomi: 'おおとまり', shipClass: 22, shipType: 130, rarity: 6,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 22, firepower: 3, armor: 12, torpedo: 0, evasion: 53, aa: 9, aircraft: 2, speed: 5, los: 7, range: 1, luck: 50, asw: 14 }
  },
  1001: {
    shipId: 1001, sortId: 601, name: 'Киров', yomi: 'キーロフ', shipClass: 3, shipType: 131, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 31, firepower: 30, armor: 23, torpedo: 14, evasion: 35, aa: 34, aircraft: 3, speed: 10, los: 13, range: 2, luck: 26, asw: 15 }
  },
  1003: {
    shipId: 1003, sortId: 603, name: 'しまね丸', yomi: 'しまねまる', shipClass: 22, shipType: 132, rarity: 5,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 39, firepower: 6, armor: 9, torpedo: 0, evasion: 95, aa: 16, aircraft: 2, speed: 5, los: 13, range: 1, luck: 11, asw: 24 }
  },
  1005: {
    shipId: 1005, sortId: 605, name: 'Minneapolis', yomi: 'ミネアポリス', shipClass: 5, shipType: 121, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 44, firepower: 36, armor: 35, torpedo: 0, evasion: 30, aa: 18, aircraft: 3, speed: 10, los: 15, range: 2, luck: 15, asw: 0 }
  },
  1006: {
    shipId: 1006, sortId: 606, name: 'Киров改', yomi: 'キーロフ', shipClass: 3, shipType: 131, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 46, firepower: 40, armor: 43, torpedo: 22, evasion: 70, aa: 40, aircraft: 4, speed: 10, los: 14, range: 2, luck: 32, asw: 26 }
  },
  1008: {
    shipId: 1008, sortId: 608, name: 'しまね丸改', yomi: 'しまねまる', shipClass: 22, shipType: 132, rarity: 6,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 41, firepower: 14, armor: 9, torpedo: 0, evasion: 102, aa: 26, aircraft: 3, speed: 5, los: 22, range: 1, luck: 18, asw: 28 }
  },
  1010: {
    shipId: 1010, sortId: 610, name: 'Minneapolis改', yomi: 'ミネアポリス', shipClass: 5, shipType: 121, rarity: 6,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 54, firepower: 45, armor: 42, torpedo: 0, evasion: 30, aa: 32, aircraft: 4, speed: 10, los: 16, range: 2, luck: 18, asw: 0 }
  },
  1496: {
    shipId: 1496, sortId: 406, name: 'Colorado改', yomi: 'コロラド', shipClass: 9, shipType: 93, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 91, firepower: 80, armor: 83, torpedo: 0, evasion: 30, aa: 36, aircraft: 4, speed: 5, los: 16, range: 3, luck: 40, asw: 0 }
  },
  1501: {
    shipId: 1501, sortId: 0, name: '駆逐イ級', yomi: '-', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 20, firepower: 5, armor: 5, torpedo: 15, evasion: 25, aa: 6, aircraft: 2, speed: 10, los: 3, range: 1, luck: 1, asw: 25 }
  },
  1502: {
    shipId: 1502, sortId: 0, name: '駆逐ロ級', yomi: '-', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 22, firepower: 7, armor: 6, torpedo: 16, evasion: 25, aa: 7, aircraft: 2, speed: 10, los: 3, range: 1, luck: 1, asw: 25 }
  },
  1503: {
    shipId: 1503, sortId: 0, name: '駆逐ハ級', yomi: '-', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 24, firepower: 6, armor: 7, torpedo: 16, evasion: 30, aa: 6, aircraft: 2, speed: 10, los: 4, range: 1, luck: 1, asw: 30 }
  },
  1504: {
    shipId: 1504, sortId: 0, name: '駆逐ニ級', yomi: '-', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 28, firepower: 8, armor: 9, torpedo: 24, evasion: 35, aa: 8, aircraft: 2, speed: 10, los: 4, range: 1, luck: 5, asw: 35 }
  },
  1505: {
    shipId: 1505, sortId: 0, name: '軽巡ホ級', yomi: '-', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 33, firepower: 14, armor: 15, torpedo: 24, evasion: 30, aa: 10, aircraft: 2, speed: 10, los: 6, range: 2, luck: 1, asw: 30 }
  },
  1506: {
    shipId: 1506, sortId: 0, name: '軽巡ヘ級', yomi: '-', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 36, firepower: 16, armor: 18, torpedo: 28, evasion: 40, aa: 12, aircraft: 2, speed: 10, los: 6, range: 2, luck: 1, asw: 40 }
  },
  1507: {
    shipId: 1507, sortId: 0, name: '軽巡ト級', yomi: '-', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 39, firepower: 24, armor: 20, torpedo: 28, evasion: 50, aa: 12, aircraft: 3, speed: 10, los: 6, range: 2, luck: 5, asw: 50 }
  },
  1508: {
    shipId: 1508, sortId: 0, name: '雷巡チ級', yomi: '-', shipClass: 4, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 48, firepower: 18, armor: 22, torpedo: 48, evasion: 30, aa: 10, aircraft: 3, speed: 10, los: 4, range: 2, luck: 5, asw: 30 }
  },
  1509: {
    shipId: 1509, sortId: 0, name: '重巡リ級', yomi: '-', shipClass: 5, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 58, firepower: 32, armor: 28, torpedo: 32, evasion: 30, aa: 16, aircraft: 3, speed: 10, los: 10, range: 2, luck: 1, asw: 0 }
  },
  1510: {
    shipId: 1510, sortId: 0, name: '軽母ヌ級', yomi: '-', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 65, firepower: 10, armor: 25, torpedo: 0, evasion: 30, aa: 15, aircraft: 3, speed: 5, los: 30, range: 1, luck: 1, asw: 0 }
  },
  1511: {
    shipId: 1511, sortId: 0, name: '戦艦ル級', yomi: '-', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 90, firepower: 65, armor: 70, torpedo: 0, evasion: 30, aa: 70, aircraft: 3, speed: 5, los: 20, range: 3, luck: 5, asw: 0 }
  },
  1512: {
    shipId: 1512, sortId: 0, name: '空母ヲ級', yomi: '-', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 85, firepower: 10, armor: 40, torpedo: 0, evasion: 30, aa: 30, aircraft: 3, speed: 10, los: 40, range: 1, luck: 1, asw: 0 }
  },
  1513: {
    shipId: 1513, sortId: 0, name: '輸送ワ級', yomi: '-', shipClass: 15, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 0, initialStats: { hp: 70, firepower: 10, armor: 10, torpedo: 0, evasion: 30, aa: 10, aircraft: 0, speed: 5, los: 10, range: 1, luck: 1, asw: 0 }
  },
  1514: {
    shipId: 1514, sortId: 0, name: '駆逐イ級', yomi: 'elite', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 30, firepower: 15, armor: 12, torpedo: 32, evasion: 35, aa: 10, aircraft: 2, speed: 10, los: 6, range: 1, luck: 10, asw: 35 }
  },
  1515: {
    shipId: 1515, sortId: 0, name: '駆逐ロ級', yomi: 'elite', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 35, firepower: 20, armor: 14, torpedo: 32, evasion: 35, aa: 12, aircraft: 2, speed: 10, los: 6, range: 1, luck: 10, asw: 35 }
  },
  1516: {
    shipId: 1516, sortId: 0, name: '駆逐ハ級', yomi: 'elite', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 40, firepower: 15, armor: 16, torpedo: 32, evasion: 40, aa: 14, aircraft: 2, speed: 10, los: 7, range: 1, luck: 10, asw: 40 }
  },
  1517: {
    shipId: 1517, sortId: 0, name: '駆逐ニ級', yomi: 'elite', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 45, firepower: 20, armor: 18, torpedo: 40, evasion: 45, aa: 18, aircraft: 2, speed: 10, los: 7, range: 1, luck: 10, asw: 45 }
  },
  1518: {
    shipId: 1518, sortId: 0, name: '軽巡ホ級', yomi: 'elite', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 48, firepower: 30, armor: 30, torpedo: 40, evasion: 40, aa: 20, aircraft: 2, speed: 10, los: 6, range: 2, luck: 10, asw: 40 }
  },
  1519: {
    shipId: 1519, sortId: 0, name: '軽巡ヘ級', yomi: 'elite', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 52, firepower: 34, armor: 32, torpedo: 48, evasion: 45, aa: 23, aircraft: 2, speed: 10, los: 6, range: 2, luck: 10, asw: 45 }
  },
  1520: {
    shipId: 1520, sortId: 0, name: '軽巡ト級', yomi: 'elite', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 55, firepower: 36, armor: 36, torpedo: 48, evasion: 50, aa: 24, aircraft: 3, speed: 10, los: 6, range: 2, luck: 10, asw: 50 }
  },
  1521: {
    shipId: 1521, sortId: 0, name: '雷巡チ級', yomi: 'elite', shipClass: 4, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 50, firepower: 35, armor: 34, torpedo: 72, evasion: 40, aa: 20, aircraft: 3, speed: 10, los: 10, range: 2, luck: 10, asw: 40 }
  },
  1522: {
    shipId: 1522, sortId: 0, name: '重巡リ級', yomi: 'elite', shipClass: 5, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 60, firepower: 58, armor: 60, torpedo: 42, evasion: 30, aa: 30, aircraft: 4, speed: 10, los: 15, range: 2, luck: 10, asw: 0 }
  },
  1523: {
    shipId: 1523, sortId: 0, name: '軽母ヌ級', yomi: 'elite', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 70, firepower: 10, armor: 35, torpedo: 0, evasion: 30, aa: 15, aircraft: 3, speed: 5, los: 30, range: 1, luck: 10, asw: 0 }
  },
  1524: {
    shipId: 1524, sortId: 0, name: '戦艦ル級', yomi: 'elite', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 90, firepower: 85, armor: 85, torpedo: 0, evasion: 30, aa: 70, aircraft: 4, speed: 5, los: 20, range: 3, luck: 10, asw: 0 }
  },
  1525: {
    shipId: 1525, sortId: 0, name: '空母ヲ級', yomi: 'elite', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 88, firepower: 10, armor: 55, torpedo: 0, evasion: 30, aa: 40, aircraft: 3, speed: 10, los: 50, range: 1, luck: 10, asw: 0 }
  },
  1526: {
    shipId: 1526, sortId: 0, name: '輸送ワ級', yomi: 'elite', shipClass: 15, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 80, firepower: 15, armor: 35, torpedo: 0, evasion: 30, aa: 10, aircraft: 3, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1527: {
    shipId: 1527, sortId: 0, name: '重巡リ級', yomi: 'flagship', shipClass: 5, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 76, firepower: 68, armor: 70, torpedo: 48, evasion: 30, aa: 40, aircraft: 4, speed: 10, los: 20, range: 2, luck: 20, asw: 0 }
  },
  1528: {
    shipId: 1528, sortId: 0, name: '空母ヲ級', yomi: 'flagship', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 96, firepower: 25, armor: 80, torpedo: 0, evasion: 30, aa: 50, aircraft: 3, speed: 10, los: 50, range: 1, luck: 20, asw: 0 }
  },
  1529: {
    shipId: 1529, sortId: 0, name: '戦艦ル級', yomi: 'flagship', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 98, firepower: 90, armor: 99, torpedo: 0, evasion: 30, aa: 80, aircraft: 4, speed: 5, los: 30, range: 3, luck: 20, asw: 0 }
  },
  1530: {
    shipId: 1530, sortId: 0, name: '潜水カ級', yomi: '', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 19, firepower: 10, armor: 7, torpedo: 42, evasion: 30, aa: 10, aircraft: 2, speed: 5, los: 6, range: 1, luck: 1, asw: 0 }
  },
  1531: {
    shipId: 1531, sortId: 0, name: '潜水ヨ級', yomi: '', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 24, firepower: 10, armor: 9, torpedo: 52, evasion: 30, aa: 10, aircraft: 2, speed: 5, los: 7, range: 1, luck: 5, asw: 0 }
  },
  1532: {
    shipId: 1532, sortId: 0, name: '潜水カ級', yomi: 'elite', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 27, firepower: 10, armor: 21, torpedo: 64, evasion: 30, aa: 10, aircraft: 3, speed: 5, los: 8, range: 1, luck: 10, asw: 0 }
  },
  1533: {
    shipId: 1533, sortId: 0, name: '潜水ヨ級', yomi: 'elite', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 34, firepower: 10, armor: 27, torpedo: 74, evasion: 30, aa: 10, aircraft: 3, speed: 5, los: 9, range: 1, luck: 10, asw: 0 }
  },
  1534: {
    shipId: 1534, sortId: 0, name: '潜水カ級', yomi: 'flagship', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 37, firepower: 10, armor: 30, torpedo: 86, evasion: 30, aa: 10, aircraft: 3, speed: 5, los: 10, range: 1, luck: 20, asw: 0 }
  },
  1535: {
    shipId: 1535, sortId: 0, name: '潜水ヨ級', yomi: 'flagship', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 44, firepower: 10, armor: 36, torpedo: 96, evasion: 30, aa: 10, aircraft: 3, speed: 5, los: 10, range: 1, luck: 20, asw: 0 }
  },
  1536: {
    shipId: 1536, sortId: 0, name: '浮遊要塞', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 88, firepower: 50, armor: 40, torpedo: 40, evasion: 30, aa: 20, aircraft: 3, speed: 10, los: 10, range: 2, luck: 1, asw: 0 }
  },
  1537: {
    shipId: 1537, sortId: 0, name: '浮遊要塞', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 88, firepower: 50, armor: 40, torpedo: 40, evasion: 30, aa: 20, aircraft: 3, speed: 10, los: 10, range: 2, luck: 1, asw: 0 }
  },
  1538: {
    shipId: 1538, sortId: 0, name: '浮遊要塞', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 88, firepower: 50, armor: 40, torpedo: 40, evasion: 30, aa: 20, aircraft: 3, speed: 10, los: 10, range: 2, luck: 1, asw: 0 }
  },
  1539: {
    shipId: 1539, sortId: 0, name: '泊地棲鬼', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 180, firepower: 90, armor: 80, torpedo: 60, evasion: 30, aa: 70, aircraft: 3, speed: 5, los: 70, range: 3, luck: 30, asw: 0 }
  },
  1540: {
    shipId: 1540, sortId: 0, name: '泊地棲姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 300, firepower: 96, armor: 90, torpedo: 90, evasion: 30, aa: 80, aircraft: 3, speed: 5, los: 80, range: 3, luck: 40, asw: 0 }
  },
  1541: {
    shipId: 1541, sortId: 0, name: '戦艦タ級', yomi: '', shipClass: 8, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 84, firepower: 60, armor: 80, torpedo: 0, evasion: 30, aa: 60, aircraft: 4, speed: 10, los: 25, range: 3, luck: 10, asw: 0 }
  },
  1542: {
    shipId: 1542, sortId: 0, name: '戦艦タ級', yomi: 'elite', shipClass: 8, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 88, firepower: 75, armor: 88, torpedo: 0, evasion: 30, aa: 65, aircraft: 4, speed: 10, los: 30, range: 3, luck: 20, asw: 0 }
  },
  1543: {
    shipId: 1543, sortId: 0, name: '戦艦タ級', yomi: 'flagship', shipClass: 8, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 90, firepower: 85, armor: 96, torpedo: 0, evasion: 30, aa: 70, aircraft: 4, speed: 10, los: 35, range: 3, luck: 30, asw: 0 }
  },
  1544: {
    shipId: 1544, sortId: 0, name: '装甲空母鬼', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 150, firepower: 70, armor: 80, torpedo: 80, evasion: 30, aa: 60, aircraft: 3, speed: 10, los: 70, range: 2, luck: 10, asw: 0 }
  },
  1545: {
    shipId: 1545, sortId: 0, name: '装甲空母姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 270, firepower: 90, armor: 90, torpedo: 90, evasion: 30, aa: 70, aircraft: 3, speed: 10, los: 80, range: 2, luck: 20, asw: 0 }
  },
  1546: {
    shipId: 1546, sortId: 0, name: '南方棲鬼', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 210, firepower: 90, armor: 118, torpedo: 80, evasion: 30, aa: 70, aircraft: 4, speed: 5, los: 70, range: 3, luck: 30, asw: 0 }
  },
  1547: {
    shipId: 1547, sortId: 0, name: '南方棲戦鬼', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 240, firepower: 120, armor: 10, torpedo: 90, evasion: 30, aa: 80, aircraft: 4, speed: 5, los: 80, range: 3, luck: 40, asw: 0 }
  },
  1548: {
    shipId: 1548, sortId: 0, name: '南方棲戦姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 380, firepower: 160, armor: 188, torpedo: 100, evasion: 30, aa: 80, aircraft: 4, speed: 5, los: 90, range: 3, luck: 50, asw: 0 }
  },
  1549: {
    shipId: 1549, sortId: 0, name: '護衛要塞', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 66, firepower: 55, armor: 50, torpedo: 45, evasion: 30, aa: 20, aircraft: 3, speed: 10, los: 10, range: 2, luck: 1, asw: 0 }
  },
  1550: {
    shipId: 1550, sortId: 0, name: '護衛要塞', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 66, firepower: 55, armor: 50, torpedo: 45, evasion: 30, aa: 20, aircraft: 3, speed: 10, los: 10, range: 2, luck: 1, asw: 0 }
  },
  1551: {
    shipId: 1551, sortId: 0, name: '護衛要塞', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 66, firepower: 55, armor: 50, torpedo: 45, evasion: 30, aa: 20, aircraft: 3, speed: 10, los: 10, range: 2, luck: 1, asw: 0 }
  },
  1552: {
    shipId: 1552, sortId: 0, name: '駆逐ロ級', yomi: 'flagship', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 43, firepower: 33, armor: 24, torpedo: 60, evasion: 55, aa: 24, aircraft: 3, speed: 10, los: 10, range: 1, luck: 20, asw: 55 }
  },
  1553: {
    shipId: 1553, sortId: 0, name: '駆逐ハ級', yomi: 'flagship', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 47, firepower: 30, armor: 27, torpedo: 60, evasion: 60, aa: 24, aircraft: 3, speed: 10, los: 12, range: 1, luck: 20, asw: 60 }
  },
  1554: {
    shipId: 1554, sortId: 0, name: '軽巡ホ級', yomi: 'flagship', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 53, firepower: 42, armor: 36, torpedo: 72, evasion: 70, aa: 27, aircraft: 3, speed: 10, los: 20, range: 2, luck: 20, asw: 70 }
  },
  1555: {
    shipId: 1555, sortId: 0, name: '軽巡ヘ級', yomi: 'flagship', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 57, firepower: 48, armor: 39, torpedo: 80, evasion: 80, aa: 30, aircraft: 4, speed: 10, los: 24, range: 2, luck: 20, asw: 80 }
  },
  1556: {
    shipId: 1556, sortId: 0, name: '飛行場姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 500, firepower: 70, armor: 140, torpedo: 0, evasion: 30, aa: 120, aircraft: 4, speed: 5, los: 90, range: 2, luck: 10, asw: 0 }
  },
  1557: {
    shipId: 1557, sortId: 0, name: '戦艦棲姫', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 400, firepower: 180, armor: 160, torpedo: 0, evasion: 30, aa: 80, aircraft: 4, speed: 5, los: 70, range: 3, luck: 40, asw: 0 }
  },
  1558: {
    shipId: 1558, sortId: 0, name: '輸送ワ級', yomi: 'flagship', shipClass: 15, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 130, firepower: 55, armor: 65, torpedo: 0, evasion: 30, aa: 40, aircraft: 3, speed: 5, los: 10, range: 2, luck: 20, asw: 0 }
  },
  1559: {
    shipId: 1559, sortId: 0, name: '雷巡チ級', yomi: 'flagship', shipClass: 4, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 70, firepower: 50, armor: 60, torpedo: 120, evasion: 50, aa: 30, aircraft: 3, speed: 10, los: 15, range: 2, luck: 30, asw: 50 }
  },
  1560: {
    shipId: 1560, sortId: 0, name: '軽母ヌ級', yomi: 'flagship', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 84, firepower: 18, armor: 70, torpedo: 0, evasion: 30, aa: 36, aircraft: 4, speed: 5, los: 40, range: 1, luck: 30, asw: 0 }
  },
  1561: {
    shipId: 1561, sortId: 0, name: '戦艦レ級', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 180, firepower: 90, armor: 110, torpedo: 100, evasion: 90, aa: 80, aircraft: 4, speed: 10, los: 50, range: 3, luck: 60, asw: 90 }
  },
  1562: {
    shipId: 1562, sortId: 0, name: '戦艦レ級', yomi: 'elite', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 270, firepower: 130, armor: 130, torpedo: 120, evasion: 100, aa: 100, aircraft: 4, speed: 10, los: 70, range: 3, luck: 70, asw: 100 }
  },
  1564: {
    shipId: 1564, sortId: 0, name: '駆逐イ級', yomi: 'flagship', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 39, firepower: 32, armor: 24, torpedo: 60, evasion: 82, aa: 24, aircraft: 3, speed: 10, los: 10, range: 1, luck: 30, asw: 82 }
  },
  1565: {
    shipId: 1565, sortId: 0, name: '空母ヲ級改', yomi: 'flagship', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 160, firepower: 40, armor: 120, torpedo: 0, evasion: 30, aa: 90, aircraft: 4, speed: 10, los: 60, range: 1, luck: 30, asw: 0 }
  },
  1566: {
    shipId: 1566, sortId: 0, name: '重巡リ級改', yomi: 'flagship', shipClass: 5, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 88, firepower: 88, armor: 80, torpedo: 80, evasion: 30, aa: 58, aircraft: 4, speed: 10, los: 30, range: 2, luck: 40, asw: 0 }
  },
  1567: {
    shipId: 1567, sortId: 0, name: '戦艦ル級改', yomi: 'flagship', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 130, firepower: 110, armor: 110, torpedo: 0, evasion: 30, aa: 88, aircraft: 4, speed: 5, los: 36, range: 3, luck: 50, asw: 0 }
  },
  1570: {
    shipId: 1570, sortId: 0, name: '潜水ソ級', yomi: '', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 33, firepower: 24, armor: 15, torpedo: 70, evasion: 30, aa: 10, aircraft: 2, speed: 5, los: 10, range: 1, luck: 15, asw: 0 }
  },
  1571: {
    shipId: 1571, sortId: 0, name: '潜水ソ級', yomi: 'elite', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 45, firepower: 30, armor: 30, torpedo: 100, evasion: 30, aa: 10, aircraft: 3, speed: 5, los: 15, range: 1, luck: 30, asw: 0 }
  },
  1572: {
    shipId: 1572, sortId: 0, name: '潜水ソ級', yomi: 'flagship', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 48, firepower: 30, armor: 42, torpedo: 135, evasion: 30, aa: 10, aircraft: 3, speed: 5, los: 18, range: 1, luck: 45, asw: 0 }
  },
  1573: {
    shipId: 1573, sortId: 0, name: '港湾棲姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 380, firepower: 100, armor: 135, torpedo: 0, evasion: 30, aa: 150, aircraft: 4, speed: 5, los: 100, range: 2, luck: 20, asw: 0 }
  },
  1574: {
    shipId: 1574, sortId: 0, name: '離島棲鬼', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 450, firepower: 150, armor: 150, torpedo: 0, evasion: 30, aa: 100, aircraft: 4, speed: 5, los: 80, range: 2, luck: 50, asw: 0 }
  },
  1575: {
    shipId: 1575, sortId: 0, name: '駆逐イ級後期型', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 35, firepower: 38, armor: 22, torpedo: 60, evasion: 72, aa: 30, aircraft: 3, speed: 10, los: 20, range: 1, luck: 30, asw: 72 }
  },
  1576: {
    shipId: 1576, sortId: 0, name: '駆逐ロ級後期型', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 37, firepower: 38, armor: 26, torpedo: 66, evasion: 80, aa: 32, aircraft: 3, speed: 10, los: 20, range: 1, luck: 36, asw: 80 }
  },
  1577: {
    shipId: 1577, sortId: 0, name: '駆逐ハ級後期型', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 38, firepower: 44, armor: 29, torpedo: 72, evasion: 80, aa: 36, aircraft: 3, speed: 10, los: 24, range: 1, luck: 42, asw: 80 }
  },
  1578: {
    shipId: 1578, sortId: 0, name: '駆逐ニ級後期型', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 40, firepower: 48, armor: 33, torpedo: 84, evasion: 88, aa: 38, aircraft: 3, speed: 10, los: 28, range: 1, luck: 48, asw: 88 }
  },
  1579: {
    shipId: 1579, sortId: 0, name: '空母ヲ級', yomi: 'flagship', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 96, firepower: 25, armor: 80, torpedo: 0, evasion: 30, aa: 50, aircraft: 3, speed: 10, los: 50, range: 1, luck: 30, asw: 0 }
  },
  1581: {
    shipId: 1581, sortId: 0, name: '北方棲姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 360, firepower: 90, armor: 135, torpedo: 0, evasion: 30, aa: 130, aircraft: 4, speed: 5, los: 80, range: 2, luck: 40, asw: 0 }
  },
  1582: {
    shipId: 1582, sortId: 0, name: '北方棲姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 500, firepower: 170, armor: 145, torpedo: 0, evasion: 30, aa: 160, aircraft: 4, speed: 5, los: 100, range: 2, luck: 50, asw: 0 }
  },
  1583: {
    shipId: 1583, sortId: 0, name: '中間棲姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 550, firepower: 100, armor: 135, torpedo: 0, evasion: 30, aa: 140, aircraft: 5, speed: 5, los: 100, range: 3, luck: 50, asw: 0 }
  },
  1584: {
    shipId: 1584, sortId: 0, name: '中間棲姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 600, firepower: 180, armor: 180, torpedo: 0, evasion: 30, aa: 180, aircraft: 5, speed: 5, los: 130, range: 3, luck: 60, asw: 0 }
  },
  1585: {
    shipId: 1585, sortId: 0, name: '空母棲鬼', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 250, firepower: 120, armor: 138, torpedo: 0, evasion: 30, aa: 100, aircraft: 4, speed: 10, los: 100, range: 3, luck: 50, asw: 0 }
  },
  1586: {
    shipId: 1586, sortId: 0, name: '空母棲姫', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 350, firepower: 180, armor: 150, torpedo: 0, evasion: 30, aa: 130, aircraft: 4, speed: 10, los: 130, range: 3, luck: 70, asw: 0 }
  },
  1587: {
    shipId: 1587, sortId: 0, name: '北方棲姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 300, firepower: 80, armor: 125, torpedo: 0, evasion: 30, aa: 120, aircraft: 4, speed: 5, los: 80, range: 2, luck: 40, asw: 0 }
  },
  1588: {
    shipId: 1588, sortId: 0, name: '北方棲姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 390, firepower: 140, armor: 140, torpedo: 0, evasion: 30, aa: 140, aircraft: 4, speed: 5, los: 100, range: 2, luck: 50, asw: 0 }
  },
  1589: {
    shipId: 1589, sortId: 0, name: '北方棲姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 300, firepower: 60, armor: 110, torpedo: 0, evasion: 30, aa: 100, aircraft: 4, speed: 5, los: 80, range: 2, luck: 35, asw: 0 }
  },
  1590: {
    shipId: 1590, sortId: 0, name: '北方棲姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 390, firepower: 140, armor: 125, torpedo: 0, evasion: 30, aa: 120, aircraft: 4, speed: 5, los: 100, range: 2, luck: 40, asw: 0 }
  },
  1591: {
    shipId: 1591, sortId: 0, name: '軽巡ツ級', yomi: '', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 48, firepower: 58, armor: 55, torpedo: 84, evasion: 96, aa: 88, aircraft: 4, speed: 10, los: 48, range: 2, luck: 55, asw: 96 }
  },
  1592: {
    shipId: 1592, sortId: 0, name: '軽巡ツ級', yomi: 'elite', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 66, firepower: 64, armor: 68, torpedo: 92, evasion: 98, aa: 96, aircraft: 4, speed: 10, los: 58, range: 2, luck: 66, asw: 98 }
  },
  1594: {
    shipId: 1594, sortId: 0, name: '重巡ネ級', yomi: '', shipClass: 5, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 80, firepower: 73, armor: 82, torpedo: 66, evasion: 18685, aa: 72, aircraft: 4, speed: 10, los: 10, range: 2, luck: 60, asw: 0 }
  },
  1595: {
    shipId: 1595, sortId: 0, name: '重巡ネ級', yomi: 'elite', shipClass: 5, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 88, firepower: 79, armor: 89, torpedo: 74, evasion: 18685, aa: 79, aircraft: 4, speed: 10, los: 10, range: 2, luck: 70, asw: 0 }
  },
  1597: {
    shipId: 1597, sortId: 0, name: '駆逐棲姫', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 150, firepower: 59, armor: 100, torpedo: 90, evasion: 18685, aa: 60, aircraft: 3, speed: 10, los: 10, range: 1, luck: 70, asw: 0 }
  },
  1598: {
    shipId: 1598, sortId: 0, name: '駆逐棲姫', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 190, firepower: 69, armor: 115, torpedo: 90, evasion: 18685, aa: 60, aircraft: 3, speed: 10, los: 10, range: 1, luck: 80, asw: 0 }
  },
  1599: {
    shipId: 1599, sortId: 0, name: '空母水鬼', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1600: {
    shipId: 1600, sortId: 0, name: '空母水鬼', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 390, firepower: 190, armor: 190, torpedo: 0, evasion: 18685, aa: 140, aircraft: 4, speed: 10, los: 10, range: 3, luck: 70, asw: 0 }
  },
  1601: {
    shipId: 1601, sortId: 0, name: '軽巡棲鬼', yomi: '', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 210, firepower: 59, armor: 135, torpedo: 88, evasion: 18685, aa: 60, aircraft: 4, speed: 10, los: 10, range: 2, luck: 70, asw: 0 }
  },
  1602: {
    shipId: 1602, sortId: 0, name: '軽巡棲鬼', yomi: '', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 270, firepower: 69, armor: 170, torpedo: 98, evasion: 18685, aa: 60, aircraft: 4, speed: 10, los: 10, range: 2, luck: 90, asw: 0 }
  },
  1603: {
    shipId: 1603, sortId: 0, name: '戦艦水鬼', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1604: {
    shipId: 1604, sortId: 0, name: '戦艦水鬼', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 500, firepower: 198, armor: 200, torpedo: 0, evasion: 18685, aa: 96, aircraft: 4, speed: 5, los: 10, range: 3, luck: 90, asw: 0 }
  },
  1605: {
    shipId: 1605, sortId: 0, name: '港湾水鬼', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1606: {
    shipId: 1606, sortId: 0, name: '港湾水鬼', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 450, firepower: 130, armor: 140, torpedo: 0, evasion: 18685, aa: 120, aircraft: 4, speed: 5, los: 10, range: 3, luck: 65, asw: 0 }
  },
  1607: {
    shipId: 1607, sortId: 0, name: '港湾水鬼', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1608: {
    shipId: 1608, sortId: 0, name: '港湾水鬼', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 500, firepower: 160, armor: 160, torpedo: 0, evasion: 18685, aa: 160, aircraft: 4, speed: 5, los: 10, range: 3, luck: 75, asw: 0 }
  },
  1609: {
    shipId: 1609, sortId: 0, name: '泊地水鬼', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 330, firepower: 120, armor: 200, torpedo: 0, evasion: 18685, aa: 80, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1610: {
    shipId: 1610, sortId: 0, name: '泊地水鬼', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 330, firepower: 130, armor: 220, torpedo: 0, evasion: 18685, aa: 90, aircraft: 4, speed: 5, los: 10, range: 3, luck: 75, asw: 0 }
  },
  1611: {
    shipId: 1611, sortId: 0, name: '泊地水鬼', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 430, firepower: 140, armor: 220, torpedo: 0, evasion: 18685, aa: 100, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1612: {
    shipId: 1612, sortId: 0, name: '泊地水鬼', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 430, firepower: 150, armor: 240, torpedo: 0, evasion: 18685, aa: 110, aircraft: 4, speed: 5, los: 10, range: 3, luck: 85, asw: 0 }
  },
  1613: {
    shipId: 1613, sortId: 0, name: '港湾棲姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 490, firepower: 180, armor: 177, torpedo: 0, evasion: 18685, aa: 170, aircraft: 4, speed: 5, los: 10, range: 3, luck: 65, asw: 0 }
  },
  1614: {
    shipId: 1614, sortId: 0, name: '空母ヲ級', yomi: 'flagship', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 96, firepower: 25, armor: 80, torpedo: 0, evasion: 18685, aa: 50, aircraft: 3, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1615: {
    shipId: 1615, sortId: 0, name: '空母ヲ級', yomi: 'flagship', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 96, firepower: 25, armor: 80, torpedo: 0, evasion: 18685, aa: 50, aircraft: 3, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1616: {
    shipId: 1616, sortId: 0, name: '空母ヲ級改', yomi: 'flagship', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 160, firepower: 40, armor: 120, torpedo: 0, evasion: 18685, aa: 90, aircraft: 3, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1617: {
    shipId: 1617, sortId: 0, name: '空母ヲ級改', yomi: 'flagship', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 160, firepower: 40, armor: 120, torpedo: 0, evasion: 18685, aa: 90, aircraft: 3, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1618: {
    shipId: 1618, sortId: 0, name: '空母ヲ級改', yomi: 'flagship', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 160, firepower: 40, armor: 120, torpedo: 0, evasion: 18685, aa: 90, aircraft: 3, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1619: {
    shipId: 1619, sortId: 0, name: '空母棲鬼', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 250, firepower: 120, armor: 138, torpedo: 0, evasion: 18685, aa: 100, aircraft: 4, speed: 10, los: 10, range: 3, luck: 10, asw: 0 }
  },
  1620: {
    shipId: 1620, sortId: 0, name: '空母棲姫', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 350, firepower: 180, armor: 150, torpedo: 0, evasion: 18685, aa: 130, aircraft: 4, speed: 10, los: 10, range: 3, luck: 10, asw: 0 }
  },
  1621: {
    shipId: 1621, sortId: 0, name: '駆逐イ級後期型', yomi: 'elite', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 39, firepower: 48, armor: 30, torpedo: 76, evasion: 18685, aa: 40, aircraft: 3, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1622: {
    shipId: 1622, sortId: 0, name: '駆逐ロ級後期型', yomi: 'elite', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 43, firepower: 58, armor: 36, torpedo: 88, evasion: 18685, aa: 44, aircraft: 3, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1623: {
    shipId: 1623, sortId: 0, name: '駆逐ハ級後期型', yomi: 'elite', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 46, firepower: 58, armor: 36, torpedo: 76, evasion: 18685, aa: 48, aircraft: 3, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1624: {
    shipId: 1624, sortId: 0, name: '駆逐ニ級後期型', yomi: 'elite', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 49, firepower: 64, armor: 48, torpedo: 98, evasion: 18685, aa: 48, aircraft: 3, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1625: {
    shipId: 1625, sortId: 0, name: '水母棲姫', yomi: '', shipClass: 16, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 350, firepower: 75, armor: 150, torpedo: 88, evasion: 18685, aa: 70, aircraft: 4, speed: 5, los: 10, range: 2, luck: 10, asw: 0 }
  },
  1626: {
    shipId: 1626, sortId: 0, name: '水母棲姫', yomi: '', shipClass: 16, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 350, firepower: 95, armor: 175, torpedo: 98, evasion: 18685, aa: 80, aircraft: 4, speed: 5, los: 10, range: 2, luck: 10, asw: 0 }
  },
  1627: {
    shipId: 1627, sortId: 0, name: '水母棲姫', yomi: '', shipClass: 16, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 350, firepower: 115, armor: 195, torpedo: 98, evasion: 18685, aa: 90, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1628: {
    shipId: 1628, sortId: 0, name: '防空棲姫', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 255, firepower: 130, armor: 193, torpedo: 85, evasion: 18685, aa: 300, aircraft: 3, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1629: {
    shipId: 1629, sortId: 0, name: '防空棲姫', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 255, firepower: 160, armor: 223, torpedo: 90, evasion: 18685, aa: 360, aircraft: 3, speed: 10, los: 10, range: 2, luck: 10, asw: 0 }
  },
  1630: {
    shipId: 1630, sortId: 0, name: '防空棲姫', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 255, firepower: 190, armor: 273, torpedo: 95, evasion: 18685, aa: 390, aircraft: 3, speed: 10, los: 2, range: 1, luck: 10, asw: 0 }
  },
  1631: {
    shipId: 1631, sortId: 0, name: '飛行場姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1632: {
    shipId: 1632, sortId: 0, name: '飛行場姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1633: {
    shipId: 1633, sortId: 0, name: '飛行場姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 500, firepower: 95, armor: 190, torpedo: 0, evasion: 18685, aa: 140, aircraft: 4, speed: 5, los: 1, range: 1, luck: 10, asw: 0 }
  },
  1634: {
    shipId: 1634, sortId: 0, name: '離島棲鬼', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 450, firepower: 150, armor: 155, torpedo: 0, evasion: 18685, aa: 100, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1635: {
    shipId: 1635, sortId: 0, name: '離島棲鬼', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1636: {
    shipId: 1636, sortId: 0, name: '離島棲鬼', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 450, firepower: 180, armor: 185, torpedo: 0, evasion: 18685, aa: 120, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1637: {
    shipId: 1637, sortId: 0, name: 'PT小鬼群', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 9, firepower: 9, armor: 19, torpedo: 88, evasion: 18685, aa: 12, aircraft: 2, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1638: {
    shipId: 1638, sortId: 0, name: 'PT小鬼群', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 9, firepower: 9, armor: 29, torpedo: 98, evasion: 18685, aa: 18, aircraft: 2, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1639: {
    shipId: 1639, sortId: 0, name: 'PT小鬼群', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 15, firepower: 15, armor: 29, torpedo: 98, evasion: 18685, aa: 18, aircraft: 2, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1640: {
    shipId: 1640, sortId: 0, name: 'PT小鬼群', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 18, firepower: 18, armor: 39, torpedo: 118, evasion: 18685, aa: 24, aircraft: 2, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1641: {
    shipId: 1641, sortId: 0, name: '軽巡棲姫', yomi: '', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 230, firepower: 64, armor: 145, torpedo: 93, evasion: 18685, aa: 50, aircraft: 4, speed: 10, los: 10, range: 2, luck: 10, asw: 0 }
  },
  1642: {
    shipId: 1642, sortId: 0, name: '軽巡棲姫', yomi: '', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 290, firepower: 74, armor: 175, torpedo: 96, evasion: 18685, aa: 55, aircraft: 4, speed: 10, los: 10, range: 2, luck: 10, asw: 0 }
  },
  1643: {
    shipId: 1643, sortId: 0, name: '軽巡棲姫', yomi: '', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 330, firepower: 79, armor: 185, torpedo: 99, evasion: 18685, aa: 55, aircraft: 4, speed: 10, los: 10, range: 2, luck: 10, asw: 0 }
  },
  1644: {
    shipId: 1644, sortId: 0, name: '潜水棲姫', yomi: '', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 110, firepower: 50, armor: 49, torpedo: 140, evasion: 18685, aa: 10, aircraft: 3, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1645: {
    shipId: 1645, sortId: 0, name: '潜水棲姫', yomi: '', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 130, firepower: 70, armor: 69, torpedo: 155, evasion: 18685, aa: 10, aircraft: 3, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1646: {
    shipId: 1646, sortId: 0, name: '潜水棲姫', yomi: '', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 160, firepower: 90, armor: 89, torpedo: 170, evasion: 18685, aa: 10, aircraft: 3, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1647: {
    shipId: 1647, sortId: 0, name: '駆逐水鬼', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 255, firepower: 100, armor: 150, torpedo: 110, evasion: 18685, aa: 70, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1648: {
    shipId: 1648, sortId: 0, name: '駆逐水鬼', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 255, firepower: 120, armor: 170, torpedo: 120, evasion: 18685, aa: 80, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1649: {
    shipId: 1649, sortId: 0, name: '駆逐水鬼', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 255, firepower: 140, armor: 180, torpedo: 130, evasion: 18685, aa: 90, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1650: {
    shipId: 1650, sortId: 0, name: '飛行場姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 500, firepower: 50, armor: 140, torpedo: 0, evasion: 18685, aa: 120, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1651: {
    shipId: 1651, sortId: 0, name: '飛行場姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 500, firepower: 60, armor: 140, torpedo: 0, evasion: 18685, aa: 120, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1652: {
    shipId: 1652, sortId: 0, name: '飛行場姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 500, firepower: 70, armor: 140, torpedo: 0, evasion: 18685, aa: 120, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1653: {
    shipId: 1653, sortId: 0, name: '集積地棲姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 600, firepower: 70, armor: 100, torpedo: 88, evasion: 18685, aa: 60, aircraft: 4, speed: 5, los: 10, range: 3, luck: 10, asw: 0 }
  },
  1654: {
    shipId: 1654, sortId: 0, name: '集積地棲姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 600, firepower: 90, armor: 130, torpedo: 98, evasion: 18685, aa: 70, aircraft: 4, speed: 5, los: 10, range: 3, luck: 10, asw: 0 }
  },
  1655: {
    shipId: 1655, sortId: 0, name: '集積地棲姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 600, firepower: 130, armor: 160, torpedo: 118, evasion: 18685, aa: 80, aircraft: 4, speed: 5, los: 10, range: 1, luck: 3, asw: 0 }
  },
  1656: {
    shipId: 1656, sortId: 0, name: '集積地棲姫-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 380, firepower: 130, armor: 130, torpedo: 88, evasion: 18685, aa: 70, aircraft: 4, speed: 5, los: 10, range: 3, luck: 10, asw: 0 }
  },
  1657: {
    shipId: 1657, sortId: 0, name: '集積地棲姫-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 430, firepower: 160, armor: 160, torpedo: 98, evasion: 18685, aa: 80, aircraft: 4, speed: 5, los: 10, range: 3, luck: 10, asw: 0 }
  },
  1658: {
    shipId: 1658, sortId: 0, name: '集積地棲姫-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 480, firepower: 190, armor: 190, torpedo: 118, evasion: 18685, aa: 90, aircraft: 4, speed: 5, los: 10, range: 3, luck: 10, asw: 0 }
  },
  1659: {
    shipId: 1659, sortId: 0, name: '重巡棲姫', yomi: '', shipClass: 5, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 350, firepower: 100, armor: 145, torpedo: 66, evasion: 18685, aa: 72, aircraft: 4, speed: 10, los: 10, range: 3, luck: 10, asw: 0 }
  },
  1660: {
    shipId: 1660, sortId: 0, name: '重巡棲姫', yomi: '', shipClass: 5, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 350, firepower: 130, armor: 175, torpedo: 74, evasion: 18685, aa: 79, aircraft: 4, speed: 10, los: 10, range: 3, luck: 10, asw: 0 }
  },
  1661: {
    shipId: 1661, sortId: 0, name: '重巡棲姫', yomi: '', shipClass: 5, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 390, firepower: 160, armor: 195, torpedo: 82, evasion: 18685, aa: 86, aircraft: 4, speed: 10, los: 10, range: 3, luck: 10, asw: 0 }
  },
  1662: {
    shipId: 1662, sortId: 0, name: '重巡棲姫', yomi: '', shipClass: 5, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 370, firepower: 130, armor: 158, torpedo: 74, evasion: 18685, aa: 79, aircraft: 4, speed: 10, los: 10, range: 3, luck: 10, asw: 0 }
  },
  1663: {
    shipId: 1663, sortId: 0, name: '重巡棲姫', yomi: '', shipClass: 5, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 380, firepower: 160, armor: 188, torpedo: 82, evasion: 18685, aa: 86, aircraft: 4, speed: 10, los: 10, range: 3, luck: 10, asw: 0 }
  },
  1664: {
    shipId: 1664, sortId: 0, name: '重巡棲姫', yomi: '', shipClass: 5, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 390, firepower: 190, armor: 218, torpedo: 90, evasion: 18685, aa: 93, aircraft: 4, speed: 10, los: 10, range: 3, luck: 10, asw: 0 }
  },
  1665: {
    shipId: 1665, sortId: 0, name: '砲台小鬼', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 130, firepower: 100, armor: 110, torpedo: 0, evasion: 18685, aa: 65, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1666: {
    shipId: 1666, sortId: 0, name: '砲台小鬼', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 130, firepower: 100, armor: 105, torpedo: 0, evasion: 18685, aa: 75, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1667: {
    shipId: 1667, sortId: 0, name: '砲台小鬼', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 130, firepower: 100, armor: 100, torpedo: 0, evasion: 18685, aa: 85, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1668: {
    shipId: 1668, sortId: 0, name: '離島棲姫', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 480, firepower: 150, armor: 190, torpedo: 0, evasion: 18685, aa: 120, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1669: {
    shipId: 1669, sortId: 0, name: '離島棲姫', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 480, firepower: 150, armor: 190, torpedo: 0, evasion: 18685, aa: 120, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1670: {
    shipId: 1670, sortId: 0, name: '離島棲姫', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1671: {
    shipId: 1671, sortId: 0, name: '離島棲姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 480, firepower: 180, armor: 190, torpedo: 0, evasion: 18685, aa: 120, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1672: {
    shipId: 1672, sortId: 0, name: '離島棲姫', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 480, firepower: 180, armor: 190, torpedo: 0, evasion: 18685, aa: 120, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1673: {
    shipId: 1673, sortId: 0, name: '駆逐古鬼', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 170, firepower: 80, armor: 149, torpedo: 100, evasion: 18685, aa: 58, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1674: {
    shipId: 1674, sortId: 0, name: '駆逐古鬼', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 180, firepower: 88, armor: 158, torpedo: 110, evasion: 18685, aa: 64, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1675: {
    shipId: 1675, sortId: 0, name: '駆逐古鬼', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 190, firepower: 96, armor: 167, torpedo: 120, evasion: 18685, aa: 81, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1676: {
    shipId: 1676, sortId: 0, name: '駆逐水鬼', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 200, firepower: 100, armor: 155, torpedo: 110, evasion: 18685, aa: 70, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1677: {
    shipId: 1677, sortId: 0, name: '駆逐水鬼', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 220, firepower: 120, armor: 160, torpedo: 120, evasion: 18685, aa: 80, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1678: {
    shipId: 1678, sortId: 0, name: '駆逐水鬼', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 240, firepower: 140, armor: 170, torpedo: 130, evasion: 18685, aa: 90, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1679: {
    shipId: 1679, sortId: 0, name: 'リコリス棲姫', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 600, firepower: 150, armor: 100, torpedo: 0, evasion: 18685, aa: 120, aircraft: 4, speed: 5, los: 10, range: 2, luck: 10, asw: 0 }
  },
  1680: {
    shipId: 1680, sortId: 0, name: 'リコリス棲姫', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 640, firepower: 170, armor: 120, torpedo: 0, evasion: 18685, aa: 130, aircraft: 4, speed: 5, los: 10, range: 2, luck: 10, asw: 0 }
  },
  1681: {
    shipId: 1681, sortId: 0, name: 'リコリス棲姫', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 680, firepower: 190, armor: 140, torpedo: 0, evasion: 18685, aa: 140, aircraft: 4, speed: 5, los: 10, range: 2, luck: 10, asw: 0 }
  },
  1682: {
    shipId: 1682, sortId: 0, name: 'リコリス棲姫', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 600, firepower: 150, armor: 100, torpedo: 0, evasion: 18685, aa: 120, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1683: {
    shipId: 1683, sortId: 0, name: 'リコリス棲姫', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 600, firepower: 150, armor: 100, torpedo: 0, evasion: 18685, aa: 120, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1684: {
    shipId: 1684, sortId: 0, name: '中枢棲姫', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 600, firepower: 110, armor: 180, torpedo: 80, evasion: 18685, aa: 100, aircraft: 4, speed: 5, los: 10, range: 3, luck: 10, asw: 0 }
  },
  1685: {
    shipId: 1685, sortId: 0, name: '中枢棲姫', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 800, firepower: 160, armor: 210, torpedo: 90, evasion: 18685, aa: 140, aircraft: 4, speed: 5, los: 10, range: 3, luck: 10, asw: 0 }
  },
  1686: {
    shipId: 1686, sortId: 0, name: '中枢棲姫', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 900, firepower: 200, armor: 240, torpedo: 100, evasion: 18685, aa: 180, aircraft: 4, speed: 5, los: 10, range: 3, luck: 10, asw: 0 }
  },
  1687: {
    shipId: 1687, sortId: 0, name: '中枢棲姫-壊', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 550, firepower: 150, armor: 210, torpedo: 120, evasion: 18685, aa: 100, aircraft: 4, speed: 5, los: 10, range: 3, luck: 10, asw: 0 }
  },
  1688: {
    shipId: 1688, sortId: 0, name: '中枢棲姫-壊', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 750, firepower: 180, armor: 240, torpedo: 140, evasion: 18685, aa: 140, aircraft: 4, speed: 5, los: 10, range: 3, luck: 10, asw: 0 }
  },
  1689: {
    shipId: 1689, sortId: 0, name: '中枢棲姫-壊', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 900, firepower: 230, armor: 270, torpedo: 160, evasion: 18685, aa: 180, aircraft: 4, speed: 5, los: 10, range: 3, luck: 10, asw: 0 }
  },
  1690: {
    shipId: 1690, sortId: 0, name: '駆逐古姫', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 185, firepower: 90, armor: 149, torpedo: 120, evasion: 18685, aa: 70, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1691: {
    shipId: 1691, sortId: 0, name: '駆逐古姫', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 190, firepower: 110, armor: 158, torpedo: 130, evasion: 18685, aa: 80, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1692: {
    shipId: 1692, sortId: 0, name: '駆逐古姫', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 195, firepower: 130, armor: 167, torpedo: 140, evasion: 18685, aa: 90, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1693: {
    shipId: 1693, sortId: 0, name: '潜水夏姫', yomi: 'flagship', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 110, firepower: 50, armor: 38, torpedo: 140, evasion: 18685, aa: 10, aircraft: 3, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1694: {
    shipId: 1694, sortId: 0, name: '潜水夏姫', yomi: 'flagship', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 140, firepower: 70, armor: 48, torpedo: 155, evasion: 18685, aa: 10, aircraft: 3, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1695: {
    shipId: 1695, sortId: 0, name: '潜水夏姫', yomi: 'flagship', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 180, firepower: 90, armor: 58, torpedo: 170, evasion: 18685, aa: 10, aircraft: 3, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1696: {
    shipId: 1696, sortId: 0, name: '戦艦夏姫', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 400, firepower: 180, armor: 148, torpedo: 0, evasion: 18685, aa: 80, aircraft: 4, speed: 5, los: 10, range: 3, luck: 10, asw: 0 }
  },
  1697: {
    shipId: 1697, sortId: 0, name: '戦艦夏姫', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 450, firepower: 185, armor: 158, torpedo: 0, evasion: 18685, aa: 84, aircraft: 4, speed: 5, los: 10, range: 3, luck: 10, asw: 0 }
  },
  1698: {
    shipId: 1698, sortId: 0, name: '戦艦夏姫', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 530, firepower: 195, armor: 168, torpedo: 0, evasion: 18685, aa: 88, aircraft: 4, speed: 5, los: 10, range: 3, luck: 10, asw: 0 }
  },
  1699: {
    shipId: 1699, sortId: 0, name: '港湾夏姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 500, firepower: 170, armor: 147, torpedo: 0, evasion: 18685, aa: 170, aircraft: 4, speed: 5, los: 10, range: 3, luck: 10, asw: 0 }
  },
  1700: {
    shipId: 1700, sortId: 0, name: '港湾夏姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 600, firepower: 188, armor: 157, torpedo: 0, evasion: 18685, aa: 180, aircraft: 4, speed: 5, los: 10, range: 3, luck: 10, asw: 0 }
  },
  1701: {
    shipId: 1701, sortId: 0, name: '港湾夏姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 750, firepower: 200, armor: 167, torpedo: 0, evasion: 18685, aa: 188, aircraft: 4, speed: 5, los: 10, range: 3, luck: 10, asw: 0 }
  },
  1702: {
    shipId: 1702, sortId: 0, name: '港湾夏姫-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 444, firepower: 170, armor: 164, torpedo: 0, evasion: 18685, aa: 170, aircraft: 4, speed: 5, los: 10, range: 3, luck: 10, asw: 0 }
  },
  1703: {
    shipId: 1703, sortId: 0, name: '港湾夏姫-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 544, firepower: 188, armor: 184, torpedo: 0, evasion: 18685, aa: 180, aircraft: 4, speed: 5, los: 10, range: 3, luck: 10, asw: 0 }
  },
  1704: {
    shipId: 1704, sortId: 0, name: '港湾夏姫-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 750, firepower: 200, armor: 214, torpedo: 0, evasion: 18685, aa: 188, aircraft: 4, speed: 5, los: 10, range: 3, luck: 10, asw: 0 }
  },
  1705: {
    shipId: 1705, sortId: 0, name: '重巡夏姫', yomi: '', shipClass: 5, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 370, firepower: 110, armor: 139, torpedo: 74, evasion: 18685, aa: 72, aircraft: 4, speed: 10, los: 10, range: 3, luck: 10, asw: 0 }
  },
  1706: {
    shipId: 1706, sortId: 0, name: '重巡夏姫', yomi: '', shipClass: 5, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 430, firepower: 140, armor: 169, torpedo: 82, evasion: 18685, aa: 79, aircraft: 4, speed: 10, los: 10, range: 3, luck: 10, asw: 0 }
  },
  1707: {
    shipId: 1707, sortId: 0, name: '重巡夏姫', yomi: '', shipClass: 5, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 550, firepower: 170, armor: 199, torpedo: 90, evasion: 18685, aa: 86, aircraft: 4, speed: 10, los: 10, range: 3, luck: 10, asw: 0 }
  },
  1708: {
    shipId: 1708, sortId: 0, name: '水母水姫', yomi: '', shipClass: 16, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1709: {
    shipId: 1709, sortId: 0, name: '水母水姫', yomi: '', shipClass: 16, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1710: {
    shipId: 1710, sortId: 0, name: '水母水姫', yomi: '', shipClass: 16, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 390, firepower: 175, armor: 215, torpedo: 110, evasion: 18685, aa: 120, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1711: {
    shipId: 1711, sortId: 0, name: '深海海月姫', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1712: {
    shipId: 1712, sortId: 0, name: '深海海月姫', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1713: {
    shipId: 1713, sortId: 0, name: '深海海月姫', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 800, firepower: 240, armor: 183, torpedo: 0, evasion: 18685, aa: 140, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1714: {
    shipId: 1714, sortId: 0, name: '空母ヲ級改', yomi: 'flagship', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 160, firepower: 40, armor: 120, torpedo: 0, evasion: 18685, aa: 90, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1715: {
    shipId: 1715, sortId: 0, name: '空母ヲ級改', yomi: 'flagship', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 160, firepower: 40, armor: 120, torpedo: 0, evasion: 18685, aa: 90, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1716: {
    shipId: 1716, sortId: 0, name: '深海双子棲姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1717: {
    shipId: 1717, sortId: 0, name: '深海双子棲姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1718: {
    shipId: 1718, sortId: 0, name: '深海双子棲姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 800, firepower: 220, armor: 218, torpedo: 190, evasion: 18685, aa: 160, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1719: {
    shipId: 1719, sortId: 0, name: '深海双子棲姫-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1720: {
    shipId: 1720, sortId: 0, name: '深海双子棲姫-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1721: {
    shipId: 1721, sortId: 0, name: '深海双子棲姫-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 660, firepower: 240, armor: 239, torpedo: 180, evasion: 18685, aa: 150, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1722: {
    shipId: 1722, sortId: 0, name: '護衛棲姫', yomi: '', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1723: {
    shipId: 1723, sortId: 0, name: '護衛棲姫', yomi: '', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1724: {
    shipId: 1724, sortId: 0, name: '護衛棲姫', yomi: '', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 480, firepower: 150, armor: 193, torpedo: 0, evasion: 18685, aa: 90, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1725: {
    shipId: 1725, sortId: 0, name: '北端上陸姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1726: {
    shipId: 1726, sortId: 0, name: '北端上陸姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1727: {
    shipId: 1727, sortId: 0, name: '北端上陸姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 690, firepower: 190, armor: 186, torpedo: 0, evasion: 18685, aa: 108, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1728: {
    shipId: 1728, sortId: 0, name: '北方水姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1729: {
    shipId: 1729, sortId: 0, name: '北方水姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1730: {
    shipId: 1730, sortId: 0, name: '北方水姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 770, firepower: 188, armor: 217, torpedo: 95, evasion: 18685, aa: 96, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1731: {
    shipId: 1731, sortId: 0, name: '北方水姫-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1732: {
    shipId: 1732, sortId: 0, name: '北方水姫-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1733: {
    shipId: 1733, sortId: 0, name: '北方水姫-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 770, firepower: 188, armor: 239, torpedo: 130, evasion: 18685, aa: 82, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1734: {
    shipId: 1734, sortId: 0, name: '軽母ヌ級改', yomi: 'elite', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 88, firepower: 35, armor: 73, torpedo: 0, evasion: 18685, aa: 48, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1735: {
    shipId: 1735, sortId: 0, name: '軽母ヌ級改', yomi: 'flagship', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 118, firepower: 45, armor: 93, torpedo: 0, evasion: 18685, aa: 68, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1736: {
    shipId: 1736, sortId: 0, name: '潜水新棲姫', yomi: 'flagship', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 177, firepower: 27, armor: 37, torpedo: 117, evasion: 18685, aa: 10, aircraft: 3, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1737: {
    shipId: 1737, sortId: 0, name: '潜水新棲姫', yomi: 'flagship', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 277, firepower: 47, armor: 37, torpedo: 137, evasion: 18685, aa: 10, aircraft: 3, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1738: {
    shipId: 1738, sortId: 0, name: '潜水新棲姫', yomi: 'flagship', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 377, firepower: 47, armor: 47, torpedo: 177, evasion: 18685, aa: 10, aircraft: 3, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1739: {
    shipId: 1739, sortId: 0, name: '駆逐ナ級', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 60, firepower: 66, armor: 51, torpedo: 91, evasion: 18685, aa: 63, aircraft: 3, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1740: {
    shipId: 1740, sortId: 0, name: '駆逐ナ級', yomi: 'elite', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 63, firepower: 69, armor: 55, torpedo: 95, evasion: 18685, aa: 69, aircraft: 3, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1741: {
    shipId: 1741, sortId: 0, name: '駆逐ナ級', yomi: 'flagship', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 66, firepower: 79, armor: 59, torpedo: 99, evasion: 18685, aa: 79, aircraft: 3, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1742: {
    shipId: 1742, sortId: 0, name: '駆逐ナ級後期型', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 63, firepower: 69, armor: 59, torpedo: 103, evasion: 18685, aa: 76, aircraft: 3, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1743: {
    shipId: 1743, sortId: 0, name: '駆逐ナ級後期型', yomi: 'elite', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 66, firepower: 79, armor: 63, torpedo: 113, evasion: 18685, aa: 86, aircraft: 3, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1744: {
    shipId: 1744, sortId: 0, name: '駆逐ナ級後期型', yomi: 'flagship', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 69, firepower: 89, armor: 69, torpedo: 123, evasion: 18685, aa: 96, aircraft: 3, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1745: {
    shipId: 1745, sortId: 0, name: '戦艦仏棲姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1746: {
    shipId: 1746, sortId: 0, name: '戦艦仏棲姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1747: {
    shipId: 1747, sortId: 0, name: '戦艦仏棲姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 730, firepower: 242, armor: 256, torpedo: 0, evasion: 18685, aa: 94, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1748: {
    shipId: 1748, sortId: 0, name: '戦艦仏棲姫-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1749: {
    shipId: 1749, sortId: 0, name: '戦艦仏棲姫-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1750: {
    shipId: 1750, sortId: 0, name: '戦艦仏棲姫-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 730, firepower: 282, armor: 270, torpedo: 0, evasion: 18685, aa: 94, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1751: {
    shipId: 1751, sortId: 0, name: '空母夏鬼', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 340, firepower: 140, armor: 137, torpedo: 0, evasion: 18685, aa: 120, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1752: {
    shipId: 1752, sortId: 0, name: '空母夏姫', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 440, firepower: 190, armor: 149, torpedo: 0, evasion: 18685, aa: 140, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1753: {
    shipId: 1753, sortId: 0, name: '集積地夏姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1754: {
    shipId: 1754, sortId: 0, name: '集積地夏姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 690, firepower: 135, armor: 159, torpedo: 128, evasion: 18685, aa: 84, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1755: {
    shipId: 1755, sortId: 0, name: '欧州棲姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1756: {
    shipId: 1756, sortId: 0, name: '欧州棲姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1757: {
    shipId: 1757, sortId: 0, name: '欧州棲姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 880, firepower: 330, armor: 269, torpedo: 0, evasion: 18685, aa: 150, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1758: {
    shipId: 1758, sortId: 0, name: '欧州棲姫-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1759: {
    shipId: 1759, sortId: 0, name: '欧州棲姫-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1760: {
    shipId: 1760, sortId: 0, name: '欧州棲姫-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 880, firepower: 390, armor: 289, torpedo: 155, evasion: 18685, aa: 180, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1761: {
    shipId: 1761, sortId: 0, name: '重巡ネ級', yomi: 'flagship', shipClass: 6, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 220, firepower: 108, armor: 112, torpedo: 74, evasion: 18685, aa: 78, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1762: {
    shipId: 1762, sortId: 0, name: '軽母ヌ級', yomi: 'elite', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 70, firepower: 15, armor: 35, torpedo: 0, evasion: 18685, aa: 15, aircraft: 3, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1763: {
    shipId: 1763, sortId: 0, name: '軽母ヌ級', yomi: 'flagship', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 84, firepower: 18, armor: 70, torpedo: 0, evasion: 18685, aa: 36, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1764: {
    shipId: 1764, sortId: 0, name: '軽母ヌ級', yomi: 'flagship', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 84, firepower: 18, armor: 70, torpedo: 0, evasion: 18685, aa: 36, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1765: {
    shipId: 1765, sortId: 0, name: '軽母ヌ級改', yomi: 'elite', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 88, firepower: 35, armor: 73, torpedo: 0, evasion: 18685, aa: 48, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1766: {
    shipId: 1766, sortId: 0, name: '軽母ヌ級改', yomi: 'flagship', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 118, firepower: 45, armor: 93, torpedo: 0, evasion: 18685, aa: 68, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1767: {
    shipId: 1767, sortId: 0, name: '海峡夜棲姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1768: {
    shipId: 1768, sortId: 0, name: '海峡夜棲姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1769: {
    shipId: 1769, sortId: 0, name: '海峡夜棲姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 800, firepower: 144, armor: 242, torpedo: 90, evasion: 18685, aa: 69, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1770: {
    shipId: 1770, sortId: 0, name: '海峡夜棲姫-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1771: {
    shipId: 1771, sortId: 0, name: '海峡夜棲姫-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1772: {
    shipId: 1772, sortId: 0, name: '海峡夜棲姫-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 800, firepower: 202, armor: 262, torpedo: 120, evasion: 18685, aa: 39, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1773: {
    shipId: 1773, sortId: 0, name: '防空埋護姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 3, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1774: {
    shipId: 1774, sortId: 0, name: '防空埋護姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 655, firepower: 170, armor: 210, torpedo: 130, evasion: 18685, aa: 220, aircraft: 3, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1775: {
    shipId: 1775, sortId: 0, name: '防空埋護姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 655, firepower: 220, armor: 250, torpedo: 140, evasion: 18685, aa: 240, aircraft: 3, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1776: {
    shipId: 1776, sortId: 0, name: '軽母ヌ級', yomi: 'elite', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 70, firepower: 15, armor: 35, torpedo: 0, evasion: 18685, aa: 15, aircraft: 3, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1777: {
    shipId: 1777, sortId: 0, name: '軽母ヌ級', yomi: 'elite', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 70, firepower: 15, armor: 35, torpedo: 0, evasion: 18685, aa: 15, aircraft: 3, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1778: {
    shipId: 1778, sortId: 0, name: '軽母ヌ級改', yomi: 'elite', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 88, firepower: 35, armor: 73, torpedo: 0, evasion: 18685, aa: 48, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1779: {
    shipId: 1779, sortId: 0, name: '軽母ヌ級改', yomi: 'flagship', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 118, firepower: 48, armor: 93, torpedo: 0, evasion: 18685, aa: 68, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1780: {
    shipId: 1780, sortId: 0, name: '軽母ヌ級改', yomi: 'flagship', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 118, firepower: 48, armor: 93, torpedo: 0, evasion: 18685, aa: 68, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1781: {
    shipId: 1781, sortId: 0, name: '空母棲姫', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 350, firepower: 180, armor: 180, torpedo: 0, evasion: 18685, aa: 130, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1782: {
    shipId: 1782, sortId: 0, name: '空母棲姫', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 350, firepower: 198, armor: 220, torpedo: 0, evasion: 18685, aa: 160, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1783: {
    shipId: 1783, sortId: 0, name: '護衛棲水姫', yomi: '', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1784: {
    shipId: 1784, sortId: 0, name: '護衛棲水姫', yomi: '', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1785: {
    shipId: 1785, sortId: 0, name: '護衛棲水姫', yomi: '', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 650, firepower: 144, armor: 228, torpedo: 150, evasion: 18685, aa: 118, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1786: {
    shipId: 1786, sortId: 0, name: '護衛棲水姫-壊', yomi: '', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1787: {
    shipId: 1787, sortId: 0, name: '護衛棲水姫-壊', yomi: '', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1788: {
    shipId: 1788, sortId: 0, name: '護衛棲水姫-壊', yomi: '', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 650, firepower: 188, armor: 278, torpedo: 160, evasion: 18685, aa: 128, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1789: {
    shipId: 1789, sortId: 0, name: '潜水新棲姫', yomi: 'flagship', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 3, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1790: {
    shipId: 1790, sortId: 0, name: '戦艦棲姫改', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 700, firepower: 200, armor: 188, torpedo: 0, evasion: 18685, aa: 88, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1791: {
    shipId: 1791, sortId: 0, name: '戦艦棲姫改', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1792: {
    shipId: 1792, sortId: 0, name: '戦艦棲姫改', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 700, firepower: 240, armor: 248, torpedo: 0, evasion: 18685, aa: 108, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1793: {
    shipId: 1793, sortId: 0, name: '戦艦水鬼改', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1794: {
    shipId: 1794, sortId: 0, name: '戦艦水鬼改', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 800, firepower: 248, armor: 230, torpedo: 0, evasion: 18685, aa: 108, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1795: {
    shipId: 1795, sortId: 0, name: '戦艦水鬼改', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 800, firepower: 278, armor: 270, torpedo: 0, evasion: 18685, aa: 108, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1796: {
    shipId: 1796, sortId: 0, name: '戦艦水鬼改-壊', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1797: {
    shipId: 1797, sortId: 0, name: '戦艦水鬼改-壊', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 800, firepower: 278, armor: 250, torpedo: 0, evasion: 18685, aa: 108, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1798: {
    shipId: 1798, sortId: 0, name: '戦艦水鬼改-壊', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 800, firepower: 308, armor: 290, torpedo: 0, evasion: 18685, aa: 108, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1799: {
    shipId: 1799, sortId: 0, name: '深海鶴棲姫', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 800, firepower: 138, armor: 220, torpedo: 108, evasion: 18685, aa: 88, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1800: {
    shipId: 1800, sortId: 0, name: '深海鶴棲姫', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1801: {
    shipId: 1801, sortId: 0, name: '深海鶴棲姫', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 800, firepower: 138, armor: 280, torpedo: 108, evasion: 18685, aa: 88, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1802: {
    shipId: 1802, sortId: 0, name: '深海鶴棲姫-壊', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1803: {
    shipId: 1803, sortId: 0, name: '深海鶴棲姫-壊', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1804: {
    shipId: 1804, sortId: 0, name: '深海鶴棲姫-壊', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 800, firepower: 207, armor: 298, torpedo: 128, evasion: 18685, aa: 108, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1805: {
    shipId: 1805, sortId: 0, name: '潜水新棲姫 バカンスmode', yomi: 'flagship', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 3, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1806: {
    shipId: 1806, sortId: 0, name: '潜水新棲姫 バカンスmode', yomi: 'flagship', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 188, firepower: 38, armor: 30, torpedo: 148, evasion: 18685, aa: 10, aircraft: 3, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1807: {
    shipId: 1807, sortId: 0, name: '潜水新棲姫 バカンスmode', yomi: 'flagship', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 288, firepower: 48, armor: 42, torpedo: 168, evasion: 18685, aa: 10, aircraft: 3, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1808: {
    shipId: 1808, sortId: 0, name: '潜水新棲姫 バカンスmode', yomi: 'flagship', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 388, firepower: 48, armor: 54, torpedo: 188, evasion: 18685, aa: 10, aircraft: 3, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1809: {
    shipId: 1809, sortId: 0, name: '集積地棲姫 バカンスmode', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1810: {
    shipId: 1810, sortId: 0, name: '集積地棲姫 バカンスmode', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1811: {
    shipId: 1811, sortId: 0, name: '集積地棲姫 バカンスmode', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 720, firepower: 178, armor: 198, torpedo: 144, evasion: 18685, aa: 98, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1812: {
    shipId: 1812, sortId: 0, name: '集積地棲姫 バカンスmode-壊', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1813: {
    shipId: 1813, sortId: 0, name: '集積地棲姫 バカンスmode-壊', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1814: {
    shipId: 1814, sortId: 0, name: '集積地棲姫 バカンスmode-壊', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 720, firepower: 198, armor: 228, torpedo: 188, evasion: 18685, aa: 108, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1815: {
    shipId: 1815, sortId: 0, name: '泊地水鬼 バカンスmode', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1816: {
    shipId: 1816, sortId: 0, name: '泊地水鬼 バカンスmode', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1817: {
    shipId: 1817, sortId: 0, name: '泊地水鬼 バカンスmode', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 490, firepower: 160, armor: 270, torpedo: 0, evasion: 18685, aa: 98, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1818: {
    shipId: 1818, sortId: 0, name: '泊地水鬼 バカンスmode', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1819: {
    shipId: 1819, sortId: 0, name: '泊地水鬼 バカンスmode', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1820: {
    shipId: 1820, sortId: 0, name: '泊地水鬼 バカンスmode', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 490, firepower: 230, armor: 290, torpedo: 130, evasion: 18685, aa: 108, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1821: {
    shipId: 1821, sortId: 0, name: '護衛独還姫', yomi: '', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1822: {
    shipId: 1822, sortId: 0, name: '護衛独還姫', yomi: '', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 570, firepower: 130, armor: 244, torpedo: 0, evasion: 18685, aa: 110, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1823: {
    shipId: 1823, sortId: 0, name: '護衛独還姫', yomi: '', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 570, firepower: 150, armor: 284, torpedo: 0, evasion: 18685, aa: 120, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1824: {
    shipId: 1824, sortId: 0, name: '護衛独還姫-壊', yomi: '', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1825: {
    shipId: 1825, sortId: 0, name: '護衛独還姫-壊', yomi: '', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 570, firepower: 160, armor: 263, torpedo: 0, evasion: 18685, aa: 130, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1826: {
    shipId: 1826, sortId: 0, name: '護衛独還姫-壊', yomi: '', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 570, firepower: 190, armor: 293, torpedo: 0, evasion: 18685, aa: 140, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1827: {
    shipId: 1827, sortId: 0, name: '船渠棲姫', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 3, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1828: {
    shipId: 1828, sortId: 0, name: '船渠棲姫', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 3, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1829: {
    shipId: 1829, sortId: 0, name: '船渠棲姫', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 700, firepower: 182, armor: 260, torpedo: 0, evasion: 18685, aa: 112, aircraft: 3, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1830: {
    shipId: 1830, sortId: 0, name: '船渠棲姫-壊', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 3, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1831: {
    shipId: 1831, sortId: 0, name: '船渠棲姫-壊', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 3, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1832: {
    shipId: 1832, sortId: 0, name: '船渠棲姫-壊', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 700, firepower: 202, armor: 300, torpedo: 0, evasion: 18685, aa: 122, aircraft: 3, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1834: {
    shipId: 1834, sortId: 0, name: '戦艦仏棲姫 バカンスmode', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1835: {
    shipId: 1835, sortId: 0, name: '戦艦仏棲姫 バカンスmode', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 770, firepower: 252, armor: 184, torpedo: 0, evasion: 18685, aa: 84, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1836: {
    shipId: 1836, sortId: 0, name: '戦艦仏棲姫 バカンスmode', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 770, firepower: 272, armor: 224, torpedo: 0, evasion: 18685, aa: 94, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1837: {
    shipId: 1837, sortId: 0, name: '戦艦仏棲姫-壊 バカンスmode', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1838: {
    shipId: 1838, sortId: 0, name: '戦艦仏棲姫-壊 バカンスmode', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1839: {
    shipId: 1839, sortId: 0, name: '戦艦仏棲姫-壊 バカンスmode', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 770, firepower: 292, armor: 254, torpedo: 0, evasion: 18685, aa: 94, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1840: {
    shipId: 1840, sortId: 0, name: '欧州水姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1841: {
    shipId: 1841, sortId: 0, name: '欧州水姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1842: {
    shipId: 1842, sortId: 0, name: '欧州水姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 900, firepower: 330, armor: 285, torpedo: 0, evasion: 18685, aa: 150, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1843: {
    shipId: 1843, sortId: 0, name: '欧州水姫-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1844: {
    shipId: 1844, sortId: 0, name: '欧州水姫-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1845: {
    shipId: 1845, sortId: 0, name: '欧州水姫-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 900, firepower: 390, armor: 330, torpedo: 160, evasion: 18685, aa: 180, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1846: {
    shipId: 1846, sortId: 0, name: '深海雨雲姫', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1847: {
    shipId: 1847, sortId: 0, name: '深海雨雲姫', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 370, firepower: 144, armor: 160, torpedo: 0, evasion: 18685, aa: 88, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1848: {
    shipId: 1848, sortId: 0, name: '深海雨雲姫', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 370, firepower: 177, armor: 190, torpedo: 0, evasion: 18685, aa: 99, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1849: {
    shipId: 1849, sortId: 0, name: '深海雨雲姫-壊', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1850: {
    shipId: 1850, sortId: 0, name: '深海雨雲姫-壊', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1851: {
    shipId: 1851, sortId: 0, name: '深海雨雲姫-壊', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 490, firepower: 188, armor: 230, torpedo: 0, evasion: 18685, aa: 99, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1852: {
    shipId: 1852, sortId: 0, name: '深海日棲姫', yomi: '', shipClass: 16, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1853: {
    shipId: 1853, sortId: 0, name: '深海日棲姫', yomi: '', shipClass: 16, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1854: {
    shipId: 1854, sortId: 0, name: '深海日棲姫', yomi: '', shipClass: 16, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 888, firepower: 288, armor: 244, torpedo: 166, evasion: 18685, aa: 128, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1855: {
    shipId: 1855, sortId: 0, name: '深海日棲姫-壊', yomi: '', shipClass: 16, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1856: {
    shipId: 1856, sortId: 0, name: '深海日棲姫-壊', yomi: '', shipClass: 16, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1857: {
    shipId: 1857, sortId: 0, name: '深海日棲姫-壊', yomi: '', shipClass: 16, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 888, firepower: 288, armor: 288, torpedo: 166, evasion: 18685, aa: 128, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1858: {
    shipId: 1858, sortId: 0, name: '駆逐ニ級改', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 39, firepower: 34, armor: 19, torpedo: 48, evasion: 18685, aa: 28, aircraft: 3, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1859: {
    shipId: 1859, sortId: 0, name: '駆逐ニ級改後期型', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 49, firepower: 54, armor: 39, torpedo: 88, evasion: 18685, aa: 48, aircraft: 3, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1860: {
    shipId: 1860, sortId: 0, name: '駆逐ニ級改後期型', yomi: 'elite', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 49, firepower: 64, armor: 49, torpedo: 98, evasion: 18685, aa: 58, aircraft: 3, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1861: {
    shipId: 1861, sortId: 0, name: '駆逐ニ級改後期型', yomi: 'flagship', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 49, firepower: 68, armor: 59, torpedo: 98, evasion: 18685, aa: 68, aircraft: 3, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1862: {
    shipId: 1862, sortId: 0, name: '軽巡ツ級', yomi: 'flagship', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 130, firepower: 122, armor: 108, torpedo: 98, evasion: 18685, aa: 108, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1863: {
    shipId: 1863, sortId: 0, name: '重巡棲姫', yomi: '', shipClass: 5, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 540, firepower: 180, armor: 227, torpedo: 110, evasion: 18685, aa: 90, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1864: {
    shipId: 1864, sortId: 0, name: '重巡棲姫', yomi: '', shipClass: 5, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 540, firepower: 220, armor: 277, torpedo: 130, evasion: 18685, aa: 98, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1865: {
    shipId: 1865, sortId: 0, name: '北方棲妹', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1866: {
    shipId: 1866, sortId: 0, name: '北方棲妹', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1867: {
    shipId: 1867, sortId: 0, name: '北方棲妹', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 790, firepower: 190, armor: 250, torpedo: 150, evasion: 18685, aa: 96, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1868: {
    shipId: 1868, sortId: 0, name: '北方棲妹-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1869: {
    shipId: 1869, sortId: 0, name: '北方棲妹-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1870: {
    shipId: 1870, sortId: 0, name: '北方棲妹-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 790, firepower: 190, armor: 290, torpedo: 180, evasion: 18685, aa: 104, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1871: {
    shipId: 1871, sortId: 0, name: '太平洋深海棲姫', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1872: {
    shipId: 1872, sortId: 0, name: '太平洋深海棲姫', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 930, firepower: 330, armor: 232, torpedo: 110, evasion: 18685, aa: 122, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1873: {
    shipId: 1873, sortId: 0, name: '太平洋深海棲姫', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 960, firepower: 350, armor: 252, torpedo: 120, evasion: 18685, aa: 142, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1874: {
    shipId: 1874, sortId: 0, name: '太平洋深海棲姫-壊', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1875: {
    shipId: 1875, sortId: 0, name: '太平洋深海棲姫-壊', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 930, firepower: 360, armor: 262, torpedo: 130, evasion: 18685, aa: 132, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1876: {
    shipId: 1876, sortId: 0, name: '太平洋深海棲姫-壊', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 960, firepower: 380, armor: 292, torpedo: 150, evasion: 18685, aa: 152, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1877: {
    shipId: 1877, sortId: 0, name: '深海地中海棲姫', yomi: '', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 700, firepower: 150, armor: 88, torpedo: 95, evasion: 18685, aa: 70, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1878: {
    shipId: 1878, sortId: 0, name: '深海地中海棲姫', yomi: '', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 740, firepower: 180, armor: 188, torpedo: 105, evasion: 18685, aa: 80, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1879: {
    shipId: 1879, sortId: 0, name: '深海地中海棲姫', yomi: '', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 790, firepower: 200, armor: 248, torpedo: 125, evasion: 18685, aa: 95, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1880: {
    shipId: 1880, sortId: 0, name: '深海地中海棲姫-壊', yomi: '', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 700, firepower: 170, armor: 148, torpedo: 155, evasion: 18685, aa: 85, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1881: {
    shipId: 1881, sortId: 0, name: '深海地中海棲姫-壊', yomi: '', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 740, firepower: 200, armor: 228, torpedo: 175, evasion: 18685, aa: 100, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1882: {
    shipId: 1882, sortId: 0, name: '深海地中海棲姫-壊', yomi: '', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 790, firepower: 230, armor: 288, torpedo: 195, evasion: 18685, aa: 125, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1883: {
    shipId: 1883, sortId: 0, name: 'アンツィオ沖棲姫', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1884: {
    shipId: 1884, sortId: 0, name: 'アンツィオ沖棲姫', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1885: {
    shipId: 1885, sortId: 0, name: 'アンツィオ沖棲姫', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 888, firepower: 188, armor: 299, torpedo: 228, evasion: 18685, aa: 88, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1886: {
    shipId: 1886, sortId: 0, name: 'アンツィオ沖棲姫-壊', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1887: {
    shipId: 1887, sortId: 0, name: 'アンツィオ沖棲姫-壊', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1888: {
    shipId: 1888, sortId: 0, name: 'アンツィオ沖棲姫-壊', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 888, firepower: 199, armor: 339, torpedo: 299, evasion: 18685, aa: 99, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1889: {
    shipId: 1889, sortId: 0, name: '飛行場姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 500, firepower: 20, armor: 140, torpedo: 0, evasion: 18685, aa: 120, aircraft: 3, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1890: {
    shipId: 1890, sortId: 0, name: '飛行場姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 500, firepower: 30, armor: 140, torpedo: 0, evasion: 18685, aa: 120, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1891: {
    shipId: 1891, sortId: 0, name: '飛行場姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 500, firepower: 40, armor: 140, torpedo: 0, evasion: 18685, aa: 120, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1892: {
    shipId: 1892, sortId: 0, name: '飛行場姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 500, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 3, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1893: {
    shipId: 1893, sortId: 0, name: '飛行場姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 500, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1894: {
    shipId: 1894, sortId: 0, name: '飛行場姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 500, firepower: 90, armor: 140, torpedo: 0, evasion: 18685, aa: 120, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1895: {
    shipId: 1895, sortId: 0, name: '重巡ネ級改', yomi: '', shipClass: 5, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 330, firepower: 118, armor: 144, torpedo: 108, evasion: 18685, aa: 78, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1896: {
    shipId: 1896, sortId: 0, name: '重巡ネ級改', yomi: '', shipClass: 5, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 360, firepower: 128, armor: 222, torpedo: 128, evasion: 18685, aa: 88, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1897: {
    shipId: 1897, sortId: 0, name: '重巡ネ級改', yomi: '', shipClass: 5, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 390, firepower: 148, armor: 255, torpedo: 138, evasion: 18685, aa: 98, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1898: {
    shipId: 1898, sortId: 0, name: 'バタビア沖棲姫', yomi: '', shipClass: 8, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1899: {
    shipId: 1899, sortId: 0, name: 'バタビア沖棲姫', yomi: '', shipClass: 8, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 790, firepower: 190, armor: 233, torpedo: 130, evasion: 18685, aa: 90, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1900: {
    shipId: 1900, sortId: 0, name: 'バタビア沖棲姫', yomi: '', shipClass: 8, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 790, firepower: 230, armor: 266, torpedo: 150, evasion: 18685, aa: 100, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1901: {
    shipId: 1901, sortId: 0, name: 'バタビア沖棲姫-壊', yomi: '', shipClass: 8, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1902: {
    shipId: 1902, sortId: 0, name: 'バタビア沖棲姫-壊', yomi: '', shipClass: 8, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 790, firepower: 220, armor: 244, torpedo: 160, evasion: 18685, aa: 110, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1903: {
    shipId: 1903, sortId: 0, name: 'バタビア沖棲姫-壊', yomi: '', shipClass: 8, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 790, firepower: 270, armor: 333, torpedo: 190, evasion: 18685, aa: 130, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1904: {
    shipId: 1904, sortId: 0, name: '軽巡ヘ級改', yomi: 'flagship', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 115, firepower: 58, armor: 69, torpedo: 80, evasion: 18685, aa: 40, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1905: {
    shipId: 1905, sortId: 0, name: '軽巡ヘ級改', yomi: 'flagship', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 150, firepower: 78, armor: 89, torpedo: 90, evasion: 18685, aa: 50, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1906: {
    shipId: 1906, sortId: 0, name: '空母棲姫改', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1907: {
    shipId: 1907, sortId: 0, name: '空母棲姫改', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 550, firepower: 208, armor: 240, torpedo: 0, evasion: 18685, aa: 180, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1908: {
    shipId: 1908, sortId: 0, name: '空母棲姫改', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 600, firepower: 228, armor: 270, torpedo: 0, evasion: 18685, aa: 200, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1909: {
    shipId: 1909, sortId: 0, name: '防空巡棲姫', yomi: '', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1910: {
    shipId: 1910, sortId: 0, name: '防空巡棲姫', yomi: '', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 755, firepower: 180, armor: 255, torpedo: 135, evasion: 18685, aa: 250, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1911: {
    shipId: 1911, sortId: 0, name: '防空巡棲姫', yomi: '', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 777, firepower: 220, armor: 295, torpedo: 155, evasion: 18685, aa: 270, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1912: {
    shipId: 1912, sortId: 0, name: '防空巡棲姫-壊', yomi: '', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1913: {
    shipId: 1913, sortId: 0, name: '防空巡棲姫-壊', yomi: '', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 755, firepower: 180, armor: 315, torpedo: 165, evasion: 18685, aa: 260, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1914: {
    shipId: 1914, sortId: 0, name: '防空巡棲姫-壊', yomi: '', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 777, firepower: 220, armor: 355, torpedo: 195, evasion: 18685, aa: 280, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1915: {
    shipId: 1915, sortId: 0, name: '潜水棲姫改', yomi: 'flagship', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 3, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1916: {
    shipId: 1916, sortId: 0, name: '潜水棲姫改', yomi: 'flagship', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 3, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1917: {
    shipId: 1917, sortId: 0, name: '潜水棲姫改', yomi: 'flagship', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 490, firepower: 95, armor: 69, torpedo: 195, evasion: 18685, aa: 10, aircraft: 3, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1918: {
    shipId: 1918, sortId: 0, name: '潜水棲姫改-壊', yomi: 'flagship', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 3, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1919: {
    shipId: 1919, sortId: 0, name: '潜水棲姫改-壊', yomi: 'flagship', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 3, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1920: {
    shipId: 1920, sortId: 0, name: '潜水棲姫改-壊', yomi: 'flagship', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 490, firepower: 98, armor: 74, torpedo: 239, evasion: 18685, aa: 10, aircraft: 3, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1921: {
    shipId: 1921, sortId: 0, name: '集積地棲姫II', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1922: {
    shipId: 1922, sortId: 0, name: '集積地棲姫II', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 660, firepower: 90, armor: 130, torpedo: 98, evasion: 18685, aa: 70, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1923: {
    shipId: 1923, sortId: 0, name: '集積地棲姫II', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 990, firepower: 130, armor: 180, torpedo: 118, evasion: 18685, aa: 80, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1924: {
    shipId: 1924, sortId: 0, name: '集積地棲姫II-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1925: {
    shipId: 1925, sortId: 0, name: '集積地棲姫II-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 660, firepower: 160, armor: 170, torpedo: 98, evasion: 18685, aa: 80, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1926: {
    shipId: 1926, sortId: 0, name: '集積地棲姫II-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 990, firepower: 190, armor: 240, torpedo: 118, evasion: 18685, aa: 90, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1927: {
    shipId: 1927, sortId: 0, name: '深海千島棲姫', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 330, firepower: 110, armor: 130, torpedo: 109, evasion: 18685, aa: 49, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1928: {
    shipId: 1928, sortId: 0, name: '深海千島棲姫', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 480, firepower: 140, armor: 160, torpedo: 119, evasion: 18685, aa: 59, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1929: {
    shipId: 1929, sortId: 0, name: '深海千島棲姫', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 590, firepower: 170, armor: 200, torpedo: 139, evasion: 18685, aa: 69, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1930: {
    shipId: 1930, sortId: 0, name: '深海千島棲姫-壊', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1931: {
    shipId: 1931, sortId: 0, name: '深海千島棲姫-壊', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1932: {
    shipId: 1932, sortId: 0, name: '深海千島棲姫-壊', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 590, firepower: 180, armor: 230, torpedo: 149, evasion: 18685, aa: 79, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1933: {
    shipId: 1933, sortId: 0, name: '集積地棲姫II 夏季上陸mode', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1934: {
    shipId: 1934, sortId: 0, name: '集積地棲姫II 夏季上陸mode', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1935: {
    shipId: 1935, sortId: 0, name: '集積地棲姫II 夏季上陸mode', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 2400, firepower: 200, armor: 170, torpedo: 128, evasion: 18685, aa: 80, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1936: {
    shipId: 1936, sortId: 0, name: '集積地棲姫II 夏季上陸mode-壊', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1937: {
    shipId: 1937, sortId: 0, name: '集積地棲姫II 夏季上陸mode-壊', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1938: {
    shipId: 1938, sortId: 0, name: '集積地棲姫II 夏季上陸mode-壊', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 2400, firepower: 240, armor: 230, torpedo: 128, evasion: 18685, aa: 90, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1939: {
    shipId: 1939, sortId: 0, name: '五島沖海底姫', yomi: 'flagship', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1940: {
    shipId: 1940, sortId: 0, name: '五島沖海底姫', yomi: 'flagship', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1941: {
    shipId: 1941, sortId: 0, name: '五島沖海底姫', yomi: 'flagship', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 670, firepower: 47, armor: 47, torpedo: 240, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1942: {
    shipId: 1942, sortId: 0, name: '五島沖海底姫-壊', yomi: 'flagship', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1943: {
    shipId: 1943, sortId: 0, name: '五島沖海底姫-壊', yomi: 'flagship', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1944: {
    shipId: 1944, sortId: 0, name: '五島沖海底姫-壊', yomi: 'flagship', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 670, firepower: 47, armor: 74, torpedo: 290, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1945: {
    shipId: 1945, sortId: 0, name: '駆逐林棲姫', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1946: {
    shipId: 1946, sortId: 0, name: '駆逐林棲姫', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1947: {
    shipId: 1947, sortId: 0, name: '駆逐林棲姫', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 700, firepower: 230, armor: 290, torpedo: 160, evasion: 18685, aa: 140, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1948: {
    shipId: 1948, sortId: 0, name: '駆逐林棲姫-壊', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1949: {
    shipId: 1949, sortId: 0, name: '駆逐林棲姫-壊', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1950: {
    shipId: 1950, sortId: 0, name: '駆逐林棲姫-壊', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 700, firepower: 270, armor: 350, torpedo: 200, evasion: 18685, aa: 170, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1951: {
    shipId: 1951, sortId: 0, name: '駆逐ナ級後期型II', yomi: 'elite', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 66, firepower: 79, armor: 69, torpedo: 113, evasion: 18685, aa: 86, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1952: {
    shipId: 1952, sortId: 0, name: '駆逐ナ級後期型II', yomi: 'flagship', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 69, firepower: 89, armor: 79, torpedo: 123, evasion: 18685, aa: 96, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1953: {
    shipId: 1953, sortId: 0, name: '重巡ネ級改 夏mode', yomi: '', shipClass: 5, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1954: {
    shipId: 1954, sortId: 0, name: '重巡ネ級改 夏mode', yomi: '', shipClass: 5, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 360, firepower: 128, armor: 133, torpedo: 118, evasion: 18685, aa: 78, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1955: {
    shipId: 1955, sortId: 0, name: '重巡ネ級改 夏mode', yomi: '', shipClass: 5, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 390, firepower: 138, armor: 211, torpedo: 138, evasion: 18685, aa: 88, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1956: {
    shipId: 1956, sortId: 0, name: '重巡ネ級改II 夏mode', yomi: '', shipClass: 5, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 470, firepower: 158, armor: 244, torpedo: 148, evasion: 18685, aa: 98, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1957: {
    shipId: 1957, sortId: 0, name: '軽巡棲姫II', yomi: '', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1958: {
    shipId: 1958, sortId: 0, name: '軽巡棲姫II', yomi: '', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1959: {
    shipId: 1959, sortId: 0, name: '軽巡棲姫II', yomi: '', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1960: {
    shipId: 1960, sortId: 0, name: '軽巡棲姫II', yomi: '', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 380, firepower: 99, armor: 239, torpedo: 199, evasion: 18685, aa: 65, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1961: {
    shipId: 1961, sortId: 0, name: '空母夏姫', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1962: {
    shipId: 1962, sortId: 0, name: '空母夏姫', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1963: {
    shipId: 1963, sortId: 0, name: '空母夏姫', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 640, firepower: 200, armor: 189, torpedo: 0, evasion: 18685, aa: 168, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1964: {
    shipId: 1964, sortId: 0, name: '空母夏姫II', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 880, firepower: 248, armor: 239, torpedo: 0, evasion: 18685, aa: 188, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1965: {
    shipId: 1965, sortId: 0, name: '南方戦艦新棲姫', yomi: '', shipClass: 8, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1966: {
    shipId: 1966, sortId: 0, name: '南方戦艦新棲姫', yomi: '', shipClass: 8, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 950, firepower: 310, armor: 260, torpedo: 0, evasion: 18685, aa: 125, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1967: {
    shipId: 1967, sortId: 0, name: '南方戦艦新棲姫', yomi: '', shipClass: 8, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 950, firepower: 330, armor: 300, torpedo: 0, evasion: 18685, aa: 155, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1968: {
    shipId: 1968, sortId: 0, name: '南方戦艦新棲姫-壊', yomi: '', shipClass: 8, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1969: {
    shipId: 1969, sortId: 0, name: '南方戦艦新棲姫-壊', yomi: '', shipClass: 8, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 950, firepower: 340, armor: 310, torpedo: 0, evasion: 18685, aa: 145, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1970: {
    shipId: 1970, sortId: 0, name: '南方戦艦新棲姫-壊', yomi: '', shipClass: 8, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 950, firepower: 360, armor: 370, torpedo: 0, evasion: 18685, aa: 185, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1971: {
    shipId: 1971, sortId: 0, name: '南太平洋空母棲姫', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1972: {
    shipId: 1972, sortId: 0, name: '南太平洋空母棲姫', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1973: {
    shipId: 1973, sortId: 0, name: '南太平洋空母棲姫', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 888, firepower: 288, armor: 318, torpedo: 0, evasion: 18685, aa: 198, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1974: {
    shipId: 1974, sortId: 0, name: '南太平洋空母棲姫-壊', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1975: {
    shipId: 1975, sortId: 0, name: '南太平洋空母棲姫-壊', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1976: {
    shipId: 1976, sortId: 0, name: '南太平洋空母棲姫-壊', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 888, firepower: 308, armor: 388, torpedo: 0, evasion: 18685, aa: 208, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1977: {
    shipId: 1977, sortId: 0, name: '潜水夏姫II', yomi: 'flagship', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 3, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1978: {
    shipId: 1978, sortId: 0, name: '潜水夏姫II', yomi: 'flagship', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 198, firepower: 66, armor: 39, torpedo: 199, evasion: 18685, aa: 10, aircraft: 3, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1979: {
    shipId: 1979, sortId: 0, name: '戦艦新棲姫', yomi: '', shipClass: 8, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 980, firepower: 300, armor: 180, torpedo: 0, evasion: 18685, aa: 115, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1980: {
    shipId: 1980, sortId: 0, name: '戦艦新棲姫', yomi: '', shipClass: 8, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 980, firepower: 310, armor: 240, torpedo: 0, evasion: 18685, aa: 125, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1981: {
    shipId: 1981, sortId: 0, name: '戦艦新棲姫', yomi: '', shipClass: 8, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 980, firepower: 330, armor: 280, torpedo: 0, evasion: 18685, aa: 155, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1982: {
    shipId: 1982, sortId: 0, name: '戦艦新棲姫-壊', yomi: '', shipClass: 8, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1983: {
    shipId: 1983, sortId: 0, name: '戦艦新棲姫-壊', yomi: '', shipClass: 8, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1984: {
    shipId: 1984, sortId: 0, name: '戦艦新棲姫-壊', yomi: '', shipClass: 8, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 980, firepower: 360, armor: 350, torpedo: 0, evasion: 18685, aa: 185, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1985: {
    shipId: 1985, sortId: 0, name: '潜水棲姫改II', yomi: 'flagship', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 3, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1986: {
    shipId: 1986, sortId: 0, name: '潜水棲姫改II', yomi: 'flagship', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 3, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1987: {
    shipId: 1987, sortId: 0, name: '潜水棲姫改II', yomi: 'flagship', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 390, firepower: 99, armor: 79, torpedo: 199, evasion: 18685, aa: 10, aircraft: 3, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1988: {
    shipId: 1988, sortId: 0, name: '深海竹棲姫', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1989: {
    shipId: 1989, sortId: 0, name: '深海竹棲姫', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1990: {
    shipId: 1990, sortId: 0, name: '深海竹棲姫', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 880, firepower: 237, armor: 305, torpedo: 260, evasion: 18685, aa: 130, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1991: {
    shipId: 1991, sortId: 0, name: '深海竹棲姫-壊', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1992: {
    shipId: 1992, sortId: 0, name: '深海竹棲姫-壊', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1993: {
    shipId: 1993, sortId: 0, name: '深海竹棲姫-壊', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 880, firepower: 277, armor: 365, torpedo: 290, evasion: 18685, aa: 160, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1994: {
    shipId: 1994, sortId: 0, name: '集積地棲姫II', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1995: {
    shipId: 1995, sortId: 0, name: '集積地棲姫II-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1996: {
    shipId: 1996, sortId: 0, name: '潜水棲姫改II', yomi: 'flagship', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 3, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1997: {
    shipId: 1997, sortId: 0, name: '空母棲姫改', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1998: {
    shipId: 1998, sortId: 0, name: '軽巡ト級', yomi: 'flagship', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 73, firepower: 69, armor: 69, torpedo: 72, evasion: 18685, aa: 68, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  1999: {
    shipId: 1999, sortId: 0, name: '重巡リ級II', yomi: 'flagship', shipClass: 5, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 80, firepower: 78, armor: 72, torpedo: 67, evasion: 18685, aa: 48, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2000: {
    shipId: 2000, sortId: 0, name: 'ルンガ沖重巡棲姫', yomi: '', shipClass: 8, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2001: {
    shipId: 2001, sortId: 0, name: 'ルンガ沖重巡棲姫', yomi: '', shipClass: 8, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2002: {
    shipId: 2002, sortId: 0, name: 'ルンガ沖重巡棲姫', yomi: '', shipClass: 8, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 870, firepower: 267, armor: 267, torpedo: 167, evasion: 18685, aa: 87, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2003: {
    shipId: 2003, sortId: 0, name: 'ルンガ沖重巡棲姫-壊', yomi: '', shipClass: 8, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2004: {
    shipId: 2004, sortId: 0, name: 'ルンガ沖重巡棲姫-壊', yomi: '', shipClass: 8, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2005: {
    shipId: 2005, sortId: 0, name: 'ルンガ沖重巡棲姫-壊', yomi: '', shipClass: 8, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 870, firepower: 287, armor: 367, torpedo: 197, evasion: 18685, aa: 87, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2006: {
    shipId: 2006, sortId: 0, name: '軽巡新棲姫', yomi: '', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2007: {
    shipId: 2007, sortId: 0, name: '軽巡新棲姫', yomi: '', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 960, firepower: 186, armor: 196, torpedo: 166, evasion: 18685, aa: 66, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2008: {
    shipId: 2008, sortId: 0, name: '軽巡新棲姫', yomi: '', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 960, firepower: 246, armor: 256, torpedo: 186, evasion: 18685, aa: 86, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2009: {
    shipId: 2009, sortId: 0, name: '軽巡新棲姫-壊', yomi: '', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2010: {
    shipId: 2010, sortId: 0, name: '軽巡新棲姫-壊', yomi: '', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 960, firepower: 196, armor: 276, torpedo: 186, evasion: 18685, aa: 88, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2011: {
    shipId: 2011, sortId: 0, name: '軽巡新棲姫-壊', yomi: '', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 960, firepower: 256, armor: 376, torpedo: 206, evasion: 18685, aa: 99, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2012: {
    shipId: 2012, sortId: 0, name: '軽巡ト級', yomi: 'elite', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 63, firepower: 46, armor: 56, torpedo: 58, evasion: 18685, aa: 48, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2013: {
    shipId: 2013, sortId: 0, name: '輸送ワ級II', yomi: 'elite', shipClass: 15, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2014: {
    shipId: 2014, sortId: 0, name: '輸送ワ級II', yomi: 'flagship', shipClass: 15, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 480, firepower: 66, armor: 77, torpedo: 0, evasion: 18685, aa: 55, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2015: {
    shipId: 2015, sortId: 0, name: '集積地棲姫II バカンスmode', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2016: {
    shipId: 2016, sortId: 0, name: '集積地棲姫II バカンスmode', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2017: {
    shipId: 2017, sortId: 0, name: '集積地棲姫II バカンスmode', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 3200, firepower: 148, armor: 166, torpedo: 122, evasion: 18685, aa: 77, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2018: {
    shipId: 2018, sortId: 0, name: '集積地棲姫II バカンスmode', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 4800, firepower: 178, armor: 199, torpedo: 144, evasion: 18685, aa: 99, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2019: {
    shipId: 2019, sortId: 0, name: '集積地棲姫II バカンスmode-壊', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2020: {
    shipId: 2020, sortId: 0, name: '集積地棲姫II バカンスmode-壊', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2021: {
    shipId: 2021, sortId: 0, name: '集積地棲姫II バカンスmode-壊', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 3200, firepower: 168, armor: 199, torpedo: 144, evasion: 18685, aa: 99, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2022: {
    shipId: 2022, sortId: 0, name: '集積地棲姫II バカンスmode-壊', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 4800, firepower: 198, armor: 222, torpedo: 188, evasion: 18685, aa: 111, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2023: {
    shipId: 2023, sortId: 0, name: '港湾夏姫II', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2024: {
    shipId: 2024, sortId: 0, name: '港湾夏姫II', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2025: {
    shipId: 2025, sortId: 0, name: '港湾夏姫II', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 1550, firepower: 200, armor: 220, torpedo: 0, evasion: 18685, aa: 165, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2026: {
    shipId: 2026, sortId: 0, name: '港湾夏姫II-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2027: {
    shipId: 2027, sortId: 0, name: '港湾夏姫II-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2028: {
    shipId: 2028, sortId: 0, name: '港湾夏姫II-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 1550, firepower: 208, armor: 240, torpedo: 0, evasion: 18685, aa: 185, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2029: {
    shipId: 2029, sortId: 0, name: '地中海弩級水姫', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2030: {
    shipId: 2030, sortId: 0, name: '地中海弩級水姫', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 880, firepower: 188, armor: 211, torpedo: 88, evasion: 18685, aa: 62, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2031: {
    shipId: 2031, sortId: 0, name: '地中海弩級水姫', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 930, firepower: 211, armor: 255, torpedo: 98, evasion: 18685, aa: 82, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2032: {
    shipId: 2032, sortId: 0, name: '地中海弩級水姫-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2033: {
    shipId: 2033, sortId: 0, name: '地中海弩級水姫-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2034: {
    shipId: 2034, sortId: 0, name: '地中海弩級水姫-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 930, firepower: 222, armor: 344, torpedo: 128, evasion: 18685, aa: 134, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2035: {
    shipId: 2035, sortId: 0, name: '深海地中海棲姫 バカンスmode', yomi: '', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2036: {
    shipId: 2036, sortId: 0, name: '深海地中海棲姫 バカンスmode', yomi: '', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 740, firepower: 188, armor: 198, torpedo: 118, evasion: 18685, aa: 98, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2037: {
    shipId: 2037, sortId: 0, name: '深海地中海棲姫 バカンスmode', yomi: '', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 790, firepower: 208, armor: 258, torpedo: 138, evasion: 18685, aa: 118, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2038: {
    shipId: 2038, sortId: 0, name: '深海地中海棲姫 バカンスmode-壊', yomi: '', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2039: {
    shipId: 2039, sortId: 0, name: '深海地中海棲姫 バカンスmode-壊', yomi: '', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2040: {
    shipId: 2040, sortId: 0, name: '深海地中海棲姫 バカンスmode-壊', yomi: '', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 790, firepower: 238, armor: 298, torpedo: 198, evasion: 18685, aa: 138, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2041: {
    shipId: 2041, sortId: 0, name: '欧州装甲空母棲姫', yomi: '', shipClass: 18, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2042: {
    shipId: 2042, sortId: 0, name: '欧州装甲空母棲姫', yomi: '', shipClass: 18, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2043: {
    shipId: 2043, sortId: 0, name: '欧州装甲空母棲姫', yomi: '', shipClass: 18, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 1080, firepower: 280, armor: 324, torpedo: 0, evasion: 18685, aa: 200, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2044: {
    shipId: 2044, sortId: 0, name: '欧州装甲空母棲姫-壊', yomi: '', shipClass: 18, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2045: {
    shipId: 2045, sortId: 0, name: '欧州装甲空母棲姫-壊', yomi: '', shipClass: 18, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2046: {
    shipId: 2046, sortId: 0, name: '欧州装甲空母棲姫-壊', yomi: '', shipClass: 18, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 1080, firepower: 300, armor: 392, torpedo: 0, evasion: 18685, aa: 220, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2047: {
    shipId: 2047, sortId: 0, name: '飛行場姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 480, firepower: 50, armor: 120, torpedo: 0, evasion: 18685, aa: 120, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2048: {
    shipId: 2048, sortId: 0, name: '飛行場姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 480, firepower: 60, armor: 120, torpedo: 0, evasion: 18685, aa: 120, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2049: {
    shipId: 2049, sortId: 0, name: '潜水新棲姫', yomi: 'flagship', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 3, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2050: {
    shipId: 2050, sortId: 0, name: '駆逐ナ級IIe(量産型)', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 63, firepower: 69, armor: 61, torpedo: 104, evasion: 18685, aa: 63, aircraft: 3, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2051: {
    shipId: 2051, sortId: 0, name: '駆逐ナ級IIe(量産型)', yomi: 'elite', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 66, firepower: 79, armor: 67, torpedo: 114, evasion: 18685, aa: 69, aircraft: 3, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2052: {
    shipId: 2052, sortId: 0, name: '駆逐ナ級IIe(量産型)', yomi: 'flagship', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 69, firepower: 89, armor: 77, torpedo: 124, evasion: 18685, aa: 79, aircraft: 3, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2053: {
    shipId: 2053, sortId: 0, name: '潜水鮫水鬼', yomi: 'flagship', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 3, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2054: {
    shipId: 2054, sortId: 0, name: '潜水鮫水鬼', yomi: 'flagship', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 3, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2055: {
    shipId: 2055, sortId: 0, name: '潜水鮫水鬼', yomi: 'flagship', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 577, firepower: 83, armor: 79, torpedo: 222, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2056: {
    shipId: 2056, sortId: 0, name: '潜水鮫水鬼-壊', yomi: 'flagship', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 3, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2057: {
    shipId: 2057, sortId: 0, name: '潜水鮫水鬼-壊', yomi: 'flagship', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2058: {
    shipId: 2058, sortId: 0, name: '潜水鮫水鬼-壊', yomi: 'flagship', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 577, firepower: 89, armor: 89, torpedo: 252, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2059: {
    shipId: 2059, sortId: 0, name: 'ヒ船団棲姫', yomi: '', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2060: {
    shipId: 2060, sortId: 0, name: 'ヒ船団棲姫', yomi: '', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 500, firepower: 98, armor: 185, torpedo: 0, evasion: 18685, aa: 84, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2061: {
    shipId: 2061, sortId: 0, name: 'ヒ船団棲姫-壊', yomi: '', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2062: {
    shipId: 2062, sortId: 0, name: 'ヒ船団棲姫-壊', yomi: '', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 500, firepower: 148, armor: 225, torpedo: 0, evasion: 18685, aa: 96, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2063: {
    shipId: 2063, sortId: 0, name: '深海梅棲姫', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2064: {
    shipId: 2064, sortId: 0, name: '深海梅棲姫', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2065: {
    shipId: 2065, sortId: 0, name: '深海梅棲姫', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 800, firepower: 212, armor: 272, torpedo: 151, evasion: 18685, aa: 137, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2066: {
    shipId: 2066, sortId: 0, name: '深海梅棲姫-壊', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2067: {
    shipId: 2067, sortId: 0, name: '深海梅棲姫-壊', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2068: {
    shipId: 2068, sortId: 0, name: '深海梅棲姫-壊', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 800, firepower: 252, armor: 323, torpedo: 181, evasion: 18685, aa: 167, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2069: {
    shipId: 2069, sortId: 0, name: '横浜岸壁棲姫', yomi: '', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2070: {
    shipId: 2070, sortId: 0, name: '横浜岸壁棲姫', yomi: '', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 840, firepower: 106, armor: 292, torpedo: 0, evasion: 18685, aa: 65, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2071: {
    shipId: 2071, sortId: 0, name: '横浜岸壁棲姫-壊', yomi: '', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2072: {
    shipId: 2072, sortId: 0, name: '横浜岸壁棲姫-壊', yomi: '', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 840, firepower: 169, armor: 333, torpedo: 0, evasion: 18685, aa: 85, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2073: {
    shipId: 2073, sortId: 0, name: '深海玉棲姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2074: {
    shipId: 2074, sortId: 0, name: '深海玉棲姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 830, firepower: 140, armor: 196, torpedo: 160, evasion: 18685, aa: 88, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2075: {
    shipId: 2075, sortId: 0, name: '深海玉棲姫-壊', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2076: {
    shipId: 2076, sortId: 0, name: '深海玉棲姫-壊', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 830, firepower: 180, armor: 266, torpedo: 190, evasion: 18685, aa: 108, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2077: {
    shipId: 2077, sortId: 0, name: '超重爆飛行場姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2078: {
    shipId: 2078, sortId: 0, name: '超重爆飛行場姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 600, firepower: 80, armor: 130, torpedo: 0, evasion: 18685, aa: 110, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2079: {
    shipId: 2079, sortId: 0, name: '超重爆飛行場姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2080: {
    shipId: 2080, sortId: 0, name: '防空埋護冬姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 3, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2081: {
    shipId: 2081, sortId: 0, name: '防空埋護冬姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 930, firepower: 240, armor: 320, torpedo: 144, evasion: 18685, aa: 244, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2082: {
    shipId: 2082, sortId: 0, name: '防空埋護冬姫-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2083: {
    shipId: 2083, sortId: 0, name: '防空埋護冬姫-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 930, firepower: 280, armor: 380, torpedo: 155, evasion: 18685, aa: 288, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2084: {
    shipId: 2084, sortId: 0, name: '集積地棲姫III', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2085: {
    shipId: 2085, sortId: 0, name: '集積地棲姫III-壊', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2086: {
    shipId: 2086, sortId: 0, name: '集積地棲姫III', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2087: {
    shipId: 2087, sortId: 0, name: '集積地棲姫III-壊', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2088: {
    shipId: 2088, sortId: 0, name: '集積地棲姫III', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 6000, firepower: 133, armor: 188, torpedo: 128, evasion: 18685, aa: 93, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2089: {
    shipId: 2089, sortId: 0, name: '集積地棲姫III-壊', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 6000, firepower: 193, armor: 222, torpedo: 148, evasion: 18685, aa: 103, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2090: {
    shipId: 2090, sortId: 0, name: '重巡ネ級改', yomi: '', shipClass: 5, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2091: {
    shipId: 2091, sortId: 0, name: '飛行場姫(哨戒機配備)', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 300, firepower: 40, armor: 120, torpedo: 0, evasion: 18685, aa: 100, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2092: {
    shipId: 2092, sortId: 0, name: '飛行場姫(哨戒機配備)', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 400, firepower: 50, armor: 130, torpedo: 0, evasion: 18685, aa: 110, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2093: {
    shipId: 2093, sortId: 0, name: '飛行場姫(哨戒機配備)', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 500, firepower: 60, armor: 140, torpedo: 0, evasion: 18685, aa: 120, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2094: {
    shipId: 2094, sortId: 0, name: '飛行場姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 300, firepower: 40, armor: 120, torpedo: 0, evasion: 18685, aa: 100, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2095: {
    shipId: 2095, sortId: 0, name: '飛行場姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 400, firepower: 50, armor: 130, torpedo: 0, evasion: 18685, aa: 110, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2096: {
    shipId: 2096, sortId: 0, name: '飛行場姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 500, firepower: 60, armor: 140, torpedo: 0, evasion: 18685, aa: 120, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2097: {
    shipId: 2097, sortId: 0, name: '外南洋駆逐棲姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2098: {
    shipId: 2098, sortId: 0, name: '外南洋駆逐棲姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 870, firepower: 177, armor: 262, torpedo: 118, evasion: 18685, aa: 108, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2099: {
    shipId: 2099, sortId: 0, name: '外南洋駆逐棲姫-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2100: {
    shipId: 2100, sortId: 0, name: '外南洋駆逐棲姫-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 870, firepower: 188, armor: 292, torpedo: 148, evasion: 18685, aa: 118, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2101: {
    shipId: 2101, sortId: 0, name: '軽母ヌ級II', yomi: 'elite', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 73, firepower: 23, armor: 17, torpedo: 0, evasion: 18685, aa: 18, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2102: {
    shipId: 2102, sortId: 0, name: '軽母ヌ級II', yomi: 'elite', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 83, firepower: 33, armor: 37, torpedo: 0, evasion: 18685, aa: 23, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2103: {
    shipId: 2103, sortId: 0, name: '軽母ヌ級II', yomi: 'elite', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 93, firepower: 43, armor: 67, torpedo: 0, evasion: 18685, aa: 53, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2104: {
    shipId: 2104, sortId: 0, name: '軽母ヌ級II', yomi: 'flagship', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 133, firepower: 53, armor: 97, torpedo: 0, evasion: 18685, aa: 73, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2105: {
    shipId: 2105, sortId: 0, name: '空母棲姫II', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2106: {
    shipId: 2106, sortId: 0, name: '空母棲姫II', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 600, firepower: 198, armor: 228, torpedo: 0, evasion: 18685, aa: 160, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2107: {
    shipId: 2107, sortId: 0, name: '空母棲姫II', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 720, firepower: 208, armor: 248, torpedo: 0, evasion: 18685, aa: 180, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2108: {
    shipId: 2108, sortId: 0, name: '空母棲姫II', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 790, firepower: 228, armor: 288, torpedo: 0, evasion: 18685, aa: 200, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2109: {
    shipId: 2109, sortId: 0, name: '近代化戦艦棲姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2110: {
    shipId: 2110, sortId: 0, name: '近代化戦艦棲姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 960, firepower: 330, armor: 248, torpedo: 98, evasion: 18685, aa: 118, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2111: {
    shipId: 2111, sortId: 0, name: '近代化戦艦棲姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 1060, firepower: 350, armor: 318, torpedo: 118, evasion: 18685, aa: 138, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2112: {
    shipId: 2112, sortId: 0, name: '近代化戦艦棲姫-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2113: {
    shipId: 2113, sortId: 0, name: '近代化戦艦棲姫-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2114: {
    shipId: 2114, sortId: 0, name: '近代化戦艦棲姫-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 1060, firepower: 380, armor: 348, torpedo: 148, evasion: 18685, aa: 168, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2115: {
    shipId: 2115, sortId: 0, name: '空母ヲ級改II', yomi: 'flagship', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 380, firepower: 66, armor: 120, torpedo: 0, evasion: 18685, aa: 90, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2116: {
    shipId: 2116, sortId: 0, name: '空母ヲ級改II', yomi: 'flagship', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 500, firepower: 88, armor: 160, torpedo: 0, evasion: 18685, aa: 110, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2117: {
    shipId: 2117, sortId: 0, name: '空母夏姫II', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2118: {
    shipId: 2118, sortId: 0, name: '空母夏姫II', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 890, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2119: {
    shipId: 2119, sortId: 0, name: '空母夏姫II', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 900, firepower: 248, armor: 229, torpedo: 0, evasion: 18685, aa: 188, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2120: {
    shipId: 2120, sortId: 0, name: '高速軽空母水鬼', yomi: '', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2121: {
    shipId: 2121, sortId: 0, name: '高速軽空母水鬼', yomi: '', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 840, firepower: 198, armor: 228, torpedo: 0, evasion: 18685, aa: 130, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2122: {
    shipId: 2122, sortId: 0, name: '高速軽空母水鬼', yomi: '', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 880, firepower: 218, armor: 288, torpedo: 0, evasion: 18685, aa: 160, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2123: {
    shipId: 2123, sortId: 0, name: '高速軽空母水鬼-壊', yomi: '', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2124: {
    shipId: 2124, sortId: 0, name: '高速軽空母水鬼-壊', yomi: '', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 840, firepower: 288, armor: 268, torpedo: 0, evasion: 18685, aa: 180, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2125: {
    shipId: 2125, sortId: 0, name: '高速軽空母水鬼-壊', yomi: '', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 880, firepower: 318, armor: 328, torpedo: 0, evasion: 18685, aa: 200, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2126: {
    shipId: 2126, sortId: 0, name: '試作空母姫 バカンスmode', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2127: {
    shipId: 2127, sortId: 0, name: '試作空母姫 バカンスmode', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2128: {
    shipId: 2128, sortId: 0, name: '試作空母姫 バカンスmode', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 920, firepower: 240, armor: 277, torpedo: 0, evasion: 18685, aa: 180, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2129: {
    shipId: 2129, sortId: 0, name: '試作空母姫 バカンスmode-壊', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2130: {
    shipId: 2130, sortId: 0, name: '試作空母姫 バカンスmode-壊', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2131: {
    shipId: 2131, sortId: 0, name: '試作空母姫 バカンスmode-壊', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 920, firepower: 320, armor: 298, torpedo: 0, evasion: 18685, aa: 210, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2132: {
    shipId: 2132, sortId: 0, name: '戦艦未完棲姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2133: {
    shipId: 2133, sortId: 0, name: '戦艦未完棲姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2134: {
    shipId: 2134, sortId: 0, name: '戦艦未完棲姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 1070, firepower: 400, armor: 240, torpedo: 0, evasion: 18685, aa: 190, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2135: {
    shipId: 2135, sortId: 0, name: '戦艦未完棲姫-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2136: {
    shipId: 2136, sortId: 0, name: '戦艦未完棲姫-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2137: {
    shipId: 2137, sortId: 0, name: '戦艦未完棲姫-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 1070, firepower: 440, armor: 360, torpedo: 0, evasion: 18685, aa: 230, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2138: {
    shipId: 2138, sortId: 0, name: '集積地棲姫III バカンスmode', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2139: {
    shipId: 2139, sortId: 0, name: '集積地棲姫III バカンスmode-壊', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2140: {
    shipId: 2140, sortId: 0, name: '集積地棲姫III バカンスmode', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2141: {
    shipId: 2141, sortId: 0, name: '集積地棲姫III バカンスmode-壊', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2142: {
    shipId: 2142, sortId: 0, name: '集積地棲姫III バカンスmode', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 3600, firepower: 110, armor: 41, torpedo: 78, evasion: 18685, aa: 71, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2143: {
    shipId: 2143, sortId: 0, name: '集積地棲姫III バカンスmode-壊', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 3600, firepower: 138, armor: 161, torpedo: 122, evasion: 18685, aa: 91, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2144: {
    shipId: 2144, sortId: 0, name: '集積地棲姫III バカンスmode', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 7200, firepower: 168, armor: 191, torpedo: 144, evasion: 18685, aa: 101, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2145: {
    shipId: 2145, sortId: 0, name: '集積地棲姫III バカンスmode-壊', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 7200, firepower: 198, armor: 221, torpedo: 188, evasion: 18685, aa: 121, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2146: {
    shipId: 2146, sortId: 0, name: '戦標船改装棲姫', yomi: '', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 5, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2147: {
    shipId: 2147, sortId: 0, name: '戦標船改装棲姫', yomi: '', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 5, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2148: {
    shipId: 2148, sortId: 0, name: '戦標船改装棲姫', yomi: '', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 1030, firepower: 219, armor: 282, torpedo: 109, evasion: 18685, aa: 159, aircraft: 5, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2149: {
    shipId: 2149, sortId: 0, name: '戦標船改装棲姫-壊', yomi: '', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 5, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2150: {
    shipId: 2150, sortId: 0, name: '戦標船改装棲姫-壊', yomi: '', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 5, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2151: {
    shipId: 2151, sortId: 0, name: '戦標船改装棲姫-壊', yomi: '', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 1030, firepower: 289, armor: 353, torpedo: 169, evasion: 18685, aa: 189, aircraft: 5, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2152: {
    shipId: 2152, sortId: 0, name: '深海重巡水姫', yomi: '', shipClass: 6, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2153: {
    shipId: 2153, sortId: 0, name: '深海重巡水姫', yomi: '', shipClass: 6, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 840, firepower: 168, armor: 158, torpedo: 98, evasion: 18685, aa: 108, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2154: {
    shipId: 2154, sortId: 0, name: '深海重巡水姫', yomi: '', shipClass: 6, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 940, firepower: 198, armor: 208, torpedo: 128, evasion: 18685, aa: 128, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2155: {
    shipId: 2155, sortId: 0, name: '深海重巡水姫-壊', yomi: '', shipClass: 6, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2156: {
    shipId: 2156, sortId: 0, name: '深海重巡水姫-壊', yomi: '', shipClass: 6, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 840, firepower: 208, armor: 198, torpedo: 118, evasion: 18685, aa: 138, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2157: {
    shipId: 2157, sortId: 0, name: '深海重巡水姫-壊', yomi: '', shipClass: 6, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 940, firepower: 238, armor: 268, torpedo: 148, evasion: 18685, aa: 158, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2158: {
    shipId: 2158, sortId: 0, name: '深海擱座揚陸姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 5, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2159: {
    shipId: 2159, sortId: 0, name: '深海擱座揚陸姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 5, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2160: {
    shipId: 2160, sortId: 0, name: '深海擱座揚陸姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 1080, firepower: 121, armor: 303, torpedo: 99, evasion: 18685, aa: 80, aircraft: 5, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2161: {
    shipId: 2161, sortId: 0, name: '深海擱座揚陸姫-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 5, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2162: {
    shipId: 2162, sortId: 0, name: '深海擱座揚陸姫-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 5, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2163: {
    shipId: 2163, sortId: 0, name: '深海擱座揚陸姫-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 1080, firepower: 161, armor: 383, torpedo: 141, evasion: 18685, aa: 100, aircraft: 5, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2164: {
    shipId: 2164, sortId: 0, name: '集積地棲姫IV', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2165: {
    shipId: 2165, sortId: 0, name: '集積地棲姫IV-壊', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2166: {
    shipId: 2166, sortId: 0, name: '集積地棲姫IV', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2167: {
    shipId: 2167, sortId: 0, name: '集積地棲姫IV-壊', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2168: {
    shipId: 2168, sortId: 0, name: '集積地棲姫IV', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 5, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2169: {
    shipId: 2169, sortId: 0, name: '集積地棲姫IV-壊', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 5, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2170: {
    shipId: 2170, sortId: 0, name: '集積地棲姫IV', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 8000, firepower: 170, armor: 181, torpedo: 150, evasion: 18685, aa: 110, aircraft: 5, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2171: {
    shipId: 2171, sortId: 0, name: '集積地棲姫IV-壊', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 8000, firepower: 200, armor: 222, torpedo: 180, evasion: 18685, aa: 130, aircraft: 5, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2172: {
    shipId: 2172, sortId: 0, name: '深海釧路沖棲雲姫', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2173: {
    shipId: 2173, sortId: 0, name: '深海釧路沖棲雲姫', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2174: {
    shipId: 2174, sortId: 0, name: '深海釧路沖棲雲姫', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 736, firepower: 177, armor: 226, torpedo: 149, evasion: 18685, aa: 69, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2175: {
    shipId: 2175, sortId: 0, name: '深海釧路沖棲雲姫-壊', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2176: {
    shipId: 2176, sortId: 0, name: '深海釧路沖棲雲姫-壊', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2177: {
    shipId: 2177, sortId: 0, name: '深海釧路沖棲雲姫-壊', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 736, firepower: 188, armor: 276, torpedo: 159, evasion: 18685, aa: 79, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2178: {
    shipId: 2178, sortId: 0, name: 'トーチカ小鬼', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 180, firepower: 130, armor: 95, torpedo: 0, evasion: 18685, aa: 22, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2179: {
    shipId: 2179, sortId: 0, name: 'トーチカ小鬼', yomi: 'elite', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 280, firepower: 160, armor: 135, torpedo: 0, evasion: 18685, aa: 44, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2180: {
    shipId: 2180, sortId: 0, name: '対空小鬼', yomi: '', shipClass: 6, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 88, firepower: 48, armor: 60, torpedo: 0, evasion: 18685, aa: 80, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2181: {
    shipId: 2181, sortId: 0, name: '対空小鬼', yomi: 'elite', shipClass: 6, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 188, firepower: 88, armor: 95, torpedo: 0, evasion: 18685, aa: 88, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2182: {
    shipId: 2182, sortId: 0, name: '標準型戦艦棲姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2183: {
    shipId: 2183, sortId: 0, name: '標準型戦艦棲姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2184: {
    shipId: 2184, sortId: 0, name: '標準型戦艦棲姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 1030, firepower: 350, armor: 308, torpedo: 108, evasion: 18685, aa: 128, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2185: {
    shipId: 2185, sortId: 0, name: '標準型戦艦棲姫-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2186: {
    shipId: 2186, sortId: 0, name: '標準型戦艦棲姫-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2187: {
    shipId: 2187, sortId: 0, name: '標準型戦艦棲姫-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 1030, firepower: 390, armor: 338, torpedo: 148, evasion: 18685, aa: 158, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2188: {
    shipId: 2188, sortId: 0, name: 'トーチカ要塞棲姫', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2189: {
    shipId: 2189, sortId: 0, name: 'トーチカ要塞棲姫', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 1600, firepower: 300, armor: 170, torpedo: 0, evasion: 18685, aa: 44, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2190: {
    shipId: 2190, sortId: 0, name: 'トーチカ要塞棲姫-壊', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2191: {
    shipId: 2191, sortId: 0, name: 'トーチカ要塞棲姫-壊', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 1600, firepower: 300, armor: 215, torpedo: 0, evasion: 18685, aa: 72, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2192: {
    shipId: 2192, sortId: 0, name: 'Schnellboot小鬼群', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 19, firepower: 19, armor: 37, torpedo: 102, evasion: 18685, aa: 23, aircraft: 3, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2193: {
    shipId: 2193, sortId: 0, name: 'Schnellboot小鬼群', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 29, firepower: 29, armor: 37, torpedo: 102, evasion: 18685, aa: 33, aircraft: 3, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2194: {
    shipId: 2194, sortId: 0, name: 'Schnellboot小鬼群', yomi: 'elite', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 39, firepower: 39, armor: 47, torpedo: 122, evasion: 18685, aa: 43, aircraft: 3, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2196: {
    shipId: 2196, sortId: 0, name: 'トーチカ小鬼', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2197: {
    shipId: 2197, sortId: 0, name: 'トーチカ小鬼', yomi: 'elite', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 280, firepower: 160, armor: 135, torpedo: 0, evasion: 18685, aa: 44, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2198: {
    shipId: 2198, sortId: 0, name: '欧州妹姫', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2199: {
    shipId: 2199, sortId: 0, name: '欧州妹姫', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2200: {
    shipId: 2200, sortId: 0, name: '欧州妹姫', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 1100, firepower: 360, armor: 292, torpedo: 0, evasion: 18685, aa: 150, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2201: {
    shipId: 2201, sortId: 0, name: '欧州妹姫-壊', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2202: {
    shipId: 2202, sortId: 0, name: '欧州妹姫-壊', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2203: {
    shipId: 2203, sortId: 0, name: '欧州妹姫-壊', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 1100, firepower: 420, armor: 373, torpedo: 171, evasion: 18685, aa: 180, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2204: {
    shipId: 2204, sortId: 0, name: '米駆逐棲姫', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2205: {
    shipId: 2205, sortId: 0, name: '米駆逐棲姫', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 600, firepower: 115, armor: 175, torpedo: 125, evasion: 18685, aa: 130, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2206: {
    shipId: 2206, sortId: 0, name: '米駆逐棲姫', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 760, firepower: 155, armor: 225, torpedo: 155, evasion: 18685, aa: 150, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2207: {
    shipId: 2207, sortId: 0, name: '米駆逐棲姫-壊', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2208: {
    shipId: 2208, sortId: 0, name: '米駆逐棲姫-壊', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2209: {
    shipId: 2209, sortId: 0, name: '米駆逐棲姫-壊', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 760, firepower: 195, armor: 275, torpedo: 185, evasion: 18685, aa: 180, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2210: {
    shipId: 2210, sortId: 0, name: '環礁空母泊地棲姫', yomi: '', shipClass: 6, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2211: {
    shipId: 2211, sortId: 0, name: '環礁空母泊地棲姫', yomi: '', shipClass: 6, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2212: {
    shipId: 2212, sortId: 0, name: '環礁空母泊地棲姫', yomi: '', shipClass: 6, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 1000, firepower: 200, armor: 230, torpedo: 160, evasion: 18685, aa: 135, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2213: {
    shipId: 2213, sortId: 0, name: '環礁空母泊地棲姫-壊', yomi: '', shipClass: 6, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2214: {
    shipId: 2214, sortId: 0, name: '環礁空母泊地棲姫-壊', yomi: '', shipClass: 6, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2215: {
    shipId: 2215, sortId: 0, name: '環礁空母泊地棲姫-壊', yomi: '', shipClass: 6, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 1000, firepower: 280, armor: 290, torpedo: 240, evasion: 18685, aa: 165, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2216: {
    shipId: 2216, sortId: 0, name: '米駆逐棲姫(量産型)', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2217: {
    shipId: 2217, sortId: 0, name: '米駆逐棲姫(量産型)', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 550, firepower: 110, armor: 125, torpedo: 121, evasion: 18685, aa: 120, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2218: {
    shipId: 2218, sortId: 0, name: '米駆逐棲姫(量産型)', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 700, firepower: 150, armor: 175, torpedo: 151, evasion: 18685, aa: 140, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2219: {
    shipId: 2219, sortId: 0, name: '米駆逐棲姫(量産型)-壊', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2220: {
    shipId: 2220, sortId: 0, name: '米駆逐棲姫(量産型)-壊', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 550, firepower: 150, armor: 145, torpedo: 141, evasion: 18685, aa: 140, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2221: {
    shipId: 2221, sortId: 0, name: '米駆逐棲姫(量産型)-壊', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 700, firepower: 190, armor: 240, torpedo: 181, evasion: 18685, aa: 170, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2222: {
    shipId: 2222, sortId: 0, name: '新量産空母棲姫', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2223: {
    shipId: 2223, sortId: 0, name: '新量産空母棲姫', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2224: {
    shipId: 2224, sortId: 0, name: '新量産空母棲姫', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 980, firepower: 280, armor: 240, torpedo: 0, evasion: 18685, aa: 180, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2225: {
    shipId: 2225, sortId: 0, name: '新量産空母棲姫-壊', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2226: {
    shipId: 2226, sortId: 0, name: '新量産空母棲姫-壊', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2227: {
    shipId: 2227, sortId: 0, name: '新量産空母棲姫-壊', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 980, firepower: 320, armor: 280, torpedo: 0, evasion: 18685, aa: 190, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2228: {
    shipId: 2228, sortId: 0, name: '深海伊号水姫', yomi: 'flagship', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2229: {
    shipId: 2229, sortId: 0, name: '深海伊号水姫', yomi: 'flagship', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2230: {
    shipId: 2230, sortId: 0, name: '深海伊号水姫', yomi: 'flagship', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 641, firepower: 85, armor: 69, torpedo: 232, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2231: {
    shipId: 2231, sortId: 0, name: '深海伊号水姫-壊', yomi: 'flagship', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2232: {
    shipId: 2232, sortId: 0, name: '深海伊号水姫-壊', yomi: 'flagship', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2233: {
    shipId: 2233, sortId: 0, name: '深海伊号水姫-壊', yomi: 'flagship', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 641, firepower: 99, armor: 82, torpedo: 272, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2234: {
    shipId: 2234, sortId: 0, name: '飛行場夏姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 220, firepower: 40, armor: 70, torpedo: 0, evasion: 18685, aa: 70, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2235: {
    shipId: 2235, sortId: 0, name: '飛行場夏姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 330, firepower: 54, armor: 80, torpedo: 0, evasion: 18685, aa: 80, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2236: {
    shipId: 2236, sortId: 0, name: '飛行場夏姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 440, firepower: 80, armor: 90, torpedo: 0, evasion: 18685, aa: 90, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2237: {
    shipId: 2237, sortId: 0, name: '軽巡仏棲姫', yomi: '', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 3, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2238: {
    shipId: 2238, sortId: 0, name: '軽巡仏棲姫', yomi: '', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2239: {
    shipId: 2239, sortId: 0, name: '軽巡仏棲姫', yomi: '', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 910, firepower: 241, armor: 250, torpedo: 161, evasion: 18685, aa: 81, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2240: {
    shipId: 2240, sortId: 0, name: '軽巡仏棲姫-壊', yomi: '', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2241: {
    shipId: 2241, sortId: 0, name: '軽巡仏棲姫-壊', yomi: '', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2242: {
    shipId: 2242, sortId: 0, name: '軽巡仏棲姫-壊', yomi: '', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 910, firepower: 261, armor: 350, torpedo: 181, evasion: 18685, aa: 91, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2243: {
    shipId: 2243, sortId: 0, name: '港湾棲姫 休日mode', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2244: {
    shipId: 2244, sortId: 0, name: '港湾棲姫 休日mode', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 1700, firepower: 227, armor: 117, torpedo: 0, evasion: 18685, aa: 167, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2245: {
    shipId: 2245, sortId: 0, name: '港湾棲姫 休日mode-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2246: {
    shipId: 2246, sortId: 0, name: '港湾棲姫 休日mode-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 1700, firepower: 247, armor: 247, torpedo: 0, evasion: 18685, aa: 187, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2247: {
    shipId: 2247, sortId: 0, name: '太平洋飛行場姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 300, firepower: 40, armor: 44, torpedo: 0, evasion: 18685, aa: 70, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2248: {
    shipId: 2248, sortId: 0, name: '太平洋飛行場姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 400, firepower: 54, armor: 66, torpedo: 0, evasion: 18685, aa: 80, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2249: {
    shipId: 2249, sortId: 0, name: '太平洋飛行場姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 500, firepower: 80, armor: 88, torpedo: 0, evasion: 18685, aa: 90, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2250: {
    shipId: 2250, sortId: 0, name: '集積地棲姫V バカンスmode', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2251: {
    shipId: 2251, sortId: 0, name: '集積地棲姫V バカンスmode-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2252: {
    shipId: 2252, sortId: 0, name: '集積地棲姫V バカンスmode', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 5, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2253: {
    shipId: 2253, sortId: 0, name: '集積地棲姫V バカンスmode-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 5, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2254: {
    shipId: 2254, sortId: 0, name: '集積地棲姫V バカンスmode', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 8600, firepower: 170, armor: 188, torpedo: 160, evasion: 18685, aa: 110, aircraft: 5, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2255: {
    shipId: 2255, sortId: 0, name: '集積地棲姫V バカンスmode-壊', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 5, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2256: {
    shipId: 2256, sortId: 0, name: '深海珊瑚海水鬼', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2257: {
    shipId: 2257, sortId: 0, name: '深海珊瑚海水鬼', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2258: {
    shipId: 2258, sortId: 0, name: '深海珊瑚海水鬼', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 1350, firepower: 242, armor: 282, torpedo: 0, evasion: 18685, aa: 162, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2259: {
    shipId: 2259, sortId: 0, name: '深海珊瑚海水鬼-壊', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2260: {
    shipId: 2260, sortId: 0, name: '深海珊瑚海水鬼-壊', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2261: {
    shipId: 2261, sortId: 0, name: '深海珊瑚海水鬼-壊', yomi: '', shipClass: 11, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 1350, firepower: 272, armor: 322, torpedo: 0, evasion: 18685, aa: 192, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2262: {
    shipId: 2262, sortId: 0, name: '駆逐ラ級(初期型)', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 290, firepower: 88, armor: 79, torpedo: 108, evasion: 18685, aa: 68, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2263: {
    shipId: 2263, sortId: 0, name: '駆逐ラ級', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 490, firepower: 118, armor: 119, torpedo: 128, evasion: 18685, aa: 128, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2264: {
    shipId: 2264, sortId: 0, name: '駆逐ラ級', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 690, firepower: 158, armor: 169, torpedo: 158, evasion: 18685, aa: 148, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2265: {
    shipId: 2265, sortId: 0, name: '駆逐ラ級(初期型)-壊', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 290, firepower: 118, armor: 99, torpedo: 128, evasion: 18685, aa: 88, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2266: {
    shipId: 2266, sortId: 0, name: '駆逐ラ級-壊', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2267: {
    shipId: 2267, sortId: 0, name: '駆逐ラ級-壊', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 690, firepower: 208, armor: 269, torpedo: 188, evasion: 18685, aa: 178, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2268: {
    shipId: 2268, sortId: 0, name: '輸送ワ級II(揚陸中)', yomi: 'elite', shipClass: 15, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 280, firepower: 33, armor: 35, torpedo: 0, evasion: 18685, aa: 33, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2269: {
    shipId: 2269, sortId: 0, name: '輸送ワ級II(揚陸中)', yomi: 'flagship', shipClass: 15, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 480, firepower: 66, armor: 68, torpedo: 0, evasion: 18685, aa: 55, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2270: {
    shipId: 2270, sortId: 0, name: '駆逐ラ級(初期型)', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 290, firepower: 88, armor: 77, torpedo: 111, evasion: 18685, aa: 78, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2271: {
    shipId: 2271, sortId: 0, name: '駆逐ラ級', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 490, firepower: 118, armor: 117, torpedo: 131, evasion: 18685, aa: 138, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2272: {
    shipId: 2272, sortId: 0, name: '駆逐ラ級', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 690, firepower: 158, armor: 167, torpedo: 161, evasion: 18685, aa: 158, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2273: {
    shipId: 2273, sortId: 0, name: '駆逐ラ級(初期型)-壊', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2274: {
    shipId: 2274, sortId: 0, name: '駆逐ラ級-壊', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 490, firepower: 158, armor: 137, torpedo: 161, evasion: 18685, aa: 158, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2275: {
    shipId: 2275, sortId: 0, name: '駆逐ラ級-壊', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 690, firepower: 208, armor: 267, torpedo: 191, evasion: 18685, aa: 188, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2276: {
    shipId: 2276, sortId: 0, name: '潜水鰆水鬼', yomi: '', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 3, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2277: {
    shipId: 2277, sortId: 0, name: '潜水鰆水鬼', yomi: '', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 3, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2278: {
    shipId: 2278, sortId: 0, name: '潜水鰆水鬼', yomi: '', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 588, firepower: 83, armor: 83, torpedo: 222, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2279: {
    shipId: 2279, sortId: 0, name: '潜水鰆水鬼-壊', yomi: '', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 3, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2280: {
    shipId: 2280, sortId: 0, name: '潜水鰆水鬼-壊', yomi: '', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2281: {
    shipId: 2281, sortId: 0, name: '潜水鰆水鬼-壊', yomi: '', shipClass: 13, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 588, firepower: 89, armor: 93, torpedo: 252, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2282: {
    shipId: 2282, sortId: 0, name: '条約外巡洋艦水姫', yomi: '', shipClass: 6, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2283: {
    shipId: 2283, sortId: 0, name: '条約外巡洋艦水姫', yomi: '', shipClass: 6, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2284: {
    shipId: 2284, sortId: 0, name: '条約外巡洋艦水姫', yomi: '', shipClass: 6, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 760, firepower: 189, armor: 239, torpedo: 119, evasion: 18685, aa: 129, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2285: {
    shipId: 2285, sortId: 0, name: '条約外巡洋艦水姫-壊', yomi: '', shipClass: 6, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2286: {
    shipId: 2286, sortId: 0, name: '条約外巡洋艦水姫-壊', yomi: '', shipClass: 6, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2287: {
    shipId: 2287, sortId: 0, name: '条約外巡洋艦水姫-壊', yomi: '', shipClass: 6, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 760, firepower: 219, armor: 299, torpedo: 149, evasion: 18685, aa: 149, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2288: {
    shipId: 2288, sortId: 0, name: '駆逐ラ級γ(初期型)', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 292, firepower: 92, armor: 78, torpedo: 113, evasion: 18685, aa: 78, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2289: {
    shipId: 2289, sortId: 0, name: '駆逐ラ級γ', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 492, firepower: 122, armor: 118, torpedo: 133, evasion: 18685, aa: 138, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2290: {
    shipId: 2290, sortId: 0, name: '駆逐ラ級γ', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 696, firepower: 162, armor: 168, torpedo: 163, evasion: 18685, aa: 158, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2291: {
    shipId: 2291, sortId: 0, name: '駆逐ラ級δ(初期型)', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 294, firepower: 98, armor: 81, torpedo: 121, evasion: 18685, aa: 88, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2292: {
    shipId: 2292, sortId: 0, name: '駆逐ラ級δ', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 494, firepower: 128, armor: 121, torpedo: 141, evasion: 18685, aa: 148, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2293: {
    shipId: 2293, sortId: 0, name: '駆逐ラ級δ', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 699, firepower: 168, armor: 171, torpedo: 171, evasion: 18685, aa: 168, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2294: {
    shipId: 2294, sortId: 0, name: '駆逐ラ級ζ', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2295: {
    shipId: 2295, sortId: 0, name: '駆逐ラ級ζ', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2296: {
    shipId: 2296, sortId: 0, name: '駆逐ラ級ζ', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 660, firepower: 168, armor: 222, torpedo: 191, evasion: 18685, aa: 168, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2297: {
    shipId: 2297, sortId: 0, name: '駆逐ラ級ζ-壊', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2298: {
    shipId: 2298, sortId: 0, name: '駆逐ラ級ζ-壊', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2299: {
    shipId: 2299, sortId: 0, name: '駆逐ラ級ζ-壊', yomi: '', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 660, firepower: 208, armor: 282, torpedo: 222, evasion: 18685, aa: 198, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2300: {
    shipId: 2300, sortId: 0, name: '軽巡新棲姫', yomi: '', shipClass: 3, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2301: {
    shipId: 2301, sortId: 0, name: '集積地棲姫改', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2302: {
    shipId: 2302, sortId: 0, name: '集積地棲姫改', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2303: {
    shipId: 2303, sortId: 0, name: '集積地棲姫改', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 9800, firepower: 130, armor: 208, torpedo: 130, evasion: 18685, aa: 95, aircraft: 5, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2304: {
    shipId: 2304, sortId: 0, name: '集積地棲姫改-壊', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 5, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2305: {
    shipId: 2305, sortId: 0, name: '集積地棲姫改-壊', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 5, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2306: {
    shipId: 2306, sortId: 0, name: '集積地棲姫改-壊', yomi: '', shipClass: 9, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 9800, firepower: 210, armor: 248, torpedo: 190, evasion: 18685, aa: 145, aircraft: 5, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2307: {
    shipId: 2307, sortId: 0, name: '飛行場棲姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 330, firepower: 48, armor: 33, torpedo: 0, evasion: 18685, aa: 68, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2308: {
    shipId: 2308, sortId: 0, name: '飛行場棲姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 440, firepower: 68, armor: 55, torpedo: 0, evasion: 18685, aa: 88, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2309: {
    shipId: 2309, sortId: 0, name: '飛行場棲姫', yomi: '', shipClass: 10, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 550, firepower: 98, armor: 77, torpedo: 0, evasion: 18685, aa: 118, aircraft: 4, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2310: {
    shipId: 2310, sortId: 0, name: '軽母ヌ級', yomi: 'elite', shipClass: 7, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 3, speed: 5, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2311: {
    shipId: 2311, sortId: 0, name: '重巡新棲姫', yomi: '', shipClass: 6, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2312: {
    shipId: 2312, sortId: 0, name: '重巡新棲姫', yomi: '', shipClass: 6, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2313: {
    shipId: 2313, sortId: 0, name: '重巡新棲姫', yomi: '', shipClass: 6, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 1030, firepower: 252, armor: 239, torpedo: 131, evasion: 18685, aa: 131, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2314: {
    shipId: 2314, sortId: 0, name: '重巡新棲姫-壊', yomi: '', shipClass: 6, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2315: {
    shipId: 2315, sortId: 0, name: '重巡新棲姫-壊', yomi: '', shipClass: 6, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 20, firepower: 10, armor: 10, torpedo: 0, evasion: 18685, aa: 10, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  },
  2316: {
    shipId: 2316, sortId: 0, name: '重巡新棲姫-壊', yomi: '', shipClass: 6, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 5, initialStats: { hp: 1030, firepower: 292, armor: 299, torpedo: 151, evasion: 18685, aa: 161, aircraft: 5, speed: 10, los: 10, range: 1, luck: 10, asw: 0 }
  }
}
