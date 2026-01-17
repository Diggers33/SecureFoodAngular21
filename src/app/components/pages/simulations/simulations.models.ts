import { Sector } from '../../../models/routing.model';

export interface SavedSimulation {
  id: string;
  name: string;
  sector: Sector;
  variable: string;
  month: string;
  year: string;
  timestamp: Date;
  parameters: {
    demandShift: number;
    supplyChange: number;
    priceFluctuation: number;
  };
  results: {
    demand: number[];
    supply: number[];
    inventory: number[];
  };
}

export interface KpiCard {
  title: string;
  value: string;
  icon: string;
  colorClass: string;
}

export interface ForecastDataPoint {
  time: number;
  actual: number;
  predicted: number;
}

export interface SimulationDataPoint {
  time: string;
  demand: number;
  supply: number;
  inventory: number;
}

export interface SensitivityDataPoint {
  parameter: number;
  demand: number;
  supply: number;
}

export interface FeatureImportanceItem {
  name: string;
  value: number;
}

export interface ConfusionMatrixCell {
  x: number;
  y: number;
  value: number;
  label: string;
}

export interface ScatterDataPoint {
  volume: number;
  quality: number;
}

export interface LogisticCurvePoint {
  x: number;
  y: number;
}

export interface HeatmapDataPoint {
  x: number;
  y: number;
  value: number;
}
