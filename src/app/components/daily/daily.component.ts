import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatTable} from "@angular/material/table";
import {MenuServiceService} from "../../services/menu-service.service";
import {MatDialog} from "@angular/material/dialog";
import {menuChoiceComponent} from "./menuDialog/menuChoice.component";
import {AddFoodComponent} from "./foodDialog/addFood.component";
import {WeightService} from "../../services/weight.service";


@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DailyComponent implements OnInit{

  @ViewChild('table', { static: true }) table!: MatTable<any>;
  @ViewChild('menuNameInput', { static: true }) menuNameInput!: ElementRef;
  menuIdList: any = [];

  nutrition = {
    calories: 1800,
    carbs: 300,
    lipids: 60,
    protein: 60
  }


  ngOnInit() {
    this.weightService.getWeightWithId(localStorage.getItem("id")).subscribe(data => {
      //get the last weight
      let lastWeight = data[data.length-1].weight;
      let size = Number(localStorage.getItem("size"));
      console.log("last weight : "+lastWeight)
      this.nutrition.calories = (lastWeight*9.6) + (1.8*180) - (4.7*20)
      let objective = localStorage.getItem("objective");
        console.log("objective : "+objective)
      if (objective == "MAINTAIN_WEIGHT"){
        this.nutrition.calories+=700;
      }
      else if (objective == "LOSE_FAT"){
        this.nutrition.calories+=400;
      }
      else if (objective == "GAIN_MUSCLE"){
        this.nutrition.calories+=1000;
      }

        this.nutrition.protein = parseInt(((this.nutrition.calories*0.25)/4).toFixed(1))
        this.nutrition.lipids = parseInt(((this.nutrition.calories*0.2)/9).toFixed(1))
        this.nutrition.carbs = parseInt(((this.nutrition.calories*0.55)/4).toFixed(1))
      }

    )
  }

  displayedColumns2: string[] = ["name",'quantity','calories_for100g', 'carbs', 'lipids', 'protein', 'type','action'];
  dataSourceMenus :any= []
  constructor(
    private menuService: MenuServiceService,
    private weightService: WeightService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ){
  }



  setTable(idList: any[]) {
    for (let i = 0; i < idList.length; i++) {
      this.menuService.getMenuWithFood(idList[i].id).subscribe(
        data => {

          let dataParse = JSON.parse(JSON.stringify(data));
          console.log("test :"+data.food)
          if (dataParse[0] == null) {
            this.dataSourceMenus.push({id: idList[i].id, name: idList[i].name, foods: []});
          }
          else {
            let totalNutrition =
              {
                calories: 0,
                carbs: 0,
                lipids: 0,
                protein: 0
              }
            let dataParse = JSON.parse(JSON.stringify(data));
            let foodList = [];
            let menuItem:any= {id: dataParse[0].menu.id ,name : dataParse[0].menu.name, foods: []}


            for (let i = 0; i < dataParse.length; i++) {
              console.log("nourriture : "+ dataParse[i].food.caloriesFor100g)
              let quantity = dataParse[i].quantity;
              totalNutrition.calories += ((dataParse[i].food.caloriesFor100g  )/100*quantity);
              totalNutrition.carbs += ((dataParse[i].food.carbs)/100*quantity);
              totalNutrition.lipids += ((dataParse[i].food.lipids)/100*quantity);
              totalNutrition.protein += ((dataParse[i].food.protein)/100*quantity);
              let item :any =
                //aproxiamte 5.555 to 5.5
                {
                  relationId : dataParse[i].id,
                  name: dataParse[i].food.name,
                  quantity: quantity,
                  calories: ((dataParse[i].food.caloriesFor100g  )/100*quantity).toFixed(1),
                  carbs: ((dataParse[i].food.carbs)/100*quantity).toFixed(1),
                  lipids: ((dataParse[i].food.lipids)/100*quantity).toFixed(1),
                  protein: ((dataParse[i].food.protein)/100*quantity).toFixed(1),
                  type: dataParse[i].food.type,
                }
              foodList.push(item);
            }
            this.nutrition.calories -= totalNutrition.calories;
            this.nutrition.carbs -= totalNutrition.carbs;
            this.nutrition.lipids -= totalNutrition.lipids;
            this.nutrition.protein -= totalNutrition.protein;

            menuItem.foods =foodList;
            menuItem.totalNutrition = totalNutrition;

            this.dataSourceMenus.push(menuItem);

          }

        }
      );
    }

  }

  importMenu() {
    const dialogRef = this.dialog.open(menuChoiceComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == null) {
        return;
      }
      this.menuIdList.push(result);
      this.dataSourceMenus = [];
      this.setTable(this.menuIdList);
      this.cdr.detectChanges();
    });
  }
  newMenu() {

  }


  addFood(id: any) {
    //open dialog
    //add food to menu
    const dialogRef = this.dialog.open(AddFoodComponent, {
      data: {
        menuId: id
      }
    });
    dialogRef.afterClosed().subscribe(result => {

      result.menu.id = id;

      this.menuService.addFoodToMenu(result).subscribe(
        data => {
        }
      )
      setTimeout(() => {
        this.cdr.detectChanges();
        this.dataSourceMenus = [];
        this.setTable(this.menuIdList)
      }, 500);

    });
  }

  deleteFood(relation: any) {
    this.menuService.deleteMenuFoodWithId(relation).subscribe(
      data => {
      }
    )

    setTimeout(() => {
      this.cdr.detectChanges();
      this.dataSourceMenus = [];
      this.setTable(this.menuIdList)
    }, 500);

  }

  addMenu() {
    let idMenu:any;
    if (this.menuNameInput.nativeElement.value != "") {
    let data =
      {
        "name":this.menuNameInput.nativeElement.value
      }
    this.menuService.addMenu(data).subscribe(
      data => {
        this.menuIdList.push({id: data.id, name: this.menuNameInput.nativeElement.value});
      }
    )
      setTimeout(() => {

        this.cdr.detectChanges();
        this.dataSourceMenus = [];
        this.setTable(this.menuIdList)
      }, 100);
    }
  }
}
