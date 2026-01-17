import { Injectable } from '@angular/core';
import { MetricData, MetricStatus } from '../models/metrics.model';

@Injectable({
  providedIn: 'root'
})
export class MetricsService {

  // Fish (Greece) Monitoring Metrics
  private fishMonitoringMetrics: MetricData[] = [
    {
      name: 'Algae Concentration',
      value: 92,
      unit: 'cells/mL',
      status: 'critical',
      trend: {
        direction: 'up',
        value: '+28%',
        label: '+28% vs yesterday',
      },
      icon: 'activity',
      colorScheme: {
        from: 'from-red-50',
        to: 'to-orange-50',
        border: 'border-red-200',
        text: 'text-red-700',
        iconGradient: 'from-red-500 to-orange-600',
      },
    },
    {
      name: 'Water Temperature',
      value: 21.2,
      unit: '°C',
      status: 'warning',
      trend: {
        direction: 'up',
        value: '',
        label: 'Above normal',
      },
      icon: 'thermometer',
      colorScheme: {
        from: 'from-orange-50',
        to: 'to-amber-50',
        border: 'border-orange-200',
        text: 'text-orange-700',
        iconGradient: 'from-orange-500 to-amber-600',
      },
    },
    {
      name: 'Dissolved Oxygen',
      value: 5.9,
      unit: 'mg/L',
      status: 'normal',
      trend: {
        direction: 'down',
        value: '-8%',
        label: 'Optimal range',
      },
      icon: 'droplet',
      colorScheme: {
        from: 'from-blue-50',
        to: 'to-cyan-50',
        border: 'border-blue-200',
        text: 'text-blue-700',
        iconGradient: 'from-blue-500 to-cyan-600',
      },
    },
    {
      name: 'Salinity',
      value: 37.5,
      unit: 'ppt',
      status: 'good',
      trend: {
        direction: 'stable',
        value: '',
        label: 'Stable',
      },
      icon: 'waves',
      colorScheme: {
        from: 'from-green-50',
        to: 'to-emerald-50',
        border: 'border-green-200',
        text: 'text-green-700',
        iconGradient: 'from-green-500 to-emerald-600',
      },
    },
    {
      name: 'Current Speed',
      value: 1.8,
      unit: 'm/s',
      status: 'normal',
      trend: {
        direction: 'up',
        value: '+12%',
        label: '+12% vs yesterday',
      },
      icon: 'wind',
      colorScheme: {
        from: 'from-blue-50',
        to: 'to-sky-50',
        border: 'border-blue-200',
        text: 'text-blue-700',
        iconGradient: 'from-blue-500 to-sky-600',
      },
    },
  ];

  // Grain (Ukraine) Monitoring Metrics
  private grainMonitoringMetrics: MetricData[] = [
    {
      name: 'Sea Route Delays',
      value: 45,
      unit: 'incidents',
      status: 'critical',
      trend: {
        direction: 'up',
        value: '+18',
        label: '+18 this month',
      },
      icon: 'activity',
      colorScheme: {
        from: 'from-red-50',
        to: 'to-rose-50',
        border: 'border-red-200',
        text: 'text-red-700',
        iconGradient: 'from-red-500 to-rose-600',
      },
    },
    {
      name: 'Port Congestion',
      value: 72,
      unit: 'hours',
      status: 'warning',
      trend: {
        direction: 'up',
        value: '+24h',
        label: '+24h avg wait',
      },
      icon: 'activity',
      colorScheme: {
        from: 'from-orange-50',
        to: 'to-amber-50',
        border: 'border-orange-200',
        text: 'text-orange-700',
        iconGradient: 'from-orange-500 to-amber-600',
      },
    },
    {
      name: 'Storage Capacity',
      value: 68,
      unit: '%',
      status: 'normal',
      trend: {
        direction: 'up',
        value: '+5%',
        label: 'Within range',
      },
      icon: 'activity',
      colorScheme: {
        from: 'from-blue-50',
        to: 'to-cyan-50',
        border: 'border-blue-200',
        text: 'text-blue-700',
        iconGradient: 'from-blue-500 to-cyan-600',
      },
    },
    {
      name: 'Quality Score',
      value: 8.7,
      unit: '/10',
      status: 'good',
      trend: {
        direction: 'stable',
        value: '',
        label: 'High quality',
      },
      icon: 'activity',
      colorScheme: {
        from: 'from-green-50',
        to: 'to-emerald-50',
        border: 'border-green-200',
        text: 'text-green-700',
        iconGradient: 'from-green-500 to-emerald-600',
      },
    },
    {
      name: 'Export Volume',
      value: 142,
      unit: 'ktons',
      status: 'normal',
      trend: {
        direction: 'down',
        value: '-12%',
        label: 'vs last month',
      },
      icon: 'activity',
      colorScheme: {
        from: 'from-blue-50',
        to: 'to-indigo-50',
        border: 'border-blue-200',
        text: 'text-blue-700',
        iconGradient: 'from-blue-500 to-indigo-600',
      },
    },
  ];

