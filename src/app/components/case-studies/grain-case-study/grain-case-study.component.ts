import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { NgxEchartsDirective } from 'ngx-echarts';
import { NavigationService } from '../../../services/navigation.service';
import type { EChartsOption } from 'echarts';

type NodeType = 'farm' | 'logistics' | 'elevator-sea' | 'elevator-field' | 'ship' |
  'foreign' | 'mills' | 'packaging' | 'distribution' | 'retailer' | 'consumer' |
  'feed-mills' | 'livestock';

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
  selector: 'app-grain-case-study',
  standalone: true,
  imports: [CommonModule, TranslateModule, LucideAngularModule, NgxEchartsDirective],
  templateUrl: './grain-case-study.component.html',
  styleUrl: './grain-case-study.component.scss'
})
export class GrainCaseStudyComponent {
  private navigationService = inject(NavigationService);

  hoveredNode: NodeType | null = null;
  selectedNode: NodeType | null = null;
  selectedPath: 'export' | 'domestic' | 'feed' | null = null;
  zoom = 1.0;

  nodes: NodeData[] = [
    {
      id: 'farm',
      icon: 'wheat',
      label: 'Farm',
      gradient: 'from-teal-500 to-teal-700',
      description: 'Grain production from Ukrainian farms',
      position: { x: 40, y: 200 },
      kpis: [
        { name: 'Production Volume', value: '450k tons', trend: 'down' },
        { name: 'Yield Rate', value: '4.2 t/ha', trend: 'stable' },
        { name: 'Quality Score', value: '92%', trend: 'up' }
      ],
      metrics: { throughput: '450,000 tons/year', efficiency: '87%', quality: '92%', cost: '€185/ton' }
    },
    {
      id: 'logistics',
      icon: 'truck',
      label: 'Logistics',
      gradient: 'from-slate-400 to-slate-600',
      description: 'Transportation from farm to elevators',
      position: { x: 220, y: 200 },
      kpis: [
        { name: 'Transport Capacity', value: '425k tons', trend: 'down' },
        { name: 'Delivery Time', value: '2.3 days', trend: 'up' },
        { name: 'Fleet Utilization', value: '78%', trend: 'stable' }
      ],
      metrics: { throughput: '425,000 tons/year', efficiency: '78%', quality: '95%', cost: '€22/ton' }
    },
    {
      id: 'elevator-sea',
      icon: 'building-2',
      label: 'Grain Elevator (Sea)',
      gradient: 'from-teal-500 to-teal-700',
      description: 'Storage near Black Sea ports',
      position: { x: 400, y: 100 },
      kpis: [
        { name: 'Storage Capacity', value: '380k tons', trend: 'stable' },
        { name: 'Utilization', value: '72%', trend: 'down' },
        { name: 'Drying Efficiency', value: '94%', trend: 'stable' }
      ],
      metrics: { throughput: '380,000 tons/year', efficiency: '72%', quality: '94%', cost: '€12/ton storage' }
    },
    {
      id: 'elevator-field',
      icon: 'building-2',
      label: 'Grain Elevator (Field)',
      gradient: 'from-teal-500 to-teal-700',
      description: 'Storage near production areas',
      position: { x: 400, y: 300 },
      kpis: [
        { name: 'Storage Capacity', value: '185k tons', trend: 'stable' },
        { name: 'Utilization', value: '89%', trend: 'up' },
        { name: 'Quality Control', value: '96%', trend: 'stable' }
      ],
      metrics: { throughput: '185,000 tons/year', efficiency: '89%', quality: '96%', cost: '€10/ton storage' }
    },
    {
      id: 'ship',
      icon: 'ship',
      label: 'Shipping',
      gradient: 'from-slate-400 to-slate-600',
      description: 'Maritime transport',
      position: { x: 580, y: 100 },
      kpis: [
        { name: 'Shipping Volume', value: '340k tons', trend: 'down' },
        { name: 'Transit Time', value: '14 days avg', trend: 'up' },
        { name: 'Port Delays', value: '3.5 days', trend: 'up' }
      ],
      metrics: { throughput: '340,000 tons/year', efficiency: '68%', quality: '93%', cost: '€35/ton freight' }
    },
    {
      id: 'foreign',
      icon: 'factory',
      label: 'Foreign Mills',
      gradient: 'from-teal-500 to-emerald-600',
      description: 'International processing',
      position: { x: 760, y: 100 },
      kpis: [
        { name: 'Processing', value: '320k tons', trend: 'down' },
        { name: 'Flour Output', value: '256k tons', trend: 'down' },
        { name: 'Export Demand', value: 'High', trend: 'stable' }
      ],
      metrics: { throughput: '320,000 tons/year', efficiency: '82%', quality: '94%', cost: '€45/ton milling' }
    },
    {
      id: 'mills',
      icon: 'factory',
      label: 'Mills (Flour)',
      gradient: 'from-teal-500 to-emerald-600',
      description: 'Grain processing to flour',
      position: { x: 760, y: 300 },
      kpis: [
        { name: 'Processing Rate', value: '175k tons', trend: 'stable' },
        { name: 'Flour Yield', value: '76%', trend: 'stable' },
        { name: 'Quality Grade', value: 'A', trend: 'up' }
      ],
      metrics: { throughput: '175,000 tons/year', efficiency: '91%', quality: '97%', cost: '€42/ton milling' }
    },
    {
      id: 'feed-mills',
      icon: 'factory',
      label: 'Feed Mills',
      gradient: 'from-slate-400 to-slate-600',
      description: 'Animal feed production',
      position: { x: 940, y: 400 },
      kpis: [
        { name: 'Processing Rate', value: '95k tons', trend: 'stable' },
        { name: 'Mix Quality', value: '94%', trend: 'up' },
        { name: 'Feed Conversion', value: '1.8:1', trend: 'stable' }
      ],
      metrics: { throughput: '95,000 tons/year', efficiency: '91%', quality: '96%', cost: '€38/ton processing' }
    },
    {
      id: 'livestock',
      icon: 'users',
      label: 'Livestock Farms',
      gradient: 'from-slate-500 to-slate-700',
      description: 'Animal agriculture',
      position: { x: 1120, y: 400 },
      kpis: [
        { name: 'Feed Consumption', value: '92k tons', trend: 'stable' },
        { name: 'Animal Growth', value: '+12% avg', trend: 'up' },
        { name: 'Feed Efficiency', value: '2.8:1', trend: 'stable' }
      ],
      metrics: { throughput: '92,000 tons/year', efficiency: '88%', quality: '94%', cost: '€240/ton livestock' }
    },
    {
      id: 'packaging',
      icon: 'package',
      label: 'Packaging',
      gradient: 'from-teal-500 to-teal-700',
      description: 'Consumer packaging',
      position: { x: 940, y: 300 },
      kpis: [
        { name: 'Packaging Speed', value: '850 units/hr', trend: 'stable' },
        { name: 'Material Cost', value: '€0.18/unit', trend: 'up' },
        { name: 'Line Efficiency', value: '89%', trend: 'stable' }
      ],
      metrics: { throughput: '165,000 tons/year', efficiency: '89%', quality: '96%', cost: '€8/ton packaging' }
    },
    {
      id: 'distribution',
      icon: 'truck',
      label: 'Distribution',
      gradient: 'from-slate-400 to-slate-600',
      description: 'Distribution logistics',
      position: { x: 1120, y: 300 },
      kpis: [
        { name: 'Delivery Coverage', value: '450 outlets', trend: 'up' },
        { name: 'On-Time Rate', value: '92%', trend: 'stable' },
        { name: 'Fuel Efficiency', value: '8.2 L/100km', trend: 'down' }
      ],
      metrics: { throughput: '160,000 tons/year', efficiency: '92%', quality: '97%', cost: '€15/ton distribution' }
    },
    {
      id: 'retailer',
      icon: 'building-2',
      label: 'Retailer/Wholesaler',
      gradient: 'from-teal-500 to-emerald-600',
      description: 'Retail distribution',
      position: { x: 1300, y: 300 },
      kpis: [
        { name: 'Sales Volume', value: '155k tons', trend: 'stable' },
        { name: 'Shelf Turnover', value: '12x/year', trend: 'up' },
        { name: 'Stock Accuracy', value: '96%', trend: 'stable' }
      ],
      metrics: { throughput: '155,000 tons/year', efficiency: '94%', quality: '95%', cost: '€8/ton handling' }
    },
    {
      id: 'consumer',
      icon: 'users',
      label: 'End Consumer',
      gradient: 'from-slate-500 to-slate-700',
      description: 'Consumer market',
      position: { x: 1480, y: 300 },
      kpis: [
        { name: 'Consumption', value: '150k tons', trend: 'stable' },
        { name: 'Price Index', value: '€2.45/kg', trend: 'up' },
        { name: 'Satisfaction', value: '87%', trend: 'stable' }
      ],
      metrics: { throughput: '150,000 tons/year', efficiency: '97%', quality: '93%', cost: '€2.45/kg avg' }
    },
  ];

