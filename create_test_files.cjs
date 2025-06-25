const XLSX = require('xlsx');

// テストケース1: 最小限のデータ（10名ちょうど）
const minimalData = [
  { '応募者名': 'テスト1', 'URL': '', '備考': '' },
  { '応募者名': 'テスト2', 'URL': '', '備考': '' },
  { '応募者名': 'テスト3', 'URL': '', '備考': '' },
  { '応募者名': 'テスト4', 'URL': '', '備考': '' },
  { '応募者名': 'テスト5', 'URL': '', '備考': '' },
  { '応募者名': 'テスト6', 'URL': '', '備考': '' },
  { '応募者名': 'テスト7', 'URL': '', '備考': '' },
  { '応募者名': 'テスト8', 'URL': '', '備考': '' },
  { '応募者名': 'テスト9', 'URL': '', '備考': '' },
  { '応募者名': 'テスト10', 'URL': '', '備考': '' }
];

// テストケース2: 大量のデータ（100名）
const largeData = Array.from({ length: 100 }, (_, i) => ({
  '応募者名': `大量データ${i + 1}`,
  'URL': `https://example.com/user${i + 1}`,
  '備考': `これは${i + 1}番目のテストデータです。\n改行も含まれています。`
}));

// テストケース3: 特殊文字を含むデータ
const specialCharsData = [
  { '応募者名': '特殊文字テスト①', 'URL': 'https://example.com/特殊文字', '備考': '①②③④⑤⑥⑦⑧⑨⑩' },
  { '応募者名': '絵文字テスト😊', 'URL': 'https://example.com/emoji', '備考': '🚢⚓🌊💙' },
  { '応募者名': '記号テスト!@#$%', 'URL': 'https://example.com/symbols', '備考': '!@#$%^&*()_+-=[]{}|;:,.<>?' },
  { '応募者名': '長い名前のテスト用データです', 'URL': 'https://example.com/very-long-url-that-might-cause-issues-with-column-width', '備考': 'これは非常に長い備考欄のテストです。改行も含めて、アプリケーションが正しく処理できるかを確認します。\n\n複数行にわたる長いテキストが含まれています。' },
  { '応募者名': '空白テスト', 'URL': '   ', '備考': '   ' },
  { '応募者名': '   ', 'URL': 'https://example.com/whitespace', '備考': '前後に空白があります' },
  { '応募者名': '改行テスト\n改行', 'URL': 'https://example.com/newline', '備考': '改行\nが\n含まれて\nいます' },
  { '応募者名': 'タブテスト\tタブ', 'URL': 'https://example.com/tab', '備考': 'タブ\tが\t含まれて\tいます' },
  { '応募者名': 'クォートテスト"引用符"', 'URL': 'https://example.com/quotes', '備考': '"ダブルクォート"と\'シングルクォート\'のテスト' },
  { '応募者名': 'バックスラッシュテスト\\', 'URL': 'https://example.com/backslash', '備考': 'バックスラッシュ\\のテスト' }
];

// テストケース4: 空のデータ
const emptyData = [];

// テストケース5: 列名が異なるデータ
const differentColumnsData = [
  { '名前': '列名テスト1', 'リンク': 'https://example.com/test1', 'メモ': '列名が異なるテスト' },
  { '名前': '列名テスト2', 'リンク': 'https://example.com/test2', 'メモ': '応募者名ではなく名前' },
  { '名前': '列名テスト3', 'リンク': 'https://example.com/test3', 'メモ': 'URLではなくリンク' }
];

// テストケース6: 不足データ（9名のみ）
const insufficientData = Array.from({ length: 9 }, (_, i) => ({
  '応募者名': `不足データ${i + 1}`,
  'URL': `https://example.com/insufficient${i + 1}`,
  '備考': `これは${i + 1}番目の不足データです`
}));

// テストケース7: 非常に長いデータ
const veryLongData = [
  {
    '応募者名': '非常に長い名前を持つ応募者です。この名前は意図的に長くして、アプリケーションの表示や処理が正しく動作するかをテストするために作成されました。',
    'URL': 'https://example.com/very-long-name-test-this-url-is-also-very-long-to-test-column-width-and-text-wrapping-functionality',
    '備考': 'これは非常に長い備考欄のテストです。改行も含めて、アプリケーションが正しく処理できるかを確認します。\n\n複数行にわたる長いテキストが含まれています。\n\nさらに長いテキストを追加して、より厳しいテストケースを作成します。\n\nこれで十分に長いテキストになったはずです。'
  }
];

// ファイル作成関数
function createXLSXFile(data, filename, sheetName = "応募者リスト") {
  if (data.length === 0) {
    console.log(`⚠️  ${filename}: データが空のためスキップ`);
    return;
  }

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  
  // 列幅を自動調整
  if (data.length > 0) {
    const cols = Object.keys(data[0]).map(key => ({
      wch: Math.max(20, ...data.map(row => row[key] ? String(row[key]).length : 0), key.length)
    }));
    worksheet['!cols'] = cols;
  }

  XLSX.writeFile(workbook, filename);
  console.log(`✅ ${filename}: ${data.length}名のデータで作成`);
}

// テストファイルを作成
console.log('🧪 テスト用XLSXファイルを作成中...\n');

createXLSXFile(minimalData, 'test_minimal_10.xlsx');
createXLSXFile(largeData, 'test_large_100.xlsx');
createXLSXFile(specialCharsData, 'test_special_chars.xlsx');
createXLSXFile(emptyData, 'test_empty.xlsx');
createXLSXFile(differentColumnsData, 'test_different_columns.xlsx');
createXLSXFile(insufficientData, 'test_insufficient_9.xlsx');
createXLSXFile(veryLongData, 'test_very_long.xlsx');

console.log('\n🎉 すべてのテストファイルが作成されました！');
console.log('\n📋 テストケース一覧:');
console.log('1. test_minimal_10.xlsx - 最小限のデータ（10名ちょうど）');
console.log('2. test_large_100.xlsx - 大量のデータ（100名）');
console.log('3. test_special_chars.xlsx - 特殊文字・絵文字・記号を含むデータ');
console.log('4. test_empty.xlsx - 空のデータ（エラーハンドリングテスト）');
console.log('5. test_different_columns.xlsx - 列名が異なるデータ');
console.log('6. test_insufficient_9.xlsx - 不足データ（9名のみ）');
console.log('7. test_very_long.xlsx - 非常に長いテキストを含むデータ'); 