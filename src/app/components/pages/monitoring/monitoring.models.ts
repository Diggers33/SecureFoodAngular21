export interface KpiCard {
  title: string;
  value: string | number;
  unit: string;
  icon: string;
  trend: {
    direction: 'up' | 'down' | 'stable';
    label: string;
    isPositive?: boolean;
    pulse?: boolean;
  };
  colorClass: string;
}

export interface InfoCard {
  title: string;
  icon: string;
  colorClass: string;
  items: {
    label: string;
    value: string;
    colorClass?: string;
    isStatus?: boolean;
  }[];
}

export interface ChartConfig {
  title: string;
  subtitle: string;
  icon: string;
  colorClass: string;
}
