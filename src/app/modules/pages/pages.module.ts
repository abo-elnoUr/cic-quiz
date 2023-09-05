import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmployeesComponent } from './employees/employees.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'employees/:id', component: EmployeesComponent}
]

@NgModule({
  declarations: [
    HomeComponent,
    EmployeesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class PagesModule { }
