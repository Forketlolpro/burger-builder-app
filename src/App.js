import React from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilde';
import Auth from './containers/Auth/Auth'
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux'
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Logout from './containers/Auth/Logout/Logout';
import styles from './App.module.scss';
import * as actions from './store/actions/actions'

class App extends React.Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render() {
    let routse = (
      <Switch>
        <Route component={Auth} path='/auth' />
        <Route component={BurgerBuilder} path = '/'/>
        <Redirect to='/'/>
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routse = (
        <Switch>
          <Route component={Checkout} path = '/checkout'/>
          <Route component={Orders} path = '/orders'/>
          <Route component={Logout} path = '/logout'/>
          <Route component={BurgerBuilder} path = '/'/>
      </Switch>
      )
    }
    return (
      <div className={styles.App}>
      <Layout>
        {routse}
      </Layout>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !==null
  }
}

const mapDispatchToprops = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToprops)(App);
