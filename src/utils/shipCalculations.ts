// Ship calculation utilities based on fleethub-core logic

export interface ShipStats {
  hp: number;
  firepower: number;
  torpedo: number;
  armor: number;
  anti_air: number;
  accuracy: number;
  evasion: number;
  asw: number;
  los: number;
  range: number;
  speed: number;
  luck: number;
}

export interface ShipData {
  id: number;
  lv: number;
  exp?: number[];
  slotnum?: number;
  slot?: number[];
  kyouka?: number[];
  kaihi?: number;
  taiku?: number;
  [key: string]: any;
}

export interface MasterShipData {
  shipId: number;
  name: string;
  slotCount: number;
  initialStats: {
    hp: number;
    firepower: number;
    armor: number;
    torpedo: number;
    evasion: number;
    aa: number;
    aircraft: number;
    speed: number;
    los: number;
    range: number;
    luck: number;
    asw: number;
  };
}

// Marriage bonus calculation (from fleethub)
const getMarriageBonus = (baseStat: number): number => {
  if (baseStat <= 29) return 4;
  if (baseStat <= 39) return 5;
  if (baseStat <= 49) return 6;
  if (baseStat <= 69) return 7;
  if (baseStat <= 89) return 8;
  return 9;
};

// Level-based stat growth calculation
const calculateLevelGrowth = (
  baseStat: number,
  maxStat: number,
  level: number,
  maxLevel: number = 100
): number => {
  if (level <= 1) return baseStat;
  
  const growthRate = (maxStat - baseStat) / (maxLevel - 1);
  return Math.floor(baseStat + growthRate * (level - 1));
};

// Marriage bonus application (level 100+)
const applyMarriageBonus = (stat: number, level: number, statType: 'hp' | 'other'): number => {
  if (level < 100) return stat;
  
  if (statType === 'hp') {
    // HP gets marriage bonus differently
    return stat + getMarriageBonus(stat);
  } else {
    // Other stats get smaller marriage bonus
    return stat + Math.min(Math.floor(stat * 0.06), 9);
  }
};

// Modernization (kyouka) bonus calculation
const getModernizationBonus = (kyouka: number[] = [], statIndex: number): number => {
  return kyouka[statIndex] || 0;
};

// Calculate naked stat (base + level growth + modernization + marriage)
export const calculateNakedStat = (
  masterData: MasterShipData,
  shipData: ShipData,
  statKey: keyof ShipStats
): number => {
  const level = shipData.lv || 1;
  const kyouka = shipData.kyouka || [];
  
  // Map stat keys to master data and kyouka indices
  const statMapping: Record<keyof ShipStats, { 
    initial: keyof MasterShipData['initialStats'], 
    kyoukaIndex: number,
    isHp?: boolean 
  }> = {
    hp: { initial: 'hp', kyoukaIndex: 0, isHp: true },
    firepower: { initial: 'firepower', kyoukaIndex: 1 },
    torpedo: { initial: 'torpedo', kyoukaIndex: 2 },
    armor: { initial: 'armor', kyoukaIndex: 3 },
    anti_air: { initial: 'aa', kyoukaIndex: 4 },
    accuracy: { initial: 'firepower', kyoukaIndex: -1 }, // No direct kyouka
    evasion: { initial: 'evasion', kyoukaIndex: -1 }, // No direct kyouka
    asw: { initial: 'asw', kyoukaIndex: 5 },
    los: { initial: 'los', kyoukaIndex: 6 },
    range: { initial: 'range', kyoukaIndex: -1 }, // No kyouka
    speed: { initial: 'speed', kyoukaIndex: -1 }, // No kyouka
    luck: { initial: 'luck', kyoukaIndex: 7 }
  };
  
  const mapping = statMapping[statKey];
  if (!mapping) return 0;
  
  const baseStat = masterData.initialStats[mapping.initial];
  
  // For range and speed, return base value directly
  if (statKey === 'range' || statKey === 'speed') {
    return baseStat;
  }
  
  // Calculate level growth (simplified - in reality this would use master data max stats)
  const maxStat = Math.floor(baseStat * 1.5); // Simplified max stat
  let stat = calculateLevelGrowth(baseStat, maxStat, level);
  
  // Add modernization bonus
  if (mapping.kyoukaIndex >= 0) {
    stat += getModernizationBonus(kyouka, mapping.kyoukaIndex);
  }
  
  // Apply marriage bonus for level 100+
  stat = applyMarriageBonus(stat, level, mapping.isHp ? 'hp' : 'other');
  
  return stat;
};

// Equipment bonus calculation (placeholder)
export const calculateEquipmentBonus = (
  _shipData: ShipData,
  _statKey: keyof ShipStats
): number => {
  // This would normally calculate from equipped items
  // For now, return 0 as placeholder
  // In the real implementation, this would:
  // 1. Get equipped items from shipData.slot
  // 2. Sum up stat bonuses from each item
  // 3. Apply equipment synergy bonuses (ebonuses)
  
  return 0;
};

// Calculate final stat (naked + equipment bonuses)
export const calculateFinalStat = (
  masterData: MasterShipData,
  shipData: ShipData,
  statKey: keyof ShipStats
): number => {
  const naked = calculateNakedStat(masterData, shipData, statKey);
  const equipBonus = calculateEquipmentBonus(shipData, statKey);
  
  return naked + equipBonus;
};

// Calculate all stats for a ship
export const calculateAllStats = (
  masterData: MasterShipData,
  shipData: ShipData
): ShipStats => {
  return {
    hp: calculateFinalStat(masterData, shipData, 'hp'),
    firepower: calculateFinalStat(masterData, shipData, 'firepower'),
    torpedo: calculateFinalStat(masterData, shipData, 'torpedo'),
    armor: calculateFinalStat(masterData, shipData, 'armor'),
    anti_air: calculateFinalStat(masterData, shipData, 'anti_air'),
    accuracy: calculateFinalStat(masterData, shipData, 'accuracy'),
    evasion: calculateFinalStat(masterData, shipData, 'evasion'),
    asw: calculateFinalStat(masterData, shipData, 'asw'),
    los: calculateFinalStat(masterData, shipData, 'los'),
    range: calculateFinalStat(masterData, shipData, 'range'),
    speed: calculateFinalStat(masterData, shipData, 'speed'),
    luck: calculateFinalStat(masterData, shipData, 'luck')
  };
};

// Speed rank utilities (from fleethub)
export const getSpeedRank = (speed: number): string => {
  if (speed >= 20) return 'FastestPlus';
  if (speed >= 15) return 'Fastest';
  if (speed >= 10) return 'Fast';
  if (speed >= 5) return 'Slow';
  return 'Slowest';
};

// Range abbreviation utilities (from fleethub)
export const getRangeAbbr = (range: number): string => {
  if (range >= 4) return 'VeryLong';
  if (range >= 3) return 'Long';
  if (range >= 2) return 'Medium';
  return 'Short';
};

// Utility to format stat with modifiers
export const formatStatWithModifiers = (
  baseStat: number,
  equipBonus: number = 0,
  userMod: number = 0
): string => {
  let result = baseStat.toString();
  
  if (equipBonus || userMod) {
    const modifiers = [];
    if (equipBonus > 0) modifiers.push(`+${equipBonus}`);
    if (userMod !== 0) modifiers.push(userMod > 0 ? `+${userMod}` : userMod.toString());
    result += ` (${modifiers.join('')})`;
  }
  
  return result;
};