// 艦娘コアマスターデータ（初期ステータス版）
export interface ShipMasterData {
  shipId: number
  sortId: number
  name: string
  yomi: string
  shipClass: number
  shipType: number
  rarity: number
  maxLevel: number
  slotCount: number   // 装備スロット数（kancolle.csvから取得）
  initialStats: {
    hp: number          // 耐久（初期値）
    firepower: number   // 火力（初期値）
    armor: number       // 装甲（初期値）
    torpedo: number     // 雷装（初期値）
    evasion: number     // 回避（初期値）
    aa: number          // 対空（初期値）
    aircraft: number    // 搭載
    speed: number       // 速力
    los: number         // 索敵（初期値）
    range: number       // 射程
    luck: number        // 運（初期値）
    asw: number         // 対潜（初期値）
  }
}

// 艦種マッピング（shipType用）
export const SHIP_TYPE_MAPPING: { [key: number]: string } = {
  1: 'destroyer',
  2: 'battleship',
  3: 'light_cruiser',
  4: 'torpedo_cruiser',
  5: 'destroyer',
  6: 'fast_battleship',
  7: 'heavy_cruiser',
  8: 'heavy_cruiser',
  9: 'aviation_cruiser',
  10: 'destroyer',
  11: 'light_carrier',
  12: 'destroyer',
  13: 'heavy_cruiser',
  15: 'light_carrier',
  16: 'light_cruiser',
  18: 'destroyer',
  19: 'battleship',
  20: 'light_cruiser',
  21: 'light_cruiser',
  22: 'destroyer',
  23: 'destroyer',
  24: 'light_carrier',
  26: 'aviation_battleship',
  28: 'destroyer',
  29: 'heavy_cruiser',
  30: 'destroyer',
  31: 'aviation_cruiser',
  32: 'light_carrier',
  33: 'carrier',
  34: 'light_cruiser',
  37: 'battleship',
  38: 'destroyer',
  41: 'light_cruiser',
}

// 艦級マッピング（shipClass用）
export const SHIP_CLASS_MAPPING: { [key: number]: string } = {
  1: 'escort',         // 海防艦クラス
  2: 'destroyer',      // 駆逐艦クラス
  3: 'light_cruiser',  // 軽巡洋艦クラス
  4: 'torpedo_cruiser', // 雷巡クラス
  5: 'heavy_cruiser',  // 重巡クラス
  6: 'aviation_cruiser', // 航巡クラス
  7: 'light_carrier',  // 軽空母クラス
  8: 'fast_battleship', // 高速戦艦クラス
  9: 'battleship',     // 低速戦艦クラス
  10: 'aviation_battleship', // 航空戦艦クラス
  11: 'carrier',       // 正規空母クラス
  13: 'submarine',     // 潜水艦クラス
  14: 'submarine_carrier', // 潜水空母クラス
  16: 'seaplane_tender', // 水上機母艦クラス
  17: 'landing_ship',  // 揚陸艦クラス
  18: 'armored_carrier', // 装甲空母クラス
  19: 'repair_ship',   // 工作艦クラス
  20: 'submarine_tender', // 潜水母艦クラス
  21: 'training_cruiser', // 練習巡洋艦クラス
  22: 'supply_ship',   // 補給艦クラス
}

// 艦級ソート順序（shipClass用）
export const SHIP_CLASS_SORT_ORDER: { [key: number]: number } = {
  1: 1,   // 海防艦クラス
  2: 2,   // 駆逐艦クラス
  3: 3,   // 軽巡洋艦クラス
  4: 4,   // 雷巡クラス
  5: 5,   // 重巡クラス
  6: 6,   // 航巡クラス
  7: 7,   // 軽空母クラス
  8: 8,   // 高速戦艦クラス
  9: 9,   // 低速戦艦クラス
  10: 10, // 航空戦艦クラス
  11: 11, // 正規空母クラス
  13: 12, // 潜水艦クラス
  14: 13, // 潜水空母クラス
  16: 14, // 水上機母艦クラス
  17: 15, // 揚陸艦クラス
  18: 16, // 装甲空母クラス
  19: 17, // 工作艦クラス
  20: 18, // 潜水母艦クラス
  21: 19, // 練習巡洋艦クラス
  22: 20, // 補給艦クラス
}

// 艦種別カテゴリ
export const SHIP_TYPES = {
  'destroyer': '駆逐艦',
  'escort': '海防艦',
  'light_cruiser': '軽巡洋艦',
  'heavy_cruiser': '重巡洋艦',
  'torpedo_cruiser': '重雷装巡洋艦',
  'aviation_cruiser': '航空巡洋艦',
  'training_cruiser': '練習巡洋艦',
  'battleship': '戦艦',
  'fast_battleship': '高速戦艦',
  'aviation_battleship': '航空戦艦',
  'carrier': '正規空母',
  'light_carrier': '軽空母',
  'armored_carrier': '装甲空母',
  'submarine': '潜水艦',
  'submarine_carrier': '潜水空母',
  'submarine_tender': '潜水母艦',
  'seaplane_tender': '水上機母艦',
  'supply_ship': '補給艦',
  'repair_ship': '工作艦',
  'landing_ship': '揚陸艦'
} as const

