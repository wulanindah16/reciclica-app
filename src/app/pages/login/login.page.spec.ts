import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { loadingReducer } from 'src/store/loading/loading.reducers';
import { StoreModule, Store } from '@ngrx/store';
import { AppState } from 'src/store/AppState';
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from 'src/store/login/login.actions';
import { User } from 'src/app/model/user/User';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { loginReducer } from 'src/store/login/login.reducers';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let router: Router;
  let page: HTMLElement;
  let store: Store<AppState>
  let toastController: ToastController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [ IonicModule.forRoot(),
        AppRoutingModule,
        ReactiveFormsModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature("loading", loadingReducer),
        StoreModule.forFeature("login", loginReducer),
        AngularFireModule.initializeApp(environment.firebaseConfig)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    router = TestBed.get(Router);
    store = TestBed.get(Store);
    toastController = TestBed.get(ToastController);

    component = fixture.componentInstance;
    page = fixture.debugElement.nativeElement as HTMLElement;
  }));

  it('should create form on init', () => {
    component.ngOnInit();

    expect(component.form).not.toBeUndefined();
  })

  it('should go to register on register', () => {
    spyOn(router, 'navigate');

    component.register();

    expect(router.navigate).toHaveBeenCalledWith(['register']);
  });

  it('should recover email/password on forgot email/password', () => {
    fixture.detectChanges();
    component.form.get('email')?.setValue('valid@email.com');
    const recoverButton = page.querySelector("#recoverPasswordButton") as HTMLElement; // Gunakan type assertion
    recoverButton?.click();
    store.select('login').subscribe(loginState => {
      expect(loginState.isRecoveringPassword).toBeTruthy();
    })
    store.select('loading').subscribe(loadingState => {
      expect(loadingState['isRecoveringPassword']).toBeTruthy();
    })
  })

  it('given user is recovering password, when success, then hide loasing and show success message', () => {
    spyOn(toastController, 'create').and.returnValue;

    fixture.detectChanges();
    store.dispatch(recoverPassword({email: "any@email.com"}));
    store.dispatch(recoverPasswordSuccess());
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    })

    expect(toastController.create).toHaveBeenCalledTimes(1);
  })

  it('given user is recovering password, when fail, then hide loasing and show error message', () => {
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () => {}}));

    fixture.detectChanges();
    store.dispatch(recoverPassword({email: "any@email.com"}));
    store.dispatch(recoverPasswordFail({error: "message"}));
    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    })

    expect(toastController.create).toHaveBeenCalledTimes(1);
  })

  it('should show loading and start login when logging in', () => {
    fixture.detectChanges();
    component.form.get('email')?.setValue('valid@gmail.com');
    component.form.get('password')?.setValue('anyPassword');
    const recoverButton = page.querySelector('#loginButton') as HTMLElement;
    recoverButton?.click();

    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeTruthy();
    })
    store.select('login').subscribe(loginState => {
      expect(loginState.isLoggingIn).toBeTruthy()
    })
  })

  it('given user is logging in, when success, then hide loading and send user to home page', () => {
    spyOn(router, 'navigate');

    fixture.detectChanges();
    store.dispatch(login({email: "valid@email.com", password: "anyPassword"}));
    store.dispatch(loginSuccess({user: new User()}));

    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    })
    store.select('login').subscribe(loginState => {
      expect(loginState.isLoggedIn).toBeTruthy()
    })
    expect(router.navigate).toHaveBeenCalledWith(['home']);
  })

  it('given user is logging in, when fail, then hide loading and show error message', () => {
    spyOn(toastController, 'create').and.returnValue(<any> Promise.resolve({present: () => {}}));

    fixture.detectChanges();
    store.dispatch(login({email: "valid@email.com", password: "anyPassword"}));
    store.dispatch(loginFail({error: {message: 'error message'}}));

    store.select('loading').subscribe(loadingState => {
      expect(loadingState.show).toBeFalsy();
    })

    expect(toastController.create).toHaveBeenCalledTimes(1);
  })

});
