import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule } from 'lucide-angular';
import { NavigationService } from '../../../services/navigation.service';
import { Sector, sectorDisplayNames } from '../../../models/routing.model';

interface FileItem {
  id: string;
  name: string;
  date: string;
  size: string;
  type: 'Excel' | 'CSV';
}

interface StatCard {
  title: string;
  value: string | number;
  icon: string;
  iconGradient: string;
  bgGradient: string;
  textColor: string;
  filter: 'all' | 'excel' | 'csv' | null;
}

interface Template {
  id: string;
  name: string;
  format: 'Excel' | 'CSV';
  extension: string;
  filename: string;
  iconGradient: string;
  badgeBg: string;
  badgeColor: string;
  buttonGradient: string;
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, TranslateModule, LucideAngularModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private navigationService = inject(NavigationService);

  sector: Sector = 'grain';
  activeTab = 'files';
  activeFilter: 'all' | 'excel' | 'csv' = 'all';
  sectorDisplayNames = sectorDisplayNames;

  files: FileItem[] = [
    {
      id: '1',
      name: 'use-case-values-building.xlsx',
      date: '07/07/2025 05:07:16 PM',
      size: '2.4 MB',
      type: 'Excel',
    },
    {
      id: '2',
      name: 'BIORAD-YAG-WP3 Sample data structure (1).xlsx',
      date: '07/22/2025 03:09:43 PM',
      size: '5.1 MB',
      type: 'Excel',
    },
    {
      id: '3',
      name: 'use-cases-template (2).csv',
      date: '09/19/2025 01:24:08 PM',
      size: '0.8 MB',
      type: 'CSV',
    },
    {
      id: '4',
      name: 'use-cases-template (2)v1.csv',
      date: '09/19/2025 01:26:52 PM',
      size: '0.9 MB',
      type: 'CSV',
    },
    {
      id: '5',
      name: 'use-cases-template (2).csv',
      date: '09/19/2025 01:28:33 PM',
      size: '0.8 MB',
      type: 'CSV',
    },
    {
      id: '6',
      name: 'use-cases-template (3).csv',
      date: '09/24/2025 11:38:18 AM',
      size: '1.2 MB',
      type: 'CSV',
    },
  ];

  templates: Template[] = [
    {
      id: '1',
      name: 'Use Case Values Template',
      format: 'Excel',
      extension: '.xlsx',
      filename: 'use-case-values-template.xlsx',
      iconGradient: 'gradient-green',
      badgeBg: '#dcfce7',
      badgeColor: '#15803d',
      buttonGradient: 'gradient-teal',
    },
    {
      id: '2',
      name: 'Data Structure Template',
      format: 'CSV',
      extension: '.csv',
      filename: 'data-structure-template.csv',
      iconGradient: 'gradient-blue',
      badgeBg: '#dbeafe',
      badgeColor: '#1d4ed8',
      buttonGradient: 'gradient-blue',
    },
    {
      id: '3',
      name: 'Supply Chain Analysis Template',
      format: 'Excel',
      extension: '.xlsx',
      filename: 'supply-chain-template.xlsx',
      iconGradient: 'gradient-purple',
      badgeBg: '#f3e8ff',
      badgeColor: '#7e22ce',
      buttonGradient: 'gradient-purple',
    },
  ];

  tabs = [
    { key: 'Files', value: 'files', icon: 'file-text' },
    { key: 'Download template', value: 'download-template', icon: 'download' }
  ];

  ngOnInit(): void {
    const routeSector = this.route.snapshot.data['sector'] as Sector;
    this.sector = routeSector || this.navigationService.currentSector || 'grain';
  }

  get sectorTitle(): string {
    return this.sectorDisplayNames[this.sector].split(' (')[0];
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
      default: return 'gradient-teal';
    }
  }

  get totalFiles(): number {
    return this.files.length;
  }

  get excelFiles(): number {
    return this.files.filter(f => f.type === 'Excel').length;
  }

  get csvFiles(): number {
    return this.files.filter(f => f.type === 'CSV').length;
  }

  get filteredFiles(): FileItem[] {
    switch (this.activeFilter) {
      case 'excel':
        return this.files.filter(f => f.type === 'Excel');
      case 'csv':
        return this.files.filter(f => f.type === 'CSV');
      default:
        return this.files;
    }
  }

  get statsCards(): StatCard[] {
    return [
      {
        title: 'Total Files',
        value: this.totalFiles,
        icon: 'file-text',
        iconGradient: 'gradient-teal',
        textColor: '#0f766e',
        bgGradient: 'bg-gradient-teal',
        filter: 'all' as const,
      },
      {
        title: 'Excel Files',
        value: this.excelFiles,
        icon: 'file-text',
        iconGradient: 'gradient-blue',
        textColor: '#1d4ed8',
        bgGradient: 'bg-gradient-blue',
        filter: 'excel' as const,
      },
      {
        title: 'CSV Files',
        value: this.csvFiles,
        icon: 'file-text',
        iconGradient: 'gradient-purple',
        textColor: '#7e22ce',
        bgGradient: 'bg-gradient-purple',
        filter: 'csv' as const,
      },
      {
        title: 'Status',
        value: 'All synced',
        icon: 'check-circle',
        iconGradient: 'gradient-green',
        textColor: '#15803d',
        bgGradient: 'bg-gradient-green',
        filter: null,
      },
    ];
  }

  onFilterChange(filter: 'all' | 'excel' | 'csv' | null): void {
    if (filter) {
      this.activeFilter = filter;
    }
  }

  onBackToUseCases(): void {
    this.navigationService.goToHome();
  }

  onTabChange(tab: string): void {
    this.activeTab = tab;
  }

  onDownload(file: FileItem): void {
    console.log('Downloading:', file.name);
  }

  onDelete(file: FileItem): void {
    this.files = this.files.filter(f => f.id !== file.id);
  }

  onDownloadTemplate(template: Template): void {
    console.log('Downloading template:', template.filename);
  }

  onFileUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    const uploadedFiles = input.files;
    if (uploadedFiles && uploadedFiles.length > 0) {
      const newFiles = Array.from(uploadedFiles).map((file, index) => ({
        id: `${Date.now()}-${index}`,
        name: file.name,
        date: new Date().toLocaleString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }),
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        type: file.name.endsWith('.csv') ? 'CSV' : 'Excel',
      })) as FileItem[];
      this.files = [...newFiles, ...this.files];
      this.activeTab = 'files';
    }
  }

  getFileIconGradient(type: string): string {
    return type === 'Excel' ? 'gradient-green' : 'gradient-blue';
  }

  getTypeBadgeStyle(type: string): { bg: string; color: string } {
    return type === 'Excel'
      ? { bg: '#dcfce7', color: '#15803d' }
      : { bg: '#dbeafe', color: '#1d4ed8' };
  }
}
