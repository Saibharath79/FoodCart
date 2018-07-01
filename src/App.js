import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import NavBarComponent from './components/NavBarComponent';
import CartModalComponent from './components/CartModalComponent';
import BannerComponent from './components/BannerComponent';
import LoginModalComponent from './components/LoginModalComponent';
import Products from './components/Products';
import QuickView from './components/QuickView';
import Cookies from 'universal-cookie';
import FiltersComponent from './components/FiltersComponent';
import FooterComponent from './components/FooterComponent';
import SignupModalComponent from './components/SignupModalComponent';
import FoodCartSpecialsComponent from './components/FoodCartSpecialsComponent';

class App extends Component {

  constructor(){
		super();
		this.state = {
      products: [],
      locations:[],
      cities:[],
			cart: [],
			totalItems: 0,
			totalAmount: 0, 
			term: '',
			category: '',
			cartBounce: false,
      quickViewProduct: {},
      showCart: false,
      quickViewModalActive: false,
      isAuthenticated:false,
      loginModalActive:false,
      signupModalActive:false,
      quantity:1,
      searchCityIndex:0,
      searchLocationIndex:0
		};
    this.handleSearch = this.handleSearch.bind(this);
		this.handleCategory = this.handleCategory.bind(this);
		this.handleAddToCart = this.handleAddToCart.bind(this);
		this.sumTotalItems = this.sumTotalItems.bind(this);
		this.sumTotalAmount = this.sumTotalAmount.bind(this);
		this.checkProduct = this.checkProduct.bind(this);
    this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
    this.handleCartShow = this.handleCartShow.bind(this);
    this.handleCartClose = this.handleCartClose.bind(this);
		this.handleQuickViewModalClose = this.handleQuickViewModalClose.bind(this);
    this.handleQuickViewModalShow = this.handleQuickViewModalShow.bind(this);
    this.handleLoginModalShow=this.handleLoginModalShow.bind(this);
    this.handleLoginModalClose=this.handleLoginModalClose.bind(this);
    this.handleSignupModalShow=this.handleSignupModalShow.bind(this);
    this.handleSignupModalClose=this.handleSignupModalClose.bind(this);
    this.toggleisAuthenticated=this.toggleisAuthenticated.bind(this);
    this.updateQuantity=this.updateQuantity.bind(this);
    this.checkOut=this.checkOut.bind(this);
    this.handleLocationSearch=this.handleLocationSearch.bind(this);
    this.handleCitySearch=this.handleCitySearch.bind(this);
	}
  

checkOut(refs){

  //refs.setAttribute("disabled", "disabled");
  let cookies=new Cookies();
  const url="api/order/";
  let data={};
  data.products=this.state.cart;
  let tokenObj=cookies.get('userJwtToken');
  if(!this.state.isAuthenticated){
   // alert("Login First");
    this.handleLoginModalShow();
    return;
  }
  data.token=tokenObj.token;
  data.amount=this.state.totalAmount;
  let json=JSON.stringify(data);
  fetch(url,{
    method: 'post',
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': 'JWT '+tokenObj.token, 
    },
   body:json
 })
 .then(response => {
   
   this.setState({
     totalAmount:0,
     totalItems:0,
     cart:[]
   });
  alert("Order Placed Succesfully");
  this.handleCartClose();
  return response.json();
})
.catch ( error => {
  console.log('Request failed', error);
});
//refs.removeAttribute("disabled");
}


// updateToken(NewToken){

//   this.setState({
//     token:NewToken
//   })
// }


  getProducts(){
		const url = "/api/products/";

		axios.get(url)
			.then(response => {
				this.setState({
					products : response.data
				})
			})
  }
  
getCities(){
	const url = "/api/cities/";

		axios.get(url)
			.then(response => {
				this.setState({
					cities : response.data
				})
			})


}

  getLocations(){

    const url="/api/locations/";

    axios.get(url)
    .then(response => {
      this.setState({
        locations:response.data
      })
    })
  }

	componentWillMount(){
    this.getProducts();
    this.getLocations();
    this.getCities();
  }
  

  handleCitySearch(event){
    this.setState({
      searchCityIndex:Number(event.target.value)
    })
  }

  handleLocationSearch(event){
    this.setState({
      searchLocationIndex:Number(event.target.value)
    })
  }

	// Search by Keyword
	handleSearch(event){
		this.setState({term: event.target.value});
  }
	// Filter by Category
	handleCategory(event){
		this.setState({category: event.target.value});
	//	console.log(this.state.category);
  }
  
  handleCartClose() {
    this.setState({ showCart: false });
  }

  handleCartShow() {
    this.setState({ showCart: true });
  }

  handleSignupModalShow(){
    this.setState({signupModalActive:true});
  }

  handleSignupModalClose(){
    this.setState({signupModalActive:false});
  }


  handleLoginModalShow(){
    this.setState({loginModalActive:true});
  }

  handleLoginModalClose(){
    this.setState({loginModalActive:false});
  }

  updateQuantity(qty){
		console.log("quantity added...")
		this.setState({
				quantity: qty
		})
	}

	// Add to Cart
	handleAddToCart(selectedProducts){
    
    let cartItem = this.state.cart;
		let productID = selectedProducts.id;
		let productQty = selectedProducts.quantity;
    
    if(this.checkProduct(productID)){
			console.log('Product already in the cart');
      let index = cartItem.findIndex((x => x.id == productID));
			cartItem[index].quantity = parseFloat(cartItem[index].quantity) + parseFloat(productQty);
			this.setState({
				cart: cartItem
			})
    } 
    else {
			cartItem.push(selectedProducts);
    }
    
		this.setState({
			cart : cartItem,
			cartBounce: true,
    });
    

		setTimeout(function(){
			this.setState({
				cartBounce:false,
				quantity: 1
			});
			console.log(this.state.quantity);
			console.log(this.state.cart);
    }.bind(this),1000); 

		this.sumTotalItems(this.state.cart);
    this.sumTotalAmount(this.state.cart);
    
  }
  

	handleRemoveProduct(id, e){
		let cart = this.state.cart;
		let index = cart.findIndex((x => x.id == id));
		cart.splice(index, 1);
		this.setState({
			cart: cart
		})
		this.sumTotalItems(this.state.cart);
		this.sumTotalAmount(this.state.cart);
		e.preventDefault();
  }
  

	checkProduct(productID){
		let cart = this.state.cart;
		return cart.some(function(item) {
			return item.id === productID;
		}); 
  }
  
	sumTotalItems(){
        let total = 0;
        let cart = this.state.cart;
		total = cart.length;
		this.setState({
			totalItems: total
		})
    }


	sumTotalAmount(){
        let total = 0;
        let cart = this.state.cart;
        for (var i=0; i<cart.length; i++) {
            total += cart[i].price * parseFloat(cart[i].quantity);
        }
		this.setState({
			totalAmount: total
    })
    

    }

	// Open Modal
	handleQuickViewModalShow(product){
		this.setState({
			quickViewProduct: product,
			quickViewModalActive: true
		})
	}
	// Close Modal
	handleQuickViewModalClose(){
		this.setState({
			quickViewModalActive: false
		})
	}

