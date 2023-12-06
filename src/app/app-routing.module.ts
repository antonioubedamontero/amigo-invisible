import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { resultGuard } from './shared/guards/result.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./form/form.module').then((m) => m.FormModule),
  },
  {
    path: 'sorteo',
    canActivate: [resultGuard],
    loadChildren: () =>
      import('./result/result.module').then((m) => m.ResultModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
