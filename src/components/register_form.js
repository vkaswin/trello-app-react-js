import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userData from '../redux/action/action'

const RegisterForm = () => {

    let [userData,setuserData] = useState({
        firstName : '',
        lastName : '',
        email : '',
        password : ''
    });

    let [error,seterror] = useState({
        firstName : false,
        lastName : false,
        email : false,
        password : false
    })
    function handleChange(event){
        setuserData({...userData,[event.target.name] : event.target.value})
    }
    function onRegister(){
        setuserData({...userData, firstName : userData.firstName.trim(),lastName : userData.lastName.trim(), email: userData.email.trim(), password: userData.password.trim(), sessionLogin : false});
        let emial = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        let password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
        seterror({ ...error, firstName : userData.firstName == ''? true : false, lastName : userData.lastName == ''? true : false, email : !emial.test(userData.email), password : !password.test(userData.password)});
        if(userData.firstName != '' && userData.lastName != '' && emial.test(userData.email) && password.test(userData.password)){ 
            localStorage.setItem('user', JSON.stringify(userData));
            setuserData({...userData, firstName : '',lastName : '', email: '', password: ''});
            alert('Registered Successfully');
        }   
    }
        return (
            <div>
                <div className="row">
                    <div className="col-4 offset-1">
                        <input className="box-1" type="text" placeholder="First Name" value={userData.firstName} name="firstName" onChange={handleChange}></input>
                        {error.firstName && <span className="error">Please Enter First Name</span>}
                        <input className="box-1" type="text" placeholder="Email" name="email" value={userData.email} onChange={handleChange}></input>
                        {error.email && <span className="error">Enter Valid Email</span>}
                    </div>
                    <div className="col-6 offset-1">
                        <input className="box-1" type="text" placeholder="Last Name" value={userData.lastName} name="lastName" onChange={handleChange}></input><br></br>
                        {error.lastName && <span className="error">Please Enter Last Name</span>}
                        <input className="box-1" type="password" placeholder="Password" value={userData.password} name="password" onChange={handleChange}></input><br></br>
                        {error.password && <span className="error">Password must contain more than 7 characters including 1 Uppercase, 1 Lowercase and 1 Number"</span>}
                    </div>
                    <br></br>
                    <br></br>
                    <div className="col-6 offset-3">
                        <button className="btn-login" onClick={onRegister}>Register</button>
                    </div>
                </div>
            </div>
        );
    }

function mapStateToProps(state){
    return{}
}

function mapDispatchToProps(dispatch){
    return{
        actions: bindActionCreators(userData,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(RegisterForm);