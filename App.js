import React from "react";
import {css} from 'emotion';
import thunk from "redux-thunk";
import * as Flex from "@twilio/flex-ui";

class App extends React.Component {

  constructor(props) {
    super(props);

    Flex.CRMContainer.Content.add(<button
        className={css`
          width: 100%;
          height: 4.2em;
          background: blue;
          font-size: 1.4em
          color: white;
          cursor: pointer;
        `}
        key="sandwich-button-key"
        onClick={()=> {
          this.runDispatches();
        }}
    >
      Dispatch Make Sandwich
    </button>,
        {sortOrder: -1}
    );

  }

  runDispatches() {
    const { store } = this.props.manager;

    store.dispatch(makeSandwichesForEverybody(store))
      .then(
          (action) => {
            store.dispatch(action);
          });

    store.dispatch(makeASandwichWithSecretSauce(' Me'))
        .then(() => {
          console.log('Inside the sandwich', thunk);
      });

    store.dispatch(makeASandwichWithSecretSauce('My partner'))
      .then(() => {
        console.log('Done!');
      });
    }

  render() {
    const { manager } = this.props;

    if (!manager) {
      return null;
    }

    return (
      <Flex.ContextProvider
         manager={manager}
      >
        <Flex.RootContainer />
      </Flex.ContextProvider>
    );
  }
}

function fetchSecretSauce() {
  return new Promise((res) => {
    res({
      sauce: 'Twilio Magic'
    })
  });
}

function makeASandwich(forPerson, secretSauce) {
  return {
    type: 'MAKE_SANDWICH',
    forPerson,
    secretSauce,
  };
}

function apologize(fromPerson, toPerson, error) {
  return {
    type: 'APOLOGIZE',
    fromPerson,
    toPerson,
    error,
  };
}

function withdrawMoney(amount) {
  return {
    type: 'WITHDRAW',
    amount,
  };
}

function makeASandwichWithSecretSauce(forPerson) {

  return function(dispatch) {
    return fetchSecretSauce()
      .then(
        (sauce) => dispatch(makeASandwich(forPerson, sauce)),
        (error) => dispatch(apologize('The Sandwich Shop', forPerson, error)),
      );
  };
}

function makeSandwichesForEverybody(store) {

  return function () {
    if (!store.getState().app.sandwiches.isShopOpen) {
      return Promise.resolve();
    }

  return store.dispatch(makeASandwichWithSecretSauce('My Grandma'))
    .then(() => Promise.all([
        store.dispatch(makeASandwichWithSecretSauce('Me')),
        store.dispatch(makeASandwichWithSecretSauce('My wife')),
      ]),
    ).then(
      () => store.dispatch(makeASandwichWithSecretSauce('Our kids'))
    ).then(
      () => store.dispatch(
        store.getState().app.myMoney > 42
          ? withdrawMoney(42)
          : apologize('Me', 'The Sandwich Shop')
      )
    );
  };
}

export default App;
