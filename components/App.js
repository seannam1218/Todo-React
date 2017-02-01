var React = require('react');
var ReactDOM = require('react-dom');

var App = React.createClass({
	getInitialState: function () {
		return {
			currentItems: [],
			deleteIcons: [],
			editIcons: []
		}
	},
	
	addItem: function(newItem) {
		var newCurrentItems = this.state.currentItems.concat(newItem)
		console.log("adding new item!")
		this.setState ({
			currentItems: newCurrentItems
		})
		console.log("finished adding new item! currentItems:" + this.state.currentItems)
	},
	
	handleDeleteAll: function (e) {
		console.log("currentItems state emptied")
		this.setState ({
			currentItems: []
		})
		console.log("C")
	},
	
	componentDidUpdate: function (prevProps, prevState) {
		console.log("E")
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
				<button>load work</ button>
				<List currentItems = {this.state.currentItems} deleteIcons = {this.state.deleteIcons} editIcons = {this.state.editIcons} />
			</div>
		)
	}
});

var Form = React.createClass({
	getInitialState: function () { 
		return {
			value: ""
		}
	},
	
	description: "Add a new item",
	
	handleValueChange: function (e) {
		this.setState ({
			value: e.target.value
		})
	},
	
	handleSubmit: function (e) {
		e.preventDefault();
		this.props.onSubmit(this.state.value);
	},
	
	render: function () {
		return (
			<form onSubmit = {this.handleSubmit}>
				{this.description}<br />
				<input id = "form-input" type = "text" onChange = {this.handleValueChange}/>
				<input type = "submit" value = "Submit" />
			</form>
		)
	}
})

var List = React.createClass({
	
	itemPChain: function () {
		console.log("starting itemPChain")
		if (this.props.currentItems !== null) {
			var itemPs = this.props.currentItems.map(function (item) {
				return (<p>{item}</p>)
			})
			return (itemPs)	
		}
		return []
	},
	
	
	
	render : function () {
		return (
			<div id = "main-list">
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
			console.log("A")
			document.getElementById('main-list').innerHTML = "";
			console.log("B")
			this.props.onClick(e);
			console.log("D")
		}
	},
	render: function () {
		return (
			<button onClick = {this.handleClick}>Delete all</button>
			//
			
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
			document.getElementById('main-list').innerHTML = "";
			var savedTexts = JSON.parse(localStorage.getItem("items"));
			console.log(savedTexts)
			if (savedTexts.length > 0) {
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