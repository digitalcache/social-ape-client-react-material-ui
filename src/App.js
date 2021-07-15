import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import user from './pages/user';
import Navbar from './components/layout/Navbar';
import AuthRoute from './util/AuthRoute';
import themeFile from './util/theme';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';
import './App.css';
import axios from 'axios';

const theme = createMuiTheme(themeFile);
const token = localStorage.FBIdToken;

if(token) {
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp*1000 < Date.now()){
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({type: SET_AUTHENTICATED});
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData())
  }
}
class App extends Component {
  render(){
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <Router>
              <Navbar></Navbar>
              <div className="container">
                <Switch>
                  <Route path="/" exact component={home}></Route>
                  <Route path="/home" exact component={home}></Route>
                  <AuthRoute exact path="/login" component={login}></AuthRoute>
                  <AuthRoute exact path="/signup" component={signup}></AuthRoute>
                  <Route path="/users/:handle" exact component={user}></Route>
                  <Route path="/users/:handle/scream/:screamId" exact component={user}></Route>
                </Switch>
              </div>
            </Router>
        </Provider>
      </MuiThemeProvider>  
    );
  }
}

export default App;
