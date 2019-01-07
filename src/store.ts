import * as redux from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import * as state from './redux/reducers';

/**
 * Apply middleware and Redux dev tools for building store later.
 * 'thunk' allows us to dispatch actions that can return a function instead of an action.
 */
const enhancer: redux.StoreEnhancer = composeWithDevTools(
    redux.applyMiddleware(thunk)
    // other store enhancers if any
);

/**
 * Create redux store using middleware and all reducers
 */
const store: redux.Store<object> = redux.createStore(
    state.reducers,
    {} as state.RootState,
    enhancer
);

export { store };
