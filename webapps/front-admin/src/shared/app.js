import React, { Suspense } from 'react';

import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import './app.scss';

const PositionList = React.lazy(() => import('screens/candidate-list'));
const PositionDetail = React.lazy(() => import('screens/candidate-detail'));

const App = () => (
  <div className="app">
    <Router>
      <Suspense fallback={<div>loading</div>}>
        <Switch>
          <Route exact path="/" component={PositionList} />
          <Route exact path="/interview/:interviewId" component={PositionDetail} />
        </Switch>
      </Suspense>
    </Router>
  </div>
);

App.propTypes = {};

export default App;
