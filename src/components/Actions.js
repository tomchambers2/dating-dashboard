'use strict';

var React = require('react/addons');
var moment = require('moment');

require('../styles/actions.css');

var typeIcons = {
	like: '<i class="fa fa-thumbs-o-up"></i>',
	dislike: '<i class="fa fa-thumbs-o-down"></i>',
	message: '<i class="fa fa-envelope-o"></i>'
}

module.exports = React.createClass({
	render: function() {
		var actions;
		if (this.props.actions.length) {
			actions = _.values(this.props.actions).reverse().map(function(action) {
				var imgSrc;
				if (action.match.photos) {
					imgSrc = action.match.photos[0].processedFiles[3].url;
				}

				return <tr className={'action ' + action.type}>
					<td><img src={imgSrc} className="action-photo" /></td>
					<td>{action.match.name}</td>
					<td>
						<div dangerouslySetInnerHTML={{__html: typeIcons[action.type]}}></div></td>
					<td>{action.text || action.score.toFixed(2)}</td>
					<td>{moment(action.timestamp).fromNow()}</td>
				</tr>;
			});
		}

		return (<div>
			<table className="table">
				<tbody>
					{actions}
				</tbody>
			</table>
		</div>);
	}
});
