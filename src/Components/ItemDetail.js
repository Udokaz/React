import React, { Component } from 'react';
import '../App.css';
import { getOneItem, saveNewItem, updateItem, deleteItem } from '../Controllers/list-controller';
import history from '../history';

class ItemDetail extends Component {
	constructor(props){
		super(props);
		this.state = { 
			id: -1,
			name: "",
			quantity: 0,
			inList: false,
			section: "Uncategorized",
			isLoading: false, 
			error: null,
		};
		this.handleChange = this.handleChange.bind(this);
		this.saveItem = this.saveItem.bind(this);
	}

	componentDidMount() {
		let { id, name, quantity, inList, section } = this.state;
		if(this.props.id !== undefined){
			this.setState({isLoading: true});
			getOneItem(this.props.id)
				.then(data => {
					id = data['id'];
					name = data['name'];
					quantity = data['quantity'];
					inList = data['inList'];
					section = data['section'];
					this.setState({ id, name, quantity, inList, section, isLoading: false})
				})
				.catch(error => this.setState({error, isLoading: false }))			
		}
	}

	handleChange(event) {
		let target = event.target
		let value = target.type === 'checkbox' ? target.checked : target.value;
	    const name = target.name;
		this.setState({[name]: value});
	}

	saveItem = () => {
		let name = "";
		if(this.props.hasOwnProperty("newName"))
			name = this.props.newName;
		else
			name = this.state.name;
		let item = {
			name: name,
			quantity: this.state.quantity,
			inList: this.state.inList,
			section: this.state.section,
		}
		if(this.props.id === undefined){
			saveNewItem(item);
		} else {
			item.id = parseInt(this.props.id, 10);
			updateItem(item);
		}
		history.push({
			pathname: "/shopping-list/",
		})
	}

	deleteItem = () => {
		const { name, id } = this.state;
		let answer = confirm("Are you sure you want to DELETE ", name);
		if(answer){
			deleteItem(id)
		}
	}

	render() {
		const { id, quantity, inList, section, isLoading, error } = this.state;
		let name = "";
		if(this.props.newName)
			name = this.props.newName;
		else
			name = this.state.name;

		if(isLoading){
			return <p>Loading Item...</p>;
		}

		if(error){
			return <p>{error.message}</p>;
		}

		return (
			<div className="row">
				<form>
					Name:
					<input name="name" type="text" value={name} onChange={this.handleChange}></input>
					<br />Amount:
					<input name="quantity" type="number" value={quantity} onChange={this.handleChange}></input>
					<br />Section:
					<input name="section"  type="text" value={section} onChange={this.handleChange}></input>
					<br />In List
					<input name="inList" type="checkbox" defaultChecked={inList} onChange={this.handleChange}></input>
					<br />
				</form>
				<div className="row">
					<button type="submit" onClick={this.saveItem} >Save</button>
					{id !== -1 ? <button onClick={this.deleteItem} >Delete</button> : null}
				</div>
			</div>
		);
	}
}

export default ItemDetail;