var React = require('react');
var ReactDOM = require('react-dom');

var App = React.createClass({
	
	handleChange: function(e) {
		console.log(e.target);
	},
	
	handleSubmit: function (e) {
		e.preventDefault();
		var value = e.target;
		console.log("submitted: " + value);
		p = document.createElement("p");
		p.innerHTML = "wowomg"
		document.getElementById("app").appendChild(p);
	},
	
	render: function () {
		return (
			<Form 
				description = "Add items" 
				onSubmit = {this.handleSubmit}
				onChange = {this.handleChange}
			/>
		)
	}
});

var Form = React.createClass({
	render: function () {
		return (
			<form onSubmit = {this.props.onSubmit}>
				{this.props.description}<br />
				<input type = "text" onChange = {this.props.onChange} />
				<input type = "submit" value = "Submit" />
			</form>
		)
	}
})



module.exports = App;