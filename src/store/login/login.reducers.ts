import { createReducer, on, Action } from "@ngrx/store";
import { login, loginFail, loginSuccess, recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from "./login.actions";
import { LoginState } from "./LoginState";

const initialState: LoginState = {
  error: null,
  isLoggedIn: false,
  isLoggingIn: false,
  isRecoveredPassword: false,
  isRecoveringPassword: false,
};

const reducer = createReducer(initialState,
  on(recoverPassword, currentState => {
    return {
      ...currentState,
      error: null,
      isRecoveredPassword: false,
      isRecoveringPassword: true
    };
  }),
  on(recoverPasswordSuccess, currentState => {
    return {
      ...currentState,
      error: null,
      isRecoveredPassword: true,
      isRecoveringPassword: false
    };
  }),
  on(recoverPasswordFail, (currentState, action) => {
    return {
      ...currentState,
      error: action.error,
      isRecoveredPassword: false,
      isRecoveringPassword: false
    };
  }),
  on(login, currentState => {
    return {
      ...currentState,
      error: null,
      isLoggedIn: false,
      isLoggingIn: true
    };
  }),
  on(loginSuccess, currentState => {
    return {
      ...currentState,
      error: null,
      isLoggedIn: true,
      isLoggingIn: false
    };
  }),
  on(loginFail, (currentState, action) => {
    return {
      ...currentState,
      error: action.error,
      isLoggedIn: false,
      isLoggingIn: false
    };
  }),
);

export function loginReducer(state: LoginState, action: Action<string>) {
  return reducer(state, action);
}
