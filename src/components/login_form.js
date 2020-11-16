import React, { useState } from 'react';
import { connect } from 'react-redux';

const LoginForm =(props)=> {
    let [userData,setuserData] = useState({
        email : '',
        password : ''
    })
    let [error,seterror] = useState({
        email : false,
        password : false
    })
    function handleChange(event){
        setuserData({...userData,[event.target.name] : event.target.value})
    }
    function onLogin(){
        seterror({...error,email : userData.email == '' ? true : false, password : userData.password == '' ? true : false})
        if(userData.email !='' && userData.password != ''){
            const userDetail = localStorage.getItem('user');
            const userInfo = JSON.parse(userDetail);
            if(userInfo.email == userData.email && userInfo.password == userData.password){
                userInfo.sessionLogin = true;
                const user = JSON.stringify(userInfo);
                localStorage.setItem('user',user);
                if(userInfo.sessionLogin){
                    props.history.push('/homepage');
                }
            }
            else{
                alert('Invalid Email and Password')
            }
        }  
    }
        return (
            <div>
                <div className="row">
                    <div className="col-6 offset-3">
                        <input className="box" type="text" placeholder="Email" name="email" onChange={handleChange}></input>
                        {error.email && <span className="error">Please enter your email</span>}
                    </div>
                    <br></br>
                    <div className="col-6 offset-3">
                        <input className="box" type="password" placeholder="Password" name="password" onChange={handleChange}></input>
                        {error.password && <span className="error">Please enter your password</span>}
                    </div>
                    <br></br>
                    <div className="col-6 offset-3">
                        <button className="btn-login" onClick={onLogin} >Log In</button>
                    </div>
                </div>
            </div>
        );
}

function mapStateToProps(state){
    return{
        userData : state.Reducer.userData
    }
}

function mapDispatchToProps(dispatch){
    return{}
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginForm);