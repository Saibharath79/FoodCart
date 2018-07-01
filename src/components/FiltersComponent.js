import React from 'react';

const FiltersComponent = (props) =>{


    // const divStyle={
    //         /* The image used */
    //         backgroundImage: "url('https://res.cloudinary.com/dfrr0ppdf/image/upload/v1529930478/BannerComponent/pizzaCapture.png')",
          
    //         /* Control the height of the image */
    //         minHeight: "380px",
    //         /* Center and scale the image nicely */
    //         backgroundPosition: "center",
    //         backgroundRepeat: "no-repeat",
    //         backgroundSize: "cover"
    // }
    // const divStyle={
    //     maxWidth:"100%",
    //     width:"auto",
    //     height:"auto",
    //     backgroundImage:"url()"
    // };
    // const centeredElement={
    //         position: "relative",
    //         top: "50%",
    //         left: "50%",
    //         transform: "translate(-50%, -50%)",
    //         margin:"20px",
    //         marginColor:"rgba(180, 180, 255, .5)"
    // }

    
    const cities={

        margin:"20px",
         position:"center",

    }
    const locations={
        margin:"20px",
        position:"center",
    }
    
    let CityOptions=props.cities.map(city => {

        return (<option key={city.id} value={city.id}>{city.name}</option>)
        }
    )

    let AreaOptions=props.locations.filter(
        function(x){
            return x.city==props.cityIndex || !props.cityIndex;
        }
        
    ).map(location =>{
        return (<option key={location.id} value={location.id}>{location.name}</option>)
    }
    );

    return (

        

                <div className="form-inline">
                    <div className="form-group">
                        <label htmlFor="cities">Search by City</label>
                        <select id="cities" style={cities} className="form-control" onChange={props.handleCitySearch}>
                            <option key="0" value="0">Choose City</option>
                            {CityOptions}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="locations">Search by Location</label>
                         <select id="locations" style={locations} className="form-control" onChange={props.handleLocationSearch}>
                         <option key="0" value="0">Choose Location</option>
                            {AreaOptions}
                        </select>
                    </div>                
                </div>

    );


}

export default FiltersComponent;