import { Injectable, inject } from "@angular/core";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { IEmployee } from "src/app/models/employee/employee.model";
import { EmployeeForm } from "src/app/models/employee/employee.type";

@Injectable()
export class EmployeeFormClass {

  #fb = inject(NonNullableFormBuilder);

  createEmployeeForm(): EmployeeForm {
    return this.#fb.group({
      name: ['', Validators.required],
      age: [{ value: 0, disabled: true }, [Validators.required, Validators.min(18)]],
      birthOfDate: [new Date(), [Validators.required]],
      address: '',
    })
  }
  patchEmployeeForm(form: EmployeeForm, employee: IEmployee): EmployeeForm {
    form.patchValue(employee);
    return form;
  }

}
