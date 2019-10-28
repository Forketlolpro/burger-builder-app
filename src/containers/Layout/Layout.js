import React from 'react';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Aux from '../../hoc/Auxx';

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
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerCloseHandler}/>
                <main className={styles.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}


export default Layout;