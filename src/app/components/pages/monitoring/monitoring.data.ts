import { KpiCard, InfoCard, ChartConfig } from './monitoring.models';

export const TIME_RANGES = ['14d', '30d', '90d', '120d'];

// Fish KPIs
export const FISH_KPIS: KpiCard[] = [
  {
    title: 'Algae Concentration',
    value: 92,
    unit: 'cells/mL',
    icon: 'activity',
    trend: { direction: 'up', label: '+28% vs yesterday', isPositive: false },
    colorClass: 'kpi-red'
  },
  {
    title: 'Water Temperature',
    value: 21.2,
    unit: '°C',
    icon: 'thermometer',
    trend: { direction: 'up', label: 'Above normal', isPositive: false },
    colorClass: 'kpi-orange'
  },
  {
    title: 'Dissolved Oxygen',
    value: 5.9,
    unit: 'mg/L',
    icon: 'droplet',
    trend: { direction: 'down', label: '-8% optimal range', isPositive: true },
    colorClass: 'kpi-blue'
  },
  {
    title: 'Salinity',
    value: 37.5,
    unit: 'ppt',
    icon: 'waves',
    trend: { direction: 'stable', label: 'Stable', isPositive: true },
    colorClass: 'kpi-green'
  },
  {
    title: 'Current Speed',
    value: 1.8,
    unit: 'm/s',
    icon: 'wind',
    trend: { direction: 'up', label: '+12% vs yesterday' },
    colorClass: 'kpi-cyan'
  }
];

// Grain KPIs
export const GRAIN_KPIS: KpiCard[] = [
  {
    title: "Int'l Price",
    value: '€455',
    unit: '/ton',
    icon: 'dollar-sign',
    trend: { direction: 'up', label: '+46% vs Jan', isPositive: true },
    colorClass: 'kpi-amber'
  },
  {
    title: 'Domestic Price',
    value: '€395',
    unit: '/ton',
    icon: 'dollar-sign',
    trend: { direction: 'up', label: '+41% vs Jan', isPositive: true },
    colorClass: 'kpi-green'
  },
  {
    title: 'Sea Route Delays',
    value: 45,
    unit: 'incidents',
    icon: 'truck',
    trend: { direction: 'up', label: 'Blockade impact', isPositive: false, pulse: true },
    colorClass: 'kpi-red'
  },
  {
    title: 'Road Delays',
    value: 28,
    unit: 'incidents',
    icon: 'truck',
    trend: { direction: 'up', label: 'Above average', isPositive: false },
    colorClass: 'kpi-orange'
  },
  {
    title: 'Export Capacity',
    value: 20,
    unit: '%',
    icon: 'package',
    trend: { direction: 'down', label: 'War impact', isPositive: false },
    colorClass: 'kpi-blue'
  }
];

// Fruits KPIs
export const FRUITS_KPIS: KpiCard[] = [
  {
    title: 'Temperature',
    value: 27,
    unit: '°C',
    icon: 'thermometer',
    trend: { direction: 'up', label: 'Heat stress risk', isPositive: false },
    colorClass: 'kpi-orange'
  },
  {
    title: 'Rainfall',
    value: 5,
    unit: 'mm',
    icon: 'cloud-rain',
    trend: { direction: 'down', label: 'Drought conditions', isPositive: false },
    colorClass: 'kpi-blue'
  },
  {
    title: 'Soil Moisture',
    value: 18,
    unit: '%',
    icon: 'droplet',
    trend: { direction: 'down', label: 'Critical low', isPositive: false },
    colorClass: 'kpi-amber'
  },
  {
    title: 'Yield Drop',
    value: 28,
    unit: '%',
    icon: 'trending-down',
    trend: { direction: 'down', label: 'vs historical avg', isPositive: false, pulse: true },
    colorClass: 'kpi-red'
  },
  {
    title: 'Cold Chain',
    value: 95,
    unit: '% uptime',
    icon: 'package',
    trend: { direction: 'up', label: 'Performing well', isPositive: true },
    colorClass: 'kpi-green'
  }
];

