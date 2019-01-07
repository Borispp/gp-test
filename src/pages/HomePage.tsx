import React, { PureComponent } from 'react';

import { Header } from 'components/Header';
import { Schedules } from 'components/Schedules';

/**
 * Home page component
 */
class HomePage extends PureComponent<{}, {}> {
  public render(): JSX.Element {
    return (
      <React.Fragment>
        <Header />
        <div className='the-home-page'>
          <Schedules />
        </div>
      </React.Fragment>
    );
  }
}

export { HomePage };
