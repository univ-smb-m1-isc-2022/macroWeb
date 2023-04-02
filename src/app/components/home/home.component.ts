import {Component, OnInit} from '@angular/core';
import {MenuServiceService} from "../../services/menu-service.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  constructor(private menuService: MenuServiceService) { }

  ngOnInit(): void {
  }

  myFunction() {
    console.log("test");
    this.menuService.getMenu().subscribe(
      data => {
        console.log(data);
      }
    );
  }
}
