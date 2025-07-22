import React from 'react';
import './KPICard.css';

interface KPICardProps {
  title: string;
  value: string | number;
  previousValue?: string | number;
  unit?: string;
  icon: string;
  trend?: 'up' | 'down' | 'neutral';
  percentage?: number;
  color?: 'primary' | 'success' | 'warning' | 'info';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  previousValue,
  unit = '',
  icon,
  trend = 'neutral',
  percentage,
  color = 'primary',
  size = 'medium',
  onClick
}) => {
  const formatValue = (val: string | number) => {
    if (typeof val === 'number') {
      return val.toLocaleString();
    }
    return val;
  };

  const calculateChange = () => {
    if (previousValue && typeof value === 'number' && typeof previousValue === 'number') {
      const diff = value - previousValue;
      const percent = previousValue !== 0 ? ((diff / previousValue) * 100) : 0;
      return { diff, percent: Math.abs(percent) };
    }
    return null;
  };

  const change = calculateChange();

  const getTrendIcon = () => {
    switch (trend) {
      case 'up': return 'trending_up';
      case 'down': return 'trending_down';
      default: return 'trending_flat';
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'var(--success-color)';
      case 'down': return 'var(--warning-color)';
      default: return 'var(--neutral-color)';
    }
  };

  return (
    <div 
      className={`kpi-card kpi-card--${color} kpi-card--${size} ${onClick ? 'kpi-card--clickable' : ''}`}
      onClick={onClick}
    >
      <div className="kpi-card__header">
        <div className="kpi-card__icon">
          <span className="material-icons">{icon}</span>
        </div>
        <div className="kpi-card__trend">
          <span 
            className="material-icons kpi-card__trend-icon" 
            style={{ color: getTrendColor() }}
          >
            {getTrendIcon()}
          </span>
        </div>
      </div>

      <div className="kpi-card__content">
        <div className="kpi-card__value">
          <span className="kpi-card__number">{formatValue(value)}</span>
          {unit && <span className="kpi-card__unit">{unit}</span>}
        </div>
        
        <div className="kpi-card__title">{title}</div>

        {change && (
          <div className="kpi-card__change">
            <span 
              className={`kpi-card__change-value ${
                change.diff > 0 ? 'kpi-card__change-value--positive' : 
                change.diff < 0 ? 'kpi-card__change-value--negative' : 
                'kpi-card__change-value--neutral'
              }`}
            >
              {change.diff > 0 ? '+' : ''}{change.diff.toLocaleString()}
            </span>
            <span className="kpi-card__change-percent">
              ({change.percent.toFixed(1)}%)
            </span>
          </div>
        )}

        {percentage !== undefined && (
          <div className="kpi-card__progress">
            <div className="kpi-card__progress-bar">
              <div 
                className="kpi-card__progress-fill"
                style={{ width: `${Math.min(percentage, 100)}%` }}
              />
            </div>
            <span className="kpi-card__progress-text">{percentage.toFixed(1)}%</span>
          </div>
        )}
      </div>

      <div className="kpi-card__overlay" />
    </div>
  );
};

export default KPICard;