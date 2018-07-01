import React, {Component} from 'react';
import Product from './Product';
import LoadingProducts from './loaders/LoadingProducts';
import NoResults from "./NoResults";
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

class FoodCartSpecialsComponent extends Component{
	constructor(){
		super();
	}
  	render(){
    	let productsData;
        let term = this.props.term.toLowerCase();
        console.log(this.props.searchCityIndex+" : "+this.props.searchLocationIndex);
		let searchCityIndex=parseInt(this.props.searchCityIndex);
		let searchLocationIndex=parseInt(this.props.searchLocationIndex);
		productsData = this.props.productsList.filter(
			function(x){
				return x.name.toLowerCase().includes(term) || !term;
			}
		).filter(
			function(x){
				return x.hotel.location.id==searchLocationIndex || !searchLocationIndex;
			}

		).filter(
			function(x){

				return x.hotel.location.city==searchCityIndex || !searchCityIndex;
			}

        ).filter(
            function(x){
                return x.special_status==true;
            }

        ).map(product =>{
			return(
						<Product 
						key={product.id} 
						price={product.full_price} 
						name={product.name} 
						image={product.image} 
						id={product.id} 
						addToCart={this.props.addToCart} 
						productQuantity={this.props.productQuantity} 
						updateQuantity={this.props.updateQuantity} 
						openModal={this.props.openModal}
						/>
				)
			}
		);

		// Empty and Loading States
		let view;
		if(productsData.length <= 0 && !term){
			view = <LoadingProducts />
		} else if(productsData.length <= 0 && term){
			view =  <center><h3>No FoodCart Specials at this time</h3></center>
		} else{
			view = <CSSTransitionGroup
				transitionName="fadeIn"
				transitionEnterTimeout={500}
				transitionLeaveTimeout={300} 
				component="div"
				className="products">
					{productsData}
			</CSSTransitionGroup>
		}
		return(
			<div className="products-wrapper">
				{view}
			</div>
		)
	}
}

export default FoodCartSpecialsComponent;