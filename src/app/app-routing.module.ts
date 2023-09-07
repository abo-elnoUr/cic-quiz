import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { IsSignInGuard } from './core/guard/is-sign-in.guard'
import { AuthGuard } from './core/guard/auth.guard'

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), canActivate: [ IsSignInGuard ] },
  { path: 'pages', loadChildren: () => import('./modules/pages/pages.module').then(m => m.PagesModule), canActivate: [ AuthGuard ] },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  // { path: '**', redirectTo: 'pages' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
