import React,{Component} from 'react';
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import Cookies from 'universal-cookie';

class SignupModalComponent extends Component{

    constructor(props){
        super(props);
    }

    cookies = new Cookies();
    state = {
        url:"/api/user_signup/",
        //buttonName : 'Login',
        username : "" ,
        password: "",
        firstname:"",
        lastname:"",
        phonenumber:"",
        pincode:"",
        address:""
    }

    saveUsername = (event) => {
        const {target : {value}}  = event;
        this.setState({
            username : value
        })
    }

    saveFirstname = (event) => {
        const {target : {value}}  = event;
        this.setState({
            firstname : value
        })
    }

    saveLastname = (event) => {
        const {target : {value}}  = event;
        this.setState({
            lastname : value
        })
    }

    savePassword = (event) => {
        const {target : {value}} = event;
        this.setState({
            password : value
        })
    }

    savePhonenumber = (event) => {
        const {target : {value}} = event;
        this.setState({
            phonenumber : value
        })
    }
    
    savePincode = (event) => {
        const {target : {value}} = event;
        this.setState({
            pincode : value
        })
    }

    saveAddress = (event) => {
        const {target : {value}} = event;
        this.setState({
            address : value
        })
    }

    submit = (e) => {
        e.preventDefault();
        this.signup(this.state)
    }

    signup =({username,password,firstname,lastname,phonenumber,pincode,address})=>{
            console.log(username + " : "+password+" : "+firstname+" : "+lastname+":"+phonenumber+":"+pincode+":"+address);
            var formData  = new FormData();
            formData.append('username', username);
            formData.append('password', password);
            formData.append('first_name',firstname);
            formData.append('last_name',lastname);
            formData.append('phone_number',phonenumber);
            formData.append('pincode',pincode);
            formData.append('address',address);
            fetch(this.state.url, { 
                method: 'post',
                body: formData, 
              }) .then(function(response) {
                return response.json();
            })
            .then((myJson) => {
                if ('token' in myJson){
                    this.cookies.set('userJwtToken', myJson, { path: '/',expires: new Date(Date.now()+2592000)} );
                    this.cookies.set('username',formData.get('username'), {path : '/', expires: new Date(Date.now()+2592000)})
                    console.log(this.cookies.get('userJwtToken'));
                    console.log('After getting token');
                    this.props.toggleisAuthenticated();
                    this.props.handleSignupModalClose();
                }
                else{
                    alert("Invalid Credentials");
                }
            })
            .catch(e => {console.log("Error occured in Signup")});
    }


    render(){
        return(
            
            <Modal show={this.props.signupModalActive} onHide={this.props.handleSignupModalClose}>
            <Modal.Header closeButton>
              <h2><center><Modal.Title>Signup</Modal.Title></center></h2>
            </Modal.Header>
            <Modal.Body> 
                <div className="form-group container-fluid">
                    <label htmlFor="username">Username:</label>
                    <input onChange={this.saveUsername} required id="username" type="text" className="form-control" placeholder="Enter username"/><br/>
                    <label htmlFor="password">Password:</label>
                    <input onChange={this.savePassword} required id="password" type="password" className="form-control" placeholder="Enter Password"/><br/>
                    <label htmlFor="firstname">First Name:</label>
                    <input onChange={this.saveFirstname} required id="firstname" type="text" className="form-control" placeholder="Enter First Name"/><br/>
                    <label htmlFor="lastname">Last Name:</label>
                    <input onChange={this.saveLastname} required id="lastname" type="text" className="form-control" placeholder="Enter Last Name"/><br/>
                    <label htmlFor="phonenumber">Phone Number:</label>
                    <input onChange={this.savePhonenumber} required id="phonenumber" maxLength="10" type="text" className="form-control" placeholder="Enter Phone Number"/><br/>
                    <label htmlFor="pincode">Pincode:</label>
                    <input onChange={this.savePincode} required id="pincode" type="text" maxLength="7" className="form-control" placeholder="Enter Pincode"/><br/>
                    <label htmlFor="address">Address:</label>
                    <input onChange={this.saveAddress} required id="address" type="text" maxLength="256" className="form-control" placeholder="Enter Address"/><br/>
                    
                </div>
                
            </Modal.Body>
            <Modal.Footer>
               <Button id="signup" onClick={(events)=>{
                   document.getElementById("signup").setAttribute("disabled","disabled");
                   this.submit(events);
                   document.getElementById("signup").removeAttribute("disabled");
                }} className="btn btn-primary" value="Signup">Signup</Button>
              <Button onClick={this.props.handleSignupModalClose}>Close</Button>
            </Modal.Footer>
          </Modal>
            


        );
    }


}

export default SignupModalComponent;