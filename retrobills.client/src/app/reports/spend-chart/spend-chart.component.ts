import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-spend-chart',
  templateUrl: './spend-chart.component.html',
  styleUrls: ['./spend-chart.component.css']
})
export class SpendChartComponent implements AfterViewInit, OnDestroy{
  constructor(){Chart.register(...registerables)}

  public chart: any;

  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnDestroy(): void {
      if(this.chart){
        this.chart.destroy();
      }
  }

  createChart(){
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    canvas.id = 'myChart';
    canvas.width = 400;
    canvas.height = 400;
    document.querySelector('.chart-container')?.appendChild(canvas);

    this.chart = new Chart(canvas, {
      type: 'pie', //this denotes the type of chart
      data: { //values on the x-axis
        labels: ['Food', 'Groceries', 'Entertainment', 'Utilities', 'Transportation', 'Unspent'],
        datasets: [{
          label: 'Percentage spent',
          data: [25, 25, 10, 25, 5, 10],
          backgroundColor: ['red', 'pink', 'green', 'yellow', 'orange', 'blue'],
          hoverOffset: 36
        }],
      },
      options: {aspectRatio: 2.5}
    })
  }
}