// コア艦船マスターデータ（初期ステータス版）
export const CORE_SHIP_MASTER_DATA: { [key: number]: ShipMasterData } = {
  1: {
    shipId: 1, sortId: 31, name: '睦月', yomi: 'むつき', shipClass: 2, shipType: 28, rarity: 3,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 13, firepower: 6, armor: 5, torpedo: 18, evasion: 58, aa: 7, aircraft: 2, speed: 10, los: 4, range: 1, luck: 12, asw: 16 }
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
    maxLevel: 100, slotCount: 1, initialStats: { hp: 13, firepower: 6, armor: 5, torpedo: 18, evasion: 58, aa: 7, aircraft: 2, speed: 10, los: 4, range: 1, luck: 10, asw: 16 }
  },
  9: {
    shipId: 9, sortId: 11, name: '吹雪', yomi: 'ふぶき', shipClass: 2, shipType: 12, rarity: 3,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 15, firepower: 10, armor: 5, torpedo: 27, evasion: 74, aa: 10, aircraft: 2, speed: 10, los: 5, range: 1, luck: 17, asw: 20 }
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
    maxLevel: 100, slotCount: 1, initialStats: { hp: 15, firepower: 10, armor: 5, torpedo: 27, evasion: 74, aa: 10, aircraft: 2, speed: 10, los: 5, range: 1, luck: 10, asw: 20 }
  },
  13: {
    shipId: 13, sortId: 17, name: '綾波', yomi: 'あやなみ', shipClass: 2, shipType: 1, rarity: 3,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 15, firepower: 10, armor: 5, torpedo: 27, evasion: 74, aa: 12, aircraft: 2, speed: 10, los: 5, range: 1, luck: 12, asw: 20 }
  },
  14: {
    shipId: 14, sortId: 18, name: '敷波', yomi: 'しきなみ', shipClass: 2, shipType: 1, rarity: 2,
    maxLevel: 100, slotCount: 2, initialStats: { hp: 15, firepower: 10, armor: 5, torpedo: 27, evasion: 74, aa: 12, aircraft: 2, speed: 10, los: 5, range: 1, luck: 10, asw: 20 }
  },
  15: {
    shipId: 15, sortId: 68, name: '曙', yomi: 'あけぼの', shipClass: 2, shipType: 1, rarity: 1,
    maxLevel: 100, slotCount: 1, initialStats: { hp: 15, firepower: 10, armor: 5, torpedo: 27, evasion: 74, aa: 12, aircraft: 2, speed: 10, los: 5, range: 1, luck: 10, asw: 20 }
  },
  16: {
    shipId: 16, sortId: 70, name: '潮', yomi: 'うしお', shipClass: 2, shipType: 1, rarity: 1,
    maxLevel: 100, slotCount: 1, initialStats: { hp: 15, firepower: 10, armor: 5, torpedo: 27, evasion: 74, aa: 12, aircraft: 2, speed: 10, los: 5, range: 1, luck: 20, asw: 20 }
  },
  17: {
    shipId: 17, sortId: 91, name: '陽炎', yomi: 'かげろう', shipClass: 2, shipType: 30, rarity: 3,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 70, aa: 12, aircraft: 2, speed: 10, los: 6, range: 1, luck: 12, asw: 24 }
  },
  18: {
    shipId: 18, sortId: 92, name: '不知火', yomi: 'しらぬい', shipClass: 2, shipType: 30, rarity: 2,
    maxLevel: 100, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 70, aa: 9, aircraft: 2, speed: 10, los: 6, range: 1, luck: 10, asw: 24 }
  },
  19: {
    shipId: 19, sortId: 93, name: '黒潮', yomi: 'くろしお', shipClass: 2, shipType: 30, rarity: 1,
    maxLevel: 100, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 70, aa: 9, aircraft: 2, speed: 10, los: 6, range: 1, luck: 10, asw: 24 }
  },
  20: {
    shipId: 20, sortId: 5, name: '雪風', yomi: 'ゆきかぜ', shipClass: 2, shipType: 30, rarity: 6,
    maxLevel: 100, slotCount: 6, initialStats: { hp: 16, firepower: 10, armor: 7, torpedo: 24, evasion: 70, aa: 12, aircraft: 2, speed: 10, los: 6, range: 1, luck: 50, asw: 24 }
  },
  21: {
    shipId: 21, sortId: 42, name: '長良', yomi: 'ながら', shipClass: 3, shipType: 20, rarity: 4,
    maxLevel: 100, initialStats: { hp: 26, firepower: 14, armor: 10, torpedo: 24, evasion: 92, aa: 13, aircraft: 2, speed: 10, los: 8, range: 2, luck: 12, asw: 20 }
  },
  22: {
    shipId: 22, sortId: 43, name: '五十鈴', yomi: 'いすず', shipClass: 3, shipType: 20, rarity: 2,
    maxLevel: 100, initialStats: { hp: 26, firepower: 14, armor: 10, torpedo: 24, evasion: 112, aa: 13, aircraft: 2, speed: 10, los: 8, range: 2, luck: 10, asw: 40 }
  },
  23: {
    shipId: 23, sortId: 45, name: '由良', yomi: 'ゆら', shipClass: 3, shipType: 20, rarity: 1,
    maxLevel: 100, initialStats: { hp: 26, firepower: 14, armor: 10, torpedo: 24, evasion: 112, aa: 13, aircraft: 2, speed: 10, los: 8, range: 2, luck: 10, asw: 40 }
  },
  24: {
    shipId: 24, sortId: 19, name: '大井', yomi: 'おおい', shipClass: 3, shipType: 4, rarity: 5,
    maxLevel: 100, initialStats: { hp: 25, firepower: 14, armor: 11, torpedo: 24, evasion: 93, aa: 13, aircraft: 2, speed: 10, los: 8, range: 2, luck: 17, asw: 19 }
  },
  25: {
    shipId: 25, sortId: 20, name: '北上', yomi: 'きたかみ', shipClass: 3, shipType: 4, rarity: 4,
    maxLevel: 100, initialStats: { hp: 25, firepower: 14, armor: 10, torpedo: 24, evasion: 93, aa: 13, aircraft: 2, speed: 10, los: 8, range: 2, luck: 15, asw: 19 }
  },
  26: {
    shipId: 26, sortId: 26, name: '扶桑', yomi: 'ふそう', shipClass: 9, shipType: 26, rarity: 4,
    maxLevel: 100, initialStats: { hp: 67, firepower: 74, armor: 59, torpedo: 0, evasion: 30, aa: 23, aircraft: 4, speed: 5, los: 9, range: 3, luck: 5, asw: 0 }
  },
  27: {
    shipId: 27, sortId: 27, name: '山城', yomi: 'やましろ', shipClass: 9, shipType: 26, rarity: 4,
    maxLevel: 100, initialStats: { hp: 67, firepower: 74, armor: 59, torpedo: 0, evasion: 30, aa: 23, aircraft: 4, speed: 5, los: 9, range: 3, luck: 5, asw: 0 }
  },
  28: {
    shipId: 28, sortId: 33, name: '皐月', yomi: 'さつき', shipClass: 2, shipType: 28, rarity: 2,
    maxLevel: 100, initialStats: { hp: 13, firepower: 6, armor: 5, torpedo: 18, evasion: 58, aa: 7, aircraft: 2, speed: 10, los: 4, range: 1, luck: 10, asw: 16 }
  },
  29: {
    shipId: 29, sortId: 34, name: '文月', yomi: 'ふみづき', shipClass: 2, shipType: 28, rarity: 2,
    maxLevel: 100, initialStats: { hp: 13, firepower: 6, armor: 5, torpedo: 18, evasion: 58, aa: 7, aircraft: 2, speed: 10, los: 4, range: 1, luck: 10, asw: 16 }
  },
  30: {
    shipId: 30, sortId: 36, name: '菊月', yomi: 'きくづき', shipClass: 2, shipType: 28, rarity: 1,
    maxLevel: 100, initialStats: { hp: 13, firepower: 6, armor: 5, torpedo: 18, evasion: 58, aa: 7, aircraft: 2, speed: 10, los: 4, range: 1, luck: 10, asw: 16 }
  },
  31: {
    shipId: 31, sortId: 38, name: '望月', yomi: 'もちづき', shipClass: 2, shipType: 28, rarity: 1,
    maxLevel: 100, initialStats: { hp: 13, firepower: 6, armor: 5, torpedo: 18, evasion: 58, aa: 7, aircraft: 2, speed: 10, los: 4, range: 1, luck: 10, asw: 16 }
  },
  32: {
    shipId: 32, sortId: 13, name: '初雪', yomi: 'はつゆき', shipClass: 2, shipType: 12, rarity: 1,
    maxLevel: 100, initialStats: { hp: 15, firepower: 10, armor: 5, torpedo: 27, evasion: 74, aa: 10, aircraft: 2, speed: 10, los: 5, range: 1, luck: 10, asw: 20 }
  },
  33: {
    shipId: 33, sortId: 15, name: '叢雲', yomi: 'むらくも', shipClass: 2, shipType: 12, rarity: 2,
    maxLevel: 100, initialStats: { hp: 15, firepower: 10, armor: 5, torpedo: 27, evasion: 74, aa: 10, aircraft: 2, speed: 10, los: 5, range: 1, luck: 10, asw: 20 }
  },
  34: {
    shipId: 34, sortId: 71, name: '暁', yomi: 'あかつき', shipClass: 2, shipType: 5, rarity: 3,
    maxLevel: 100, initialStats: { hp: 15, firepower: 10, armor: 6, torpedo: 27, evasion: 74, aa: 12, aircraft: 2, speed: 10, los: 5, range: 1, luck: 12, asw: 20 }
  },
  35: {
    shipId: 35, sortId: 72, name: '響', yomi: 'ひびき', shipClass: 2, shipType: 5, rarity: 2,
    maxLevel: 100, initialStats: { hp: 15, firepower: 10, armor: 6, torpedo: 27, evasion: 74, aa: 12, aircraft: 2, speed: 10, los: 5, range: 1, luck: 10, asw: 20 }
  },
  36: {
    shipId: 36, sortId: 73, name: '雷', yomi: 'いかづち', shipClass: 2, shipType: 5, rarity: 1,
    maxLevel: 100, initialStats: { hp: 15, firepower: 10, armor: 6, torpedo: 27, evasion: 74, aa: 12, aircraft: 2, speed: 10, los: 5, range: 1, luck: 10, asw: 20 }
  },
  37: {
    shipId: 37, sortId: 74, name: '電', yomi: 'いなづま', shipClass: 2, shipType: 5, rarity: 1,
    maxLevel: 100, initialStats: { hp: 15, firepower: 10, armor: 6, torpedo: 27, evasion: 74, aa: 12, aircraft: 2, speed: 10, los: 5, range: 1, luck: 10, asw: 20 }
  },
  38: {
    shipId: 38, sortId: 75, name: '初春', yomi: 'はつはる', shipClass: 2, shipType: 10, rarity: 3,
    maxLevel: 100, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 27, evasion: 73, aa: 12, aircraft: 2, speed: 10, los: 5, range: 1, luck: 12, asw: 21 }
  },
  39: {
    shipId: 39, sortId: 76, name: '子日', yomi: 'ねのひ', shipClass: 2, shipType: 10, rarity: 1,
    maxLevel: 100, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 27, evasion: 73, aa: 9, aircraft: 2, speed: 10, los: 5, range: 1, luck: 10, asw: 21 }
  },
  40: {
    shipId: 40, sortId: 77, name: '若葉', yomi: 'わかば', shipClass: 2, shipType: 10, rarity: 2,
    maxLevel: 100, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 27, evasion: 73, aa: 9, aircraft: 2, speed: 10, los: 5, range: 1, luck: 10, asw: 21 }
  },
  42: {
    shipId: 42, sortId: 79, name: '白露', yomi: 'しらつゆ', shipClass: 2, shipType: 23, rarity: 3,
    maxLevel: 100, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 73, aa: 12, aircraft: 2, speed: 10, los: 5, range: 1, luck: 12, asw: 21 }
  },
  43: {
    shipId: 43, sortId: 80, name: '時雨', yomi: 'しぐれ', shipClass: 2, shipType: 23, rarity: 2,
    maxLevel: 100, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 73, aa: 9, aircraft: 2, speed: 10, los: 5, range: 1, luck: 10, asw: 21 }
  },
  44: {
    shipId: 44, sortId: 81, name: '村雨', yomi: 'むらさめ', shipClass: 2, shipType: 23, rarity: 2,
    maxLevel: 100, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 73, aa: 9, aircraft: 2, speed: 10, los: 5, range: 1, luck: 10, asw: 21 }
  },
  45: {
    shipId: 45, sortId: 82, name: '夕立', yomi: 'ゆうだち', shipClass: 2, shipType: 23, rarity: 2,
    maxLevel: 100, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 73, aa: 9, aircraft: 2, speed: 10, los: 5, range: 1, luck: 10, asw: 21 }
  },
  46: {
    shipId: 46, sortId: 83, name: '五月雨', yomi: 'さみだれ', shipClass: 2, shipType: 23, rarity: 2,
    maxLevel: 100, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 73, aa: 9, aircraft: 2, speed: 10, los: 5, range: 1, luck: 10, asw: 21 }
  },
  47: {
    shipId: 47, sortId: 84, name: '涼風', yomi: 'すずかぜ', shipClass: 2, shipType: 23, rarity: 3,
    maxLevel: 100, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 73, aa: 9, aircraft: 2, speed: 10, los: 5, range: 1, luck: 12, asw: 21 }
  },
  48: {
    shipId: 48, sortId: 89, name: '霰', yomi: 'あられ', shipClass: 2, shipType: 18, rarity: 1,
    maxLevel: 100, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 73, aa: 9, aircraft: 2, speed: 10, los: 5, range: 1, luck: 10, asw: 21 }
  },
  49: {
    shipId: 49, sortId: 90, name: '霞', yomi: 'かすみ', shipClass: 2, shipType: 18, rarity: 2,
    maxLevel: 100, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 73, aa: 9, aircraft: 2, speed: 10, los: 5, range: 1, luck: 15, asw: 21 }
  },
  50: {
    shipId: 50, sortId: 10, name: '島風', yomi: 'しまかぜ', shipClass: 2, shipType: 22, rarity: 6,
    maxLevel: 100, slotCount: 6, initialStats: { hp: 19, firepower: 12, armor: 8, torpedo: 45, evasion: 70, aa: 14, aircraft: 2, speed: 10, los: 7, range: 1, luck: 10, asw: 24 }
  },
  51: {
    shipId: 51, sortId: 28, name: '天龍', yomi: 'てんりゅう', shipClass: 3, shipType: 21, rarity: 3,
    maxLevel: 100, initialStats: { hp: 23, firepower: 11, armor: 7, torpedo: 18, evasion: 94, aa: 8, aircraft: 2, speed: 10, los: 7, range: 2, luck: 17, asw: 18 }
  },
  52: {
    shipId: 52, sortId: 29, name: '龍田', yomi: 'たつた', shipClass: 3, shipType: 21, rarity: 3,
    maxLevel: 100, initialStats: { hp: 23, firepower: 11, armor: 7, torpedo: 18, evasion: 94, aa: 8, aircraft: 2, speed: 10, los: 7, range: 2, luck: 17, asw: 18 }
  },
  53: {
    shipId: 53, sortId: 44, name: '名取', yomi: 'なとり', shipClass: 3, shipType: 20, rarity: 2,
    maxLevel: 100, initialStats: { hp: 26, firepower: 14, armor: 10, torpedo: 24, evasion: 92, aa: 13, aircraft: 2, speed: 10, los: 8, range: 2, luck: 10, asw: 20 }
  },
  54: {
    shipId: 54, sortId: 46, name: '川内', yomi: 'せんだい', shipClass: 3, shipType: 16, rarity: 4,
    maxLevel: 100, initialStats: { hp: 26, firepower: 14, armor: 11, torpedo: 24, evasion: 111, aa: 13, aircraft: 2, speed: 10, los: 8, range: 2, luck: 12, asw: 20 }
  },
  55: {
    shipId: 55, sortId: 47, name: '神通', yomi: 'じんつう', shipClass: 3, shipType: 16, rarity: 1,
    maxLevel: 100, initialStats: { hp: 26, firepower: 14, armor: 11, torpedo: 24, evasion: 111, aa: 13, aircraft: 2, speed: 10, los: 8, range: 2, luck: 10, asw: 20 }
  },
  56: {
    shipId: 56, sortId: 48, name: '那珂', yomi: 'なか', shipClass: 3, shipType: 16, rarity: 2,
    maxLevel: 100, initialStats: { hp: 26, firepower: 14, armor: 11, torpedo: 24, evasion: 108, aa: 13, aircraft: 2, speed: 10, los: 8, range: 2, luck: 10, asw: 24 }
  },
  57: {
    shipId: 57, sortId: 97, name: '大井改', yomi: 'おおい', shipClass: 4, shipType: 4, rarity: 6,
    maxLevel: 100, initialStats: { hp: 32, firepower: 8, armor: 12, torpedo: 80, evasion: 88, aa: 13, aircraft: 2, speed: 10, los: 8, range: 2, luck: 10, asw: 25 }
  },
  58: {
    shipId: 58, sortId: 98, name: '北上改', yomi: 'きたかみ', shipClass: 4, shipType: 4, rarity: 6,
    maxLevel: 100, initialStats: { hp: 32, firepower: 8, armor: 12, torpedo: 80, evasion: 88, aa: 13, aircraft: 2, speed: 10, los: 8, range: 2, luck: 15, asw: 25 }
  },
  59: {
    shipId: 59, sortId: 52, name: '古鷹', yomi: 'ふるたか', shipClass: 5, shipType: 7, rarity: 3,
    maxLevel: 100, initialStats: { hp: 36, firepower: 30, armor: 25, torpedo: 12, evasion: 30, aa: 16, aircraft: 3, speed: 10, los: 10, range: 2, luck: 10, asw: 0 }
  },
  60: {
    shipId: 60, sortId: 53, name: '加古', yomi: 'かこ', shipClass: 5, shipType: 7, rarity: 1,
    maxLevel: 100, initialStats: { hp: 36, firepower: 30, armor: 25, torpedo: 12, evasion: 30, aa: 16, aircraft: 3, speed: 10, los: 10, range: 2, luck: 10, asw: 0 }
  },
  61: {
    shipId: 61, sortId: 54, name: '青葉', yomi: 'あおば', shipClass: 5, shipType: 13, rarity: 3,
    maxLevel: 100, initialStats: { hp: 37, firepower: 30, armor: 26, torpedo: 12, evasion: 30, aa: 16, aircraft: 3, speed: 10, los: 11, range: 2, luck: 20, asw: 0 }
  },
  62: {
    shipId: 62, sortId: 55, name: '妙高', yomi: 'みょうこう', shipClass: 5, shipType: 29, rarity: 4,
    maxLevel: 100, initialStats: { hp: 44, firepower: 40, armor: 32, torpedo: 24, evasion: 30, aa: 16, aircraft: 3, speed: 10, los: 12, range: 2, luck: 10, asw: 0 }
  },
  63: {
    shipId: 63, sortId: 56, name: '那智', yomi: 'なち', shipClass: 5, shipType: 29, rarity: 1,
    maxLevel: 100, initialStats: { hp: 44, firepower: 40, armor: 32, torpedo: 24, evasion: 30, aa: 16, aircraft: 3, speed: 10, los: 12, range: 2, luck: 10, asw: 0 }
  },
  64: {
    shipId: 64, sortId: 57, name: '足柄', yomi: 'あしがら', shipClass: 5, shipType: 29, rarity: 2,
    maxLevel: 100, initialStats: { hp: 44, firepower: 40, armor: 32, torpedo: 24, evasion: 30, aa: 16, aircraft: 3, speed: 10, los: 12, range: 2, luck: 10, asw: 0 }
  },
  65: {
    shipId: 65, sortId: 58, name: '羽黒', yomi: 'はぐろ', shipClass: 5, shipType: 29, rarity: 1,
    maxLevel: 100, initialStats: { hp: 44, firepower: 40, armor: 32, torpedo: 24, evasion: 30, aa: 16, aircraft: 3, speed: 10, los: 12, range: 2, luck: 10, asw: 0 }
  },
  66: {
    shipId: 66, sortId: 59, name: '高雄', yomi: 'たかお', shipClass: 5, shipType: 8, rarity: 4,
    maxLevel: 100, initialStats: { hp: 45, firepower: 40, armor: 35, torpedo: 24, evasion: 30, aa: 18, aircraft: 3, speed: 10, los: 13, range: 2, luck: 10, asw: 0 }
  },
  67: {
    shipId: 67, sortId: 60, name: '愛宕', yomi: 'あたご', shipClass: 5, shipType: 8, rarity: 4,
    maxLevel: 100, initialStats: { hp: 45, firepower: 40, armor: 35, torpedo: 24, evasion: 30, aa: 18, aircraft: 3, speed: 10, los: 13, range: 2, luck: 10, asw: 0 }
  },
  68: {
    shipId: 68, sortId: 61, name: '摩耶', yomi: 'まや', shipClass: 5, shipType: 8, rarity: 1,
    maxLevel: 100, initialStats: { hp: 45, firepower: 40, armor: 35, torpedo: 24, evasion: 30, aa: 18, aircraft: 3, speed: 10, los: 13, range: 2, luck: 10, asw: 0 }
  },
  69: {
    shipId: 69, sortId: 62, name: '鳥海', yomi: 'ちょうかい', shipClass: 5, shipType: 8, rarity: 1,
    maxLevel: 100, initialStats: { hp: 45, firepower: 40, armor: 35, torpedo: 24, evasion: 30, aa: 18, aircraft: 3, speed: 10, los: 13, range: 2, luck: 10, asw: 0 }
  },
  70: {
    shipId: 70, sortId: 51, name: '最上', yomi: 'もがみ', shipClass: 5, shipType: 9, rarity: 4,
    maxLevel: 100, initialStats: { hp: 41, firepower: 40, armor: 31, torpedo: 18, evasion: 30, aa: 20, aircraft: 3, speed: 10, los: 14, range: 2, luck: 10, asw: 0 }
  },
  71: {
    shipId: 71, sortId: 63, name: '利根', yomi: 'とね', shipClass: 5, shipType: 31, rarity: 4,
    maxLevel: 100, initialStats: { hp: 44, firepower: 32, armor: 36, torpedo: 24, evasion: 30, aa: 20, aircraft: 3, speed: 10, los: 20, range: 2, luck: 10, asw: 0 }
  },
  72: {
    shipId: 72, sortId: 64, name: '筑摩', yomi: 'ちくま', shipClass: 5, shipType: 31, rarity: 4,
    maxLevel: 100, initialStats: { hp: 44, firepower: 32, armor: 36, torpedo: 24, evasion: 30, aa: 20, aircraft: 3, speed: 10, los: 20, range: 2, luck: 10, asw: 0 }
  },
  73: {
    shipId: 73, sortId: 101, name: '最上改', yomi: 'もがみ', shipClass: 6, shipType: 9, rarity: 6,
    maxLevel: 100, initialStats: { hp: 50, firepower: 24, armor: 37, torpedo: 18, evasion: 30, aa: 20, aircraft: 4, speed: 10, los: 22, range: 2, luck: 10, asw: 0 }
  },
  74: {
    shipId: 74, sortId: 94, name: '祥鳳', yomi: 'しょうほう', shipClass: 7, shipType: 11, rarity: 4,
    maxLevel: 100, initialStats: { hp: 32, firepower: 10, armor: 19, torpedo: 0, evasion: 30, aa: 14, aircraft: 3, speed: 10, los: 34, range: 1, luck: 10, asw: 0 }
  },
  75: {
    shipId: 75, sortId: 65, name: '飛鷹', yomi: 'ひよう', shipClass: 7, shipType: 24, rarity: 4,
    maxLevel: 100, initialStats: { hp: 40, firepower: 10, armor: 21, torpedo: 0, evasion: 30, aa: 21, aircraft: 4, speed: 5, los: 38, range: 1, luck: 10, asw: 0 }
  },
  76: {
    shipId: 76, sortId: 30, name: '龍驤', yomi: 'りゅうじょう', shipClass: 7, shipType: 32, rarity: 4,
    maxLevel: 100, initialStats: { hp: 31, firepower: 10, armor: 17, torpedo: 0, evasion: 30, aa: 16, aircraft: 3, speed: 10, los: 34, range: 1, luck: 10, asw: 0 }
  },
  77: {
    shipId: 77, sortId: 3, name: '伊勢', yomi: 'いせ', shipClass: 9, shipType: 2, rarity: 5,
    maxLevel: 100, initialStats: { hp: 74, firepower: 74, armor: 70, torpedo: 0, evasion: 30, aa: 28, aircraft: 4, speed: 5, los: 10, range: 3, luck: 15, asw: 0 }
  },
  78: {
    shipId: 78, sortId: 21, name: '金剛', yomi: 'こんごう', shipClass: 8, shipType: 6, rarity: 5,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 63, firepower: 63, armor: 52, torpedo: 0, evasion: 30, aa: 24, aircraft: 3, speed: 10, los: 13, range: 3, luck: 12, asw: 0 }
  },
  79: {
    shipId: 79, sortId: 23, name: '榛名', yomi: 'はるな', shipClass: 8, shipType: 6, rarity: 5,
    maxLevel: 100, initialStats: { hp: 63, firepower: 63, armor: 52, torpedo: 0, evasion: 30, aa: 24, aircraft: 3, speed: 10, los: 13, range: 3, luck: 15, asw: 0 }
  },
  80: {
    shipId: 80, sortId: 1, name: '長門', yomi: 'ながと', shipClass: 9, shipType: 19, rarity: 7,
    maxLevel: 100, slotCount: 4, initialStats: { hp: 80, firepower: 82, armor: 75, torpedo: 0, evasion: 30, aa: 31, aircraft: 4, speed: 5, los: 12, range: 3, luck: 20, asw: 0 }
  },
  108: {
    shipId: 108, sortId: 104, name: '千歳航', yomi: 'ちとせ', shipClass: 7, shipType: 15, rarity: 4,
    maxLevel: 100, initialStats: { hp: 47, firepower: 10, armor: 25, torpedo: 0, evasion: 30, aa: 20, aircraft: 3, speed: 10, los: 36, range: 1, luck: 10, asw: 0 }
  },
  109: {
    shipId: 109, sortId: 105, name: '千代田航', yomi: 'ちよだ', shipClass: 7, shipType: 15, rarity: 4,
    maxLevel: 100, initialStats: { hp: 47, firepower: 10, armor: 25, torpedo: 0, evasion: 30, aa: 20, aircraft: 3, speed: 10, los: 36, range: 1, luck: 10, asw: 0 }
  },
  110: {
    shipId: 110, sortId: 106, name: '翔鶴', yomi: 'しょうかく', shipClass: 11, shipType: 33, rarity: 5,
    maxLevel: 100, initialStats: { hp: 62, firepower: 10, armor: 33, torpedo: 0, evasion: 30, aa: 29, aircraft: 4, speed: 10, los: 44, range: 1, luck: 10, asw: 0 }
  },
  111: {
    shipId: 111, sortId: 107, name: '瑞鶴', yomi: 'ずいかく', shipClass: 11, shipType: 33, rarity: 6,
    maxLevel: 100, initialStats: { hp: 62, firepower: 10, armor: 33, torpedo: 0, evasion: 30, aa: 29, aircraft: 4, speed: 10, los: 44, range: 1, luck: 40, asw: 0 }
  },
  112: {
    shipId: 112, sortId: 108, name: '瑞鶴改', yomi: 'ずいかく', shipClass: 11, shipType: 33, rarity: 7,
    maxLevel: 100, initialStats: { hp: 75, firepower: 10, armor: 42, torpedo: 0, evasion: 30, aa: 40, aircraft: 4, speed: 10, los: 48, range: 1, luck: 42, asw: 0 }
  },
  113: {
    shipId: 113, sortId: 109, name: '鬼怒', yomi: 'きぬ', shipClass: 3, shipType: 20, rarity: 4,
    maxLevel: 100, initialStats: { hp: 26, firepower: 14, armor: 10, torpedo: 24, evasion: 92, aa: 13, aircraft: 2, speed: 10, los: 8, range: 2, luck: 12, asw: 20 }
  },
  114: {
    shipId: 114, sortId: 110, name: '阿武隈', yomi: 'あぶくま', shipClass: 3, shipType: 20, rarity: 5,
    maxLevel: 100, initialStats: { hp: 27, firepower: 14, armor: 10, torpedo: 24, evasion: 92, aa: 13, aircraft: 2, speed: 10, los: 8, range: 2, luck: 12, asw: 20 }
  },
  115: {
    shipId: 115, sortId: 111, name: '夕張', yomi: 'ゆうばり', shipClass: 3, shipType: 34, rarity: 5,
    maxLevel: 100, initialStats: { hp: 19, firepower: 17, armor: 10, torpedo: 20, evasion: 61, aa: 10, aircraft: 3, speed: 10, los: 6, range: 2, luck: 12, asw: 13 }
  },
  116: {
    shipId: 116, sortId: 112, name: '瑞鳳', yomi: 'ずいほう', shipClass: 7, shipType: 11, rarity: 5,
    maxLevel: 100, initialStats: { hp: 32, firepower: 10, armor: 19, torpedo: 0, evasion: 30, aa: 14, aircraft: 3, speed: 10, los: 34, range: 1, luck: 30, asw: 0 }
  },
  117: {
    shipId: 117, sortId: 113, name: '瑞鳳改', yomi: 'ずいほう', shipClass: 7, shipType: 11, rarity: 6,
    maxLevel: 100, initialStats: { hp: 45, firepower: 10, armor: 25, torpedo: 0, evasion: 30, aa: 18, aircraft: 4, speed: 10, los: 35, range: 1, luck: 40, asw: 0 }
  },
  131: {
    shipId: 131, sortId: 131, name: '大和', yomi: 'やまと', shipClass: 9, shipType: 37, rarity: 8,
    maxLevel: 100, initialStats: { hp: 93, firepower: 96, armor: 88, torpedo: 0, evasion: 30, aa: 50, aircraft: 4, speed: 5, los: 15, range: 4, luck: 12, asw: 0 }
  },
  132: {
    shipId: 132, sortId: 132, name: '秋雲', yomi: 'あきぐも', shipClass: 2, shipType: 30, rarity: 4,
    maxLevel: 100, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 70, aa: 9, aircraft: 2, speed: 10, los: 6, range: 1, luck: 14, asw: 24 }
  },
  133: {
    shipId: 133, sortId: 133, name: '夕雲', yomi: 'ゆうぐも', shipClass: 2, shipType: 38, rarity: 4,
    maxLevel: 100, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 73, aa: 9, aircraft: 2, speed: 10, los: 6, range: 1, luck: 12, asw: 27 }
  },
  134: {
    shipId: 134, sortId: 134, name: '巻雲', yomi: 'まきぐも', shipClass: 2, shipType: 38, rarity: 4,
    maxLevel: 100, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 73, aa: 9, aircraft: 2, speed: 10, los: 6, range: 1, luck: 11, asw: 27 }
  },
  135: {
    shipId: 135, sortId: 135, name: '長波', yomi: 'ながなみ', shipClass: 2, shipType: 38, rarity: 4,
    maxLevel: 100, initialStats: { hp: 16, firepower: 10, armor: 6, torpedo: 24, evasion: 73, aa: 9, aircraft: 2, speed: 10, los: 6, range: 1, luck: 13, asw: 27 }
  },
  136: {
    shipId: 136, sortId: 136, name: '大和改', yomi: 'やまと', shipClass: 9, shipType: 37, rarity: 8,
    maxLevel: 100, initialStats: { hp: 96, firepower: 92, armor: 92, torpedo: 0, evasion: 30, aa: 68, aircraft: 4, speed: 5, los: 17, range: 4, luck: 13, asw: 0 }
  },
  137: {
    shipId: 137, sortId: 137, name: '阿賀野', yomi: 'あがの', shipClass: 3, shipType: 41, rarity: 5,
    maxLevel: 100, initialStats: { hp: 30, firepower: 20, armor: 17, torpedo: 24, evasion: 109, aa: 17, aircraft: 3, speed: 10, los: 12, range: 2, luck: 10, asw: 25 }
  },
  138: {
    shipId: 138, sortId: 138, name: '能代', yomi: 'のしろ', shipClass: 3, shipType: 41, rarity: 5,
    maxLevel: 100, initialStats: { hp: 30, firepower: 20, armor: 17, torpedo: 24, evasion: 109, aa: 17, aircraft: 3, speed: 10, los: 12, range: 2, luck: 10, asw: 25 }
  },
  139: {
    shipId: 139, sortId: 139, name: '矢矧', yomi: 'やはぎ', shipClass: 3, shipType: 41, rarity: 6,
    maxLevel: 100, initialStats: { hp: 31, firepower: 20, armor: 17, torpedo: 24, evasion: 109, aa: 17, aircraft: 3, speed: 10, los: 13, range: 2, luck: 13, asw: 25 }
  },
  140: {
    shipId: 140, sortId: 140, name: '酒匂', yomi: 'さかわ', shipClass: 3, shipType: 41, rarity: 5,
    maxLevel: 100, initialStats: { hp: 31, firepower: 19, armor: 17, torpedo: 23, evasion: 111, aa: 17, aircraft: 3, speed: 10, los: 12, range: 2, luck: 20, asw: 27 }
  },
  143: {
    shipId: 143, sortId: 143, name: '武蔵', yomi: 'むさし', shipClass: 9, shipType: 37, rarity: 7,
    maxLevel: 100, initialStats: { hp: 94, firepower: 96, armor: 88, torpedo: 0, evasion: 30, aa: 50, aircraft: 4, speed: 5, los: 16, range: 4, luck: 10, asw: 0 }
  },
  144: {
    shipId: 144, sortId: 144, name: '夕立改二', yomi: 'ゆうだち', shipClass: 2, shipType: 23, rarity: 6,
    maxLevel: 100, initialStats: { hp: 31, firepower: 17, armor: 14, torpedo: 37, evasion: 104, aa: 16, aircraft: 3, speed: 10, los: 12, range: 1, luck: 20, asw: 28 }
  },
  145: {
    shipId: 145, sortId: 145, name: '時雨改二', yomi: 'しぐれ', shipClass: 2, shipType: 23, rarity: 6,
    maxLevel: 100, initialStats: { hp: 31, firepower: 13, armor: 14, torpedo: 28, evasion: 122, aa: 24, aircraft: 3, speed: 10, los: 20, range: 1, luck: 50, asw: 31 }
  },
  146: {
    shipId: 146, sortId: 146, name: '木曾改二', yomi: 'きそ', shipClass: 4, shipType: 4, rarity: 6,
    maxLevel: 100, initialStats: { hp: 44, firepower: 18, armor: 24, torpedo: 80, evasion: 125, aa: 24, aircraft: 3, speed: 10, los: 13, range: 2, luck: 13, asw: 32 }
  },
  147: {
    shipId: 147, sortId: 147, name: 'Верный', yomi: 'ひびき', shipClass: 2, shipType: 5, rarity: 6,
    maxLevel: 100, initialStats: { hp: 37, firepower: 13, armor: 15, torpedo: 30, evasion: 117, aa: 18, aircraft: 3, speed: 10, los: 10, range: 1, luck: 20, asw: 30 }
  },
  148: {
    shipId: 148, sortId: 148, name: '武蔵改', yomi: 'むさし', shipClass: 9, shipType: 37, rarity: 7,
    maxLevel: 100, initialStats: { hp: 97, firepower: 92, armor: 92, torpedo: 0, evasion: 30, aa: 60, aircraft: 4, speed: 5, los: 18, range: 4, luck: 9, asw: 0 }
  },
  149: {
    shipId: 149, sortId: 149, name: '金剛改二', yomi: 'こんごう', shipClass: 8, shipType: 6, rarity: 7,
    maxLevel: 100, initialStats: { hp: 82, firepower: 76, armor: 70, torpedo: 0, evasion: 30, aa: 30, aircraft: 4, speed: 10, los: 16, range: 3, luck: 15, asw: 0 }
  },
  150: {
    shipId: 150, sortId: 150, name: '比叡改二', yomi: 'ひえい', shipClass: 8, shipType: 6, rarity: 7,
    maxLevel: 100, initialStats: { hp: 83, firepower: 76, armor: 72, torpedo: 0, evasion: 30, aa: 30, aircraft: 4, speed: 10, los: 16, range: 3, luck: 13, asw: 0 }
  }
}

