var React = require('react');
var ReactDOM = require('react-dom');

var App = React.createClass({
	getInitialState: function () {
		return {
			currentItems: [],
			savedItems: [],
		}
	},
	
	addItem: function(newItem) {
		var newCurrentItems = this.state.currentItems.concat(newItem)
		this.setState ({
			currentItems: newCurrentItems
		})
	},
	
	handleDeleteAll: function (e) {
		var newBlankList = this.makeBlankCurrentItems()
		this.setState ({
			currentItems: newBlankList
		})
	},
	
	makeBlankCurrentItems: function() {
		for (var i = 0; i < this.state.currentItems.length; i++) {
			this.state.currentItems.splice(0)
		}
		return this.state.currentItems
	},
	
	handleSaveAll: function (e) {
		var newSavedItems = this.state.currentItems
		this.setState ({
			savedItems: newSavedItems
		})
	},
	
	handleLoad: function (e) {
		var newCurrentItems = this.state.savedItems
		this.setState ({
			currentItems: newCurrentItems
		})
	},
	
	handleDeleteItem: function (e, target) {
		var newCurrentItems = this.makeDeletedCurrentItems(e, target)
		this.setState ({
			currentItems: newCurrentItems
		})
	},
	
	makeDeletedCurrentItems: function (e, target) {
		for (var i = 0; i < this.state.currentItems.length; i++) {
			if (this.state.currentItems[i] === target) {
				this.state.currentItems.splice(i, 1)
			} 
		} 
		return this.state.currentItems
	},
	
	handleEditItem: function (e, target) {
		var editPrompt = prompt("How would you like to change it?", target)
		if (this.state.currentItems.includes(editPrompt)) {
			alert(editPrompt + ": This item already exists in the list!")
			return
		} else if (editPrompt !== target) {
			var newCurrentItems = this.makeEditedCurrentItems(target, editPrompt)
			this.setState ({
				currentItems: newCurrentItems
			})
		} 
	},
	
	makeEditedCurrentItems: function(target, editPrompt) {
		for (var i = 0; i < this.state.currentItems.length; i++) {
			if (this.state.currentItems[i] == target) {
				this.state.currentItems.splice(i, 1, editPrompt)
			} 
		}	
		return this.state.currentItems
	},
	
	componentDidUpdate: function (prevProps, prevState) {
		console.log("currentItems = " + this.state.currentItems)
		console.log("savedItems = " + this.state.savedItems)
	},
	
	render: function () {
		return (
			<div>
				<Form currentItems = {this.state.currentItems} onSubmit = {this.addItem} />
				<DeleteAllButton onClick = {this.handleDeleteAll} />
				<SaveAllButton onClick = {this.handleSaveAll} savedItems = {this.state.savedItems} />
				<LoadButton onClick = {this.handleLoad} />
				<List currentItems = {this.state.currentItems} onDelete = {this.handleDeleteItem} onEdit = {this.handleEditItem} />
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
			if (this.props.currentItems.includes(this.state.value)) {
				alert(this.state.value + ": This item is already in the list!")
				return
			}
			this.props.onSubmit(this.state.value);
		} else {
			alert("Item must be at least 1 character long! Why would you add a blank item???")
		}
	},
	
	render: function () {
		return (
			<form onSubmit = {this.handleSubmit}>
				{this.description}<br />
				<input type = "text" onChange = {this.handleValueChange}/>
				<input type = "submit" value = "Submit" />
			</form>
		)
	}
})

var List = React.createClass({
	handleDeleteItem : function (e, target) {
		this.props.onDelete(e, target);
	},
	
	handleEditItem : function (e, target) {
		this.props.onEdit(e, target);
	},
	
	makeListItems : function () {
		var s = " "
		var listItems = this.props.currentItems.map((item) => {
			return (
				<li key={item.id} id={item} > 
					{item}{s} 
					<EditIcon onEdit = {this.handleEditItem} />
					<DeleteIcon onDelete = {this.handleDeleteItem} />
				</li>
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

var DeleteIcon = React.createClass ({
	deleteIconSrc: "https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_delete_48px-128.png",
	iconWidth: 20,
	
	handleClick: function (e) {
		var target = e.target.parentElement.id
		console.log(target)
		this.props.onDelete(e, target)
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
		console.log("clicked! - EditIcon")
		var target = e.target.parentElement.id
		console.log(target)
		this.props.onEdit(e, target)
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