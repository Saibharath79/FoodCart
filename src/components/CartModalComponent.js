import React,{Component} from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import EmptyCart from './EmptyCart';
import { Button } from 'react-bootstrap';
import {Modal} from 'react-bootstrap';
import {Table} from 'react-bootstrap';

class CartModalComponent extends Component{


    constructor(props){
        super(props);
        this.state = {
            cart: this.props.cartItems
        };
    }


    render(){

        let cartItems;
        const imgStyle={
            width:"50px",
            height:"50px"
        };
        cartItems =this.state.cart.map(product =>{
            return(
                <CSSTransitionGroup transitionName="fadeIn" key={product.id} component="tr" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                    <td>{product.id}</td>
                    <td><img src={product.image} style={imgStyle} /></td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.quantity} {product.quantity > 1 ?"Nos." : "No." } </td>
                    <td>{product.quantity * product.price}</td>
                    <td><a href="#" onClick={this.props.removeProduct.bind(this, product.id)}>×</a></td>
                </CSSTransitionGroup>
            )
        });
  
        let view;
        if(cartItems.length <= 0){
            view = <EmptyCart />
        } else{
        view =  (<Table responsive>
                    <thead>
                        <tr>
                            <th>ProductID</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                       
                        {cartItems}
                    
                    </tbody>
                </Table>)
        }


    return (
        <Modal show={this.props.showCart} onHide={this.props.handleCartClose}>
          <Modal.Header closeButton>
            <h2><center><Modal.Title>Cart</Modal.Title></center></h2>
          </Modal.Header>
          <Modal.Body>
              
                    {view}
              
          </Modal.Body>
          <Modal.Footer>
            <Button id="checkout" onClick={(event)=>{
                document.getElementById('checkout').style.pointerEvents = 'none';
                document.getElementById("checkout").setAttribute("disabled", "disabled");
                if(this.props.cartItems.length>0)
                    this.props.checkOut();
                //this.props.handleCartClose();
                document.getElementById('checkout').style.pointerEvents = 'auto'; 
                //document.getElementById("checkout").removeAttribute("disabled");
            }} className={this.props.cartItems.length>0 ? "btn btn-danger" : "disabled btn btn-danger"}>PROCEED TO CHECKOUT</Button>
            <Button onClick={this.props.handleCartClose}>Close</Button>
          </Modal.Footer>
        </Modal>
        );
    }


}

export default CartModalComponent;