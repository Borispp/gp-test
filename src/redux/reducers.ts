import { combineReducers, Reducer } from 'redux';
import { SchedulesState, schedulesReducer } from './schedules/reducer';
import { ScheduleState, scheduleReducer } from './schedule/reducer';

/**
 * Interface for global Redux-store
 */
export interface RootState {
  schedules: SchedulesState;
  schedule: ScheduleState;
}

/**
 * Combine all the reducers for our web application here.
 *
 * routerReducer: React Router can now be controlled via Redux store,
 * use store.dispatch(push('/reports')) to dispatch navigation actions
 */
export const reducers: Reducer<RootState> = combineReducers<RootState>({
  schedules: schedulesReducer,
  schedule: scheduleReducer
});
