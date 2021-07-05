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


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))


const token = localStorage.getItem("jsonwebtoken")
setAuthenticationHeader(token)

// perform a dispatch to change the global state based on the token
store.dispatch({type: 'ON_LOGIN', payload: token})


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <BaseLayout>
         <Switch>
            <Route exact path = '/' component = {App} />
           


         </Switch>
        </BaseLayout>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

