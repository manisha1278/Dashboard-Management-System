import {
  Component,
  Input,
  OnInit,
  ViewChild,
  AfterViewInit
} from '@angular/core';

import {
  BaseChartDirective
} from 'ng2-charts';

import {
  ChartConfiguration,
  ChartOptions
} from 'chart.js';

import { Widget } from '../../../../../models/widgets';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.css'
})
export class LineChartComponent implements OnInit, AfterViewInit {

  @Input() widget!: Widget;

  @ViewChild(BaseChartDirective)
  chart?: BaseChartDirective;

  lineChartData!: ChartConfiguration<'line'>['data'];

  lineChartOptions: ChartOptions<'line'> = {

    responsive: true,

    maintainAspectRatio: false,

    animation: {

      duration: 1200,

      easing: 'easeOutQuart'

    },

    interaction: {

      intersect: false,

      mode: 'index'

    },

    plugins: {

      legend: {

        display: false

      },

      tooltip: {

        backgroundColor: '#1F2937',

        cornerRadius: 10,

        padding: 12,

        displayColors: false,

        titleColor: '#fff',

        bodyColor: '#fff'

      }

    },

    layout: {

      padding: {

        top: 10,

        left: 10,

        right: 20,

        bottom: 10

      }

    },

    scales: {

      x: {

        grid: {

          display: false

        },

        border: {

          display: false

        },

        ticks: {

          color: '#667085',

          font: {

            size: 12,

            weight: 500

          }

        }

      },

      y: {

        beginAtZero: true,

        border: {

          display: false

        },

        grid: {

          color: '#EAECF0',

          drawTicks: false

        },

        ticks: {

          color: '#667085',

          padding: 10,

          font: {

            size: 12

          }

        }

      }

    },

    elements: {

      line: {

        tension: 0.45,

        borderWidth: 3

      },

      point: {

        radius: 5,

        hoverRadius: 8,

        borderWidth: 2,

        backgroundColor: '#2563EB',

        borderColor: '#ffffff'

      }

    }

  };

  ngOnInit(): void {

    this.lineChartData = {

      labels: [

        'Jan',

        'Feb',

        'Mar',

        'Apr',

        'May',

        'Jun'

      ],

      datasets: [

        {

          label: 'Growth',

          data: [

            25,

            42,

            35,

            60,

            55,

            85

          ],

          borderColor: '#2563EB',

          fill: true

        }

      ]

    };

  }

  ngAfterViewInit(): void {

    const chart = this.chart?.chart;

    if (!chart) return;

    const ctx = chart.ctx;

    const gradient = ctx.createLinearGradient(0, 0, 0, 350);

    gradient.addColorStop(0, 'rgba(37,99,235,.35)');
    gradient.addColorStop(.6, 'rgba(37,99,235,.12)');
    gradient.addColorStop(1, 'rgba(37,99,235,0)');

    this.lineChartData.datasets[0].backgroundColor = gradient;

    chart.update();

  }

}