import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Chart} from "chart.js";

@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.scss']
})
export class WeightComponent implements OnInit{
  public chart: any;
  public dateLabels: any = [];
  public weightList: any = [];
  ngOnInit(): void {
    this.dateLabels = ['2022-05-10', '2022-05-11', '2022-05-12','2022-05-13',
      '2022-05-14', '2022-05-15', '2022-05-16','2022-05-17', ]
    this.weightList = ['467','576', '572', '79', '92',
      '574', '573', '576']
    this.createChart();
  }

  createChart(){

    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.dateLabels,
        datasets: [
          {
            label: "Weight",
            data: this.weightList,
            backgroundColor: 'blue'
          }
        ]
      },
      options: {
        aspectRatio:2.5
      }

    });
  }

}
