var React = require('react');
var ReactDOM = require('react-dom');

var App = React.createClass({
	getInitialState: function () {
		return {
			currentItems: []
		}
	},
	
	addItem: function(newItem) {
		this.state.currentItems.push(newItem)
		console.log("parent addItem function executed")
		console.log(this.state.currentItems)
	},
	
	deleteItems: function(selectedItem) {
		this.state.currentItems.splice(selectedItem)
	},
	
	render: function () {
		return (
			<div>
				<Form onSubmit = {this.addItem}/>
				<DeleteAllButton />
				<SaveAllButton />
				<LoadButton />
				<List currentItems = {this.state.currentItems}/>
			</div>
		)
	}
});

var List = React.createClass({
	arrayToP: function(array) {
		var result = "";
		for (var i = 0; i < array.length; i++) {
			result = result + "<p>" + array[i] + "</p>"
			console.log(result)
			
		}
		return result
		console.log(result)
	},
	
	render: function() {
		var result = "";
		return (
			<div id = "list">
				{(this.props.currentItems)}
			</div>
		)
		console.log("list updated")
	}
})

var Form = React.createClass({
	description: "Add a new item",
	handleSubmit: function (e) {
		console.log("form submitted")
		e.preventDefault();
		var value = document.getElementById("form-input").value
		this.props.onSubmit(value);
	},
	render: function () {
		return (
			<form onSubmit = {this.handleSubmit}>
				{this.description}<br />
				<input id = "form-input" type = "text" />
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
		var itemarray = [];
		for (var i = 0; i < items.length; i++) {
			itemarray.push(items[i].innerHTML)
			console.log("pushed: " + items[i].innerHTML)
		}
		return JSON.stringify(itemarray);
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
					var p = document.createElement("p");
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