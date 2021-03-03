import React, { Component } from 'react'
import './App.css';
import {
    BrowserRouter as Router, 
    Route, 
    Switch,
} from 'react-router-dom';
import Header from './Componets/Header.js';
import PrivateRoute from './Componets/PrivateRoute.js';
import Home from './Home/HomePage.js';
import SignUpPage from './AuthPages/SignUpPage.js';
import LoginPage from './AuthPages/LoginPage.js';
import TodosListPage from './Todo/TodoPage.js';
import { getUserFromLS, putUserinLS } from './LSutils';

export default class App extends Component {
    state = {
      user: getUserFromLS()
    }

    handleUserChange = (user) => {
      this.setState({ user })
      
      putUserinLS(user);
    }

    handleLogout = () => {
      this.handleUserChange();
    }

    render() {
      const { user } = this.state;
        return (
            <div>
                <Router>
                  <Header
                    user={this.state.user}
                    handleLogout={this.handleLogout}/>
                    <Switch>
                        <Route 
                            path="/" 
                            exact
                            render={(routerProps) => <Home {...routerProps} />} 
                        />
                        <PrivateRoute 
                            path="/todos" 
                            exact
                            token={user && user.token}
                            render={(routerProps) => 
                              <TodosListPage 
                                user={this.state.user}
                                {...routerProps} 
                              />} 
                        />
                        <Route 
                          path="/login" 
                          exact
                          render={(routerProps) => 
                            <LoginPage 
                              handleUserChange={this.handleUserChange}
                              {...routerProps} 
                            />} 
                        />
                        <Route 
                          path="/signup" 
                          exact
                          render={(routerProps) => 
                            <SignUpPage 
                              handleUserChange={this.handleUserChange}
                              {...routerProps} 
                            />} 
                        />
                    </Switch>
                </Router>
            </div>
        )
    }
}