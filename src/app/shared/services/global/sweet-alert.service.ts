import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2'


@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  saveToast(message?: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      showConfirmButton: false,
      timer: 2000,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: 'success',
      iconColor: 'rgb(134 24 57)',
      title: message ?? 'Data Saved Successfully'
    })
  }

  updateToast(message?: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      showConfirmButton: false,
      timer: 2000,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: 'success',
      iconColor: 'rgb(134 24 57)',
      title: message ?? 'Data Updated Successfully'
    })
  }

  deletedToast(message?: string) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      showConfirmButton: false,
      timer: 2000,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    Toast.fire({
      icon: 'success',
      iconColor: 'rgb(134 24 57)',
      title: message ?? 'Data Deleted Successfully',
      color: '#ff0000'
    })
  }
}
