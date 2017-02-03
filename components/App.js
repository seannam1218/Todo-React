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
	
	handleDeleteItem: function (e) {
		/*this.setState ({
			currentItems: []
		})*/
	},
	
	componentDidUpdate: function (prevProps, prevState) {
		console.log("currentItems = " + this.state.currentItems)
		console.log("savedItems = " + this.state.savedItems)
	},
	
	render: function () {
		return (
			<div>
				<Form onSubmit = {this.addItem} />
				<DeleteAllButton onClick = {this.handleDeleteAll} />
				<SaveAllButton onClick = {this.handleSaveAll} savedItems = {this.state.savedItems} />
				<LoadButton onClick = {this.handleLoad} />
				<List currentItems = {this.state.currentItems} onDelete = {this.handleDeleteItem} />
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
		if (this.state.value !== "") {
			this.props.onSubmit(this.state.value);
		} else {
			alert("Item must be at least 1 character long! Why would you add a blank item???")
		}
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
	/*makeListItems: function () {
		if (this.props.currentItems !== null) {
			var itemPs = this.props.currentItems.map(function (item) {
				return (
					<li>
						{item} <DeleteIcon onClick = {this.handleDelete} />
					</li>
				)
			})
			return (itemPs)	
		}
		return []
	},*/
	handleDelete : function () {
		this.props.onDelete();
	},
	
	makeListItems : function () {
		var listItems = this.props.currentItems.map(function (item) {
			return (
				<ListItem key={item.id} value={item} onDelete = {this.handleDelete} />
			)
		})
		return listItems
	},
	
	render : function () {
		return (
			<ul>
				{this.makeListItems()}
			</ul>
		)
	}
})

var ListItem = React.createClass({
	handleDelete: function (e) {
		this.props.onDelete()
	},
	
	render: function () {
		return (
			<li> 
				{this.props.value} 
				<DeleteIcon onClick = {this.handleDelete} />
			</li>
		)
	}
})

var DeleteIcon = React.createClass ({
	deleteIconSrc: "https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_delete_48px-128.png",
	iconWidth: 20,
	
	handleClick: function (e) {
		this.props.onClick(e)
	},
	
	render: function() {
		return (
			<img src = {this.deleteIconSrc} width = {this.iconWidth} onClick = {this.handleClick} />
		)
	}
})

var EditIcon = React.createClass ({
	editIconSrc: "https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_mode_edit_48px-128.png",
	iconWidth: 20,
		
	handleClick: function (e) {
		var target = e.target
	},
	
	render: function() {
		return (
			<img src = {this.editIconSrc} width = {this.iconWidth} onClick = {this.handleClick} />
		)
	}
})

var DeleteAllButton = React.createClass({
	handleClick: function (e) {
		e.preventDefault();
		var confirmDelete = confirm("Are you sure you want to delete everything?");
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