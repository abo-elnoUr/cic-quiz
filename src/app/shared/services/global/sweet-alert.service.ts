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

  makeSureDelete(): Promise<any> | null {
    return Swal.fire({
      title:  'Are you sure you want to delete?',
      text:  `Data can't be recovered` ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Accept' ,
      confirmButtonColor: '#3f51b5',
      cancelButtonText: 'Cancel' ,
      focusConfirm: true
    })
  }

  error(err?: string): Promise<any> | null {
    return Swal.fire({
      icon: 'error',
      customClass: {
        'container': 'pre-line'
      },
      title: err,
      text: 'Something Wrong!!',
      focusConfirm: true
    })
  }

}
