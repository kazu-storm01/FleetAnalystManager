// 画像パスのユーティリティ

// Viteのベースパスを考慮したパスを生成
export const getStatIconPath = (iconName: string): string => {
  const basePath = import.meta.env.BASE_URL || '/';
  
  // ベースパスが '/' で終わっていない場合は追加
  const normalizedBasePath = basePath.endsWith('/') ? basePath : `${basePath}/`;
  
  const fullPath = `${normalizedBasePath}stats/${iconName}.png`;
  
  // デバッグ用: パス生成の詳細ログ
  if (import.meta.env.DEV) {
    console.log(`getStatIconPath: ${iconName} -> BASE_URL: ${basePath} -> Full path: ${fullPath}`);
    console.log(`Expected file location: public/stats/${iconName}.png`);
  }
  
  return fullPath;
};

// デバッグ用: 利用可能なアイコン名の一覧
export const AVAILABLE_STAT_ICONS = [
  'accuracy',
  'anti_air', 
  'anti_bomber',
  'armor',
  'asw',
  'bombing',
  'evasion',
  'firepower',
  'interception', 
  'los',
  'luck',
  'max_hp',
  'radius',
  'range',
  'speed',
  'torpedo',
  'torpedo_accuracy'
] as const;

// ステータスキーから画像名へのマッピング検証
export const validateStatIconMapping = (_statKey: string, iconName: string): boolean => {
  return AVAILABLE_STAT_ICONS.includes(iconName as typeof AVAILABLE_STAT_ICONS[number]);
};