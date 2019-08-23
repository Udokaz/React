import React, { Component } from 'react';
import { updateItem } from '../Controllers/list-controller';
import '../App.css';

class IngredientInput extends Component {

	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(key, value = null) {
		const { item } = this.props;
		if(key === "inList"){
			item[key] = !item.inList;
			updateItem(item)
		} else {
			item[key] = value;
		}
		this.props.onItemChange(item);
	}

	render() {
		const { item } = this.props;
		let showAddIcon = this.props.showAddIcon ? 'fas fa-check' : 'fas fa-cart-plus';
		return (
			<div className="row padding-left-30 col-12" >
				<div className="col-l-10 col-9 padding-top-5"> 
					<label>
						{item.name}
					</label>
				</div>
				<div  className="col-l-1 col-2">
					{this.props.showAddIcon ? <input id="input" className="col-12" type="number" min="0" defaultValue={item.quantity} onChange={ () => this.getInputValue() }/> : <br />}
				</div>
				<div className="col-l-1 col-1 padding-top-5" onClick={ () => {} }>
						<i className={`fa-ld ${showAddIcon}`} onClick={ () => this.handleChange("inList") } ></i>
				</div>
			</div>
		);
	}

	getInputValue(){
		const value = document.getElementById("input").value;
		updateItem({...this.props.item, quantity: value});
	}
}

export default IngredientInput;