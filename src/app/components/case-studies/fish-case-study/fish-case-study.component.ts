import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { NgxEchartsDirective } from 'ngx-echarts';
import { NavigationService } from '../../../services/navigation.service';
import type { EChartsOption } from 'echarts';

type NodeType = 'fingerlings' | 'transport1' | 'aquaculture' | 'primary-processing' |
  'transport2' | 'retail' | 'consumers1' | 'secondary-processing' | 'bigh' |
  'restaurant' | 'consumers2';

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
  selector: 'app-fish-case-study',
  standalone: true,
  imports: [CommonModule, TranslateModule, LucideAngularModule, NgxEchartsDirective],
  templateUrl: './fish-case-study.component.html',
  styleUrl: './fish-case-study.component.scss'
})
export class FishCaseStudyComponent {
  private navigationService = inject(NavigationService);

  hoveredNode: NodeType | null = null;
  selectedNode: NodeType | null = null;
  selectedPath: 'export' | 'domestic' | null = null;
  zoom = 1.0;

  nodes: NodeData[] = [
    {
      id: 'fingerlings',
      icon: 'fish',
      label: 'France Fingerlings',
      gradient: 'from-teal-500 to-teal-700',
      description: 'Juvenile fish imported from France for farming',
      position: { x: 50, y: 200 },
      kpis: [
        { name: 'Supply Volume', value: '2.5M units', trend: 'stable' },
        { name: 'Survival Rate', value: '94%', trend: 'up' },
        { name: 'Import Cost', value: '€0.85/unit', trend: 'up' }
      ],
      metrics: { throughput: '2.5M units/year', efficiency: '94%', quality: '96%', cost: '€0.85/unit' }
    },
    {
      id: 'transport1',
      icon: 'truck',
      label: 'Transport',
      gradient: 'from-slate-400 to-slate-600',
      description: 'Transportation of fingerlings to farms',
      position: { x: 220, y: 200 },
      kpis: [
        { name: 'Transit Time', value: '6 hours', trend: 'stable' },
        { name: 'Survival Rate', value: '98%', trend: 'up' },
        { name: 'Cost per Unit', value: '€0.12', trend: 'stable' }
      ],
      metrics: { throughput: '2.45M units/year', efficiency: '98%', quality: '97%', cost: '€0.12/unit' }
    },
    {
      id: 'aquaculture',
      icon: 'waves',
      label: 'Aquaculture Farming',
      gradient: 'from-teal-500 to-teal-700',
      description: 'Fish farming operations',
      position: { x: 390, y: 200 },
      kpis: [
        { name: 'Production', value: '850 tons', trend: 'up' },
        { name: 'Water Quality', value: '7.8 pH', trend: 'stable' },
        { name: 'Feed Conversion', value: '1.2:1', trend: 'up' }
      ],
      metrics: { throughput: '850 tons/year', efficiency: '89%', quality: '94%', cost: '€4.20/kg' }
    },
    {
      id: 'primary-processing',
      icon: 'factory',
      label: 'Primary Processing',
      gradient: 'from-teal-500 to-emerald-600',
      description: 'Whole gutted and filleted fish processing',
      position: { x: 580, y: 200 },
      kpis: [
        { name: 'Processing Rate', value: '450 kg/hr', trend: 'stable' },
        { name: 'Yield Rate', value: '68%', trend: 'up' },
        { name: 'Quality Score', value: '96%', trend: 'stable' }
      ],
      metrics: { throughput: '578 tons/year', efficiency: '85%', quality: '96%', cost: '€1.80/kg' }
    },
    {
      id: 'transport2',
      icon: 'truck',
      label: 'Transport',
      gradient: 'from-slate-400 to-slate-600',
      description: 'Distribution to retail',
      position: { x: 770, y: 200 },
      kpis: [
        { name: 'Delivery Time', value: '4 hours', trend: 'stable' },
        { name: 'Temperature', value: '2-4°C', trend: 'stable' },
        { name: 'On-Time Rate', value: '94%', trend: 'up' }
      ],
      metrics: { throughput: '400 tons/year', efficiency: '94%', quality: '95%', cost: '€0.45/kg' }
    },
    {
      id: 'retail',
      icon: 'store',
      label: 'Retail',
      gradient: 'from-teal-500 to-emerald-600',
      description: 'Retail stores and markets',
      position: { x: 960, y: 200 },
      kpis: [
        { name: 'Sales Volume', value: '385 tons', trend: 'stable' },
        { name: 'Freshness Score', value: '93%', trend: 'up' },
        { name: 'Waste Rate', value: '3.8%', trend: 'down' }
      ],
      metrics: { throughput: '385 tons/year', efficiency: '96%', quality: '93%', cost: '€12.50/kg retail' }
    },
    {
      id: 'consumers1',
      icon: 'users',
      label: 'Consumers',
      gradient: 'from-slate-500 to-slate-700',
      description: 'End consumers',
      position: { x: 1150, y: 200 },
      kpis: [
        { name: 'Consumption', value: '380 tons', trend: 'stable' },
        { name: 'Satisfaction', value: '88%', trend: 'up' },
        { name: 'Repeat Purchase', value: '72%', trend: 'up' }
      ],
      metrics: { throughput: '380 tons/year', efficiency: '99%', quality: '91%', cost: '€12.50/kg avg' }
    },
    {
      id: 'secondary-processing',
      icon: 'factory',
      label: 'Secondary Processing',
      gradient: 'from-teal-500 to-emerald-600',
      description: 'Smoked fillets production',
      position: { x: 580, y: 60 },
      kpis: [
        { name: 'Processing Rate', value: '85 kg/hr', trend: 'stable' },
        { name: 'Quality Score', value: '97%', trend: 'up' },
        { name: 'Smoke Time', value: '6 hours', trend: 'stable' }
      ],
      metrics: { throughput: '178 tons/year', efficiency: '88%', quality: '97%', cost: '€3.20/kg' }
    },
    {
      id: 'bigh',
      icon: 'building-2',
      label: 'BIGH',
      gradient: 'from-teal-500 to-teal-700',
      description: 'BIGH distribution hub',
      position: { x: 770, y: 60 },
      kpis: [
        { name: 'Distribution Vol', value: '172 tons', trend: 'stable' },
        { name: 'Hub Efficiency', value: '97%', trend: 'up' },
        { name: 'Delivery Speed', value: '2 hours', trend: 'up' }
      ],
      metrics: { throughput: '172 tons/year', efficiency: '97%', quality: '96%', cost: '€0.65/kg' }
    },
    {
      id: 'restaurant',
      icon: 'store',
      label: 'Restaurant',
      gradient: 'from-teal-500 to-emerald-600',
      description: 'Food service establishments',
      position: { x: 960, y: 60 },
      kpis: [
        { name: 'Orders Volume', value: '168 tons', trend: 'up' },
        { name: 'Quality Rating', value: '4.6/5', trend: 'up' },
        { name: 'Menu Presence', value: '145 items', trend: 'stable' }
      ],
      metrics: { throughput: '168 tons/year', efficiency: '98%', quality: '95%', cost: '€18.50/kg' }
    },
    {
      id: 'consumers2',
      icon: 'users',
      label: 'Consumers',
      gradient: 'from-slate-500 to-slate-700',
      description: 'Restaurant diners',
      position: { x: 1150, y: 60 },
      kpis: [
        { name: 'Diners Served', value: '165 tons', trend: 'up' },
        { name: 'Satisfaction', value: '92%', trend: 'up' },
        { name: 'Return Rate', value: '68%', trend: 'stable' }
      ],
      metrics: { throughput: '165 tons/year', efficiency: '98%', quality: '93%', cost: '€25/portion avg' }
    },
  ];