  // Fruits & Vegetables (Portugal) Monitoring Metrics
  private fruitsMonitoringMetrics: MetricData[] = [
    {
      name: 'Yield Drop',
      value: 28,
      unit: '%',
      status: 'critical',
      trend: {
        direction: 'up',
        value: '+12%',
        label: 'Drought impact',
      },
      icon: 'activity',
      colorScheme: {
        from: 'from-red-50',
        to: 'to-rose-50',
        border: 'border-red-200',
        text: 'text-red-700',
        iconGradient: 'from-red-500 to-rose-600',
      },
    },
    {
      name: 'Soil Moisture',
      value: 42,
      unit: '%',
      status: 'warning',
      trend: {
        direction: 'down',
        value: '-18%',
        label: 'Below optimal',
      },
      icon: 'droplet',
      colorScheme: {
        from: 'from-orange-50',
        to: 'to-amber-50',
        border: 'border-orange-200',
        text: 'text-orange-700',
        iconGradient: 'from-orange-500 to-amber-600',
      },
    },
    {
      name: 'Pest Incidents',
      value: 23,
      unit: 'alerts',
      status: 'warning',
      trend: {
        direction: 'up',
        value: '+8',
        label: 'This week',
      },
      icon: 'activity',
      colorScheme: {
        from: 'from-orange-50',
        to: 'to-yellow-50',
        border: 'border-orange-200',
        text: 'text-orange-700',
        iconGradient: 'from-orange-500 to-yellow-600',
      },
    },
    {
      name: 'Harvest Progress',
      value: 67,
      unit: '%',
      status: 'normal',
      trend: {
        direction: 'up',
        value: '+12%',
        label: 'On schedule',
      },
      icon: 'activity',
      colorScheme: {
        from: 'from-blue-50',
        to: 'to-cyan-50',
        border: 'border-blue-200',
        text: 'text-blue-700',
        iconGradient: 'from-blue-500 to-cyan-600',
      },
    },
    {
      name: 'Quality Grade',
      value: 'A',
      unit: '',
      status: 'good',
      trend: {
        direction: 'stable',
        value: '',
        label: 'Premium',
      },
      icon: 'activity',
      colorScheme: {
        from: 'from-green-50',
        to: 'to-emerald-50',
        border: 'border-green-200',
        text: 'text-green-700',
        iconGradient: 'from-green-500 to-emerald-600',
      },
    },
  ];

  // Aquaculture (Belgium) Monitoring Metrics
  private aquacultureMonitoringMetrics: MetricData[] = [
    {
      name: 'Mortality Rate',
      value: 4.2,
      unit: '%',
      status: 'critical',
      trend: {
        direction: 'up',
        value: '+1.3%',
        label: '+1.3% vs last week',
      },
      icon: 'activity',
      colorScheme: {
        from: 'from-red-50',
        to: 'to-rose-50',
        border: 'border-red-200',
        text: 'text-red-700',
        iconGradient: 'from-red-500 to-rose-600',
      },
    },
    {
      name: 'Feed Efficiency',
      value: 0.92,
      unit: 'FCR',
      status: 'good',
      trend: {
        direction: 'down',
        value: '-5%',
        label: 'Improved',
      },
      icon: 'activity',
      colorScheme: {
        from: 'from-green-50',
        to: 'to-emerald-50',
        border: 'border-green-200',
        text: 'text-green-700',
        iconGradient: 'from-green-500 to-emerald-600',
      },
    },
    {
      name: 'Water pH',
      value: 7.4,
      unit: 'pH',
      status: 'normal',
      trend: {
        direction: 'stable',
        value: '',
        label: 'Optimal',
      },
      icon: 'droplet',
      colorScheme: {
        from: 'from-blue-50',
        to: 'to-cyan-50',
        border: 'border-blue-200',
        text: 'text-blue-700',
        iconGradient: 'from-blue-500 to-cyan-600',
      },
    },
    {
      name: 'Stocking Density',
      value: 18.5,
      unit: 'kg/m³',
      status: 'warning',
      trend: {
        direction: 'up',
        value: '+3.2%',
        label: 'Near capacity',
      },
      icon: 'activity',
      colorScheme: {
        from: 'from-orange-50',
        to: 'to-amber-50',
        border: 'border-orange-200',
        text: 'text-orange-700',
        iconGradient: 'from-orange-500 to-amber-600',
      },
    },
    {
      name: 'Growth Rate',
      value: 2.8,
      unit: 'g/day',
      status: 'good',
      trend: {
        direction: 'up',
        value: '+15%',
        label: 'Above target',
      },
      icon: 'activity',
      colorScheme: {
        from: 'from-green-50',
        to: 'to-teal-50',
        border: 'border-green-200',
        text: 'text-green-700',
        iconGradient: 'from-green-500 to-teal-600',
      },
    },
  ];

