import React, { Component } from 'react'
import Cookies from 'universal-cookie';

class NavBarComponent extends Component{

  constructor(props){
    super(props);
  }

  cookies = new Cookies();
  logout = (props) =>
  {
      this.cookies.remove('userJwtToken');
      this.cookies.remove('username');
      console.log(this.cookies.get('userJwtToken'));
      this.props.toggleisAuthenticated();
      // console.log(formData.get('username'))
      //this.props.updateUsername('');
      //this.props.updateStatus(false);
      //this.setState(prev => ( {buttonName : 'Login'}));
  }


    render(){


        return (
            <div className="container-fluid">
            <nav className="navbar navbar-inverse navbar-fixed-top">
            <div className="container-fluid">
              <div className="navbar-header">
                  <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>                        
                </button>
                <a className="navbar-brand" href="#">FoodCart</a>
              </div>
              <div>
                <div className="collapse navbar-collapse" id="myNavbar">
                  <ul className="nav navbar-nav">
                        <li><a href="#what_we_do">What we do</a></li>
                        <li><a href="#restaurants">Restaurants</a></li>
                        <li><a href="#foodcart_specials">FoodCart Specials</a></li>
                        <li><a href="#products">Order Now</a></li>
                        <li><a href="#contact_us">Contact Us</a></li>
                         { !this.props.isAuthenticated && <li><a href="#" onClick={this.props.handleLoginModalShow}><span className="glyphicon glyphicon-log-in"></span> Login</a></li> }
                         { !this.props.isAuthenticated && <li><a href="#" onClick={this.props.handleSignupModalShow}><span className="glyphicon glyphicon-user"></span> Signup</a></li> }
                         {this.props.isAuthenticated && <li><a href="#" onClick={this.logout}>Logout</a></li>}
                  </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li><a>Total Items:{this.props.totalItems ? <span>{this.props.totalItems}</span> : "" }</a></li>
                        <li><a>Total Amount:{this.props.totalAmount ? <span>{this.props.totalAmount}</span> : "" }</a></li>
                        <li style={{float:'right'}}>
                            <a onClick={this.props.handleCartShow}>
                                <button type="button" href="#" className="btn btn-primary btn-sm">
                                    <span className="glyphicon glyphicon-shopping-cart"></span> View Cart
                                </button>
                            </a>
                        </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>    
            </div>
        );
    }

}

export default NavBarComponent;