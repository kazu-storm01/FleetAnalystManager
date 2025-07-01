// 艦娘コアマスターデータ（kancolle.csv構造準拠版）
export interface ShipMasterData {
  // CSV基本情報
  shipId: number        // 艦船ID
  catalogId?: number    // 図鑑番号
  name: string          // 艦名
  yomi: string          // 読み
  shipType: number      // 艦種
  shipClass: number     // 艦型
  sortId: number        // ソート順
  
  // 改装情報
  beforeRemodel?: number   // 改装前
  afterRemodel?: number    // 改装後
  remodelLevel?: number    // 改装Lv
  remodelAmmo?: number     // 改装弾薬
  remodelSteel?: number    // 改装鋼材
  remodelBlueprint?: number // 改装設計図
  catapult?: number        // カタパルト
  actionReport?: number    // 戦闘詳報
  aviationMaterial?: number // 新型航空兵装資材
  remodelStage?: number    // 改装段階
  
  // ステータス情報（後方互換性を保持）
  initialStats: {
    // 既存フィールド（FleetComposer互換）
    hp: number              // 耐久初期
    firepower: number       // 火力初期
    armor: number           // 装甲初期
    torpedo: number         // 雷装初期
    evasion: number         // 回避初期
    aa: number              // 対空初期
    aircraft: number        // 搭載
    speed: number           // 速力
    los: number             // 索敵初期
    range: number           // 射程
    luck: number            // 運初期
    asw: number             // 対潜初期
    
    // 新規フィールド（CSV準拠、optional）
    hpMax?: number           // 耐久最大
    hpMarried?: number      // 耐久結婚
    hpImprovement?: number  // 耐久改修
    firepowerMax?: number    // 火力最大
    torpedoMax?: number      // 雷装最大
    aaMax?: number           // 対空最大
    armorMax?: number        // 装甲最大
    aswMinInitial?: number  // 対潜初期最小
    aswMaxInitial?: number  // 対潜初期最大
    aswMax?: number          // 対潜最大
    asw185Min?: number      // 対潜185最小
    asw185Max?: number      // 対潜185最大
    evasionMinInitial?: number // 回避初期最小
    evasionMaxInitial?: number // 回避初期最大
    evasionMax?: number      // 回避最大
    evasion185Min?: number  // 回避185最小
    evasion185Max?: number  // 回避185最大
    losMinInitial?: number  // 索敵初期最小
    losMaxInitial?: number  // 索敵初期最大
    losMax?: number          // 索敵最大
    los185Min?: number      // 索敵185最小
    los185Max?: number      // 索敵185最大
    luckMax?: number         // 運最大
  }
  
  // その他の情報
  rarity: number          // レア
  slotCount: number       // スロット数
  aircraft?: number[]     // 搭載機数1-5
  initialEquipment?: number[] // 初期装備1-5
  buildTime?: number      // 建造時間
  dismantleResources?: {  // 解体資源
    fuel: number
    ammo: number
    steel: number
    bauxite: number
  }
  improvementLimits?: {   // 改修限界
    firepower: number
    torpedo: number
    aa: number
    armor: number
  }
  dropText?: string       // ドロップ文章
  catalogText?: string    // 図鑑文章
  fuelCapacity?: number   // 搭載燃料
  ammoCapacity?: number   // 搭載弾薬
  voiceFlag?: number      // ボイス
  resourceName?: string   // リソース名
  imageVersion?: number   // 画像バージョン
  voiceVersion?: number   // ボイスバージョン
  portVoiceVersion?: number // 母港ボイスバージョン
  
  // 後方互換性のため残す
  maxLevel: number
}

