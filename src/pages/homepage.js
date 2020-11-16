import React, { Component } from 'react';
import { Route, Switch,NavLink } from 'react-router-dom';
import { Drawer, List } from '@material-ui/core';
import { ProtectedRoute } from '../components/protected-route'

import InfiniteScroll from '../components/infinite_scroll'
import Pagination from './pagination'

class HomePage extends Component{
    constructor(props){
        super(props);
        this.state = {
            open : false,
            title : 'Infinite Scroll Page'
        }
    }
    onLogout(){
        const userData = localStorage.getItem('user');
        const userInfo = JSON.parse(userData)
        userInfo.sessionLogin = false;
        localStorage.setItem('user',JSON.stringify(userInfo));
        this.props.history.push('/login')
    }
    handleClick(){
        this.setState({
            open : true
        })
    }
    handleBlur = () =>{
        this.setState({
            open : false
        })
    }  
        render(){
            const list = [{
            text: 'Infinity Scroll',
            path: "/homepage",
            onClick : ()=>this.setState({
                title : 'Infinite Scroll Page'
    })
            }, 
            {
            text: 'Pagination',
            path: "/homepage/pagination",
            onClick : ()=>this.setState({
                        title : 'Pagination Page'
            })                           
            }];
        return (
            <div className="container-fluid">
                <h2 className="header-home"><img onClick={()=>this.handleClick()} className="bar-img" src={require('../images/bar.png')}></img>  Welcome to {this.state.title} <button className="btn btn-primary btn-log" onClick={()=>this.onLogout()}>Logout</button></h2>
                <Drawer open={this.state.open} onBlur={this.handleBlur}>
                <div className="drawer">
                <List>
                    {list.map((value, index) =>{
                        const { text,path,onClick } = value;
                        return(
                            <NavLink key={text} to={path} onClick={onClick} exact={true} activeClassName="link-active" className="link">
                            <b>{text}</b>
                            </NavLink>
                        );  
                })}
                </List>
                </div>
                </Drawer>
                <div className="row">
                    <div className="col-12">
                    <Switch>
                        <Route path='/homepage' exact component={InfiniteScroll}></Route>
                        <ProtectedRoute path='/homepage/pagination' component={Pagination}></ProtectedRoute>
                    </Switch>
                    </div>
                </div>
                  
            </div>
        );
    }
}

export default HomePage;