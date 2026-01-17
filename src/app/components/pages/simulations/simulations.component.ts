import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts';
import { NavigationService } from '../../../services/navigation.service';
import { Sector, sectorDisplayNames } from '../../../models/routing.model';
import { EChartsOption } from 'echarts';

interface SavedSimulation {
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

interface KpiCard {
  title: string;
  value: string;
  icon: string;
  colorClass: string;
}

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

  // Options
  variables = [
    'Capture volume',
    'Imports',
    'Exports',
    'Quantity available for consumption',
    'Quantity consumed (kg or tons)',
    'Market price'
  ];

  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  years = ['2024', '2023', '2022', '2021', '2020'];

  visualizationTypes = [
    'Time Series',
    'Bar Chart',
    'Logistic Curve',
    'Confusion Matrix',
    'Scatter Plot',
    'Heatmap',
    'Sensitivity Line Plot'
  ];

  quickAccessTypes = ['Time Series', 'Bar Chart', 'Logistic Curve', 'Confusion Matrix'];

  // Saved simulations
  savedSimulations: SavedSimulation[] = [];
  selectedSimulationIds: string[] = [];

  // Dialogs
  showUploadDialog = false;
  showSaveDialog = false;
  simulationName = '';

  // KPI Cards
  kpiCards: KpiCard[] = [
    { title: 'Forecast Accuracy', value: '94.2%', icon: 'trending-up', colorClass: 'kpi-primary' },
    { title: 'Risk Score', value: 'Medium', icon: 'activity', colorClass: 'kpi-orange' },
    { title: 'Demand Variance', value: '±12%', icon: 'bar-chart-3', colorClass: 'kpi-blue' },
    { title: 'Model Type', value: 'LSTM', icon: 'sparkles', colorClass: 'kpi-purple' }
  ];

