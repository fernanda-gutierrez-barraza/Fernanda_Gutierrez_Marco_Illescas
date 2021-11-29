import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TiposERPageRoutingModule } from './tipos-er-routing.module';

import { TiposERPage } from './tipos-er.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TiposERPageRoutingModule
  ],
  declarations: [TiposERPage]
})
export class TiposERPageModule {}
