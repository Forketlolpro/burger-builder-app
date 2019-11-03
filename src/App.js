import React from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilde';
import Checkout from './containers/Checkout/Checkout';
import styles from './App.module.scss';

function App() {
  return (
    <div className={styles.App}>
      <Layout>
        <BurgerBuilder/>
      </Layout>
    </div>
  );
}

export default App;
