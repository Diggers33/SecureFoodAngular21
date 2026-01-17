import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { NgxEchartsDirective } from 'ngx-echarts';
import { NavigationService } from '../../../services/navigation.service';
import type { EChartsOption } from 'echarts';

type NodeType = 'farm' | 'bulk-transport' | 'processing' | 'packaging' |
  'wholesale' | 'logistics' | 'retailer' | 'consumers';

interface NodeData {
  id: NodeType;
  icon: string;
  label: string;
  gradient: string;
  description: string;
  position: { x: number; y: number };
  kpis: {
    name: string;
    value: string;
    trend?: 'up' | 'down' | 'stable';
  }[];
  metrics?: {
    throughput: string;
    efficiency: string;
    quality: string;
    cost: string;
  };
}

interface Connection {
  from: NodeType;
  to: NodeType;
}

@Component({
  selector: 'app-fruits-case-study',
  standalone: true,
  imports: [CommonModule, TranslateModule, LucideAngularModule, NgxEchartsDirective],
  templateUrl: './fruits-case-study.component.html',
  styleUrl: './fruits-case-study.component.scss'
})
export class FruitsCaseStudyComponent {
  private navigationService = inject(NavigationService);

  hoveredNode: NodeType | null = null;
  selectedNode: NodeType | null = null;
  zoom = 1.0;

  nodes: NodeData[] = [
    {
      id: 'farm',
      icon: 'apple',
      label: 'Farm',
      gradient: 'from-teal-600 to-teal-800',
      description: 'Fresh produce from Portuguese farms',
      position: { x: 50, y: 180 },
      kpis: [
        { name: 'Production Volume', value: '45k tons', trend: 'stable' },
        { name: 'Crop Yield', value: '18 t/ha', trend: 'up' },
        { name: 'Quality Grade', value: 'A+', trend: 'stable' }
      ],
      metrics: { throughput: '45,000 tons/year', efficiency: '92%', quality: '96%', cost: '€0.85/kg' }
    },
    {
      id: 'bulk-transport',
      icon: 'truck',
      label: 'Bulk Transport',
      gradient: 'from-teal-400 to-teal-600',
      description: 'Transportation from farms to processing',
      position: { x: 200, y: 180 },
      kpis: [
        { name: 'Transit Time', value: '3.2 hours', trend: 'down' },
        { name: 'Capacity Util', value: '88%', trend: 'up' },
        { name: 'On-Time Rate', value: '94%', trend: 'stable' }
      ],
      metrics: { throughput: '43,200 tons/year', efficiency: '88%', quality: '95%', cost: '€0.12/kg' }
    },
    {
      id: 'processing',
      icon: 'package',
      label: 'Processing',
      gradient: 'from-slate-400 to-slate-600',
      description: 'Washing, sorting, and quality control',
      position: { x: 350, y: 180 },
      kpis: [
        { name: 'Processing Rate', value: '280 kg/min', trend: 'up' },
        { name: 'Quality Pass', value: '97%', trend: 'up' },
        { name: 'Waste Rate', value: '4.2%', trend: 'down' }
      ],
      metrics: { throughput: '41,400 tons/year', efficiency: '95%', quality: '97%', cost: '€0.18/kg' }
    },
    {
      id: 'packaging',
      icon: 'factory',
      label: 'Packaging',
      gradient: 'from-teal-500 to-emerald-600',
      description: 'Consumer-ready packaging',
      position: { x: 500, y: 180 },
      kpis: [
        { name: 'Pack Speed', value: '650 units/hr', trend: 'stable' },
        { name: 'Material Cost', value: '€0.15/unit', trend: 'up' },
        { name: 'Line Efficiency', value: '91%', trend: 'stable' }
      ],
      metrics: { throughput: '39,700 tons/year', efficiency: '91%', quality: '98%', cost: '€0.22/kg' }
    },
    {
      id: 'wholesale',
      icon: 'warehouse',
      label: 'Wholesale',
      gradient: 'from-slate-400 to-slate-600',
      description: 'Wholesale distribution centers',
      position: { x: 650, y: 180 },
      kpis: [
        { name: 'Storage Volume', value: '38k tons', trend: 'stable' },
        { name: 'Turnover Rate', value: '8.5x/year', trend: 'up' },
        { name: 'Temp Control', value: '3.1°C avg', trend: 'stable' }
      ],
      metrics: { throughput: '38,000 tons/year', efficiency: '89%', quality: '96%', cost: '€0.08/kg storage' }
    },
    {
      id: 'logistics',
      icon: 'truck',
      label: 'Logistics',
      gradient: 'from-teal-400 to-teal-600',
      description: 'Cold chain distribution',
      position: { x: 800, y: 180 },
      kpis: [
        { name: 'Delivery Time', value: '8.4 hours', trend: 'down' },
        { name: 'Cold Chain', value: '99.2%', trend: 'up' },
        { name: 'Fuel Efficiency', value: '7.8 L/100km', trend: 'down' }
      ],
      metrics: { throughput: '36,500 tons/year', efficiency: '93%', quality: '97%', cost: '€0.16/kg' }
    },
    {
      id: 'retailer',
      icon: 'store',
      label: 'Retailer',
      gradient: 'from-teal-500 to-emerald-600',
      description: 'Supermarkets and retail stores',
      position: { x: 950, y: 180 },
      kpis: [
        { name: 'Sales Volume', value: '35k tons', trend: 'stable' },
        { name: 'Shelf Life', value: '6.8 days avg', trend: 'up' },
        { name: 'Waste Rate', value: '3.9%', trend: 'down' }
      ],
      metrics: { throughput: '35,000 tons/year', efficiency: '95%', quality: '94%', cost: '€2.85/kg retail' }
    },
    {
      id: 'consumers',
      icon: 'users',
      label: 'Consumers',
      gradient: 'from-slate-500 to-slate-700',
      description: 'End consumers',
      position: { x: 1100, y: 180 },
      kpis: [
        { name: 'Consumption', value: '34k tons', trend: 'stable' },
        { name: 'Satisfaction', value: '89%', trend: 'up' },
        { name: 'Price Index', value: '€2.85/kg', trend: 'up' }
      ],
      metrics: { throughput: '34,000 tons/year', efficiency: '97%', quality: '93%', cost: '€2.85/kg avg' }
    },
  ];

