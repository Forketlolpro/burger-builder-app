import React from 'react';
import {connect} from 'react-redux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {BrowserRouter} from 'react-router-dom';
import styles from './Layout.module.scss';

class Layout extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            showSideDrawer: false
        };
    }

    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        this.setState((prewState)=>{
            return {showSideDrawer: !prewState.showSideDrawer}
        })
    }
    
    render () {
        return (
            <BrowserRouter>
                <Toolbar isAuth = {this.props.isAuth} drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer isAuth = {this.props.isAuth} open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler}/>
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </BrowserRouter>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuth: !!state.auth.token
    }
}


export default connect(mapStateToProps)(Layout);