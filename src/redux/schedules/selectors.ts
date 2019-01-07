import { createSelector } from 'reselect';
import get from 'lodash/get';

//tslint:disable-next-line typedef
const getState = state => get(state, 'schedules');

/**
 * Get array of schedules
 */
//tslint:disable-next-line typedef
export const getSchedulesList = createSelector(getState, state => get(state, 'result'));
