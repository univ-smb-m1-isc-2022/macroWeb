import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Chart} from "chart.js";
import {WeightService} from "../../services/weight.service";

@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.scss']
})
export class WeightComponent implements OnInit{
  constructor(private formBuilder: FormBuilder, private weightService: WeightService) {
  }
  weightForm!: FormGroup;
  public chart: any;
  public dateLabels: any = [];
  public weightList: any = [];
  ngOnInit(): void {

    this.weightForm = this.formBuilder.group({
      weight: ['', Validators.required]
    });

    this.updateChart()
    //wait 0.5 seconds for the data to be loaded
  }

  updateChart(){
    this.dateLabels = [];
    this.weightList = [];
    this.weightService.getWeightWithId(localStorage.getItem("id")).subscribe(data => {
      console.log(data)
      data.forEach((element: any) => {
        this.dateLabels.push(element.createdAt)
        this.weightList.push(element.weight)
      });
      setTimeout(() => {
        if (this.chart){
          this.chart.destroy();
        }
        this.createChart();
        }
        , 500);
    })
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

  onSubmit() {
    if (this.weightForm.invalid) {
      console.log('Invalid form')
      return;
    }
    let idBody = {id: localStorage.getItem("id")}
    let body = {
      weight: this.weightForm.value.weight,
      user : idBody
    }
    console.log(this.weightForm.value.weight);
    this.weightService.addWeight(body).subscribe(data => {
      console.log(data)
      this.updateChart()
    }
    )
  }
}
