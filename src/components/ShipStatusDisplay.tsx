import React from 'react';
import './ShipStatusDisplay.css';
import { getStatIconPath } from '../utils/imagePaths';

// Ship stat keys as defined in fleethub
const SHIP_STAT_KEYS = [
  "hp",
  "firepower", 
  "armor",
  "torpedo",
  "evasion",
  "anti_air",
  "accuracy",
  "asw",
  "speed",
  "los",
  "range",
  "luck",
] as const;

export type ShipStatKey = typeof SHIP_STAT_KEYS[number];

// 速度の数値を文字列に変換
const getSpeedText = (speed: number): string => {
  switch (speed) {
    case 0: return '陸上';
    case 5: return '低速';
    case 10: return '高速';
    case 15: return '高速+';
    case 20: return '最速';
    default: return `速度${speed}`;
  }
};

// 射程の数値を文字列に変換
const getRangeText = (range: number): string => {
  switch (range) {
    case 0: return '射程無';
    case 1: return '射程短';
    case 2: return '射程中';
    case 3: return '射程長';
    case 4: return '射程超長';
    case 5: return '射程超超長';
    default: return `射程${range}`;
  }
};

// Map fleethub stat keys to available image file names
const STAT_DISPLAY_MAPPING: Record<ShipStatKey, string> = {
  hp: 'max_hp',
  firepower: 'firepower',
  armor: 'armor', 
  torpedo: 'torpedo',
  evasion: 'evasion',
  anti_air: 'anti_air',
  accuracy: 'accuracy', // 命中アイコンに戻す
  asw: 'asw',
  speed: 'speed',
  los: 'los',
  range: 'range',
  luck: 'luck'
};


interface StatIconProps {
  icon: ShipStatKey;
  className?: string;
}

const StatIcon: React.FC<StatIconProps> = ({ icon, className }) => {
  const displayName = STAT_DISPLAY_MAPPING[icon];
  const imagePath = getStatIconPath(displayName);
  
  const [imageError, setImageError] = React.useState(false);
  
  
  // 画像が読み込めない場合のフォールバック
  if (imageError) {
    return (
      <span 
        className={`stat-icon-fallback ${className || ''}`}
        style={{
          display: 'inline-block',
          width: '15px',
          height: '15px', 
          background: '#666',
          color: '#fff',
          textAlign: 'center',
          fontSize: '10px',
          lineHeight: '15px',
          borderRadius: '2px'
        }}
      >
        {icon.charAt(0).toUpperCase()}
      </span>
    );
  }
  
  return (
    <img 
      className={`stat-icon ${className || ''}`}
      width={15}
      height={15}
      src={imagePath}
      alt={icon}
      onError={() => {
        setImageError(true);
      }}
    />
  );
};

interface ShipStatLabelProps {
  statKey: ShipStatKey;
  value: number;
  bonus?: number;
  mod?: number;
}

const ShipStatLabel: React.FC<ShipStatLabelProps> = ({ 
  statKey, 
  value, 
  bonus = 0, 
  mod = 0 
}) => {
  let displayText: React.ReactNode;

  if (statKey === 'speed') {
    // 速度の文字列表示
    const speedText = getSpeedText(value);
    displayText = <span className="stat-value">{speedText}</span>;
  } else if (statKey === 'range') {
    // 射程の文字列表示
    const rangeText = getRangeText(value);
    displayText = <span className="stat-value">{rangeText}</span>;
  } else {
    displayText = <span className="stat-value">{value}</span>;
  }

  return (
    <div className="ship-stat-label">
      {/* 全てのステータスにアイコンと値を表示 */}
      <StatIcon icon={statKey} />
      {displayText}
      {(bonus > 0 || mod > 0) && (
        <>
          <span className="stat-modifier-open">(</span>
          {bonus > 0 ? <span className="stat-bonus">+{bonus}</span> : null}
          {mod > 0 ? <span className="stat-mod">+{mod}</span> : null}
          <span className="stat-modifier-close">)</span>
        </>
      )}
    </div>
  );
};

// FleetComposer ship interface for direct use
interface FleetComposerShip {
  currentStats: {
    hp: number;
    firepower: number;
    torpedo: number;
    aa: number;
    armor: number;
    evasion: number;
    asw: number;
    los: number;
    luck: number;
    range: number;
    speed: number;
    aircraft: number;
  };
  improvements: {
    firepower: number;
    torpedo: number;
    aa: number;
    armor: number;
    luck: number;
    hp: number;
    asw: number;
  };
}

interface ShipStatusDisplayProps {
  ship: FleetComposerShip;
  className?: string;
  bonus?: {
    firepower: number;
    torpedo: number;
    aa: number;
    armor: number;
    asw: number;
    evasion: number;
    accuracy: number;
    los: number;
  };
}

const ShipStatusDisplay: React.FC<ShipStatusDisplayProps> = ({ 
  ship,
  className,
  bonus 
}) => {
  // FleetComposerの既存データをfleethub形式で表示
  const getStatValue = (statKey: ShipStatKey): number => {
    switch (statKey) {
      case 'hp': return ship.currentStats.hp;
      case 'firepower': return ship.currentStats.firepower;
      case 'torpedo': return ship.currentStats.torpedo;
      case 'armor': return ship.currentStats.armor;
      case 'evasion': return ship.currentStats.evasion;
      case 'anti_air': return ship.currentStats.aa;
      case 'accuracy': return 0; // 命中値（FleetComposerでは計算していない）
      case 'asw': return ship.currentStats.asw;
      case 'speed': return ship.currentStats.speed;
      case 'los': return ship.currentStats.los;
      case 'range': return ship.currentStats.range;
      case 'luck': return ship.currentStats.luck;
      default: return 0;
    }
  };

  const getImprovementValue = (statKey: ShipStatKey): number => {
    // 増分表示は耐久、対潜、運のみ
    switch (statKey) {
      case 'hp': return ship.improvements.hp || 0;
      case 'asw': return ship.improvements.asw || 0;
      case 'luck': return ship.improvements.luck || 0;
      default: return 0; // その他のステータスは増分表示なし
    }
  };

  const getBonusValue = (statKey: ShipStatKey): number => {
    if (!bonus) return 0;
    
    switch (statKey) {
      case 'firepower': return bonus.firepower || 0;
      case 'torpedo': return bonus.torpedo || 0;
      case 'anti_air': return bonus.aa || 0;
      case 'armor': return bonus.armor || 0;
      case 'asw': return bonus.asw || 0;
      case 'evasion': return bonus.evasion || 0;
      case 'accuracy': return bonus.accuracy || 0;
      case 'los': return bonus.los || 0;
      default: return 0;
    }
  };

  return (
    <div className={`ship-status-display ${className || ''}`}>
      {SHIP_STAT_KEYS.map((statKey) => {
        const value = getStatValue(statKey);
        const improvement = getImprovementValue(statKey);
        const equipmentBonus = getBonusValue(statKey);
        
        return (
          <ShipStatLabel
            key={statKey}
            statKey={statKey}
            value={value}
            bonus={equipmentBonus} // 装備による補正値
            mod={improvement > 0 ? improvement : 0} // 改修値は正の値のみ表示
          />
        );
      })}
    </div>
  );
};

export { StatIcon };
export default ShipStatusDisplay;