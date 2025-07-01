import React from 'react';
import './ShipStatusDisplay.css';
import { 
  getSpeedRank, 
  getRangeAbbr
} from '../utils/shipCalculations';
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

// Map fleethub stat keys to available image file names
const STAT_DISPLAY_MAPPING: Record<ShipStatKey, string> = {
  hp: 'max_hp',
  firepower: 'firepower',
  armor: 'armor', 
  torpedo: 'torpedo',
  evasion: 'evasion',
  anti_air: 'anti_air',
  accuracy: 'accuracy',
  asw: 'asw',
  speed: 'speed',
  los: 'los',
  range: 'range',
  luck: 'luck'
};

// Japanese translations for speed and range
const SPEED_TRANSLATIONS: Record<string, string> = {
  FastestPlus: '最速+',
  Fastest: '最速',
  Fast: '高速',
  Slow: '低速',
  Slowest: '最低速'
};

const RANGE_TRANSLATIONS: Record<string, string> = {
  VeryLong: '超長',
  Long: '長',
  Medium: '中',
  Short: '短'
};

interface StatIconProps {
  icon: ShipStatKey;
  className?: string;
}

const StatIcon: React.FC<StatIconProps> = ({ icon, className }) => {
  const displayName = STAT_DISPLAY_MAPPING[icon];
  const imagePath = getStatIconPath(displayName);
  
  const [imageError, setImageError] = React.useState(false);
  
  // デバッグ用: 開発時のみログ出力
  React.useEffect(() => {
    if (import.meta.env.DEV) {
      console.log(`StatIcon: ${icon} -> ${displayName} -> ${imagePath}`);
    }
  }, [icon, displayName, imagePath]);
  
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
        if (import.meta.env.DEV) {
          console.error(`Failed to load stat icon: ${imagePath}`);
        }
        setImageError(true);
      }}
      onLoad={() => {
        if (import.meta.env.DEV) {
          console.log(`Successfully loaded: ${imagePath}`);
        }
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

  if (statKey === 'range') {
    const abbr = getRangeAbbr(value);
    const label = RANGE_TRANSLATIONS[abbr] || '?';
    displayText = <span className="stat-text">{label}</span>;
  } else if (statKey === 'speed') {
    const rank = getSpeedRank(value);
    const label = SPEED_TRANSLATIONS[rank] || '?';
    displayText = <span className="stat-text">{label}</span>;
  } else {
    displayText = <span className="stat-value">{value}</span>;
  }

  return (
    <div className="ship-stat-label">
      <StatIcon icon={statKey} />
      {displayText}
      {(bonus || mod) && (
        <>
          <span className="stat-modifier-open">(</span>
          {bonus ? <span className="stat-bonus">+{bonus}</span> : null}
          {mod ? <span className="stat-mod">{mod > 0 ? '+' : ''}{mod}</span> : null}
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
}

const ShipStatusDisplay: React.FC<ShipStatusDisplayProps> = ({ 
  ship,
  className 
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
      case 'accuracy': return 0; // FleetComposerでは計算していない
      case 'asw': return ship.currentStats.asw;
      case 'speed': return ship.currentStats.speed;
      case 'los': return ship.currentStats.los;
      case 'range': return ship.currentStats.range;
      case 'luck': return ship.currentStats.luck;
      default: return 0;
    }
  };

  const getImprovementValue = (statKey: ShipStatKey): number => {
    switch (statKey) {
      case 'hp': return ship.improvements.hp || 0;
      case 'firepower': return ship.improvements.firepower || 0;
      case 'torpedo': return ship.improvements.torpedo || 0;
      case 'armor': return ship.improvements.armor || 0;
      case 'anti_air': return ship.improvements.aa || 0;
      case 'asw': return ship.improvements.asw || 0;
      case 'luck': return ship.improvements.luck || 0;
      default: return 0;
    }
  };

  return (
    <div className={`ship-status-display ${className || ''}`}>
      {SHIP_STAT_KEYS.map((statKey) => {
        const value = getStatValue(statKey);
        const improvement = getImprovementValue(statKey);
        
        return (
          <ShipStatLabel
            key={statKey}
            statKey={statKey}
            value={value}
            bonus={0} // 装備ボーナスは現在計算していない
            mod={improvement > 0 ? improvement : 0} // 改修値は正の値のみ表示
          />
        );
      })}
    </div>
  );
};

export default ShipStatusDisplay;