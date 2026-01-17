// Metrics models for the Digital Twin Analytics Platform

export type MetricStatus = 'critical' | 'warning' | 'normal' | 'good';
export type TrendDirection = 'up' | 'down' | 'stable';

export interface MetricTrend {
  direction: TrendDirection;
  value: string;
  label: string;
}

export interface MetricColorScheme {
  from: string;
  to: string;
  border: string;
  text: string;
  iconGradient: string;
}

export interface MetricData {
  name: string;
  value: string | number;
  unit: string;
  status: MetricStatus;
  trend: MetricTrend;
  icon: string;
  colorScheme: MetricColorScheme;
}

// Color schemes for different statuses
export const STATUS_COLORS: Record<MetricStatus, {
  from: string;
  to: string;
  border: string;
  text: string;
  textDark: string;
  textLight: string;
  iconGradient: string;
  borderColor: string;
}> = {
  critical: {
    from: 'from-red-50',
    to: 'to-orange-50',
    border: 'border-red-200',
    text: 'text-red-700',
    textDark: 'text-red-900',
    textLight: 'text-red-600',
    iconGradient: 'from-red-500 to-orange-600',
    borderColor: 'border-red-200',
  },
  warning: {
    from: 'from-orange-50',
    to: 'to-amber-50',
    border: 'border-orange-200',
    text: 'text-orange-700',
    textDark: 'text-orange-900',
    textLight: 'text-orange-600',
    iconGradient: 'from-orange-500 to-amber-600',
    borderColor: 'border-orange-200',
  },
  normal: {
    from: 'from-blue-50',
    to: 'to-cyan-50',
    border: 'border-blue-200',
    text: 'text-blue-700',
    textDark: 'text-blue-900',
    textLight: 'text-blue-600',
    iconGradient: 'from-blue-500 to-cyan-600',
    borderColor: 'border-blue-200',
  },
  good: {
    from: 'from-green-50',
    to: 'to-emerald-50',
    border: 'border-green-200',
    text: 'text-green-700',
    textDark: 'text-green-900',
    textLight: 'text-green-600',
    iconGradient: 'from-green-500 to-emerald-600',
    borderColor: 'border-green-200',
  },
};
