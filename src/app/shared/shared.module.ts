// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PickupCallCardComponent } from '../components/pickup-call-card/pickup-call-card.component';
import { ErrorMessageComponent } from '../components/error-message/error-message.component';

@NgModule({
  declarations: [
    PickupCallCardComponent,
    ErrorMessageComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    PickupCallCardComponent,
    ErrorMessageComponent,
    CommonModule,
    IonicModule
  ]
})
export class SharedModule {}
