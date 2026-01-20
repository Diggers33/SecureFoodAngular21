import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';

import { NavigationService } from '../../../services/navigation.service';
import { Sector, sectorDisplayNames } from '../../../models/routing.model';
import { SavedSimulation, KpiCard } from './simulations.models';
import {
  SIMULATION_VARIABLES,
  MONTHS,
  YEARS,
  VISUALIZATION_TYPES,
  QUICK_ACCESS_TYPES,
  KPI_CARDS,
  FORECAST_DATA,
  SIMULATION_DATA,
  SENSITIVITY_DATA,
  FEATURE_IMPORTANCE_DATA,
  CONFUSION_MATRIX,
  generateHeatmapData,
  generateScatterData,
  generateLogisticCurveData
} from './simulations.data';
import {
  getTimeSeriesChart,
  getBarChart,
  getLogisticCurveChart,
  getScatterChart,
  getSensitivityChart,
  getFeatureImportanceChart,
  getComparisonChart,
  getHeatmapColor,
  getConfusionMatrixColor
} from './simulations.chart-config';

@Component({
  selector: 'app-simulations',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, LucideAngularModule, NgxEchartsDirective],
  providers: [provideEchartsCore({ echarts })],
  templateUrl: './simulations.component.html',
  styleUrl: './simulations.component.scss'
})
export class SimulationsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private navigationService = inject(NavigationService);

  sector: Sector = 'grain';
  activeTab = 'simulations';
  sectorDisplayNames = sectorDisplayNames;

  // Control panel state
  selectedVariable = 'Capture volume';
  selectedMonth = 'January';
  selectedYear = '2024';
  selectedVisualization = 'Time Series';
  datasetType = 'platform';

  // Options from data file
  variables = SIMULATION_VARIABLES;
  months = MONTHS;
  years = YEARS;
  visualizationTypes = VISUALIZATION_TYPES;
  quickAccessTypes = QUICK_ACCESS_TYPES;

  // KPI Cards
  kpiCards: KpiCard[] = KPI_CARDS;

  // Sample data from data file
  forecastData = FORECAST_DATA;
  simulationData = SIMULATION_DATA;
  sensitivityData = SENSITIVITY_DATA;
  featureImportanceData = FEATURE_IMPORTANCE_DATA;
  confusionMatrix = CONFUSION_MATRIX;

  // Saved simulations
  savedSimulations: SavedSimulation[] = [];
  selectedSimulationIds: string[] = [];

  // Dialogs
  showUploadDialog = false;
  showSaveDialog = false;
  simulationName = '';

  // Chart options
  mainChart: EChartsOption = {};
  featureImportanceChart: EChartsOption = {};
  comparisonCharts: { demand: EChartsOption; supply: EChartsOption; inventory: EChartsOption } = {
    demand: {},
    supply: {},
    inventory: {}
  };

  // Forecast charts
  productionForecastChart: EChartsOption = {};
  temperatureForecastChart: EChartsOption = {};
  demandForecastChart: EChartsOption = {};
  priceForecastChart: EChartsOption = {};

  // Dynamic data
  heatmapData: { x: number; y: number; value: number }[] = [];
  scatterData: { volume: number; quality: number }[] = [];
  logisticCurveData: { x: number; y: number }[] = [];

  ngOnInit(): void {
    const routeSector = this.route.snapshot.data['sector'] as Sector;
    this.sector = routeSector || this.navigationService.currentSector || 'grain';
    this.generateSampleData();
    this.updateCharts();
    this.initializeForecastCharts();
  }

  generateSampleData(): void {
    this.heatmapData = generateHeatmapData();
    this.scatterData = generateScatterData();
    this.logisticCurveData = generateLogisticCurveData();
  }

  updateCharts(): void {
    this.updateMainChart();
    this.updateFeatureImportanceChart();
    this.updateComparisonCharts();
  }

  updateMainChart(): void {
    switch (this.selectedVisualization) {
      case 'Time Series':
        this.mainChart = getTimeSeriesChart(this.forecastData);
        break;
      case 'Bar Chart':
        this.mainChart = getBarChart(this.simulationData);
        break;
      case 'Logistic Curve':
        this.mainChart = getLogisticCurveChart(this.logisticCurveData);
        break;
      case 'Scatter Plot':
        this.mainChart = getScatterChart(this.scatterData);
        break;
      case 'Sensitivity Line Plot':
        this.mainChart = getSensitivityChart(this.sensitivityData);
        break;
      default:
        this.mainChart = getTimeSeriesChart(this.forecastData);
    }
  }

  updateFeatureImportanceChart(): void {
    this.featureImportanceChart = getFeatureImportanceChart(this.featureImportanceData);
  }

  updateComparisonCharts(): void {
    if (this.selectedSimulationIds.length < 2) return;

    const selectedSims = this.savedSimulations.filter(s => this.selectedSimulationIds.includes(s.id));
    const times = this.simulationData.map(d => d.time);

    this.comparisonCharts.demand = getComparisonChart(selectedSims, times, 'demand');
    this.comparisonCharts.supply = getComparisonChart(selectedSims, times, 'supply');
    this.comparisonCharts.inventory = getComparisonChart(selectedSims, times, 'inventory');
  }

  initializeForecastCharts(): void {
    // Production Volume Forecast (12-month)
    this.productionForecastChart = {
      grid: { left: '8%', right: '5%', top: '10%', bottom: '15%' },
      xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        axisLine: { lineStyle: { color: '#e5e7eb' } },
        axisLabel: { color: '#6b7280', fontSize: 10 }
      },
      yAxis: {
        type: 'value',
        axisLine: { show: false },
        splitLine: { lineStyle: { color: '#f3f4f6' } },
        axisLabel: { color: '#6b7280', fontSize: 10 }
      },
      series: [
        {
          name: 'Actual',
          type: 'line',
          data: [850, 920, 980, 1050, 1120, 1180, null, null, null, null, null, null],
          smooth: true,
          lineStyle: { color: '#10b981', width: 2 },
          itemStyle: { color: '#10b981' },
          symbol: 'circle',
          symbolSize: 6
        },
        {
          name: 'Forecast',
          type: 'line',
          data: [null, null, null, null, null, 1180, 1250, 1300, 1350, 1420, 1480, 1550],
          smooth: true,
          lineStyle: { color: '#f59e0b', width: 2, type: 'dashed' },
          itemStyle: { color: '#f59e0b' },
          symbol: 'circle',
          symbolSize: 6
        }
      ]
    };

    // Temperature Forecast (8-week)
    this.temperatureForecastChart = {
      grid: { left: '8%', right: '5%', top: '10%', bottom: '15%' },
      xAxis: {
        type: 'category',
        data: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'],
        axisLine: { lineStyle: { color: '#e5e7eb' } },
        axisLabel: { color: '#6b7280', fontSize: 10 }
      },
      yAxis: {
        type: 'value',
        min: 14,
        max: 21,
        axisLine: { show: false },
        splitLine: { lineStyle: { color: '#f3f4f6' } },
        axisLabel: { color: '#6b7280', fontSize: 10 }
      },
      series: [
        {
          name: 'Actual',
          type: 'line',
          data: [15.2, 15.8, 16.1, 16.8, null, null, null, null],
          smooth: true,
          lineStyle: { color: '#8b5cf6', width: 2 },
          itemStyle: { color: '#8b5cf6' },
          symbol: 'circle',
          symbolSize: 6
        },
        {
          name: 'Forecast',
          type: 'line',
          data: [null, null, null, 16.8, 17.5, 18.2, 18.9, 19.5],
          smooth: true,
          lineStyle: { color: '#f59e0b', width: 2, type: 'dashed' },
          itemStyle: { color: '#f59e0b' },
          symbol: 'circle',
          symbolSize: 6
        }
      ]
    };

    // Market Demand Forecast (Quarterly)
    this.demandForecastChart = {
      grid: { left: '10%', right: '5%', top: '10%', bottom: '15%' },
      xAxis: {
        type: 'category',
        data: ['2024 Q3', '2024 Q4', '2025 Q1', '2025 Q2', '2025 Q3', '2025 Q4'],
        axisLine: { lineStyle: { color: '#e5e7eb' } },
        axisLabel: { color: '#6b7280', fontSize: 10 }
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 6000,
        axisLine: { show: false },
        splitLine: { lineStyle: { color: '#f3f4f6' } },
        axisLabel: { color: '#6b7280', fontSize: 10 }
      },
      series: [
        {
          name: 'Actual',
          type: 'line',
          data: [3200, 3450, 3680, null, null, null],
          smooth: true,
          lineStyle: { color: '#10b981', width: 2 },
          itemStyle: { color: '#10b981' },
          symbol: 'circle',
          symbolSize: 6
        },
        {
          name: 'Forecast',
          type: 'line',
          data: [null, null, 3680, 4100, 4550, 4950],
          smooth: true,
          lineStyle: { color: '#f59e0b', width: 2, type: 'dashed' },
          itemStyle: { color: '#f59e0b' },
          symbol: 'circle',
          symbolSize: 6
        }
      ]
    };

    // Fish Price Forecast (6-month)
    this.priceForecastChart = {
      grid: { left: '8%', right: '5%', top: '10%', bottom: '15%' },
      xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        axisLine: { lineStyle: { color: '#e5e7eb' } },
        axisLabel: { color: '#6b7280', fontSize: 10 }
      },
      yAxis: {
        type: 'value',
        min: 12,
        max: 16,
        axisLine: { show: false },
        splitLine: { lineStyle: { color: '#f3f4f6' } },
        axisLabel: { color: '#6b7280', fontSize: 10 }
      },
      series: [
        {
          name: 'Actual',
          type: 'line',
          data: [12.5, 13.2, 13.8, 14.5, null, null, null, null, null],
          smooth: true,
          lineStyle: { color: '#8b5cf6', width: 2 },
          itemStyle: { color: '#8b5cf6' },
          symbol: 'circle',
          symbolSize: 6
        },
        {
          name: 'Forecast',
          type: 'line',
          data: [null, null, null, 14.5, 15.2, 15.6, 14.8, 14.2, 13.8],
          smooth: true,
          lineStyle: { color: '#f59e0b', width: 2, type: 'dashed' },
          itemStyle: { color: '#f59e0b' },
          symbol: 'circle',
          symbolSize: 6
        }
      ]
    };
  }

  get sectorIcon(): string {
    switch (this.sector) {
      case 'fish': return 'fish';
      case 'grain': return 'wheat';
      case 'fruits': return 'apple';
      default: return 'activity';
    }
  }

  get sectorGradientClass(): string {
    switch (this.sector) {
      case 'fish': return 'gradient-blue';
      case 'grain': return 'gradient-amber';
      case 'fruits': return 'gradient-green';
      default: return 'gradient-primary';
    }
  }

  getHeatmapColor(value: number): string {
    return getHeatmapColor(value);
  }

  getConfusionMatrixColor(x: number, y: number): string {
    return getConfusionMatrixColor(x, y);
  }

  onBackToUseCases(): void {
    this.navigationService.goToHome();
  }

  onTabChange(tab: string): void {
    this.activeTab = tab;
  }

  onSectorChange(newSector: Sector): void {
    this.sector = newSector;
    this.navigationService.goToSimulations(this.sector);
  }

  onVisualizationChange(type: string): void {
    this.selectedVisualization = type;
    this.updateMainChart();
  }

  onRunSimulation(): void {
    this.showSaveDialog = true;
  }

  onSaveSimulation(): void {
    if (!this.simulationName.trim()) return;

    const newSimulation: SavedSimulation = {
      id: `sim-${Date.now()}`,
      name: this.simulationName,
      sector: this.sector,
      variable: this.selectedVariable,
      month: this.selectedMonth,
      year: this.selectedYear,
      timestamp: new Date(),
      parameters: {
        demandShift: Math.random() * 10 - 5,
        supplyChange: Math.random() * 8 - 4,
        priceFluctuation: Math.random() * 6 - 3
      },
      results: {
        demand: this.simulationData.map(d => d.demand + (Math.random() - 0.5) * 10),
        supply: this.simulationData.map(d => d.supply + (Math.random() - 0.5) * 10),
        inventory: this.simulationData.map(d => d.inventory + (Math.random() - 0.5) * 8)
      }
    };

    this.savedSimulations = [...this.savedSimulations, newSimulation];
    this.simulationName = '';
    this.showSaveDialog = false;
  }

  onDeleteSimulation(id: string): void {
    this.savedSimulations = this.savedSimulations.filter(s => s.id !== id);
    this.selectedSimulationIds = this.selectedSimulationIds.filter(sId => sId !== id);
    this.updateComparisonCharts();
  }

  onDuplicateSimulation(simulation: SavedSimulation): void {
    const duplicate: SavedSimulation = {
      ...simulation,
      id: `sim-${Date.now()}`,
      name: `${simulation.name} (Copy)`,
      timestamp: new Date()
    };
    this.savedSimulations = [...this.savedSimulations, duplicate];
  }

  toggleSimulationSelection(id: string): void {
    if (this.selectedSimulationIds.includes(id)) {
      this.selectedSimulationIds = this.selectedSimulationIds.filter(sId => sId !== id);
    } else if (this.selectedSimulationIds.length < 3) {
      this.selectedSimulationIds = [...this.selectedSimulationIds, id];
    }
    this.updateComparisonCharts();
  }

  isSimulationSelected(id: string): boolean {
    return this.selectedSimulationIds.includes(id);
  }

  getSimulationAvg(simulation: SavedSimulation, field: 'demand' | 'supply' | 'inventory'): number {
    const values = simulation.results[field];
    return values.reduce((a, b) => a + b, 0) / values.length;
  }

  getSimulationGap(simulation: SavedSimulation): number {
    return this.getSimulationAvg(simulation, 'demand') - this.getSimulationAvg(simulation, 'supply');
  }

  closeSaveDialog(): void {
    this.showSaveDialog = false;
    this.simulationName = '';
  }

  closeUploadDialog(): void {
    this.showUploadDialog = false;
  }

  onFileUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      console.log('File uploaded:', input.files[0].name);
      this.showUploadDialog = false;
    }
  }

  onDownloadSimulation(): void {
    const simulationData = {
      metadata: {
        sector: this.sector,
        sectorName: this.sectorDisplayNames[this.sector],
        variable: this.selectedVariable,
        month: this.selectedMonth,
        year: this.selectedYear,
        visualization: this.selectedVisualization,
        exportedAt: new Date().toISOString()
      },
      forecastData: this.forecastData,
      simulationData: this.simulationData,
      featureImportance: this.featureImportanceData,
      confusionMatrix: this.confusionMatrix,
      kpiCards: this.kpiCards.map(kpi => ({
        title: kpi.title,
        value: kpi.value
      }))
    };

    const jsonString = JSON.stringify(simulationData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `simulation_${this.sector}_${this.selectedVariable.replace(/\s+/g, '_')}_${this.selectedMonth}_${this.selectedYear}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}
