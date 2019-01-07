import React, { PureComponent } from 'react';
import TimePicker from 'react-times';

import { db } from 'config/firebase';

import { IScheduleHoursRange } from 'redux/schedule/reducer';

import { Input } from 'components/Atoms/Input';
import { Checkbox } from 'components/Atoms/Checkbox';

/**
 * Interface for props we are going to map to the component properties
 */
interface AddScheduleFormProps {
  closeModal(): void;
}

/**
 * Interface for component state
 */
interface AddScheduleFormState {
  name: string;
  mon: IScheduleHoursRange[];
  tue: IScheduleHoursRange[];
  wed: IScheduleHoursRange[];
  thu: IScheduleHoursRange[];
  fri: IScheduleHoursRange[];
  sat: IScheduleHoursRange[];
  sun: IScheduleHoursRange[];
  errors: { name?: string };
  error?: string;
}

/**
 * Schedules list component
 */
export class AddScheduleForm extends PureComponent<AddScheduleFormProps, AddScheduleFormState> {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      mon: [{from: '9:00', to: '18:00'}],
      tue: [{from: '9:00', to: '18:00'}],
      wed: [{from: '9:00', to: '18:00'}],
      thu: [{from: '9:00', to: '18:00'}],
      fri: [{from: '9:00', to: '18:00'}],
      sat: [{from: '9:00', to: '18:00'}],
      sun: [{from: '9:00', to: '18:00'}],
      errors: {}
    };
  }

  // Cant't set dynamic values to state with typescript ([kind]: value)
  // tslint:disable-next-line:no-any
  private onInputTextChange = (name: any, value: string): void => {
    this.setState({
      [name]: value
    });
  }

  // event: React.FormEvent<HTMLInputElement>
  // tslint:disable-next-line:no-any
  private handleSubmit = async (event: any): Promise<void> => {
    event.preventDefault();
    const { name, mon, tue, wed, thu, fri, sat, sun } = this.state;
    const errors: { name?: string } = {};

    this.setState({ errors: {} });

    if (!name) {
      errors.name = 'Name is required';
    }

    this.setState({ errors });

    if (Object.keys(errors).length === 0) {
      try {
        await db.ref('schedules').push({ name, mon, tue, wed, thu, fri, sat, sun });
        this.props.closeModal();
      } catch (e) {
        console.log(e.message);
      }
    }
  }

  // tslint:disable-next-line:no-any
  private onTimeChange = (day: any, type: string, index: number) => ({ hour, minute }: { hour: string, minute: string}): void => {
    this.dayRefs[`${day}Is24`].onCheckboxChange({ target: { checked: false } });

    this.setState(prevState => {
      const dayTimes = [...prevState[day]];
      dayTimes[index] = {...dayTimes[index], [type]: `${hour}:${minute}` };

      return { [day]: dayTimes };
    });
  }

  // tslint:disable-next-line:no-any
  private onCheckboxChange = (day: any, type: string) => (name: string, checked: boolean): void => {
    if (type === 'isClosed') {
      if (checked === true) {
        this.dayRefs[`${day}Is24`].onCheckboxChange({ target: { checked: false } });
        this.setState({ [day]: [] });
      } else {
        this.setState({ [day]: [{ from: '9:00', to: '18:00' }] });
      }
    }
    if (type === 'is24' && checked === true) {
      this.dayRefs[`${day}IsClosed`].onCheckboxChange({ target: { checked: false } });

      this.setState({ [day]: [{ from: '00:00', to: '00:00' }] });
    }
  }

  private dayRefs: {} = {};

  private setInstance = (name: string) => instance => { this.dayRefs[name] = instance; };

  // tslint:disable-next-line:no-any
  private renderDay = (day: any) => {
    const dayState = this.state[day];
    return (
      <div className='the-add-schedule-form__field the-add-schedule-form__field-day'>
        <span className='the-add-schedule-form__field-label'>{day}</span>
        <div className={`the-add-schedule-form__field-time ${dayState.length === 0 ? 'isClosed' : ''}`}>
          <TimePicker theme='classic' time={dayState[0] ? dayState[0].from : '09:00'} onTimeChange={this.onTimeChange(day, 'from', 0)} />
        </div>
        <div className={`the-add-schedule-form__field-time ${dayState.length === 0 ? 'isClosed' : ''}`}>
          <TimePicker theme='classic' time={dayState[0] ? dayState[0].to : '18:00'} onTimeChange={this.onTimeChange(day, 'to', 0)} />
        </div>
        <div className='the-add-schedule-form__field-time-checks'>
          <Checkbox
            name={`${day}IsClosed`}
            label='Is closed?'
            onChange={this.onCheckboxChange(day, 'isClosed')}
            ref={this.setInstance(`${day}IsClosed`)}
          />
          <Checkbox
            name={`${day}Is24`}
            label='Is 24/24'
            onChange={this.onCheckboxChange(day, 'is24')}
            ref={this.setInstance(`${day}Is24`)}
          />
        </div>
      </div>
    );
  }

  public render(): JSX.Element {
    const { errors } = this.state;

    return (
      <React.Fragment>
        <form className='the-add-schedule-form' onSubmit={this.handleSubmit}>
          <h1 className='the-headline'>Add schedule</h1>

          <div className='the-add-schedule-form__body'>
            <div className='the-add-schedule-form__field'>
              <Input
                name='name'
                onChange={this.onInputTextChange}
                label='Name'
                error={errors.name ? errors.name : undefined}
              />
            </div>

            <div className='the-add-schedule-form__field-days'>
              <div className='the-add-schedule-form__field the-add-schedule-form__field-day'>
                <span className='the-add-schedule-form__field-label' />
                <div className='the-add-schedule-form__field-time'>
                  <span className='the-add-schedule-form__field-label'>From (UTC)</span>
                </div>
                <div className='the-add-schedule-form__field-time'>
                  <span className='the-add-schedule-form__field-label'>To (UTC)</span>
                </div>
                <div className='the-add-schedule-form__field-time-checks' />
              </div>
              {this.renderDay('mon')}
              {this.renderDay('tue')}
              {this.renderDay('wed')}
              {this.renderDay('thu')}
              {this.renderDay('fri')}
              {this.renderDay('sat')}
              {this.renderDay('sun')}
            </div>

            <div className='the-add-schedule-form__controls'>
              <button className='the-button green' type='submit'>Submit</button>
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}
