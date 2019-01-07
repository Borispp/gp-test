import { Schedule } from 'redux/schedule/reducer';

import { timeConvert24to12 } from './getHumanReadableSchedule';

/**
 * Takes Schedule and returns when store opens
 * @param {time} string
 */

const getHumanReadableNextWorkingHours = (schedule: Schedule): string => {
  if (schedule) {
    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    const daysFull = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const date = new Date();
    const utcHours = date.getUTCHours();
    const utcMinutesWithoutZero = date.getUTCMinutes();
    const utcMinutes = utcMinutesWithoutZero < 10 ? '0' + utcMinutesWithoutZero : utcMinutesWithoutZero;
    const utcDayPosition = date.getUTCDay() - 1;

    for (let i = utcDayPosition; i < utcDayPosition + 7; i++) {
      const dayPosition = i < 7 ? i : i - 7;

      // If store is working that day
      if (schedule[days[dayPosition]]) {
        for (let j = 0; j < schedule[days[dayPosition]].length; j++) {

          const currentTime = +`${utcHours}${utcMinutes}`;
          const timeOpen = +schedule[days[dayPosition]][j].from.replace(':', '');

          // If store will open today
          if (currentTime < timeOpen && utcDayPosition === i) {
            return timeOpen - currentTime > 59 ?
              `Store will open today at ${timeConvert24to12(schedule[days[dayPosition]][j].from)}`
              :
              `Store will open in ${timeOpen - currentTime} minutes`;
          }

          // If store will open tomorrow
          if (utcDayPosition === i - 1) {
            return `Store will open tomorrow at ${timeConvert24to12(schedule[days[dayPosition]][j].from)}`;
          }

          // If store will open, but not today or tomorrow
          if (utcDayPosition !== i && utcDayPosition !== i - 1) {
            return `Store will open on ${daysFull[dayPosition]} at ${timeConvert24to12(schedule[days[dayPosition]][j].from)}`;
          }
        }
      }
    }
  }
  return '';
};

export { getHumanReadableNextWorkingHours };
