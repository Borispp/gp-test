import { Schedule, IScheduleHoursRange } from 'redux/schedule/reducer';

/**
 * Takes a 24-time and returns 12-hour time with am/pm
 * @param {time} string
 */
export const timeConvert24to12 = (time: string) => {
  const tmpArr = time.split(':');
  let time12 = '';

  if (tmpArr[0] === '12') {
    time12 = tmpArr[0] + ':' + tmpArr[1] + ' PM';
  } else {
    if (tmpArr[0] === '00') {
      time12 = '12:' + tmpArr[1] + ' AM';
    } else {
      if (+tmpArr[0] > 12) {
        time12 = (+tmpArr[0] - 12) + ':' + tmpArr[1] + ' PM';
      } else {
        time12 = (+tmpArr[0]) + ':' + tmpArr[1] + ' AM';
      }
    }
  }
  return time12;
};

/**
 * Takes a IScheduleHoursRange array and converts to humanReadable
 */
const periodsToHumanReadable = (schedulePeriod: (IScheduleHoursRange[] | undefined)[], day: string[]) => {

  // Возможно стоит упросить тернарные условия
  return schedulePeriod.map((dayPeriod, index) => (
    dayPeriod ?

      (dayPeriod.length === 1 && dayPeriod[0].from === '00:00' && dayPeriod[0].to === '00:00') ?
        `${day[index]}: 24/24`
        :
        `${day[index]}: ` + dayPeriod.map(
        periods =>
          `${timeConvert24to12(periods.from)} - ${timeConvert24to12(periods.to)}`
        ).join(', ')

      :
      `${day[index]}: Not working`
  ));
};

/**
 * Takes a Schedule and returns HumanReadableSchedule[]
 * @param {schedule} Schedule interface
 */
const getHumanReadableSchedule = (schedule: Schedule): string[] => {
  // const tue = [{ from: '9:00', to: '13:30'}, { from: '14:00', to: '18:00'}];

  if (schedule) {
    const { mon, tue, wed, thu, fri, sat, sun } = schedule;

    // В идеале, наверное, было бы лучше сначала проверить последовательные дубликаты массивов, а потом проводить над ними операции
    // Но в данном случае мне проще вначале перевести данные в строку и затем сравнивать строки
    const periodsToHumanReadableResult = periodsToHumanReadable(
      [mon, tue, wed, thu, fri, sat, sun],
      ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
    );

    const result: string[] = [];

    periodsToHumanReadableResult.forEach((period, index) => {
      if (index === 0) {
        result.push(period);
      } else {
        const periodDataCurrent = period.split(/:(.+)/);
        const periodDataPrevious = result[result.length - 1].split(/:(.+)/);

        if (periodDataCurrent[1] !== periodDataPrevious[1]) {
          result.push(period);
        } else {
          const previousFirstDay = periodDataPrevious[0].split(' - ')[0];
          const currentDay = periodDataCurrent[0];
          const currentPeriods = periodDataCurrent[1];

          result[result.length - 1] = `${previousFirstDay} - ${currentDay}:${currentPeriods}`;
        }
      }
    });

    return result;
  }

  return [];
};

export { getHumanReadableSchedule };
