import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IEmployee, IEmployeeResponse } from 'src/app/models/employee.model';
import { EmployeeActionService } from './employee-action.service';
import { combineLatest, shareReplay, switchMap } from 'rxjs';

const api = `http://localhost:3000/employee`;

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  http = inject(HttpClient)
  #employeeAction = inject(EmployeeActionService)

  createEmployee(employee: IEmployee) {
    return this.http.post<IEmployeeResponse>(api, employee)
  }

  employees$ = this.#employeeAction.filter$.pipe(
    switchMap(({ _limit, _page, q }) => this.http.get<IEmployeeResponse[]>(api, {
      params: {
        _limit, _page, q
      }
    })),
    shareReplay(1)
  )

  employeeById$ = this.#employeeAction.employeeId$.pipe(
    switchMap(id => this.http.get<IEmployeeResponse>(`${api}/${id}`)), shareReplay(1)
  )

  updateEmployee(employee: IEmployee, id: string) {
    return this.http.put<IEmployeeResponse>(`${api}/${id}`, employee)
  }

  deleteEmployee(id: number) {
    return this.http.delete<void>(`${api}/${id}`)
  }


}
