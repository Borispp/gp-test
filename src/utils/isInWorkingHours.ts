import { Schedule } from 'redux/schedule/reducer';

/**
 * Takes Schedule and check if store is open
 * @param {time} string
 */

const isInWorkingHours = (schedule: Schedule): boolean => {
  if (schedule) {
    const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
    const date = new Date();
    const utcHours = date.getUTCHours();
    const utcMinutesWithoutZero = date.getUTCMinutes();
    const utcMinutes = utcMinutesWithoutZero < 10 ? '0' + utcMinutesWithoutZero : utcMinutesWithoutZero;
    const utcDay = days[date.getUTCDay() - 1];

    // If closed all day
    if (!schedule[utcDay]) {
      return false;
    }

    // If open all day
    if (schedule[utcDay].length === 1 && schedule[utcDay][0].from === '00:00' && schedule[utcDay][0].to === '00:00') {
      return true;
    }

    return schedule[utcDay].some(period => {
      const from = +period.from.replace(':', '');
      const to = +period.to.replace(':', '');
      const currentTime = +`${utcHours}${utcMinutes}`;

      return (currentTime >= from && currentTime < to);
    });
  }
  return false;
};

export { isInWorkingHours };
