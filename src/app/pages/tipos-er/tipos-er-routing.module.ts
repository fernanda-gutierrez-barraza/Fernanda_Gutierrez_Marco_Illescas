import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TiposERPage } from './tipos-er.page';

const routes: Routes = [
  {
    path: '',
    component: TiposERPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TiposERPageRoutingModule {}