// 艦種マッピング（shipType用、標準Kancolle艦種分類）
export const SHIP_TYPE_MAPPING: { [key: number]: string } = {
  1: 'escort',             // 海防艦
  2: 'destroyer',          // 駆逐艦
  3: 'light_cruiser',      // 軽巡
  4: 'torpedo_cruiser',    // 雷巡
  5: 'heavy_cruiser',      // 重巡
  6: 'aviation_cruiser',   // 航巡
  7: 'light_carrier',      // 軽空母
  8: 'fast_battleship',    // 高速戦艦
  9: 'battleship',         // 低速戦艦
  10: 'aviation_battleship', // 航空戦艦
  11: 'carrier',           // 正規空母
  13: 'submarine',         // 潜水艦
  14: 'submarine_carrier', // 潜水空母
  16: 'seaplane_tender',   // 水上機母艦
  17: 'landing_ship',      // 揚陸艦
  18: 'armored_carrier',   // 装甲空母
  19: 'repair_ship',       // 工作艦
  20: 'submarine_tender',  // 潜水母艦
  21: 'training_cruiser',  // 練習巡洋艦
  22: 'supply_ship',       // 補給艦
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

// コア艦船マスターデータ（kancolle2.csv由来、主要艦娘のみ）
export const CORE_SHIP_MASTER_DATA: { [key: number]: ShipMasterData } = {
  // 駆逐艦（代表的な艦娘）
  1: {
    shipId: 1, catalogId: 31, name: '睦月', yomi: 'むつき', shipType: 2, shipClass: 28, sortId: 13251,
    rarity: 3, maxLevel: 100, slotCount: 2,
    afterRemodel: 254, remodelLevel: 20, remodelAmmo: 100, remodelSteel: 100,
    initialStats: { 
      hp: 13, firepower: 6, armor: 5, torpedo: 18, evasion: 37, aa: 7, aircraft: 0, 
      speed: 10, los: 4, range: 1, luck: 12, asw: 16,
      hpMax: 24, hpMarried: 17, hpImprovement: 19, firepowerMax: 29, torpedoMax: 59, 
      aaMax: 29, armorMax: 18, aswMinInitial: 16, aswMaxInitial: 16, aswMax: 39,
      asw185Min: 58, asw185Max: 58, evasionMinInitial: 37, evasionMaxInitial: 37,
      evasionMax: 79, evasion185Min: 115, evasion185Max: 115, losMinInitial: 4,
      losMaxInitial: 4, losMax: 17, los185Min: 28, los185Max: 28, luckMax: 49
    },
    aircraft: [], initialEquipment: [1, -1, -1, -1, -1], buildTime: 18,
    dismantleResources: { fuel: 1, ammo: 1, steel: 4, bauxite: 0 },
    improvementLimits: { firepower: 1, torpedo: 1, aa: 0, armor: 0 },
    dropText: '睦月です。<br>はりきって、まいりましょー！',
    catalogText: '帝国海軍の駆逐艦で初めて大型で強力な61cm魚雷を<br>搭載しました、睦月です！<br>旧式ながら、第一線で頑張ったのです！',
    fuelCapacity: 15, ammoCapacity: 15, resourceName: 'snohitatusbk',
    imageVersion: 50, voiceVersion: 19, portVoiceVersion: 627
  },
  2: {
    shipId: 2, catalogId: 32, name: '如月', yomi: 'きさらぎ', shipType: 2, shipClass: 28, sortId: 13261,
    rarity: 2, maxLevel: 100, slotCount: 2,
    afterRemodel: 255, remodelLevel: 20, remodelAmmo: 100, remodelSteel: 100,
    initialStats: { 
      hp: 13, firepower: 6, armor: 5, torpedo: 18, evasion: 37, aa: 7, aircraft: 0, 
      speed: 10, los: 4, range: 1, luck: 10, asw: 16,
      hpMax: 24, hpMarried: 17, hpImprovement: 19, firepowerMax: 29, torpedoMax: 49, 
      aaMax: 29, armorMax: 18, aswMinInitial: 16, aswMaxInitial: 16, aswMax: 39,
      asw185Min: 58, asw185Max: 58, evasionMinInitial: 37, evasionMaxInitial: 37,
      evasionMax: 69, evasion185Min: 96, evasion185Max: 96, losMinInitial: 4,
      losMaxInitial: 4, losMax: 17, los185Min: 28, los185Max: 28, luckMax: 49
    },
    aircraft: [], initialEquipment: [1, -1, -1, -1, -1], buildTime: 18,
    dismantleResources: { fuel: 1, ammo: 1, steel: 4, bauxite: 0 },
    improvementLimits: { firepower: 0, torpedo: 1, aa: 0, armor: 0 },
    dropText: '如月と申します。<br>おそばに置いてくださいね。',
    catalogText: '睦月型駆逐艦２番艦の如月と申します。<br>ウェーク島では五月蠅いF4F戦闘機の攻撃を受けなが<br>ら奮戦しました。<br>いやん、ほんと、髪の毛が潮風で痛んじゃう……。',
    fuelCapacity: 15, ammoCapacity: 15, resourceName: 'wujywbyjntbp',
    imageVersion: 56, voiceVersion: 20, portVoiceVersion: 627
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
    shipId: 9, catalogId: 11, name: '吹雪', yomi: 'ふぶき', shipType: 2, shipClass: 12, sortId: 14011,
    afterRemodel: 201, remodelLevel: 20, remodelAmmo: 100, remodelSteel: 100,
    rarity: 3, maxLevel: 100, slotCount: 2,
    initialStats: {
      hp: 15, firepower: 10, armor: 5, torpedo: 27, evasion: 40, aa: 10, aircraft: 0,
      speed: 10, los: 5, range: 1, luck: 17, asw: 20,
      hpMax: 29, hpMarried: 19, hpImprovement: 21, firepowerMax: 29, torpedoMax: 79,
      aaMax: 39, armorMax: 19, aswMinInitial: 20, aswMaxInitial: 20, aswMax: 49,
      asw185Min: 74, asw185Max: 74, evasionMinInitial: 40, evasionMaxInitial: 40,
      evasionMax: 89, evasion185Min: 131, evasion185Max: 131, losMinInitial: 5,
      losMaxInitial: 5, losMax: 19, los185Min: 31, los185Max: 31, luckMax: 49
    },
    aircraft: [], initialEquipment: [297, 13, -1, -1, -1], buildTime: 20,
    dismantleResources: { fuel: 1, ammo: 1, steel: 5, bauxite: 0 },
    improvementLimits: { firepower: 1, torpedo: 1, aa: 0, armor: 0 },
    dropText: 'はじめまして吹雪です。<br>よろしくお願い致します。',
    catalogText: 'ワシントン条約制限下で設計された、世界中を驚愕さ<br>せたクラスを超えた特型駆逐艦の１番艦、吹雪です。<br>私たちは、後の艦隊型駆逐艦のベースとなりました。<br>はいっ、頑張ります！',
    fuelCapacity: 15, ammoCapacity: 20, resourceName: 'gyckjmemgqoe',
    imageVersion: 54, voiceVersion: 26, portVoiceVersion: 627
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
    shipId: 20, catalogId: 5, name: '雪風', yomi: 'ゆきかぜ', shipType: 2, shipClass: 30, sortId: 16081,
    afterRemodel: 228, remodelLevel: 20, remodelAmmo: 100, remodelSteel: 100,
    rarity: 6, maxLevel: 100, slotCount: 2,
    initialStats: {
      hp: 16, firepower: 10, armor: 7, torpedo: 24, evasion: 50, aa: 12, aircraft: 0,
      speed: 10, los: 6, range: 1, luck: 50, asw: 24,
      hpMax: 39, hpMarried: 20, hpImprovement: 22, firepowerMax: 29, torpedoMax: 79,
      aaMax: 49, armorMax: 29, aswMinInitial: 24, aswMaxInitial: 24, aswMax: 49,
      asw185Min: 70, asw185Max: 70, evasionMinInitial: 50, evasionMaxInitial: 50,
      evasionMax: 89, evasion185Min: 122, evasion185Max: 122, losMinInitial: 6,
      losMaxInitial: 6, losMax: 19, los185Min: 30, los185Max: 30, luckMax: 99
    },
    aircraft: [], initialEquipment: [2, 14, -1, -1, -1], buildTime: 24,
    dismantleResources: { fuel: 1, ammo: 1, steel: 6, bauxite: 0 },
    improvementLimits: { firepower: 0, torpedo: 1, aa: 1, armor: 1 },
    dropText: '陽炎型駆逐艦８番艦、雪風です。<br>どうぞ、よろしくお願いしますっ！',
    catalogText: '陽炎型駆逐艦８番艦の雪風です。<br>私たち主力艦隊型駆逐艦の中で、十数回以上の主要海<br>戦に参加しながらも、唯一ほとんど無傷で終戦まで生<br>き残りました。<br>奇跡の駆逐艦って？ううん、奇跡じゃないですっ！',
    fuelCapacity: 15, ammoCapacity: 20, resourceName: 'pueufyccujmd',
    imageVersion: 60, voiceVersion: 34, portVoiceVersion: 627
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
    shipId: 62, catalogId: 55, name: '妙高', yomi: 'みょうこう', shipType: 5, shipClass: 29, sortId: 8051,
    afterRemodel: 265, remodelLevel: 25, remodelAmmo: 450, remodelSteel: 300,
    rarity: 4, maxLevel: 100, slotCount: 3,
    initialStats: {
      hp: 44, firepower: 40, armor: 32, torpedo: 24, evasion: 34, aa: 16, aircraft: 2,
      speed: 10, los: 12, range: 2, luck: 10, asw: 0,
      hpMax: 60, hpMarried: 50, hpImprovement: 52, firepowerMax: 59, torpedoMax: 59,
      aaMax: 64, armorMax: 49, evasionMinInitial: 34, evasionMaxInitial: 34,
      evasionMax: 69, evasion185Min: 99, evasion185Max: 99, losMinInitial: 12,
      losMaxInitial: 12, losMax: 39, los185Min: 62, los185Max: 62, luckMax: 49
    },
    aircraft: [2, 2, 2], initialEquipment: [6, 25, -1, -1, -1], buildTime: 80,
    dismantleResources: { fuel: 2, ammo: 2, steel: 12, bauxite: 1 },
    improvementLimits: { firepower: 2, torpedo: 2, aa: 1, armor: 2 },
    dropText: '妙高です。<br>どうぞ、よろしくお願いいたします。',
    catalogText: '重巡洋艦妙高です。<br>私たち妙高型重巡洋艦は、ワシントン軍縮条約下で<br>「世界最強」と謳われた重巡洋艦です。<br>どうぞ、よろしくお願いいたしますね。',
    fuelCapacity: 40, ammoCapacity: 65, resourceName: 'idgaofftxgnn',
    imageVersion: 49, voiceVersion: 21, portVoiceVersion: 627
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
    shipId: 66, catalogId: 59, name: '高雄', yomi: 'たかお', shipType: 5, shipClass: 8, sortId: 8091,
    afterRemodel: 269, remodelLevel: 25, remodelAmmo: 450, remodelSteel: 300,
    rarity: 4, maxLevel: 100, slotCount: 3,
    initialStats: {
      hp: 45, firepower: 40, armor: 35, torpedo: 24, evasion: 35, aa: 18, aircraft: 2,
      speed: 10, los: 13, range: 2, luck: 10, asw: 0,
      hpMax: 60, hpMarried: 51, hpImprovement: 53, firepowerMax: 59, torpedoMax: 59,
      aaMax: 66, armorMax: 49, evasionMinInitial: 35, evasionMaxInitial: 35,
      evasionMax: 69, evasion185Min: 98, evasion185Max: 98, losMinInitial: 13,
      losMaxInitial: 13, losMax: 39, los185Min: 61, los185Max: 61, luckMax: 49
    },
    aircraft: [2, 2, 2], initialEquipment: [6, 25, -1, -1, -1], buildTime: 85,
    dismantleResources: { fuel: 2, ammo: 2, steel: 12, bauxite: 1 },
    improvementLimits: { firepower: 2, torpedo: 2, aa: 1, armor: 2 },
    dropText: '重巡洋艦高雄よ。<br>よろしくお願いするわ。',
    catalogText: '高雄型重巡洋艦、その一番艦、高雄よ。<br>妙高型重巡をさらに改良した私達は、新時代の主力重<br>巡として建造されたの。<br>第一戦隊、いつでも出撃可能よ！',
    fuelCapacity: 40, ammoCapacity: 65, resourceName: 'xehxhqkpbwny',
    imageVersion: 49, voiceVersion: 21, portVoiceVersion: 627
  },
  67: {
    shipId: 67, catalogId: 60, name: '愛宕', yomi: 'あたご', shipType: 5, shipClass: 8, sortId: 8101,
    afterRemodel: 270, remodelLevel: 25, remodelAmmo: 450, remodelSteel: 300,
    rarity: 4, maxLevel: 100, slotCount: 3,
    initialStats: {
      hp: 45, firepower: 40, armor: 35, torpedo: 24, evasion: 35, aa: 18, aircraft: 2,
      speed: 10, los: 13, range: 2, luck: 10, asw: 0,
      hpMax: 60, hpMarried: 51, hpImprovement: 53, firepowerMax: 54, torpedoMax: 59,
      aaMax: 56, armorMax: 49, evasionMinInitial: 35, evasionMaxInitial: 35,
      evasionMax: 59, evasion185Min: 79, evasion185Max: 79, losMinInitial: 13,
      losMaxInitial: 13, losMax: 39, los185Min: 61, los185Max: 61, luckMax: 49
    },
    aircraft: [2, 2, 2], initialEquipment: [6, 25, -1, -1, -1], buildTime: 85,
    dismantleResources: { fuel: 2, ammo: 2, steel: 12, bauxite: 1 },
    improvementLimits: { firepower: 2, torpedo: 2, aa: 1, armor: 2 },
    dropText: '高雄型重巡洋艦２番艦、愛宕です。<br>提督、愛宕をよろしくお願いしますね♪',
    catalogText: '高雄型重巡洋艦２番艦の愛宕です。<br>連合艦隊旗艦も務めた愛宕、精一杯頑張ります！<br>皆さんと一緒に、新しい歴史を刻みたいですね♪',
    fuelCapacity: 40, ammoCapacity: 65, resourceName: 'pjnwfxpwqeqg',
    imageVersion: 54, voiceVersion: 22, portVoiceVersion: 627
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
    shipId: 78, catalogId: 21, name: '金剛', yomi: 'こんごう', shipType: 8, shipClass: 6, sortId: 1011,
    afterRemodel: 209, remodelLevel: 25, remodelAmmo: 600, remodelSteel: 400,
    rarity: 5, maxLevel: 100, slotCount: 3,
    initialStats: {
      hp: 63, firepower: 63, armor: 52, torpedo: 0, evasion: 30, aa: 24, aircraft: 3,
      speed: 10, los: 13, range: 3, luck: 12, asw: 0,
      hpMax: 79, hpMarried: 70, hpImprovement: 72, firepowerMax: 89,
      aaMax: 69, armorMax: 69, evasionMinInitial: 30, evasionMaxInitial: 30,
      evasionMax: 59, evasion185Min: 84, evasion185Max: 84, losMinInitial: 13,
      losMaxInitial: 13, losMax: 39, los185Min: 61, los185Max: 61, luckMax: 49
    },
    aircraft: [3, 3, 3], initialEquipment: [7, 11, 37, -1, -1], buildTime: 240,
    dismantleResources: { fuel: 10, ammo: 4, steel: 33, bauxite: 3 },
    improvementLimits: { firepower: 4, torpedo: 0, aa: 3, armor: 3 },
    dropText: 'Yes! 金剛です！<br>よろしくお願いします！',
    catalogText: '金剛型戦艦１番艦、金剛です！<br>英国で生まれた帰国子女の戦艦です。<br>Burning Loveの精神で、お仕えします！',
    fuelCapacity: 90, ammoCapacity: 110, resourceName: 'pjwghttyuqtn',
    imageVersion: 59, voiceVersion: 23, portVoiceVersion: 627
  },
  79: {
    shipId: 79, sortId: 23, name: '榛名', yomi: 'はるな', shipClass: 8, shipType: 6, rarity: 5,
    maxLevel: 100, slotCount: 3, initialStats: { hp: 63, firepower: 63, armor: 52, torpedo: 0, evasion: 30, aa: 24, aircraft: 3, speed: 10, los: 13, range: 3, luck: 15, asw: 0 }
  },
  80: {
    shipId: 80, catalogId: 1, name: '長門', yomi: 'ながと', shipType: 9, shipClass: 19, sortId: 1091,
    afterRemodel: 275, remodelLevel: 30, remodelAmmo: 900, remodelSteel: 800,
    rarity: 7, maxLevel: 100, slotCount: 4,
    initialStats: {
      hp: 80, firepower: 82, armor: 75, torpedo: 0, evasion: 24, aa: 31, aircraft: 3,
      speed: 5, los: 12, range: 3, luck: 20, asw: 0,
      hpMax: 94, hpMarried: 88, hpImprovement: 90, firepowerMax: 99,
      aaMax: 89, armorMax: 89, evasionMinInitial: 24, evasionMaxInitial: 24,
      evasionMax: 49, evasion185Min: 70, evasion185Max: 70, losMinInitial: 12,
      losMaxInitial: 12, losMax: 39, los185Min: 62, los185Max: 62, luckMax: 79
    },
    aircraft: [3, 3, 3, 3], initialEquipment: [8, 4, 25, -1, -1], buildTime: 300,
    dismantleResources: { fuel: 10, ammo: 5, steel: 40, bauxite: 7 },
    improvementLimits: { firepower: 5, torpedo: 0, aa: 4, armor: 4 },
    dropText: '長門型戦艦一番艦、長門。推して参る！',
    catalogText: '長門型戦艦一番艦、長門だ。<br>かつて世界のビッグ７と謳われた、日本海軍戦艦の<br>象徴的存在だ。連合艦隊旗艦も務めた。<br>その名に恥じぬよう、貴様と共に戦い抜こう。',
    fuelCapacity: 100, ammoCapacity: 130, resourceName: 'qcylvqhtuadl',
    imageVersion: 49, voiceVersion: 24, portVoiceVersion: 627
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
    shipId: 110, catalogId: 106, name: '翔鶴', yomi: 'しょうかく', shipType: 11, shipClass: 33, sortId: 2051,
    afterRemodel: 288, remodelLevel: 30, remodelAmmo: 350, remodelSteel: 750,
    rarity: 5, maxLevel: 100, slotCount: 4,
    initialStats: {
      hp: 62, firepower: 0, armor: 33, torpedo: 0, evasion: 36, aa: 29, aircraft: 21,
      speed: 10, los: 44, range: 1, luck: 10, asw: 0,
      hpMax: 79, hpMarried: 69, hpImprovement: 71, firepowerMax: 39,
      aaMax: 69, armorMax: 49, evasionMinInitial: 36, evasionMaxInitial: 36,
      evasionMax: 59, evasion185Min: 78, evasion185Max: 78, losMinInitial: 44,
      losMaxInitial: 44, losMax: 69, los185Min: 90, los185Max: 90, luckMax: 49
    },
    aircraft: [21, 21, 21, 12], initialEquipment: [20, 23, 16, -1, -1], buildTime: 360,
    dismantleResources: { fuel: 7, ammo: 7, steel: 20, bauxite: 10 },
    improvementLimits: { firepower: 0, torpedo: 0, aa: 3, armor: 3 },
    dropText: '翔鶴型正規空母一番艦、翔鶴です。<br>どうぞよろしくお願いいたします。',
    catalogText: '翔鶴型正規空母一番艦、翔鶴です。<br>妹の瑞鶴とともに、第五航空戦隊を編成いたします。<br>どうぞよろしくお願いいたします。',
    fuelCapacity: 85, ammoCapacity: 75, resourceName: 'idcnwttqovfp',
    imageVersion: 49, voiceVersion: 32, portVoiceVersion: 627
  },
  111: {
    shipId: 111, catalogId: 107, name: '瑞鶴', yomi: 'ずいかく', shipType: 11, shipClass: 33, sortId: 2061,
    afterRemodel: 112, remodelLevel: 25, remodelAmmo: 350, remodelSteel: 750,
    rarity: 6, maxLevel: 100, slotCount: 4,
    initialStats: {
      hp: 62, firepower: 0, armor: 33, torpedo: 0, evasion: 39, aa: 29, aircraft: 21,
      speed: 10, los: 44, range: 1, luck: 40, asw: 0,
      hpMax: 79, hpMarried: 69, hpImprovement: 71, firepowerMax: 39,
      aaMax: 69, armorMax: 49, evasionMinInitial: 39, evasionMaxInitial: 39,
      evasionMax: 69, evasion185Min: 95, evasion185Max: 95, losMinInitial: 44,
      losMaxInitial: 44, losMax: 69, los185Min: 90, los185Max: 90, luckMax: 89
    },
    aircraft: [21, 21, 21, 12], initialEquipment: [20, 23, 16, -1, -1], buildTime: 360,
    dismantleResources: { fuel: 7, ammo: 7, steel: 20, bauxite: 10 },
    improvementLimits: { firepower: 0, torpedo: 0, aa: 3, armor: 3 },
    dropText: '翔鶴型正規空母二番艦、瑞鶴よ。<br>よろしくね！',
    catalogText: '翔鶴型正規空母二番艦、瑞鶴よ！<br>姉の翔鶴とともに、第五航空戦隊を編成してるの。<br>よろしくお願いするわね！',
    fuelCapacity: 85, ammoCapacity: 75, resourceName: 'hxygjfcohvvj',
    imageVersion: 55, voiceVersion: 33, portVoiceVersion: 627
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
  131: {
    shipId: 131, catalogId: 131, name: '大和', yomi: 'やまと', shipType: 9, shipClass: 37, sortId: 1111,
    afterRemodel: 136, remodelLevel: 60, remodelAmmo: 2500, remodelSteel: 3000,
    rarity: 8, maxLevel: 100, slotCount: 4,
    initialStats: {
      hp: 93, firepower: 96, armor: 88, torpedo: 0, evasion: 27, aa: 50, aircraft: 7,
      speed: 5, los: 15, range: 4, luck: 12, asw: 0,
      hpMax: 98, hpMarried: 98, hpImprovement: 98, firepowerMax: 129,
      aaMax: 94, armorMax: 108, evasionMinInitial: 27, evasionMaxInitial: 27,
      evasionMax: 59, evasion185Min: 86, evasion185Max: 86, losMinInitial: 15,
      losMaxInitial: 15, losMax: 39, los185Min: 59, los185Max: 59, luckMax: 79
    },
    aircraft: [7, 7, 7, 7], initialEquipment: [9, 12, 59, -1, -1], buildTime: 480,
    dismantleResources: { fuel: 35, ammo: 17, steel: 80, bauxite: 20 },
    improvementLimits: { firepower: 5, torpedo: 0, aa: 4, armor: 5 },
    dropText: '大和型戦艦一番艦、大和。推して参ります。',
    catalogText: '大和型戦艦一番艦、大和です。<br>艦隊決戦の切り札として建造された、世界最大最強<br>の戦艦です。<br>連合艦隊、推して参ります！',
    fuelCapacity: 150, ammoCapacity: 200, resourceName: 'ldxiugtvxtst',
    imageVersion: 49, voiceVersion: 36, portVoiceVersion: 627
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

// 既存データを新形式に変換するヘルパー
export const upgradeOldFormat = (oldData: any): ShipMasterData => {
  const stats = oldData.initialStats
  return {
    ...oldData,
    catalogId: oldData.catalogId || oldData.shipId,
    initialStats: {
      // 既存フィールド保持
      hp: stats.hp,
      firepower: stats.firepower,
      armor: stats.armor,
      torpedo: stats.torpedo,
      evasion: stats.evasion,
      aa: stats.aa,
      aircraft: stats.aircraft,
      speed: stats.speed,
      los: stats.los,
      range: stats.range,
      luck: stats.luck,
      asw: stats.asw,
      // 新規フィールド（推定値）
      hpMax: stats.hpMax || Math.floor(stats.hp * 2),
      firepowerMax: stats.firepowerMax || Math.floor(stats.firepower * 3),
      torpedoMax: stats.torpedoMax || Math.floor(stats.torpedo * 2.5),
      aaMax: stats.aaMax || Math.floor(stats.aa * 4),
      armorMax: stats.armorMax || Math.floor(stats.armor * 3),
      aswMax: stats.aswMax || Math.floor(stats.asw * 3),
      evasionMax: stats.evasionMax || Math.floor(stats.evasion * 1.5),
      losMax: stats.losMax || Math.floor(stats.los * 4),
      luckMax: stats.luckMax || Math.floor(stats.luck * 3)
    }
  }
}

// デフォルト艦娘データ
const getDefaultShipData = (shipId: number): ShipMasterData => ({
  shipId: shipId || 0,
  catalogId: shipId || 0,
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

// 後方互換性のためのアダプター関数群
export const getLegacyInitialStats = (masterData: ShipMasterData) => {
  return {
    hp: masterData.initialStats.hp,
    firepower: masterData.initialStats.firepower,
    armor: masterData.initialStats.armor,
    torpedo: masterData.initialStats.torpedo,
    evasion: masterData.initialStats.evasionMaxInitial || masterData.initialStats.evasionMax || 30,
    aa: masterData.initialStats.aa,
    aircraft: masterData.aircraft?.[0] || 0,
    speed: masterData.initialStats.speed,
    los: masterData.initialStats.losMinInitial || masterData.initialStats.losMax || 10,
    range: masterData.initialStats.range,
    luck: masterData.initialStats.luck,
    asw: masterData.initialStats.aswMinInitial || masterData.initialStats.aswMax || 0
  }
}

// CSVデータパース用ヘルパー
export const parseCSVToShipMasterData = (csvRow: string[]): ShipMasterData => {
  // CSV列順: 艦船ID,図鑑番号,艦名,読み,艦種,艦型,ソート順,改装前,改装後,改装Lv,改装弾薬,改装鋼材,改装設計図,カタパルト,戦闘詳報,新型航空兵装資材,改装段階,耐久初期,耐久最大,耐久結婚,耐久改修,火力初期,火力最大,雷装初期,雷装最大,対空初期,対空最大,装甲初期,装甲最大,対潜初期最小,対潜初期最大,対潜最大,対潜185最小,対潜185最大,回避初期最小,回避初期最大,回避最大,回避185最小,回避185最大,索敵初期最小,索敵初期最大,索敵最大,索敵185最小,索敵185最大,運初期,運最大,速力,射程,レア,スロット数,搭載機数1,搭載機数2,搭載機数3,搭載機数4,搭載機数5,初期装備1,初期装備2,初期装備3,初期装備4,初期装備5,建造時間,解体燃料,解体弾薬,解体鋼材,解体ボーキ,改修火力,改修雷装,改修対空,改修装甲,ドロップ文章,図鑑文章,搭載燃料,搭載弾薬,ボイス,リソース名,画像バージョン,ボイスバージョン,母港ボイスバージョン
  const parseNum = (str: string, defaultVal = 0): number => {
    const num = parseInt(str?.trim() || '0', 10)
    return isNaN(num) ? defaultVal : num
  }
  
  return {
    shipId: parseNum(csvRow[0]),
    catalogId: parseNum(csvRow[1]),
    name: csvRow[2]?.trim() || '',
    yomi: csvRow[3]?.trim() || '',
    shipType: parseNum(csvRow[4]),
    shipClass: parseNum(csvRow[5]),
    sortId: parseNum(csvRow[6]),
    beforeRemodel: parseNum(csvRow[7]) || undefined,
    afterRemodel: parseNum(csvRow[8]) || undefined,
    remodelLevel: parseNum(csvRow[9]) || undefined,
    remodelAmmo: parseNum(csvRow[10]) || undefined,
    remodelSteel: parseNum(csvRow[11]) || undefined,
    remodelBlueprint: parseNum(csvRow[12]) || undefined,
    catapult: parseNum(csvRow[13]) || undefined,
    actionReport: parseNum(csvRow[14]) || undefined,
    aviationMaterial: parseNum(csvRow[15]) || undefined,
    remodelStage: parseNum(csvRow[16]) || undefined,
    initialStats: {
      // 既存必須フィールド
      hp: parseNum(csvRow[17]),
      firepower: parseNum(csvRow[21]),
      armor: parseNum(csvRow[27]),
      torpedo: parseNum(csvRow[23]),
      evasion: parseNum(csvRow[34], 30), // 回避初期最小値、なければデフォルト
      aa: parseNum(csvRow[25]),
      aircraft: parseNum(csvRow[50], 0), // 搭載機数1、なければ0
      speed: parseNum(csvRow[46]),
      los: parseNum(csvRow[39], 10), // 索敵初期最小値、なければデフォルト
      range: parseNum(csvRow[47]),
      luck: parseNum(csvRow[44]),
      asw: parseNum(csvRow[29], 0), // 対潜初期最小値、なければ0
      
      // 新規optionalフィールド
      hpMax: parseNum(csvRow[18]) || undefined,
      hpMarried: parseNum(csvRow[19]) || undefined,
      hpImprovement: parseNum(csvRow[20]) || undefined,
      firepowerMax: parseNum(csvRow[22]) || undefined,
      torpedoMax: parseNum(csvRow[24]) || undefined,
      aaMax: parseNum(csvRow[26]) || undefined,
      armorMax: parseNum(csvRow[28]) || undefined,
      aswMinInitial: parseNum(csvRow[29]) || undefined,
      aswMaxInitial: parseNum(csvRow[30]) || undefined,
      aswMax: parseNum(csvRow[31]) || undefined,
      asw185Min: parseNum(csvRow[32]) || undefined,
      asw185Max: parseNum(csvRow[33]) || undefined,
      evasionMinInitial: parseNum(csvRow[34]) || undefined,
      evasionMaxInitial: parseNum(csvRow[35]) || undefined,
      evasionMax: parseNum(csvRow[36]) || undefined,
      evasion185Min: parseNum(csvRow[37]) || undefined,
      evasion185Max: parseNum(csvRow[38]) || undefined,
      losMinInitial: parseNum(csvRow[39]) || undefined,
      losMaxInitial: parseNum(csvRow[40]) || undefined,
      losMax: parseNum(csvRow[41]) || undefined,
      los185Min: parseNum(csvRow[42]) || undefined,
      los185Max: parseNum(csvRow[43]) || undefined,
      luckMax: parseNum(csvRow[45]) || undefined
    },
    rarity: parseNum(csvRow[48]),
    slotCount: parseNum(csvRow[49]),
    aircraft: [
      parseNum(csvRow[50]) || undefined,
      parseNum(csvRow[51]) || undefined,
      parseNum(csvRow[52]) || undefined,
      parseNum(csvRow[53]) || undefined,
      parseNum(csvRow[54]) || undefined,
    ].filter(n => n !== undefined) as number[],
    initialEquipment: [
      parseNum(csvRow[55]) || undefined,
      parseNum(csvRow[56]) || undefined,
      parseNum(csvRow[57]) || undefined,
      parseNum(csvRow[58]) || undefined,
      parseNum(csvRow[59]) || undefined,
    ].filter(n => n !== undefined) as number[],
    buildTime: parseNum(csvRow[60]) || undefined,
    dismantleResources: {
      fuel: parseNum(csvRow[61]),
      ammo: parseNum(csvRow[62]),
      steel: parseNum(csvRow[63]),
      bauxite: parseNum(csvRow[64])
    },
    improvementLimits: {
      firepower: parseNum(csvRow[65]),
      torpedo: parseNum(csvRow[66]),
      aa: parseNum(csvRow[67]),
      armor: parseNum(csvRow[68])
    },
    dropText: csvRow[69]?.trim() || undefined,
    catalogText: csvRow[70]?.trim() || undefined,
    fuelCapacity: parseNum(csvRow[71]) || undefined,
    ammoCapacity: parseNum(csvRow[72]) || undefined,
    voiceFlag: parseNum(csvRow[73]) || undefined,
    resourceName: csvRow[74]?.trim() || undefined,
    imageVersion: parseNum(csvRow[75]) || undefined,
    voiceVersion: parseNum(csvRow[76]) || undefined,
    portVoiceVersion: parseNum(csvRow[77]) || undefined,
    maxLevel: 100 // デフォルト値
  }
}
