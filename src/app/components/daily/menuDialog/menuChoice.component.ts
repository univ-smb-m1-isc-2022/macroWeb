import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MenuServiceService} from "../../../services/menu-service.service";
import {MatChipListbox} from "@angular/material/chips";
import {MatTable} from "@angular/material/table";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-my-dialog',
  templateUrl: './menuChoice.component.html',
})
export class menuChoiceComponent implements OnInit{
  isMenuEmpty = true;
  isMenuSelected = false;
  menuList: any ;
  dataSources :any;
  options: string[] = [];

  selectedOption!: any;
  menuIdExport: any;
  myControl = new FormControl();
  searchValue!: string;


  displayedColumns2: string[] = ["name","quantity",'calories_for100g', 'carbs', 'lipids', 'protein', 'type'];

  ngOnInit(): void {
    this.menuList = [];
  }
  onSelectionChange(event: any) {
    this.selectedOption = event.value.id;
    if (this.selectedOption != null) {
      this.isMenuSelected = true;
    }
    var item = {id : event.value.id, name : event.value.name}
    this.showMenu( item);
  }




  constructor(
    public menuService: MenuServiceService,
    public dialogRef: MatDialogRef<menuChoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  closeDialog() {
    this.dialogRef.close('Thanks for using the dialog!');
  }

  @ViewChild('nameInput', { static: true }) nameInput!: ElementRef;

  @ViewChild('table', { static: true }) table!: MatTable<any>;

  getMenuListBYName() {
    const name = this.nameInput.nativeElement.value;
    console.log('Name:', name);
    this.menuService.getMenuWithNameStartsWith(name).subscribe(data => {
      this.options = data;
    }
    );
  }

  showMenu(item :any) {

    this.dataSources = [];
    this.isMenuSelected = true;
    this.menuService.getMenuWithFood(item.id).subscribe(
      data => {
        console.log(data)
        //print lenght of data
        let dataParse = JSON.parse(JSON.stringify(data));
        for (let i = 0; i < dataParse.length; i++) {
          let quantity = dataParse[i].quantity;
          console.log(quantity)
          let itemData =
            //aproxiamte 5.555 to 5.5
            {
              name: dataParse[i].food.name,
              quantity : quantity,
              calories: ((dataParse[i].food.caloriesFor100g  )/100*quantity).toFixed(1),
              carbs: ((dataParse[i].food.carbs)/100*quantity).toFixed(1),
              lipids: ((dataParse[i].food.lipids)/100*quantity).toFixed(1),
              protein: ((dataParse[i].food.protein)/100*quantity).toFixed(1),
              type: dataParse[i].food.type

            }
          this.dataSources.push(itemData);
        }
        this.isMenuEmpty = false;
        console.log(item.id)
        this.menuIdExport = {id : item.id, name : item.name};
        //refresh table
        this.table.renderRows();
      }
    );
  }

  addMenu() {
    if (this.menuIdExport != null) {
      console.log(this.menuIdExport);
      this.dialogRef.close(this.menuIdExport);
    }
    else {
      console.log("No menu selected");
    }
  }
}
