import { createReducer, on, Action } from '@ngrx/store';
import { hide, show } from './loading.actions';
import { LoadingState } from './LoadingState';

const initialState: LoadingState = {
  show: false
};

const reducer = createReducer(
  initialState,
  on(show, (state) => ({
    ...state,
    show: true
  })),
  on(hide, (state) => ({
    ...state,
    show: false
  }))
);

export function loadingReducer(state: LoadingState, action: Action<string>) {
  return reducer(state, action);
}
