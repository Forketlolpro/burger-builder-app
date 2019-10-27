import React from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilde'
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
