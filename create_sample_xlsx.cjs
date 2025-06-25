const XLSX = require('xlsx');

// サンプル応募者データ
const sampleApplicants = [
  {
    '応募者名': '田中 太郎',
    'URL': 'https://example.com/tanaka',
    '備考': '艦隊運営経験5年\n戦略立案が得意'
  },
  {
    '応募者名': '佐藤 花子',
    'URL': 'https://example.com/sato',
    '備考': '新米提督\n熱意は十分'
  },
  {
    '応募者名': '鈴木 一郎',
    'URL': 'https://example.com/suzuki',
    '備考': 'ベテラン提督\n艦隊編成の専門家'
  },
  {
    '応募者名': '高橋 美咲',
    'URL': 'https://example.com/takahashi',
    '備考': 'イベント攻略が得意\nコミュニティ活動も積極的'
  },
  {
    '応募者名': '渡辺 健太',
    'URL': 'https://example.com/watanabe',
    '備考': 'データ分析が得意\n統計的なアプローチ'
  },
  {
    '応募者名': '伊藤 恵子',
    'URL': 'https://example.com/ito',
    '備考': '初心者サポートが得意\n親切で丁寧な指導'
  },
  {
    '応募者名': '山田 次郎',
    'URL': 'https://example.com/yamada',
    '備考': '艦隊戦術の研究家\n理論的なアプローチ'
  },
  {
    '応募者名': '中村 愛',
    'URL': 'https://example.com/nakamura',
    '備考': 'イラスト描画も得意\nクリエイティブな視点'
  },
  {
    '応募者名': '小林 正男',
    'URL': 'https://example.com/kobayashi',
    '備考': '実戦経験豊富\n現場での判断力が優秀'
  },
  {
    '応募者名': '加藤 由美',
    'URL': 'https://example.com/kato',
    '備考': 'コミュニケーション能力が高い\nチームワーク重視'
  },
  {
    '応募者名': '吉田 大輔',
    'URL': 'https://example.com/yoshida',
    '備考': '技術的な知識が豊富\nシステム理解が深い'
  },
  {
    '応募者名': '松本 真理',
    'URL': 'https://example.com/matsumoto',
    '備考': '教育経験あり\n分かりやすい説明が得意'
  },
  {
    '応募者名': '井上 雄一',
    'URL': 'https://example.com/inoue',
    '備考': 'リーダーシップ経験豊富\n組織運営が得意'
  },
  {
    '応募者名': '木村 さくら',
    'URL': 'https://example.com/kimura',
    '備考': '若手ながら優秀\n新しいアイデアを提案'
  },
  {
    '応募者名': '斎藤 誠',
    'URL': 'https://example.com/saito',
    '備考': '長年の艦隊運営経験\n安定した実績'
  }
];

// ワークブックとワークシートを作成
const worksheet = XLSX.utils.json_to_sheet(sampleApplicants);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, "応募者リスト");

// 列幅を自動調整
const cols = Object.keys(sampleApplicants[0]).map(key => ({
  wch: Math.max(20, ...sampleApplicants.map(row => row[key] ? String(row[key]).length : 0), key.length)
}));
worksheet['!cols'] = cols;

// XLSXファイルを保存
XLSX.writeFile(workbook, 'applicants.xlsx');

console.log('応募者リストXLSXファイル (applicants.xlsx) を作成しました！');
console.log(`総応募者数: ${sampleApplicants.length}名`); 