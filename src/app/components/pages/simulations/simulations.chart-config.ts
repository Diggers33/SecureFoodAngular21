import { EChartsOption } from 'echarts';
import {
  ForecastDataPoint,
  SimulationDataPoint,
  SensitivityDataPoint,
  FeatureImportanceItem,
  SavedSimulation
} from './simulations.models';

export function getTimeSeriesChart(forecastData: ForecastDataPoint[]): EChartsOption {
  return {
    tooltip: { trigger: 'axis' },
    legend: { data: ['Actual', 'ML Forecast'], bottom: 0 },
    grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      name: 'Time (weeks)',
      nameLocation: 'middle',
      nameGap: 30,
      data: forecastData.map(d => d.time.toString()),
      axisLine: { lineStyle: { color: '#9ca3af' } }
    },
    yAxis: {
      type: 'value',
      name: 'Volume (1000 tons)',
      nameLocation: 'middle',
      nameGap: 40,
      axisLine: { lineStyle: { color: '#9ca3af' } }
    },
    series: [
      {
        name: 'Actual',
        type: 'line',
        smooth: true,
        data: forecastData.map(d => d.actual),
        lineStyle: { width: 3, color: '#0d9488' },
        itemStyle: { color: '#0d9488' },
        areaStyle: { color: 'rgba(13, 148, 136, 0.1)' }
      },
      {
        name: 'ML Forecast',
        type: 'line',
        smooth: true,
        data: forecastData.map(d => d.predicted),
        lineStyle: { width: 3, color: '#f59e0b', type: 'dashed' },
        itemStyle: { color: '#f59e0b' },
        areaStyle: { color: 'rgba(245, 158, 11, 0.1)' }
      }
    ]
  };
}

export function getBarChart(simulationData: SimulationDataPoint[]): EChartsOption {
  return {
    tooltip: { trigger: 'axis' },
    legend: { data: ['Demand', 'Supply', 'Inventory'], bottom: 0 },
    grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: simulationData.map(d => d.time),
      axisLine: { lineStyle: { color: '#9ca3af' } }
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#9ca3af' } }
    },
    series: [
      {
        name: 'Demand',
        type: 'bar',
        data: simulationData.map(d => d.demand),
        itemStyle: { color: '#0d9488', borderRadius: [8, 8, 0, 0] }
      },
      {
        name: 'Supply',
        type: 'bar',
        data: simulationData.map(d => d.supply),
        itemStyle: { color: '#f59e0b', borderRadius: [8, 8, 0, 0] }
      },
      {
        name: 'Inventory',
        type: 'bar',
        data: simulationData.map(d => d.inventory),
        itemStyle: { color: '#3b82f6', borderRadius: [8, 8, 0, 0] }
      }
    ]
  };
}

export function getLogisticCurveChart(logisticCurveData: { x: number; y: number }[]): EChartsOption {
  return {
    tooltip: { trigger: 'axis' },
    grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
    xAxis: {
      type: 'value',
      name: 'Supply Shock Magnitude',
      nameLocation: 'middle',
      nameGap: 30,
      axisLine: { lineStyle: { color: '#9ca3af' } }
    },
    yAxis: {
      type: 'value',
      name: 'Price Impact (normalized)',
      nameLocation: 'middle',
      nameGap: 40,
      axisLine: { lineStyle: { color: '#9ca3af' } }
    },
    series: [
      {
        name: 'Price Response',
        type: 'line',
        smooth: true,
        data: logisticCurveData.map(d => [d.x, d.y]),
        lineStyle: { width: 4, color: '#8b5cf6' },
        itemStyle: { color: '#8b5cf6' },
        showSymbol: false
      }
    ]
  };
}