  connections: Connection[] = [
    { from: 'farm', to: 'bulk-transport' },
    { from: 'bulk-transport', to: 'processing' },
    { from: 'processing', to: 'packaging' },
    { from: 'packaging', to: 'wholesale' },
    { from: 'wholesale', to: 'logistics' },
    { from: 'logistics', to: 'retailer' },
    { from: 'retailer', to: 'consumers' },
  ];

  tempChartOption: EChartsOption = {
    grid: { left: 40, right: 10, top: 10, bottom: 25 },
    xAxis: { type: 'category', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], axisLabel: { fontSize: 10, color: '#6b7280' }, axisLine: { lineStyle: { color: '#d1d5db' } } },
    yAxis: { type: 'value', min: 2, max: 5, axisLabel: { fontSize: 10, color: '#6b7280', formatter: '{value}°C' }, axisLine: { lineStyle: { color: '#d1d5db' } }, splitLine: { lineStyle: { type: 'dashed', color: '#e5e7eb' } } },
    series: [{ data: [2.8, 2.9, 3.2, 3.5, 3.8, 4.2, 4.5, 4.3, 3.8, 3.4, 3.0, 2.9], type: 'line', smooth: true, lineStyle: { color: '#3b82f6', width: 2 }, itemStyle: { color: '#3b82f6' }, showSymbol: false }],
    tooltip: { trigger: 'axis', backgroundColor: '#1f2937', borderColor: '#1f2937', textStyle: { color: '#fff', fontSize: 12 } }
  };

  logisticsChartOption: EChartsOption = {
    grid: { left: 40, right: 10, top: 10, bottom: 25 },
    xAxis: { type: 'category', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], axisLabel: { fontSize: 10, color: '#6b7280' }, axisLine: { lineStyle: { color: '#d1d5db' } } },
    yAxis: { type: 'value', min: 10, max: 13, axisLabel: { fontSize: 10, color: '#6b7280', formatter: '{value}h' }, axisLine: { lineStyle: { color: '#d1d5db' } }, splitLine: { lineStyle: { type: 'dashed', color: '#e5e7eb' } } },
    series: [{ data: [12.5, 11.8, 11.2, 10.5, 10.8, 11.5, 12.2, 11.9, 11.4, 10.9, 11.1, 11.4], type: 'line', smooth: true, lineStyle: { color: '#f97316', width: 2 }, itemStyle: { color: '#f97316' }, showSymbol: false }],
    tooltip: { trigger: 'axis', backgroundColor: '#1f2937', borderColor: '#1f2937', textStyle: { color: '#fff', fontSize: 12 } }
  };

  wasteChartOption: EChartsOption = {
    grid: { left: 40, right: 10, top: 10, bottom: 25 },
    xAxis: { type: 'category', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], axisLabel: { fontSize: 10, color: '#6b7280' }, axisLine: { lineStyle: { color: '#d1d5db' } } },
    yAxis: { type: 'value', min: 4, max: 9, axisLabel: { fontSize: 10, color: '#6b7280', formatter: '{value}%' }, axisLine: { lineStyle: { color: '#d1d5db' } }, splitLine: { lineStyle: { type: 'dashed', color: '#e5e7eb' } } },
    series: [{ data: [8.2, 7.8, 7.5, 7.0, 6.8, 6.2, 5.8, 5.5, 5.3, 5.1, 5.0, 5.2], type: 'line', smooth: true, lineStyle: { color: '#10b981', width: 2 }, itemStyle: { color: '#10b981' }, showSymbol: false }],
    tooltip: { trigger: 'axis', backgroundColor: '#1f2937', borderColor: '#1f2937', textStyle: { color: '#fff', fontSize: 12 } }
  };

  onBackToUseCases(): void {
    this.navigationService.goToHome();
  }

  getNodeById(id: NodeType): NodeData | undefined {
    return this.nodes.find(n => n.id === id);
  }

  isConnectionHighlighted(from: NodeType, to: NodeType): boolean {
    return this.selectedNode === from || this.selectedNode === to;
  }

  onNodeHover(nodeId: NodeType | null): void {
    this.hoveredNode = nodeId;
  }

  onNodeClick(nodeId: NodeType): void {
    this.selectedNode = this.selectedNode === nodeId ? null : nodeId;
  }

  closeNodeDetail(event: Event): void {
    event.stopPropagation();
    this.selectedNode = null;
  }

  zoomIn(): void {
    this.zoom = Math.min(this.zoom + 0.1, 1.5);
  }

  zoomOut(): void {
    this.zoom = Math.max(this.zoom - 0.1, 0.5);
  }

  resetZoom(): void {
    this.zoom = 1.0;
  }

  getConnectionPath(conn: Connection): string {
    const fromNode = this.getNodeById(conn.from);
    const toNode = this.getNodeById(conn.to);
    if (!fromNode || !toNode) return '';
    const nodeWidth = 48, nodeHeight = 48;
    const fromCenterY = fromNode.position.y + nodeHeight / 2;
    const toCenterY = toNode.position.y + nodeHeight / 2;

    const x1 = fromNode.position.x + nodeWidth;
    const y1 = fromCenterY;
    const x2 = toNode.position.x;
    const y2 = toCenterY;

    const dx = x2 - x1;
    const cx1 = x1 + dx * 0.5;
    const cy1 = y1;
    const cx2 = x1 + dx * 0.5;
    const cy2 = y2;
    return `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;
  }

  getConnectionOpacity(conn: Connection): number {
    const highlighted = this.isConnectionHighlighted(conn.from, conn.to);
    if (highlighted) return 0.9;
    if (this.selectedNode) return 0.2;
    return 0.5;
  }

  getConnectionStrokeWidth(conn: Connection): number {
    return this.isConnectionHighlighted(conn.from, conn.to) ? 3 : 2;
  }

  getZoomPercent(): number {
    return Math.round(this.zoom * 100);
  }
}
