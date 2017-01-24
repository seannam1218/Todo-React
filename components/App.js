var React = require('react');
var ReactDOM = require('react-dom');

var App = React.createClass({

	handleDeleteClick: function (e) {
		e.preventDefault();
		var confirmDelete = confirm("Are you sure you want to delete every item on the list?");
		if (confirmDelete) {
			document.getElementById('list').innerHTML = "";
		}
	},

	handleSaveClick: function (e) {
		e.preventDefault();
		console.log("save clicked")
	},
	
	/*handleSubmit: function (e) {
		e.preventDefault();
		//var value = e.target.childNodes[4].value;
		var value = document.getElementsByClassName("form-input")[0].value
		p = document.createElement("p");
		p.innerHTML = "- " + value;
		document.getElementById("list").appendChild(p);
	},*/
	
	render: function () {
		return (
			<div>
				<Form 
					description = "Add a new item" 
					//onSubmit = {this.handleSubmit}
				/>
				<DeleteAllButton onDeleteClick = {this.handleDeleteClick} />
				<SaveAllButton onSaveClick = {this.handleSaveClick} />
				<div id = "list"></div>
			</div>
		)
	}
});

var Form = React.createClass({
	
	handleSubmit: function (e) {
		e.preventDefault();
		//var value = e.target.childNodes[4].value;
		var value = document.getElementsByClassName("form-input")[0].value
		p = document.createElement("p");
		p.innerHTML = "- " + value;
		document.getElementById("list").appendChild(p);
	},
	
	render: function () {
		return (
			<form onSubmit = {this.handleSubmit}>
				{this.props.description}<br />
				<input className = "form-input" type = "text" />
				<input type = "submit" value = "Submit" />
			</form>
		)
	}
})

var DeleteAllButton = React.createClass({
	render: function () {
		return (
			<button onClick = {this.props.onDeleteClick}>Delete all</button>
		)
	}
})

var SaveAllButton = React.createClass ({
	render: function () {
		return (
			<button onClick = {this.props.onSaveClick}>Save work</button>
		)
	}
})


module.exports = App;