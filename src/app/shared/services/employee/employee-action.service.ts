import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeActionService {

  constructor() { }

  #limit = new BehaviorSubject<number>(10)
  limit$ = this.#limit.asObservable()
  setLimit(limit: number) {
    this.#limit.next(limit)
  }

  #page = new BehaviorSubject<number>(1)
  page$ = this.#page.asObservable()
  pageNumber = this.#page.value
  setPage(page: number) {
    this.#page.next(page)
  }

  #employeeId = new BehaviorSubject<number>(0)
  employeeId$ = this.#employeeId.asObservable()
  setEmployeeId(id: number) {
    this.#employeeId.next(id)
  }

  #searchText = new BehaviorSubject<string>('')
  searchText$ = this.#searchText.asObservable()
  setSearchText(text: string) {
    this.#searchText.next(text)
  }


  #refreshEmployeeList = new BehaviorSubject<void>(undefined)
  refreshEmployeeList$ = this.#refreshEmployeeList.asObservable()
  setRefreshEmployeeList() {
    this.#refreshEmployeeList.next()
  }

  filter$ = combineLatest({
    _limit: this.limit$,
    _page: this.page$,
    q: this.searchText$,
    refresh: this.refreshEmployeeList$
  })
}