  connections: Connection[] = [
    { from: 'farm', to: 'logistics' },
    { from: 'logistics', to: 'elevator-sea' },
    { from: 'logistics', to: 'elevator-field' },
    { from: 'elevator-sea', to: 'ship' },
    { from: 'ship', to: 'foreign' },
    { from: 'ship', to: 'mills' },
    { from: 'elevator-field', to: 'mills' },
    { from: 'foreign', to: 'mills' },
    { from: 'mills', to: 'packaging' },
    { from: 'packaging', to: 'distribution' },
    { from: 'distribution', to: 'retailer' },
    { from: 'retailer', to: 'consumer' },
    { from: 'mills', to: 'feed-mills' },
    { from: 'feed-mills', to: 'livestock' },
  ];

  paths: Record<string, NodeType[]> = {
    export: ['farm', 'logistics', 'elevator-sea', 'ship', 'foreign'],
    domestic: ['farm', 'logistics', 'elevator-field', 'mills', 'packaging', 'distribution', 'retailer', 'consumer'],
    feed: ['farm', 'logistics', 'elevator-field', 'mills', 'feed-mills', 'livestock'],
  };

  moistureChartOption: EChartsOption = {
    grid: { left: 40, right: 10, top: 10, bottom: 25 },
    xAxis: { type: 'category', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], axisLabel: { fontSize: 10, color: '#6b7280' }, axisLine: { lineStyle: { color: '#d1d5db' } } },
    yAxis: { type: 'value', min: 10, max: 14, axisLabel: { fontSize: 10, color: '#6b7280', formatter: '{value}%' }, axisLine: { lineStyle: { color: '#d1d5db' } }, splitLine: { lineStyle: { type: 'dashed', color: '#e5e7eb' } } },
    series: [{ data: [11.5, 11.8, 12.2, 12.5, 12.8, 13.2, 12.9, 12.3, 11.8, 11.5, 12.0, 12.3], type: 'line', smooth: true, lineStyle: { color: '#3b82f6', width: 2 }, itemStyle: { color: '#3b82f6' }, showSymbol: false }],
    tooltip: { trigger: 'axis', backgroundColor: '#1f2937', borderColor: '#1f2937', textStyle: { color: '#fff', fontSize: 12 } }
  };

  temperatureChartOption: EChartsOption = {
    grid: { left: 40, right: 10, top: 10, bottom: 25 },
    xAxis: { type: 'category', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], axisLabel: { fontSize: 10, color: '#6b7280' }, axisLine: { lineStyle: { color: '#d1d5db' } } },
    yAxis: { type: 'value', min: 15, max: 25, axisLabel: { fontSize: 10, color: '#6b7280', formatter: '{value}°C' }, axisLine: { lineStyle: { color: '#d1d5db' } }, splitLine: { lineStyle: { type: 'dashed', color: '#e5e7eb' } } },
    series: [{ data: [16.5, 17.2, 18.0, 19.5, 21.0, 22.5, 23.8, 22.0, 20.5, 19.0, 17.5, 16.8], type: 'line', smooth: true, lineStyle: { color: '#f97316', width: 2 }, itemStyle: { color: '#f97316' }, showSymbol: false }],
    tooltip: { trigger: 'axis', backgroundColor: '#1f2937', borderColor: '#1f2937', textStyle: { color: '#fff', fontSize: 12 } }
  };

  disruptionChartOption: EChartsOption = {
    grid: { left: 40, right: 10, top: 10, bottom: 25 },
    xAxis: { type: 'category', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], axisLabel: { fontSize: 10, color: '#6b7280' }, axisLine: { lineStyle: { color: '#d1d5db' } } },
    yAxis: { type: 'value', min: 60, max: 90, axisLabel: { fontSize: 10, color: '#6b7280' }, axisLine: { lineStyle: { color: '#d1d5db' } }, splitLine: { lineStyle: { type: 'dashed', color: '#e5e7eb' } } },
    series: [{ data: [85, 82, 78, 75, 72, 70, 68, 65, 64, 66, 67, 68], type: 'line', smooth: true, lineStyle: { color: '#ef4444', width: 2 }, itemStyle: { color: '#ef4444' }, showSymbol: false }],
    tooltip: { trigger: 'axis', backgroundColor: '#1f2937', borderColor: '#1f2937', textStyle: { color: '#fff', fontSize: 12 } }
  };

  onBackToUseCases(): void {
    this.navigationService.goToHome();
  }

  getNodeById(id: NodeType): NodeData | undefined {
    return this.nodes.find(n => n.id === id);
  }

  isNodeHighlighted(nodeId: NodeType): boolean {
    if (!this.selectedPath) return false;
    return this.paths[this.selectedPath].includes(nodeId);
  }

  isConnectionHighlighted(from: NodeType, to: NodeType): boolean {
    if (!this.selectedPath) return false;
    const path = this.paths[this.selectedPath];
    const fromIndex = path.indexOf(from);
    const toIndex = path.indexOf(to);
    return fromIndex !== -1 && toIndex !== -1 && Math.abs(fromIndex - toIndex) === 1;
  }

  selectPath(path: 'export' | 'domestic' | 'feed'): void {
    this.selectedPath = this.selectedPath === path ? null : path;
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
    const fromCenterX = fromNode.position.x + nodeWidth / 2;
    const fromCenterY = fromNode.position.y + nodeHeight / 2;
    const toCenterX = toNode.position.x + nodeWidth / 2;
    const toCenterY = toNode.position.y + nodeHeight / 2;
    let x1: number, y1: number, x2: number, y2: number;
    if (conn.from === 'foreign' && conn.to === 'mills') {
      x1 = fromCenterX; y1 = fromNode.position.y + nodeHeight; x2 = toCenterX; y2 = toNode.position.y;
      return `M ${x1} ${y1} L ${x2} ${y2}`;
    }
    x1 = fromNode.position.x + nodeWidth; y1 = fromCenterY; x2 = toNode.position.x; y2 = toCenterY;
    const dx = x2 - x1, dy = y2 - y1;
    if (conn.from === 'logistics' && (conn.to === 'elevator-sea' || conn.to === 'elevator-field')) {
      const radius = 25;
      if (dy > 0) return `M ${x1} ${y1} L ${x1 + dx * 0.3} ${y1} Q ${x1 + dx * 0.3 + radius} ${y1}, ${x1 + dx * 0.3 + radius} ${y1 + radius} L ${x1 + dx * 0.3 + radius} ${y2 - radius} Q ${x1 + dx * 0.3 + radius} ${y2}, ${x1 + dx * 0.3 + radius * 2} ${y2} L ${x2} ${y2}`;
      return `M ${x1} ${y1} L ${x1 + dx * 0.3} ${y1} Q ${x1 + dx * 0.3 + radius} ${y1}, ${x1 + dx * 0.3 + radius} ${y1 - radius} L ${x1 + dx * 0.3 + radius} ${y2 + radius} Q ${x1 + dx * 0.3 + radius} ${y2}, ${x1 + dx * 0.3 + radius * 2} ${y2} L ${x2} ${y2}`;
    }
    if (conn.from === 'elevator-field' && conn.to === 'mills') {
      const midX = (x1 + x2) / 2, midY = y1 - 30;
      return `M ${x1} ${y1} Q ${midX} ${midY}, ${x2} ${y2}`;
    }
    const cx1 = x1 + dx * 0.5, cy1 = y1, cx2 = x1 + dx * 0.5, cy2 = y2;
    return `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;
  }

  getConnectionOpacity(conn: Connection): number {
    const highlighted = this.isConnectionHighlighted(conn.from, conn.to);
    if (highlighted) return 0.9;
    if (this.selectedPath) return 0.2;
    return 0.5;
  }

  getConnectionStrokeWidth(conn: Connection): number {
    return this.isConnectionHighlighted(conn.from, conn.to) ? 3 : 2;
  }

  getNodeOpacity(nodeId: NodeType): number {
    if (!this.selectedPath) return 1;
    return this.isNodeHighlighted(nodeId) ? 1 : 0.4;
  }

  getZoomPercent(): number {
    return Math.round(this.zoom * 100);
  }
}
