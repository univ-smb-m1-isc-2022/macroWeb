import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MenuServiceService} from "../../../services/menu-service.service";
import {MatChipListbox} from "@angular/material/chips";
import {MatTable} from "@angular/material/table";
import {FoodService} from "../../../services/food.service";

@Component({
  selector: 'app-my-dialog',
  templateUrl: './addFood.component.html'
})
export class AddFoodComponent implements OnInit{
  isMenuEmpty = true;
  isMenuSelected = false;
  foodList: any ;
  foodId: any;

  dataSourceExport: any;

  ngOnInit(): void {
  }

  constructor(
    public foodService: FoodService,
    public dialogRef: MatDialogRef<AddFoodComponent>,
    @Inject(MAT_DIALOG_DATA) public dataMenuId: any
  ) {}

  closeDialog() {
    this.dialogRef.close('Thanks for using the dialog!');
  }

  @ViewChild('chipList') chipList!: MatChipListbox;
  @ViewChild('nameInput', { static: true }) nameInput!: ElementRef;

  @ViewChild('quantityInput', { static: true }) quantityInput!: ElementRef;
  @ViewChild('table', { static: true }) table!: MatTable<any>;

  getFoodListBYName() {
    const name = this.nameInput.nativeElement.value;
    console.log('Name:', name);
    this.foodService.getFoodWithNameStartsWith(name).subscribe(data => {
      this.foodList = data;
    }
    );
  }

  addFood() {
    const quantity = this.quantityInput.nativeElement.value;
    //get food id from chip

    console.log('Quantity:', this.dataMenuId);
    let item =
      {
        "quantity":  quantity,
        "menu": {
          "id": this.dataMenuId
        },
        "food": {
          "id": this.foodId
        }
      }
    console.log(item)
   this.dialogRef.close(item);
  }

  ShowFood(item: any) {
    this.foodId = item.id;
  }
}
