const fs = require('fs');
const { execSync } = require('child_process');

try {
  const csvContent = execSync('iconv -f SHIFT_JIS -t UTF-8 -c /home/kazuma/projects/FleetAnalystManager/kancolle.csv', { encoding: 'utf-8' });
  
  const lines = csvContent.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.replace(/"/g, ''));
  
  console.log('Headers analysis:');
  headers.forEach((header, index) => {
    if (header.includes('初期') || header.includes('最大') || header.includes('火力') || header.includes('雷装')) {
      console.log(`${index}: ${header}`);
    }
  });
  
  // 艦種マッピング
  const SHIP_TYPE_MAPPING = {
    1: 'escort', 2: 'destroyer', 3: 'light_cruiser', 4: 'torpedo_cruiser',
    5: 'heavy_cruiser', 6: 'aviation_cruiser', 7: 'light_carrier', 8: 'fast_battleship',
    9: 'battleship', 10: 'aviation_battleship', 11: 'carrier', 12: 'super_battleship',
    13: 'submarine', 14: 'submarine_carrier', 15: 'supply_ship', 16: 'seaplane_tender',
    17: 'armored_carrier', 18: 'repair_ship', 19: 'submarine_tender', 20: 'training_cruiser',
    21: 'landing_ship', 22: 'armored_carrier_alt'
  };

  const allShips = new Map();
  const coreShips = new Map();
  
  // 人気艦のIDリスト
  const popularShipIds = [
    1, 2, 6, 7, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, // 駆逐艦（主要）
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, // 駆逐艦（人気艦）
    42, 43, 44, 45, 46, 47, 48, 49, 50, // 白露型など
    51, 52, 53, 54, 55, 56, 57, 58, 59, 60, // 軽巡・重巡
    61, 62, 63, 64, 65, 66, 67, 68, 69, 70, // 重巡
    71, 72, 73, 74, 75, 76, 77, 78, 79, 80, // 戦艦・空母
    108, 109, 110, 111, 112, 113, 114, 115, 116, 117, // 正規空母
    131, 132, 133, 134, 135, 136, 137, 138, 139, 140, // 大和型など
    143, 144, 145, 146, 147, 148, 149, 150 // 武蔵など
  ];
  
  // データ行を処理（初期値を使用）
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.replace(/"/g, ''));
    
    if (values.length < 50) continue;
    
    const shipId = parseInt(values[0]);
    const sortId = parseInt(values[1]);
    const name = values[2];
    const yomi = values[3];
    const shipClass = parseInt(values[4]);
    const shipType = parseInt(values[5]);
    const rarity = parseInt(values[48]) || 2;
    
    // 初期ステータス値を取得（CSVの初期値列を使用、0ベースのインデックス）
    const initialStats = {
      hp: parseInt(values[17]) || 20,          // 耐久初期 (列18)
      firepower: parseInt(values[21]) || 10,   // 火力初期 (列22)  
      armor: parseInt(values[27]) || 10,       // 装甲初期 (列28)
      torpedo: parseInt(values[23]) || 0,      // 雷装初期 (列24)
      evasion: parseInt(values[33]) || 30,     // 回避初期最小 (列34)
      aa: parseInt(values[25]) || 10,          // 対空初期 (列26)
      aircraft: parseInt(values[49]) || 0,     // 搭載機数合計 (列50)
      speed: parseInt(values[46]) || 5,        // 速力 (列47)
      los: parseInt(values[39]) || 10,         // 索敵初期最小 (列40)
      range: parseInt(values[47]) || 1,        // 射程 (列48)
      luck: parseInt(values[44]) || 10,        // 運初期 (列45)
      asw: parseInt(values[29]) || 0           // 対潜初期最小 (列30)
    };
    
    if (shipId && name) {
      const shipData = {
        shipId,
        sortId,
        name,
        yomi,
        shipClass,
        shipType,
        rarity,
        maxLevel: 100,
        initialStats  // 初期ステータスとして保存
      };
      
      allShips.set(shipId, shipData);
      
      // 人気艦のみコアデータに追加
      if (popularShipIds.includes(shipId)) {
        coreShips.set(shipId, shipData);
      }
    }
  }

  console.log(`Total ships: ${allShips.size}`);
  console.log(`Core ships: ${coreShips.size}`);

  // 一部の艦娘の初期ステータスを確認
  console.log('\nSample initial stats:');
  [1, 20, 131, 26].forEach(id => {
    const ship = allShips.get(id);
    if (ship) {
      console.log(`${ship.name} (ID:${id}):`, ship.initialStats);
    }
  });

  // コアマスターデータ（軽量版）を生成
  let coreOutput = `// 艦娘コアマスターデータ（初期ステータス版）
export interface ShipMasterData {
  shipId: number
  sortId: number
  name: string
  yomi: string
  shipClass: number
  shipType: number
  rarity: number
  maxLevel: number
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

// 艦種マッピング
export const SHIP_TYPE_MAPPING: { [key: number]: string } = {
${Object.entries(SHIP_TYPE_MAPPING).map(([key, value]) => `  ${key}: '${value}',`).join('\n')}
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
  'super_battleship': '超弩級戦艦',
  'aviation_battleship': '航空戦艦',
  'carrier': '正規空母',
  'light_carrier': '軽空母',
  'armored_carrier': '装甲空母',
  'armored_carrier_alt': '装甲空母',
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
`;

  const coreShipArray = Array.from(coreShips.values());
  coreShipArray.forEach((ship, index) => {
    coreOutput += `  ${ship.shipId}: {\n`;
    coreOutput += `    shipId: ${ship.shipId}, sortId: ${ship.sortId}, name: '${ship.name}', yomi: '${ship.yomi}', shipClass: ${ship.shipClass}, shipType: ${ship.shipType}, rarity: ${ship.rarity},\n`;
    coreOutput += `    maxLevel: ${ship.maxLevel}, initialStats: { hp: ${ship.initialStats.hp}, firepower: ${ship.initialStats.firepower}, armor: ${ship.initialStats.armor}, torpedo: ${ship.initialStats.torpedo}, evasion: ${ship.initialStats.evasion}, aa: ${ship.initialStats.aa}, aircraft: ${ship.initialStats.aircraft}, speed: ${ship.initialStats.speed}, los: ${ship.initialStats.los}, range: ${ship.initialStats.range}, luck: ${ship.initialStats.luck}, asw: ${ship.initialStats.asw} }\n`;
    coreOutput += `  }${index < coreShipArray.length - 1 ? ',' : ''}\n`;
  });

  coreOutput += `}

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
  return ship?.name || \`艦娘#\${shipId}\`
}

export const getShipType = (shipClassId: number): string => {
  return SHIP_TYPE_MAPPING[shipClassId] || 'destroyer'
}

export const getShipTypeName = (shipType: string): string => {
  return SHIP_TYPES[shipType as keyof typeof SHIP_TYPES] || '不明'
}
`;

  // 全艦データファイルも生成
  let fullOutput = `// 全艦娘マスターデータ（初期ステータス版）
import type { ShipMasterData } from './shipMasterDataCore'

export const SHIP_MASTER_DATA: { [key: number]: ShipMasterData } = {
`;

  const allShipArray = Array.from(allShips.values());
  allShipArray.forEach((ship, index) => {
    fullOutput += `  ${ship.shipId}: {\n`;
    fullOutput += `    shipId: ${ship.shipId}, sortId: ${ship.sortId}, name: '${ship.name}', yomi: '${ship.yomi}', shipClass: ${ship.shipClass}, shipType: ${ship.shipType}, rarity: ${ship.rarity},\n`;
    fullOutput += `    maxLevel: ${ship.maxLevel}, initialStats: { hp: ${ship.initialStats.hp}, firepower: ${ship.initialStats.firepower}, armor: ${ship.initialStats.armor}, torpedo: ${ship.initialStats.torpedo}, evasion: ${ship.initialStats.evasion}, aa: ${ship.initialStats.aa}, aircraft: ${ship.initialStats.aircraft}, speed: ${ship.initialStats.speed}, los: ${ship.initialStats.los}, range: ${ship.initialStats.range}, luck: ${ship.initialStats.luck}, asw: ${ship.initialStats.asw} }\n`;
    fullOutput += `  }${index < allShipArray.length - 1 ? ',' : ''}\n`;
  });

  fullOutput += `}
`;

  // ファイルを保存
  fs.writeFileSync('/home/kazuma/projects/FleetAnalystManager/src/data/shipMasterDataCore.ts', coreOutput);
  fs.writeFileSync('/home/kazuma/projects/FleetAnalystManager/src/data/shipMasterDataFull.ts', fullOutput);
  
  console.log('Initial stats master data generated successfully!');
  console.log(`Core data size: ${Math.round(coreOutput.length / 1024)} KB`);
  console.log(`Full data size: ${Math.round(fullOutput.length / 1024)} KB`);
  
} catch (error) {
  console.error('Error:', error);
}