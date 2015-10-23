'use strict';

var React = require('react/addons');
var Message = require('./Message');

module.exports = React.createClass({
	render: function() {
		if (!this.props.messages || !this.props.messages.length) {
			return <div className="text-center"><h3>Click match to open chat</h3></div>;
		}

		var fromImg;
		if (this.props.match.person.photos) {
			fromImg = this.props.match.person.photos[0].processedFiles[3].url;
		}

		var toImg = "images/calculon-icon.jpg"

		var messages = this.props.messages.map(function(message) {
			return <Message message={message} fromImg={fromImg} toImg={toImg} />;
		});

		return (
			<div>
				{messages}
			</div>
		);
	}
});
