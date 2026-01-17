import { EChartsOption } from 'echarts';

export function getFishEnvironmentalChart(): EChartsOption {
  return {
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
}

export function getFishProductionChart(): EChartsOption {
  return {
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
}

export function getGrainPriceChart(): EChartsOption {
  return {
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
}

export function getGrainLogisticsChart(): EChartsOption {
  return {
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
}

export function getFruitsClimateChart(): EChartsOption {
  return {
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
}

export function getFruitsYieldChart(): EChartsOption {
  return {
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
