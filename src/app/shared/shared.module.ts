// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PickupCallCardComponent } from 'src/app/components/pickup-call-card/pickup-call-card.component';

@NgModule({
  declarations: [
    PickupCallCardComponent // Deklarasikan komponen
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    PickupCallCardComponent, // Ekspor komponen agar bisa digunakan di modul lain
    CommonModule,
    IonicModule
  ]
})
export class SharedModule {}
