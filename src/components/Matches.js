'use strict';

var React = require('react/addons');
var Match = require('./Match');

module.exports = React.createClass({
	render: function() {
		if (!this.props.matches) {
			return <div className="text-center">No matches yet</div>;
		}

		var matches = this.props.matches.concat().reverse().map(function(match) {
			return (<Match
						selectedMatch={this.props.matchId}
						key={match._id}
						match={match}
						selectMatch={this.props.selectMatch} />);
		}, this);

		return <div><ul className="list-group">{matches}</ul></div>;
	}
});
