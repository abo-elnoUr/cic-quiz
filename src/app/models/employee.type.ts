import { FormControl, FormGroup } from "@angular/forms";

export type EmployeeForm = FormGroup<{
  name: FormControl<string>;
  age: FormControl<number>;
  birthOfDate: FormControl<Date>;
  address: FormControl<string>;
}>
