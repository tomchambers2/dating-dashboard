'use strict';

var React = require('react/addons');

require('../styles/bubbles.css');
require('../styles/message.css');

var me = require('json!../../config.json').me;

module.exports = React.createClass({
	render: function() {
		var classes = ['triangle-isosceles'];
		if (this.props.message.from === me) {
			classes.push('right');
			var you = (<div className="col-xs-1 text-left">
				<img src={this.props.toImg} className="message-icon" />
			</div>);
		} else {
			classes.push('left');
			var them = (<div className="col-xs-1 text-right">
				<img src={this.props.fromImg} className="message-icon" />
			</div>);
		}


		return (
			<div className="message">
				<div className="row">
					{them}
					<div className="col-xs-10">
						<div className={classes.join(' ')}>
							{this.props.message.message}
						</div>
					</div>
					{you}
				</div>
			</div>
		);
	}
});
