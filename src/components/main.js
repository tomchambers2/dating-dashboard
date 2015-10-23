'use strict';

var DatingDashboardApp = require('./DatingDashboardApp');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Matches = require('./Matches')

var content = document.getElementById('wrapper');

var Routes = (
  <Route handler={DatingDashboardApp}>
    <Route name="/" handler={DatingDashboardApp}/>
    <Route name="/demo" handler={Matches}/>
  </Route>
);

Router.run(Routes, function (Handler) {
	console.log('routes')
  React.render(<Handler/>, content);
});
