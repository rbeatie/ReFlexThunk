# Twilio Flex With Custom Redux and Thunk MiddleWare

This basic demonsrtration shows an implementation of a Redux dispatch Chain using [`redux-thunk`](https://github.com/reduxjs/redux-thunk).

The guide was modified from Redux-Thunk's [Composition](https://github.com/reduxjs/redux-thunk#composition)

### Bugs: 

The **redux-logger** throws an frequent error `Uncaught (in promise) Error: You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.`


# Twilio Flex UI Sample

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

You can find the most recent version of the guide on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

This package can only be consumed together with Twilio Flex. Visit http://twilio.com/flex to find out more.

## Instructions

1. Install all dependencies by running:
```
npm install
```
2. Copy appConfig.sample.js in public/assets folder and configure accordingly to use your Twilio account
```
cp public/assets/appConfig.sample.js public/assets/appConfig.js
```
3. Start Flex UI by running:
```
npm start
```
