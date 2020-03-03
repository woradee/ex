import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShirtPageRoutingModule } from './shirt-routing.module';

import { ShirtPage } from './shirt.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShirtPageRoutingModule
  ],
  declarations: [ShirtPage]
})
export class ShirtPageModule {}
