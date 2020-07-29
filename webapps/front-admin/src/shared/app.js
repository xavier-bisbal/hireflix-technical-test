import React, { Suspense } from 'react';

import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import './app.scss';

const PositionList = React.lazy(() => import('screens/candidate-list'));

const App = () => (
  <div className="app">
    <Router>
      <Suspense fallback={<div>loading</div>}>
        <Switch>
          <Route path="/" component={PositionList} />
        </Switch>
      </Suspense>
    </Router>
  </div>
);

App.propTypes = {};

export default App;
