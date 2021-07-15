import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, BrowserRouter, Switch} from 'react-router-dom'
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import reducer from './store/reducer'
import thunk from 'redux-thunk'
import App from './components/App';
import BaseLayout from './components/Baselayout';
import { setAuthenticationHeader } from './utils/authenticate';
import requireAuth from './components/auth'
import { CssBaseline } from '@material-ui/core'
import * as actionTypes from './store/actions/actionTypes'
import {createMuiTheme, ThemeProvider} from '@material-ui/core'
import SignIn from './components/SignIn.js';
import SignUp from './components/SignUp.js';



const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#045174',
      light: '#D89C60',
      contrastText: '#E87A00',
      dark: 'rgba(4,81,116,0.67)',
    },
    secondary: {
      main: '#E87A00',
      light: '#045174',
      contrastText: '#000000',
      dark: '#D89C60',
    },
    text: {
      primary: '#001F3D',
      secondary: '#001F3D',
      disabled: 'rgba(216,156,96,0.42)',
      hint: '#E87A00',
    },
  },
})




const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))


const token = localStorage.getItem("jsonwebtoken")
setAuthenticationHeader(token)

// perform a dispatch to change the global state based on the token
store.dispatch({type: actionTypes.ON_LOGIN, payload: token})


ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme = {theme}>
    <Provider store={store}>
      <BrowserRouter>
        <BaseLayout>
         <Switch>
            <Route exact path = '/' component = {App} />
            <Route exact path = '/login' component = {SignIn} />
            <Route exact path = '/register' component = {SignUp} />
            




           


         </Switch>
        </BaseLayout>
      </BrowserRouter>
    </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

