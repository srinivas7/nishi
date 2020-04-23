import { Component, OnInit, Input } from '@angular/core';

import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';
import { NONE_TYPE } from '@angular/compiler';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  constructor(private http: HttpClient) { }
  @Input() type ='first';
  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'RAW', yAxisID: 'yAxis1' },
    { data: [], label: 'SMOOTH', yAxisID: 'yAxis1' },
    { data: [], label: 'SPEED', yAxisID: 'yAxis2' }
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          id: 'yAxis1',
          position: 'left'
        },
        {
          id: 'yAxis2',
          ticks: {
            steps: 10,
            stepValue: 10,
            max : 100,
            beginAtZero: true,
            position: 'right'
          },
          position: 'right'
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'horizontal',
          id: 'yAxis1',
          value: '0',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },

    elements:
    {
      point:
      {
        radius: 0,
      },
      line:
      {
        borderWidth: 1
      },
    }
  };
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  public graphJson: any;
  public lineChartColors: Color[] = [
    {
      borderColor: 'pink',
      backgroundColor: 'white',
    },
  ];

  ngOnInit() {
    this.buildChartData();
  }

  private buildChartData() {
    const promise = this.http.get("assets/graphs.json").toPromise();
    promise.then((res) => {
      this.graphJson = res;
      this.generateAccelData(res);
    }).catch((error) => {
      console.log("Promise rejected with " + JSON.stringify(error));
    });
  }

  generateAccelData(data) {
    let accelLength = data.imei.tripEvents[0].details.accel.length + 1;
    for (let index = 0; index < accelLength; index++) {
      this.lineChartLabels.push(String(index));
    }
    data.imei.tripEvents[0].details.accel.forEach(element => {
      if (this.type === 'first') {
        this.lineChartData[0].data.push(element[2]);
        this.lineChartData[1].data.push(element[5]);
        //this.lineChartData[2].data.push(element[1]);
      } else if (this.type === 'second') {
        this.lineChartData[0].data.push(element[3]);
        this.lineChartData[1].data.push(element[6]);
        //this.lineChartData[2].data.push(element[1]);
      }
    });
  }
}
