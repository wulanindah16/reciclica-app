import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterPageForm } from './form/register.page.form';
import { FormBuilder } from '@angular/forms';
import { AppState } from 'src/store/AppState';
import { Store } from "@ngrx/store";
import { UserRegister } from 'src/app/model/UserRegister';
import { state } from '@angular/animations';
import { RegisterState } from 'src/store/register/RegisterState';
import { share, Subscription } from 'rxjs';
import { hide, show } from 'src/store/loading/loading.actions';
import { register } from 'src/store/register/register.actions';
import { ToastController } from '@ionic/angular';
import { login } from 'src/store/login/login.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit, OnDestroy {

  registerForm!: RegisterPageForm;

  registerStateSubscription!: Subscription;

  constructor(private formBuilder: FormBuilder, private store: Store<AppState>,
    private toastController: ToastController) { }

  ngOnInit() {
    this.createForm();

    this.watchRegisterState();
  }

  ngOnDestroy() {
    this.registerStateSubscription.unsubscribe();
  }

  register(){
    this.registerForm.getForm().markAllAsTouched();

    if (this.registerForm.getForm().valid){
      this.store.dispatch(register({userRegister: this.registerForm.getForm().value}))
    }
  }

  private createForm() {
    this.registerForm = new RegisterPageForm(this.formBuilder);
  }

  private watchRegisterState () {
    this.registerStateSubscription = this.store.select('register').subscribe(state => {
      this.toggleLoading(state);

      this.onRegistered(state);
      this.onError(state);
    })
  }

  private onRegistered(state: RegisterState) {
    if (state.isRegistered) {
      this.store.dispatch(login({
        email: this.registerForm.getForm().value.email,
        password: this.registerForm.getForm().value.password
      }))
    }
  }

  private onError(state: RegisterState){
    if (state.error) {
      this.toastController.create({
        message: state.error.message,
        duration: 5000,
        header: 'Registration not done'
      }).then(toast => toast.present());
    }
  }

  private toggleLoading(state: RegisterState) {
    if (state.isRegistering) {
      this.store.dispatch(show());
    } else {
      this.store.dispatch(hide());
    }
  }

}
