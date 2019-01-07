import React, { PureComponent } from 'react';

import LoadingIcon from 'images/loading.svg';

/**
 * Loading component
 */
const Loading: React.SFC<{}> = (): JSX.Element => (
  <LoadingIcon className='loading-icon' />
);

export { Loading };
