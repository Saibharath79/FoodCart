import React,{Component} from 'react';
import {Modal} from 'react-bootstrap';
import {Table} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

class QuickView extends Component{

    constructor(props){
        super(props);
    }

    render(){

        const imageSizing={
          width:"400px",
          height:"400px",
          marginBottom:"30px"
        }
        return(
        <Modal show={this.props.quickViewModalActive} onHide={this.props.handleQuickViewModalClose} alt={this.props.product.id}>
        <Modal.Header closeButton>
          <h2><center><Modal.Title>Quick View</Modal.Title></center></h2>
        </Modal.Header>
        <Modal.Body>
          <center>  
              <img src={this.props.product.image} style={imageSizing}/>
              <div className="container-fluid">
              <Table responsive>
                  <thead>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Product ID:</td>
                      <td>{this.props.product.id}</td>
                    </tr>
                    <tr>
                      <td>Product Name:</td>
                      <td>{this.props.product.name}</td>
                    </tr>
                    <tr>
                      <td>Price:</td>
                      <td>{this.props.product.price}</td>
                    </tr>
                  </tbody>
              </Table>
              </div>
        </center>
            
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.handleQuickViewModalClose}>Close</Button>
        </Modal.Footer>
      </Modal>);

    }

}


export default QuickView;