import React from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilde';
import Auth from './containers/Auth/Auth'
import {Switch, Route} from 'react-router-dom';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Logout from './containers/Auth/Logout/Logout';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.App}>
      <Layout>
        <Switch>
          <Route component={Auth} path='/auth' />
          <Route component={Checkout} path = '/checkout'/>
          <Route component={Orders} path = '/orders'/>
          <Route component={Logout} path = '/logout'/>
          <Route component={BurgerBuilder} path = '/'/>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
