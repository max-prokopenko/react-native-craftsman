# react-native-craftsman

This tool makes building reqact-native apps fast and easy.

Setting up the project with Redux, React-Navigation and ui-kit takes one command!

## Getting Started
Install the module with: 
```
npm install -g react-native-craftsman 
```

react-native-craftsman requires react-native-cli to be installed globally, it can be done with 
```
npm install react-native-cli
```

## Documentation

To create and react-native app run 
```
craft create ProjectName
```
It will set up project for you, add basic folder structure and install all needed packages. 

Packages included un basic setup:
    - react-navigation
    - react-redux
    - redux
    - redux-logger
    - redux-observable
    - redux-thunk
    - rxjs
    - @shoutem/ui


To add new view/route for your app run 
```
craft add RouteName
```
It will set up all needed configuration for the route and create a route folder to ./src/views/

## License
Copyright (c) 2018. Licensed under the MIT license.