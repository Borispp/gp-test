import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';

import LogoIcon from 'images/logo.svg';

/**
 * Header component
 */
class Header extends PureComponent<{}, {}> {
  public render(): JSX.Element {
    return (
      <NavLink className='the-header' to='/'>
        <LogoIcon className='the-header__logo' />
        <span className='the-header__text'>Schedules test</span>
      </NavLink>
    );
  }
}

export { Header };
