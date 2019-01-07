import { createSelector } from 'reselect';
import get from 'lodash/get';

//tslint:disable-next-line typedef
const getState = state => get(state, 'schedule');

/**
 * Get schedule
 */
//tslint:disable-next-line typedef
export const getSchedule = createSelector(getState, state => get(state, 'result'));
