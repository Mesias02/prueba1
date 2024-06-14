import { Component, OnInit } from '@angular/core';
import {EmployeesFormComponent} from "../../components/employees-form/employees-form.component";
import { ProductsFormComponent } from '../../components/products-form/products-form.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.component.html',
  imports: [
    EmployeesFormComponent,
    ProductsFormComponent
  ],
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
