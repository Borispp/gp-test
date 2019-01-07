import { Reducer } from 'redux';
import { ScheduleActions, actionTypeKeys } from './actions';

/**
 * Interface for Hour range
 */
export interface IScheduleHoursRange {
  from: string;
  to: string;
}

/**
 * Interface for Schedule reducer
 */
export interface Schedule {
  name: string;
  mon?: IScheduleHoursRange[];
  tue?: IScheduleHoursRange[];
  wed?: IScheduleHoursRange[];
  thu?: IScheduleHoursRange[];
  fri?: IScheduleHoursRange[];
  sat?: IScheduleHoursRange[];
  sun?: IScheduleHoursRange[];
}

/**
 * Single schedule interface
 */
export interface ScheduleState {
  result: Schedule | null;
  error?: string | null;
}

const initialScheduleState: ScheduleState = {
  result: null
};

/**
 * Schedules reducer
 */
export const scheduleReducer: Reducer<ScheduleState> =
  (state: ScheduleState = initialScheduleState, action: ScheduleActions): ScheduleState => {
  switch (action.type) {
    case actionTypeKeys.SET_SCHEDULE:
      return {...state, result: action.schedule };
    case actionTypeKeys.SET_SCHEDULE_ERROR:
      return {...state, result: null, error: action.error };
    case actionTypeKeys.CLEAR_SCHEDULE:
      return {...state, result: null, error: null };
    default:
      return state;
  }
};
