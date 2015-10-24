'use strict';

var React = require('react/addons');
require('../styles/match.css');
var moment = require('moment');

module.exports = React.createClass({
	render: function() {
		var match = this.props.match;

		if (!match.person) {
			return null;
		}

		var imgSrc;
		var thumbs;
		if (match.person.photos) {
			imgSrc = match.person.photos[0].processedFiles[3].url;
			var files = match.person.photos.slice(1)
			thumbs = files.map(function(file) {
				return file.processedFiles[2].url
			})
			thumbs = thumbs.map(function(thumb) {
				return <div className="match-photo-thumb-container"><div className="match-photo-thumb-control"></div><img src={thumb} className="match-photo-thumb" /></div>
			})
		}

		var classes = ['list-group-item match'];
		if (match.messages && match.messages.length >= 4) {
			//classes.push('highlight');
		}

		if (!match.viewed) {
			classes.push('highlight');
		}		

		if (this.props.selectedMatch === match._id) {
			classes.push('selected')
		}

		return (<li className={classes.join(' ')}>
				<div className="row" onClick={this.props.selectMatch(match.id)}>
					<div className="photo col-xs-3">
						<img src={imgSrc} className="match-photo" />
						<p>{thumbs}</p>
					</div>
					<div className="bio col-xs-7">
						<h3>{match.person.name}, {moment().diff(moment(match.person.birth_date), 'years')}</h3>
						<p>{match.person.bio}</p>
						<p><i>Matched {moment(match.created_date).fromNow()} | Last activity {moment(match.last_activity_date).fromNow()}</i></p>
					</div>
					<div className="stats col-xs-2 text-center">
						<div className="row">
							<div className="col-xs-12 stat">
								<h3>{match.messages && match.messages.length || '0'}</h3> messages
							</div>
							<div className="col-xs-12 stat">
								<h3>{match.common_friend_count}</h3> mutual friends
							</div>
						</div>
					</div>
				</div></li>);
	}
});
