import React from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilde';
import {Switch, Route} from 'react-router-dom';
import Checkout from './containers/Checkout/Checkout';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.App}>
      <Layout>
        <Switch>
          <Route component={Checkout} path = '/checkout'/>
          <Route component={BurgerBuilder} path = '/'/>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