  connections: Connection[] = [
    { from: 'fingerlings', to: 'transport1' },
    { from: 'transport1', to: 'aquaculture' },
    { from: 'aquaculture', to: 'primary-processing' },
    { from: 'primary-processing', to: 'transport2' },
    { from: 'transport2', to: 'retail' },
    { from: 'retail', to: 'consumers1' },
    { from: 'aquaculture', to: 'secondary-processing' },
    { from: 'secondary-processing', to: 'bigh' },
    { from: 'bigh', to: 'restaurant' },
    { from: 'restaurant', to: 'consumers2' },
  ];

  paths: Record<string, NodeType[]> = {
    export: ['fingerlings', 'transport1', 'aquaculture', 'secondary-processing', 'bigh', 'restaurant', 'consumers2'],
    domestic: ['fingerlings', 'transport1', 'aquaculture', 'primary-processing', 'transport2', 'retail', 'consumers1'],
  };

  waterTempChartOption: EChartsOption = {
    grid: { left: 40, right: 10, top: 10, bottom: 25 },
    xAxis: { type: 'category', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], axisLabel: { fontSize: 10, color: '#6b7280' }, axisLine: { lineStyle: { color: '#d1d5db' } } },
    yAxis: { type: 'value', min: 10, max: 20, axisLabel: { fontSize: 10, color: '#6b7280', formatter: '{value}°C' }, axisLine: { lineStyle: { color: '#d1d5db' } }, splitLine: { lineStyle: { type: 'dashed', color: '#e5e7eb' } } },
    series: [{ data: [14.2, 14.8, 15.5, 16.2, 17.0, 17.8, 18.2, 18.0, 17.2, 16.5, 15.8, 14.5], type: 'line', smooth: true, lineStyle: { color: '#3b82f6', width: 2 }, itemStyle: { color: '#3b82f6' }, showSymbol: false }],
    tooltip: { trigger: 'axis', backgroundColor: '#1f2937', borderColor: '#1f2937', textStyle: { color: '#fff', fontSize: 12 } }
  };

  oxygenChartOption: EChartsOption = {
    grid: { left: 40, right: 10, top: 10, bottom: 25 },
    xAxis: { type: 'category', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], axisLabel: { fontSize: 10, color: '#6b7280' }, axisLine: { lineStyle: { color: '#d1d5db' } } },
    yAxis: { type: 'value', min: 6, max: 9, axisLabel: { fontSize: 10, color: '#6b7280', formatter: '{value} mg/L' }, axisLine: { lineStyle: { color: '#d1d5db' } }, splitLine: { lineStyle: { type: 'dashed', color: '#e5e7eb' } } },
    series: [{ data: [7.2, 7.4, 7.6, 7.8, 8.1, 7.9, 7.7, 7.5, 7.8, 8.0, 8.2, 8.3], type: 'line', smooth: true, lineStyle: { color: '#14b8a6', width: 2 }, itemStyle: { color: '#14b8a6' }, showSymbol: false }],
    tooltip: { trigger: 'axis', backgroundColor: '#1f2937', borderColor: '#1f2937', textStyle: { color: '#fff', fontSize: 12 } }
  };

  harvestChartOption: EChartsOption = {
    grid: { left: 40, right: 10, top: 10, bottom: 25 },
    xAxis: { type: 'category', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], axisLabel: { fontSize: 10, color: '#6b7280' }, axisLine: { lineStyle: { color: '#d1d5db' } } },
    yAxis: { type: 'value', min: 100, max: 200, axisLabel: { fontSize: 10, color: '#6b7280', formatter: '{value}t' }, axisLine: { lineStyle: { color: '#d1d5db' } }, splitLine: { lineStyle: { type: 'dashed', color: '#e5e7eb' } } },
    series: [{ data: [120, 125, 135, 145, 155, 165, 175, 180, 185, 182, 178, 170], type: 'line', smooth: true, lineStyle: { color: '#10b981', width: 2 }, itemStyle: { color: '#10b981' }, showSymbol: false }],
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

  selectPath(path: 'export' | 'domestic'): void {
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

    const x1 = fromNode.position.x + nodeWidth;
    const y1 = fromCenterY;
    const x2 = toNode.position.x;
    const y2 = toCenterY;

    const dx = x2 - x1;
    const dy = y2 - y1;

    // Special handling for vertical branching from aquaculture
    if (conn.from === 'aquaculture' && conn.to === 'secondary-processing') {
      const startX = fromNode.position.x + nodeWidth;
      const startY = fromCenterY;
      const endX = toNode.position.x;
      const endY = toCenterY;
      const cx1 = startX + (endX - startX) * 0.5;
      const cy1 = startY;
      const cx2 = startX + (endX - startX) * 0.5;
      const cy2 = endY;
      return `M ${startX} ${startY} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${endX} ${endY}`;
    }

    const cx1 = x1 + dx * 0.5;
    const cy1 = y1;
    const cx2 = x1 + dx * 0.5;
    const cy2 = y2;
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
