import type { ShipMasterData } from '../data/shipMasterDataCore'

// 艦娘の現在ステータス計算ユーティリティ
export interface CalculatedShipStats {
  hp: number
  firepower: number
  torpedo: number
  aa: number
  armor: number
  evasion: number
  asw: number
  los: number
  luck: number
  range: number
  speed: number
  aircraft: number
}

// レベルによるステータス成長計算
export const calculateStatGrowth = (
  baseValue: number, 
  maxValue: number, 
  currentLevel: number, 
  maxLevel: number = 99
): number => {
  if (currentLevel <= 1) return baseValue
  if (currentLevel >= maxLevel) return maxValue
  
  // 線形成長を仮定（実際にはより複雑だが簡易版）
  const growthRate = (maxValue - baseValue) / (maxLevel - 1)
  return Math.floor(baseValue + growthRate * (currentLevel - 1))
}

// ステータス計算（初期値ベース + 改修値）
export const calculateShipStats = (
  masterData: ShipMasterData,
  currentLevel: number,
  currentStats: {
    hp?: number
    firepower?: number
    torpedo?: number
    aa?: number
    armor?: number
    evasion?: number
    asw?: number
    los?: number
    luck?: number
  },
  improvements?: {
    firepower?: number
    torpedo?: number
    aa?: number
    armor?: number
    hp?: number
    asw?: number
    evasion?: number
    luck?: number
  }
): CalculatedShipStats => {
  const initialStats = masterData.initialStats
  
  // 最大値の推定（初期値から計算）
  const estimatedMaxStats = {
    hp: Math.floor(initialStats.hp * 2.5),
    firepower: Math.floor(initialStats.firepower * 3.5),
    torpedo: Math.floor(initialStats.torpedo * 3.0),
    aa: Math.floor(initialStats.aa * 4.0),
    armor: Math.floor(initialStats.armor * 3.5),
    evasion: Math.floor(initialStats.evasion * 1.8),
    asw: Math.floor(initialStats.asw * 4.0),
    los: Math.floor(initialStats.los * 4.0),
    luck: Math.floor(initialStats.luck * 1.5)
  }

  // 現在のレベルでの基本ステータス計算（初期値ベース）
  const levelBasedStats = {
    hp: calculateStatGrowth(initialStats.hp, estimatedMaxStats.hp, currentLevel),
    firepower: calculateStatGrowth(initialStats.firepower, estimatedMaxStats.firepower, currentLevel),
    torpedo: calculateStatGrowth(initialStats.torpedo, estimatedMaxStats.torpedo, currentLevel),
    aa: calculateStatGrowth(initialStats.aa, estimatedMaxStats.aa, currentLevel),
    armor: calculateStatGrowth(initialStats.armor, estimatedMaxStats.armor, currentLevel),
    evasion: calculateStatGrowth(initialStats.evasion, estimatedMaxStats.evasion, currentLevel),
    asw: calculateStatGrowth(initialStats.asw, estimatedMaxStats.asw, currentLevel),
    los: calculateStatGrowth(initialStats.los, estimatedMaxStats.los, currentLevel),
    luck: calculateStatGrowth(initialStats.luck, estimatedMaxStats.luck, currentLevel)
  }

  // JSONデータから基本値を取得、なければレベルベース値を使用
  const baseStats = {
    hp: currentStats.hp || levelBasedStats.hp,
    firepower: currentStats.firepower || levelBasedStats.firepower,
    torpedo: currentStats.torpedo || levelBasedStats.torpedo,
    aa: currentStats.aa || levelBasedStats.aa,
    armor: currentStats.armor || levelBasedStats.armor,
    evasion: currentStats.evasion || levelBasedStats.evasion,
    asw: currentStats.asw || levelBasedStats.asw,
    los: currentStats.los || levelBasedStats.los,
    luck: currentStats.luck || levelBasedStats.luck
  }

  // 改修値を追加して最終ステータスを計算
  const finalStats: CalculatedShipStats = {
    hp: baseStats.hp + (improvements?.hp || 0),
    firepower: baseStats.firepower + (improvements?.firepower || 0),
    torpedo: baseStats.torpedo + (improvements?.torpedo || 0),
    aa: baseStats.aa + (improvements?.aa || 0),
    armor: baseStats.armor + (improvements?.armor || 0),
    evasion: baseStats.evasion + (improvements?.evasion || 0),
    asw: baseStats.asw + (improvements?.asw || 0),
    los: baseStats.los,
    luck: baseStats.luck + (improvements?.luck || 0),
    range: initialStats.range,
    speed: initialStats.speed,
    aircraft: initialStats.aircraft
  }

  return finalStats
}

// 改修値の解析（api_kyouka配列から）
export const parseImprovements = (kyoukaArray?: number[]): {
  firepower: number
  torpedo: number
  aa: number
  armor: number
  luck: number
  hp: number
  asw: number
} => {
  if (!kyoukaArray || kyoukaArray.length < 7) {
    return { firepower: 0, torpedo: 0, aa: 0, armor: 0, luck: 0, hp: 0, asw: 0 }
  }

  return {
    firepower: kyoukaArray[0] || 0,  // 火力改修
    torpedo: kyoukaArray[1] || 0,    // 雷装改修
    aa: kyoukaArray[2] || 0,         // 対空改修
    armor: kyoukaArray[3] || 0,      // 装甲改修
    luck: kyoukaArray[4] || 0,       // 運改修
    hp: kyoukaArray[5] || 0,         // 耐久改修
    asw: kyoukaArray[6] || 0         // 対潜改修
  }
}

// ステータス色分け用（成長度による）
export const getStatColor = (current: number, max: number): string => {
  const ratio = current / max
  if (ratio >= 0.9) return '#4caf50' // 緑（高い）
  if (ratio >= 0.7) return '#ff9800' // オレンジ（中）
  if (ratio >= 0.5) return '#2196f3' // 青（普通）
  return '#9e9e9e' // グレー（低い）
}

// ケッコン艦判定
export const isMarried = (level: number): boolean => {
  return level >= 100
}

// レベル上限判定
export const getMaxLevel = (isMarried: boolean): number => {
  if (isMarried) return 175
  return 99
}