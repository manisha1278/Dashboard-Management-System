import { Component, Input, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import {
  ChartConfiguration,
  ChartOptions
} from 'chart.js';
import { Widget } from '../../../../../models/widget';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css'
})
export class BarChartComponent implements OnInit {

  @Input() widget!: Widget;

  public barChartData!: ChartConfiguration<'bar'>['data'];

  public barChartOptions: ChartOptions<'bar'> = {

    responsive: true,

    maintainAspectRatio: false,

    animation: {

      duration: 1200,

      easing: 'easeOutQuart'

    },

    layout: {

      padding: {

        top: 10,
        left: 10,
        right: 20,
        bottom: 10

      }

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

        padding: 12,

        cornerRadius: 10,

        titleColor: '#fff',

        bodyColor: '#fff',

        displayColors: false

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

    }

  };

  ngOnInit(): void {

    this.barChartData = {

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

          label: 'Revenue',

          data: [

            65,
            59,
            80,
            81,
            56,
            90

          ],

          backgroundColor: [

            '#2563EB',
            '#2563EB',
            '#2563EB',
            '#2563EB',
            '#2563EB',
            '#2563EB'

          ],

          hoverBackgroundColor: '#1D4ED8',

          borderRadius: 10,

          borderSkipped: false,

          maxBarThickness: 38

        }

      ]

    };

  }

}