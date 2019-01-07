import { db } from 'config/firebase';
// import { getSchedulesRequest } from 'api/requests';
import { Schedule } from '../schedule/reducer';

/**
 * Schedules actions constants
 */
export enum actionTypeKeys {
  SET_SCHEDULES = 'SET_SCHEDULES',
  SET_SCHEDULES_ERROR = 'SET_SCHEDULES_ERROR',
  CLEAR_SCHEDULES = 'CLEAR_SCHEDULES'
}

/**
 * Schedules actions
 */
export type SchedulesActions =
  { type: actionTypeKeys.SET_SCHEDULES, schedules: Schedule[] }
  | { type: actionTypeKeys.SET_SCHEDULES_ERROR, error: string }
  | { type: actionTypeKeys.CLEAR_SCHEDULES };

/**
 * Set schedules error in redux
 */
export const setSchedulesError = error => ({
  type: actionTypeKeys.SET_SCHEDULES_ERROR,
  error
});

/**
 * Request schedules and set result or error in redux
 */
export const setSchedules = () => async (dispatch) => {

  // TODO:
  // Will be great to handle firebase.database().ref(".info/connected")
  // And show network error for case if we are offline
  db.ref('schedules').on('value', snapshot => {
    const schedules = snapshot.val();

    dispatch({
      type: actionTypeKeys.SET_SCHEDULES,
      schedules
    });
  });
};

/**
 * Clear schedules list and errors
 */
export const clearSchedules = () => ({
  type: actionTypeKeys.CLEAR_SCHEDULES
});
