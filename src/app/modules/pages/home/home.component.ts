import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

  #employeeService = inject(EmployeeService);

  constructor() {

  }

}
