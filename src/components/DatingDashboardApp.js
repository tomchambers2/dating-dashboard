'use strict';

var React = require('react/addons');
var io = require('socket.io-client');
var socket = io('http://localhost:3000');
var _ = require('lodash');
var ReactFireMixin = require('reactfire')
var Firebase = require("firebase")
var db = new Firebase("https://tinder-bot.firebaseio.com/")

var Matches = require('./Matches');
var Messages = require('./Messages');
var Stats = require('./Stats');
var Actions = require('./Actions');

socket.on('error', function(err) {
    console.info('Websocket failed', err);
});

socket.on('disconnect', function() {
    console.error('Error: lost websocket connection');
});

var Matches = require('./matches');
var Messages = require('./messages');
var Stats = require('./stats');

// CSS
require('normalize.css');
require('../styles/main.css');
require('../styles/home.css');
require('../styles/panel.css');

var DatingDashboardApp = React.createClass({
    mixins: [ReactFireMixin],

    matchesLimit: 10,
    actionsLimit: 10,

    getInitialState: function() {
        return {
            data: {},
            actions: [],
            stats: {
                actions: {}
            }
        };
    },

    componentDidMount: function() {
        this.bindAsArray(db.child('matches').orderByChild('last_activity_date').limitToLast(this.matchesLimit), "matches")

        this.bindAsArray(db.child('actions').limitToLast(this.actionsLimit), "actions")

        this.bindAsObject(db.child('stats'), "stats")
    },

    selectMatch: function(matchId) {
        return function() {
            this.setState({
                matchId: matchId,
                match: _.findWhere(this.state.matches, { _id: matchId })
            });
            this.firebaseRefs.matches.child(matchId).update({ viewed: true })
        }.bind(this);
    },

    moreActions: function() {
        this.unbind('actions')
        this.actionsLimit += this.actionsLimit
        this.bindAsArray(db.child('actions').limitToLast(this.actionsLimit), "actions")        
    },

    moreMatches: function() {
        this.unbind('matches')
        this.matchesLimit += this.matchesLimit
        this.bindAsArray(db.child('matches').orderByChild('last_activity_date').limitToLast(this.matchesLimit), "matches")        
    },

    render: function() {
        if (this.state.matchId) {
            var messages = _.findWhere(this.state.matches, { _id: this.state.matchId }).messages;
        }

        var chatTitle;
        if (this.state.match) {
            chatTitle = "Chat with " + this.state.match.person.name;
        } else {
            chatTitle = "No match selected to chat"
        }

        return (
            <div className="outer-container">
                <nav className="navbar navbar-default">
                  <div className="container-fluid">
                    <div className="navbar-header">
                      <a className="navbar-brand" href="#">
                        <span><img src="images/calculon.png" className="logo" alt=""/> Robonova</span>
                      </a>
                    </div>
                  </div>
                </nav>
                <div className="container main-container">
                    <div className="row content">
                        <div className="col-md-6 col-xs-12 matches-container">
                            <div className="panel matches">
                                <div className="panel-heading"><h2>{this.state.matches && this.state.matches.length || 'No'} matches</h2></div>
                                <div className="panel-body">
                                    <Matches
                                        matches={this.state.matches}
                                        matchId={this.state.matchId}
                                        selectMatch={this.selectMatch} />
                                    <div className="row text-center">
                                        <div class="col-xs-12">
                                            <button className="btn-default btn" onClick={this.moreMatches}>More matches</button>
                                        </div>
                                    </div>                                        
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-xs-12 messages-container">
                            <div className="panel messages">
                                <div className="panel-heading">
                                    <h2>{chatTitle}</h2>
                                </div>
                                <div className="panel-body">
                                    <Messages messages={messages} match={this.state.match} />
                                </div>
                            </div>
                    
                            <div className="panel actions">
                                <div className="panel-heading">
                                    <h2>Robonova's automated actions</h2>
                                </div>                            
                                <div className="panel-body">
                                    <Actions actions={this.state.actions} />
                                    <div className="row text-center">
                                        <div class="col-xs-12">
                                            <button className="btn-default btn" onClick={this.moreActions}>More actions</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    
                            <div className="panel stats">
                                <div className="panel-heading">
                                    <h2>Statistics</h2>
                                </div>                            
                                <div className="panel-body">
                                    <Stats stats={this.state.stats} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = DatingDashboardApp;
