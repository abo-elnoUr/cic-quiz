import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { tap } from 'rxjs';
import { EmployeeActionService } from 'src/app/shared/services/employee/employee-action.service';
import { EmployeeService } from 'src/app/shared/services/employee/employee.service';
import { SweetAlertService } from 'src/app/shared/services/global/sweet-alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

  #employeeService = inject(EmployeeService);
  #employeeAction = inject(EmployeeActionService)
  #sweetAlert = inject(SweetAlertService)

  pageNumber = this.#employeeAction.pageNumber
  employees$ = this.#employeeService.employees$
  employeeCount = signal(0)
  employeesCount$ = this.#employeeService.employeesCount$.pipe(
    tap((count) => {
      if (count) {
        this.employeeCount.set(count)
      }
    })
  )


  searchInEmployeeList(searchTxt: string) {
    this.#employeeAction.setSearchText(searchTxt)
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
        this.#sweetAlert.deletedToast('Employee Deleted Successfully')
      }, error: (err) => {
        this.#sweetAlert.error(err.error.message)
      }
    })
  }

  onNext() {
    if (this.employeeCount() > 10)
      this.#employeeAction.setPage(this.pageNumber + 1)
    return
  }

  onPrevious() {
    if (this.pageNumber > 1)
      this.#employeeAction.setPage(this.pageNumber - 1)
    return
  }

}
