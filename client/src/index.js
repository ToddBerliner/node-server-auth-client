import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Signedup from './components/auth/signedup';
import Welcome from './components/welcome';
import RequireAuth from './components/auth/require_auth';
import Protected from './components/protected';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Welcome}/>
        <Route path="signout" component={Signout} />
        <Route path="signin" component={Signin} />
        <Route path="signup" component={Signup} />
        <Route path="protected" component={RequireAuth(Protected)} />
        <Route path="signedup" component={Signedup} />
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
