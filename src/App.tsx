import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { HomePage } from 'pages/HomePage';
import { SchedulePage } from 'pages/SchedulePage';

import './styles/core.scss';

/**
 * The main reporting application. Defines the routes for the main content
 */
class App extends Component<{}, {}> {

  /**
   * Renders the application
   */
  public render(): JSX.Element {
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Route path='/' exact component={HomePage} />
            <Route path='/schedule/:name' exact component={SchedulePage} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export { App };
