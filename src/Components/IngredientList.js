import React, { Component } from 'react';
import '../App.css';
import IngredientInput from './IngredientInput';
import {getAllItems, updateItem} from '../Controllers/list-controller';
import history from '../history';

class IngredientList extends Component {
	constructor(props){
		super(props);
		this.state = { 
			ListItems: [],
			isLoading: false, 
			error: null,
		};
	}

	componentDidMount() {
		this.setState({isLoading: true});
		getAllItems()
		.then(data => this.setState({ListItems: data._embedded.listItemList, isLoading: false}))
		.catch(error => this.setState({error, isLoading: false }))
	}

	avalibleListIngredients = []; 

	updateItemInput = updatedItem => {
		this.setState({ ...this.state.ListItems, updatedItem })
	}

	addToList = () => {
		for(let i = 0; i < this.state.ListItems.length; i++){
			if(this.state.ListItems[i]['name'].toLowerCase() === this.getDataListInput().toLowerCase() && this.state.ListItems[i]['inList'] === false){
				let item = this.state.ListItems[i];
				item['inList'] = true;
				this.setState({ ...this.state.ListItems, item})
				updateItem(this.state.ListItems[i]);	
			}
		}
	}

	addNewItem = () => {
		let inList = false, id;
		for(let i = 0; i < this.state.ListItems.length; i++){
			if(this.state.ListItems[i]['name'].toLowerCase() === this.getDataListInput().toLowerCase()){
				id = this.state.ListItems[i]['id'];
				inList = true;
			}
		}
		if(inList){
			history.push({
				pathname: "/shopping-list/" + id,
			});
		} else {
			history.push({
				pathname: "/shopping-list/new/" + this.getDataListInput(),
			});
		}
	}

	getDataListInput(){
		return document.getElementById("dataListInput").value;
	}

	render() {
		let sections = [];
		const { ListItems, isLoading, error } = this.state;

		if(isLoading){
			return <p>Loading...</p>;
		}

		if(error){
			return <p>{error.message}</p>;
		}

		for(let i = 0; i < ListItems.length; i++){
			if(!sections.includes(ListItems[i].section))
				sections.push(ListItems[i].section)
		}

		this.avalibleListIngredients = ListItems;
		
		return (
			<div>
				<div className="row">
					<div className="col-l-6 col-12 border-right-solid">
						<div className="row">
							<div className="list-title col-l-7 col-12">Shopping List</div>	
							<div className="padding-left-15 col-l-5 col-12 padding-top-15">		
								<input id="dataListInput" list="items" className="search-input col-8 col-l-8" placeholder="Search Avalible List" name="search" />
								<datalist id="items">
									{this.avalibleListIngredients.map( item => <option key={item.name} value={item.name} />)}
								</datalist>
								<button className="search-button col-l-2 col-2" type="submit" onClick={this.addToList}><i className="fas fa-cart-plus"></i></button>
	        					<button className="search-button col-l-2 col-2" onClick={this.addNewItem}>
									<i className="fa fa fa-plus-square" />
								</button>
	  						</div>
	  					</div>
						{sections.map( sect => this._renderSection(sect, true) ) }				
					</div>
					<div className="col-l-6 col-12">
						<div className="list-title">Avalible List</div>
						{sections.map( sect => this._renderSection(sect, false) ) }				
					</div>
				</div>
			</div>
		);
	}

	_renderSection = (sect, isShoppingList ) => {
		const { ListItems } = this.state;
		let showSect = false;
		for(let i = 0; i < ListItems.length; i++){
			if(ListItems[i]['section'] === sect && ListItems[i]['inList'] === isShoppingList){
				showSect = true;
				break;
			}
		}
		if(!showSect)
			return;
		else
			return <div key={sect}>
				<div className="row">
					<b className="padding-left-15" >{sect}</b>
					<i className="fas fa-caret-down" onClick={ () => console.log("clicked")} ></i>
				</div>
				{ListItems.map( item => item['inList'] === isShoppingList && item['section'] === sect 
					? <IngredientInput key={item.name} item={item} onItemChange={this.updateItemInput} showAddIcon={isShoppingList}/> 
					: null ) }
			</div>
	}
}

export default IngredientList;