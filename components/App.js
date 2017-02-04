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
		this.setState ({
			currentItems: this.state.currentItems.concat(newItem)
		})
	},
	handleDeleteAll: function (e) {
		this.setState ({
			currentItems: []
		})
	},
	handleSaveAll: function (e) {
		//saveTag variable is used to help computer distinguish between the saveItems and currentItems list.
		//Otherwise, editing function affects the saved list (as well as currentList) for some unknown reason.
		var saveTag = "saveTag"
		this.setState ({
			savedItems: this.state.currentItems.concat(saveTag)
		})
	},
	handleLoad: function (e) {
		var savedItemsTagRemoved = this.state.savedItems.slice(0, this.state.savedItems.length-1)
		this.setState ({
			currentItems: savedItemsTagRemoved
		})
	},
	handleMoveUp: function (e, target) {
		this.setState ({
			currentItems: this.moveItemUp(e, target)
		})
	},
	moveItemUp: function (e, target) {
		for (var i = 1; i < this.state.currentItems.length; i++) {
			if (this.state.currentItems[i] === target) {
				this.state.currentItems.splice(i-1, 0, this.state.currentItems[i])
				this.state.currentItems.splice(i+1, 1)
			}
		}
		return this.state.currentItems
	},
	handleMoveDown: function (e, target) {
		this.setState ({
			currentItems: this.moveItemDown(e, target)
		})
	},
	moveItemDown: function (e, target) {
		for (var i = 0; i < this.state.currentItems.length - 1; i++) {
			if (this.state.currentItems[i] === target) {
				this.state.currentItems.splice(i+2, 0, this.state.currentItems[i])
				this.state.currentItems.splice(i, 1)
			}
		}
		return this.state.currentItems
	},
	handleDeleteItem: function (e, target) {
		this.setState ({
			currentItems: this.makeDeletedCurrentItems(e, target)
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
		if (!editPrompt) {
			return
		} else if (this.state.currentItems.includes(editPrompt)) {
			alert(editPrompt + ": This item already exists on the list!")
			return
		} else if (editPrompt !== target) {
			this.setState ({
				currentItems: this.makeEditedCurrentItems(target, editPrompt)
			})
		}
	},
	makeEditedCurrentItems: function(target, editPrompt) {
		for (var i = 0; i < this.state.currentItems.length; i++) {
			if (this.state.currentItems[i] === target) {
				this.state.currentItems.splice(i, 1, editPrompt)
			}
		}
		return this.state.currentItems
	},
	render: function () {
		return (
			<div>
				<div className = "form-div">
					<Form currentItems = {this.state.currentItems} onSubmit = {this.addItem} />
					<DeleteAllButton onClick = {this.handleDeleteAll} />
					<SaveAllButton onClick = {this.handleSaveAll} savedItems = {this.state.savedItems} />
					<LoadButton onClick = {this.handleLoad} />
				</div>
				<h1>The Amazing Todo-List</h1>
				<List
					currentItems = {this.state.currentItems}
					onDelete = {this.handleDeleteItem}
					onEdit = {this.handleEditItem}
					onMoveUp = {this.handleMoveUp}
					onMoveDown = {this.handleMoveDown}
				/>
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
				alert(this.state.value + ": This item already exists on the list!")
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
	handleMoveUp : function (e, target) {
		this.props.onMoveUp(e, target);
	},
	handleMoveDown : function (e, target) {
		this.props.onMoveDown(e, target);
	},
	makeListItems : function () {
		var s = " "
		var listItems = this.props.currentItems.map((item) => {
			return (
				<li key={item.id} id={item} >
						<MoveUpIcon onMoveUp = {this.handleMoveUp} />
						<MoveDownIcon onMoveDown = {this.handleMoveDown} />
						{s}{item}{s}
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

var MoveUpIcon = React.createClass ({
	MoveUpIconSrc: "https://cdn2.iconfinder.com/data/icons/designers-and-developers-icon-set/32/short_arrow_up-512.png",
	handleClick: function (e) {
		var target = e.target.parentElement.id
		this.props.onMoveUp(e, target)
	},
	render: function() {
		return (
			<img src = {this.MoveUpIconSrc} onClick = {this.handleClick} />
		)
	}
})

var MoveDownIcon = React.createClass ({
	MoveDownIconSrc: "https://cdn2.iconfinder.com/data/icons/designers-and-developers-icon-set/32/short_arrow_down-512.png",
	handleClick: function (e) {
		var target = e.target.parentElement.id
		this.props.onMoveDown(e, target)
	},
	render: function() {
		return (
			<img src = {this.MoveDownIconSrc} onClick = {this.handleClick} />
		)
	}
})

var DeleteIcon = React.createClass ({
	deleteIconSrc: "https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_delete_48px-128.png",
	handleClick: function (e) {
		var target = e.target.parentElement.id
		this.props.onDelete(e, target)
	},
	render: function() {
		return (
			<img src = {this.deleteIconSrc} onClick = {this.handleClick} />
		)
	}
})

var EditIcon = React.createClass ({
	editIconSrc: "https://cdn3.iconfinder.com/data/icons/google-material-design-icons/48/ic_mode_edit_48px-128.png",
	handleClick: function (e) {
		var target = e.target.parentElement.id
		this.props.onEdit(e, target)
	},
	render: function() {
		return (
			<img src = {this.editIconSrc} onClick = {this.handleClick} />
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