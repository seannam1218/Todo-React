var React = require('react');
var ReactDOM = require('react-dom');

var App = React.createClass({
	getInitialState: function () {
		return {
			currentItems: []
		}
	},
	
	addItem: function(newItem) {
		var newCurrentItems = this.state.currentItems.concat(newItem)
		this.setState ({
			currentItems: newCurrentItems
		})
	},
	
	handleDeleteAll: function (e) {
		console.log("currentItems state deleted")
		this.setState ({
			currentItems: []
		})
	},
	
	componentDidUpdate: function (prevProps, prevState) {
		console.log("currentItems = " + this.state.currentItems)
	},
	
	deleteItems: function(selectedItem) {
		this.state.currentItems.splice(selectedItem)
	},
	
	render: function () {
		return (
			<div>
				<Form onSubmit = {this.addItem} />
				<DeleteAllButton onClick = {this.handleDeleteAll} />
				<SaveAllButton currentItems = {this.state.currentItems} />
				<button>load</button>
				<List currentItems = {this.state.currentItems} />
			</div>
		)
	}
});

var Form = React.createClass({
	getInitialState: function () { ///-------------------------------------------------fix
		return {
			value: ""
		}
	},
	
	description: "Add a new item",
	
	handleSubmit: function (e) {
		e.preventDefault();
		/*var newItem = e.target.childNodes[4].value;
		this.props.onSubmit(newItem);*/
		console.log("value is = " + e.target.childNodes[4].value )
		this.setState ({
			value: e.target.childNodes[4].value
		}) 
		console.log("state of value is now:" + this.state.value)
		this.props.onSubmit(this.state.value);
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

var List = React.createClass({
	itemPChain: function () {
		console.log("starting itemPChain")
		if (this.props.currentItems[0]) {
			var itemPs = this.props.currentItems.map(function (item) {
				return (<p>{item}</p>)
			})
			return (itemPs)	
		}
		return []
	},
	
	render : function () {
		return (
			<div id = "mainList">
				{this.itemPChain()}
			</div>
		)
	}
})

var DeleteAllButton = React.createClass({
	handleClick: function (e) {
		e.preventDefault();
		var confirmDelete = confirm("Are you sure you want to delete every item on the list?");
		if (confirmDelete) {
			document.getElementById('mainList').innerHTML = "";
			this.props.onClick(e);
		}
	},
	render: function () {
		return (
			<button onClick = {this.handleClick}>Delete all</button>
		)
	}
})

var SaveAllButton = React.createClass ({
	getInitialState: function () {
		return {
			savedItems: []
		}
	},
	
	handleSaveClick: function (e) {
		e.preventDefault();
		this.setState ({
			savedItems: this.props.currentItems
		})
	},
	
	componentDidUpdate: function (prevProps, prevState) {
		var savedJSON = JSON.stringify(this.state.savedItems)
		localStorage.setItem("savedItems", savedJSON)
		console.log("saved items = " + this.state.savedItems)
	},
	
	render: function () {
		return (
			<button onClick = {this.handleSaveClick}>Save work</button>
		)
	}
})
/*
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
*/

module.exports = App;