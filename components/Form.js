var React = require('react');
var ReactDOM = require('react-dom');

var Form = createClass ({
	render: function () {
		<form>
			Add items:<br>
			<input type = "text">
			<button>Submit</button>
		</form>
	}
})

module.exports = Form;