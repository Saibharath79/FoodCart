import React, { Component } from 'react';

const BannerComponent = (props) => {

    const title_container_style="position: absolute;z-index: 99; width: 100vw; height: 600px;background-color: rgba(0,0,0,0.3);";
    const section_style="height:600px;";
    const headline_style="margin-top: 155px;"
    const bannerStyle={
      maxWidth:"100%",
      height:"auto",
      width:"auto\9"
    };
    return (
        <div className="container-fluid"  style={{padding: "0px"}}>
        <h2>Carousel Example</h2>
        <div id="myCarousel" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
            <li data-target="#myCarousel" data-slide-to="2"></li>
          </ol>

          <div className="carousel-inner">
      
            <div className="item active">
              <img src="https://res.cloudinary.com/dfrr0ppdf/image/upload/v1529922518/carousel/Burger.jpg" alt="Burger" style={bannerStyle} />
              <div className="carousel-caption">
                <h3>Yummyyyyyy</h3>
                <p>Tasty Burger at your door step</p>
              </div>
            </div>
      
            <div className="item">
              <img src="https://res.cloudinary.com/dfrr0ppdf/image/upload/v1529922515/carousel/food.jpg" alt="Spices" style={bannerStyle}/>
              <div className="carousel-caption">
                <h3>Delicious</h3>
                <p>All Cuisines</p>
              </div>
            </div>
          
            <div className="item">
              <img src="https://res.cloudinary.com/dfrr0ppdf/image/upload/v1529922513/carousel/tasty.jpg" alt="New York" style={bannerStyle}/>
              <div style={{color:"black"}}className="carousel-caption">
                <h3>Dessert</h3>
                <p>Food is incomplete without a tasty dessert</p>
              </div>
            </div>
        
          </div>
          <a className="left carousel-control" href="#myCarousel" data-slide="prev">
            <span className="glyphicon glyphicon-chevron-left"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="right carousel-control" href="#myCarousel" data-slide="next">
            <span className="glyphicon glyphicon-chevron-right"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    );

}

export default BannerComponent;