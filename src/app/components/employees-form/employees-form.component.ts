import { Component } from '@angular/core';
import { NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent } from "ng-zorro-antd/form";
import { NzColDirective } from "ng-zorro-antd/grid";
import { ReactiveFormsModule, FormControl, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { NzInputDirective } from "ng-zorro-antd/input";
import { NzDatePickerComponent } from "ng-zorro-antd/date-picker";
import { NzButtonComponent } from "ng-zorro-antd/button";
import { ApiService } from "../../services/api.service";
import { NzInputNumberComponent } from "ng-zorro-antd/input-number";
import { NzNotificationService } from "ng-zorro-antd/notification";

interface Employee {
  firstName: string;
  lastName: string;
  role: string;
  department: string;
  hireDate: Date | null;
  salary: number;
}

@Component({
  selector: 'app-employees-form',
  standalone: true,
  imports: [
    NzFormItemComponent,
    NzFormDirective,
    NzFormLabelComponent,
    NzFormControlComponent,
    NzColDirective,
    ReactiveFormsModule,
    NzInputDirective,
    NzDatePickerComponent,
    NzButtonComponent,
    NzInputNumberComponent
  ],
  templateUrl: './employees-form.component.html',
  styleUrls: ['./employees-form.component.css']
})
export class EmployeesFormComponent {
  validateForm: FormGroup<{
    firstName: FormControl<string>;
    lastName: FormControl<string>;
    role: FormControl<string>;
    department: FormControl<string>;
    hireDate: FormControl<Date | null>;
    salary: FormControl<number>;
  }>;

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
      this.apiService.createEmployee<Employee>(this.validateForm.value as Employee).subscribe(() => {
        this.createNotification('success', `${this.validateForm.value.firstName} ${this.validateForm.value.lastName}`, "Employee has been created successfully!");
        this.validateForm.reset();
      });
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  createNotification(type: string, title: string, message: string): void {
    this.notification.create(type, title, message);
  }

  constructor(
    private fb: NonNullableFormBuilder,
    private apiService: ApiService,
    private notification: NzNotificationService
  ) {
    const { required } = Validators;
    this.validateForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      role: ['', [Validators.required]],
      department: ['', [Validators.required]],
      hireDate: this.fb.control<Date | null>(null),
      salary: [0, [required]]
    });
  }
}