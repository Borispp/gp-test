import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { History } from 'history';
import map from 'lodash/map';

import { db } from 'config/firebase';
const routes = require('routes/routes.json');

import { RootState } from 'redux/reducers';
import { setSchedule, clearSchedule } from 'redux/schedule/actions';
import { getSchedule } from 'redux/schedule/selectors';
import { Schedule } from 'redux/schedule/reducer';

import { getHumanReadableSchedule } from 'utils/getHumanReadableSchedule';
import { isInWorkingHours } from 'utils/isInWorkingHours';
import { getHumanReadableNextWorkingHours } from 'utils/getHumanReadableNextWorkingHours';

import { Loading } from 'components/Atoms/Loading';

import StoreCloseIcon from 'images/store-close.svg';

/**
 * Interface for props receiving from parent
 */

interface ScheduleParentProps {
  id: string;
  history: History;
}

/**
 * Interface for props we are going to map to the component properties
 */
interface ScheduleMapProps {
  schedule: Schedule;
}

/**
 * Interface for dispatch methods we are going to map to the component properties
 */
interface ScheduleDispatch {
  setSchedule(id: string): void;
  clearSchedule(): void;
}

/**
 * Interface for all props
 */
type ScheduleProps = ScheduleParentProps & ScheduleMapProps & ScheduleDispatch;

/**
 * Interface for component state
 */
interface ScheduleState {
  offset: number;
}

/**
 * Schedule component
 */
class ScheduleComponent extends PureComponent<ScheduleProps, ScheduleState> {
  constructor(props: ScheduleProps) {
    super(props);

    this.state = {
      offset: new Date().getTimezoneOffset() / 60
    };
  }

  public async componentDidMount(): Promise<void> {
    this.props.setSchedule(this.props.id);
  }

  public componentWillUnmount(): void {
    this.props.clearSchedule();
    db.ref(`schedules/${this.props.id}`).off();
  }

  private deleteStoreSchedule = async (): Promise<void> => {
    await db.ref(`schedules/${this.props.id}`).remove();
    this.props.history.push(routes.home);
  }

  public render(): JSX.Element {
    const { schedule } = this.props;
    const { offset } = this.state;

    const isInWorkingHoursResult = isInWorkingHours(schedule);
    let humanReadableNextWorkingHours = 'Store is open';

    if (!isInWorkingHoursResult) {
      humanReadableNextWorkingHours = getHumanReadableNextWorkingHours(schedule);
    }

    return (
      <React.Fragment>
        {schedule && (
          <div className='the-schedule'>
            <div className='the-schedule__headline'>
              <h1 className='the-headline'>{schedule.name}</h1>

              <div className='the-schedule__headline-status'>
                <div className='the-schedule__headline-status-text'>{humanReadableNextWorkingHours}</div>
                <div className={`the-schedule__headline-status-highlight ${isInWorkingHoursResult ? 'open' : 'close'}`} />
              </div>
            </div>
            <p className='the-schedule__description'>Time is presented in UTC timezone, your offset is <b>{-offset} hours</b></p>

            {Object.keys(schedule).length > 1 && (
              <div className='the-schedule__list'>
                {map(getHumanReadableSchedule(schedule), period => {
                  const periodArr = period.split(': ');
                  return (
                    <div key={period} className='the-schedule__item'>
                      <b className='the-schedule__day-label'>{periodArr[0]}:&nbsp;</b>
                      <span className='the-schedule__day-value'>{periodArr[1]}</span>
                    </div>
                  );
                })}
              </div>
            )}

            {Object.keys(schedule).length === 1 && (
              <div className='the-schedule__closed'>
                <StoreCloseIcon className='the-schedule__closed-icon' />
                <p className='the-schedule__closed-description'>
                  It seems that the store does't work at all
                </p>
              </div>
            )}

            <div className='the-schedule__controls'>
              <button onClick={this.deleteStoreSchedule} className='the-button red'>
                Delete schedule
              </button>
            </div>
          </div>
        )}

        {!schedule && (
          <div className='the-schedule__loading'>
            <Loading />
          </div>
        )}
      </React.Fragment>
    );
  }
}

/**
 * Map Redux store state to component props
 */
function mapStateToProps(state: RootState): ScheduleMapProps {
  return {
    schedule: getSchedule(state)
  };
}

/**
 * Map dispatch functions to props for use in component
 */
//tslint:disable-next-line typedef
const mapDispatchToProps = {
  setSchedule,
  clearSchedule
};

const ScheduleSingle = connect<ScheduleMapProps, ScheduleDispatch, {}, RootState>(mapStateToProps, mapDispatchToProps)(ScheduleComponent);

export { ScheduleSingle };
