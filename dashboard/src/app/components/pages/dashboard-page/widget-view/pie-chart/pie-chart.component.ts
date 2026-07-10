import { Component, Input, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import {
  ChartConfiguration,
  ChartOptions
} from 'chart.js';
import { Widget } from '../../../../../models/widgets';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent implements OnInit {

  @Input() widget!: Widget;

  public pieChartData!: ChartConfiguration<'doughnut'>['data'];

  public pieChartOptions: ChartOptions<'doughnut'> = {

    responsive: true,

    maintainAspectRatio: false,

    cutout: '65%',

    animation: {

      duration: 1200,

      easing: 'easeOutQuart'

    },

    layout: {

      padding: 20

    },

    plugins: {

      legend: {

        position: 'bottom',

        align: 'center',

        labels: {

          usePointStyle: true,

          pointStyle: 'circle',

          boxWidth: 10,

          boxHeight: 10,

          padding: 22,

          color: '#667085',

          font: {

            size: 13,

            weight: 500

          }

        }

      },

      tooltip: {

        backgroundColor: '#1F2937',

        cornerRadius: 10,

        padding: 12,

        titleColor: '#fff',

        bodyColor: '#fff'

      }

    }

  };

  ngOnInit(): void {

    this.pieChartData = {

      labels: [

        'Marketing',

        'Sales',

        'Finance',

        'Support'

      ],

      datasets: [

        {

          data: [

            42,

            26,

            18,

            14

          ],

          backgroundColor: [

            '#2563EB',

            '#3B82F6',

            '#60A5FA',

            '#93C5FD'

          ],

          hoverBackgroundColor: [

            '#1D4ED8',

            '#2563EB',

            '#3B82F6',

            '#60A5FA'

          ],

          borderColor: '#ffffff',

          borderWidth: 5,

          hoverOffset: 15

        }

      ]

    };

  }

}