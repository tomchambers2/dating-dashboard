'use strict';

var React = require('react/addons');
var BarChart = require("react-chartjs").Bar;

module.exports = React.createClass({
	render: function() {
		console.log(this.props.stats)

		var distribution = this.props.stats && this.props.stats.distribution || [];

		var chartOptions = {
			animation: false,
			legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
		};

		var data = {
		    labels: ["0", "1", "2", "3", "4", "5", "6","7"],
		    datasets: [
		        {
		            label: "My First dataset",
		            fillColor: "rgba(220,220,220,0.5)",
		            strokeColor: "rgba(220,220,220,0.8)",
		            highlightFill: "rgba(220,220,220,0.75)",
		            highlightStroke: "rgba(220,220,220,1)",
		            data: distribution
		        }
		    ]
		};

		var firstLines = Object.keys(this.props.stats.firstLines).map(function (key) {
			console.log(key)
			console.log(this.props.stats.firstLines[key])
			return <tr><td>{key}</td><td>{this.props.stats.firstLines[key]}</td></tr>
		}.bind(this))
		//console.log(firstLines)

		return (
			<div className="row">
				<div className="col-md-12 col-xs-12 text-center">
					<div className="row">
						<div className="col-xs-3">
							<h1>{this.props.stats.matches}</h1>
							<p>matches</p>
						</div>
						<div className="col-xs-3">
							<h1>{this.props.stats.totalMessages}</h1>
							<p>messages exchanged</p>
						</div>						
						<div className="col-xs-3">
							<h1>{this.props.stats.actions.total}</h1>
							<p>actions</p>
							{this.props.stats.actions.likes} likes, {this.props.stats.actions.dislikes} dislikes and {this.props.stats.actions.messages} messages
						</div>
						<div className="col-xs-3">
							<h1>{this.props.stats.blocks}</h1>
							<p>blocks</p>
						</div>
					</div>
				</div>
				<div className="col-md-12 col-xs-12">
					<h3>Conversation length</h3>
					<BarChart data={data} options={chartOptions} redraw />
					<p>x: Number of messages exchanged, y: Frequency</p>
				</div>
				<div className="col-xs-12">
					<h3>First line success</h3>
					<table className="table table-striped">
						<tbody>
						<tr><td>Opening line</td> <td>Times replied to</td></tr>
							{firstLines}
						</tbody>
					</table>
				</div>
			</div>);
	}
});
