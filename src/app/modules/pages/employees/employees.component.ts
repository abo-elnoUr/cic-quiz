import { Component, OnInit, inject, signal } from '@angular/core';
import { EmployeeForm } from 'src/app/models/employee.type';
import { EmployeeFormClass } from './employee.form';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
import { EmployeeActionService } from './../../../shared/services/employee/employee-action.service';
import { SweetAlertService } from 'src/app/shared/services/global/sweet-alert.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
  providers: [EmployeeFormClass]
})
export class EmployeesComponent implements OnInit {

  #employeeFormClass = inject(EmployeeFormClass);
  #route = inject(ActivatedRoute);
  #employeeService = inject(EmployeeService)
  #employeeAction = inject(EmployeeActionService)
  #sweetAlert = inject(SweetAlertService)

  employeeForm: EmployeeForm = this.#employeeFormClass.createEmployeeForm();
  #employeeId = signal('');
  isEdit = signal(false);
  employeeById$ = this.#employeeService.employeeById$
  age = signal(0)
  showAgeError: boolean = false


  ngOnInit(): void {
    this.#employeeId.set(this.#route.snapshot.params['id']);
    if (+this.#employeeId() === 0) return;
    this.isEdit.set(true);
    this.getEmployeeById();
  }

  convertDateToAge(date: Date) {
    const age = new Date().getFullYear() - new Date(date).getFullYear()
    this.age.set(age)
    this.employeeForm.patchValue({ age: age })
  }

  getEmployeeById() {
    this.#employeeAction.setEmployeeId(+this.#employeeId());
    this.setEmployee()
  }

  createEmployee() {
    this.#employeeService.createEmployee(this.employeeForm.getRawValue()).subscribe({
      next: (res) => {
        this.#sweetAlert.saveToast()
        this.#employeeAction.setRefreshEmployeeList()
      }
    })
  }

  setEmployee() {
    this.employeeById$.subscribe({
      next: (res) => {
        this.#employeeFormClass.patchEmployeeForm(this.employeeForm, res)
      }
    })
  }

  editEmployee() {
    this.#employeeService.updateEmployee(this.employeeForm.getRawValue(), this.#employeeId()).subscribe({
      next: (res) => {
        this.#sweetAlert.updateToast()
        this.#employeeAction.setRefreshEmployeeList()
      }
    })
  }


  onSubmit() {
    if(!this.employeeForm.valid) return
    if (this.age() < 18) {
      this.showAgeError = true
    } else {
      this.showAgeError = false
    }
    if(+this.#employeeId() === 0) this.createEmployee();
    else this.editEmployee();
  }



}
