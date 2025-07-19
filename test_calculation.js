// FleetAnalysisManagerのcalculateStatFromLevel関数をテスト
const calculateStatFromLevel = (level, statMin, statMax) => {
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

// FleetComposerの計算式と比較テスト
const testCases = [
  { level: 1, statMin: 10, statMax: 50, expected: 10 },
  { level: 50, statMin: 10, statMax: 50, expected: 30 },
  { level: 99, statMin: 10, statMax: 50, expected: 50 },
  { level: 1, statMin: 15, statMax: 70, expected: 15 },
  { level: 75, statMin: 15, statMax: 70, expected: 56 },
  { level: 99, statMin: 15, statMax: 70, expected: 70 },
  { level: 1, statMin: 0, statMax: 0, expected: 0 },
  { level: 50, statMin: 20, statMax: 20, expected: 20 }
];

console.log('=== FleetAnalysisManager calculateStatFromLevel テスト ===');
testCases.forEach(({ level, statMin, statMax, expected }) => {
  const result = calculateStatFromLevel(level, statMin, statMax);
  const status = result === expected ? '✅' : '❌';
  console.log(`${status} レベル${level}, 最小${statMin}, 最大${statMax} → 結果: ${result}, 期待: ${expected}`);
});

// 異なる艦種のテストケース
console.log('\n=== 異なる艦種での計算テスト ===');
const shipTypes = [
  { name: '駆逐艦', hp: { min: 15, max: 31 }, asw: { min: 20, max: 60 }, luck: { min: 10, max: 49 } },
  { name: '重巡洋艦', hp: { min: 40, max: 65 }, asw: { min: 0, max: 40 }, luck: { min: 5, max: 39 } },
  { name: '戦艦', hp: { min: 80, max: 98 }, asw: { min: 0, max: 0 }, luck: { min: 3, max: 39 } },
  { name: '軽空母', hp: { min: 40, max: 50 }, asw: { min: 0, max: 50 }, luck: { min: 12, max: 52 } }
];

shipTypes.forEach(ship => {
  console.log(`\n--- ${ship.name} ---`);
  [1, 50, 99].forEach(level => {
    const hp = calculateStatFromLevel(level, ship.hp.min, ship.hp.max);
    const asw = calculateStatFromLevel(level, ship.asw.min, ship.asw.max);
    const luck = calculateStatFromLevel(level, ship.luck.min, ship.luck.max);
    console.log(`レベル${level}: HP=${hp}, 対潜=${asw}, 運=${luck}`);
  });
});