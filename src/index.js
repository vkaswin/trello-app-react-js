import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import TrelloApp from './pages/trelloapp'
import Login from './pages/login'
import HomePage from './pages/homepage'
import DetailPage from './pages/detailPage'
import pageNotFound from './pages/pageNotFound'

import { ProtectedRoute } from './components/protected-route';


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'jquery/dist/jquery'

import './index.css'

import { Provider } from 'react-redux'
import configurestore from './redux/store/configureStore'


const store = configurestore();

class Trello extends Component {  
    render() {
        const userData = localStorage.getItem('user');
        const userInfo =  JSON.parse(userData);
        return (
            <Provider store={store}>
            <BrowserRouter>
            <Switch>
                <Route path="/" exact render={() => {
                    return(
                        <Redirect to={{pathname: '/homepage'}}/>
                    )
                }}>
                </Route>
                <Route path="/login" component={Login}></Route>
                <ProtectedRoute path="/homepage" component={HomePage}></ProtectedRoute>
                <ProtectedRoute path='/:id/detailpage' component={DetailPage}></ProtectedRoute>
                <ProtectedRoute component={pageNotFound}></ProtectedRoute>
            </Switch>
            </BrowserRouter>
            </Provider>
        );
    }
}

ReactDOM.render(<Trello></Trello>,document.getElementById('root'));

