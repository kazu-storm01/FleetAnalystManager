// FleetAnalysisManagerとFleetComposerの計算結果を比較テスト

// FleetAnalysisManagerの計算式（修正後）
const calculateStatFromLevel_FleetAnalysis = (level, statMin, statMax) => {
  if (statMin === 0 && (!statMax || statMax === 0)) {
    return 0;
  }
  if (statMax === undefined || statMax === 0) {
    return statMin;
  }
  if (level <= 1) {
    return statMin;
  }
  if (level >= 99) {
    return statMax;
  }
  if (statMax <= statMin) {
    return statMin;
  }
  
  // 修正後の計算式
  const ratio = (level - 1) / (99 - 1);
  return Math.floor(statMin + (statMax - statMin) * ratio);
};

// FleetComposerの計算式
const calculateStatFromLevel_FleetComposer = (level, statMin, statMax) => {
  if (statMin === 0 && (!statMax || statMax === 0)) {
    return 0;
  }
  if (statMax === undefined || statMax === 0) {
    return statMin;
  }
  if (level <= 1) {
    return statMin;
  }
  if (statMax <= statMin) {
    return statMin;
  }
  
  // レベル99以上の場合は最大値を返す
  if (level >= 99) {
    return statMax;
  }
  
  // 線形補間でレベルに応じたステータスを計算
  const ratio = (level - 1) / (99 - 1);
  return Math.floor(statMin + (statMax - statMin) * ratio);
};

// 詳細な比較テスト
const detailedTestCases = [
  // 駆逐艦系
  { shipType: '駆逐艦', level: 1, statMin: 15, statMax: 31, statName: 'HP' },
  { shipType: '駆逐艦', level: 25, statMin: 15, statMax: 31, statName: 'HP' },
  { shipType: '駆逐艦', level: 50, statMin: 15, statMax: 31, statName: 'HP' },
  { shipType: '駆逐艦', level: 75, statMin: 15, statMax: 31, statName: 'HP' },
  { shipType: '駆逐艦', level: 99, statMin: 15, statMax: 31, statName: 'HP' },
  
  // 重巡系
  { shipType: '重巡洋艦', level: 1, statMin: 40, statMax: 65, statName: 'HP' },
  { shipType: '重巡洋艦', level: 50, statMin: 40, statMax: 65, statName: 'HP' },
  { shipType: '重巡洋艦', level: 99, statMin: 40, statMax: 65, statName: 'HP' },
  
  // 戦艦系
  { shipType: '戦艦', level: 1, statMin: 80, statMax: 98, statName: 'HP' },
  { shipType: '戦艦', level: 50, statMin: 80, statMax: 98, statName: 'HP' },
  { shipType: '戦艦', level: 99, statMin: 80, statMax: 98, statName: 'HP' },
  
  // 対潜値テスト（戦艦は対潜0）
  { shipType: '戦艦', level: 1, statMin: 0, statMax: 0, statName: '対潜' },
  { shipType: '戦艦', level: 50, statMin: 0, statMax: 0, statName: '対潜' },
  { shipType: '戦艦', level: 99, statMin: 0, statMax: 0, statName: '対潜' },
  
  // 駆逐艦の対潜値
  { shipType: '駆逐艦', level: 1, statMin: 20, statMax: 60, statName: '対潜' },
  { shipType: '駆逐艦', level: 50, statMin: 20, statMax: 60, statName: '対潜' },
  { shipType: '駆逐艦', level: 99, statMin: 20, statMax: 60, statName: '対潜' },
  
  // 運値テスト
  { shipType: '駆逐艦', level: 1, statMin: 10, statMax: 49, statName: '運' },
  { shipType: '駆逐艦', level: 50, statMin: 10, statMax: 49, statName: '運' },
  { shipType: '駆逐艦', level: 99, statMin: 10, statMax: 49, statName: '運' },
  
  // 結婚艦レベル（100以上）
  { shipType: '駆逐艦', level: 100, statMin: 15, statMax: 31, statName: 'HP' },
  { shipType: '駆逐艦', level: 120, statMin: 15, statMax: 31, statName: 'HP' },
  { shipType: '駆逐艦', level: 155, statMin: 15, statMax: 31, statName: 'HP' },
];

console.log('=== FleetAnalysisManager vs FleetComposer 計算結果比較 ===');
let allMatch = true;

detailedTestCases.forEach(testCase => {
  const { shipType, level, statMin, statMax, statName } = testCase;
  
  const resultFleetAnalysis = calculateStatFromLevel_FleetAnalysis(level, statMin, statMax);
  const resultFleetComposer = calculateStatFromLevel_FleetComposer(level, statMin, statMax);
  
  const match = resultFleetAnalysis === resultFleetComposer;
  const status = match ? '✅' : '❌';
  
  if (!match) {
    allMatch = false;
    console.log(`${status} ${shipType} Lv${level} ${statName}: FleetAnalysis=${resultFleetAnalysis}, FleetComposer=${resultFleetComposer}`);
  } else {
    console.log(`${status} ${shipType} Lv${level} ${statName}: ${resultFleetAnalysis} (一致)`);
  }
});

console.log(`\n=== 結果 ===`);
if (allMatch) {
  console.log('✅ すべての計算結果が一致しました！');
} else {
  console.log('❌ 計算結果に不一致があります。');
}

// 特殊ケースのテスト
console.log('\n=== 特殊ケースのテスト ===');
const specialCases = [
  { level: 1, statMin: 0, statMax: 0, description: '最小・最大ともに0' },
  { level: 50, statMin: 0, statMax: 0, description: '最小・最大ともに0' },
  { level: 1, statMin: 20, statMax: 20, description: '最小・最大が同じ' },
  { level: 50, statMin: 20, statMax: 20, description: '最小・最大が同じ' },
  { level: 1, statMin: 10, statMax: undefined, description: '最大値が未定義' },
  { level: 50, statMin: 10, statMax: undefined, description: '最大値が未定義' },
];

specialCases.forEach(testCase => {
  const { level, statMin, statMax, description } = testCase;
  
  const resultFleetAnalysis = calculateStatFromLevel_FleetAnalysis(level, statMin, statMax);
  const resultFleetComposer = calculateStatFromLevel_FleetComposer(level, statMin, statMax);
  
  const match = resultFleetAnalysis === resultFleetComposer;
  const status = match ? '✅' : '❌';
  
  console.log(`${status} ${description} (Lv${level}): FA=${resultFleetAnalysis}, FC=${resultFleetComposer}`);
});