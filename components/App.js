var React = require('react');
var ReactDOM = require('react-dom');
var Form = require('./components/Form');

var App = React.createClass({
	render: function () {
		return (
			<div>
				<Form />
			</div>
		)
	}
});

module.exports = App;