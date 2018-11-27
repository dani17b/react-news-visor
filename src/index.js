import style from "../theme/_config.scss";
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { Route } from 'react-router';
import { routerReducer, ConnectedRouter, routerMiddleware, replace } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import * as reducers from './reducers';
import { HomeContainer} from './containers';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider} from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';


const reducer = combineReducers({
  ...reducers,
  router : routerReducer
});

// Build the middleware for intercepting and dispatching navigation actions
const history = createHistory();
const routeMiddleware = routerMiddleware(history);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  composeEnhancers(compose(
    applyMiddleware(thunkMiddleware),
    applyMiddleware(routeMiddleware)
  ))
);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#000000',
    },
  },
  overrides: {
    MuiInput: {
      underline: {
        '&:before': {
          borderBottom : "none"
        },
        '&:hover:not($disabled):before': {
          borderBottom : "none"
        }
      }
    }
  }
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <HomeContainer />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);

/*ReactDOM.render(
    <MuiThemeProvider theme={theme}>
      <HomeContainer />
    </MuiThemeProvider>
    ,
    document.getElementById('root')
);*/
/* ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={HomeContainer}/>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
); */
