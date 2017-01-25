var React = require('react');
var ReactDOM = require('react-dom');

var App = React.createClass({
	render: function () {
		return (
			<div>
				<Form />
				<DeleteAllButton />
				<SaveAllButton />
				<LoadButton />
				<div id = "list"></div>
			</div>
		)
	}
});

var Form = React.createClass({
	description: "Add a new item",
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
				{this.description}<br />
				<input className = "form-input" type = "text" />
				<input type = "submit" value = "Submit" />
			</form>
		)
	}
})

var DeleteAllButton = React.createClass({
	handleClick: function (e) {
		e.preventDefault();
		var confirmDelete = confirm("Are you sure you want to delete every item on the list?");
		if (confirmDelete) {
			document.getElementById('list').innerHTML = "";
		}
	},
	render: function () {
		return (
			<button onClick = {this.handleClick}>Delete all</button>
		)
	}
})

var SaveAllButton = React.createClass ({
	savedTexts: function () {
		var items = document.getElementById('list').querySelectorAll('p');
		var itemsArray = [];
		for (var i = 0; i < items.length; i++) {
			itemsArray.push(items[i].innerHTML)
			console.log("pushed: " + items[i].innerHTML)
		}
		return JSON.stringify(itemsArray);
	},
	handleSaveClick: function (e) {
		e.preventDefault();
		localStorage.setItem("items", this.savedTexts())
	},
	render: function () {
		return (
			<button onClick = {this.handleSaveClick}>Save work</button>
		)
	}
})

var LoadButton = React.createClass ({
	handleLoadClick: function (e) {
		e.preventDefault();
		var confirmDelete = confirm("Current list will be deleted, and saved list will be loaded. Do you wish to continue?");
		if (confirmDelete) {
			document.getElementById('list').innerHTML = "";
			var savedTexts = JSON.parse(localStorage.getItem("items"));
			if (savedTexts || savedTexts.length > 0) {
				for (var i = 0; i < savedTexts.length; i++) {
					p = document.createElement("p");
					p.innerHTML = savedTexts[i];
					document.getElementById("list").appendChild(p);
				}
			}
		} 
	},
	render:function() {
		return(
			<button onClick = {this.handleLoadClick}>Load work</button>
		)
	}
})

module.exports = App;