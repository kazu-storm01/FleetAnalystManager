const XLSX = require('xlsx');

// 空のワークブックを作成
const workbook = XLSX.utils.book_new();
const worksheet = XLSX.utils.aoa_to_sheet([['応募者名', 'URL', '備考']]); // ヘッダーのみ
XLSX.utils.book_append_sheet(workbook, worksheet, "応募者リスト");

XLSX.writeFile(workbook, 'test_empty.xlsx');
console.log('✅ test_empty.xlsx: 空のデータで作成（ヘッダーのみ）'); 