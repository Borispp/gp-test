import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Rodal from 'rodal';
import map from 'lodash/map';

import { db } from 'config/firebase';
const routes = require('routes/routes.json');

import { RootState } from 'redux/reducers';
import { setSchedules } from 'redux/schedules/actions';
import { getSchedulesList } from 'redux/schedules/selectors';
import { Schedule } from 'redux/schedule/reducer';

import { withParams } from 'utils/withParams';

import { AddScheduleForm } from 'components/AddScheduleForm';
import { Loading } from 'components/Atoms/Loading';

import { isInWorkingHours } from 'utils/isInWorkingHours';

import EmptyIcon from 'images/empty.svg';
import CloseIcon from 'images/close.svg';

/**
 * Interface for props we are going to map to the component properties
 */
interface SchedulesMapProps {
  schedules: Schedule[] | null;
}

/**
 * Interface for dispatch methods we are going to map to the component properties
 */
interface SchedulesDispatch {
  setSchedules(): void;
}

/**
 * Interface for component state
 */
interface SchedulesState {
  isAddScheduleForm: boolean;
}

/**
 * Schedules list component
 */
class SchedulesComponent extends PureComponent<SchedulesMapProps & SchedulesDispatch, SchedulesState> {
  constructor(props) {
    super(props);

    this.state = {
      isAddScheduleForm: false
    };
  }

  public async componentDidMount(): Promise<void> {
    this.props.setSchedules();

    // UPDATE
    // db.ref('schedules/-LVUD3Odqw_KIj9b1HBP').set({ name: 'And', mon: [{ from: '9:00', to: '23:00' }] });
  }

  public componentWillUnmount(): void {
    db.ref('schedules').off();
  }

  private showAddScheduleForm = (): void => { this.setState({ isAddScheduleForm: true }); };

  private hideAddScheduleForm = (): void => { this.setState({ isAddScheduleForm: false }); };

  private deleteStoreSchedule = (id: string) => (): void => {
    db.ref(`schedules/${id}`).remove();
  }

  public render(): JSX.Element {
    const { schedules } = this.props;

    return (
      <div className='the-schedules'>
        <h1 className='the-headline'>Stores</h1>

        {schedules === null && (
          <div className='the-schedules__empty'>
            <EmptyIcon className='the-schedules__empty-icon' />
            <h2 className='the-headline'>The schedules list is empty</h2>
            <p className='the-schedules__empty-description'>Add your first schedule</p>
          </div>
        )}

        {schedules  && (
          <div className='the-schedules__list'>
            {map(Object.keys(schedules), key => (
              <div className='the-schedules__list-item' key={key}>
                <NavLink to={withParams(routes.schedulePage, { name: key })} className='the-schedules__name'>
                  <div
                    className={`the-schedules__headline-status-highlight ${isInWorkingHours(schedules[key]) ? 'open' : 'close'}`}
                  />
                  {schedules[key].name}
                </NavLink>
                <span role='button' className='the-schedules__list-remove' onClick={this.deleteStoreSchedule(key)}>
                  Delete
                  <CloseIcon className='the-schedules__list-remove-icon' />
                </span>
              </div>
            ))}
          </div>
        )}

        {schedules && schedules.length === 0 && (
          <div className='the-schedules__loading'>
            <Loading />
          </div>
        )}

        <div className='the-schedules__controls'>
          <button onClick={this.showAddScheduleForm} className='the-button green'>
            Add schedule
          </button>
        </div>

        <Rodal visible={this.state.isAddScheduleForm} onClose={this.hideAddScheduleForm} animation='slideDown'>
          <AddScheduleForm closeModal={this.hideAddScheduleForm} />
        </Rodal>
      </div>
    );
  }
}

/**
 * Map Redux store state to component props
 */
function mapStateToProps(state: RootState): SchedulesMapProps {
  return {
    schedules: getSchedulesList(state)
  };
}

/**
 * Map dispatch functions to props for use in component
 */
//tslint:disable-next-line typedef
const mapDispatchToProps = {
  setSchedules
};

// To prevent duplicating the types https://stackoverflow.com/a/37375058/6193039
//tslint:disable-next-line typedef
const Schedules = connect<SchedulesMapProps, SchedulesDispatch, {}, RootState>(mapStateToProps, mapDispatchToProps)(SchedulesComponent);

export { Schedules };
