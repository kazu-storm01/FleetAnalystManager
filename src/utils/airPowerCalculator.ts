// 制空値計算ユーティリティ

interface Equipment {
  api_type: number[]    // [大分類, 中分類, 小分類, アイコン種別, 0]
  api_tyku: number      // 対空値
  improvement_level?: number  // 改修値
}

interface Ship {
  aircraftSlots: number[]     // 各スロットの搭載数
  equipments?: (Equipment | null)[]  // 装備スロット
}

// 制空値計算に関与する装備種別
const AIR_COMBAT_EQUIPMENT_TYPES = [
  6,  // 艦上戦闘機
  7,  // 艦上爆撃機
  8,  // 艦上攻撃機
  9,  // 艦上偵察機
  10, // 水上偵察機
  11, // 水上爆撃機
  25, // オートジャイロ
  26, // 対潜哨戒機
  41, // 大型飛行艇
  45, // 水上戦闘機
  47, // 陸上攻撃機
  48, // 局地戦闘機
  57  // 噴式機
]

// 装備別改修補正値
const IMPROVEMENT_BONUS: Record<number, number> = {
  6: 0.2,   // 艦戦
  45: 0.2,  // 水戦
  48: 0.2,  // 局戦
  // 爆戦は艦爆扱いだが、個別に判定が必要
  7: 0.25   // 艦爆（爆戦含む）
}

// 熟練度補正テーブル（仮実装 - 実際のゲームでは熟練度データが必要）
const PROFICIENCY_BONUS = {
  fighter: [0, 1, 2, 7, 11, 16, 17, 25],  // 艦戦・水戦・局戦
  bomber: [0, 0, 0, 0, 3, 3, 6, 9]         // 艦攻・艦爆
}

/**
 * 装備の改修補正後対空値を計算
 */
function calculateEquipmentAntiAir(equipment: Equipment): number {
  const baseAntiAir = equipment.api_tyku
  const improvementLevel = equipment.improvement_level || 0
  const equipmentType = equipment.api_type[2]
  
  // 改修補正値を取得
  const bonus = IMPROVEMENT_BONUS[equipmentType] || 0
  const improvementBonus = bonus * improvementLevel
  
  return baseAntiAir + improvementBonus
}

/**
 * スロット単体の制空値を計算
 */
function calculateSlotAirPower(
  equipment: Equipment,
  aircraftCount: number,
  proficiencyLevel: number = 0
): number {
  const equipmentType = equipment.api_type[2]
  
  // 制空値計算に関与しない装備は0
  if (!AIR_COMBAT_EQUIPMENT_TYPES.includes(equipmentType)) {
    return 0
  }
  
  const antiAir = calculateEquipmentAntiAir(equipment)
  
  // 対空値が0の場合は熟練度補正のみ
  if (antiAir === 0) {
    const isFighter = [6, 45, 48].includes(equipmentType)
    const bonusTable = isFighter ? PROFICIENCY_BONUS.fighter : PROFICIENCY_BONUS.bomber
    return bonusTable[Math.min(proficiencyLevel, 7)] || 0
  }
  
  // 基本制空値計算: floor(対空値 × √搭載数)
  const baseAirPower = Math.floor(antiAir * Math.sqrt(aircraftCount))
  
  // 熟練度補正を追加
  const isFighter = [6, 45, 48].includes(equipmentType)
  const bonusTable = isFighter ? PROFICIENCY_BONUS.fighter : PROFICIENCY_BONUS.bomber
  const proficiencyBonus = bonusTable[Math.min(proficiencyLevel, 7)] || 0
  
  return baseAirPower + proficiencyBonus
}

/**
 * 艦娘単体の制空値を計算
 */
export function calculateShipAirPower(ship: Ship): number {
  if (!ship.equipments || !ship.aircraftSlots) {
    return 0
  }
  
  let totalAirPower = 0
  
  for (let i = 0; i < ship.equipments.length; i++) {
    const equipment = ship.equipments[i]
    const aircraftCount = ship.aircraftSlots[i] || 0
    
    if (equipment && aircraftCount > 0) {
      // 熟練度は現在未実装のため0固定
      const slotAirPower = calculateSlotAirPower(equipment, aircraftCount, 0)
      totalAirPower += slotAirPower
    }
  }
  
  return totalAirPower
}

/**
 * 艦隊全体の制空値を計算
 */
export function calculateFleetAirPower(ships: Ship[]): number {
  return ships.reduce((total, ship) => total + calculateShipAirPower(ship), 0)
}

/**
 * 制空状態を判定
 */
export function determineAirSuperiority(allyAirPower: number, enemyAirPower: number): string {
  if (allyAirPower >= enemyAirPower * 3) {
    return '制空権確保'
  } else if (allyAirPower >= enemyAirPower * 1.5) {
    return '航空優勢'
  } else if (allyAirPower >= enemyAirPower * (2/3)) {
    return '航空劣勢'
  } else {
    return '制空権喪失'
  }
}

/**
 * 制空値達成に必要な目標値を計算
 */
export function calculateAirPowerThresholds(enemyAirPower: number) {
  return {
    airSupremacy: Math.ceil(enemyAirPower * 3),      // 制空権確保
    airSuperiority: Math.ceil(enemyAirPower * 1.5),  // 航空優勢
    airDisparity: Math.ceil(enemyAirPower * (2/3))   // 航空劣勢回避
  }
}