toggleisAuthenticated(){
  this.setState({
    isAuthenticated:!this.state.isAuthenticated
  });
}

  render() {
    return (

      <React.Fragment>

          <NavBarComponent 
            isAuthenticated={this.state.isAuthenticated}
            handleLoginModalShow={this.handleLoginModalShow}
            handleSignupModalShow={this.handleSignupModalShow}
            totalItems= {this.state.totalItems}
            totalAmount ={this.state.totalAmount}
            handleCartShow={this.handleCartShow}
            toggleisAuthenticated={this.toggleisAuthenticated}
          />

        


          <LoginModalComponent
            isAuthenticated={this.state.isAuthenticated}
            loginModalActive={this.state.loginModalActive}
            handleLoginModalClose={this.handleLoginModalClose}
            toggleisAuthenticated={this.toggleisAuthenticated}
          />

          <CartModalComponent 
            cartItems={this.state.cart}
            showCart={this.state.showCart}
            removeProduct={this.handleRemoveProduct}
            handleCartClose={this.handleCartClose}
            checkOut={this.checkOut}
          />

          <QuickView 
          product={this.state.quickViewProduct} 
          quickViewModalActive={this.state.quickViewModalActive} 
          handleQuickViewModalShow={this.handleQuickViewModalShow} 
          handleQuickViewModalClose={this.handleQuickViewModalClose} 
          />


          <SignupModalComponent 
          isAuthenticated={this.state.isAuthenticated}
          signupModalActive={this.state.signupModalActive}
          handleSignupModalClose={this.handleSignupModalClose}
          toggleisAuthenticated={this.toggleisAuthenticated}
          />

          <BannerComponent />


          <div id="what_we_do" className="container-fluid">
       


          </div>
         <div id="restaurants" className="container-fluid">
            

       


         </div>
          <div id="foodcart_specials" className="container-fluid">


           <div className="row">
            <div className="col-md-3  col-lg-3"></div>
            <div className="col-md-6 col-sm-12 col-lg-6">
                <center>            
                  <FiltersComponent 
                cityIndex={this.state.searchCityIndex}
                locations={this.state.locations}
                cities={this.state.cities}
                products={this.state.products}
                handleLocationSearch={this.handleLocationSearch}
                handleCitySearch={this.handleCitySearch}
                />
                </center>
                <br/>
            <div className="input-group">
                <input type="text" onChange={this.handleSearch} className="form-control"/>
                <span className="input-group-addon" style={{marginTop:"40px"}}>
                <span className="glyphicon glyphicon-search"></span>
                </span>
            </div>
            </div>
            <div className="col-md-3 col-lg-3"></div>
          </div>
          

          <br/><br/>
          <br/>
              <center>
                  <b style={{fontFamily:"Times New Roman"}}><h2>Foodcart Specials</h2></b>
                  <hr/>
              </center>


              <FoodCartSpecialsComponent
                productsList={this.state.products}
                term={this.state.term}
                searchCityIndex={this.state.searchCityIndex}
                searchLocationIndex={this.state.searchLocationIndex}
                addToCart={this.handleAddToCart}
                productQuantity={this.state.quantity}
                updateQuantity={this.updateQuantity}
                openModal={this.handleQuickViewModalShow}
              />
        



          </div>
          <div id="products" style={{marginTop:"20px"}}className="form-group">


      <center>  <h2>Choose your Favourite Fooooood</h2></center>
      <hr/>
         
          <div className="container">
                <Products
                productsList={this.state.products}
                term={this.state.term}
                searchCityIndex={this.state.searchCityIndex}
                searchLocationIndex={this.state.searchLocationIndex}
                addToCart={this.handleAddToCart}
                productQuantity={this.state.quantity}
                updateQuantity={this.updateQuantity}
                openModal={this.handleQuickViewModalShow}
              />
        </div>
        

          </div>
          <div id="contact_us" className="container-fluid" style={{backgroundColor:"black",width:"100%"}}>

              <FooterComponent/>

          </div>
      </React.Fragment>
    );
  }
}

export default App;
