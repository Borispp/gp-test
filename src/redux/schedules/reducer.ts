import { Reducer } from 'redux';
import { SchedulesActions, actionTypeKeys } from './actions';

import { Schedule } from 'redux/schedule/reducer';

/**
 * Single schedule interface
 */
export interface SchedulesState {
  result: Schedule[] | null;
  error?: string | null;
}

const initialSchedulesState: SchedulesState = {
  result: []
};

/**
 * Schedules reducer
 */
export const schedulesReducer: Reducer<SchedulesState> =
  (state: SchedulesState = initialSchedulesState, action: SchedulesActions): SchedulesState => {
  switch (action.type) {
    case actionTypeKeys.SET_SCHEDULES:
      return {...state, result: action.schedules };
    case actionTypeKeys.SET_SCHEDULES_ERROR:
      return {...state, result: [], error: action.error };
    case actionTypeKeys.CLEAR_SCHEDULES:
      return {...state, result: [], error: null };
    default:
      return state;
  }
};
