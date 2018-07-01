
import React from 'react';

const FooterComponent = (props) => {

    return (
        <div className="container-fluid" style={{backgroundColor:"black",color:"white",width:"100%"}}>
         <a href="#what_we_do" title="To Top" style={{float:"right"}}>
        <span className="glyphicon glyphicon-chevron-up"></span>
            Move to top</a>
            <br/>
            <h2 className="text-center">CONTACT</h2>
        <div className="row">
          <div className="col-sm-5">
            <p>Contact us and we'll get back to you within 24 hours.</p>
            <p><span className="glyphicon glyphicon-map-marker"></span>Visakhapatanam,AndhraPradesh</p>
            <p><span className="glyphicon glyphicon-phone"></span>7004059626</p>
            <p><span className="glyphicon glyphicon-envelope"></span> teamfoodcart@gmail.com</p>
          </div>
          <div className="col-sm-7 slideanim">
            <div className="row">
              <div className="col-sm-6 form-group">
                <input className="form-control" id="name" name="name" placeholder="Name" type="text" required/>
              </div>
              <div className="col-sm-6 form-group">
                <input className="form-control" id="email" name="email" placeholder="Email" type="email" required/>
              </div>
            </div>
            <textarea className="form-control" id="comments" name="comments" placeholder="Comment" rows="5"></textarea><br/>
            <div className="row">
              <div className="col-sm-12 form-group">
                <button className="btn btn-default pull-right" type="submit">Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      );
}

export default FooterComponent;