  // Dairy Monitoring Metrics
  private dairyMonitoringMetrics: MetricData[] = [
    {
      name: 'Milk Production',
      value: 2450,
      unit: 'L/day',
      status: 'good',
      trend: {
        direction: 'up',
        value: '+8%',
        label: 'Above target',
      },
      icon: 'activity',
      colorScheme: {
        from: 'from-green-50',
        to: 'to-emerald-50',
        border: 'border-green-200',
        text: 'text-green-700',
        iconGradient: 'from-green-500 to-emerald-600',
      },
    },
    {
      name: 'Animal Health',
      value: 96,
      unit: '%',
      status: 'good',
      trend: {
        direction: 'stable',
        value: '',
        label: 'Healthy herd',
      },
      icon: 'activity',
      colorScheme: {
        from: 'from-green-50',
        to: 'to-teal-50',
        border: 'border-green-200',
        text: 'text-green-700',
        iconGradient: 'from-green-500 to-teal-600',
      },
    },
    {
      name: 'Feed Quality',
      value: 'A+',
      unit: '',
      status: 'good',
      trend: {
        direction: 'stable',
        value: '',
        label: 'Premium grade',
      },
      icon: 'activity',
      colorScheme: {
        from: 'from-green-50',
        to: 'to-emerald-50',
        border: 'border-green-200',
        text: 'text-green-700',
        iconGradient: 'from-green-500 to-emerald-600',
      },
    },
    {
      name: 'Temperature',
      value: 22.5,
      unit: '°C',
      status: 'normal',
      trend: {
        direction: 'stable',
        value: '',
        label: 'Optimal',
      },
      icon: 'thermometer',
      colorScheme: {
        from: 'from-blue-50',
        to: 'to-cyan-50',
        border: 'border-blue-200',
        text: 'text-blue-700',
        iconGradient: 'from-blue-500 to-cyan-600',
      },
    },
    {
      name: 'Stress Level',
      value: 12,
      unit: '%',
      status: 'normal',
      trend: {
        direction: 'down',
        value: '-5%',
        label: 'Low stress',
      },
      icon: 'activity',
      colorScheme: {
        from: 'from-blue-50',
        to: 'to-indigo-50',
        border: 'border-blue-200',
        text: 'text-blue-700',
        iconGradient: 'from-blue-500 to-indigo-600',
      },
    },
  ];

  getMetricsBySector(sector: string): MetricData[] {
    const sectorMap: Record<string, MetricData[]> = {
      fish: this.fishMonitoringMetrics,
      aquaculture: this.aquacultureMonitoringMetrics,
      grain: this.grainMonitoringMetrics,
      fruits: this.fruitsMonitoringMetrics,
      dairy: this.dairyMonitoringMetrics,
    };
    return sectorMap[sector] || this.fishMonitoringMetrics;
  }

  getAllMetrics(): Record<string, MetricData[]> {
    return {
      fish: this.fishMonitoringMetrics,
      aquaculture: this.aquacultureMonitoringMetrics,
      grain: this.grainMonitoringMetrics,
      fruits: this.fruitsMonitoringMetrics,
      dairy: this.dairyMonitoringMetrics,
    };
  }
}
