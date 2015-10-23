'use strict';

var DatingDashboardApp = require('./DatingDashboardApp');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var content = document.getElementById('wrapper');

var Routes = (
  <Route handler={DatingDashboardApp}>
    <Route name="/" handler={DatingDashboardApp}/>
  </Route>
);

Router.run(Routes, function (Handler) {
  React.render(<Handler/>, content);
});
