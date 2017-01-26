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
		console.log(this.state.currentItems)
	},
	
	deleteItems: function(selectedItem) {
		this.state.currentItems.splice(selectedItem)
	},
	
	render: function () {
		return (
			<div>
				<Form onSubmit = {this.addItem}/>
				<button>delete all</button>
				<button>save all</button>
				<button>load</button>
				<List currentItems = {this.state.currentItems} />
			</div>
		)
	}
});

var Form = React.createClass({
	description: "Add a new item",
	
	handleSubmit: function (e) {
		e.preventDefault();
		var newItem = document.getElementById("form-input").value
		console.log("var newItem = " + document.getElementById("form-input").value)
		this.props.onSubmit(newItem);
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
				return ("<p>" + item + "</p>")
			})
			console.log(itemPs)
			return (itemPs)	
		}
		return []
	},
	
	render : function () {
		return (
			<div>{this.itemPChain()}</div>
		)
	}
})

module.exports = App;