export function getScatterChart(scatterData: { volume: number; quality: number }[]): EChartsOption {
  return {
    tooltip: { trigger: 'item' },
    grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
    xAxis: {
      type: 'value',
      name: 'Volume (units)',
      nameLocation: 'middle',
      nameGap: 30,
      axisLine: { lineStyle: { color: '#9ca3af' } }
    },
    yAxis: {
      type: 'value',
      name: 'Quality Score',
      nameLocation: 'middle',
      nameGap: 40,
      axisLine: { lineStyle: { color: '#9ca3af' } }
    },
    series: [
      {
        name: 'Data Points',
        type: 'scatter',
        data: scatterData.map(d => [d.volume, d.quality]),
        itemStyle: { color: 'rgba(13, 148, 136, 0.6)' },
        symbolSize: 8
      }
    ]
  };
}

export function getSensitivityChart(sensitivityData: SensitivityDataPoint[]): EChartsOption {
  return {
    tooltip: { trigger: 'axis' },
    legend: { data: ['Demand Sensitivity', 'Supply Sensitivity'], bottom: 0 },
    grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      name: 'Parameter Change (%)',
      nameLocation: 'middle',
      nameGap: 30,
      data: sensitivityData.map(d => d.parameter.toString()),
      axisLine: { lineStyle: { color: '#9ca3af' } }
    },
    yAxis: {
      type: 'value',
      name: 'Output Value',
      nameLocation: 'middle',
      nameGap: 40,
      axisLine: { lineStyle: { color: '#9ca3af' } }
    },
    series: [
      {
        name: 'Demand Sensitivity',
        type: 'line',
        smooth: true,
        data: sensitivityData.map(d => d.demand),
        lineStyle: { width: 3, color: '#0d9488' },
        itemStyle: { color: '#0d9488' }
      },
      {
        name: 'Supply Sensitivity',
        type: 'line',
        smooth: true,
        data: sensitivityData.map(d => d.supply),
        lineStyle: { width: 3, color: '#f59e0b' },
        itemStyle: { color: '#f59e0b' }
      }
    ]
  };
}

export function getFeatureImportanceChart(featureImportanceData: FeatureImportanceItem[]): EChartsOption {
  return {
    tooltip: { trigger: 'axis' },
    grid: { left: '20%', right: '4%', bottom: '10%', top: '10%', containLabel: true },
    xAxis: { type: 'value', axisLine: { lineStyle: { color: '#9ca3af' } } },
    yAxis: {
      type: 'category',
      data: featureImportanceData.map(d => d.name),
      axisLine: { lineStyle: { color: '#9ca3af' } }
    },
    series: [
      {
        name: 'Importance Score',
        type: 'bar',
        data: featureImportanceData.map(d => d.value),
        itemStyle: { color: '#8b5cf6', borderRadius: [0, 8, 8, 0] }
      }
    ]
  };
}

export function getComparisonChart(
  selectedSims: SavedSimulation[],
  times: string[],
  field: 'demand' | 'supply' | 'inventory'
): EChartsOption {
  const colors = ['#2d6b6a', '#64748b', '#f97316'];

  return {
    tooltip: { trigger: 'axis' },
    legend: { data: selectedSims.map(s => s.name), bottom: 0, textStyle: { fontSize: 10 } },
    grid: { left: '10%', right: '5%', bottom: '20%', top: '10%' },
    xAxis: { type: 'category', data: times, axisLine: { lineStyle: { color: '#9ca3af' } } },
    yAxis: { type: 'value', axisLine: { lineStyle: { color: '#9ca3af' } } },
    series: selectedSims.map((sim, idx) => ({
      name: sim.name,
      type: 'line' as const,
      data: sim.results[field],
      lineStyle: { width: 2, color: colors[idx] },
      itemStyle: { color: colors[idx] }
    }))
  };
}

export function getHeatmapColor(value: number): string {
  if (value > 0.7) return '#ef4444';
  if (value > 0.4) return '#f59e0b';
  return '#22c55e';
}

export function getConfusionMatrixColor(x: number, y: number): string {
  if (x === y) return x === 0 ? '#22c55e' : '#0d9488';
  return '#ef4444';
}
