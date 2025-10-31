import { Injectable } from '@angular/core';
import { ChartData, ChartDataset, ChartOptions, ChartType, PluginOptionsByType, ScaleOptions, TooltipLabelStyle } from 'chart.js';
import { DeepPartial } from './utils';
import { getStyle } from '@coreui/utils';

export interface IChartProps {
  data?: ChartData;
  labels?: any;
  options?: ChartOptions;
  colors?: any;
  type: ChartType;
  legend?: any;

  [propName: string]: any;
}

@Injectable({
  providedIn: 'any'
})
export class DashboardChartsData {
  constructor() {}

  public mainChart: IChartProps = { type: 'line' };

  // Helper untuk menghasilkan angka acak
  public random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // Helper untuk mendapatkan opsi dasar Chart.js
  private getChartOptions(scales: ScaleOptions<any>): ChartOptions {
    const plugins: DeepPartial<PluginOptionsByType<any>> = {
      legend: { display: false },
      tooltip: {
        callbacks: {
          labelColor: (context: any) => ({ backgroundColor: context.dataset.borderColor } as TooltipLabelStyle), 
          label: function(context: any) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += 'Rp ' + context.parsed.y.toLocaleString('id-ID');
            }
            return label;
          }
        }
      }
    };

    return {
      maintainAspectRatio: false,
      plugins,
      scales,
      elements: {
        line: { tension: 0.4 },
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3
        }
      }
    };
  }

  // Helper untuk mendapatkan konfigurasi sumbu Y (Rupiah)
  public getScales(): ScaleOptions<any> {
    const colorBorderTranslucent = getStyle('--cui-border-color-translucent');
    const colorBody = getStyle('--cui-body-color');

    return {
      x: {
        grid: {
          color: colorBorderTranslucent,
          drawOnChartArea: false
        },
        ticks: {
          color: colorBody
        }
      },
      y: {
        border: { color: colorBorderTranslucent },
        grid: { color: colorBorderTranslucent },
        max: 1000 * 1000,
        beginAtZero: true,
        ticks: {
          color: colorBody,
          maxTicksLimit: 5,
          callback: function(value: number | string, index: number, ticks: any) { 
            return 'Rp ' + value.toLocaleString('id-ID'); 
          }
        }
      }
    };
  }
  
  // Helper untuk mendapatkan dataset dasar
  private getBaseDataset(data: number[]): ChartDataset[] {
    const brandInfo = getStyle('--cui-info') ?? '#20a8d8';
    const brandInfoBg = `rgba(${getStyle('--cui-info-rgb')}, .1)`
    
    return [{
      data: data,
      label: 'Total Pendapatan', 
      backgroundColor: brandInfoBg,
      borderColor: brandInfo,
      pointHoverBackgroundColor: brandInfo,
      borderWidth: 2,
      fill: true
    }];
  }

  // ===============================================
  // FUNGSI BARU UNTUK MENGAMBIL DATA HARIAN (30 HARI)
  // ===============================================
  getDailyData(): IChartProps {
    const today = new Date();
    const daysInPeriod = 30;
    let labels: string[] = [];
    let data: number[] = [];

    // Buat label Tanggal dan Bulan (misalnya: 1 Okt)
    for (let i = daysInPeriod - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        
        const formattedLabel = date.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
        }).replace('.', ''); 
        
        labels.push(formattedLabel);
        // Hasilkan data acak untuk setiap hari
        data.push(this.random(50, 1000) * 1000); 
    }
    
    const scales = this.getScales();
    const options = this.getChartOptions(scales);
    const datasets = this.getBaseDataset(data);

    return {
        type: 'line',
        options,
        data: { datasets, labels }
    };
  }

  // ===============================================
  // FUNGSI BARU UNTUK MENGAMBIL DATA BULANAN (12 BULAN)
  // ===============================================
  getMonthlyData(): IChartProps {
    const labels: string[] = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];
    
    let data: number[] = [];
    for (let i = 0; i < labels.length; i++) {
        data.push(this.random(50, 1000) * 1000); 
    }
    
    const scales = this.getScales();
    const options = this.getChartOptions(scales);
    const datasets = this.getBaseDataset(data);

    return {
        type: 'line',
        options,
        data: { datasets, labels }
    };
  }

  // ===============================================
  // FUNGSI BARU UNTUK MENGAMBIL DATA TAHUNAN (6 TAHUN)
  // ===============================================
  getYearlyData(): IChartProps {
    const labels: string[] = ['2023', '2024', '2025', '2026', '2027', '2028'];
    
    let data: number[] = [];
    for (let i = 0; i < labels.length; i++) {
        data.push(this.random(50, 1000) * 1000); 
    }
    
    const scales = this.getScales();
    const options = this.getChartOptions(scales);
    const datasets = this.getBaseDataset(data);

    return {
        type: 'line',
        options,
        data: { datasets, labels }
    };
  }

  // ===============================================
  // initMainChart Disederhanakan untuk default ke Monthly
  // ===============================================
  initMainChart(): void {
    // Tetapkan chart utama sebagai default bulanan
    this.mainChart = this.getMonthlyData();
  }
}