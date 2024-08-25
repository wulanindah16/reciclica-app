import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent implements OnInit {

  @Input() message!: string;
  @Input() field!: AbstractControl | null;
  @Input() error!: string;

  constructor() { }

  ngOnInit() {}

  shouldShowComponent(): boolean {
    // Memeriksa apakah kontrol telah disentuh dan ada kesalahan
    return !!(this.field && this.field.touched && this.field.errors && this.field.errors[this.error]);
  }
}
