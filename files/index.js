import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { createStore, applyMiddleware, combineReduxers, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';

import reducers from './src/reducers';

import {Router} from './src/config/router';

const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });
const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, loggerMiddleware)(createStore);
const store = createStoreWithMiddleware(reducers);


export default class name_to_replace extends Component {
    render() {
      return (
        <Provider store={store}>
            <Router />
        </Provider>
      );
    }
}

AppRegistry.registerComponent('name_to_replace', () => name_to_replace);
