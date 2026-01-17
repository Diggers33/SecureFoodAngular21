import {
  KpiCard,
  ForecastDataPoint,
  SimulationDataPoint,
  SensitivityDataPoint,
  FeatureImportanceItem,
  ConfusionMatrixCell
} from './simulations.models';

export const SIMULATION_VARIABLES = [
  'Capture volume',
  'Imports',
  'Exports',
  'Quantity available for consumption',
  'Quantity consumed (kg or tons)',
  'Market price'
];

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const YEARS = ['2024', '2023', '2022', '2021', '2020'];

export const VISUALIZATION_TYPES = [
  'Time Series',
  'Bar Chart',
  'Logistic Curve',
  'Confusion Matrix',
  'Scatter Plot',
  'Heatmap',
  'Sensitivity Line Plot'
];

export const QUICK_ACCESS_TYPES = ['Time Series', 'Bar Chart', 'Logistic Curve', 'Confusion Matrix'];

export const KPI_CARDS: KpiCard[] = [
  { title: 'Forecast Accuracy', value: '94.2%', icon: 'trending-up', colorClass: 'kpi-primary' },
  { title: 'Risk Score', value: 'Medium', icon: 'activity', colorClass: 'kpi-orange' },
  { title: 'Demand Variance', value: '±12%', icon: 'bar-chart-3', colorClass: 'kpi-blue' },
  { title: 'Model Type', value: 'LSTM', icon: 'sparkles', colorClass: 'kpi-purple' }
];

export const FORECAST_DATA: ForecastDataPoint[] = [
  { time: 0, actual: 5.0, predicted: 5.0 },
  { time: 5, actual: 5.3, predicted: 5.2 },
  { time: 10, actual: 5.8, predicted: 5.7 },
  { time: 15, actual: 6.1, predicted: 6.0 },
  { time: 20, actual: 6.3, predicted: 6.2 },
  { time: 25, actual: 6.4, predicted: 6.3 },
  { time: 30, actual: 5.8, predicted: 5.9 },
  { time: 35, actual: 5.0, predicted: 5.2 },
  { time: 40, actual: 4.2, predicted: 4.5 },
  { time: 45, actual: 4.0, predicted: 4.2 },
  { time: 50, actual: 4.5, predicted: 4.6 },
  { time: 55, actual: 4.8, predicted: 4.9 },
  { time: 60, actual: 4.6, predicted: 4.7 }
];

export const SIMULATION_DATA: SimulationDataPoint[] = [
  { time: 'Jan', demand: 60, supply: 55, inventory: 45 },
  { time: 'Feb', demand: 65, supply: 58, inventory: 43 },
  { time: 'Mar', demand: 68, supply: 62, inventory: 41 },
  { time: 'Apr', demand: 72, supply: 65, inventory: 39 },
  { time: 'May', demand: 75, supply: 68, inventory: 37 },
  { time: 'Jun', demand: 78, supply: 72, inventory: 35 },
  { time: 'Jul', demand: 82, supply: 75, inventory: 33 },
  { time: 'Aug', demand: 85, supply: 78, inventory: 31 },
  { time: 'Sep', demand: 88, supply: 82, inventory: 29 },
  { time: 'Oct', demand: 90, supply: 85, inventory: 28 },
  { time: 'Nov', demand: 92, supply: 88, inventory: 27 },
  { time: 'Dec', demand: 95, supply: 90, inventory: 26 }
];

export const SENSITIVITY_DATA: SensitivityDataPoint[] = [
  { parameter: -20, demand: 52, supply: 48 },
  { parameter: -15, demand: 56, supply: 51 },
  { parameter: -10, demand: 60, supply: 55 },
  { parameter: -5, demand: 64, supply: 59 },
  { parameter: 0, demand: 68, supply: 62 },
  { parameter: 5, demand: 72, supply: 66 },
  { parameter: 10, demand: 76, supply: 70 },
  { parameter: 15, demand: 80, supply: 74 },
  { parameter: 20, demand: 84, supply: 78 }
];

export const FEATURE_IMPORTANCE_DATA: FeatureImportanceItem[] = [
  { name: 'ΔSea Temp', value: 0.24 },
  { name: 'ΔChlorophyll', value: 0.21 },
  { name: 'ΔLandings', value: 0.18 },
  { name: 'ΔInventory', value: 0.15 },
  { name: 'ΔImports', value: 0.12 }
];

export const CONFUSION_MATRIX: ConfusionMatrixCell[] = [
  { x: 0, y: 0, value: 144, label: 'TN: 144' },
  { x: 1, y: 0, value: 23, label: 'FP: 23' },
  { x: 0, y: 1, value: 7, label: 'FN: 7' },
  { x: 1, y: 1, value: 46, label: 'TP: 46' }
];

// Data generators for dynamic data
export function generateHeatmapData(): { x: number; y: number; value: number }[] {
  return Array.from({ length: 25 }, (_, i) => ({
    x: i % 5,
    y: Math.floor(i / 5),
    value: Math.random()
  }));
}

export function generateScatterData(): { volume: number; quality: number }[] {
  return Array.from({ length: 120 }, () => ({
    volume: Math.random() * 100,
    quality: Math.random() * 100
  }));
}

export function generateLogisticCurveData(): { x: number; y: number }[] {
  return Array.from({ length: 50 }, (_, i) => {
    const x = -2.0 + (i * 4.0) / 50;
    return { x, y: 1 / (1 + Math.exp(-3 * x)) };
  });
}
