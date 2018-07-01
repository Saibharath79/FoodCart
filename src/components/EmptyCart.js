import React, {Component} from 'react';

const EmptyCart = (props) =>{

    return(
        <div className="container-fluid">
            <center>
            <img src="https://res.cloudinary.com/sivadass/image/upload/v1495427934/icons/empty-cart.png" alt="empty-cart"/>
            <h2>You cart is empty!</h2>
            </center>
        </div>
    )
};

export default EmptyCart;