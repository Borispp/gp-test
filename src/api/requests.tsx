/**
 * @file A point for all requests
 */

import axios, { AxiosPromise } from 'axios';
// import map from 'lodash/map';
const api = require('./api.json'); // tslint:disable-line:typedef no-var-requires

/**
 * Get all schedules
 */
export const getSchedulesRequest: () => AxiosPromise = (): AxiosPromise =>
  axios.get(
    api.schedules,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

/**
 * Get single schedule
 */
export const getScheduleRequest: () => AxiosPromise = (): AxiosPromise =>
  axios.get(
    api.schedules,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
