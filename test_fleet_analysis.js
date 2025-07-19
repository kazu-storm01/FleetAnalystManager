// FleetAnalysisManagerの艦隊データ解析をテスト
const fs = require('fs');

// FleetAnalysisManagerのcalculateFleetStats関数を再現
const calculateFleetStats = (jsonData) => {
  try {
    const data = JSON.parse(jsonData);
    
    // 基本データ型のバリデーション
    if (typeof data !== 'object' || data === null) {
      throw new Error('艦隊データはオブジェクトまたは配列である必要があります。');
    }
    
    let totalExpValue = 0;
    let shipCountValue = 0;
    let marriedCountValue = 0;
    let luckModTotalValue = 0;
    let hpModTotalValue = 0;
    let aswModTotalValue = 0;

    // 配列の場合の処理
    const ships = Array.isArray(data) ? data : (data.ships || data.api_data?.api_ship || []);
    
    if (!Array.isArray(ships) || ships.length === 0) {
      throw new Error('艦隊データが見つかりません。');
    }

    // 各艦娘の処理
    for (let i = 0; i < ships.length; i++) {
      const ship = ships[i];
      
      // 経験値の取得
      const exp = ship.exp?.[0] || ship.api_exp?.[0] || 0;
      totalExpValue += exp;
      
      // レベルの取得とケッコン判定
      const level = ship.lv || ship.api_lv || 0;
      if (level >= 100) {
        marriedCountValue++;
      }
      
      // 改修値の取得（api_kyouka配列またはst配列）
      const kyoukaArray = ship.api_kyouka || ship.st || [];
      const luckMod = kyoukaArray[4] || 0;  // 運改修
      const hpMod = kyoukaArray[5] || 0;    // 耐久改修
      const aswMod = kyoukaArray[6] || 0;   // 対潜改修
      luckModTotalValue += luckMod;
      hpModTotalValue += hpMod;
      aswModTotalValue += aswMod;
      
      shipCountValue++;
    }

    return { 
      totalExp: totalExpValue, 
      shipCount: shipCountValue, 
      marriedCount: marriedCountValue, 
      luckModTotal: luckModTotalValue,
      hpModTotal: hpModTotalValue,
      aswModTotal: aswModTotalValue
    };
  } catch (error) {
    throw new Error(`JSON解析エラー: ${error.message}`);
  }
};

// テストデータの読み込み
const testFleetData = fs.readFileSync('test_sample_fleet.json', 'utf8');

console.log('=== FleetAnalysisManager 艦隊データ解析テスト ===');
console.log('テストデータ:');
console.log(testFleetData);

try {
  const result = calculateFleetStats(testFleetData);
  
  console.log('\n=== 解析結果 ===');
  console.log(`艦船数: ${result.shipCount}`);
  console.log(`総経験値: ${result.totalExp.toLocaleString()}`);
  console.log(`ケッコン艦数: ${result.marriedCount}`);
  console.log(`運改修合計: ${result.luckModTotal}`);
  console.log(`耐久改修合計: ${result.hpModTotal}`);
  console.log(`対潜改修合計: ${result.aswModTotal}`);
  
  // 期待値と比較
  const expected = {
    shipCount: 5,
    totalExp: 4625100, // 125000 + 1000000 + 3000000 + 100 + 500000
    marriedCount: 1,   // Lv120の1隻のみ
    luckModTotal: 31,  // 5 + 8 + 15 + 0 + 3
    hpModTotal: 41,    // 6 + 10 + 20 + 0 + 5
    aswModTotal: 51    // 7 + 12 + 25 + 0 + 7
  };
  
  console.log('\n=== 期待値との比較 ===');
  Object.keys(expected).forEach(key => {
    const actual = result[key];
    const expect = expected[key];
    const match = actual === expect;
    const status = match ? '✅' : '❌';
    console.log(`${status} ${key}: 結果=${actual}, 期待=${expect}`);
  });
  
  // 詳細な艦娘別データ表示
  console.log('\n=== 艦娘別詳細データ ===');
  const ships = JSON.parse(testFleetData);
  ships.forEach((ship, index) => {
    const level = ship.lv || ship.api_lv || 0;
    const exp = ship.exp?.[0] || ship.api_exp?.[0] || 0;
    const kyouka = ship.api_kyouka || ship.st || [];
    const luckMod = kyouka[4] || 0;
    const hpMod = kyouka[5] || 0;
    const aswMod = kyouka[6] || 0;
    const isMarried = level >= 100;
    
    console.log(`艦娘${index + 1}: Lv${level}, 経験値=${exp.toLocaleString()}, ケッコン=${isMarried ? 'あり' : 'なし'}`);
    console.log(`  改修値: 運+${luckMod}, 耐久+${hpMod}, 対潜+${aswMod}`);
  });
  
} catch (error) {
  console.error('❌ エラー:', error.message);
}