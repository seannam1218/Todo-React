var React = require('react');
var ReactDOM = require('react-dom');

var App = React.createClass({
	getInitialState: function () {
		return {
			currentItems: [],
			savedItems: [],
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
	},
	
	handleDeleteAll: function (e) {
		this.setState ({
			currentItems: []
		})
	},
	
	handleSaveAll: function (e) {
		this.setState ({
			savedItems: this.state.currentItems
		})
	},
	
	handleLoad: function (e) {
		this.setState ({
			currentItems: this.state.savedItems
		})
	},
	
	componentDidUpdate: function (prevProps, prevState) {
		console.log("currentItems = " + this.state.currentItems)
		console.log("savedItems = " + this.state.savedItems)
	},
	
	/*
	deleteItems: function(selectedItem) {
		this.state.currentItems.splice(selectedItem)
	},
	*/
	
	render: function () {
		return (
			<div>
				<Form onSubmit = {this.addItem} />
				<DeleteAllButton onClick = {this.handleDeleteAll} />
				<SaveAllButton onClick = {this.handleSaveAll} savedItems = {this.state.savedItems}/>
				<LoadButton onClick = {this.handleLoad} />
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
			this.props.onClick(e)
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
	
	handleClick: function (e) {
		e.preventDefault();
		this.props.onClick(e);
	},
	
	componentDidUpdate: function (prevProps, prevState) {
		var savedJSON = JSON.stringify(this.props.savedItems)
		localStorage.setItem("savedItems", savedJSON)
	},
	
	render: function () {
		return (
			<button onClick = {this.handleClick}>Save work</button>
		)
	}
})

var LoadButton = React.createClass ({
	handleClick: function (e) {
		e.preventDefault();
		var confirmDelete = confirm("The current list will be deleted. Continue?");
		if (confirmDelete) {
			this.props.onClick(e)
		}
	},
	
	render:function() {
		return(
			<button onClick = {this.handleClick}>Load work</button>
		)
	}
})


module.exports = App;