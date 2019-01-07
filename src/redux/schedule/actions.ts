import { db } from 'config/firebase';
import { Schedule } from './reducer';

/**
 * Schedule actions constants
 */
export enum actionTypeKeys {
  SET_SCHEDULE = 'SET_SCHEDULE',
  SET_SCHEDULE_ERROR = 'SET_SCHEDULE_ERROR',
  CLEAR_SCHEDULE = 'CLEAR_SCHEDULE'
}

/**
 * Schedule actions
 */
export type ScheduleActions =
  { type: actionTypeKeys.SET_SCHEDULE, schedule: Schedule }
  | { type: actionTypeKeys.SET_SCHEDULE_ERROR, error: string }
  | { type: actionTypeKeys.CLEAR_SCHEDULE };

/**
 * Set schedule error in redux
 */
export const setScheduleError = error => ({
  type: actionTypeKeys.SET_SCHEDULE_ERROR,
  error
});

/**
 * Request schedule and set result or error in redux
 */
export const setSchedule = (id: string) => async (dispatch) => {
  // TODO:
  // Will be great to handle firebase.database().ref(".info/connected")
  // And show network error for case if we are offline

  db.ref(`schedules/${id}`).on('value', snapshot => {
    dispatch({
      type: actionTypeKeys.SET_SCHEDULE,
      schedule: snapshot.val()
    });
  });
};

/**
 * Clear schedule list and errors
 */
export const clearSchedule = () => ({
  type: actionTypeKeys.CLEAR_SCHEDULE
});
