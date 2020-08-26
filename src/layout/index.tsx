import React from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch, Redirect } from 'react-router-dom';
import s from './layout.module.scss';

function App() {
  return (
    <div className="App">
      <Router>
        <NavLink className={s.navbar_link} activeClassName="navbar_link_active" exact to="/questions">
          Questions
        </NavLink>
        <NavLink className="navbar_link" activeClassName="navbar_link_active" exact to="/ranking">
          Ranking
        </NavLink>
        <NavLink className="navbar_link" activeClassName="navbar_link_active" exact to="/mining">
          Mining
        </NavLink>
        <Switch>
          <Redirect from="/" to="/ranking" exact />
          <Route path="/questions" exact component={() => <div>HOME</div>} />
          <Route path="/ranking" exact component={() => <div>Ranking</div>} />
          <Route path="/mining" exact component={() => <div>Mining</div>} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
