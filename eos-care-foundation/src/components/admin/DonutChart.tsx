import { useEffect, useState } from 'react';
import { cn } from '../../lib/utils';

interface DonutChartProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  color?: 'primary' | 'forest' | 'ocean' | 'sunset';
  animate?: boolean;
}

const colorMap = {
  primary: { stroke: '#0866FF', bg: '#E7F0FF' },
  forest: { stroke: '#3D5A47', bg: '#E8F5E9' },
  ocean: { stroke: '#457B9D', bg: '#E3F2FD' },
  sunset: { stroke: '#E76F51', bg: '#FFF3E0' },
};

export function DonutChart({ 
  value, 
  max, 
  size = 160, 
  strokeWidth = 12,
  label,
  sublabel,
  color = 'primary',
  animate = true 
}: DonutChartProps) {
  const [animatedValue, setAnimatedValue] = useState(animate ? 0 : value);
  const percentage = max > 0 ? Math.min((animatedValue / max) * 100, 100) : 0;
  
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  
  const colors = colorMap[color];

  useEffect(() => {
    if (!animate) return;
    
    const duration = 1500;
    const startTime = Date.now();
    const startValue = 0;
    const endValue = value;
    
    const animateValue = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (endValue - startValue) * easeOut;
      
      setAnimatedValue(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animateValue);
      }
    };
    
    requestAnimationFrame(animateValue);
  }, [value, animate]);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colors.bg}
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colors.stroke}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span 
          className={cn(
            "text-3xl font-display font-bold",
            color === 'primary' && "text-primary",
            color === 'forest' && "text-forest",
            color === 'ocean' && "text-ocean",
            color === 'sunset' && "text-sunset"
          )}
        >
          {percentage.toFixed(0)}%
        </span>
        {label && <span className="text-xs font-medium text-text-secondary mt-1">{label}</span>}
        {sublabel && <span className="text-xs text-text-muted">{sublabel}</span>}
      </div>
    </div>
  );
}
