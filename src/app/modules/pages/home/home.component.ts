import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { SearchForm } from 'src/app/models/employee.type';
import { EmployeeActionService } from 'src/app/shared/services/employee/employee-action.service';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
import { SweetAlertService } from 'src/app/shared/services/global/sweet-alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  #employeeService = inject(EmployeeService);
  #employeeAction = inject(EmployeeActionService)
  #sweetAlert = inject(SweetAlertService)
  #fb = inject(NonNullableFormBuilder)

  pageNumber = this.#employeeAction.pageNumber
  employees$ = this.#employeeService.employees$
  searchForm: SearchForm = this.#fb.group({ search: '' })



  ngOnInit(): void {
    this.searchForm = this.#fb.group({
      search: ''
    })
    this.searchForm.controls.search.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe({
      next: (value) => {
        console.log(value);

        this.#employeeAction.setSearchText(value)
      }
    })
  }

  onDelete(id: number) {
    this.#sweetAlert.makeSureDelete()?.then((result) => {
      if (result.isConfirmed) {
        this.deleteEmployee(id)
      }
    }
    )
  }

  deleteEmployee(id: number) {
    this.#employeeService.deleteEmployee(id).subscribe({
      next: () => {
        this.#employeeAction.setRefreshEmployeeList()
        this.#sweetAlert.deletedToast()
      }
    })
  }

  onNext() {
    this.#employeeAction.setPage(this.pageNumber + 1)
  }

  onPrevious() {
    if (this.pageNumber > 1) { this.#employeeAction.setPage(this.pageNumber - 1) } else { this.#employeeAction.setPage(1) }
  }

}
