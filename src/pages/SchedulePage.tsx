import React, { PureComponent } from 'react';
import { History } from 'history';

import { Header } from 'components/Header';
import { ScheduleSingle } from 'components/ScheduleSingle';

/**
 * SchedulePage component props
 * match comes from react-router
 */
interface SchedulePageProps {
  match: {
    params: {
      name: string
    },
    path: string,
    url: string
  };
  history: History;
}

/**
 * Schedule page component
 */
class SchedulePage extends PureComponent<SchedulePageProps, {}> {
  public render(): JSX.Element {
    const { match: { params: { name }}, history} = this.props;

    return (
      <React.Fragment>
        <Header />
        <div className='the-schedule-page'>
          <ScheduleSingle id={name} history={history} />
        </div>
      </React.Fragment>
    );
  }
}

export { SchedulePage };
