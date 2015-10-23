'use strict';

describe('DatingDashboardApp', () => {
  let React = require('react/addons');
  let DatingDashboardApp, component;

  beforeEach(() => {
    let container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    DatingDashboardApp = require('components/DatingDashboardApp.js');
    component = React.createElement(DatingDashboardApp);
  });

  it('should create a new instance of DatingDashboardApp', () => {
    expect(component).toBeDefined();
  });
});