// Fish Info Cards
export const FISH_INFO_CARDS: InfoCard[] = [
  {
    title: 'Market Prices',
    icon: 'dollar-sign',
    colorClass: 'info-green',
    items: [
      { label: 'Wholesale', value: '€8.50/kg', colorClass: 'text-red' },
      { label: 'Retail', value: '€12.20/kg', colorClass: 'text-red' },
      { label: 'Logistics Costs', value: '€1.80/kg', colorClass: 'text-orange' }
    ]
  },
  {
    title: 'Logistics Status',
    icon: 'truck',
    colorClass: 'info-orange',
    items: [
      { label: 'Avg Delivery Time', value: '18h (+6h)', colorClass: 'text-orange' },
      { label: 'Route Interruptions', value: '3 active', colorClass: 'text-red' },
      { label: 'Transport Capacity', value: '65% Low', colorClass: 'text-yellow' }
    ]
  },
  {
    title: 'Affected Zones',
    icon: 'map-pin',
    colorClass: 'info-blue',
    items: [
      { label: 'Zone A-3', value: 'Critical', isStatus: true, colorClass: 'status-red' },
      { label: 'Zone B-7', value: 'Warning', isStatus: true, colorClass: 'status-orange' },
      { label: 'Zone C-2', value: 'Monitor', isStatus: true, colorClass: 'status-yellow' },
      { label: 'Zone D-1', value: 'Normal', isStatus: true, colorClass: 'status-green' }
    ]
  }
];

// Grain Info Cards
export const GRAIN_INFO_CARDS: InfoCard[] = [
  {
    title: 'Storage Status',
    icon: 'package',
    colorClass: 'info-blue',
    items: [
      { label: 'Field Elevators', value: '78% full' },
      { label: 'Sea Elevators', value: '92% full' },
      { label: 'Total Capacity', value: 'Near limit', colorClass: 'text-orange' }
    ]
  },
  {
    title: 'Production',
    icon: 'activity',
    colorClass: 'info-green',
    items: [
      { label: 'Current Harvest', value: '2.8M tons' },
      { label: 'Affected Farms', value: '35%', colorClass: 'text-red' },
      { label: 'Quality Grade', value: 'A-Grade', colorClass: 'text-green' }
    ]
  },
  {
    title: 'Risk Zones',
    icon: 'bar-chart-3',
    colorClass: 'info-purple',
    items: [
      { label: 'Eastern region', value: 'High', isStatus: true, colorClass: 'status-red' },
      { label: 'Southern ports', value: 'Medium', isStatus: true, colorClass: 'status-orange' },
      { label: 'Western region', value: 'Low', isStatus: true, colorClass: 'status-green' }
    ]
  }
];

// Fruits Info Cards
export const FRUITS_INFO_CARDS: InfoCard[] = [
  {
    title: 'Crop Health',
    icon: 'apple',
    colorClass: 'info-green',
    items: [
      { label: 'Tomatoes', value: 'Stressed', colorClass: 'text-orange' },
      { label: 'Lettuce', value: 'Stressed', colorClass: 'text-orange' },
      { label: 'Peppers', value: 'Critical', colorClass: 'text-red' }
    ]
  },
  {
    title: 'Irrigation Status',
    icon: 'droplet',
    colorClass: 'info-blue',
    items: [
      { label: 'Water Usage', value: '+45%', colorClass: 'text-red' },
      { label: 'Reservoir Level', value: '32%', colorClass: 'text-orange' },
      { label: 'Efficiency', value: '78%' }
    ]
  },
  {
    title: 'Supply Chain',
    icon: 'package',
    colorClass: 'info-purple',
    items: [
      { label: 'Cold storage', value: 'OK', isStatus: true, colorClass: 'status-green' },
      { label: 'Transport', value: 'OK', isStatus: true, colorClass: 'status-green' },
      { label: 'Quality checks', value: 'Pending', isStatus: true, colorClass: 'status-yellow' }
    ]
  }
];

// Chart Configs
export const FISH_CHART1_CONFIG: ChartConfig = {
  title: 'Environmental Indicators',
  subtitle: 'Last 24 hours',
  icon: 'activity',
  colorClass: 'chart-blue'
};

export const FISH_CHART2_CONFIG: ChartConfig = {
  title: 'Production Impact',
  subtitle: '5-day trend',
  icon: 'bar-chart-3',
  colorClass: 'chart-teal'
};

export const GRAIN_CHART1_CONFIG: ChartConfig = {
  title: 'Price Trends',
  subtitle: '6-month comparison',
  icon: 'trending-up',
  colorClass: 'chart-amber'
};

export const GRAIN_CHART2_CONFIG: ChartConfig = {
  title: 'Logistics Analysis',
  subtitle: 'By transport route',
  icon: 'truck',
  colorClass: 'chart-orange'
};

export const FRUITS_CHART1_CONFIG: ChartConfig = {
  title: 'Climate Conditions',
  subtitle: '6-month trend',
  icon: 'cloud-rain',
  colorClass: 'chart-blue'
};

export const FRUITS_CHART2_CONFIG: ChartConfig = {
  title: 'Crop Yield Comparison',
  subtitle: 'Current vs Historical',
  icon: 'apple',
  colorClass: 'chart-green'
};

export const DEFAULT_CHART_CONFIG: ChartConfig = {
  title: 'Trends',
  subtitle: 'Last 30 days',
  icon: 'trending-up',
  colorClass: 'chart-primary'
};