// 全艦データの遅延ローディング用
let fullShipMasterData: { [key: number]: ShipMasterData } | null = null


// 艦娘IDからマスターデータを取得（遅延ローディング対応）
export const getShipMasterData = async (shipId: number): Promise<ShipMasterData> => {
  // まずコアデータから探す
  if (CORE_SHIP_MASTER_DATA[shipId]) {
    return CORE_SHIP_MASTER_DATA[shipId]
  }
  
  // コアデータにない場合は全データをロード
  if (!fullShipMasterData) {
    try {
      const fullData = await import('./shipMasterDataFull')
      fullShipMasterData = fullData.SHIP_MASTER_DATA
    } catch (error) {
      console.error('Failed to load full ship data:', error)
      return getDefaultShipData(shipId)
    }
  }
  
  return fullShipMasterData[shipId] || getDefaultShipData(shipId)
}

// 同期版（後方互換性のため）
export const getShipMasterDataSync = (shipId: number): ShipMasterData => {
  return CORE_SHIP_MASTER_DATA[shipId] || getDefaultShipData(shipId)
}

// デフォルト艦娘データ
const getDefaultShipData = (shipId: number): ShipMasterData => ({
  shipId: shipId || 0,
  sortId: 999,
  name: '不明な艦娘',
  yomi: 'ふめい',
  shipClass: 2,
  shipType: 1,
  rarity: 1,
  maxLevel: 100,
  slotCount: 2, // デフォルト2スロット
  initialStats: {
    hp: 20, firepower: 10, armor: 10, torpedo: 20, evasion: 30,
    aa: 10, aircraft: 0, speed: 5, los: 10, range: 1, luck: 10, asw: 10
  }
})

// その他のユーティリティ関数
export const calculateRarity = (level: number): number => {
  if (level >= 100) return 5
  if (level >= 80) return 4
  if (level >= 50) return 3
  if (level >= 20) return 2
  return 1
}

export const getShipName = (shipId: number): string => {
  const ship = CORE_SHIP_MASTER_DATA[shipId]
  return ship?.name || `艦娘#${shipId}`
}

export const getShipType = (shipClassId: number): string => {
  return SHIP_CLASS_MAPPING[shipClassId] || 'destroyer'
}

export const getShipTypeByShipType = (shipTypeId: number): string => {
  return SHIP_TYPE_MAPPING[shipTypeId] || 'destroyer'
}

export const getShipTypeName = (shipType: string): string => {
  return SHIP_TYPES[shipType as keyof typeof SHIP_TYPES] || '不明'
}

export const getShipClassSortOrder = (shipClass: number): number => {
  return SHIP_CLASS_SORT_ORDER[shipClass] || 999
}