  // Sample data
  forecastData = [
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

  simulationData = [
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

  sensitivityData = [
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

  featureImportanceData = [
    { name: 'ΔSea Temp', value: 0.24 },
    { name: 'ΔChlorophyll', value: 0.21 },
    { name: 'ΔLandings', value: 0.18 },
    { name: 'ΔInventory', value: 0.15 },
    { name: 'ΔImports', value: 0.12 }
  ];

  // Chart options
  mainChart: EChartsOption = {};
  featureImportanceChart: EChartsOption = {};
  comparisonCharts: { demand: EChartsOption; supply: EChartsOption; inventory: EChartsOption } = {
    demand: {},
    supply: {},
    inventory: {}
  };

  // Heatmap data
  heatmapData: { x: number; y: number; value: number }[] = [];
  confusionMatrix = [
    { x: 0, y: 0, value: 144, label: 'TN: 144' },
    { x: 1, y: 0, value: 23, label: 'FP: 23' },
    { x: 0, y: 1, value: 7, label: 'FN: 7' },
    { x: 1, y: 1, value: 46, label: 'TP: 46' }
  ];

  // Scatter data
  scatterData: { volume: number; quality: number }[] = [];

  // Logistic curve data
  logisticCurveData: { x: number; y: number }[] = [];

  ngOnInit(): void {
    const routeSector = this.route.snapshot.data['sector'] as Sector;
    this.sector = routeSector || this.navigationService.currentSector || 'grain';
    this.generateSampleData();
    this.updateCharts();
  }

  generateSampleData(): void {
    // Generate heatmap data
    this.heatmapData = Array.from({ length: 25 }, (_, i) => ({
      x: i % 5,
      y: Math.floor(i / 5),
      value: Math.random()
    }));

    // Generate scatter data
    this.scatterData = Array.from({ length: 120 }, () => ({
      volume: Math.random() * 100,
      quality: Math.random() * 100
    }));

    // Generate logistic curve data
    this.logisticCurveData = Array.from({ length: 50 }, (_, i) => {
      const x = -2.0 + (i * 4.0) / 50;
      return { x, y: 1 / (1 + Math.exp(-3 * x)) };
    });
  }

  updateCharts(): void {
    this.updateMainChart();
    this.updateFeatureImportanceChart();
    this.updateComparisonCharts();
  }

  updateMainChart(): void {
    switch (this.selectedVisualization) {
      case 'Time Series':
        this.mainChart = this.getTimeSeriesChart();
        break;
      case 'Bar Chart':
        this.mainChart = this.getBarChart();
        break;
      case 'Logistic Curve':
        this.mainChart = this.getLogisticCurveChart();
        break;
      case 'Scatter Plot':
        this.mainChart = this.getScatterChart();
        break;
      case 'Sensitivity Line Plot':
        this.mainChart = this.getSensitivityChart();
        break;
      default:
        this.mainChart = this.getTimeSeriesChart();
    }
  }

  getTimeSeriesChart(): EChartsOption {
    return {
      tooltip: { trigger: 'axis' },
      legend: { data: ['Actual', 'ML Forecast'], bottom: 0 },
      grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
      xAxis: {
        type: 'category',
        name: 'Time (weeks)',
        nameLocation: 'middle',
        nameGap: 30,
        data: this.forecastData.map(d => d.time.toString()),
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
          data: this.forecastData.map(d => d.actual),
          lineStyle: { width: 3, color: '#0d9488' },
          itemStyle: { color: '#0d9488' },
          areaStyle: { color: 'rgba(13, 148, 136, 0.1)' }
        },
        {
          name: 'ML Forecast',
          type: 'line',
          smooth: true,
          data: this.forecastData.map(d => d.predicted),
          lineStyle: { width: 3, color: '#f59e0b', type: 'dashed' },
          itemStyle: { color: '#f59e0b' },
          areaStyle: { color: 'rgba(245, 158, 11, 0.1)' }
        }
      ]
    };
  }

  getBarChart(): EChartsOption {
    return {
      tooltip: { trigger: 'axis' },
      legend: { data: ['Demand', 'Supply', 'Inventory'], bottom: 0 },
      grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
      xAxis: {
        type: 'category',
        data: this.simulationData.map(d => d.time),
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
          data: this.simulationData.map(d => d.demand),
          itemStyle: { color: '#0d9488', borderRadius: [8, 8, 0, 0] }
        },
        {
          name: 'Supply',
          type: 'bar',
          data: this.simulationData.map(d => d.supply),
          itemStyle: { color: '#f59e0b', borderRadius: [8, 8, 0, 0] }
        },
        {
          name: 'Inventory',
          type: 'bar',
          data: this.simulationData.map(d => d.inventory),
          itemStyle: { color: '#3b82f6', borderRadius: [8, 8, 0, 0] }
        }
      ]
    };
  }

  getLogisticCurveChart(): EChartsOption {
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
          data: this.logisticCurveData.map(d => [d.x, d.y]),
          lineStyle: { width: 4, color: '#8b5cf6' },
          itemStyle: { color: '#8b5cf6' },
          showSymbol: false
        }
      ]
    };
  }

  getScatterChart(): EChartsOption {
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
          data: this.scatterData.map(d => [d.volume, d.quality]),
          itemStyle: { color: 'rgba(13, 148, 136, 0.6)' },
          symbolSize: 8
        }
      ]
    };
  }

  getSensitivityChart(): EChartsOption {
    return {
      tooltip: { trigger: 'axis' },
      legend: { data: ['Demand Sensitivity', 'Supply Sensitivity'], bottom: 0 },
      grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
      xAxis: {
        type: 'category',
        name: 'Parameter Change (%)',
        nameLocation: 'middle',
        nameGap: 30,
        data: this.sensitivityData.map(d => d.parameter.toString()),
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
          data: this.sensitivityData.map(d => d.demand),
          lineStyle: { width: 3, color: '#0d9488' },
          itemStyle: { color: '#0d9488' }
        },
        {
          name: 'Supply Sensitivity',
          type: 'line',
          smooth: true,
          data: this.sensitivityData.map(d => d.supply),
          lineStyle: { width: 3, color: '#f59e0b' },
          itemStyle: { color: '#f59e0b' }
        }
      ]
    };
  }

  updateFeatureImportanceChart(): void {
    this.featureImportanceChart = {
      tooltip: { trigger: 'axis' },
      grid: { left: '20%', right: '4%', bottom: '10%', top: '10%', containLabel: true },
      xAxis: { type: 'value', axisLine: { lineStyle: { color: '#9ca3af' } } },
      yAxis: {
        type: 'category',
        data: this.featureImportanceData.map(d => d.name),
        axisLine: { lineStyle: { color: '#9ca3af' } }
      },
      series: [
        {
          name: 'Importance Score',
          type: 'bar',
          data: this.featureImportanceData.map(d => d.value),
          itemStyle: { color: '#8b5cf6', borderRadius: [0, 8, 8, 0] }
        }
      ]
    };
  }

  updateComparisonCharts(): void {
    if (this.selectedSimulationIds.length < 2) return;

    const selectedSims = this.savedSimulations.filter(s => this.selectedSimulationIds.includes(s.id));
    const colors = ['#2d6b6a', '#64748b', '#f97316'];
    const times = this.simulationData.map(d => d.time);

    // Demand comparison
    this.comparisonCharts.demand = {
      tooltip: { trigger: 'axis' },
      legend: { data: selectedSims.map(s => s.name), bottom: 0, textStyle: { fontSize: 10 } },
      grid: { left: '10%', right: '5%', bottom: '20%', top: '10%' },
      xAxis: { type: 'category', data: times, axisLine: { lineStyle: { color: '#9ca3af' } } },
      yAxis: { type: 'value', axisLine: { lineStyle: { color: '#9ca3af' } } },
      series: selectedSims.map((sim, idx) => ({
        name: sim.name,
        type: 'line' as const,
        data: sim.results.demand,
        lineStyle: { width: 2, color: colors[idx] },
        itemStyle: { color: colors[idx] }
      }))
    };

    // Supply comparison
    this.comparisonCharts.supply = {
      tooltip: { trigger: 'axis' },
      legend: { data: selectedSims.map(s => s.name), bottom: 0, textStyle: { fontSize: 10 } },
      grid: { left: '10%', right: '5%', bottom: '20%', top: '10%' },
      xAxis: { type: 'category', data: times, axisLine: { lineStyle: { color: '#9ca3af' } } },
      yAxis: { type: 'value', axisLine: { lineStyle: { color: '#9ca3af' } } },
      series: selectedSims.map((sim, idx) => ({
        name: sim.name,
        type: 'line' as const,
        data: sim.results.supply,
        lineStyle: { width: 2, color: colors[idx] },
        itemStyle: { color: colors[idx] }
      }))
    };

    // Inventory comparison
    this.comparisonCharts.inventory = {
      tooltip: { trigger: 'axis' },
      legend: { data: selectedSims.map(s => s.name), bottom: 0, textStyle: { fontSize: 10 } },
      grid: { left: '10%', right: '5%', bottom: '20%', top: '10%' },
      xAxis: { type: 'category', data: times, axisLine: { lineStyle: { color: '#9ca3af' } } },
      yAxis: { type: 'value', axisLine: { lineStyle: { color: '#9ca3af' } } },
      series: selectedSims.map((sim, idx) => ({
        name: sim.name,
        type: 'line' as const,
        data: sim.results.inventory,
        lineStyle: { width: 2, color: colors[idx] },
        itemStyle: { color: colors[idx] }
      }))
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
    if (value > 0.7) return '#ef4444';
    if (value > 0.4) return '#f59e0b';
    return '#22c55e';
  }

  getConfusionMatrixColor(x: number, y: number): string {
    if (x === y) return x === 0 ? '#22c55e' : '#0d9488';
    return '#ef4444';
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
}
