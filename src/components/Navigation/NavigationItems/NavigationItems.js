import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import styles from './NavigationItems.module.scss';

const navigationItems = (props) => {
    return (
        <ul className={styles.NavigationItems}>
            <NavigationItem link='/'>Burger Builder</NavigationItem>
            {props.isAuth ?<NavigationItem link='/orders'>Orders</NavigationItem> : null}
            { !props.isAuth ? <NavigationItem link='/auth'>Authenticate</NavigationItem> : <NavigationItem link='/logout'>Logout</NavigationItem>}
        </ul>
    );
}

export default navigationItems;