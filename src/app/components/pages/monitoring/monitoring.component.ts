import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';

import { NavigationService } from '../../../services/navigation.service';
import { Sector, sectorDisplayNames } from '../../../models/routing.model';
import { KpiCard, InfoCard, ChartConfig } from './monitoring.models';
import {
  TIME_RANGES,
  FISH_KPIS,
  GRAIN_KPIS,
  FRUITS_KPIS,
  FISH_INFO_CARDS,
  GRAIN_INFO_CARDS,
  FRUITS_INFO_CARDS,
  FISH_CHART1_CONFIG,
  FISH_CHART2_CONFIG,
  GRAIN_CHART1_CONFIG,
  GRAIN_CHART2_CONFIG,
  FRUITS_CHART1_CONFIG,
  FRUITS_CHART2_CONFIG,
  DEFAULT_CHART_CONFIG
} from './monitoring.data';
import {
  getFishEnvironmentalChart,
  getFishProductionChart,
  getGrainPriceChart,
  getGrainLogisticsChart,
  getFruitsClimateChart,
  getFruitsYieldChart
} from './monitoring.chart-config';

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

  timeRanges = TIME_RANGES;

  // KPI Cards for each sector
  fishKpis = FISH_KPIS;
  grainKpis = GRAIN_KPIS;
  fruitsKpis = FRUITS_KPIS;

  // Info Cards for each sector
  fishInfoCards = FISH_INFO_CARDS;
  grainInfoCards = GRAIN_INFO_CARDS;
  fruitsInfoCards = FRUITS_INFO_CARDS;

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
    this.fishEnvironmentalChart = getFishEnvironmentalChart();
    this.fishProductionChart = getFishProductionChart();
    this.grainPriceChart = getGrainPriceChart();
    this.grainLogisticsChart = getGrainLogisticsChart();
    this.fruitsClimateChart = getFruitsClimateChart();
    this.fruitsYieldChart = getFruitsYieldChart();
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

  get chart1Config(): ChartConfig {
    switch (this.sector) {
      case 'fish': return FISH_CHART1_CONFIG;
      case 'grain': return GRAIN_CHART1_CONFIG;
      case 'fruits': return FRUITS_CHART1_CONFIG;
      default: return DEFAULT_CHART_CONFIG;
    }
  }

  get chart2Config(): ChartConfig {
    switch (this.sector) {
      case 'fish': return FISH_CHART2_CONFIG;
      case 'grain': return GRAIN_CHART2_CONFIG;
      case 'fruits': return FRUITS_CHART2_CONFIG;
      default: return DEFAULT_CHART_CONFIG;
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
