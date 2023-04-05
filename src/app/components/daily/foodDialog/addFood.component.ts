import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MenuServiceService} from "../../../services/menu-service.service";
import {MatChipListbox} from "@angular/material/chips";
import {MatTable} from "@angular/material/table";
import {FoodService} from "../../../services/food.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-my-dialog',
  templateUrl: './addFood.component.html',
  styleUrls: ['./addFood.component.scss'],
})
export class AddFoodComponent implements OnInit{
  isMenuSelected = false;
  foodList: any ;
  foodId: any;

  myControl = new FormControl();
  options: string[] = [];
  searchValue!: string;
  selectedOption!: any;

  recommendedFoodList:any = []

  ngOnInit() {
  }

  onSelectionChange(event: any) {
    this.selectedOption = event.value;
    console.log(this.selectedOption)
    if (this.selectedOption != null) {
      this.isMenuSelected = true;
      this.foodService.getRecommendedFood(this.selectedOption.id).subscribe(data => {
        this.foodList = data;
        if (data.length == 0){
          return
        }
          console.log("data food" +data)

      }
      );
      setTimeout(() => {
          this.recommendedFoodList = []
          for (let i = 0; i < this.foodList.length; i++) {
            console.log("id food" +this.foodList[i])
            this.foodService.getFoodWithId(this.foodList[i]).subscribe(data => {
              this.recommendedFoodList.push(data);

              }
            );
          }

      }
      , 100);

      setTimeout(() => {
        let temp = []
        let parsed = JSON.parse(JSON.stringify(this.recommendedFoodList));
        for (let i = 0; i < parsed.length; i++) {
          temp.push(parsed[i][0].name)
        }
        this.recommendedFoodList = temp
      }
      , 1000);
    }
  }

  constructor(
    public foodService: FoodService,
    public dialogRef: MatDialogRef<AddFoodComponent>,
    @Inject(MAT_DIALOG_DATA) public dataMenuId: any
  ) {}


  @ViewChild('chipList') chipList!: MatChipListbox;
  @ViewChild('nameInput', { static: true }) nameInput!: ElementRef;

  @ViewChild('quantityInput', { static: true }) quantityInput!: ElementRef;
  @ViewChild('table', { static: true }) table!: MatTable<any>;

  getFoodListBYName() {
    const name = this.nameInput.nativeElement.value;
    console.log('Name:', name);
    this.foodService.getFoodWithNameStartsWith(name).subscribe(data => {
      this.foodList = data;
      this.options =data
    }
    );
  }

  addFood() {
    const quantity = this.quantityInput.nativeElement.value;
    //get food id from chip
    if (quantity == null || quantity == 0 || this.selectedOption.length == 0)  {
      return;
    }
    else {
      console.log('Quantity:', quantity);
      let item =
        {
          "quantity": quantity,
          "menu": {
            "id": this.dataMenuId
          },
          "food": {
            "id": this.selectedOption.id
          }
        }
      console.log(item)
      this.dialogRef.close(item);
    }
  }

  ShowFood(item: any) {
    this.foodId = item.id;
  }
}
