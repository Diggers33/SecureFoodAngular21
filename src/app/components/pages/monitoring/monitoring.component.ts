import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts';
import { NavigationService } from '../../../services/navigation.service';
import { Sector, sectorDisplayNames } from '../../../models/routing.model';
import { EChartsOption } from 'echarts';

interface KpiCard {
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

interface InfoCard {
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

@Component({
  selector: 'app-monitoring',
  standalone: true,
  imports: [CommonModule, TranslateModule, LucideAngularModule, NgxEchartsDirective],
  providers: [provideEchartsCore({ echarts })],
  templateUrl: './monitoring.component.html',
  styleUrl: './monitoring.component.scss'
})
export class MonitoringComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private navigationService = inject(NavigationService);

  sector: Sector = 'grain';
  selectedTimeRange = '14d';
  sectorDisplayNames = sectorDisplayNames;

  timeRanges = ['14d', '30d', '90d', '120d'];

  // KPI Cards for each sector
  fishKpis: KpiCard[] = [
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

  grainKpis: KpiCard[] = [
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

  fruitsKpis: KpiCard[] = [
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

  // Info Cards for each sector
  fishInfoCards: InfoCard[] = [
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

  grainInfoCards: InfoCard[] = [
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

  fruitsInfoCards: InfoCard[] = [
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

  // Chart options
  fishEnvironmentalChart: EChartsOption = {};
  fishProductionChart: EChartsOption = {};
  grainPriceChart: EChartsOption = {};
  grainLogisticsChart: EChartsOption = {};
  fruitsClimateChart: EChartsOption = {};
  fruitsYieldChart: EChartsOption = {};

  ngOnInit(): void {
    const routeSector = this.route.snapshot.data['sector'] as Sector;
    this.sector = routeSector || this.navigationService.currentSector || 'grain';
    this.initCharts();
  }

  initCharts(): void {
    // Fish Environmental Chart
    this.fishEnvironmentalChart = {
      tooltip: { trigger: 'axis' },
      legend: { data: ['Algae (cells/mL)', 'Temperature (°C)', 'Oxygen (mg/L)'], bottom: 0 },
      grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
      xAxis: {
        type: 'category',
        data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
        axisLine: { lineStyle: { color: '#9ca3af' } }
      },
      yAxis: [
        { type: 'value', axisLine: { lineStyle: { color: '#9ca3af' } } },
        { type: 'value', axisLine: { lineStyle: { color: '#9ca3af' } } }
      ],
      series: [
        {
          name: 'Algae (cells/mL)',
          type: 'line',
          smooth: true,
          data: [45, 52, 68, 85, 92, 88],
          lineStyle: { width: 3 },
          itemStyle: { color: '#ef4444' }
        },
        {
          name: 'Temperature (°C)',
          type: 'line',
          smooth: true,
          data: [18.2, 18.5, 19.1, 20.5, 21.2, 20.8],
          lineStyle: { width: 3 },
          itemStyle: { color: '#f59e0b' }
        },
        {
          name: 'Oxygen (mg/L)',
          type: 'line',
          smooth: true,
          yAxisIndex: 1,
          data: [7.5, 7.3, 6.8, 6.2, 5.9, 6.1],
          lineStyle: { width: 3 },
          itemStyle: { color: '#3b82f6' }
        }
      ]
    };

    // Fish Production Chart
    this.fishProductionChart = {
      tooltip: { trigger: 'axis' },
      legend: { data: ['Catch Volume (tons)', 'Affected Areas (tons)'], bottom: 0 },
      grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        axisLine: { lineStyle: { color: '#9ca3af' } }
      },
      yAxis: { type: 'value', axisLine: { lineStyle: { color: '#9ca3af' } } },
      series: [
        {
          name: 'Catch Volume (tons)',
          type: 'bar',
          data: [1200, 1150, 980, 850, 720],
          itemStyle: { color: '#14b8a6', borderRadius: [10, 10, 0, 0] }
        },
        {
          name: 'Affected Areas (tons)',
          type: 'bar',
          data: [200, 350, 520, 650, 780],
          itemStyle: { color: '#ef4444', borderRadius: [10, 10, 0, 0] }
        }
      ]
    };

    // Grain Price Chart
    this.grainPriceChart = {
      tooltip: { trigger: 'axis' },
      legend: { data: ['International (€/ton)', 'Domestic (€/ton)'], bottom: 0 },
      grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
      xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        axisLine: { lineStyle: { color: '#9ca3af' } }
      },
      yAxis: { type: 'value', axisLine: { lineStyle: { color: '#9ca3af' } } },
      series: [
        {
          name: 'International (€/ton)',
          type: 'line',
          smooth: true,
          areaStyle: { opacity: 0.3 },
          data: [310, 325, 380, 420, 455, 440],
          lineStyle: { width: 3 },
          itemStyle: { color: '#3b82f6' }
        },
        {
          name: 'Domestic (€/ton)',
          type: 'line',
          smooth: true,
          areaStyle: { opacity: 0.3 },
          data: [280, 295, 340, 385, 410, 395],
          lineStyle: { width: 3 },
          itemStyle: { color: '#10b981' }
        }
      ]
    };

    // Grain Logistics Chart
    this.grainLogisticsChart = {
      tooltip: { trigger: 'axis' },
      legend: { data: ['Delays', 'Capacity (%)'], bottom: 0 },
      grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
      xAxis: {
        type: 'category',
        data: ['Rail', 'Road', 'Sea'],
        axisLine: { lineStyle: { color: '#9ca3af' } }
      },
      yAxis: { type: 'value', axisLine: { lineStyle: { color: '#9ca3af' } } },
      series: [
        {
          name: 'Delays',
          type: 'bar',
          data: [12, 28, 45],
          itemStyle: { color: '#ef4444', borderRadius: [10, 10, 0, 0] }
        },
        {
          name: 'Capacity (%)',
          type: 'bar',
          data: [65, 45, 20],
          itemStyle: { color: '#10b981', borderRadius: [10, 10, 0, 0] }
        }
      ]
    };

    // Fruits Climate Chart
    this.fruitsClimateChart = {
      tooltip: { trigger: 'axis' },
      legend: { data: ['Rainfall (mm)', 'Soil Moisture (%)', 'Temperature (°C)'], bottom: 0 },
      grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
      xAxis: {
        type: 'category',
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        axisLine: { lineStyle: { color: '#9ca3af' } }
      },
      yAxis: { type: 'value', axisLine: { lineStyle: { color: '#9ca3af' } } },
      series: [
        {
          name: 'Rainfall (mm)',
          type: 'line',
          smooth: true,
          data: [45, 38, 22, 15, 8, 5],
          lineStyle: { width: 3 },
          itemStyle: { color: '#3b82f6' }
        },
        {
          name: 'Soil Moisture (%)',
          type: 'line',
          smooth: true,
          data: [68, 62, 48, 35, 22, 18],
          lineStyle: { width: 3 },
          itemStyle: { color: '#10b981' }
        },
        {
          name: 'Temperature (°C)',
          type: 'line',
          smooth: true,
          data: [12, 14, 16, 19, 23, 27],
          lineStyle: { width: 3 },
          itemStyle: { color: '#f59e0b' }
        }
      ]
    };

    // Fruits Yield Chart
    this.fruitsYieldChart = {
      tooltip: { trigger: 'axis' },
      legend: { data: ['Historical Avg (tons/ha)', 'Current Season (tons/ha)'], bottom: 0 },
      grid: { left: '3%', right: '4%', bottom: '15%', top: '10%', containLabel: true },
      xAxis: {
        type: 'category',
        data: ['Tomatoes', 'Lettuce', 'Peppers', 'Cucumbers'],
        axisLine: { lineStyle: { color: '#9ca3af' } }
      },
      yAxis: { type: 'value', axisLine: { lineStyle: { color: '#9ca3af' } } },
      series: [
        {
          name: 'Historical Avg (tons/ha)',
          type: 'bar',
          data: [58, 48, 45, 52],
          itemStyle: { color: '#94a3b8', borderRadius: [10, 10, 0, 0] }
        },
        {
          name: 'Current Season (tons/ha)',
          type: 'bar',
          data: [42, 35, 28, 38],
          itemStyle: { color: '#10b981', borderRadius: [10, 10, 0, 0] }
        }
      ]
    };
  }

  get currentKpis(): KpiCard[] {
    switch (this.sector) {
      case 'fish': return this.fishKpis;
      case 'grain': return this.grainKpis;
      case 'fruits': return this.fruitsKpis;
      default: return this.grainKpis;
    }
  }

  get currentInfoCards(): InfoCard[] {
    switch (this.sector) {
      case 'fish': return this.fishInfoCards;
      case 'grain': return this.grainInfoCards;
      case 'fruits': return this.fruitsInfoCards;
      default: return this.grainInfoCards;
    }
  }

  get chart1(): EChartsOption {
    switch (this.sector) {
      case 'fish': return this.fishEnvironmentalChart;
      case 'grain': return this.grainPriceChart;
      case 'fruits': return this.fruitsClimateChart;
      default: return this.grainPriceChart;
    }
  }

  get chart2(): EChartsOption {
    switch (this.sector) {
      case 'fish': return this.fishProductionChart;
      case 'grain': return this.grainLogisticsChart;
      case 'fruits': return this.fruitsYieldChart;
      default: return this.grainLogisticsChart;
    }
  }

  get chart1Config(): { title: string; subtitle: string; icon: string; colorClass: string } {
    switch (this.sector) {
      case 'fish':
        return { title: 'Environmental Indicators', subtitle: 'Last 24 hours', icon: 'activity', colorClass: 'chart-blue' };
      case 'grain':
        return { title: 'Price Trends', subtitle: '6-month comparison', icon: 'trending-up', colorClass: 'chart-amber' };
      case 'fruits':
        return { title: 'Climate Conditions', subtitle: '6-month trend', icon: 'cloud-rain', colorClass: 'chart-blue' };
      default:
        return { title: 'Trends', subtitle: 'Last 30 days', icon: 'trending-up', colorClass: 'chart-primary' };
    }
  }

  get chart2Config(): { title: string; subtitle: string; icon: string; colorClass: string } {
    switch (this.sector) {
      case 'fish':
        return { title: 'Production Impact', subtitle: '5-day trend', icon: 'bar-chart-3', colorClass: 'chart-teal' };
      case 'grain':
        return { title: 'Logistics Analysis', subtitle: 'By transport route', icon: 'truck', colorClass: 'chart-orange' };
      case 'fruits':
        return { title: 'Crop Yield Comparison', subtitle: 'Current vs Historical', icon: 'apple', colorClass: 'chart-green' };
      default:
        return { title: 'Analysis', subtitle: 'Current period', icon: 'bar-chart-3', colorClass: 'chart-primary' };
    }
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

  onSectorChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.sector = select.value as Sector;
    this.navigationService.goToMonitoring(this.sector);
  }

  onTimeRangeChange(range: string): void {
    this.selectedTimeRange = range;
  }

  onBackToUseCases(): void {
    this.navigationService.goToHome();
  }

  getTrendIcon(direction: string): string {
    switch (direction) {
      case 'up': return 'trending-up';
      case 'down': return 'trending-down';
      default: return 'activity';
    }
  }
}
